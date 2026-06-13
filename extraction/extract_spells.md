# Spell Extraction Agent

Read every PDF in `/home/justina/Desktop/TTRPG Workshop/Shadowdark/` using the Read tool.
Find all spells for all spellcasting classes. Extract them.

## Output schema

Write a JSON array to `data/spells.json`:

[
  {
    "name": "Charm Person",
    "tier": 1,
    "class": "Wizard",
    "duration": "1 hour",
    "range": "Near",
    "description": "A creature you can see treats you as a trusted friend for the duration. It won't fight you unless you or an ally attacks it.",
    "source": "Shadowdark RPG V1"
  }
]

## Rules

- Include all spell tiers (1 through 5, or whatever range the books use).
- `class`: name of the class that uses this spell list. If a spell appears on multiple
  class lists, include a separate entry for each class.
- If the same spell appears across multiple books with identical text, include it once.
- If a spell appears with different text, include both and add `"_note"` flagging the conflict.
- Do not invent or infer content. Copy descriptions exactly.

Write to: `data/spells.json`
