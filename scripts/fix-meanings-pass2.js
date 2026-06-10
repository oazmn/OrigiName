#!/usr/bin/env node
/**
 * fix-meanings-pass2.js
 * Targeted fix for the 39 remaining violations found by verification agents.
 */

const fs = require('fs');
const path = require('path');

const envContent = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
const apiKey = envContent.match(/ANTHROPIC_API_KEY=(.+)/)?.[1]?.trim();
const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic.default({ apiKey });

const DB_PATH = path.join(__dirname, '../src/lib/nameDatabase.json');
const LOG_PATH = path.join(__dirname, '../MEANING_FIXES_LOG_PASS2.md');

// Exact violations from verification agents
const VIOLATIONS = [
  // Agent A findings
  { culture: 'tamil',    name: 'Kokila',    issue: '"Indian" names the country' },
  { culture: 'tamil',    name: 'Vignesh',   issue: '"lord of obstacles" is a Ganesha circumlocution' },
  { culture: 'telugu',   name: 'Bhavani',   issue: '"divine mother" is a Durga/Parvati circumlocution' },
  { culture: 'malayalam',name: 'Ambika',    issue: '"divine mother" circumlocution' },
  { culture: 'sotho',    name: 'Mapaseka',  issue: '"Passover" is a named Jewish religious holiday' },
  // Agent B findings
  { culture: 'lao',          name: 'Phommasone', issue: '"Brahma" is a named Hindu deity' },
  { culture: 'greek',        name: 'Dimitris',   issue: '"Demeter" is a named Greek deity' },
  { culture: 'greek',        name: 'Alexandros', issue: '"ancient Greek valor" names the culture' },
  { culture: 'greek',        name: 'Maria',      issue: '"goddess of the ocean and love" is a deity circumlocution' },
  { culture: 'greek',        name: 'Marios',     issue: '"the god of the ocean himself" circumlocution for Poseidon' },
  { culture: 'greek',        name: 'Rania',      issue: '"ancient Greek roots" names the language/culture' },
  { culture: 'catalan',      name: 'Jordi',      issue: '"Catalonia" is a region name' },
  { culture: 'catalan',      name: 'Marc',       issue: '"Mars" is a named Roman deity' },
  { culture: 'catalan',      name: 'Adrià',      issue: '"ancient Roman roots" names the civilization' },
  { culture: 'slavic-east',  name: 'Roman',      issue: '"Rome" and "eternal empire" are Roman civilization references' },
  { culture: 'slavic-east',  name: 'Ludmila',    issue: '"old Slavic words" names the language group' },
  { culture: 'french',       name: 'Dorian',     issue: 'alludes to the Dorians, a named Greek ethnic group' },
  { culture: 'french',       name: 'Apolline',   issue: '"solar deity" is a circumlocution for Apollo' },
  { culture: 'scandinavian', name: 'Frøydis',    issue: '"Freyr" is a named Norse deity' },
  { culture: 'albanian',     name: 'Skender',    issue: '"Turkish title" names an ethnic/language group' },
  { culture: 'filipino',     name: 'Marcelino',  issue: '"Mars" is a named Roman deity' },
  { culture: 'filipino',     name: 'Apolonio',   issue: '"divine archer" is a circumlocution for Apollo' },
  { culture: 'italian',      name: 'Lavinia',    issue: '"city that would grow to rule the world" alludes to Rome' },
  { culture: 'italian',      name: 'Ercole',     issue: '"twelve-labor" identifies Heracles/Hercules by name' },
  { culture: 'slavic-south', name: 'Vladimir',   issue: '"ancient Slavic lineage" names the cultural group' },
  { culture: 'slavic-south', name: 'Marko',      issue: '"Mars" is a named Roman deity' },
  { culture: 'slavic-west',  name: 'Marek',      issue: '"Mars" is a named Roman deity' },
  { culture: 'czech-slovak', name: 'Jiří',       issue: '"Slavic lands" names the cultural group' },
  { culture: 'czech-slovak', name: 'Radek',      issue: '"old Slavic nobility" names the cultural group' },
  { culture: 'czech-slovak', name: 'Rastislav',  issue: '"old Slavic roots" names the language group' },
  { culture: 'czech-slovak', name: 'Roman',      issue: '"ancient empire" alludes to Rome' },
  { culture: 'czech-slovak', name: 'Igor',       issue: '"ancient Slavic roots" names the language group' },
  { culture: 'hungarian',    name: 'Zoltán',     issue: '"sultan\'s court" and "sultanate" are Ottoman/Turkic markers' },
  { culture: 'hungarian',    name: 'Edina',      issue: '"Germanic precision" names the language group' },
  { culture: 'hungarian',    name: 'Roland',     issue: '"old Germanic roots" names the language group' },
  { culture: 'hungarian',    name: 'Melinda',    issue: '"ancient Germanic roots" names the language group' },
  { culture: 'hungarian',    name: 'Zénó',       issue: 'alludes to Zeno\'s paradox, identifying a named Greek philosopher' },
  { culture: 'romanian',     name: 'Diana',      issue: '"divine huntress of the moon" circumlocution for Diana/Artemis' },
  { culture: 'romanian',     name: 'Denisa',     issue: '"Dionysus" is a named Greek deity' },
];

