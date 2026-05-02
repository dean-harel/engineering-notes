# `.agents/rules/` Universal Rules Directory — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the `.agents/rules/` universal rules directory with native Claude Code support (via symlink) and Pi support (via global extension with path-scoped auto-injection).

**Architecture:** Move rule files to `.agents/rules/`, replace `.claude/rules/` with a directory symlink so Claude Code discovers them natively. Build a Pi global extension that discovers `.agents/rules/`, parses frontmatter, records file-access paths per turn, and injects a rule catalog + matching full-rule content into the system prompt on `before_agent_start`.

**Tech Stack:** TypeScript (Pi extension), Node.js `fs`/`path`, YAML frontmatter parsing, picomatch for glob matching, shell symlinks.

---

## Task 1: Repo Structure — Create `.agents/rules/` and Symlink `.claude/rules/`

**Files:**
- Create: `.agents/rules/` (new directory)
- Move: `.claude/rules/voice.md` → `.agents/rules/voice.md`
- Delete: `.claude/rules/` (empty directory after move)
- Create: `.claude/rules` (symlink → `../.agents/rules`)

- [ ] **Step 1: Create `.agents/rules/` and move `voice.md`**

```bash
mkdir -p .agents/rules
mv .claude/rules/voice.md .agents/rules/voice.md
```

- [ ] **Step 2: Replace `.claude/rules/` with a symlink**

```bash
rm -rf .claude/rules
ln -s ../.agents/rules .claude/rules
```

- [ ] **Step 3: Verify the symlink works**

```bash
ls -la .claude/rules/
# Expected: symlink pointing to ../.agents/rules, voice.md visible
readlink .claude/rules
# Expected: ../.agents/rules
```

- [ ] **Step 4: Commit the structural change**

```bash
git add .agents/rules/voice.md .claude/rules docs/superpowers/plans/2026-05-02-agents-rules-implementation.md
git commit -m "feat(rules): establish .agents/rules/ universal rules directory

- Move voice.md from .claude/rules/ to .agents/rules/
- Replace .claude/rules/ with symlink to ../.agents/rules/
- Enables Claude Code native discovery + prepares for Pi extension"
```

---

## Task 2: Pi Extension — Package Structure and Dependency Setup

**Files:**
- Create: `~/.pi/agent/extensions/rules-loader/package.json`
- Create: `~/.pi/agent/extensions/rules-loader/index.ts`

The extension uses `picomatch` for glob matching, declared in a local `package.json`.

- [ ] **Step 1: Create the extension directory and package.json**

```bash
mkdir -p ~/.pi/agent/extensions/rules-loader
```

Create `~/.pi/agent/extensions/rules-loader/package.json`:

```json
{
  "name": "rules-loader",
  "version": "1.0.0",
  "dependencies": {
    "picomatch": "^4.0.2"
  },
  "pi": {
    "extensions": ["./index.ts"]
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
cd ~/.pi/agent/extensions/rules-loader && npm install
```

Expected: `node_modules/picomatch/` created. No errors.

---

## Task 3: Pi Extension — Core Implementation

**Files:**
- Create: `~/.pi/agent/extensions/rules-loader/index.ts`

- [ ] **Step 1: Write the full extension**

