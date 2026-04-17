#!/usr/bin/env python3
"""Generate an x-article.html artifact for a given entry directory.

Usage:
    python3 scripts/generate_x_article.py --entry-dir entries/001-dude-wheres-my-team

The script reads body.md and the title from index.md frontmatter, converts
markdown to HTML, appends an attribution footer, and writes x-article.html
to the entry directory.
"""

import argparse
import re
import sys
from pathlib import Path

import markdown


BASE_URL = "https://dean-harel.github.io/engineering-notes"


def read_title(index_path: Path) -> str:
    text = index_path.read_text()
    match = re.search(r'^title:\s*["\']?(.+?)["\']?\s*$', text, re.MULTILINE)
    if not match:
        sys.exit(f"Could not extract title from {index_path}")
    return match.group(1)


def convert_body(body_path: Path) -> str:
    md = markdown.Markdown(extensions=["extra"])
    html = md.convert(body_path.read_text())
    return re.sub(r'<hr\s*/?>', '<p>· · ·</p>', html)


def build_article(title: str, body_html: str, entry_url: str) -> str:
    attribution = (
        f'<p><em>Originally published at '
        f'<a href="{entry_url}">Engineering Notes</a>.</em></p>'
    )
    return f"""<h1>{title}</h1>

{body_html}

<p>· · ·</p>

{attribution}
"""


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--entry-dir", required=True, help="Path to entry directory")
    args = parser.parse_args()

    entry_dir = Path(args.entry_dir)
    body_path = entry_dir / "body.md"
    index_path = entry_dir / "index.md"

    for p in (body_path, index_path):
        if not p.exists():
            sys.exit(f"Missing required file: {p}")

    title = read_title(index_path)
    body_html = convert_body(body_path)
    entry_url = f"{BASE_URL}/entries/{entry_dir.name}/"
    html = build_article(title, body_html, entry_url)

    out_path = entry_dir / "x-article.html"
    out_path.write_text(html)
    print(f"X Articles: `{out_path}`")


if __name__ == "__main__":
    main()
