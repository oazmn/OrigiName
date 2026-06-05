import type { Culture } from "@/types/game";

export const CULTURES: Culture[] = [
  // West Africa
  { id: "igbo",         name: "Igbo",              region: "West Africa",     lat: 6.0,   lng: 7.0   },
  { id: "yoruba",       name: "Yoruba",             region: "West Africa",     lat: 7.4,   lng: 3.9   },
  { id: "akan",         name: "Akan (Asante)",      region: "West Africa",     lat: 6.5,   lng: -1.5  },
  { id: "wolof",        name: "Wolof",              region: "West Africa",     lat: 14.7,  lng: -17.4 },
  { id: "hausa",        name: "Hausa",              region: "West Africa",     lat: 12.0,  lng: 8.5   },
  { id: "mandinka",     name: "Mandinka",           region: "West Africa",     lat: 13.4,  lng: -16.6 },
  { id: "fula",         name: "Fula/Fulani",        region: "West Africa",     lat: 11.5,  lng: -15.0 },
  { id: "ewe",          name: "Ewe",                region: "West Africa",     lat: 6.1,   lng: 0.5   },
  { id: "fang",         name: "Fang",               region: "West Africa",     lat: 2.0,   lng: 11.5  },
  { id: "zarma",        name: "Zarma/Songhay",      region: "West Africa",     lat: 13.5,  lng: 2.0   },

  // Central Africa
  { id: "lingala",      name: "Lingala (Congolese)",region: "Central Africa",  lat: -1.0,  lng: 18.0  },
  { id: "chewa",        name: "Chewa",              region: "Central Africa",  lat: -15.0, lng: 34.5  },

  // East Africa
  { id: "amharic",      name: "Amharic (Ethiopian)",region: "East Africa",     lat: 9.0,   lng: 38.7  },
  { id: "oromo",        name: "Oromo",              region: "East Africa",     lat: 8.0,   lng: 39.0  },
  { id: "tigrinya",     name: "Tigrinya (Eritrean)",region: "East Africa",     lat: 15.0,  lng: 39.0  },
  { id: "swahili",      name: "Swahili",            region: "East Africa",     lat: -6.0,  lng: 35.7  },
  { id: "luganda",      name: "Baganda (Ugandan)",  region: "East Africa",     lat: 0.3,   lng: 32.4  },
  { id: "somali",       name: "Somali",             region: "East Africa",     lat: 2.0,   lng: 45.3  },
  { id: "kinyarwanda",  name: "Kinyarwanda",        region: "East Africa",     lat: -2.0,  lng: 30.0  },
  { id: "kikuyu",       name: "Kikuyu",             region: "East Africa",     lat: -0.5,  lng: 37.0  },
  { id: "luo",          name: "Luo (Kenyan)",       region: "East Africa",     lat: -0.1,  lng: 34.5  },

  // Southern Africa
  { id: "zulu",         name: "Zulu",               region: "Southern Africa", lat: -29.0, lng: 31.0  },
  { id: "shona",        name: "Shona (Zimbabwean)", region: "Southern Africa", lat: -20.0, lng: 30.0  },
  { id: "xhosa",        name: "Xhosa",              region: "Southern Africa", lat: -32.0, lng: 27.0  },
  { id: "sotho",        name: "Sotho/Tswana",       region: "Southern Africa", lat: -29.0, lng: 27.0  },
  { id: "ndebele",      name: "Ndebele",            region: "Southern Africa", lat: -20.0, lng: 29.0  },

  // North Africa
  { id: "egyptian-arabic", name: "Egyptian Arabic", region: "North Africa",   lat: 27.0,  lng: 30.0  },
  { id: "amazigh",      name: "Amazigh/Berber",     region: "North Africa",    lat: 31.5,  lng: -7.0  },
  { id: "sudanese",     name: "Sudanese Arabic",    region: "North Africa",    lat: 15.5,  lng: 32.5  },
  { id: "nubian",       name: "Nubian",             region: "North Africa",    lat: 20.0,  lng: 31.0  },

  // Middle East
  { id: "gulf-arabic",  name: "Gulf Arabic",        region: "Middle East",     lat: 24.0,  lng: 45.0  },
  { id: "levantine",    name: "Levantine Arabic",   region: "Middle East",     lat: 33.5,  lng: 36.3  },
  { id: "yemeni",       name: "Yemeni Arabic",      region: "Middle East",     lat: 15.5,  lng: 48.0  },
  { id: "persian",      name: "Persian/Farsi",      region: "Middle East",     lat: 32.0,  lng: 53.0  },
  { id: "hebrew",       name: "Hebrew (Israeli)",   region: "Middle East",     lat: 31.5,  lng: 35.0  },
  { id: "turkish",      name: "Turkish",            region: "Middle East",     lat: 39.0,  lng: 35.0  },
  { id: "kurdish",      name: "Kurdish",            region: "Middle East",     lat: 37.0,  lng: 43.0  },

  // Caucasus
  { id: "armenian",     name: "Armenian",           region: "Caucasus",        lat: 40.0,  lng: 44.9  },
  { id: "georgian",     name: "Georgian",           region: "Caucasus",        lat: 42.0,  lng: 43.5  },
  { id: "azerbaijani",  name: "Azerbaijani",        region: "Caucasus",        lat: 40.4,  lng: 49.9  },

  // Central Asia
  { id: "kazakh",       name: "Kazakh",             region: "Central Asia",    lat: 48.0,  lng: 66.0  },
  { id: "uzbek",        name: "Uzbek",              region: "Central Asia",    lat: 41.0,  lng: 64.0  },
  { id: "kyrgyz",       name: "Kyrgyz",             region: "Central Asia",    lat: 41.2,  lng: 74.8  },
  { id: "tajik",        name: "Tajik",              region: "Central Asia",    lat: 38.5,  lng: 71.3  },
  { id: "turkmen",      name: "Turkmen",            region: "Central Asia",    lat: 40.0,  lng: 60.0  },

  // South Asia
  { id: "hindi-sanskrit", name: "Hindi/Sanskrit",  region: "South Asia",      lat: 20.6,  lng: 78.9  },
  { id: "bengali",      name: "Bengali",            region: "South Asia",      lat: 23.7,  lng: 90.3  },
  { id: "tamil",        name: "Tamil",              region: "South Asia",      lat: 10.9,  lng: 78.7  },
  { id: "punjabi",      name: "Punjabi",            region: "South Asia",      lat: 31.0,  lng: 74.0  },
  { id: "gujarati",     name: "Gujarati",           region: "South Asia",      lat: 23.0,  lng: 72.0  },
  { id: "marathi",      name: "Marathi",            region: "South Asia",      lat: 19.1,  lng: 75.7  },
  { id: "telugu",       name: "Telugu",             region: "South Asia",      lat: 17.0,  lng: 79.0  },
  { id: "malayalam",    name: "Malayalam (Keralan)",region: "South Asia",      lat: 10.5,  lng: 76.3  },
  { id: "kannada",      name: "Kannada",            region: "South Asia",      lat: 15.0,  lng: 75.0  },
  { id: "odia",         name: "Odia (Orissan)",     region: "South Asia",      lat: 20.5,  lng: 85.0  },
  { id: "nepali",       name: "Nepali",             region: "South Asia",      lat: 28.0,  lng: 84.0  },
  { id: "sinhala",      name: "Sinhala (Sri Lankan)",region: "South Asia",     lat: 7.9,   lng: 80.7  },
  { id: "urdu-pakistan",name: "Urdu (Pakistani)",   region: "South Asia",      lat: 30.0,  lng: 69.3  },
  { id: "pashto",       name: "Pashto (Afghan)",    region: "South Asia",      lat: 34.0,  lng: 65.0  },
  { id: "sindhi",       name: "Sindhi",             region: "South Asia",      lat: 26.0,  lng: 68.0  },

  // Southeast Asia
  { id: "javanese",     name: "Javanese",           region: "Southeast Asia",  lat: -7.0,  lng: 110.0 },
  { id: "sundanese",    name: "Sundanese",          region: "Southeast Asia",  lat: -6.9,  lng: 107.6 },
  { id: "batak",        name: "Batak (Sumatran)",   region: "Southeast Asia",  lat: 2.5,   lng: 98.5  },
  { id: "malay",        name: "Malay",              region: "Southeast Asia",  lat: 1.4,   lng: 110.0 },
  { id: "filipino",     name: "Filipino/Tagalog",   region: "Southeast Asia",  lat: 14.6,  lng: 121.0 },
  { id: "thai",         name: "Thai",               region: "Southeast Asia",  lat: 15.0,  lng: 100.5 },
  { id: "vietnamese",   name: "Vietnamese",         region: "Southeast Asia",  lat: 16.0,  lng: 108.0 },
  { id: "khmer",        name: "Khmer (Cambodian)",  region: "Southeast Asia",  lat: 12.6,  lng: 104.9 },
  { id: "burmese",      name: "Burmese",            region: "Southeast Asia",  lat: 19.0,  lng: 96.5  },
  { id: "lao",          name: "Lao",                region: "Southeast Asia",  lat: 17.9,  lng: 102.6 },

  // East Asia
  { id: "chinese",      name: "Chinese (Mandarin)", region: "East Asia",       lat: 35.0,  lng: 105.0 },
  { id: "cantonese",    name: "Cantonese",          region: "East Asia",       lat: 23.1,  lng: 113.3 },
  { id: "tibetan",      name: "Tibetan",            region: "East Asia",       lat: 29.0,  lng: 91.0  },
  { id: "uyghur",       name: "Uyghur",             region: "Central Asia",    lat: 41.0,  lng: 85.0  },
  { id: "japanese",     name: "Japanese",           region: "East Asia",       lat: 36.0,  lng: 138.0 },
  { id: "korean",       name: "Korean",             region: "East Asia",       lat: 37.0,  lng: 127.5 },
  { id: "mongolian",    name: "Mongolian",          region: "East Asia",       lat: 47.0,  lng: 103.0 },

  // Pacific
  { id: "maori",        name: "Māori",              region: "Pacific",         lat: -41.0, lng: 174.0 },
  { id: "hawaiian",     name: "Hawaiian",           region: "Pacific",         lat: 20.5,  lng: -157.5},
  { id: "samoan",       name: "Samoan",             region: "Pacific",         lat: -13.7, lng: -172.0},
  { id: "fijian",       name: "Fijian",             region: "Pacific",         lat: -18.0, lng: 178.0 },
  { id: "tongan",       name: "Tongan",             region: "Pacific",         lat: -21.0, lng: -175.0},
  { id: "chamorro",     name: "Chamorro",           region: "Pacific",         lat: 13.5,  lng: 144.8 },

  // Indigenous Americas
  { id: "nahuatl",      name: "Nahuatl (Aztec)",    region: "Mesoamerica",     lat: 19.0,  lng: -99.0 },
  { id: "maya",         name: "Maya",               region: "Mesoamerica",     lat: 20.0,  lng: -89.0 },
  { id: "quechua",      name: "Quechua (Andean)",   region: "South America",   lat: -12.0, lng: -76.0 },
  { id: "aymara",       name: "Aymara",             region: "South America",   lat: -15.0, lng: -69.0 },
  { id: "mapuche",      name: "Mapuche",            region: "South America",   lat: -38.0, lng: -72.0 },
  { id: "guarani",      name: "Guaraní",            region: "South America",   lat: -23.0, lng: -58.0 },
  { id: "lakota",       name: "Lakota/Sioux",       region: "North America",   lat: 44.0,  lng: -100.0},
  { id: "cherokee",     name: "Cherokee",           region: "North America",   lat: 35.5,  lng: -83.5 },
  { id: "inuit",        name: "Inuit/Inuktitut",    region: "North America",   lat: 63.0,  lng: -68.0 },

  // Western Europe
  { id: "french",       name: "French",             region: "Western Europe",  lat: 46.0,  lng: 2.0   },
  { id: "germanic",     name: "German/Germanic",    region: "Western Europe",  lat: 51.0,  lng: 10.0  },
  { id: "dutch",        name: "Dutch/Flemish",      region: "Western Europe",  lat: 52.3,  lng: 5.3   },
  { id: "basque",       name: "Basque",             region: "Western Europe",  lat: 43.0,  lng: -2.5  },

  // Northern Europe
  { id: "scandinavian", name: "Scandinavian/Norse", region: "Northern Europe", lat: 60.0,  lng: 15.0  },
  { id: "finnish",      name: "Finnish",            region: "Northern Europe", lat: 64.0,  lng: 26.0  },
  { id: "baltic",       name: "Baltic (Lithuanian)",region: "Northern Europe", lat: 56.0,  lng: 24.0  },

  // British Isles
  { id: "celtic",       name: "Celtic (Irish/Scottish)", region: "British Isles", lat: 53.0, lng: -7.0 },
  { id: "welsh",        name: "Welsh",              region: "British Isles",   lat: 52.0,  lng: -3.5  },

  // Southern Europe
  { id: "italian",      name: "Italian",            region: "Southern Europe", lat: 42.0,  lng: 13.0  },
  { id: "iberian",      name: "Iberian (Spanish)",  region: "Southern Europe", lat: 40.0,  lng: -4.0  },
  { id: "portuguese",   name: "Portuguese",         region: "Southern Europe", lat: 39.5,  lng: -8.0  },
  { id: "greek",        name: "Greek",              region: "Southern Europe", lat: 38.0,  lng: 23.7  },
  { id: "catalan",      name: "Catalan",            region: "Southern Europe", lat: 41.5,  lng: 1.5   },
  { id: "albanian",     name: "Albanian",           region: "Southern Europe", lat: 41.0,  lng: 20.0  },

  // Eastern & Central Europe
  { id: "slavic-east",  name: "East Slavic (Russian)", region: "Eastern Europe", lat: 55.0, lng: 37.0 },
  { id: "slavic-south", name: "South Slavic (Serbian/Croatian)", region: "Eastern Europe", lat: 44.0, lng: 17.0 },
  { id: "slavic-west",  name: "West Slavic (Polish)", region: "Eastern Europe", lat: 52.0, lng: 19.0  },
  { id: "czech-slovak", name: "Czech/Slovak",       region: "Eastern Europe",  lat: 49.8,  lng: 15.5  },
  { id: "hungarian",    name: "Hungarian/Magyar",   region: "Central Europe",  lat: 47.0,  lng: 19.0  },
  { id: "romanian",     name: "Romanian",           region: "Eastern Europe",  lat: 45.5,  lng: 25.0  },
];

export function broadContinent(region: string): string {
  if (region.includes("Africa")) return "Africa";
  if (["Mesoamerica", "South America"].includes(region)) return "the Americas";
  if (region === "Pacific") return "Oceania & the Pacific";
  if (["Western Europe", "Northern Europe", "Eastern Europe", "Southern Europe", "British Isles", "Central Europe"].includes(region)) return "Europe";
  return "Asia";
}

export function getRandomCultures(n: number): Culture[] {
  const arr = [...CULTURES];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}
