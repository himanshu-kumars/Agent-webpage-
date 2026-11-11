import {
  pgTable,
  pgEnum,
  text,
  integer,
  boolean,
  timestamp,
  uuid,
  jsonb,
  bigserial,
  index,
} from "drizzle-orm/pg-core";

/**
 * AEGIS // OPS GRID — Drizzle ORM PostgreSQL 15+ Schema Reference (DATABASE.md)
 */

export const agencyCategoryEnum = pgEnum("agency_category", [
  "HUMINT",
  "SIGINT",
  "FUSION",
  "TECHINT",
]);

export const clearanceTierEnum = pgEnum("clearance_tier", [
  "OBSERVER",
  "WATCHER",
  "OPERATIVE",
  "AEGIS",
]);

export const opStatusEnum = pgEnum("op_status", [
  "ACTIVE",
  "STANDBY",
  "DARK",
  "COMPLETE",
]);

export const securityClsEnum = pgEnum("security_cls", [
  "UNCLASSIFIED",
  "ORCON",
  "EYES_ONLY",
  "UMBRA_7",
  "FLASH",
  "IMMEDIATE",
  "PRIORITY",
]);

export const appStatusEnum = pgEnum("app_status", [
  "RECEIVED",
  "SCREENING",
  "REJECTED",
  "SHORTLISTED",
]);

export const agenciesTable = pgTable("agencies", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull(),
  isoCode: text("iso_code").notNull(),
  founded: integer("founded").notNull(),
  hqCity: text("hq_city").notNull(),
  hqCountry: text("hq_country").notNull(),
  remit: text("remit").notNull(),
  category: agencyCategoryEnum("category").notNull(),
  capabilities: jsonb("capabilities").notNull(),
  publicFacts: jsonb("public_facts").notNull(),
  sort: integer("sort").notNull().default(0),
});

export const timelineEventsTable = pgTable("timeline_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  year: integer("year").notNull(),
  month: integer("month"),
  title: text("title").notNull(),
  body: text("body").notNull(),
  tag: text("tag").notNull(),
  isFiction: boolean("is_fiction").notNull().default(false),
});

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  codename: text("codename").notNull().unique(),
  passHash: text("pass_hash").notNull(),
  clearance: clearanceTierEnum("clearance").notNull().default("AEGIS"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
});

export const sessionsTable = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    ipHash: text("ip_hash").notNull(),
    uaHash: text("ua_hash").notNull(),
  },
  (table) => [index("idx_sessions_expires_at").on(table.expiresAt)]
);

export const operationsTable = pgTable(
  "operations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    codename: text("codename").notNull().unique(),
    theatre: text("theatre").notNull(),
    agencySlug: text("agency_slug")
      .notNull()
      .references(() => agenciesTable.slug, { onDelete: "restrict" }),
    status: opStatusEnum("status").notNull().default("ACTIVE"),
    threatLevel: integer("threat_level").notNull(),
    summary: text("summary").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
    closedAt: timestamp("closed_at", { withTimezone: true }),
    classification: securityClsEnum("classification").notNull().default("UMBRA_7"),
  },
  (table) => [index("idx_operations_status_theatre").on(table.status, table.theatre)]
);

export const operationAssetsTable = pgTable("operation_assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  operationId: uuid("operation_id")
    .notNull()
    .references(() => operationsTable.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  callsign: text("callsign").notNull(),
});

export const dossiersTable = pgTable(
  "dossiers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    subject: text("subject").notNull(),
    classification: securityClsEnum("classification").notNull().default("UMBRA_7"),
    pages: integer("pages").notNull(),
    bodyMd: text("body_md").notNull(),
    redactions: jsonb("redactions").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("idx_dossiers_classification").on(table.classification)]
);

export const interceptsTable = pgTable("intercepts", {
  id: uuid("id").defaultRandom().primaryKey(),
  channel: text("channel").notNull(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  classification: securityClsEnum("classification").notNull().default("PRIORITY"),
  body: text("body").notNull(),
  capturedAt: timestamp("captured_at", { withTimezone: true }).defaultNow().notNull(),
});

export const vaultNotesTable = pgTable("vault_notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  ciphertext: text("ciphertext").notNull(),
  iv: text("iv").notNull(),
  tag: text("tag").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const applicationsTable = pgTable(
  "applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    serial: text("serial").notNull().unique(),
    codename: text("codename").notNull(),
    contactEnc: text("contact_enc").notNull(),
    answerGrid: jsonb("answer_grid").notNull(),
    status: appStatusEnum("status").notNull().default("RECEIVED"),
    consent: boolean("consent").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("idx_applications_status").on(table.status)]
);

export const auditLogTable = pgTable("audit_log", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  actor: text("actor").notNull(),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: text("entity_id").notNull(),
  at: timestamp("at", { withTimezone: true }).defaultNow().notNull(),
  meta: jsonb("meta").notNull(),
});
