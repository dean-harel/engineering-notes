# X Articles Syndication Design

**Date:** 2026-04-17

## Goal

Cross-post Engineering Notes entries to X Articles automatically as part of the publish pipeline, with an attribution link back to the original entry on GitHub Pages. The pipeline generates a ready-to-paste HTML artifact; the author manually pastes it into the X Articles editor and publishes.

Full automation is not possible — X has no Articles API. Articles are created through the x.com web editor only.

---

## Background

### X Articles

- Requires X Premium ($8/mo, 25k char limit) or Premium Plus ($22/mo, 100k char limit)
- Editor is Draft.js rich text — markdown pasted raw shows literal syntax
- HTML pasted via clipboard renders correctly with full formatting preserved
- Supported formatting: H1–H3, bold, italic, strikethrough, lists, links
- No native divider/separator element — `· · ·` used as text-based thematic break
- Title is a separate field from body content
- Native "Listen" feature (Grok Voice TTS) auto-generates on publish — no author control

### X Articles ergonomics

Workflow for the author after CI runs:
1. Open `x-article.html` in the entry folder
2. Select all, copy
3. Paste into X Articles editor — formatting renders correctly
4. Fill the title field separately
5. Publish

---

## Architecture

### Dependency graph

```
body.md ──→ speech.md (manipulable projection)
        ──→ destination artifacts (pure projections)
speech.md → audio (MP3)
```

Destination artifacts are outputs of a completed entry. They depend only on `body.md` and entry metadata (title, slug, number). They do not feed into any other pipeline step.

### Pipeline structure

```
1. Save body.md
2. Check body hash           ← exports body_changed
3. Generate speech.md        ← body.md projection; runs if body_changed
4. Generate audio            ← speech.md projection; hash-cached
5. Create index.md
6. Update README index
7. Generate destination artifacts  ← body.md projections; runs if body_changed
8. Commit and push
```

The destination step runs at the end, after the core entry is fully formed (title, slug, number, URL all resolved). This keeps the core pipeline untouched when new destinations are added.

### Trigger condition

A dedicated **"Check body hash"** step computes the body.md hash, compares it to `.speech-hash`, and exports `body_changed`. Both `speech.md` and destination artifacts consume this signal independently — neither is coupled to the other.

```
Check body hash → body_changed
  ├── Generate speech.md           (if body_changed)
  ├── Generate audio               (if speech inputs changed)
  └── Generate destination artifacts  (if body_changed)
```

---

## Config

`entry.yml` gets a `destinations` block. All entries syndicate to enabled destinations by default:

```yaml
author: Dean Harel
voice: <voice_id>
model: <model_id>
destinations:
  x_articles: true
```

Adding a new channel in future (e.g., Substack) is: `substack: true` in config + `scripts/generate_substack.py`.

---

## Script

**`scripts/generate_x_article.py`** — single entry, deterministic, callable directly.

```
python3 scripts/generate_x_article.py --entry-dir entries/001-dude-wheres-my-team
```

**Inputs:**
- `{entry-dir}/body.md` — entry body content
- `{entry-dir}/index.md` — title extracted from frontmatter

**Transform:**
- Converts markdown → HTML (`markdown` library, `extra` extension)
- Replaces `<hr>` with `<p>· · ·</p>` (Draft.js drops `<hr>` on paste)
- Prepends `<h1>{title}</h1>`
- Appends `· · ·` separator + attribution footer

**Output:** `{entry-dir}/x-article.html`

**Attribution footer:**
```html
<p>· · ·</p>
<p><em>Originally published at <a href="https://dean-harel.github.io/engineering-notes/entries/{folder-name}/">Engineering Notes</a>.</em></p>
```

**Jekyll exclusion:** `x-article.html` added to `_config.yml` exclude list alongside `body.md` and `speech.md`.

---

## Pipeline step

New step in `entry-publish.yml` — "Generate destination artifacts" — after "Create entry page", before "Commit and push":

```yaml
- name: Generate destination artifacts
  if: steps.body_hash.outputs.body_changed == 'true'
  run: |
    X_ARTICLES=$(python3 -c "import yaml; d = yaml.safe_load(open('entry.yml')).get('destinations', {}); print(d.get('x_articles', False))")
    if [ "$X_ARTICLES" = "True" ]; then
      python3 scripts/generate_x_article.py \
        --entry-dir "entries/${{ steps.number.outputs.number }}-${{ steps.slug.outputs.slug }}"
    fi
```

The speech step is updated to export `needs_regen` as a step output so the destination step can consume it.

**PR comment** — posted when artifact is generated:
```
📄 X Article artifact ready: `entries/NNN-slug/x-article.html`
Copy the file contents and paste into the X Articles editor. Fill the title field separately before publishing.
```

---

## Backfill

One-off script run as part of the same PR that adds the feature. Iterates all existing entries:

```bash
for dir in entries/[0-9][0-9][0-9]-*/; do
  python3 scripts/generate_x_article.py --entry-dir "$dir"
done
```

Current entries to backfill: `001-dude-wheres-my-team`, `002-ic-dead-people`, `003-loco`.

---

## Files changed

| File | Change |
|------|--------|
| `entry.yml` | Add `destinations.x_articles: true` |
| `_config.yml` | Add `"entries/*/x-article.html"` to exclude list |
| `scripts/generate_x_article.py` | New — already written and tested |
| `.github/workflows/entry-publish.yml` | Add body hash step (exports `body_changed`); update speech step to consume it; add destination artifacts step |
| `entries/001-*/x-article.html` | Backfill |
| `entries/002-*/x-article.html` | Backfill |
| `entries/003-*/x-article.html` | Backfill |
