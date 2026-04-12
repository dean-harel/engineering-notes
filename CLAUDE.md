# Engineering Notes

A blog of short engineering notes on AI workflow optimization, hosted on Jekyll/GitHub Pages. Each entry has an optional audio version generated via ElevenLabs.

See `entries/drafts/README.md` for the contribution workflow.

## What NOT to do

- Do not manually create numbered folders in `entries/`
- Do not write frontmatter (title, layout, reading_time, author, date) — the pipeline generates it
- Do not edit the `README.md` index — the pipeline appends entries automatically
- Do not generate audio locally — the pipeline calls ElevenLabs
- Do not edit `index.md` entry listings — it uses a Liquid template that self-updates

## Entry style

- Sentence case for titles (e.g., "Learning new topics faster with AI")
- Conversational tone, 2-5 min read
- See `.claude/rules/voice.md` for writing voice guidelines (auto-loaded when editing entries)

## entry.yml

Defines the author name and ElevenLabs voice/model configuration.

## Audio generation pipeline

The pipeline follows a one-way flow: `body.md → speech.md → MP3`.

- `body.md`: Clean body text extracted from the draft on first publish. Edit this to change content.
- `speech.md`: Auto-generated from `body.md`. Can be hand-edited to improve how the entry sounds. If `body.md` changes, `speech.md` is regenerated (overwriting manual edits).
- MP3: Generated from `speech.md` via ElevenLabs TTS API.
- Hash-based caching: `.speech-hash` and `.audio-hash` track whether inputs changed. Pipeline skips regeneration when hashes match.
- Audio generation happens in CI — do not generate audio locally.
- To iterate: edit `body.md` or `speech.md`, then remove and re-add the `ready` label.
