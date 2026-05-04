import type { HeritageAnalysis } from "@/types";

export const MOCK_QUESTIONS = [
  "Where were your grandparents born, if you know?",
  "What language was spoken at home in your family growing up?",
  "Do you have any family stories about where your ancestors originally came from?",
];

export const MOCK_ANALYSIS: HeritageAnalysis = {
  summary:
    "Your name suggests a fascinating mix of West African and Central European heritage. 'Olisa' is an Igbo name from southeastern Nigeria, while 'Zimmermann' is a classic German occupational surname meaning 'carpenter'.",
  components: [
    {
      component: "first",
      value: "Olisa",
      linguisticRoot: "Igbo",
      culturalOrigin: "Igbo people, southeastern Nigeria",
      likelyRegion: "West Africa",
      confidence: "high",
      notes:
        "Olisa is a traditional Igbo name meaning 'God' or 'the Great One', widely used in Anambra and Enugu states.",
    },
    {
      component: "last",
      value: "Zimmermann",
      linguisticRoot: "Middle High German",
      culturalOrigin: "German-speaking Central Europe",
      likelyRegion: "Central Europe (Germany, Austria, Switzerland)",
      confidence: "high",
      notes:
        "Zimmermann derives from 'Zimmer' (room/timber) + 'Mann' (man), an occupational surname for carpenters, attested since the 13th century.",
    },
  ],
  pins: [
    {
      label: "Igboland, Nigeria",
      lat: 6.2,
      lng: 7.0,
      associatedComponents: ["first"],
    },
    {
      label: "Germany",
      lat: 51.1657,
      lng: 10.4515,
      associatedComponents: ["last"],
    },
  ],
  caveats:
    "Name analysis indicates likely cultural origins but cannot determine individual ancestry with certainty. Names travel across cultures and borders — this is a linguistic and historical assessment, not a genealogical record.",
};