```typescript
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { isToolCallEventType } from "@mariozechner/pi-coding-agent";
import * as fs from "node:fs";
import * as path from "node:path";
import * as picomatch from "picomatch";

interface RuleFile {
  name: string;
  fullPath: string;
  paths: string[] | null; // null = global rule
  content: string;
}

/**
 * Simple YAML frontmatter parser. Extracts only the `paths:` key.
 * Returns { frontmatter: Record<string, unknown> | null, body: string }
 */
function parseFrontmatter(text: string): {
  frontmatter: Record<string, unknown> | null;
  body: string;
} {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) {
    return { frontmatter: null, body: text };
  }

  const raw = match[1];
  const frontmatter: Record<string, unknown> = {};

  for (const line of raw.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();

    if (key === "paths" && value === "") {
      // Multi-line array after `paths:`
      frontmatter[key] = [];
    } else if (key === "paths" && value.startsWith("[") && value.endsWith("]")) {
      // Inline array: `["foo", "bar"]`
      try {
        frontmatter[key] = JSON.parse(value);
      } catch {
        frontmatter[key] = [value];
      }
    } else if (key.startsWith("- ")) {
      // Array item under `paths:`
      const item = key.slice(2).trim();
      if (!Array.isArray(frontmatter["paths"])) {
        frontmatter["paths"] = [];
      }
      (frontmatter["paths"] as string[]).push(item);
    } else if (key === "paths") {
      frontmatter[key] = [value];
    } else {
      frontmatter[key] = value;
    }
  }

  return {
    frontmatter,
    body: text.slice(match[0].length),
  };
}

/**
 * Recursively find all .md files in a directory.
 */
function findMarkdownFiles(dir: string, basePath: string = ""): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...findMarkdownFiles(path.join(dir, entry.name), relativePath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      results.push(relativePath);
    }
  }
  return results;
}

/**
 * Discover `.agents/rules/` walking up from cwd until found.
 * Order: cwd/.agents/rules/ → parent dirs → ~/.agents/rules/
 */
function discoverRulesDir(cwd: string): string | null {
  let current = path.resolve(cwd);
  const home = process.env.HOME ? path.resolve(process.env.HOME) : "";

  while (true) {
    const candidate = path.join(current, ".agents", "rules");
    if (fs.existsSync(candidate)) {
      return candidate;
    }

    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }

  // Fallback to user-level rules
  if (home) {
    const fallback = path.join(home, ".agents", "rules");
    if (fs.existsSync(fallback)) {
      return fallback;
    }
  }

  return null;
}

export default function rulesLoaderExtension(pi: ExtensionAPI) {
  let discoveredRules: RuleFile[] = [];
  let rulesDir: string | null = null;
  const recordedPaths: Set<string> = new Set();

  // --- Session Start: discover rules ---
  pi.on("session_start", async (_event, ctx) => {
    rulesDir = discoverRulesDir(ctx.cwd);
    discoveredRules = [];

    if (!rulesDir) return;

    const files = findMarkdownFiles(rulesDir);
    for (const relPath of files) {
      const fullPath = path.join(rulesDir, relPath);
      const content = fs.readFileSync(fullPath, "utf8");
      const { frontmatter, body } = parseFrontmatter(content);

      const paths = frontmatter?.paths;
      const pathsArray =
        Array.isArray(paths) && paths.every((p) => typeof p === "string")
          ? (paths as string[])
          : null;

      discoveredRules.push({
        name: relPath,
        fullPath,
        paths: pathsArray,
        content: body,
      });
    }

    if (discoveredRules.length > 0 && ctx.hasUI) {
      const list = discoveredRules
        .map((r) => {
          const scopes = r.paths ? r.paths.join(", ") : "global";
          return `${r.name} (${scopes})`;
        })
        .join("\n  ");
      ctx.ui.notify(
        `Loaded rules: ${list}`,
        "info"
      );
    }
  });

  // --- Tool Call: record file access paths ---
  pi.on("tool_call", async (event) => {
    if (
      isToolCallEventType("read", event) ||
      isToolCallEventType("edit", event) ||
      isToolCallEventType("write", event)
    ) {
      const accessedPath = event.input.path;
      if (typeof accessedPath === "string") {
        recordedPaths.add(accessedPath);
      }
    }
  });

  // --- Before Agent Start: inject catalog + matching rules ---
  pi.on("before_agent_start", async (event) => {
    if (discoveredRules.length === 0) {
      return;
    }

    // Build catalog (always present)
    const catalogLines = discoveredRules.map((r) => {
      const scope = r.paths ? `applies to: ${r.paths.join(", ")}` : "global";
      return `- ${r.name} — ${scope}`;
    });

    let catalog = `\n\n## Project Rules\n\nThe following rules are available in .agents/rules/:\n\n${catalogLines.join(
      "\n"
    )}`;

    // Find matching path-scoped rules
    const matchedRules: RuleFile[] = [];
    for (const rule of discoveredRules) {
      // Global rules are NOT auto-injected (catalog only)
      if (!rule.paths) continue;

      for (const accessedPath of recordedPaths) {
        for (const pattern of rule.paths) {
          if (picomatch.isMatch(accessedPath, pattern)) {
            matchedRules.push(rule);
            break;
          }
        }
        if (matchedRules.includes(rule)) break;
      }
    }

    // Append full content of matched rules
    if (matchedRules.length > 0) {
      catalog += "\n\n---\n\n";
      for (const rule of matchedRules) {
        catalog += `<!-- Rule: ${rule.name} -->\n${rule.content.trim()}\n\n`;
      }
    }

    return {
      systemPrompt: event.systemPrompt + catalog,
    };
  });

  // --- Turn End: clear recorded paths ---
  pi.on("turn_end", async () => {
    recordedPaths.clear();
  });
}
```

