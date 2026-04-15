---
name: entry
description: Use when creating engineering notes entries — manages the research → draft → publish workflow with conversational state transitions
---

# Entry Meta-Skill

Manage the research → draft → publish lifecycle for engineering-notes entries. Each command is one conversational cycle: detect state, prompt for input, update files, show next steps.

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

Detects current state, shows options, responds to your choice. Just tell the skill what you want to do next.

## Entry States

```
STATE 1: Research only
  └─ User can: iterate research, or move to draft

STATE 2: Research + Draft
  └─ User can: iterate research, iterate draft, fold research→draft, or publish
```

## Interaction Model

Each cycle follows the same pattern:

1. **User inputs command** → `/entry "idea"` or `/entry <ulid>`
2. **Skill creates/detects state** → folder, files, content
3. **Skill prompts for input** → "What's your rough idea?" or "What next?" or "What would you like to revise?"
4. **User responds** (as text, not a command)
5. **Skill processes** → updates file
6. **Skill shows result** → preview, confirmation
7. **Skill prompts again** → "What next?"
8. **Loop returns to step 4**

## Commands

### `/entry "Your rough idea"`

**Action:**

1. Extract slug from idea (slugify to kebab-case)
2. Generate 4-char ULID
3. Create folder: `entries/wip/<ULID>-<slug>/`
4. Create scaffold: `research.md` with template sections
5. Prompt: "What's your rough idea? (Can be rough, exploratory notes work fine)"

**What user sees:**

```
✔ Created abc1
Entry: abc1-how-to-approach-code-review

● research ─── draft

Now, what's your rough idea?
```

**User responds with:** Their thoughts on the topic

**Skill then:**

1. Appends to research.md under "Rough Idea"
2. Shows state (research only)
3. Prompts: "What would you like to do next?"

### `/entry <ulid>`

**Action:**

1. Detect state (research exists? draft exists?)
2. Show content preview (first 100 words of each)
3. Prompt: "What would you like to do next?"

**What user sees:**

```
📋 Entry: abc1 (how-to-approach-code-review)

● research ─── draft

"During code review, teams often spend time on..."

What would you like to do next?
```

Or if at draft stage:

```
📋 Entry: abc1 (how-to-approach-code-review)

research ─── ● draft

[draft content preview]

What would you like to do next?
```

**User responds with one of:**

- "add more research" → Skill prompts for research input
- "move to draft" → Skill asks for title, creates draft.md
- "work on draft" → Skill shows current draft, prompts for revisions
- "fold research into draft" → Skill shows research, prompts for integration
- "publish" → Skill validates H1, promotes to entries/drafts/
- (or freeform intent like "I want to explore X more" → Skill interprets and routes)

**Skill then:**

1. Prompts for input if needed
2. Updates files
3. Shows result
4. Loops back to "What next?"

## Per-Action Behavior

**Add Research:** Prompt "What would you like to add or explore?" → Append to research.md

**Move to Draft:**

- Prompt: "Do you have a title? (or I can add it later)"
- User: "Yes, it's 'Code Review Best Practices'" → Create draft.md with H1 pre-filled
- User: "Not yet" → Create draft.md with `# [Add your title here]` placeholder
- Loop back: "What next?"

**Work on Draft:**

- Show current draft excerpt
- Prompt: "What would you like to revise or add?"
- User responds with revision or new content
- Update draft.md
- Loop back: "What next?"

**Fold Research → Draft:**

- Show research.md excerpt
- Prompt: "How should these findings inform your draft? (which section to update, add new section, etc?)"
- User: "Update the opening to include the blameless culture concept"
- Update draft.md (modify opening section)
- Loop back: "What next?"

**Publish:**

- Check H1 in draft.md
  - If missing: Show draft, prompt "What's your entry title?"
  - User provides: Update draft.md, proceed
  - If present: Continue
- Validate no other drafts queued in entries/drafts/
- Extract title, create slug, copy draft.md → entries/drafts/{title}.md
- Show: "✔ Promoted to entries/drafts/{title}.md"
- Show: "Next: Open PR, wait for review, add 'ready' label"
- Show: "Research notes saved at entries/wip/{ulid}-{slug}/research.md"

## Example Workflows

**Workflow 1: Quick idea → draft → publish**

```
/entry "How to review code faster"
Skill: "What's your rough idea?"
You: "When reviewing PRs, teams waste time on style issues. Could be automated."
Skill: [Updates research.md] "What next?"
You: "move to draft"
Skill: "Do you have a title?"
You: "Automating style checks in code review"
Skill: [Creates draft.md] "What next?"
You: "I'll add the body now"
[You edit draft.md in your editor or say what to add]
Skill: [Updates draft.md] "What next?"
You: "publish"
Skill: [Validates, promotes] "✔ Promoted to entries/drafts/..."
```

**Workflow 2: Deep research → draft with folding**

```
/entry "Code review optimization"
Skill: "What's your rough idea?"
You: [Initial thoughts]
Skill: "What next?"
You: "add more research"
Skill: "What would you like to explore?"
You: "[Reference to article on blameless culture]"
Skill: [Appends to research.md] "What next?"
You: "move to draft"
Skill: [Creates draft.md] "What next?"
You: "work on draft"
Skill: "What would you like to add?"
You: "[Write opening paragraph]"
Skill: [Updates draft.md] "What next?"
You: "fold research into draft"
Skill: [Shows research excerpt] "How should these inform your draft?"
You: "Add the blameless culture concept to the opening"
Skill: [Updates draft opening] "What next?"
You: "publish"
Skill: [Validates, promotes] "✔ Done"
```

## Implementation Details

**Folder structure:**

```
entries/wip/
  abc1-my-rough-idea/
    research.md          # Exploration, notes, references
    draft.md            # Entry with H1 title + body
```

**Slug generation:**

- Input: "How to approach code review faster"
- Slugify: lowercase → split on spaces → join with hyphens → remove specials
- Result: `how-to-approach-code-review-faster`

**ULID generation:**

- 4 random alphanumeric characters (a-z, 0-9)
- Ensures uniqueness even if slugs collide

**File scaffolds:**

research.md template:

```markdown
# Research: [Your Topic]

## Rough Idea

[Your initial thoughts go here]

## References & Sources

- [Links and citations]

## Observations

[Insights as you explore]
```

draft.md template (when title provided):

```markdown
# Your Title Here

[Your entry body]
```

draft.md template (when title deferred):

```markdown
# [Add your title here]

[Your entry body]
```

## Edge Cases

**Q: What if draft.md already exists when user tries to create new entry?**
A: Don't create duplicate. Say "This entry already exists. Run `/entry abc1` to resume it."

**Q: Can user have multiple entries in progress?**
A: Yes — each gets a unique ULID. `/entry abc1`, `/entry xyz9`, etc.

**Q: What if user edits the files manually while also using the skill?**
A: The skill reads the current state. Manual edits are respected. Next skill invocation will see them.

**Q: Can user change title after draft creation?**
A: Yes — edit the H1 in draft.md manually, or iterate draft with skill. Skill uses current H1 on publish.

**Q: What if publish fails (e.g., no H1)?**
A: Show what's needed, offer to fix it right then. Don't abort — guide them to completion.
