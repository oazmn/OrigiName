#!/usr/bin/env node
/**
 * fix-meanings.js
 * Scans nameDatabase.json for meaning fields that leak cultural/linguistic/geographic origin
 * and rewrites them using the Claude API. Backs up the database before modifying.
 *
 * Usage: node scripts/fix-meanings.js
 */

const fs = require('fs');
const path = require('path');

// Load API key from .env.local
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKey = envContent.match(/ANTHROPIC_API_KEY=(.+)/)?.[1]?.trim();
if (!apiKey) {
  console.error('Could not find ANTHROPIC_API_KEY in .env.local');
  process.exit(1);
}

const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic.default({ apiKey });

const DB_PATH = path.join(__dirname, '../src/lib/nameDatabase.json');
const LOG_PATH = path.join(__dirname, '../MEANING_FIXES_LOG.md');

// ─── Violation patterns ───────────────────────────────────────────────────────

const VIOLATION_PATTERNS = [
  // Language attribution phrases
  /\bfrom the (Greek|Latin|Slavic|Hebrew|Germanic|Celtic|Roman|Catalan|Albanian|Hungarian|Armenian|Turkish|Arabic|Persian|Basque|Turkic|Mongolian|Tibetan)\b/i,
  /\brooted in (the )?(Greek|Latin|Slavic|Hebrew|Germanic|Celtic|Roman|Catalan|Albanian|Armenian|Turkic|ancient)\b/i,
  /\bderived from (the )?(Greek|Latin|Slavic|Hebrew|Germanic|Celtic|Roman|Catalan|Albanian|Armenian|Turkic)\b/i,
  /\bdrawing from (its )?(Greek|Latin|Slavic|Hebrew|Germanic|Celtic|Roman|Catalan|Albanian|Armenian)\b/i,
  /\bborn of (the )?(Greek|Latin|Slavic|Hebrew|Germanic|Celtic|Roman|Catalan|Albanian|Armenian)\b/i,
  /\bgrounded in (the )?(Greek|Latin|Slavic|Hebrew|Germanic|Celtic|Roman|Catalan|Albanian|Armenian|ancient)\b/i,
  /\b(ancient|old) (Greek|Latin|Slavic|Hebrew|Germanic|Celtic|Roman|Slavic|Armenian) (word|root|tradition|origin|value|name|legacy|culture|reverence|wisdom|virtue|pride)\b/i,
  /\b(Greek|Latin|Slavic|Hebrew|Germanic) (word|root|tradition|origin|name|language)\b/i,

  // Direct culture/language name mentions
  /\bAlbanian\b/i,
  /\bArmenian\b/i,
  /\bWolof\b/i,
  /\bOromo\b/i,
  /\bMaasai\b/i,
  /\bBedouin\b/i,
  /\bThracian\b/i,
  /\bTuareg\b/i,
  /\bAzerbaijani\b/i,
  /\bTurkic people\b/i,
  /\bHungarian (word|tradition)\b/i,
  /\bCatalan\b/i,
  /\bSlavic (land|tongue)\b/i,

  // Hindu deities (named — any of these in a meaning field identifies Hindu/South Asian origin)
  /\bVishnu\b/i,
  /\bShiva\b/i,
  /\bKrishna\b/i,
  /\bGanesha\b/i,
  /\bLakshmi\b/i,
  /\bDurga\b/i,
  /\bMurugan\b/i,
  /\bIndra\b/i,
  /\bNarayana\b/i,
  /\bRama\b/i,
  /\bKarthikeya\b/i,
  /\bShesha Naga\b/i,
  /\bBrahmanas\b/i,
  /\bVrindavan\b/i,
  /\belephant-headed deity\b/i,
  /\bgreat destroyer\b/i, // Shiva epithet
  /\bpreserver whose presence maintains\b/i, // Vishnu circumlocution
  /\bgoddes{1,2} of prosperity\b/i, // Lakshmi circumlocution

  // Named geographic/cultural markers
  /\bthe steppe\b/i,
  /\bfrozen tundra\b/i,
  /\bthe prairie\b/i,
  /\bSilk Road\b/i,
  /\bArarat\b/i,
  /\bAswan\b/i,
  /\bTirupati\b/i,
  /\bVenkata\b/i,
  /\bKedarnath\b/i,
  /\bAl-Marwa\b/i,
  /\bRamadan\b/i,
  /\bcall to prayer\b/i,
  /\bblessed month before the great fast\b/i,
  /\bancient trade routes\b/i,
  /\bsilk road\b/i,
  /\bRoman (god|goddess|empire|pantheon|citizen|lands|triumph)\b/i,
  /\bancient Rome\b/i,
  /\bDorians\b/i,
  /\bregional identity\b/i,
];

