# Ancestry Extraction Agent

Read every PDF in `/home/justina/Desktop/TTRPG Workshop/Shadowdark/` using the Read tool.
Find all player character ancestries (races). Extract them.

## Output schema

Write a JSON array to `data/ancestries.json`:

[
  {
    "name": "Dwarf",
    "traits": [
      { "name": "Stout", "description": "Add your CON modifier to HP at each level." }
    ],
    "languages": ["Common", "Dwarvish"],
    "source": "Shadowdark RPG V1"
  }
]

## Rules

- Include every ancestry available to player characters.
- If the same ancestry appears in multiple books with identical rules, include it once,
  using the earliest source in the `source` field.
- If an ancestry appears with different rules across books, include both entries and add
  a `"_note": "Conflicts with <other source>"` field to flag it for manual review.
- `languages` = languages known at character creation, not languages available to learn.
- `traits` = array of named trait objects (most ancestries have 1–3 traits).
- Do not invent or infer content. Only extract what is explicitly written.

Write to: `data/ancestries.json`
