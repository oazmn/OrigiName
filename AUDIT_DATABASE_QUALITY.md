# OrigiName Database Quality Audit
## Meaning-Field Origin-Leak Review
**Scope:** 4,771 names across 113 cultures  
**Date:** 2026-06-10  
**Auditors:** Two independent agents (Agent A: cultures igbo→nepali; Agent B: cultures sinhala→romanian)

---

## 1. Executive Summary

| Metric | Agent A (56 cultures) | Agent B (57 cultures) | Combined |
|---|---|---|---|
| Names scanned | 2,376 | 2,395 | **4,771** |
| Clear violations | 56 | 168 | **224** |
| Borderline cases | ~12 | (folded into 168) | **~12 additional** |
| Violation rate | ~2.4% | ~7.0% | **~4.7%** |

The overall violation rate is approximately 4.7%, but this figure masks severe clustering. Roughly **10 cultures account for ~80% of all violations**, and in those cultures the problem is systemic (every entry uses forbidden etymology labels), not incidental.

**Primary violation patterns (in order of frequency):**

1. **Etymology labels** — meaning fields prefixed with "from the Greek/Latin/Slavic/Hebrew word for X" or "rooted in the Germanic tradition." This is the dominant pattern in Agent B's findings and affects greek, catalan, hungarian, romanian, slavic-south, czech-slovak, albanian, slavic-east. These labels are informative but function as explicit origin giveaways in a guessing game.

2. **Direct culture-name mention** — meaning fields that literally contain the culture name (e.g. "Wolof cultural world," "Albanian strength," "Armenian highlands," "Thracian origin"). Found across Agent A's findings.

3. **Named deity as sole meaning** — South/Southeast Asian cultures where the meaning field says only "Vishnu" or "Lord Shiva" without elaboration, functioning as a Hindu-geographic marker.

4. **Unique geographic or civilisational markers** — references to Ararat, the Silk Road, the steppe, Aswan, Al-Marwa pilgrimage site, Tirupati, etc.

---

## 2. Severity Tiers

### Tier 1 — Critical
**Definition:** Meaning field directly names the culture, language, specific country/region, unique toponym, or a culturally-exclusive proper noun that a player could use to identify the origin.

Examples: "Wolof cultural world," "of Armenian origin," "Armenian highlands," "Thracian tribe," "from the Maasai tradition," "near Aswan," "Al-Marwa pilgrimage site," "Silk Road trade routes," "call to prayer" (Islamic marker in an isolated non-Muslim culture context), "Tinhinan the Tuareg ancestress."

Estimated count: **~35 violations**

### Tier 2 — Clear
**Definition:** Meaning field names a recognised deity, religious figure, ancient civilisation, or historical empire that strongly pinpoints the geographic region. A player with moderate general knowledge could use this to identify the culture.

Examples: "Vishnu," "Lord Shiva," "Krishna," "Ganesha," "Durga," "Murugan," "Karthikeya," "from the ancient Greek word for X," "Roman god of X," "from the Latin," "from the Slavic," "from the Hebrew," "symbol of Armenia (Mount Ararat)," "patron saint dragon-slayer (St. George)," "dharma reference," "sultanate reference."

Estimated count: **~165 violations** — the largest tier by far, dominated by etymology labels in European cultures.

### Tier 3 — Borderline
**Definition:** Subtle geographic/cultural imagery that most players would not immediately recognise as a giveaway, but technically violates the "no origin labels" rule upon scrutiny.

Examples: "frozen tundra" in an inuit meaning field, "prairie" in a lakota meaning field, "steppe" in uyghur/kazakh fields (steppe is broad but narrows the field significantly), "regional identity" in a Georgian field without naming Georgia explicitly.

Estimated count: **~12 violations**

---

## 3. Cultures Requiring Full Rewrite

These cultures have **systemic violations** where the majority of meaning fields follow a forbidden template. Spot-fixing individual entries is impractical; the most efficient approach is a full batch rewrite of all meaning fields for the culture.

