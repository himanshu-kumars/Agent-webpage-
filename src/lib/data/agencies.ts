/**
 * AEGIS // OPS GRID — Ten-Agency Allied Directory (FR-001, FR-004, DATABASE.md)
 * NON-NEGOTIABLE CONSTRAINT #2:
 * All real-agency founding years, headquarters, statutory remits, and public facts
 * are sourced strictly from public record. 2087 coalition capabilities are labeled speculative fiction.
 */

export type AgencyCategory = "HUMINT" | "SIGINT" | "FUSION";

export interface AgencyCapabilities {
  humint: number; // 0-100
  sigint: number; // 0-100
  cyber: number; // 0-100
  orbital: number; // 0-100
  fusion: number; // 0-100
}

export interface AgencyPublicFacts {
  enablingActOrOrigin: string;
  parentAuthority: string;
  publicStaffingNote: string;
  historicalHeadquartersNote: string;
  "2087RoleNote": string;
}

export interface AgencyProfile {
  slug: string;
  code: string;
  name: string;
  fullName: string;
  isoCode: string;
  founded: number;
  hqCity: string;
  hqCountry: string;
  remit: string;
  category: AgencyCategory;
  capabilities: AgencyCapabilities;
  publicFacts: AgencyPublicFacts;
  mapX: number; // SVG 0..960
  mapY: number; // SVG 0..480
  coordinatesLabel: string;
  sort: number;
}

