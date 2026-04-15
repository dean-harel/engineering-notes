---
name: entry
description: Use when creating, drafting, or publishing engineering notes entries — provides conversational workflow managing research, drafting, folding, and publishing with automatic state tracking. Activate this whenever you're helping someone write an engineering note, from rough idea through publication.
---

# Entry Skill

Manage the research → draft → publish lifecycle for engineering-notes entries. Each command is one conversational cycle: detect state, prompt for input, update files, show next steps. Respects manual edits. Follows the voice guide at `.claude/rules/voice.md`.

## Quick Reference

**Create new entry:**
```
/entry "Your rough idea here"
```
Creates `entries/wip/<ULID>-<slug>/research.md`, prompts for initial research input.

**Resume or continue:**
```
/entry <ulid>
```
Detects current state, shows options, responds to your choice.

## Entry States

```
STATE 1: Research only
  └─ User can: iterate research, or move to draft

STATE 2: Research + Draft
  └─ User can: iterate research, iterate draft, fold research→draft, or publish
```

## Interaction Cycle

Each cycle follows the same pattern:

1. User inputs command `/entry "idea"` or `/entry <ulid>`
2. Skill creates/detects state → folder, files, content
3. Skill prompts for input → "What's your rough idea?" or "What next?"
4. User responds (as text, not a command)
5. Skill processes → updates file
6. Skill shows result → preview, confirmation
7. Skill prompts again → "What next?"
8. Loop returns to step 4

## Commands

### `/entry "Your rough idea"`

Extract slug from idea, generate 4-char ULID, create `entries/wip/<ULID>-<slug>/research.md` with template sections.

**What user sees:**
```
✔ Created abc1
Entry: abc1-how-to-approach-code-review

● research ─── draft

What's your rough idea?
```

User responds with thoughts → Skill appends to research.md under "Rough Idea" → Shows state → "What next?"

### `/entry <ulid>`

Detect state (research exists? draft exists?), show content preview (first 100 words of each), prompt for next action.

**What user sees (research stage):**
```
📋 Entry: abc1 (how-to-approach-code-review)

● research ─── draft

"During code review, teams often spend time on..."

What next?
```

User can respond with:
- "add more research" → prompts for research input
- "move to draft" → asks for title, creates draft.md
- "work on draft" → shows draft excerpt, prompts for revisions
- "fold research into draft" → shows research, guides integration
- "publish" → validates H1, promotes to entries/drafts/
- Freeform intent → skill interprets and routes

## Per-Action Behavior

**Add Research:** Prompt "What would you like to add or explore?" → Append to research.md

**Move to Draft:**
- Prompt: "Do you have a title?"
- If yes: Create draft.md with H1 pre-filled
- If no: Create draft.md with `# [Add your title here]` placeholder

**Work on Draft:**
- Show current draft excerpt
- Prompt: "What would you like to revise or add?"
- User responds → Skill updates draft.md

**Fold Research → Draft:**
- Show research.md excerpt
- Prompt: "How should these findings inform your draft?"
- User specifies section or area → Skill updates draft.md

**Publish:**
- Check H1 in draft.md
  - If missing: Show draft, prompt "What's your entry title?", user provides, skill updates
  - If present: Continue
- Validate content present
- Extract title, create slug, copy to `entries/drafts/{title}.md`
- Show: "✔ Promoted to entries/drafts/{title}.md"
- Show: "Next: Open PR, add 'ready' label"

## File Structure

Entries live in `entries/wip/<ULID>-<slug>/`:
- `research.md` — Exploration, notes, references
- `draft.md` — Entry with H1 title + body

See `templates/scaffolds.md` for initial file templates.

## Templates, Examples, and Edge Cases

- **File templates:** See `templates/scaffolds.md`
- **Example workflows:** See `examples/workflows.md`
- **Edge case handling:** See `faqs/edge-cases.md`

## Implementation Notes

**Slug generation:** Lowercase → split on spaces → join with hyphens → remove specials  
**ULID:** 4 random alphanumeric characters (a-z, 0-9). Ensures uniqueness even if slugs collide.

**Voice alignment:** Follow `.claude/rules/voice.md`. The skill guides toward the voice guide; if something doesn't match, mention it. Don't block—guide.

**Manual edits:** Skill always reads current file state. Manual edits are respected. Next invocation sees them.

**Error recovery:** All errors are recoverable. Show the problem, show what's needed, offer immediate fix path. No abort.