- [ ] **Step 2: Verify extension loads without errors**

```bash
cd ~/Developer/engineering-notes
pi -e ~/.pi/agent/extensions/rules-loader/index.ts -p "test"
```

Expected: Pi starts, extension loads, no TypeScript errors. The `-p` print mode may not show notifications but should not crash.

Alternative inline test:
```bash
node -e "require('jiti')('~/.pi/agent/extensions/rules-loader/index.ts')"
```

Actually, jiti may not resolve the import path. Better to test by running `pi` in the project and checking if the extension appears in the startup header (`[Extensions] rules-loader/index.ts`).

- [ ] **Step 3: Verify rule discovery notification**

In a Pi session inside `~/Developer/engineering-notes`, check startup:

```
[Extensions] rules-loader/index.ts
Loaded rules: voice.md (entries/drafts/**, entries/*/body.md, entries/wip/**/draft.md)
```

The notification should appear in the TUI message area.

- [ ] **Step 4: Verify path-scoped injection**

Inside the Pi session, trigger a file read that matches a rule:

```
read entries/drafts/some-draft.md
```

Then type a follow-up prompt. On the next `before_agent_start`, the system prompt should include:
1. The catalog section
2. The full content of `voice.md` after `---`

Verify by checking tool behavior: if the LLM now references voice/tone guidance, injection is working.

- [ ] **Step 5: Verify one-shot behavior**

On a subsequent turn where NO file access matches `voice.md`'s paths, confirm the full rule content is NOT re-injected (only catalog remains). The catalog is always present; matched rules content is one-shot per turn.

- [ ] **Step 6: Commit the extension**

The extension lives in `~/.pi/agent/extensions/` — this is **outside the repo** (global install). Document it in the repo so it's tracked as part of this feature.

Create `.pi/extensions/rules-loader/` as a **project-local copy** of the extension so the repo contains the source:

```bash
mkdir -p .pi/extensions/rules-loader
cp ~/.pi/agent/extensions/rules-loader/package.json .pi/extensions/rules-loader/package.json
cp ~/.pi/agent/extensions/rules-loader/index.ts .pi/extensions/rules-loader/index.ts
```

Commit:
```bash
git add .pi/extensions/rules-loader/
git commit -m "feat(rules): add Pi rules-loader extension

- Discovers .agents/rules/ walking up from cwd
- Parses frontmatter for path-scoped rules
- Records read/edit/write paths per turn
- Injects catalog + matching rule content into system prompt"
```

---

## Task 4: Verify End-to-End Integration

- [ ] **Step 1: Claude Code compatibility**

Open the project in Claude Code. Access a file matching `voice.md` paths:

```
read entries/drafts/README.md
```

Expected: Claude Code auto-loads `voice.md` (via the symlink `.claude/rules/` → `.agents/rules/`). The rule content should appear in context.

- [ ] **Step 2: Pi auto-injection**

In a Pi session inside the project:

```
read entries/drafts/README.md
```

