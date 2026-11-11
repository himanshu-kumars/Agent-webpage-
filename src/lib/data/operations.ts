/**
 * AEGIS // OPS GRID — Fictional 2087 Operations Catalog (FR-009, FR-010, DATABASE.md)
 * NON-NEGOTIABLE CONSTRAINT #3:
 * Every operation, asset callsign, and briefing below is 100% speculative 2087 fiction.
 */

export type OperationStatus = "ACTIVE" | "STANDBY" | "DARK";
export type SecurityClassification = "UMBRA-7" | "ORCON" | "EYES ONLY";

export interface BriefingSegment {
  type: "text" | "redacted";
  value: string;
}

export interface OperationAsset {
  callsign: string;
  role: string;
  agency: string;
}

export interface OperationCaseFile {
  id: string;
  codename: string;
  theatre: string;
  agencySlug: string;
  leadAgency: string;
  status: OperationStatus;
  threatLevel: 1 | 2 | 3 | 4 | 5;
  classification: SecurityClassification;
  startedAt: string;
  summary: string;
  briefingSegments: BriefingSegment[];
  assets: OperationAsset[];
  telemetryLog: string[];
  mapNode: { x: number; y: number; label: string };
  isFiction: true;
}

export const OPERATIONS: OperationCaseFile[] = [
  {
    id: "op-glass-horizon",
    codename: "GLASS HORIZON",
    theatre: "ORBITAL // LEO INCLINATION 53.2°",
    agencySlug: "nsa",
    leadAgency: "NSA · GCHQ Joint Orbital Cell",
    status: "ACTIVE",
    threatLevel: 2,
    classification: "UMBRA-7",
    startedAt: "2087-10-14T04:10:00Z",
    summary:
      "Counter-interception sweep across twelve decommissioned graveyard-orbit relay satellites exhibiting unauthorized 1550nm lasercom heartbeats.",
    briefingSegments: [
      { type: "text", value: "At 04:10Z, optical tracking array " },
      { type: "redacted", value: "CHELTENHAM DEEP APERTURE-04" },
      {
        type: "text",
        value:
          " locked onto synchronized femtosecond optical pulses originating from orbital graveyard slot ",
      },
      { type: "redacted", value: "NORAD-99412 // GHOST-LATTICE" },
      {
        type: "text",
        value:
          ". Spectral analysis indicates the dormant solar sails have been repurposed as passive quantum-key reflectors aimed at an autonomous surface buoy at ",
      },
      { type: "redacted", value: "58.410° N, 24.890° W (NORTH ATLANTIC TRENCH)" },
      {
        type: "text",
        value:
          ". Watchfloor analysts are authorized to monitor phase drift without triggering active transponder interrogation.",
      },
    ],
    assets: [
      { callsign: "VANGUARD-12", role: "Orbital SIGINT Specialist", agency: "NSA" },
      { callsign: "MIRROR-ECHO", role: "Post-Quantum Cryptanalyst", agency: "GCHQ" },
      { callsign: "HELIOS-WATCH", role: "Lasercom Telemetry Officer", agency: "DGSE" },
    ],
    telemetryLog: [
      "2087-11-10T16:40:00Z // PHASE DRIFT +0.004 RAD CONFIRMED ON SLOT 99412",
      "2087-11-10T17:12:22Z // CHELTENHAM LATTICE DECODED 64-BYTE EPHEMERIS HEADER",
      "2087-11-10T17:45:09Z // PASSIVE SHADOWING MAINTAINED — ZERO EMISSION PROFILE",
    ],
    mapNode: { x: 382, y: 112, label: "LEO NODE-4 // NORTH ATLANTIC" },
    isFiction: true,
  },
  {
    id: "op-silent-meridian",
    codename: "SILENT MERIDIAN",
    theatre: "INDO-PACIFIC // NINETY EAST SUB-CABLE RIDGE",
    agencySlug: "raw",
    leadAgency: "R&AW · ASIS Maritime Acoustic Fusion",
    status: "ACTIVE",
    threatLevel: 1,
    classification: "UMBRA-7",
    startedAt: "2087-10-28T11:30:00Z",
    summary:
      "Deep-benthic reconnaissance of an unindexed photonic repeater coupler detected at 4,200 meters depth along the Ninety East Ridge.",
    briefingSegments: [
      { type: "text", value: "Autonomous bathy-glider squadron " },
      { type: "redacted", value: "MAKAR-09 (NEW DELHI MARITIME WING)" },
      {
        type: "text",
        value:
          " detected anomalous Brillouin scattering across trans-oceanic trunk fiber segment ",
      },
      { type: "redacted", value: "IND-AUS-PHOTONIC-TRUNK-7B" },
      {
        type: "text",
        value:
          ". Acoustic synthetic-aperture sonar confirmed a non-state titanium pressure housing anchored 180 meters east of the repeater at ",
      },
      { type: "redacted", value: "09.142° S, 89.910° E // DEPTH 4,210M" },
      {
        type: "text",
        value:
          ". Decoy quantum noise frames are currently being injected from Canberra and New Delhi to starve the tap of usable entropy.",
      },
    ],
    assets: [
      { callsign: "TRIDENT-KAO", role: "Benthic Telemetry Lead", agency: "R&AW" },
      { callsign: "SOUTHERN-REEF", role: "Photonic Cable Analyst", agency: "ASIS" },
      { callsign: "THAMES-6", role: "Maritime Liaison Officer", agency: "MI6 / SIS" },
    ],
    telemetryLog: [
      "2087-11-10T14:05:11Z // BRILLOUIN BACKSCATTER DELTA EXCEEDED +2.8 dB",
      "2087-11-10T15:30:00Z // SYNTHETIC ENTROPY FLOOD ACTIVE ON TRUNK-7B",
      "2087-11-10T17:50:44Z // BATHY-GLIDER MAKAR-09 HOLDING 400M STANDOFF",
    ],
    mapNode: { x: 695, y: 292, label: "NINETY EAST RIDGE // BENTHIC" },
    isFiction: true,
  },
  {
    id: "op-valkyrie-lattice",
    codename: "VALKYRIE LATTICE",
    theatre: "HIGH ARCTIC // SVALBARD IONOSPHERIC ARRAY",
    agencySlug: "csis",
    leadAgency: "CSIS · BND Polar Sensor Directorate",
    status: "ACTIVE",
    threatLevel: 2,
    classification: "ORCON",
    startedAt: "2087-11-01T00:05:00Z",
    summary:
      "Mitigation of synthetic auroral HF backscatter masking unauthorized high-latitude drone courier corridors above 78° North.",
    briefingSegments: [
      { type: "text", value: "Over-the-horizon polar radar station " },
      { type: "redacted", value: "ALERT-OMEGA // ELLESMERE SECTOR" },
      {
        type: "text",
        value:
          " logged artificial ionospheric heating signatures synchronized with sub-orbital glide transits toward ",
      },
      { type: "redacted", value: "SPITSBERGEN BASALT VAULT-02" },
      {
        type: "text",
        value:
          ". Berlin and Ottawa fusion desks cross-correlated the carrier harmonics to a commercial icebreaker hull registered under phantom syndicate ",
      },
      { type: "redacted", value: "BOREALIS MERIDIAN HOLDINGS (ZUG / REYKJAVIK)" },
      { type: "text", value: "." },
    ],
    assets: [
      { callsign: "POLAR-LYNX", role: "Arctic Sensor Commander", agency: "CSIS" },
      { callsign: "SPREE-WATCH", role: "All-Source Fusion Analyst", agency: "BND" },
      { callsign: "FJORD-CIPHER", role: "Ionospheric SIGINT Spec", agency: "GCHQ" },
    ],
    telemetryLog: [
      "2087-11-10T12:19:00Z // IONOSPHERIC HEATER HARMONIC LOCKED AT 6.84 MHz",
      "2087-11-10T16:00:15Z // SYNTHETIC APERTURE RADAR PASS COMPLETED OVER 79°N",
    ],
    mapNode: { x: 492, y: 58, label: "SVALBARD // 78°N POLAR ARRAY" },
    isFiction: true,
  },
  {
    id: "op-sundance-drift",
    codename: "SUNDANCE DRIFT",
    theatre: "CISLUNAR // LAGRANGE L1 TELEMETRY GATE",
    agencySlug: "cia",
    leadAgency: "CIA · DGSE Cislunar Reconnaissance Desk",
    status: "ACTIVE",
    threatLevel: 3,
    classification: "UMBRA-7",
    startedAt: "2087-09-19T18:20:00Z",
    summary:
      "Attribution of unscheduled delta-v micro-thruster burns on an automated helium-3 freighter transiting the Earth-Moon L1 corridor.",
    briefingSegments: [
      { type: "text", value: "Langley cislunar astrometry cell " },
      { type: "redacted", value: "STARLIGHT-DIVISION-07" },
      {
        type: "text",
        value:
          " alongside Paris optical telemetry station ",
      },
      { type: "redacted", value: "TOURELLES-HELIOS-IX" },
      {
        type: "text",
        value:
          " flagged a 1.4 m/s course deflection on automated hull ",
      },
      { type: "redacted", value: "CSV-ARTEMISIA-88 (REGISTRY: LUNAR FREEPORT)" },
      {
        type: "text",
        value:
          ", placing its perigee within optical line-of-sight of coalition relay satellites.",
      },
    ],
    assets: [
      { callsign: "KESTREL-9", role: "Lead Watchfloor Officer", agency: "CIA" },
      { callsign: "VOLTAIRE-4", role: "Astrodynamics Specialist", agency: "DGSE" },
    ],
    telemetryLog: [
      "2087-11-10T09:30:00Z // EPHEMERIS RECALCULATED — PERIGEE DELTA -42 KM",
      "2087-11-10T17:20:00Z // OPTICAL SPECTRUM SWEEP NEGATIVE FOR ACTIVE JAMMING",
    ],
    mapNode: { x: 245, y: 285, label: "ATACAMA // CISLUNAR DOWNLINK" },
    isFiction: true,
  },
  {
    id: "op-iron-astrolabe",
    codename: "IRON ASTROLABE",
    theatre: "EASTERN MEDITERRANEAN // LEVANT PHOTONIC HUB",
    agencySlug: "mossad",
    leadAgency: "Mossad · MI6 Technical Counter-Proliferation",
    status: "STANDBY",
    threatLevel: 3,
    classification: "EYES ONLY",
    startedAt: "2087-08-04T07:00:00Z",
    summary:
      "Supply-chain interdiction tracking unauthorized cryogenic dilution refrigerators diverted toward an unlicensed subterranean compute foundry.",
    briefingSegments: [
      { type: "text", value: "Field logistics telemetry compiled by " },
      { type: "redacted", value: "TEL AVIV TECHNICAL DESK-14" },
      {
        type: "text",
        value:
          " and London shipping registry monitors identified three isotopic-tagged cryo-coolers routed through free-zone warehouse ",
      },
      { type: "redacted", value: "LIMASSOL CONTAINER PIER-19 // BAY C" },
      {
        type: "text",
        value:
          ". Operation remains on STANDBY pending parliamentary warrant synchronization.",
      },
    ],
    assets: [
      { callsign: "SABRA-7", role: "Technical Supply-Chain Lead", agency: "Mossad" },
      { callsign: "VAUXHALL-3", role: "Maritime Manifest Analyst", agency: "MI6 / SIS" },
    ],
    telemetryLog: [
      "2087-11-09T21:14:00Z // ISOTOPIC BEACON PING CONFIRMED AT PIER-19",
      "2087-11-10T11:00:00Z // HOLDING STANDBY POSTURE PER DIRECTIVE 2087-11B",
    ],
    mapNode: { x: 545, y: 185, label: "EAST MED // PHOTONIC HUB" },
    isFiction: true,
  },
  {
    id: "op-null-cartographer",
    codename: "NULL CARTOGRAPHER",
    theatre: "CENTRAL EUROPE // ALPINE QUANTUM REPEATER RING",
    agencySlug: "bnd",
    leadAgency: "BND · DGSE Continental Infrastructure Desk",
    status: "STANDBY",
    threatLevel: 4,
    classification: "ORCON",
    startedAt: "2087-07-12T15:45:00Z",
    summary:
      "Integrity audit of quantum key distribution (QKD) repeaters spanning the Gotthard-Brenner alpine fiber tunnels.",
    briefingSegments: [
      { type: "text", value: "Joint diagnostics led by " },
      { type: "redacted", value: "CHAUSSEESTRASSE FUSION CELL-03" },
      {
        type: "text",
        value:
          " verified photon-number-splitting countermeasures across all fourteen subterranean nodes between ",
      },
      { type: "redacted", value: "ZURICH-SOUTH AND MILAN-GATEWAY" },
      {
        type: "text",
        value:
          ". No active intrusion persists; sensors remain in passive standby.",
      },
    ],
    assets: [
      { callsign: "MERIDIAN-8", role: "QKD Infrastructure Auditor", agency: "BND" },
      { callsign: "SEINE-2", role: "Optical Fiber Security Spec", agency: "DGSE" },
    ],
    telemetryLog: [
      "2087-11-08T08:00:00Z // QBER (QUANTUM BIT ERROR RATE) STABLE AT 0.41%",
    ],
    mapNode: { x: 488, y: 146, label: "ALPINE QKD RING" },
    isFiction: true,
  },
  {
    id: "op-obsidian-vespers",
    codename: "OBSIDIAN VESPERS",
    theatre: "SOUTHERN OCEAN // KERGUELEN RELAY SHADOW",
    agencySlug: "asis",
    leadAgency: "ASIS · R&AW Deep-South Reconnaissance",
    status: "DARK",
    threatLevel: 1,
    classification: "UMBRA-7",
    startedAt: "2087-05-22T22:00:00Z",
    summary:
      "Radio-silent monitoring of an automated floating launch barge operating in international waters south of the 48th parallel.",
    briefingSegments: [
      { type: "text", value: "Under strict EMCON-ALPHA silence, asset team " },
      { type: "redacted", value: "SOUTHERN-CROSS-ZERO (CANBERRA)" },
      {
        type: "text",
        value:
          " maintains passive infrared visual lock on unflagged mobile sea-launch platform ",
      },
      { type: "redacted", value: "HULL-X77 // 'NEPTUNE FORGE'" },
      {
        type: "text",
        value:
          " at coordinates ",
      },
      { type: "redacted", value: "49.250° S, 69.180° E (KERGUELEN PLATEAU)" },
      {
        type: "text",
        value:
          ". All uplink transmissions are routed via burst-laser only.",
      },
    ],
    assets: [
      { callsign: "TASMAN-1", role: "Deep-Cover Recon Lead", agency: "ASIS" },
      { callsign: "GARUDA-5", role: "Synthetic Aperture Analyst", agency: "R&AW" },
    ],
    telemetryLog: [
      "2087-11-10T03:00:00Z // TIGHT-BEAM BURST RECEIVED — EMCON INTEGRITY 100%",
    ],
    mapNode: { x: 642, y: 398, label: "KERGUELEN // EMCON-DARK" },
    isFiction: true,
  },
  {
    id: "op-winter-kestrel",
    codename: "WINTER KESTREL",
    theatre: "NORTH ATLANTIC // REYKJAVIK-HALIFAX CABLE SHELF",
    agencySlug: "sis",
    leadAgency: "MI6 / SIS · CIA · CSIS Tri-Lateral Cell",
    status: "DARK",
    threatLevel: 2,
    classification: "EYES ONLY",
    startedAt: "2087-06-30T01:15:00Z",
    summary:
      "Long-horizon counter-espionage honey-pot feeding synthetic orbital ephemeris tables to an unauthorized dark-pool data broker.",
    briefingSegments: [
      { type: "text", value: "Canary watermarks embedded by " },
      { type: "redacted", value: "VAUXHALL CROSS COUNTER-ESPIONAGE DESK" },
      {
        type: "text",
        value:
          " and Langley analysts surfaced inside an encrypted auction hosted on relay ",
      },
      { type: "redacted", value: "NODE-REYKJAVIK-DARK-11" },
      {
        type: "text",
        value:
          ", confirming the controlled barium-trace feed is isolating the broker's clearinghouse.",
      },
    ],
    assets: [
      { callsign: "ALBION-0", role: "Counter-Intelligence Case Officer", agency: "MI6 / SIS" },
      { callsign: "POTOMAC-6", role: "Canary Watermark Architect", agency: "CIA" },
      { callsign: "RIDEAU-4", role: "North Atlantic Relay Monitor", agency: "CSIS" },
    ],
    telemetryLog: [
      "2087-11-10T06:45:00Z // CANARY TOKEN #409 TRIGGERED IN SECTOR REYKJAVIK",
    ],
    mapNode: { x: 412, y: 96, label: "REYKJAVIK // DARK RELAY" },
    isFiction: true,
  },
];

export function getOperationById(id: string): OperationCaseFile | undefined {
  return OPERATIONS.find((op) => op.id.toLowerCase() === id.toLowerCase());
}
