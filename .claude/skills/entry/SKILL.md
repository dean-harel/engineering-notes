---
name: entry
description: Use when researching or drafting engineering notes entries through a conversational workflow with automatic state tracking. Activate this whenever you're helping someone write an engineering note, from rough idea through a draft ready to be promoted to an entry.
---

# Entry Skill

Manage the research → draft → promote lifecycle for engineering-notes entries. Each command is one conversational cycle: detect state, show current working state, present workflow options based on available artifacts. Respects manual edits.

## Quick Reference

**Create new entry:**

```
/entry "Your rough idea here"
```

Creates `entries/wip/<ULID>-<slug>/research.md` with Rough Idea prefilled, shows current state, presents options to revise.

**Resume or continue:**

```
/entry <ulid>
```

Detects current state, shows current working state, presents available options based on artifacts.

## Entry Workflow States

The skill's job is to show current state and present next options based on which artifacts exist.

```
STATE 1: Research only (research.md exists, no draft.md)
  └─ Options: revise research, or move to draft

STATE 2: Research + Draft (both exist)
  └─ Options: revise research, revise draft, integrate research→draft, or promote
```

**Research input comes from 2 sources:**

1. User input (focus areas, ideas, direction)
2. Deep search results (web research around focus areas + adjacent topics)

Both feed into `research.md` as the working artifact during exploration.

## Interaction Cycle

Each cycle follows the same pattern:

1. User inputs command `/entry "idea"` or `/entry <ulid>`
2. Skill creates/detects state → folder, files, content
3. Skill shows current state → "● research" (with preview) or "● research ─── ● draft"
4. Skill presents options based on artifacts → "You can: revise research, move to draft, revise draft, integrate research, or promote"
5. User responds with choice (as text, not a command)
6. Skill processes → updates file based on choice
7. Skill shows result → preview, confirmation
8. Loop returns to step 3 (show current state again)

## Commands

### `/entry "Your rough idea"`

Extract slug from idea, generate 4-char ULID, create `entries/wip/<ULID>-<slug>/research.md` with template sections.

**What user sees:**

```
✔ Created abc1
Entry: abc1-how-to-approach-code-review

● research ─── draft

You can: revise research, move to draft
```

User responds with choice (revise research, move to draft) → Skill processes → Shows updated state → Presents options again

### `/entry <ulid>`

Detect state (research exists? draft exists?), show content preview (first 100 words of each), present available options.

**What user sees (research stage):**

```
📋 Entry: abc1 (how-to-approach-code-review)

● research ─── draft

"During code review, teams often spend time on..."

You can: revise research, move to draft
```

**What user sees (research + draft stage):**

```
📋 Entry: abc1 (how-to-approach-code-review)

● research ─── ● draft

Research: "During code review, teams often spend time on..."
Draft: "# Optimizing Code Review\n\nCode reviews are critical..."

You can: revise research, revise draft, integrate research, promote
```

User responds with choice → Skill processes → Shows updated state

## Per-Action Behavior

**Revise Research:**  
Prompt "What would you like to revise or explore?" → Append to research.md

**Move to Draft:**

- Prompt: "Do you have a title?"
- If yes: Create draft.md with H1 pre-filled
- If no: Create draft.md with `# [Add your title here]` placeholder

**Revise Draft:**

- Show current draft excerpt
- Prompt: "What would you like to revise or add?"
- User responds → Skill updates draft.md

**Integrate Research → Draft:**

- Show research.md excerpt
- Prompt: "How should these findings inform your draft?"
- User specifies section or area → Skill updates draft.md
- (Name changed from "fold" to "integrate" — clearer action)

**Promote:**

- Check H1 in draft.md
  - If missing: Show draft, prompt "What's your entry title?", user provides, skill updates draft.md with H1, continue (keep user in flow, don't abort)
  - If present: Continue
- Validate content present (title + body)
  - If only title, no body: Show draft, offer to add content now before promoting
- Extract title, create slug, copy to `entries/drafts/{title}.md`
- Show: "✔ Promoted to entries/drafts/{title}.md"

## File Structure

Entries live in `entries/wip/<ULID>-<slug>/`:

- `research.md` — Exploration, notes, references (see `templates/research.md`)
- `draft.md` — Entry with H1 title + body (see `templates/draft.md`)

## Implementation Notes

**Slug generation:** Lowercase → split on spaces → join with hyphens → remove specials  
**ULID:** 4 random alphanumeric characters (a-z, 0-9). Ensures uniqueness even if slugs collide.

**Voice alignment:** Content should follow the project's voice guidelines. During work, if something doesn't align, guide without blocking. The skill focuses on workflow — voice quality is collaborative feedback, not a hard gate.

**Manual edits:** Skill always reads current file state. Manual edits are respected. Next invocation sees them.

**Error recovery:** All errors are recoverable. Show the problem clearly, show what's needed, offer immediate fix path inline. No abort — continue workflow to keep user in flow.

**State display:** Every interaction cycle shows current state (which artifacts exist + preview) before presenting options. This grounds the user in "where am I" before deciding "what next".
