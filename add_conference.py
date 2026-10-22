"""Adds one conference entry to json_data/conferences.json.
Values come from environment variables set by the GitHub workflow."""
import json
import os

PATH = "json_data/conferences.json"

def env(name):
    return os.environ.get(name, "").strip()

year = env("CONF_YEAR")
if not year.isdigit():
    raise SystemExit("Year must be a number, e.g. 2026")

entry = {
    "year": int(year),
    "date": env("CONF_DATE"),
    "authors": env("CONF_AUTHORS"),
    "title": env("CONF_TITLE"),
    "event": env("CONF_EVENT"),
    "venue": env("CONF_VENUE"),
    "type": env("CONF_TYPE") or "Poster",
}

for field in ("authors", "title", "event", "venue"):
    if not entry[field]:
        raise SystemExit(f"'{field}' is required")

with open(PATH, encoding="utf-8") as f:
    data = json.load(f)

# skip duplicates (same title + event + year)
for d in data:
    if (d.get("title", "").lower() == entry["title"].lower()
            and d.get("event", "").lower() == entry["event"].lower()
            and d.get("year") == entry["year"]):
        raise SystemExit("This conference entry already exists. Nothing added.")

# insert at the start of its year group (newest year first)
pos = len(data)
for i, d in enumerate(data):
    if int(d.get("year", 0)) <= entry["year"]:
        pos = i
        break
data.insert(pos, entry)

with open(PATH, "w", encoding="utf-8") as f:
    f.write("[\n")
    f.write(",\n".join("  " + json.dumps(d, ensure_ascii=False) for d in data))
    f.write("\n]\n")

print("Added:", entry["title"])