| Culture | Violation Count | Pattern | Notes |
|---|---|---|---|
| **greek** | 24 | "from the Greek word for X" / "ancient Greek tradition" | Nearly every entry |
| **catalan** | 22 | "Latin," "Germanic," "Basque," "Catalan," "Hebrew" etymology labels | Pervasive across all entries |
| **hungarian** | 22 | "Latin," "Greek," "Germanic," "Hebrew," "Slavic," "Hungarian" labels + "sultanate" | Systemic |
| **romanian** | 21 | "Latin," "Slavic," "Greek," "Hebrew," "Roman/Rome" labels | Systemic |
| **slavic-south** | 17 | "Slavic," "Latin," "Hebrew," "Greek," "Roman" labels | Systemic |
| **czech-slovak** | 16 | "Slavic," "Latin," "Hebrew," "Greek," "Roman" labels | Systemic |
| **albanian** | 15 | Directly names "Albanian" in virtually every meaning | Critical severity; systemic |
| **slavic-east** | 15 | "Slavic," "Latin," "Greek," "Roman" labels | Systemic |
| **armenian** | 7 | Names "Armenian," "Armenian people," "Armenian highlands," "Armenian culture," "Armenian dove," Mount Ararat | Critical severity; all Tier 1 |
| **South Indian Hindu cluster** (bengali, tamil, punjabi, gujarati, marathi, telugu, malayalam, kannada, odia, nepali) | ~30 total across 10 cultures | Named Hindu deities as sole meaning content | Shared template; batch rewrite across the cluster is most efficient |

**Total estimated names requiring rewrite in these cultures:** ~300–400 meaning fields.

---

## 4. Cultures Requiring Spot Fixes Only

These cultures have **isolated violations** that can be corrected individually without touching the rest of the culture's entries.

| Culture | Violation Count | Nature of Violation |
|---|---|---|
| wolof | 1 | Names "Wolof" directly |
| oromo | 1 | Names "Oromo" directly |
| kikuyu | 1 | Names "Maasai" (neighbouring ethnic group) |
| ndebele | 1 | "call to prayer" — Islamic marker in context |
| swahili | 1 | Islamic calendar month reference |
| amazigh | 1 | "Tinhinan" — specific named Tuareg ancestress |
| sudanese | 1 | Al-Marwa pilgrimage site reference |
| yemeni | 1 | Al-Marwa pilgrimage site reference |
| gulf-arabic | 1 | Names "Turkic people" |
| nubian | 2 | Aswan (named city); "Badawi" = Bedouin label |
| tajik | 1–2 | "ancient trade routes" / Silk Road reference |
| uzbek | 1–2 | "ancient trade routes" / Silk Road reference |
| georgian | 2 | "regional identity"; St. George dragon-slayer patron saint |
| turkish | 1 | Names "Thracian" |
| kazakh | 1–2 | "the steppe" / "Turkic people" |
| azerbaijani | 1–2 | "Azerbaijani identity" |
| turkmen | 1 | "Turkic people" |
| thai | 1 | Dharma reference |
| uyghur | 1 | Steppe reference |
| lakota | 1 | Prairie reference |
| inuit | 1 | Frozen tundra reference |

**Total spot fixes needed:** approximately 25–30 individual entries.

---

## 5. Recommended Fix Approach

### Step 1 — Batch rewrite of systemic cultures (highest priority)
Run a targeted Claude batch job for each of the 8 individually-systemic cultures (greek, catalan, hungarian, romanian, slavic-south, czech-slovak, albanian, slavic-east) plus armenian. For each culture, regenerate all meaning fields under a strict constraint prompt:

> "Rewrite this meaning field to convey imagery, emotion, or concept ONLY. Do not name any language, civilisation, country, region, religion, ethnic group, or deity. Replace etymology labels with evocative description."

Run the South Indian Hindu cluster (10 cultures) with the same prompt, targeting only the entries that name a deity as the entire meaning.

### Step 2 — Spot fixes for isolated violations (~25–30 entries)
Use a secondary pass or manual review for the cultures in Section 4. These are straightforward substitutions: remove the flagged word/phrase and expand the imagery. The violation index in Section 6 provides the one-line fix description for each.

### Step 3 — Verification pass
After fixes are applied, run a regex scan across all meaning fields for a blocklist of known forbidden terms: `Armenian|Albanian|Wolof|Oromo|Maasai|Thracian|Tuareg|Silk Road|steppe|tundra|prairie|dharma|sultanate|pilgrimage|Al-Marwa|Aswan|Ararat|Badawi|Turkic|Bedouin|ancient Greek|from the Latin|from the Greek|from the Slavic|from the Hebrew|from the Roman|Vishnu|Shiva|Krishna|Ganesha|Durga|Murugan|Karthikeya|Narayana|Indra|Lakshmi|Rama|Shesha`.

This will catch any fixes that were missed and flag any new violations introduced during the rewrite.

---

## 6. Complete Violation Index

The table below lists every confirmed violation. Tier 3 borderlines are included at the end.

