/**
 * AEGIS // OPS GRID — Redaction-Heavy Fictional Dossiers Catalog (FR-011, DATABASE.md)
 * NON-NEGOTIABLE CONSTRAINT #3:
 * All subjects, artifacts, syndicates, and dossiers below are 100% speculative 2087 fiction.
 */

import type { BriefingSegment, SecurityClassification } from "./operations";

export type DossierCategory = "ARTIFACT" | "SYNDICATE" | "ORBITAL" | "PERSONNEL";

export interface DossierSection {
  heading: string;
  segments: BriefingSegment[];
}

export interface DossierFile {
  id: string;
  code: string;
  title: string;
  subject: string;
  category: DossierCategory;
  classification: SecurityClassification;
  leadAgency: string;
  pages: number;
  redactionDensity: number; // percentage e.g. 38%
  updatedAt: string;
  abstract: string;
  sections: DossierSection[];
  featured: boolean; // Top 8 primary watchfloor cards
  isFiction: true;
}

export const DOSSIERS: DossierFile[] = [
  {
    id: "dos-01-ghost-lattice",
    code: "DOS-2087-01 // GL",
    title: "ANOMALY CLUSTER: 'GHOST-LATTICE' GRAVEYARD RELAY",
    subject: "Twelve Decommissioned Geostationary Hulls Acting as Phase-Coherent Mirrors",
    category: "ORBITAL",
    classification: "UMBRA-7",
    leadAgency: "NSA · GCHQ",
    pages: 48,
    redactionDensity: 42,
    updatedAt: "2087-11-10T16:15:00Z",
    abstract:
      "Technical reconstruction of cold-war communications satellites retrofitted in orbit with passive metamaterial corner reflectors.",
    sections: [
      {
        heading: "1.0 EXECUTIVE TELEMETRY ASSESSMENT",
        segments: [
          { type: "text", value: "Between 2085.210 and 2087.301, optical tracking domes at " },
          { type: "redacted", value: "FORT MEADE CRYOGENIC ARRAY-02" },
          { type: "text", value: " and " },
          { type: "redacted", value: "CHELTENHAM HUBBLE ROAD SECTOR-C" },
          {
            type: "text",
            value:
              " recorded non-random polarization shifts bouncing across twelve graveyard-orbit hulls. Rather than using active RF transmitters that would trigger coalition space-fence alarms, an unknown micro-tug applied ",
          },
          { type: "redacted", value: "DIELECTRIC METASURFACE FOIL PATCHES" },
          { type: "text", value: " to the derelict solar panels." },
        ],
      },
      {
        heading: "2.0 ATTRIBUTION & COUNTERMEASURES",
        segments: [
          { type: "text", value: "Back-projection of the reflected 1550nm laser beam intersects terrestrial downlinks near " },
          { type: "redacted", value: "58.410° N, 24.890° W (AUTONOMOUS SPAR BUOY)" },
          {
            type: "text",
            value:
              ". Coalition directive authorizes continuous phase-noise injection under Operation GLASS HORIZON.",
          },
        ],
      },
    ],
    featured: true,
    isFiction: true,
  },
  {
    id: "dos-02-borealis-syndicate",
    code: "DOS-2087-02 // BM",
    title: "NON-STATE ACTOR: BOREALIS MERIDIAN HOLDINGS",
    subject: "Offshore Autonomous Compute & Sub-Glacial Fiber Clearinghouse",
    category: "SYNDICATE",
    classification: "ORCON",
    leadAgency: "BND · CSIS",
    pages: 64,
    redactionDensity: 39,
    updatedAt: "2087-11-09T22:40:00Z",
    abstract:
      "Forensic corporate graph tracing shell entities chartering polar icebreakers and unlicensed ionospheric transmitters.",
    sections: [
      {
        heading: "1.0 CORPORATE SHELL TOPOLOGY",
        segments: [
          { type: "text", value: "Financial ledger correlation conducted by " },
          { type: "redacted", value: "BERLIN CHAUSSEESTRASSE FUSION UNIT-08" },
          {
            type: "text",
            value:
              " links seventeen maritime logistics trusts in Zug and Reykjavik to a single autonomous treasury smart-contract anchored at ",
          },
          { type: "redacted", value: "SVALBARD DARK-FIBER VAULT NODE-19" },
          { type: "text", value: "." },
        ],
      },
      {
        heading: "2.0 ARCTIC SENSOR INTERFERENCE",
        segments: [
          { type: "text", value: "Ottawa CSIS analysts confirmed that icebreaker vessel " },
          { type: "redacted", value: "MV NORTHERN PARALLAX (IMO-9984120)" },
          {
            type: "text",
            value:
              " carries a containerized 4-megawatt HF ionospheric heater disguised as seismic mapping gear.",
          },
        ],
      },
    ],
    featured: true,
    isFiction: true,
  },
  {
    id: "dos-03-vesper-chronometer",
    code: "DOS-2087-03 // VC",
    title: "ARTIFACT FILE: SUB-BENTHIC PHOTONIC COUPLER 'VESPER-9'",
    subject: "Zero-Splice Evanescent Wave Tap Recovered from Ninety East Ridge",
    category: "ARTIFACT",
    classification: "UMBRA-7",
    leadAgency: "R&AW · ASIS",
    pages: 36,
    redactionDensity: 47,
    updatedAt: "2087-11-10T11:05:00Z",
    abstract:
      "Metallurgical and optical tear-down of a deep-sea pressure vessel harvesting evanescent photons without cutting undersea armor.",
    sections: [
      {
        heading: "1.0 RECOVERY CIRCUMSTANCES",
        segments: [
          { type: "text", value: "Recovered at 4,210 meters depth by R&AW bathy-glider " },
          { type: "redacted", value: "ARC-MAKAR-09" },
          {
            type: "text",
            value:
              " and transferred to the joint Canberra-New Delhi cleanroom at ",
          },
          { type: "redacted", value: "ANDAMAN DEEP ACOUSTIC FACILITY" },
          {
            type: "text",
            value:
              ". The device uses piezoceramic micro-benders to siphon 0.08% of coherent light from trunk fibers.",
          },
        ],
      },
      {
        heading: "2.0 CRYPTOGRAPHIC BUFFER ANALYSIS",
        segments: [
          { type: "text", value: "Solid-state lattice memory inside the titanium sphere held 14 terabytes of buffered headers keyed to selector " },
          { type: "redacted", value: "KEY-ID // 0x99F4-KESTREL-NULL" },
          { type: "text", value: "." },
        ],
      },
    ],
    featured: true,
    isFiction: true,
  },
  {
    id: "dos-04-callsign-mirage",
    code: "DOS-2087-04 // CM",
    title: "SUBJECT PROFILE: CALLSIGN 'ARCHIVIST-ZERO'",
    subject: "Fictional Rogue Cryptographer & Synthetic Ephemeris Broker",
    category: "PERSONNEL",
    classification: "EYES ONLY",
    leadAgency: "MI6 / SIS · CIA",
    pages: 52,
    redactionDensity: 54,
    updatedAt: "2087-11-08T19:30:00Z",
    abstract:
      "Behavioral stylometry and cryptographic signature profile of an elusive broker trading decommissioned satellite command keys.",
    sections: [
      {
        heading: "1.0 STYLOMETRIC SIGNATURE",
        segments: [
          { type: "text", value: "Joint Langley and Vauxhall Cross counter-intelligence cells first isolated the signature of " },
          { type: "redacted", value: "SUBJECT 'ARCHIVIST-ZERO' (ALIAS: H. VANCE)" },
          {
            type: "text",
            value:
              " from zero-knowledge proof auctions routed through ",
          },
          { type: "redacted", value: "REYKJAVIK-HALIFAX RELAY NODE-11" },
          {
            type: "text",
            value:
              ". Every transmission embeds a distinctive 1970s Julian date checksum.",
          },
        ],
      },
      {
        heading: "2.0 CONTAINMENT DIRECTIVE",
        segments: [
          { type: "text", value: "Under Operation WINTER KESTREL, barium-watermarked orbital tables generated at " },
          { type: "redacted", value: "LANGLEY STARLIGHT LAB-04" },
          {
            type: "text",
            value:
              " have been seeded into the broker's drop boxes to map downstream buyers.",
          },
        ],
      },
    ],
    featured: true,
    isFiction: true,
  },
  {
    id: "dos-05-helios-blindspot",
    code: "DOS-2087-05 // HB",
    title: "ORBITAL BRIEF: CISLUNAR L1 CORRIDOR OCCULTATION",
    subject: "Micro-Thruster Plume Masking During Solar Conjunction Windows",
    category: "ORBITAL",
    classification: "UMBRA-7",
    leadAgency: "DGSE · CIA",
    pages: 29,
    redactionDensity: 31,
    updatedAt: "2087-11-07T14:20:00Z",
    abstract:
      "Astrodynamic modeling of automated freighters executing unannounced inclination changes while masked by solar corona glare.",
    sections: [
      {
        heading: "1.0 SOLAR CONJUNCTION TELEMETRY",
        segments: [
          { type: "text", value: "DGSE optical coronagraphs on platform " },
          { type: "redacted", value: "HELIOS-IX // GEO-SLOT 04°E" },
          {
            type: "text",
            value:
              " resolved cold-gas xenon thruster plumes emerging from freighter ",
          },
          { type: "redacted", value: "CSV-ARTEMISIA-88" },
          {
            type: "text",
            value:
              " during a 19-minute solar conjunction window.",
          },
        ],
      },
    ],
    featured: true,
    isFiction: true,
  },
  {
    id: "dos-06-cryo-foundry",
    code: "DOS-2087-06 // CF",
    title: "TECHNICAL ASSESSMENT: SUBTERRANEAN CRYO-COMPUTE FOUNDRY",
    subject: "Unlicensed Millikelvin Quantum Annealing Cluster in the Eastern Med",
    category: "ARTIFACT",
    classification: "EYES ONLY",
    leadAgency: "Mossad · GCHQ",
    pages: 41,
    redactionDensity: 49,
    updatedAt: "2087-11-06T09:12:00Z",
    abstract:
      "Thermal-infrared and helium-3 supply-chain signatures indicating an undeclared 4,096-qubit fault-tolerant array.",
    sections: [
      {
        heading: "1.0 ISOTOPIC SUPPLY-CHAIN TRACE",
        segments: [
          { type: "text", value: "Tel Aviv technical analysts tagged three closed-cycle dilution cryostats transiting " },
          { type: "redacted", value: "FREEPORT WAREHOUSE PIER-19" },
          {
            type: "text",
            value:
              ". Muon tomography from overhead low-earth sensors revealed a shielded cavern 90 meters beneath ",
          },
          { type: "redacted", value: "SECTOR LIMASSOL-WEST LIMESTONE KARST" },
          { type: "text", value: "." },
        ],
      },
    ],
    featured: true,
    isFiction: true,
  },
  {
    id: "dos-07-neptune-forge",
    code: "DOS-2087-07 // NF",
    title: "MARITIME RECON: MOBILE SEA-LAUNCH BARGE 'NEPTUNE FORGE'",
    subject: "Autonomous Sub-Orbital Sounding Platform in the Southern Ocean",
    category: "SYNDICATE",
    classification: "UMBRA-7",
    leadAgency: "ASIS · R&AW",
    pages: 33,
    redactionDensity: 36,
    updatedAt: "2087-11-05T17:50:00Z",
    abstract:
      "Synthetic-aperture radar imagery of a dynamically positioned trimaran barge launching high-altitude atmospheric relays.",
    sections: [
      {
        heading: "1.0 HYDROGRAPHIC PROFILE",
        segments: [
          { type: "text", value: "Tracked by Canberra and New Delhi ocean-surveillance satellites across the " },
          { type: "redacted", value: "KERGUELEN PLATEAU (49.25°S, 69.18°E)" },
          {
            type: "text",
            value:
              ", vessel ",
          },
          { type: "redacted", value: "HULL-X77 // NEPTUNE FORGE" },
          {
            type: "text",
            value:
              " operates without AIS transponders and replenishes via automated hydrofoil tenders.",
          },
        ],
      },
    ],
    featured: true,
    isFiction: true,
  },
  {
    id: "dos-08-alpine-qkd",
    code: "DOS-2087-08 // AQ",
    title: "INFRASTRUCTURE AUDIT: GOTTHARD-BRENNER QUANTUM RING",
    subject: "Photon-Number-Splitting Resilience Across Continental Fiber Backbones",
    category: "ARTIFACT",
    classification: "ORCON",
    leadAgency: "BND · DGSE",
    pages: 27,
    redactionDensity: 28,
    updatedAt: "2087-11-04T08:00:00Z",
    abstract:
      "Joint European verification report on decoy-state quantum key repeaters linking Berlin, Paris, Zurich, and Milan.",
    sections: [
      {
        heading: "1.0 QUANTUM BIT ERROR RATE (QBER) BASELINE",
        segments: [
          { type: "text", value: "Fourteen subterranean optical vaults monitored by " },
          { type: "redacted", value: "BND PULLACH TECHNICAL DIRECTORATE" },
          {
            type: "text",
            value:
              " and Paris DGSE engineers sustained a continuous QBER below 0.45% across 900 kilometers of rock-shielded conduit.",
          },
        ],
      },
    ],
    featured: true,
    isFiction: true,
  },
  {
    id: "dos-09-atacama-mirror",
    code: "DOS-2087-09 // AM",
    title: "ARCHIVE SHELL: ATACAMA DEEP-SPACE PHASE INTERFEROMETER",
    subject: "High-Altitude Optical Downlink Calibration Logs",
    category: "ORBITAL",
    classification: "ORCON",
    leadAgency: "CIA · NSA",
    pages: 19,
    redactionDensity: 25,
    updatedAt: "2087-10-29T12:00:00Z",
    abstract:
      "Secondary calibration dossier for southern-hemisphere cislunar optical telemetry receivers.",
    sections: [
      {
        heading: "1.0 ARRAY CALIBRATION",
        segments: [
          { type: "text", value: "Adaptive optics mirrors at " },
          { type: "redacted", value: "CHAJNANTOR PLATEAU STATION-06" },
          { type: "text", value: " achieved 99.4% Strehl ratio lock on L1 beacon frames." },
        ],
      },
    ],
    featured: false,
    isFiction: true,
  },
  {
    id: "dos-10-ottawa-ion",
    code: "DOS-2087-10 // OI",
    title: "ARCHIVE SHELL: MAGNETOSPHERIC SCINTILLATION INDEX",
    subject: "High-Latitude Geomagnetic Storm Compensation Tables",
    category: "ORBITAL",
    classification: "UMBRA-7",
    leadAgency: "CSIS · GCHQ",
    pages: 22,
    redactionDensity: 30,
    updatedAt: "2087-10-21T05:30:00Z",
    abstract:
      "Reference tables isolating natural solar-wind scintillation from synthetic ionospheric heating.",
    sections: [
      {
        heading: "1.0 MAGNETOMETER CORRELATION",
        segments: [
          { type: "text", value: "Sub-auroral fluxgate sensors at " },
          { type: "redacted", value: "OTTAWA GLOUCESTER ARRAY-01" },
          { type: "text", value: " provide baseline phase-correction vectors to all polar watchfloors." },
        ],
      },
    ],
    featured: false,
    isFiction: true,
  },
];

export const FEATURED_DOSSIERS = DOSSIERS.filter((d) => d.featured);

export function getDossierById(id: string): DossierFile | undefined {
  return DOSSIERS.find((d) => d.id.toLowerCase() === id.toLowerCase());
}
