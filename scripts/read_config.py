#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["pyyaml>=6.0"]
# ///
"""Read values from entry.yml.

Usage:
    uv run scripts/read_config.py author
    uv run scripts/read_config.py voice
    uv run scripts/read_config.py destinations   # prints enabled destination names, one per line
"""

import sys
import yaml

data = yaml.safe_load(open("entry.yml"))
key = sys.argv[1]

if key == "destinations":
    for name, enabled in data.get("destinations", {}).items():
        if enabled:
            print(name)
else:
    print(data[key])
