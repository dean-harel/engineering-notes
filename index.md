---
layout: home
title: Home
---

# Engineering Notes

## Latest Entries

{% assign sorted_entries = site.pages | where_exp: "page", "page.path contains 'entries/'" | where_exp: "page", "page.name == 'index.md'" | sort: "path" | reverse %}

{% for entry in sorted_entries %}
{% if entry.name == "index.md" and entry.path contains "entries/" %}
{% assign parts = entry.path | split: "/" %}
{% if parts.size == 3 %}

- [{{ entry.title | default: entry.name }}]({{ site.baseurl }}{{ entry.url }}) — _{{ entry.date | date: "%b %-d, %Y" }} · {{ entry.reading_time | default: "~3 min" }}_
  {% endif %}
  {% endif %}
  {% endfor %}