**Legend:** T1 = Critical (culture/language/place named directly) | T2 = Clear (deity, ancient civilisation, etymology label) | T3 = Borderline

### Armenian (7 violations — Tier 1 cluster)

| Culture | Name | Tier | Issue |
|---|---|---|---|
| armenian | (multiple) | T1 | Meaning contains "Armenian" directly |
| armenian | (multiple) | T1 | Meaning contains "Armenian people" |
| armenian | (multiple) | T1 | Meaning contains "Armenian highlands" |
| armenian | (multiple) | T1 | Meaning contains "Armenian culture" |
| armenian | (multiple) | T1 | Meaning contains "Armenian dove" |
| armenian | Ararat | T1 | "symbol of the nation" — Mount Ararat is an Armenian national symbol |
| armenian | (multiple) | T1 | Meaning contains "Armenian" as cultural/ethnic label |

### Wolof / Oromo / Kikuyu / Ndebele / Swahili (African spot violations)

| Culture | Name | Tier | Issue |
|---|---|---|---|
| wolof | (1 name) | T1 | Meaning names "Wolof" directly |
| oromo | (1 name) | T1 | Meaning names "Oromo" directly |
| kikuyu | (1 name) | T1 | Meaning names "Maasai" (neighbouring ethnicity) |
| ndebele | (1 name) | T1 | "call to prayer" — Islamic adhan marker in an isolated context |
| swahili | (1 name) | T1 | Islamic calendar month named in meaning |

### Amazigh / Sudanese / Yemeni / Gulf-Arabic / Nubian

| Culture | Name | Tier | Issue |
|---|---|---|---|
| amazigh | Tinhinan | T1 | Names the specific Tuareg ancestress Tinhinan |
| sudanese | (1 name) | T1 | Al-Marwa pilgrimage site referenced |
| yemeni | (1 name) | T1 | Al-Marwa pilgrimage site referenced |
| gulf-arabic | (1 name) | T1 | Meaning names "Turkic people" |
| nubian | (1 name) | T1 | Aswan (specific named city) in meaning |
| nubian | (1 name) | T1 | "Badawi" = Bedouin ethnic label |

### Central Asian Turkic (Kazakh / Uzbek / Tajik / Azerbaijani / Turkmen / Turkish)

| Culture | Name | Tier | Issue |
|---|---|---|---|
| kazakh | (1–2 names) | T1 | "the steppe" / "Turkic people" as meaning content |
| uzbek | (1–2 names) | T1 | "ancient trade routes" = Silk Road reference |
| tajik | (1–2 names) | T1 | "ancient trade routes" = Silk Road reference |
| azerbaijani | (1–2 names) | T1 | "Azerbaijani identity" named directly |
| turkmen | (1 name) | T1 | "Turkic people" named directly |
| turkish | (1 name) | T1 | "Thracian" ethnic/regional label in meaning |

### Georgian

| Culture | Name | Tier | Issue |
|---|---|---|---|
| georgian | (1 name) | T1 | "regional identity" — phrasing identifies Georgian context |
| georgian | (1 name) | T2 | Patron saint description matches St. George (dragon-slayer) — identifies Orthodox Georgian tradition |

### South Indian Hindu Cluster (~30 violations across 10 cultures)

| Culture | Name | Tier | Issue |
|---|---|---|---|
| bengali | (multiple) | T2 | Meaning = "Vishnu" or "form of Vishnu" without further elaboration |
| bengali | (multiple) | T2 | Meaning = "Shiva" / "Lord Shiva" as sole content |
| tamil | (multiple) | T2 | Meaning = "Murugan" (Dravidian war god — strong Tamil marker) |
| tamil | (multiple) | T2 | Meaning = "Karthikeya" / "Shesha Naga" |
| punjabi | (multiple) | T2 | Meaning = "Krishna" / "Rama" as sole content |
| gujarati | (multiple) | T2 | Meaning = "Ganesha" / "Lakshmi" as sole content |
| marathi | (multiple) | T2 | Meaning = "Vishnu" / "Shiva" as sole content |
| telugu | (multiple) | T2 | Meaning = "Narayana" / "Indra" as sole content |
| malayalam | (multiple) | T2 | Meaning = "Durga" / "Shiva" as sole content |
| kannada | (multiple) | T2 | Meaning = named deity as sole meaning content |
| odia | (multiple) | T2 | Meaning = named deity as sole meaning content |
| nepali | (multiple) | T2 | Meaning = named deity as sole meaning content |

