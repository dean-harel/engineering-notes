# Design: `.agents/rules/` — Universal Rules Directory

**Date:** 2026-05-02
**Status:** Draft for review

## Problem Statement

Each AI coding harness (Claude Code, Pi, Codex, Cursor, etc.) loads project-level context differently. Claude Code supports path-scoped progressive disclosure via `.claude/rules/*.md` with `paths:` frontmatter. No other harness has an equivalent. This forces duplication or leaving harnesses unsupported.

We want a single source of truth for project rules that:
- Works natively with Claude Code's path-scoped progressive disclosure
- Works with Pi via its extension system (as close to Claude's auto-disclosure as possible)
- Does not duplicate rule content across harness-specific directories

## Decision: Park `AGENTS.md` / `CLAUDE.md` as a separate concern

This design focuses on **rules** (path-scoped or global conventions). The existing `CLAUDE.md` at the repo root remains untouched; its fate is a separate discussion.

## Directory Layout

Currently there is only one rule file:

```
.agents/                          # Agent Skills standard root (already exists)
├── skills/
│   └── entry/
│       └── SKILL.md              # existing skill for blog entry workflow
└── rules/                        # NEW — universal rules directory
    └── voice.md                  # path-scoped (Claude native)
```

## Rule Format

Each file is Markdown with optional YAML frontmatter. The format is compatible with Claude Code's `.claude/rules/` files.

### Path-scoped rule (current: `voice.md`)

```markdown
---
paths:
  - entries/drafts/**
  - entries/*/body.md
  - entries/wip/**/draft.md
---

# Voice Rules

Semi-formal with conversational swagger...
```

### Future: global rule (not yet present)

```markdown
# Conventions

Use sentence case for all commit messages...
```

### Frontmatter semantics

| Frontmatter | Meaning |
|-------------|---------|
| `paths:` present | Path-scoped. Auto-applied when accessed files match the glob patterns. |
| `paths:` absent | Global. Always in context. |
| No frontmatter at all | Treated as global. |

**Note:** The original Claude Code `paths:` syntax is the only scoping mechanism. There is no `always: true` flag — the absence of `paths:` already means "always apply."

## Harness Mapping

### Claude Code

```
.claude/rules/  → symlink to .agents/rules/   (directory symlink, matches skills/ pattern)
```

- Claude Code resolves the symlink and discovers rule files natively
- Path-scoped rules are auto-loaded when you edit files matching the `paths:` glob
- Zero duplication; no format changes needed

### Pi

`~/.pi/agent/extensions/rules-loader.ts` → globally installed Pi extension.

Behavior per lifecycle event:

| Event | Action |
|-------|--------|
| `session_start` | Scans `.agents/rules/` walking up from cwd. Notifies user with the count/list of discovered rules. |
| `tool_call` (read/edit/write) | Records the `path` being accessed in a turn-local set. |
| `before_agent_start` | (1) Injects a lightweight **catalog** into the system prompt (always).<br>(2) If file paths were recorded this turn, matches them against each rule's `paths:` glob and appends the **full content** of matching path-scoped rules. |
| `turn_end` | Clears the recorded paths. No state persists across turns. |

**Scope:** One-shot only. Once injected, path-scoped rules are not automatically retained for subsequent turns. This is the simplest starting point; sticky multi-turn retention can be added later if needed.

### Codex / Cursor / Windsurf / Aider / Cline

No direct support. These harnesses use global-eager context (`AGENTS.md`, `.cursor/rules/`, `.clinerules`, etc.) and do not have path-scoped progressive disclosure. Consequently: this directory is invisible to them. Global conventions that must reach all harnesses should live in `AGENTS.md` (separate concern, parked).

## Pi Extension Details

### Session-start notification

The extension calls `ctx.ui.notify()` on `session_start` to show which rules were loaded:

```
Loaded rules: voice.md (entries/drafts/**, entries/*/body.md, entries/wip/**/draft.md)
```

This appears as a transient message in the TUI's message area, *separate* from Pi's built-in startup header. Pi's own header already auto-lists loaded extensions by filename (e.g., `[Extensions] rules-loader.ts`); the extension can't inject custom text into that line because the header is rendered before `session_start` fires.

### System prompt catalog

The catalog is injected into **every** system prompt:

```
## Project Rules

The following rules are available in .agents/rules/:

- voice.md — applies to: entries/drafts/**, entries/*/body.md, entries/wip/**/draft.md
```

**Why a catalog?**

1. **Metadata index** — Always in context. The LLM knows what rules exist and what scopes they cover even when the full content is not injected.
2. **Injection anchor** — The extension appends full content of active rules directly after the catalog section, creating a predictable structure.
3. **Fallback transparency** — If auto-injection misses a match (glob edge case, uninstrumented tool), the LLM can still `read` the rule explicitly because it knows the filename.

### One-shot auto-injection flow

1. **Turn 1, step "read `entries/drafts/draft.md`"**: The `tool_call` handler records `entries/drafts/draft.md`.
2. **Turn 1 ends**: `turn_end` fires. The set of recorded paths is: `{entries/drafts/draft.md}`.
3. **Before Turn 2 LLM call**: `before_agent_start` matches `entries/drafts/draft.md` against `voice.md`'s `paths:`. It's a match.
4. **Turn 2 system prompt** now includes the full content of `voice.md` after the catalog section.
5. **Turn 2, no file access matches** `voice.md`: The next `before_agent_start` does not re-inject `voice.md`.

### Global extension: discovery strategy

Since the extension is global (`~/.pi/agent/extensions/`), it must discover `.agents/rules/` local to the current project. Scans in this order until found:

1. Look in `ctx.cwd/.agents/rules/`
2. Walk up parent directories (stopping at filesystem root or git repo root)
3. Fall back to `~/.agents/rules/` (user-level personal rules)

This mirrors how Pi discovers project skills and other local resources.

### Glob matching

Use picomatch or equivalent for glob matching. The `paths:` patterns in `.claude/rules/` follow picomatch-compatible glob syntax.

## Repo Changes

| Step | Action |
|------|--------|
| 1 | Create `.agents/rules/` directory |
| 2 | Move `.claude/rules/voice.md` → `.agents/rules/voice.md` |
| 3 | Replace `.claude/rules/` with a **symlink** to `.agents/rules/` (directory symlink, same pattern as `.claude/skills/`) |
| 4 | Create `~/.pi/agent/extensions/rules-loader.ts` extension (global) |

## Out of Scope (Future)

- Sticky / multi-turn rule retention: rules that stay active once triggered until you leave the directory.
- Codex support: would require either (a) Codex adding path-scoped context, or (b) a tool that compiles `.agents/rules/` into `AGENTS.md` flat text.
- `AGENTS.md` / `CLAUDE.md` migration: separate decision, not covered here.
- Cursor / Windsurf / Aider / Cline support: would require writing a flat-rules compiler to their respective global config files.
