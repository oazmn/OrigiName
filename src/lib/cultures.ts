import type { Culture } from "@/types/game";

export const CULTURES: Culture[] = [
  // West Africa
  { id: "igbo", name: "Igbo", region: "West Africa", lat: 6.0, lng: 7.0 },
  { id: "yoruba", name: "Yoruba", region: "West Africa", lat: 7.4, lng: 3.9 },
  { id: "akan", name: "Akan (Asante)", region: "West Africa", lat: 6.5, lng: -1.5 },
  { id: "wolof", name: "Wolof", region: "West Africa", lat: 14.7, lng: -17.4 },
  { id: "hausa", name: "Hausa", region: "West Africa", lat: 12.0, lng: 8.5 },
  { id: "mandinka", name: "Mandinka", region: "West Africa", lat: 13.4, lng: -16.6 },
  { id: "fula", name: "Fula/Fulani", region: "West Africa", lat: 11.5, lng: -15.0 },

  // East & Southern Africa
  { id: "amharic", name: "Amharic (Ethiopian)", region: "East Africa", lat: 9.0, lng: 38.7 },
  { id: "swahili", name: "Swahili", region: "East Africa", lat: -6.0, lng: 35.7 },
  { id: "zulu", name: "Zulu", region: "Southern Africa", lat: -29.0, lng: 31.0 },
  { id: "shona", name: "Shona (Zimbabwean)", region: "Southern Africa", lat: -20.0, lng: 30.0 },
  { id: "luganda", name: "Baganda (Ugandan)", region: "East Africa", lat: 0.3, lng: 32.4 },
  { id: "somali", name: "Somali", region: "East Africa", lat: 2.0, lng: 45.3 },

  // North Africa
  { id: "egyptian-arabic", name: "Egyptian Arabic", region: "North Africa", lat: 27.0, lng: 30.0 },
  { id: "amazigh", name: "Amazigh/Berber", region: "North Africa", lat: 31.5, lng: -7.0 },

  // Middle East & Caucasus
  { id: "gulf-arabic", name: "Gulf Arabic", region: "Middle East", lat: 24.0, lng: 45.0 },
  { id: "persian", name: "Persian/Farsi", region: "Middle East", lat: 32.0, lng: 53.0 },
  { id: "hebrew", name: "Hebrew (Israeli)", region: "Middle East", lat: 31.5, lng: 35.0 },
  { id: "turkish", name: "Turkish", region: "Middle East", lat: 39.0, lng: 35.0 },
  { id: "kurdish", name: "Kurdish", region: "Middle East", lat: 37.0, lng: 43.0 },
  { id: "armenian", name: "Armenian", region: "Caucasus", lat: 40.0, lng: 44.9 },
  { id: "georgian", name: "Georgian", region: "Caucasus", lat: 42.0, lng: 43.5 },

  // South Asia
  { id: "hindi-sanskrit", name: "Hindi/Sanskrit", region: "South Asia", lat: 20.6, lng: 78.9 },
  { id: "bengali", name: "Bengali", region: "South Asia", lat: 23.7, lng: 90.3 },
  { id: "tamil", name: "Tamil", region: "South Asia", lat: 10.9, lng: 78.7 },
  { id: "punjabi", name: "Punjabi", region: "South Asia", lat: 31.0, lng: 74.0 },
  { id: "nepali", name: "Nepali", region: "South Asia", lat: 28.0, lng: 84.0 },
  { id: "sinhala", name: "Sinhala (Sri Lankan)", region: "South Asia", lat: 7.9, lng: 80.7 },
  { id: "urdu-pakistan", name: "Urdu (Pakistani)", region: "South Asia", lat: 30.0, lng: 69.3 },

  // Southeast Asia
  { id: "javanese", name: "Javanese (Indonesian)", region: "Southeast Asia", lat: -7.0, lng: 110.0 },
  { id: "malay", name: "Malay", region: "Southeast Asia", lat: 1.4, lng: 110.0 },
  { id: "filipino", name: "Filipino/Tagalog", region: "Southeast Asia", lat: 14.6, lng: 121.0 },
  { id: "thai", name: "Thai", region: "Southeast Asia", lat: 15.0, lng: 100.5 },
  { id: "vietnamese", name: "Vietnamese", region: "Southeast Asia", lat: 16.0, lng: 108.0 },
  { id: "khmer", name: "Khmer (Cambodian)", region: "Southeast Asia", lat: 12.6, lng: 104.9 },
  { id: "burmese", name: "Burmese", region: "Southeast Asia", lat: 19.0, lng: 96.5 },

  // East Asia
  { id: "chinese", name: "Chinese (Mandarin)", region: "East Asia", lat: 35.0, lng: 105.0 },
  { id: "japanese", name: "Japanese", region: "East Asia", lat: 36.0, lng: 138.0 },
  { id: "korean", name: "Korean", region: "East Asia", lat: 37.0, lng: 127.5 },
  { id: "mongolian", name: "Mongolian", region: "Central/East Asia", lat: 47.0, lng: 103.0 },

  // Central Asia
  { id: "kazakh", name: "Kazakh", region: "Central Asia", lat: 48.0, lng: 66.0 },
  { id: "uzbek", name: "Uzbek", region: "Central Asia", lat: 41.0, lng: 64.0 },

  // Pacific
  { id: "maori", name: "Māori", region: "Pacific", lat: -41.0, lng: 174.0 },
  { id: "hawaiian", name: "Hawaiian", region: "Pacific", lat: 20.5, lng: -157.5 },
  { id: "samoan", name: "Samoan", region: "Pacific", lat: -13.7, lng: -172.0 },

  // Indigenous Americas
  { id: "nahuatl", name: "Nahuatl (Mexican)", region: "Mesoamerica", lat: 19.0, lng: -99.0 },
  { id: "quechua", name: "Quechua (Andean)", region: "South America", lat: -12.0, lng: -76.0 },
  { id: "mapuche", name: "Mapuche", region: "South America", lat: -38.0, lng: -72.0 },
  { id: "guarani", name: "Guaraní", region: "South America", lat: -23.0, lng: -58.0 },

  // Europe
  { id: "germanic", name: "German/Germanic", region: "Western Europe", lat: 51.0, lng: 10.0 },
  { id: "scandinavian", name: "Scandinavian/Norse", region: "Northern Europe", lat: 60.0, lng: 15.0 },
  { id: "slavic-east", name: "East Slavic (Russian)", region: "Eastern Europe", lat: 55.0, lng: 37.0 },
  { id: "slavic-west", name: "West Slavic (Polish)", region: "Eastern Europe", lat: 52.0, lng: 19.0 },
  { id: "celtic", name: "Celtic (Irish/Scottish)", region: "British Isles", lat: 53.0, lng: -7.0 },
  { id: "italian", name: "Italian/Latin", region: "Southern Europe", lat: 42.0, lng: 13.0 },
  { id: "iberian", name: "Iberian (Spanish)", region: "Southern Europe", lat: 40.0, lng: -4.0 },
  { id: "greek", name: "Greek", region: "Southern Europe", lat: 38.0, lng: 23.7 },
  { id: "basque", name: "Basque", region: "Western Europe", lat: 43.0, lng: -2.5 },
  { id: "hungarian", name: "Hungarian/Magyar", region: "Central Europe", lat: 47.0, lng: 19.0 },
  { id: "baltic", name: "Baltic (Lithuanian)", region: "Northern Europe", lat: 56.0, lng: 24.0 },
  { id: "romanian", name: "Romanian", region: "Eastern Europe", lat: 45.5, lng: 25.0 },
];

export function getRandomCultures(n: number): Culture[] {
  const shuffled = [...CULTURES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