export const AGENCIES: AgencyProfile[] = [
  {
    slug: "cia",
    code: "CIA",
    name: "CIA",
    fullName: "Central Intelligence Agency",
    isoCode: "US",
    founded: 1947,
    hqCity: "Langley, Virginia",
    hqCountry: "United States",
    remit:
      "Foreign human intelligence (HUMINT) collection, all-source national security analysis, and presidentially authorized covert action outside United States domestic jurisdiction.",
    category: "HUMINT",
    capabilities: {
      humint: 97,
      sigint: 78,
      cyber: 92,
      orbital: 89,
      fusion: 94,
    },
    publicFacts: {
      enablingActOrOrigin: "National Security Act of 1947 (signed July 26, 1947; effective Sept 18, 1947)",
      parentAuthority: "Reports to the Director of National Intelligence (DNI) and the President",
      publicStaffingNote: "Approximately 21,000+ personnel (declassified aggregate historic estimates)",
      historicalHeadquartersNote: "George Bush Center for Intelligence, Langley, Fairfax County, Virginia",
      "2087RoleNote":
        "[2087 FICTION] Anchors the AEGIS Trans-Atlantic Deep-Cover & Cislunar HUMINT Directorate.",
    },
    mapX: 256,
    mapY: 168,
    coordinatesLabel: "38.9517° N, 77.1467° W",
    sort: 1,
  },
  {
    slug: "sis",
    code: "MI6 / SIS",
    name: "MI6 / SIS",
    fullName: "Secret Intelligence Service (MI6)",
    isoCode: "GB",
    founded: 1909,
    hqCity: "London",
    hqCountry: "United Kingdom",
    remit:
      "Foreign human intelligence collection and clandestine overseas operations in support of UK national security, defence, and economic well-being under the Intelligence Services Act 1994.",
    category: "HUMINT",
    capabilities: {
      humint: 98,
      sigint: 72,
      cyber: 86,
      orbital: 76,
      fusion: 90,
    },
    publicFacts: {
      enablingActOrOrigin:
        "Founded October 1909 as the Foreign Section of the Secret Service Bureau; statutory basis in Intelligence Services Act 1994",
      parentAuthority: "Reports to the UK Foreign, Commonwealth and Development Office (Foreign Secretary)",
      publicStaffingNote: "Approximately 3,500+ staff (publicly disclosed parliamentary figures)",
      historicalHeadquartersNote: "85 Albert Embankment, Vauxhall Cross, London (since 1994)",
      "2087RoleNote":
        "[2087 FICTION] Leads the AEGIS Sovereign Maritime & Diplomatic Counter-Proliferation Desk.",
    },
    mapX: 468,
    mapY: 132,
    coordinatesLabel: "51.4872° N, 0.1244° W",
    sort: 2,
  },
  {
    slug: "raw",
    code: "R&AW",
    name: "R&AW",
    fullName: "Research and Analysis Wing",
    isoCode: "IN",
    founded: 1968,
    hqCity: "New Delhi",
    hqCountry: "India",
    remit:
      "External intelligence collection, strategic counter-terrorism, regional geopolitical assessment, and safeguarding India's strategic and space-faring security interests.",
    category: "HUMINT",
    capabilities: {
      humint: 94,
      sigint: 83,
      cyber: 85,
      orbital: 88,
      fusion: 89,
    },
    publicFacts: {
      enablingActOrOrigin: "Established September 21, 1968 under first Director R. N. Kao",
      parentAuthority: "Cabinet Secretariat, Office of the Prime Minister of India",
      publicStaffingNote: "Classified establishment strength; operates Aviation Research Centre (ARC)",
      historicalHeadquartersNote: "CGO Complex, Lodhi Road, New Delhi",
      "2087RoleNote":
        "[2087 FICTION] Commands the AEGIS Indo-Pacific & Equatorial Orbital Telemetry Corridor.",
    },
    mapX: 662,
    mapY: 205,
    coordinatesLabel: "28.5880° N, 77.2340° E",
    sort: 3,
  },
  {
    slug: "gchq",
    code: "GCHQ",
    name: "GCHQ",
    fullName: "Government Communications Headquarters",
    isoCode: "GB",
    founded: 1919,
    hqCity: "Cheltenham",
    hqCountry: "United Kingdom",
    remit:
      "Signals intelligence (SIGINT), cryptanalysis, information assurance, and national cyber defense (including the National Cyber Security Centre).",
    category: "SIGINT",
    capabilities: {
      humint: 64,
      sigint: 99,
      cyber: 98,
      orbital: 91,
      fusion: 92,
    },
    publicFacts: {
      enablingActOrOrigin:
        "Established November 1, 1919 as the Government Code and Cypher School (GC&CS); renamed GCHQ in 1946",
      parentAuthority: "UK Secretary of State for Foreign, Commonwealth and Development Affairs",
      publicStaffingNote: "Approximately 6,500+ cryptanalysts, mathematicians, and engineers (public annual reports)",
      historicalHeadquartersNote: "The Doughnut, Hubble Road, Cheltenham, Gloucestershire",
      "2087RoleNote":
        "[2087 FICTION] Operates the AEGIS Post-Quantum Lattice Decryption Core at Cheltenham.",
    },
    mapX: 458,
    mapY: 126,
    coordinatesLabel: "51.8992° N, 2.1235° W",
    sort: 4,
  },
  {
    slug: "nsa",
    code: "NSA",
    name: "NSA",
    fullName: "National Security Agency / Central Security Service",
    isoCode: "US",
    founded: 1952,
    hqCity: "Fort Meade, Maryland",
    hqCountry: "United States",
    remit:
      "Global signals intelligence (SIGINT) collection and processing, cryptographic standards engineering, and defense of U.S. national security information systems.",
    category: "SIGINT",
    capabilities: {
      humint: 62,
      sigint: 100,
      cyber: 99,
      orbital: 97,
      fusion: 93,
    },
    publicFacts: {
      enablingActOrOrigin: "Established November 4, 1952 by President Harry S. Truman (succeeding AFSA)",
      parentAuthority: "United States Department of Defense & Director of National Intelligence",
      publicStaffingNote: "Largest employer of mathematicians in the United States; public congressional testimony and reporting cite ~30,000+ civilian and military personnel",
      historicalHeadquartersNote: "Fort George G. Meade, Maryland",
      "2087RoleNote":
        "[2087 FICTION] Maintains the AEGIS Deep-Space Lasercom & Exascale SIGINT Backbone.",
    },
    mapX: 266,
    mapY: 162,
    coordinatesLabel: "39.1086° N, 76.7713° W",
    sort: 5,
  },
  {
    slug: "mossad",
    code: "MOSSAD",
    name: "Mossad",
    fullName: "Institute for Intelligence and Special Operations",
    isoCode: "IL",
    founded: 1951,
    hqCity: "Tel Aviv",
    hqCountry: "Israel",
    remit:
      "Foreign intelligence collection, strategic technological counter-proliferation, covert field operations, and counter-terrorism beyond national borders.",
    category: "HUMINT",
    capabilities: {
      humint: 97,
      sigint: 82,
      cyber: 94,
      orbital: 80,
      fusion: 91,
    },
    publicFacts: {
      enablingActOrOrigin:
        "Formed December 13, 1949 as the Central Institute for Coordination; reorganized March 1951 under the Prime Minister's Office",
      parentAuthority: "Reports directly to the Prime Minister of Israel",
      publicStaffingNote: "Public academic estimates cite ~7,000 personnel",
      historicalHeadquartersNote: "Tel Aviv Metropolitan Area, Israel",
      "2087RoleNote":
        "[2087 FICTION] Directs the AEGIS Rapid Technical Interdiction & Autonomous Asset Cell.",
    },
    mapX: 556,
    mapY: 192,
    coordinatesLabel: "32.0853° N, 34.7818° E",
    sort: 6,
  },
  {
    slug: "bnd",
    code: "BND",
    name: "BND",
    fullName: "Bundesnachrichtendienst (Federal Intelligence Service)",
    isoCode: "DE",
    founded: 1956,
    hqCity: "Pullach / Berlin",
    hqCountry: "Germany",
    remit:
      "All-source foreign civilian and military intelligence fusion (HUMINT, SIGINT, OSINT, imagery) providing strategic early warning to the German Federal Government.",
    category: "FUSION",
    capabilities: {
      humint: 86,
      sigint: 91,
      cyber: 88,
      orbital: 85,
      fusion: 96,
    },
    publicFacts: {
      enablingActOrOrigin: "Established April 1, 1956 under the BND Act (BND-Gesetz)",
      parentAuthority: "Federal Chancellery (Bundeskanzleramt) of the Federal Republic of Germany",
      publicStaffingNote: "Approximately 6,500 employees (official BND public disclosure)",
      historicalHeadquartersNote:
        "Founded in Pullach near Munich (1956); central headquarters opened at Chausseestraße, Berlin (2019)",
      "2087RoleNote":
        "[2087 FICTION] Operates the AEGIS Continental Telemetry Fusion & Parliamentary Audit Hub.",
    },
    mapX: 498,
    mapY: 130,
    coordinatesLabel: "52.5326° N, 13.3765° E",
    sort: 7,
  },
  {
    slug: "dgse",
    code: "DGSE",
    name: "DGSE",
    fullName: "Direction générale de la sécurité extérieure",
    isoCode: "FR",
    founded: 1982,
    hqCity: "Paris",
    hqCountry: "France",
    remit:
      "Integrated foreign intelligence (HUMINT, technical SIGINT, space reconnaissance, and special operations) safeguarding French and allied strategic autonomy.",
    category: "FUSION",
    capabilities: {
      humint: 92,
      sigint: 90,
      cyber: 89,
      orbital: 92,
      fusion: 95,
    },
    publicFacts: {
      enablingActOrOrigin: "Created April 2, 1982 by Decree No. 82-306 (succeeding the SDECE)",
      parentAuthority: "Ministry of the Armed Forces (Ministère des Armées), French Republic",
      publicStaffingNote: "Approximately 7,000+ civilian and military personnel (public Ministry disclosures)",
      historicalHeadquartersNote: "Boulevard Mortier (Caserne des Tourelles / Fort Neuf de Vincennes), Paris",
      "2087RoleNote":
        "[2087 FICTION] Coordinates the AEGIS Helios-IX Geostationary Optical Reconnaissance Wing.",
    },
    mapX: 478,
    mapY: 142,
    coordinatesLabel: "48.8742° N, 2.4069° E",
    sort: 8,
  },
  {
    slug: "asis",
    code: "ASIS",
    name: "ASIS",
    fullName: "Australian Secret Intelligence Service",
    isoCode: "AU",
    founded: 1952,
    hqCity: "Melbourne / Canberra",
    hqCountry: "Australia",
    remit:
      "Overseas human intelligence collection, counter-intelligence, and liaison operations across the Southern Hemisphere and Indo-Pacific under the Intelligence Services Act 2001.",
    category: "HUMINT",
    capabilities: {
      humint: 93,
      sigint: 79,
      cyber: 84,
      orbital: 86,
      fusion: 89,
    },
    publicFacts: {
      enablingActOrOrigin:
        "Established May 13, 1952 by executive order of Prime Minister Robert Menzies; statutory basis in Intelligence Services Act 2001",
      parentAuthority: "Department of Foreign Affairs and Trade (Minister for Foreign Affairs)",
      publicStaffingNote: "Public portfolio budget statements confirm foreign service & technical cadre",
      historicalHeadquartersNote: "Founded in Melbourne (1952); current headquarters in Canberra, ACT",
      "2087RoleNote":
        "[2087 FICTION] Safeguards the AEGIS Southern Cross Deep-Space & Antarctic Laser Relay.",
    },
    mapX: 792,
    mapY: 365,
    coordinatesLabel: "35.2809° S, 149.1300° E",
    sort: 9,
  },
  {
    slug: "csis",
    code: "CSIS",
    name: "CSIS",
    fullName: "Canadian Security Intelligence Service",
    isoCode: "CA",
    founded: 1984,
    hqCity: "Ottawa",
    hqCountry: "Canada",
    remit:
      "Security intelligence fusion, counter-espionage, Arctic sovereignty threat assessment, and critical infrastructure protection under the CSIS Act.",
    category: "FUSION",
    capabilities: {
      humint: 85,
      sigint: 84,
      cyber: 88,
      orbital: 87,
      fusion: 94,
    },
    publicFacts: {
      enablingActOrOrigin: "Established June 21, 1984 (operational July 16, 1984) via the CSIS Act",
      parentAuthority: "Minister of Public Safety, Parliament of Canada",
      publicStaffingNote: "Approximately 3,600+ personnel (CSIS public annual reports)",
      historicalHeadquartersNote: "1941 Ogilvie Road, Gloucester, Ottawa, Ontario",
      "2087RoleNote":
        "[2087 FICTION] Commands the AEGIS High-Arctic Polar Ionospheric & Sub-Glacial Sensor Grid.",
    },
    mapX: 268,
    mapY: 140,
    coordinatesLabel: "45.4215° N, 75.6972° W",
    sort: 10,
  },
];

export function getAgencyBySlug(slug: string): AgencyProfile | undefined {
  return AGENCIES.find((agency) => agency.slug.toLowerCase() === slug.toLowerCase());
}
