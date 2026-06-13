# Extraction Agents

Each `.md` file here is an instruction prompt for a Claude agent.
To run an extraction: invoke an Agent with the file's contents as the prompt.
Re-running is safe — agents overwrite the target JSON file.

Source PDFs: `/home/justina/Desktop/TTRPG Workshop/Shadowdark/`
Output: `data/` directory relative to project root.

Run order: ancestries → classes → spells → backgrounds → gear_languages
