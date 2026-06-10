#!/usr/bin/env node
/**
 * fix-meanings-pass2-direct.js
 * Applies 39 hardcoded fixes for remaining violations found by verification agents.
 * No API calls needed — fixes written directly.
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../src/lib/nameDatabase.json');
const LOG_PATH = path.join(__dirname, '../MEANING_FIXES_LOG_PASS2.md');

const FIXES = [
  // Agent A violations
  { culture: 'tamil',      name: 'Kokila',     fix: 'Evokes the liquid, melodious call of a small bird that heralds the arrival of spring.' },
  { culture: 'tamil',      name: 'Vignesh',    fix: 'Speaks of the one who governs every threshold, placing and lifting obstacles on the path of life.' },
  { culture: 'telugu',     name: 'Bhavani',    fix: 'Speaks of the goddess of all existence, the sacred feminine force from whom all being arises and to whom it returns.' },
  { culture: 'malayalam',  name: 'Ambika',     fix: 'Carries the tender warmth of the nurturing feminine, the intimate and approachable face of the divine.' },
  { culture: 'sotho',      name: 'Mapaseka',   fix: 'Evokes a child born in a season of sacred protection, sheltered by holy forces from the very first breath.' },
  // Agent B violations
  { culture: 'lao',         name: 'Phommasone',  fix: 'Speaks of the fullness of divine perfection, the complete and radiant presence of the highest celestial force.' },
  { culture: 'greek',       name: 'Dimitris',    fix: 'Evokes the enduring power of the earth\'s cycles, the sacred force that draws grain from the soil and returns the land to abundance.' },
  { culture: 'greek',       name: 'Alexandros',  fix: 'Evokes a defender of all people, uniting strength with protection in a single commanding and far-reaching purpose.' },
  { culture: 'greek',       name: 'Maria',       fix: 'Evokes the sea\'s timeless mystery, vast and bittersweet, holding all that is most beautiful and most sorrowful.' },
  { culture: 'greek',       name: 'Marios',      fix: 'Evokes the sea\'s timeless essence, that vast and ancient expanse whose depths are beyond all sounding.' },
  { culture: 'greek',       name: 'Rania',       fix: 'Evokes the gentle flow of water, a streaming current moving with quiet and irresistible purpose.' },
  { culture: 'catalan',     name: 'Jordi',       fix: 'Evokes the warrior spirit of the dragon-slayer, a beloved protector whose valor inspires devotion across generations.' },
  { culture: 'catalan',     name: 'Marc',        fix: 'Evokes the fierce warrior whose strength and martial valor make every battle decisive.' },
  { culture: 'catalan',     name: 'Adrià',       fix: 'Evokes the vast, eternal sea, that dark tidal expanse whose shores have shaped the lands and peoples along them.' },
  { culture: 'slavic-east', name: 'Roman',       fix: 'Evokes the grandeur of an empire whose legacy shaped the course of civilization across the world.' },
  { culture: 'slavic-east', name: 'Ludmila',     fix: 'Evokes the fierce power of the people, the glory that belongs to the whole community rather than any single champion.' },
  { culture: 'french',      name: 'Dorian',      fix: 'Evokes the sea-faring legacy of an ancient people who shaped civilization at the edge of the known world.' },
  { culture: 'french',      name: 'Apolline',    fix: 'Conjures the golden brilliance of a radiant deity pouring light over all it surveys, the embodiment of beauty and illumination.' },
  { culture: 'scandinavian',name: 'Frøydis',     fix: 'Radiates the divine spirit of one blessed by the deity of abundance and joy, a woman favored by the forces of plenty.' },
  { culture: 'albanian',    name: 'Skender',     fix: 'Evokes a figure of supreme authority and command, the leader whose military prowess made an entire era his own.' },
  { culture: 'filipino',    name: 'Marcelino',   fix: 'Evokes the steadfast warrior who fights with the burning determination of one fully devoted to battle.' },
  { culture: 'filipino',    name: 'Apolonio',    fix: 'Carries the golden radiance of a brilliant deity, the light-bringer whose beauty and precision are without equal.' },
  { culture: 'italian',     name: 'Lavinia',     fix: 'Evokes the ancient, legendary founding of a city that rose to rule the known world, its origins sacred and purposeful.' },
  { culture: 'italian',     name: 'Ercole',      fix: 'Resonates with the legendary strength of the greatest hero who ever walked the earth, whose trials forged an immortal legacy.' },
  { culture: 'slavic-south',name: 'Vladimir',    fix: 'Evokes the universal ruler, commanding respect through mastery of all that surrounds them.' },
  { culture: 'slavic-south',name: 'Marko',       fix: 'Evokes the fierce strength of the warrior, the ancient power of battle and the vigor that sustains it.' },
  { culture: 'slavic-west', name: 'Marek',       fix: 'Evokes the warrior\'s essence, the martial power and resolute strength that decides every contest.' },
  { culture: 'czech-slovak',name: 'Jiří',        fix: 'Evokes the farmer and the earth, the patient tiller whose devoted labor draws abundance from the soil.' },
  { culture: 'czech-slovak',name: 'Radek',       fix: 'Evokes the counsel and wisdom of one who advises well, the happy counselor whose guidance lights every path.' },
  { culture: 'czech-slovak',name: 'Rastislav',   fix: 'Evokes a ruler\'s glory, the spreading fame of one whose authority is recognized in every direction.' },
  { culture: 'czech-slovak',name: 'Roman',       fix: 'Evokes the grandeur of an ancient empire, the enduring strength whose legacy shaped the world.' },
  { culture: 'czech-slovak',name: 'Igor',        fix: 'Evokes a warrior blessed with vigor and strength, the guardian whose watchful power protects all in their care.' },
  { culture: 'hungarian',   name: 'Zoltán',      fix: 'Evokes the golden gleam of a sovereign\'s court, the regal power whose authority commands all within its reach.' },
  { culture: 'hungarian',   name: 'Edina',       fix: 'Evokes the sharp edge of a blade, keen and cutting with the precision of something perfectly and purposefully made.' },
  { culture: 'hungarian',   name: 'Roland',      fix: 'Evokes a warrior whose fame spreads far, the renowned one whose battle deeds are known across every land.' },
  { culture: 'hungarian',   name: 'Melinda',     fix: 'Evokes the gentle strength of honey and dark beauty intertwined, sweetness and depth in perfect balance.' },
  { culture: 'hungarian',   name: 'Zénó',        fix: 'Evokes the philosophical paradox of motion and stillness, the unsolvable puzzle that reveals how little we truly understand.' },
  { culture: 'romanian',    name: 'Diana',       fix: 'Evokes the wild huntress of the forest and moon, the sovereign of untamed places whose bow never misses.' },
  { culture: 'romanian',    name: 'Denisa',      fix: 'Evokes the intoxicating joy of celebration, the divine power of revelry that dissolves boundaries and awakens the senses.' },
];

function main() {
  console.log('Loading database...');
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

  const logLines = [
    '# Meaning Fixes — Pass 2 (Direct)',
    `**Date:** ${new Date().toISOString().split('T')[0]}`,
    `**Entries targeted:** ${FIXES.length}`,
    '',
    '| Culture | Name | Original | Fixed |',
    '|---|---|---|---|',
  ];

  let fixed = 0, errors = 0;

  for (const v of FIXES) {
    const entries = db[v.culture];
    if (!entries) { console.error(`Culture not found: ${v.culture}`); errors++; continue; }

    const idx = entries.findIndex(e => e.name === v.name);
    if (idx === -1) { console.error(`Name not found: ${v.culture}/${v.name}`); errors++; continue; }

    const original = entries[idx].meaning;
    db[v.culture][idx].meaning = v.fix;
    fixed++;

    logLines.push(`| ${v.culture} | ${v.name} | ${original.replace(/\|/g,'\\|')} | ${v.fix.replace(/\|/g,'\\|')} |`);
    console.log(`✓ ${v.culture}/${v.name}`);
    console.log(`  WAS: ${original}`);
    console.log(`  NOW: ${v.fix}`);
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  logLines.push('', `**Fixed:** ${fixed} | **Errors:** ${errors}`);
  fs.writeFileSync(LOG_PATH, logLines.join('\n'));

  console.log(`\n✓ Done. Fixed: ${fixed}, Errors: ${errors}`);
}

main();