Expected: On the NEXT turn, the system prompt includes the catalog + full `voice.md` content. The LLM should reference voice rules.

- [ ] **Step 3: Global rule behavior**

Create a test global rule in `.agents/rules/test-global.md` (no frontmatter):

```markdown
# Test Global

Always respond with "ACK".
```

In Pi, verify:
- The catalog lists `test-global.md — global`
- The full content is NEVER auto-injected (catalog only)

Clean up afterward:
```bash
rm .agents/rules/test-global.md
```

- [ ] **Step 4: Edge case — no matching paths**

In Pi, read a file that does NOT match any rule path (e.g., `.gitignore`).

Expected: Catalog is present. No rule content is injected.

- [ ] **Step 5: Edge case — no rules directory**

Launch Pi in a directory without `.agents/rules/`:

```bash
cd /tmp && pi
```

Expected: Extension loads silently (no rules discovered, no notification, no catalog injection).

---

## Task 5: Documentation

- [ ] **Step 1: Add a brief README note**

If `.agents/README.md` exists, add:

```markdown
## `.agents/rules/`

Universal rules directory compatible with Claude Code (via `.claude/rules/` symlink)
and Pi (via `rules-loader` extension).

### Format

Each `.md` file is a rule. Optional YAML frontmatter with `paths:` for scoping:

```yaml
---
paths:
  - src/**/*.ts
---
```

- `paths:` present → path-scoped, auto-applied when accessed files match
- `paths:` absent → global, catalog-only (not auto-injected)
```

If no `.agents/README.md` exists, skip this step or create a minimal one.

- [ ] **Step 2: Update repo root documentation**

Add a brief mention in the main `README.md` or `CLAUDE.md` about `.agents/rules/`:

```markdown
### Project Rules

Rules live in `.agents/rules/` and are consumed by:
- **Claude Code** — natively via `.claude/rules/` symlink
- **Pi** — via the `rules-loader` extension (auto-injected when file paths match)
```

- [ ] **Step 3: Commit docs**

```bash
git add -A
git commit -m "docs: document .agents/rules/ universal rules directory"
```

---

## Self-Review

### 1. Spec Coverage

| Spec Requirement | Task/Step |
|---|---|
| Create `.agents/rules/` directory | Task 1, Step 1 |
| Move `voice.md` to `.agents/rules/` | Task 1, Step 1 |
| Replace `.claude/rules/` with symlink | Task 1, Step 2 |
| Claude Code native discovery | Task 1 (symlink) + Task 4, Step 1 |
| Pi extension scans `.agents/rules/` | Task 3, `discoverRulesDir()` |
| Session-start notification | Task 3, `session_start` handler |
| Record read/edit/write paths | Task 3, `tool_call` handler |
| `before_agent_start` injects catalog | Task 3, `before_agent_start` handler |
| `before_agent_start` injects matching rules | Task 3, `before_agent_start` handler |
| `turn_end` clears recorded paths | Task 3, `turn_end` handler |
| One-shot injection (no sticky retention) | Task 3, `turn_end` clears set + spec comment |
| Global rules: catalog only | Task 3, skips rules without `paths:` |
| Path-scoped rules: full content when matched | Task 3, `picomatch.isMatch` loop |
| Walk up from cwd for discovery | Task 3, `discoverRulesDir()` |
| Fallback to `~/.agents/rules/` | Task 3, `discoverRulesDir()` |
| Frontmatter parsing | Task 3, `parseFrontmatter()` |

### 2. Placeholder Scan

- No "TBD", "TODO", or "implement later"
- No vague "handle edge cases" steps — each edge case has a concrete verification step
- No "similar to Task N" references
- Code blocks contain complete, runnable code

### 3. Type Consistency

- `RuleFile` interface used consistently
- `paths` is `string[] | null` — null for global, string[] for scoped
- `picomatch.isMatch` signature matches usage
- `isToolCallEventType` used correctly with built-in tool names

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-05-02-agents-rules-implementation.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
