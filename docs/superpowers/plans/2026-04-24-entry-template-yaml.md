# Entry template YAML migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the entry skill's markdown template files with structured YAML templates that carry section headings, placeholder text, per-section fill instructions, and top-level rules — while keeping the skill template-agnostic and per-entry artifacts data-only.

**Architecture:** Two files change format: `templates/research.md` → `templates/research.yaml` and `templates/draft.md` → `templates/draft.yaml`. The skill gains three generic contract rules that say every artifact has a YAML template, entries are rendered from it on create, and `instructions` + `rules` are consulted (never written) on fill/revise. No code — this is a prompt-driven skill; the "implementation" is file edits and one manual dry-run.

**Tech Stack:** Markdown, YAML. Claude Code skill loader.

---

## File Structure

- **Create:** `.claude/skills/entry/templates/research.yaml` — YAML template for research artifact.
- **Create:** `.claude/skills/entry/templates/draft.yaml` — YAML template for draft artifact.
- **Delete:** `.claude/skills/entry/templates/research.md`.
- **Delete:** `.claude/skills/entry/templates/draft.md`.
- **Modify:** `.claude/skills/entry/SKILL.md` — update Artifacts section filenames; add three contract rules.

Per the spec, `instructions` fields start as empty strings in both YAMLs. The author will fill them in later edits — this plan migrates structure only, not procedural content. `rules` starts empty.

Existing WIP entries (e.g., `entries/wip/k7m3-rewind-to-avoid-agent-misuse/research.md`) are unaffected: they are already rendered markdown and don't reference templates at runtime.

---

## Task 1: Create `templates/research.yaml`

**Files:**
- Create: `.claude/skills/entry/templates/research.yaml`

- [ ] **Step 1: Write the YAML file**

Create `.claude/skills/entry/templates/research.yaml` with this exact content:

```yaml
rules: []

sections:
  - heading: Rough Idea
    description: |
      The seed of the entry: what you want to explore and why it's worth exploring. This section anchors direction — everything downstream builds from it, so it should be specific enough that someone else could tell what the entry is reaching for.
    instructions: ""

  - heading: Questions
    description: |
      The core inquiries driving the exploration — what you need to probe or resolve to turn the rough idea into a claim. Lives here so the research has a target; expected to evolve as patterns emerge.
    instructions: ""

  - heading: Sources & Links
    description: |
      References gathered during exploration: articles, docs, conversations, prior work. Kept separate from observations so provenance stays traceable.
    instructions: ""

  - heading: Observations
    description: |
      Concrete material from sources or direct experience — scenes, quotes, claims, findings, moments. The specific grounding the thesis will rest on; not summary, not interpretation.
    instructions: ""

  - heading: Patterns & Emerging Thesis
    description: |
      What connects across observations: recurring threads, tensions, the shape of an argument forming. This is where raw material turns into a point of view.
    instructions: ""

  - heading: Refined Direction
    description: |
      How thinking has shifted from the rough idea once research caught up with it. New questions that appeared, claims that strengthened or collapsed, the sharper version of what the entry is actually about.
    instructions: ""
```

Note: the top-level `# Research: [Your Topic]` H1 that the current markdown template carries is intentionally omitted. The skill will render only `## {heading}` per section. The previous H1 was purely decorative — research artifacts are addressed by folder id, not by an H1 title.

- [ ] **Step 2: Verify YAML parses**

Run: `python3 -c "import yaml; d = yaml.safe_load(open('.claude/skills/entry/templates/research.yaml')); assert isinstance(d['rules'], list); assert len(d['sections']) == 6; assert all('heading' in s and 'description' in s and 'instructions' in s for s in d['sections']); print('ok')"`

Expected output: `ok`

If Python's `yaml` module is missing, use: `ruby -ryaml -e "d = YAML.load_file('.claude/skills/entry/templates/research.yaml'); raise unless d['sections'].size == 6; puts 'ok'"`

---

## Task 2: Create `templates/draft.yaml`

**Files:**
- Create: `.claude/skills/entry/templates/draft.yaml`

- [ ] **Step 1: Write the YAML file**

Create `.claude/skills/entry/templates/draft.yaml` with this exact content:

```yaml
rules: []

sections:
  - heading: Your Title Here
    description: |
      Your entry body
    instructions: ""
```

Note: the draft template is deliberately minimal. The current `draft.md` uses an H1 (`# Your Title Here`), but under the new contract all sections render as `##`. This is acceptable because the draft is always rewritten during "Move to Draft" — the skill reads `research.md` in full and writes `draft.md` with an H1 title plus body based on user-provided title. The template exists so the contract ("every artifact has a YAML template") holds uniformly; its content is never directly rendered into a completed draft.

