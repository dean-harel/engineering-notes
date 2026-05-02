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
 * Simple YAML frontmatter parser. Handles the `paths:` array syntax used
 * in Claude Code rule files:
 *
 *   ---
 *   paths:
 *     - entries/drafts/**
 *   ---
 *
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
    const trimmed = line.trim();

    // Array item — e.g. `  - entries/drafts/**`
    if (trimmed.startsWith("- ")) {
      const item = trimmed.slice(2).trim();
      if (!Array.isArray(frontmatter["paths"])) {
        frontmatter["paths"] = [];
      }
      (frontmatter["paths"] as string[]).push(item);
      continue;
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();

    if (key === "paths" && value === "") {
      // Multi-line array after `paths:` — ensure array exists
      if (!Array.isArray(frontmatter["paths"])) {
        frontmatter[key] = [];
      }
    } else if (key === "paths" && value.startsWith("[") && value.endsWith("]")) {
      // Inline array: `["foo", "bar"]`
      try {
        frontmatter[key] = JSON.parse(value);
      } catch {
        frontmatter[key] = [value];
      }
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
      ctx.ui.notify(`Loaded rules: ${list}`, "info");
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
