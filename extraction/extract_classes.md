# Class Extraction Agent

Read every PDF in `/home/justina/Desktop/TTRPG Workshop/Shadowdark/` using the Read tool.
Find all player character classes. Extract them.

## Output schema

Write a JSON array to `data/classes.json`:

[
  {
    "name": "Fighter",
    "hit_die": "d8",
    "armor_proficiencies": ["all armor", "shields"],
    "weapon_proficiencies": ["all weapons"],
    "class_features": [
      { "name": "Hauler", "description": "Add your CON modifier to your gear slots." }
    ],
    "talents_table": [
      { "roll": "2", "description": "+2 to melee and ranged attacks" },
      { "roll": "3-6", "description": "+2 to melee and ranged attacks" }
    ],
    "spellcasting": false,
    "spell_stat": null,
    "spells_known_at_creation": 0,
    "starting_gear": [
      "Longsword",
      "Shield",
      "Chain mail",
      "5 gp"
    ],
    "source": "Shadowdark RPG V1"
  }
]

## Rules

- `spellcasting`: true if the class casts spells, false otherwise.
- `spell_stat`: the ability score used for spellcasting (e.g. "WIS", "INT"), or null.
- `spells_known_at_creation`: number of spells chosen at level 1 (0 for non-casters).
- `starting_gear`: array of strings as written in the book — descriptive, not normalized.
- `talents_table`: extract every row from the class's talents table. Use the exact roll
  range as written (e.g. "2", "3-6", "12").
- If a class appears in multiple books with different features, include both entries and
  add a `"_note"` field flagging the conflict.
- Do not invent or infer content.

Write to: `data/classes.json`
