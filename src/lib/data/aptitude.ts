/**
 * AEGIS // OPS GRID — Recruitment Pipeline, Clearance Matrix & 3-Question Aptitude Terminal (FR-006)
 */

export interface PipelineStage {
  step: string;
  title: string;
  duration: string;
  summary: string;
}

export interface ClearanceTierSpec {
  tier: string;
  codename: string;
  scope: string;
  watchfloorAccess: string;
  vettingRequirement: string;
}

export interface AptitudeQuestion {
  id: string;
  code: string;
  domain: string;
  prompt: string;
  cipherSample: string;
  options: {
    id: string;
    label: string;
    explanation: string;
  }[];
  correctOptionId: string;
}

export const RECRUITMENT_PIPELINE: PipelineStage[] = [
  {
    step: "STAGE 01",
    title: "SIGNAL INTAKE & CRYPTOGRAPHIC SCREEN",
    duration: "T+00 DAYS",
    summary:
      "Anonymous completion of the 3-vector aptitude terminal and issuance of a candidate tracking serial (ARG-2087-XXXX).",
  },
  {
    step: "STAGE 02",
    title: "COGNITIVE & SPATIAL MATRIX",
    duration: "T+14 DAYS",
    summary:
      "Multi-theatre anomaly correlation under simulated watchfloor latency at a partner directorate assessment annex.",
  },
  {
    step: "STAGE 03",
    title: "ZERO-TRUST SOVEREIGN VETTING",
    duration: "T+60 DAYS",
    summary:
      "Cross-jurisdictional integrity verification conducted by the candidate's home-nation statutory authority.",
  },
  {
    step: "STAGE 04",
    title: "ORBITAL & TRADECRAFT CRUCIBLE",
    duration: "T+120 DAYS",
    summary:
      "Sixteen-week technical and operational immersion across Cheltenham, Langley, New Delhi, Paris, and Ottawa simulators.",
  },
  {
    step: "STAGE 05",
    title: "UMBRA-7 WATCHFLOOR INDOCTRINATION",
    duration: "T+180 DAYS",
    summary:
      "Assignment of operational callsign, hardware-attested redaction key, and seat allocation on the AEGIS Ops Grid.",
  },
];