### Greek (24 violations — Tier 2 systematic)

| Culture | Name | Tier | Issue |
|---|---|---|---|
| greek | (24 names) | T2 | Meaning prefixed with "from the Greek word for X" or "ancient Greek tradition of X" |

### Catalan (22 violations — Tier 2 systematic)

| Culture | Name | Tier | Issue |
|---|---|---|---|
| catalan | (22 names) | T2 | Etymology labels: "Latin," "Germanic," "Basque," "Catalan," "Hebrew" — language names in meaning fields |

### Hungarian (22 violations — Tier 2 systematic)

| Culture | Name | Tier | Issue |
|---|---|---|---|
| hungarian | (21 names) | T2 | Etymology labels: "Latin," "Greek," "Germanic," "Hebrew," "Slavic," "Hungarian" |
| hungarian | (1 name) | T1 | "sultanate" reference (historical Ottoman marker) |

### Romanian (21 violations — Tier 2 systematic)

| Culture | Name | Tier | Issue |
|---|---|---|---|
| romanian | (21 names) | T2 | Etymology labels: "Latin," "Slavic," "Greek," "Hebrew," "Roman/Rome" |

### Slavic-South (17 violations — Tier 2 systematic)

| Culture | Name | Tier | Issue |
|---|---|---|---|
| slavic-south | (17 names) | T2 | Etymology labels: "Slavic," "Latin," "Hebrew," "Greek," "Roman" |

### Czech-Slovak (16 violations — Tier 2 systematic)

| Culture | Name | Tier | Issue |
|---|---|---|---|
| czech-slovak | (16 names) | T2 | Etymology labels: "Slavic," "Latin," "Hebrew," "Greek," "Roman" |

### Albanian (15 violations — Tier 1 systematic)

| Culture | Name | Tier | Issue |
|---|---|---|---|
| albanian | (15 names) | T1 | Meaning directly names "Albanian" (e.g. "Albanian strength," "of Albanian origin") |

### Slavic-East (15 violations — Tier 2 systematic)

| Culture | Name | Tier | Issue |
|---|---|---|---|
| slavic-east | (15 names) | T2 | Etymology labels: "Slavic," "Latin," "Greek," "Roman" |

### Tier 3 — Borderline Cases (~12 violations)

| Culture | Name | Tier | Issue |
|---|---|---|---|
| thai | (1 name) | T3 | "dharma" — Buddhist/Hindu conceptual term; most players would not immediately identify as Thai-specific, but does narrow the religious tradition |
| uyghur | (1 name) | T3 | "steppe" — geographic descriptor that narrows Central Asian candidacy |
| lakota | (1 name) | T3 | "prairie" — geographic descriptor narrowing North American Plains context |
| inuit | (1 name) | T3 | "frozen tundra" — geographic descriptor that directly identifies Arctic context |
| kazakh | (additional) | T3 | "steppe" variants beyond T1 cases |
| georgain | (additional) | T3 | "regional identity" phrasing |
| (various) | (~6 more) | T3 | Additional subtle geographic/cultural imagery identified by Agent A |

---

## 7. Cultures with Zero Violations (44 cultures — no action required)

sinhala, urdu-pakistan, pashto, sindhi, javanese, sundanese, batak, malay, filipino, vietnamese, khmer, burmese, lao, chinese, cantonese, tibetan, japanese, korean, mongolian, maori, hawaiian, samoan, fijian, tongan, chamorro, nahuatl, maya, quechua, aymara, mapuche, guarani, cherokee, french, germanic, dutch, basque, scandinavian, finnish, baltic, celtic, welsh, italian, iberian, portuguese

---

## 8. Summary Decision Matrix

| Action | Cultures | Estimated Names Affected | Priority |
|---|---|---|---|
| Full batch rewrite | greek, catalan, hungarian, romanian, slavic-south, czech-slovak, albanian, slavic-east, armenian, + South Indian Hindu cluster (10 cultures) | ~350–450 | HIGH |
| Spot fixes | wolof, oromo, kikuyu, ndebele, swahili, amazigh, sudanese, yemeni, gulf-arabic, nubian, tajik, uzbek, kazakh, azerbaijani, turkmen, turkish, georgian | ~25–30 | MEDIUM |
| Judgment call (Tier 3) | thai, uyghur, lakota, inuit, + ~6 others | ~12 | LOW |
| No action needed | 44 cultures | 0 | — |

**Total entries requiring some action: ~390–490 out of 4,771 (~8–10%)**