- [ ] **Step 2: Verify YAML parses**

Run: `python3 -c "import yaml; d = yaml.safe_load(open('.claude/skills/entry/templates/draft.yaml')); assert d['sections'][0]['heading'] == 'Your Title Here'; print('ok')"`

Expected output: `ok`

---

## Task 3: Delete old markdown templates

**Files:**
- Delete: `.claude/skills/entry/templates/research.md`
- Delete: `.claude/skills/entry/templates/draft.md`

- [ ] **Step 1: Delete the files**

Run: `git -C /Users/deanharel/Developer/engineering-notes rm .claude/skills/entry/templates/research.md .claude/skills/entry/templates/draft.md`

Expected: both files staged for deletion.

- [ ] **Step 2: Verify removal**

Run: `ls .claude/skills/entry/templates/`

Expected output: only `draft.yaml` and `research.yaml`.

---

## Task 4: Update SKILL.md — Artifacts section

**Files:**
- Modify: `.claude/skills/entry/SKILL.md` — Artifacts section (around lines 10-17)

- [ ] **Step 1: Read the current Artifacts section**

Read `.claude/skills/entry/SKILL.md` lines 10–17 to confirm current text. Current content:

```markdown
## Artifacts

Entries live in `entries/wip/<id>-<slug>/`. Each entry has up to two artifacts:

- `research.md` — Exploration, notes, references (see `templates/research.md`)
- `draft.md` — Entry with H1 title + body (see `templates/draft.md`)

All artifact filenames and paths are defined here. Other sections refer to them by name (research, draft).
```

- [ ] **Step 2: Replace it with the YAML-aware version**

Replace the block above with:

```markdown
## Artifacts

Entries live in `entries/wip/<id>-<slug>/`. Each entry has up to two artifacts:

- `research.md` — Exploration, notes, references. Template: `templates/research.yaml`.
- `draft.md` — Entry with H1 title + body. Template: `templates/draft.yaml`.

All artifact filenames and paths are defined here. Other sections refer to them by name (research, draft).

### Template contract

Every artifact has a YAML template at `templates/<artifact>.yaml` with this shape:

```yaml
rules: []          # optional: cross-cutting procedural guidance (list of strings)
sections:          # ordered, non-empty
  - heading: ...   # rendered as `## {heading}` in the entry file
    description: ...  # rendered inside `[...]` as the purpose placeholder
    instructions: ...  # consulted when filling/revising; never written to the entry
```

The skill follows three generic rules regardless of which artifact is being touched:

1. **Required template.** `templates/<artifact>.yaml` must exist for every artifact listed above. If missing or malformed, surface a user-facing error and stop.
2. **Create by rendering.** When creating an artifact in an entry folder, parse the YAML and write each section as `## {heading}` followed by a blank line and `[{description}]`. Do not write `rules` or `instructions` into the entry file.
3. **Fill and revise by consulting.** When filling a section on creation, or during any later fill/revise action, read the YAML, match sections by heading text, and follow the matching section's `instructions` plus the top-level `rules`. Do not copy `instructions` or `rules` into the entry file.
```

Note: the above replacement block contains a nested fenced code block. In the actual edit, use the same outer triple-backtick fence the Artifacts section lives in — the nested YAML example should use a different fence style or indented code to avoid breaking the outer markdown. Simpler: use `~~~yaml` ... `~~~` for the nested block so the outer ``` fence stays intact. Rewrite the `sections:` sub-block using `~~~`:

```markdown
### Template contract

Every artifact has a YAML template at `templates/<artifact>.yaml` with this shape:

~~~yaml
rules: []          # optional: cross-cutting procedural guidance (list of strings)
sections:          # ordered, non-empty
  - heading: ...   # rendered as `## {heading}` in the entry file
    description: ...  # rendered inside `[...]` as the purpose placeholder
    instructions: ...  # consulted when filling/revising; never written to the entry
~~~

The skill follows three generic rules regardless of which artifact is being touched:

1. **Required template.** `templates/<artifact>.yaml` must exist for every artifact listed above. If missing or malformed, surface a user-facing error and stop.
2. **Create by rendering.** When creating an artifact in an entry folder, parse the YAML and write each section as `## {heading}` followed by a blank line and `[{description}]`. Do not write `rules` or `instructions` into the entry file.
3. **Fill and revise by consulting.** When filling a section on creation, or during any later fill/revise action, read the YAML, match sections by heading text, and follow the matching section's `instructions` plus the top-level `rules`. Do not copy `instructions` or `rules` into the entry file.
```

Use the `~~~yaml` variant in the edit.

- [ ] **Step 3: Verify the file still parses as markdown**

Run: `head -60 .claude/skills/entry/SKILL.md`

Expected: Artifacts section shows both bullets referencing `.yaml` templates, followed by the `### Template contract` subsection with the three numbered rules and the `~~~yaml` block intact.

