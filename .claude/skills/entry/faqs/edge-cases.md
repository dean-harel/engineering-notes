# Edge Cases & Frequently Asked Questions

## Original Edge Cases

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

**Q: What about the project's voice guide — should the skill enforce it?**  
A: The skill guides toward the voice guide (see `.claude/rules/voice.md`). During content work, if something doesn't match the voice, mention it. Don't block—guide.

## New Edge Cases

### Publish Without H1 Title

**Q: What happens if the user tries to publish but draft.md doesn't have an H1 title?**

A: 
1. Show the current draft content
2. Identify the missing H1
3. Prompt: "What's your entry title?"
4. User provides title
5. Update draft.md with H1
6. Proceed with publish validation

**Example:**
```
You: "publish"
Skill: "I don't see an H1 title in your draft. What should your entry be called?"
You: "Debugging with AI"
Skill: [Updates draft.md with # Debugging with AI]
Skill: [Proceeds with publish...]
```

**Recovery:** Immediate. No abort needed. Title capture happens mid-flow.

### Manual File Edits During Skill Usage

**Q: If I edit draft.md in my text editor while using the skill, does the skill respect my changes?**

A:
1. Skill reads file state at each invocation
2. User's manual edits are always respected
3. Skill detects changes and acknowledges them
4. Workflow continues with updated content

**Example:**
```
You: "work on draft"
[You simultaneously edit draft.md in VS Code]
Skill: [Reads updated draft.md on next invocation]
Skill: "I see you've added content. What next?"
```

**Recovery:** Automatic. Skill always reads fresh state.

### Multiple Entries in Progress

**Q: Can I have 5+ entries in different states at the same time?**

A:
1. Each entry gets unique ULID (abc1, xyz9, etc.)
2. Each lives in separate folder: `entries/wip/abc1-slug/`, `entries/wip/xyz9-slug/`, etc.
3. Resume with `/entry <ulid>`
4. No conflicts

**Example:**
```
/entry "First entry idea"
→ Creates abc1-first-entry-idea/

[Later]
/entry "Second entry idea"
→ Creates xyz9-second-entry-idea/

[Resume first]
/entry abc1
→ Shows research and draft state for abc1
```

**Best practice:** Use `/entry` command without arguments to list in-progress entries if that feature is implemented. For now, remember ULIDs.

### Existing Draft When Moving to Draft Stage

**Q: What if draft.md already exists and user says "move to draft"?**

A:
1. Detect existing draft.md
2. Show current draft content
3. Prompt: "Draft already exists. Would you like to (a) continue editing it, (b) replace it with a new draft, or (c) keep both?"
4. Route to appropriate action

**Example:**
```
You: "move to draft"
Skill: "I see draft.md already exists. [Shows current content]"
Skill: "What would you like to do?"
  a) Continue editing this draft
  b) Start fresh draft
  c) Keep this one, rename to draft-backup.md
```

**Recovery:** User chooses path. No destructive action without confirmation.

### Empty Research When Folding

**Q: What if I try to fold research into draft but research.md is empty or has no useful content?**

A:
1. Check research.md for content beyond template
2. If empty/minimal: "No research content to fold yet. Would you like to (a) add research first, or (b) continue editing draft?"
3. Provide path to both

**Example:**
```
You: "fold research"
Skill: "Your research section only has the template. Add more research first, or continue working on draft?"
You: "I'll add more research"
Skill: "What would you like to explore?"
```

**Recovery:** Guide to research phase, don't try to fold empty content.

### Research Contains Manual Edits

**Q: I manually added notes to research.md outside the template. Will the skill mess them up?**

A:
1. Skill always respects manual structure
2. When folding research, skill reads current state (manual edits included)
3. User guides which parts to integrate
4. Manual notes are preserved

**Recovery:** Automatic. Skill treats research.md as living document, respects all content.

### Publish When No Draft Content

**Q: What if user tries to publish but draft.md only has the H1 title and no body?**

A:
1. Show draft preview
2. Identify empty body
3. Prompt: "Your draft only has a title. Add some body content first."
4. Offer to work on draft before publishing

**Example:**
```
You: "publish"
Skill: "Your draft is just a title—no body content yet. Would you like to add content first?"
You: "Yes, let me work on it"
Skill: "What would you like to add?"
```

**Recovery:** Route to draft editing phase before publish.

## Summary: Error Recovery Pattern

All errors follow the same recovery pattern:

1. **Detect the issue** — file state, missing content, ambiguity
2. **Show the problem clearly** — "No H1 title found" not "publish failed"
3. **Offer immediate fix** — "What should your title be?" not "Try again later"
4. **Continue the workflow** — No abort, no restart needed

This keeps the user in flow and prevents frustration from errors.
