#!/usr/bin/env python3
"""Generate the Palladium Fantasy Spells & Psionics PDF from spells.json."""
import json, subprocess
from pathlib import Path

data_path = Path(__file__).parent.parent / "data" / "spells.json"
out_dir = Path(__file__).parent
md_path = out_dir / "palladium-spells.md"
pdf_path = out_dir / "palladium-spells.pdf"

spells = [s for s in json.loads(data_path.read_text()) if s["source"] == "Palladium Fantasy 2nd Ed."]

CLASS_ORDER = [
    ("Wizard",            "magic",   "Intelligence",
     "Palladium Wizards are masters of invocation and elemental fire, drawing on raw arcane power to devastate enemies and unravel magical effects. They know the most spells of any class and grow only more fearsome with each tier."),
    ("Warlock",           "magic",   "Intelligence",
     "Warlocks bind themselves to a single element — Air, Earth, Fire, or Water — at creation. All their power flows from that bond. Choose your element and embrace it completely."),
    ("Witch",             "magic",   "Intelligence",
     "Witches command dark nature magic: hexes, curses, poisons, and the power of life and death. They are feared across the world for good reason. Their magic is subtle or devastating depending on their mood."),
    ("Priest of Light",   "divine",  "Wisdom",
     "Priests of Light serve the gods of goodness and law. They heal the wounded, banish the undead, and call down holy wrath on the servants of darkness. They are the shield of civilization."),
    ("Priest of Darkness","divine",  "Wisdom",
     "Priests of Darkness serve the gods of evil and entropy. They command the dead, spread fear, and wield necrotic power. Not all are mindlessly cruel — but all are dangerous."),
    ("Druid",             "divine",  "Wisdom",
     "Druids are priests of the natural world, standing apart from both the Church of Light and Darkness. They answer to no god but nature itself — healing, shaping the land, and commanding storms and beasts."),
    ("Psychic Sensitive", "psionic", "Charisma",
     "Psychic Sensitives perceive what others cannot: emotions, lies, spirits, and the threads of fate. They are seers and detectives, capable of devastating mental attacks at higher tiers."),
    ("Psi-Healer",        "psionic", "Charisma",
     "Psi-Healers focus their psychic talent entirely on the body — mending wounds, curing disease, relieving pain, and eventually reversing death itself. They are the rarest and most valued psionics."),
    ("Psi-Mystic",        "psionic", "Charisma",
     "Psi-Mystics blend psionic ability with a spiritual awareness of the unseen world. They sense spirits, navigate the astral plane, and perceive truths that are hidden from ordinary sight."),
    ("Mind Mage",         "psionic", "Charisma",
     "Mind Mages are the most powerful and versatile psychics. They combine telekinesis, telepathy, healing, and mental combat into a complete psionic discipline. A master Mind Mage is one of the most formidable beings alive."),
]

CATEGORY_LABELS = {
    "magic":   "Arcane Magic",
    "divine":  "Divine Magic",
    "psionic": "Psionics",
}

lines = []

lines += [
    "---",
    "title: 'Palladium Fantasy: Spells & Psionics'",
    "subtitle: 'Adapted for the Shadowdark System'",
    "author: 'Shadowdark Palladium Adaptation'",
    "geometry: margin=2.5cm",
    "fontsize: 11pt",
    "colorlinks: true",
    "---",
    "",
    "# Introduction",
    "",
    "This document contains all spells and psionic powers for the ten spellcasting classes of Palladium Fantasy, adapted for the Shadowdark ruleset.",
    "",
    "**How spells work in Shadowdark:** Spellcasters choose a number of spells at character creation (listed on their class card). To cast a spell, roll 1d20 plus your spellcasting modifier. On an 11+, the spell succeeds. On a 1–10, the spell fails — you still expend the attempt but gain a *Wildcard* die to add to any future roll. Spells have no slots; you may attempt any known spell each round.",
    "",
    "**Spell tiers** reflect raw power. Tier 1 spells are learnable at character creation. Higher tiers become available as you gain levels and talents. Damage scales with tier:",
    "",
    "| Tier | Single Target | Area Effect |",
    "|------|--------------|-------------|",
    "| 1    | 1d4 – 1d6    | —           |",
    "| 2    | 2d6          | 1d6         |",
    "| 3    | 4d6          | 3d6         |",
    "| 4    | 6d6          | 4d6         |",
    "| 5    | 8d6          | 8d6         |",
    "",
    "**Saving throws** use the listed ability (CON, WIS, or STR) against DC 12 at tier 1–2, DC 13 at tier 3, DC 14 at tier 4, and DC 15 at tier 5.",
    "",
    "\\newpage",
    "",
]

current_category = None
for cls_name, category, stat, description in CLASS_ORDER:
    cls_spells = [s for s in spells if s["class"] == cls_name]
    if not cls_spells:
        continue

    cat_label = CATEGORY_LABELS[category]
    if category != current_category:
        lines += [f"# {cat_label}", ""]
        current_category = category

    lines += [
        f"## {cls_name}",
        "",
        f"*Spellcasting stat: {stat}*",
        "",
        description,
        "",
    ]

    for tier in range(1, 6):
        tier_spells = [s for s in cls_spells if s["tier"] == tier]
        if not tier_spells:
            continue
        lines += [f"### Tier {tier}", ""]
        for s in tier_spells:
            lines.append(f"**{s['name']}** · *{s['duration']} | {s['range']}*")
            lines.append(f": {s['description']}")
            lines.append("")

    lines += ["\\newpage", ""]

md_path.write_text("\n".join(lines))
print(f"Markdown written: {md_path}")

result = subprocess.run(
    ["pandoc", str(md_path), "-o", str(pdf_path), "--pdf-engine=weasyprint"],
    capture_output=True, text=True
)
if result.returncode == 0:
    print(f"PDF written:      {pdf_path}")
else:
    print("pandoc stderr:", result.stderr)
    print("pandoc stdout:", result.stdout)
