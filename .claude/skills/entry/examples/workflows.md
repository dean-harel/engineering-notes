# Example Workflows

These workflows show two common patterns for using the entry skill from initial idea to publication.

## Workflow 1: Quick Idea → Draft → Publish

This workflow is for when you have a clear idea and want to move quickly from concept to publication.

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

**Duration:** 5-10 minutes  
**Interaction cycles:** 6-8  
**Best for:** Clear ideas with existing knowledge, urgent publication

## Workflow 2: Deep Research → Draft with Folding

This workflow is for when you want to explore a topic thoroughly before drafting, then integrate research findings into the final piece.

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

**Duration:** 20-40 minutes  
**Interaction cycles:** 10-14  
**Best for:** Exploratory research, integrating multiple sources, evolving ideas

## Common Variations

**Resume an existing entry:**
```
/entry abc1
Skill: [Shows current state and preview]
You: [Choose action: add research, work on draft, fold research, publish]
```

**Multiple entries in progress:**
```
/entry idea1
/entry idea2
/entry idea3
```

Each entry gets its own ULID folder in `entries/wip/`, so you can work on multiple topics simultaneously.

## When to Use Which Pattern

- **Quick Idea pattern**: You know what you want to say and just need to write it down
- **Deep Research pattern**: You're exploring a topic and want to synthesize findings into the draft
- **Resume pattern**: You started an entry and are coming back to it later
- **Multiple entries**: You have several ideas in different stages—use ULIDs to track them separately