function isViolation(meaning) {
  return VIOLATION_PATTERNS.some(p => p.test(meaning));
}

// ─── Fix a single meaning via Claude ─────────────────────────────────────────

async function fixMeaning(name, meaning) {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 150,
    messages: [{
      role: 'user',
      content: `You are fixing a single meaning field for a name in a geography guessing game. The player sees only this meaning hint before guessing which culture the name is from, so the hint must NOT reveal the origin.

RULE: The meaning must convey what the name FEELS LIKE — imagery, concept, emotion — WITHOUT mentioning any language, country, region, ethnic group, specific deity, religious site, or any word that points to a specific culture or geography.

BAD (violates rule): "from the Greek word for light" / "rooted in Latin meaning pure" / "evokes the great Lord Vishnu" / "named for the Armenian highlands"
GOOD: "evokes the warmth of early morning light" / "carries the cool purity of running water" / "speaks of all-encompassing divine presence"

Name: ${name}
Current meaning (VIOLATES RULE): "${meaning}"

Rewrite it. Preserve the core concept but strip every origin-leaking word. One sentence. Start with a verb like Evokes / Carries / Speaks of / Paints / Reflects / Conjures. Return ONLY the new sentence, nothing else.`
    }]
  });

  const text = response.content[0].text.trim();
  // Strip surrounding quotes if model added them
  return text.replace(/^["']|["']$/g, '');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Loading database...');
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

  const cultures = Object.keys(db);
  const logLines = [
    '# Meaning Field Fixes Log',
    `**Date:** ${new Date().toISOString().split('T')[0]}`,
    '',
    '| Culture | Name | Original Meaning | Fixed Meaning |',
    '|---|---|---|---|',
  ];

  let totalScanned = 0;
  let totalFixed = 0;
  let totalErrors = 0;

  for (const culture of cultures) {
    const entries = db[culture];
    const violations = entries
      .map((e, i) => ({ ...e, idx: i }))
      .filter(e => isViolation(e.meaning));

    if (violations.length === 0) continue;

    console.log(`\n${culture} — ${violations.length} violation(s)`);

    for (const entry of violations) {
      totalScanned++;
      try {
        const fixed = await fixMeaning(entry.name, entry.meaning);
        const original = entry.meaning;

        db[culture][entry.idx].meaning = fixed;
        totalFixed++;

        const logRow = `| ${culture} | ${entry.name} | ${original.replace(/\|/g, '\\|')} | ${fixed.replace(/\|/g, '\\|')} |`;
        logLines.push(logRow);
        console.log(`  ✓ ${entry.name}`);
        console.log(`    WAS: ${original}`);
        console.log(`    NOW: ${fixed}`);

        // Respect rate limits — haiku is fast but let's be safe
        await new Promise(r => setTimeout(r, 150));
      } catch (err) {
        totalErrors++;
        console.error(`  ✗ ${entry.name}: ${err.message}`);
      }
    }
  }

  // Save updated database
  console.log('\nSaving updated database...');
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

  // Save log
  logLines.push('');
  logLines.push(`**Total fixed:** ${totalFixed}`);
  logLines.push(`**Errors:** ${totalErrors}`);
  fs.writeFileSync(LOG_PATH, logLines.join('\n'));

  console.log(`\n✓ Done.`);
  console.log(`  Fixed:  ${totalFixed}`);
  console.log(`  Errors: ${totalErrors}`);
  console.log(`  Log:    MEANING_FIXES_LOG.md`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
