# Background Extraction Agent

Read every PDF in `/home/justina/Desktop/TTRPG Workshop/Shadowdark/` using the Read tool.
Find all character background tables. Extract them.

## Output schema

Write a JSON array to `data/backgrounds.json`:

[
  {
    "roll": 1,
    "name": "Urchin",
    "description": "You grew up on the streets. You know how to survive with nothing.",
    "source": "Shadowdark RPG V1"
  }
]

## Rules

- `roll`: integer (or range — use the lowest number in range as integer if needed,
  or use a string like "1-2" if the book groups multiple rolls under one background).
- Include the full background description as written.
- If multiple books provide background tables, include all entries, each tagged with source.
- Do not invent or infer content.

Write to: `data/backgrounds.json`