export const CLEARANCE_TIERS: ClearanceTierSpec[] = [
  {
    tier: "TIER-1",
    codename: "OBSERVER",
    scope: "Unclassified historical archives, public agency profiles, and declassified 1909–2026 records.",
    watchfloorAccess: "Public Directorate Surface Only (/ · /agencies · /history)",
    vettingRequirement: "None — Open Civilian Access",
  },
  {
    tier: "TIER-3",
    codename: "WATCHER",
    scope: "Regional telemetry summaries, non-compartmented orbital ephemeris, and recruitment screening.",
    watchfloorAccess: "Intake Terminal + Read-Only Telemetry (/recruitment)",
    vettingRequirement: "Aptitude Terminal Completion (ARG-2087 Serial)",
  },
  {
    tier: "TIER-5",
    codename: "OPERATIVE",
    scope: "Theatre case files, active operation rosters, and live synthetic SIGINT stream monitoring.",
    watchfloorAccess: "Watchfloor Console (Standard Redaction Masking)",
    vettingRequirement: "Home-Agency Statutory Clearance + Crucible Pass",
  },
  {
    tier: "TIER-7",
    codename: "UMBRA-7 // AEGIS",
    scope: "Full ten-agency coalition fusion, interactive span declassification, and AES-256-GCM Field Vault.",
    watchfloorAccess: "Full Cleared Console (/portal/dashboard · missions · dossiers · comms · vault)",
    vettingRequirement: "Ten-Directorate Concordat Counter-Signature (Demo Enabled at /portal)",
  },
];

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  {
    id: "q1",
    code: "VECTOR 01 // MODULAR LATTICE PARITY",
    domain: "CRYPTANALYSIS (GCHQ · NSA PROTOCOL)",
    prompt:
      "Inspect the intercepted hex progression below. Each frame increments by a deterministic prime stride (+0x11, +0x13, +0x17). Identify the valid fourth verification token:",
    cipherSample: "FRAME_01: 0x3A  ->  FRAME_02: 0x4B (+0x11)  ->  FRAME_03: 0x5E (+0x13)  ->  FRAME_04: [ ? ] (+0x17)",
    options: [
      {
        id: "0x75-OMEGA",
        label: "0x75-OMEGA (0x5E + 0x17 = 0x75)",
        explanation:
          "LOCK ACQUIRED: 0x5E (94 decimal) + 0x17 (23 decimal, next prime) = 117 decimal = 0x75.",
      },
      {
        id: "0x71-DELTA",
        label: "0x71-DELTA (0x5E + 0x13 = 0x71)",
        explanation:
          "PARITY DRIFT: Reuses stride +0x13 instead of advancing to the next prime stride +0x17.",
      },
      {
        id: "0x82-SIGMA",
        label: "0x82-SIGMA (0x5E + 0x24 = 0x82)",
        explanation: "PARITY MISMATCH: Non-prime stride +0x24 violates lattice progression.",
      },
    ],
    correctOptionId: "0x75-OMEGA",
  },
  {
    id: "q2",
    code: "VECTOR 02 // GEOSTATIONARY RELAY TRIANGULATION",
    domain: "ORBITAL TELEMETRY (R&AW · DGSE · ASIS)",
    prompt:
      "A tight-beam 1550nm optical packet originates at Cheltenham (51.8°N, 2.1°W) bound for Canberra (35.2°S, 149.1°E). Direct atmospheric line-of-sight is blocked by Earth curvature. Which coalition station bridges the Indian Ocean equatorial downlink?",
    cipherSample: "ORIGIN: GCHQ [02°W] ===> [ EQUATORIAL RELAY BRIDGE ] ===> TERMINUS: ASIS [149°E]",
    options: [
      {
        id: "RAW-NEW-DELHI",
        label: "R&AW // NEW DELHI RELAY CORRIDOR (28.5°N, 77.2°E)",
        explanation:
          "VECTOR LOCKED: New Delhi (77.2°E) sits midway along the Great-Circle longitudinal arc between 2°W and 149°E.",
      },
      {
        id: "CSIS-OTTAWA",
        label: "CSIS // OTTAWA POLAR ARRAY (45.4°N, 75.6°W)",
        explanation:
          "AZIMUTH ERROR: 75.6°W routes into the Western Hemisphere away from the Indo-Pacific arc.",
      },
      {
        id: "CIA-LANGLEY",
        label: "CIA // LANGLEY STATION (38.9°N, 77.1°W)",
        explanation:
          "AZIMUTH ERROR: Trans-Atlantic vector does not bridge the Southern Cross / Indian Ocean horizon.",
      },
    ],
    correctOptionId: "RAW-NEW-DELHI",
  },
  {
    id: "q3",
    code: "VECTOR 03 // ZERO-TRUST CRYPTOGRAPHIC HYGIENE",
    domain: "INFORMATION ASSURANCE (AEGIS VAULT STANDARD)",
    prompt:
      "An operator encrypts two separate field notes using AES-256-GCM with the same PBKDF2-derived key. Which transmission flaw immediately compromises GCM confidentiality and authentication integrity?",
    cipherSample: "NOTE_A: AES_GCM(Key=K1, IV=0x9F02..A1)  ||  NOTE_B: AES_GCM(Key=K1, IV=0x9F02..A1)",
    options: [
      {
        id: "NONCE-REUSE-DETECTED",
        label: "IV / NONCE REUSE (Identical 96-bit IV used twice under the same key K1)",
        explanation:
          "CRITICAL ANOMALY ISOLATED: Reusing a 96-bit IV under the same AES-GCM key leaks XOR of plaintexts and forges the GHASH authentication key.",
      },
      {
        id: "ITERATION-310K",
        label: "Using 310,000 PBKDF2-SHA256 iterations instead of 1,000",
        explanation:
          "INCORRECT: 310,000 iterations is the recommended OWASP work factor against offline brute-force.",
      },
      {
        id: "TAG-128-BIT",
        label: "Appending a 128-bit GCM authentication tag to the ciphertext",
        explanation:
          "INCORRECT: A full 128-bit authentication tag is required to detect ciphertext tampering.",
      },
    ],
    correctOptionId: "NONCE-REUSE-DETECTED",
  },
];

export function generateCandidateSerial(codename: string): string {
  const clean = codename.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  let hash = 2087;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 33 + clean.charCodeAt(i)) & 0xffff;
  }
  const randomNibble = Math.floor(Math.random() * 16)
    .toString(16)
    .toUpperCase();
  const hex3 = hash.toString(16).toUpperCase().padStart(3, "0").slice(-3);
  return `ARG-2087-${hex3}${randomNibble}`;
}