async function fixMeaning(name, meaning, issue) {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 150,
    messages: [{
      role: 'user',
      content: `You are fixing a meaning field for a geography guessing game. The player guesses the cultural origin of a name from the meaning hint alone — so the hint must NOT reveal the origin.

RULE: Convey what the name FEELS like (imagery, concept, emotion) with NO language names, country names, region names, deity names, cultural group names, or named religious sites/figures.

Name: ${name}
Current meaning (VIOLATES RULE): "${meaning}"
Specific violation: ${issue}

Rewrite it. Preserve the core concept but remove every origin-leaking word. One sentence. Start with a verb like Evokes / Carries / Speaks of / Paints / Reflects / Conjures. Return ONLY the new sentence.`
    }]
  });
  return response.content[0].text.trim().replace(/^["']|["']$/g, '');
}

async function main() {
  console.log('Loading database...');
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

  const logLines = [
    '# Meaning Fixes — Pass 2',
    `**Date:** ${new Date().toISOString().split('T')[0]}`,
    `**Entries targeted:** ${VIOLATIONS.length}`,
    '',
    '| Culture | Name | Original | Fixed |',
    '|---|---|---|---|',
  ];

  let fixed = 0, errors = 0;

  for (const v of VIOLATIONS) {
    const entries = db[v.culture];
    if (!entries) { console.error(`Culture not found: ${v.culture}`); errors++; continue; }

    const idx = entries.findIndex(e => e.name === v.name);
    if (idx === -1) { console.error(`Name not found: ${v.culture}/${v.name}`); errors++; continue; }

    const original = entries[idx].meaning;
    try {
      const fixed_meaning = await fixMeaning(v.name, original, v.issue);
      db[v.culture][idx].meaning = fixed_meaning;
      fixed++;
      logLines.push(`| ${v.culture} | ${v.name} | ${original.replace(/\|/g,'\\|')} | ${fixed_meaning.replace(/\|/g,'\\|')} |`);
      console.log(`✓ ${v.culture}/${v.name}`);
      console.log(`  WAS: ${original}`);
      console.log(`  NOW: ${fixed_meaning}`);
      await new Promise(r => setTimeout(r, 150));
    } catch (err) {
      errors++;
      console.error(`✗ ${v.culture}/${v.name}: ${err.message}`);
    }
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  logLines.push('', `**Fixed:** ${fixed} | **Errors:** ${errors}`);
  fs.writeFileSync(LOG_PATH, logLines.join('\n'));

  console.log(`\n✓ Done. Fixed: ${fixed}, Errors: ${errors}`);
}

main().catch(err => { console.error(err); process.exit(1); });
