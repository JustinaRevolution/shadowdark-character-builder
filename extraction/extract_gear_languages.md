# Gear and Language Extraction Agent

Read every PDF in `/home/justina/Desktop/TTRPG Workshop/Shadowdark/` using the Read tool.
Extract all gear/equipment and all languages. Write two files.

## Gear output schema

Write to `data/gear.json`:

{
  "weapons": [
    { "name": "Dagger", "damage": "d4", "cost_gp": 1, "properties": ["finesse", "thrown"], "source": "Shadowdark RPG V1" }
  ],
  "armor": [
    { "name": "Leather", "ac": 11, "cost_gp": 10, "properties": [], "source": "Shadowdark RPG V1" }
  ],
  "adventuring_gear": [
    { "name": "Rope (50 ft)", "cost_gp": 1, "slots": 1, "source": "Shadowdark RPG V1" }
  ]
}

## Language output schema

Write to `data/languages.json`:

[
  { "name": "Common", "notes": "Spoken by all civilized peoples." },
  { "name": "Dwarvish", "notes": "Language of the dwarves." }
]

## Rules (gear)

- `cost_gp`: cost in gold pieces as a number. If listed in silver (sp), convert (10sp = 1gp).
  If cost is variable or not listed, use null.
- `slots`: encumbrance slots as a number. If not listed, use null.
- `ac` for armor: the armor class value as written (may be base AC or AC bonus — note which).
- `properties`: array of strings (e.g. ["finesse", "thrown", "two-handed"]). Empty array if none.
- Deduplicate across books. If the same item appears with different stats, include both
  and add `"_note"` flagging the conflict.

## Rules (languages)

- Include every language mentioned in any source as something characters can know or learn.
- `notes`: one sentence from the books, or empty string if no description given.

Write to: `data/gear.json` and `data/languages.json`
