/**
 * AEGIS // OPS GRID — Synthetic 2087 Intercepts & SITREP Telemetry (FR-001, FR-012, DATABASE.md)
 * NON-NEGOTIABLE CONSTRAINT #3:
 * All intercepts, frequencies, vectors, and SITREP headlines are 100% speculative 2087 fiction.
 */

export type InterceptClassification = "FLASH" | "IMMEDIATE" | "PRIORITY";

export interface InterceptFrame {
  id: string;
  channel: string;
  origin: string;
  destination: string;
  classification: InterceptClassification;
  body: string;
  capturedAt: string;
  isFiction: true;
}

export const PUBLIC_SITREP_TICKER: string[] = [
  "[2087.314 // SITREP] GENEVA-REYKJAVIK CONCORDAT TELEMETRY MESH NOMINAL ACROSS ALL 10 ALLIED STATIONS",
  "[ORBITAL WATCH] CHELTENHAM & FORT MEADE CONFIRM PASSIVE OPTICAL LOCK ON GRAVEYARD SLOT NORAD-99412",
  "[BENTHIC RELAY] NEW DELHI & CANBERRA REPORT ZERO PACKET LOSS ON IND-AUS PHOTONIC TRUNK-7B",
  "[ARCTIC SECTOR] OTTAWA & BERLIN FUSION DESKS MONITORING SYNTHETIC IONOSPHERIC SCINTILLATION AT 78°N",
  "[CISLUNAR GATE] PARIS HELIOS-IX & LANGLEY ASTROMETRY TRACKING AUTOMATED FREIGHTER EPHEMERIS AT L1",
  "[RECRUITMENT] DIRECTORATE APTITUDE TERMINAL OPEN FOR 2087 COHORT — SERIAL PREFIX ARG-2087 ACTIVE",
];

const CHANNELS = [
  "LASERCOM-LEO // 193.4 THz",
  "QUANTUM-BURST // QKD-BB84",
  "BENTHIC-PHOTONIC // 1550nm",
  "IONO-SCATTER // 6.84 MHz",
  "CISLUNAR-TIGHTBEAM // 284 THz",
];

const ORIGINS = [
  "SVALBARD RELAY-02",
  "GRAVEYARD SLOT-99412",
  "NINETY EAST COUPLER",
  "L1 FREIGHTER BEACON",
  "KERGUELEN SEA-BARGE",
  "REYKJAVIK DARK-NODE",
  "LIMASSOL FREEPORT-19",
  "ALPINE TUNNEL VAULT-07",
];

const DESTINATIONS = [
  "CHELTENHAM CORE (GCHQ)",
  "FORT MEADE EXASCALE (NSA)",
  "LANGLEY WATCHFLOOR (CIA)",
  "VAUXHALL CROSS DESK (SIS)",
  "NEW DELHI ARC (R&AW)",
  "TEL AVIV TECH CELL (MOSSAD)",
  "BERLIN FUSION HUB (BND)",
  "PARIS HELIOS WING (DGSE)",
  "CANBERRA ARRAY (ASIS)",
  "OTTAWA POLAR GRID (CSIS)",
];

const PAYLOAD_TEMPLATES = [
  "QUANTUM KEY ROTATION CONFIRMED; PHASE DRIFT +0.004 RAD COMPENSATED ON UPLINK.",
  "BRILLOUIN BACKSCATTER ANOMALY DETECTED AT 4,210M; SYNTHETIC ENTROPY FLOOD ENGAGED.",
  "CANARY WATERMARK #409 SURFACED IN DARK-POOL CLEARINGHOUSE; PASSIVE TRACE LOCKED.",
  "FEMTOSECOND OPTICAL HEARTBEAT CAPTURED FROM DERELICT SOLAR SAIL; ZERO RF EMISSION.",
  "SUB-GLACIAL MAGNETOMETER FLUX NORMALIZED; HF HEATER HARMONIC ISOLATED TO 78.4°N.",
  "ISOTOPIC CRYO-COOLER TELEMETRY PING VERIFIED; HOLDING STANDBY PER WARRANT 2087-11B.",
  "DECOY-STATE PHOTON COUNTERMEASURES STABLE; QBER AT 0.39% ACROSS GOTTHARD CONDUIT.",
  "CISLUNAR EPHEMERIS DELTA -42 KM LOGGED DURING SOLAR CONJUNCTION; TRACKING CONTINUES.",
  "EMCON-ALPHA BURST RECEIVED FROM SOUTHERN CROSS RECON CELL; BARGE HULL-X77 STATIONARY.",
  "POST-QUANTUM LATTICE SIGNATURE ATTESTED ACROSS ALL TEN COALITION WATCHFLOORS.",
];

const CLASSIFICATIONS: InterceptClassification[] = ["FLASH", "IMMEDIATE", "PRIORITY"];

/**
 * Deterministically generates the 200-row seed intercept catalog (DATABASE.md)
 * or synthesizes a fresh live frame by index.
 */
export function generateInterceptByIndex(index: number, timestampOverride?: string): InterceptFrame {
  const safeIdx = Math.abs(index);
  const channel = CHANNELS[safeIdx % CHANNELS.length];
  const origin = ORIGINS[(safeIdx * 3) % ORIGINS.length];
  const destination = DESTINATIONS[(safeIdx * 7) % DESTINATIONS.length];
  const classification = CLASSIFICATIONS[(safeIdx * 5) % CLASSIFICATIONS.length];
  const baseBody = PAYLOAD_TEMPLATES[safeIdx % PAYLOAD_TEMPLATES.length];
  const frameCode = `0x${((safeIdx + 4096) * 17).toString(16).toUpperCase().slice(0, 4)}`;

  return {
    id: `int-2087-${String(safeIdx + 1001).padStart(4, "0")}`,
    channel,
    origin,
    destination,
    classification,
    body: `[FRAME ${frameCode}] ${baseBody}`,
    capturedAt:
      timestampOverride ||
      new Date(Date.now() - (200 - (safeIdx % 200)) * 4000).toISOString(),
    isFiction: true,
  };
}

export const INITIAL_INTERCEPTS: InterceptFrame[] = Array.from({ length: 12 }, (_, idx) =>
  generateInterceptByIndex(idx + 1)
).reverse();

export const SEED_200_INTERCEPTS: InterceptFrame[] = Array.from({ length: 200 }, (_, idx) =>
  generateInterceptByIndex(idx + 1)
);