---

## Task 5: Update SKILL.md — `/entry "Your rough idea"` command

**Files:**
- Modify: `.claude/skills/entry/SKILL.md` — the `/entry "Your rough idea"` section (around line 72)

The current text says: *"create `entries/wip/<id>-<slug>/research.md` from the template. Populate only the section whose purpose the rough idea directly addresses — expand the input enough to clarify direction, but do not fabricate content for sections the user hasn't contributed to yet. Leave every other placeholder intact..."*

This still works but should reference the YAML render explicitly so the reader connects it to the Template contract.

- [ ] **Step 1: Replace the first sentence of that paragraph**

Change:

```
Extract slug from idea, generate 4-char id, create `entries/wip/<id>-<slug>/research.md` from the template.
```

To:

```
Extract slug from idea, generate 4-char id, render `templates/research.yaml` into `entries/wip/<id>-<slug>/research.md` per the Template contract.
```

The rest of the paragraph (populate only the addressed section, leave other placeholders intact, purpose descriptions guide later exploration) stays as-is — it still describes the correct first-fill behavior, now applied to the rendered `[description]` blocks.

- [ ] **Step 2: Verify**

Run: `grep -n "render .templates/research.yaml" .claude/skills/entry/SKILL.md`

Expected: one match in the `/entry "Your rough idea"` section.

---

## Task 6: Manual dry-run verification

This skill has no automated test harness — it runs inside Claude Code. Verify by exercising it.

- [ ] **Step 1: Commit the migration first**

```bash
git add .claude/skills/entry/templates/research.yaml .claude/skills/entry/templates/draft.yaml .claude/skills/entry/SKILL.md
git rm .claude/skills/entry/templates/research.md .claude/skills/entry/templates/draft.md 2>/dev/null || true
git commit -m "feat(entry): migrate templates to YAML with embedded fill instructions"
```

(The `git rm` may already be staged from Task 3 — the `2>/dev/null || true` tolerates that.)

- [ ] **Step 2: Start a dry-run entry in a fresh Claude Code session**

In a new Claude Code session inside this repo, run: `/entry "verifying yaml template migration"`.

Expected behavior:
- New folder `entries/wip/<id>-verifying-yaml-template-migration/` created.
- `research.md` inside contains six `## {heading}` sections matching `research.yaml` in order.
- The "Rough Idea" section contains expanded prose about the topic (populated because the rough idea addresses it directly).
- All other five sections contain `[{description prose}]` verbatim from the YAML — not the YAML itself, not `rules` or `instructions`.
- The file contains no `instructions:`, no `rules:`, no `description:` keys.

- [ ] **Step 3: Verify "revise research" consults the YAML**

In the same session, respond: "revise research". Prompt should be "What would you like to revise or explore?". Respond with a short addition targeted at the "Questions" section (e.g., "add a question about how this affects existing entries").

Expected: the skill appends to the Questions section in `research.md`. If you added a non-empty `instructions` to the Questions section in `research.yaml` before running this step (optional, for verification), the skill's handling should reflect that instruction.

- [ ] **Step 4: Archive the verification entry**

Respond: "archive". Verify the folder moves to `entries/archived/`.

- [ ] **Step 5: Commit any follow-up fixes**

If Steps 2–4 surfaced bugs (e.g., the skill wrote `rules:` into the entry file, or failed to render a heading), fix them in `SKILL.md` and commit:

```bash
git add .claude/skills/entry/SKILL.md
git commit -m "fix(entry): <describe the fix>"
```

If everything worked, no follow-up commit needed.

---

## Self-Review Notes

- **Spec coverage:** YAML format (Tasks 1–2), required templates (Tasks 1–2 + contract rule 1 in Task 4), create-by-rendering (contract rule 2 in Task 4), fill/revise by consulting (contract rule 3 in Task 4), artifact filenames updated (Task 4), `/entry` creation path updated (Task 5), manual verification (Task 6). All spec sections covered.
- **Type consistency:** Field names used consistently — `rules`, `sections`, `heading`, `description`, `instructions`. Filenames consistent: `research.yaml`, `draft.yaml`.
- **No placeholders:** Every code step has exact content. Task 6 is manual verification by design (no code harness); steps specify exact commands and expected outputs.
