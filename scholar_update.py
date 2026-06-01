import os
import json
import requests

SCHOLAR_ID = "n0ggSaUAAAAJ"
API_KEY = os.getenv("SERPAPI_KEY")

if not API_KEY:
    raise ValueError("SERPAPI_KEY secret not found")

os.makedirs("json_data", exist_ok=True)

url = "https://serpapi.com/search.json"

params = {
    "engine": "google_scholar_author",
    "author_id": SCHOLAR_ID,
    "api_key": API_KEY
}

data = requests.get(url, params=params).json()
print(json.dumps(data, indent=2))

if "error" in data:
    raise Exception(data["error"])

print("SerpAPI connected successfully")

# ------------------
# Scholar Stats
# ------------------

author = data.get("author", {})
cited_by = data.get("cited_by", {})

table = cited_by.get("table", [])

stats = {
    "name": author.get("name", ""),
    "affiliations": author.get("affiliations", ""),
    "citations": table[0]["citations"]["all"] if len(table) > 0 else 0,
    "h_index": table[1]["h_index"]["all"] if len(table) > 1 else 0,
    "i10_index": table[2]["i10_index"]["all"] if len(table) > 2 else 0
}

with open("json_data/scholar_stats.json", "w", encoding="utf-8") as f:
    json.dump(stats, f, indent=4)

# ------------------
# Publications
# ------------------

publications = []

for article in data.get("articles", []):

    pub = {
        "title": article.get("title", ""),
        "year": article.get("year", ""),
        "citations": article.get("cited_by", {}).get("value", 0),
        "authors": article.get("authors", ""),
        "publication": article.get("publication", "")
    }

    pub["apa"] = (
        f"{pub['authors']} "
        f"({pub['year']}). "
        f"{pub['title']}. "
        f"{pub['publication']}."
    )

    publications.append(pub)

# latest paper first

publications.sort(
    key=lambda x: int(x["year"])
    if str(x["year"]).isdigit()
    else 0,
    reverse=True
)

with open("json_data/publications.json", "w", encoding="utf-8") as f:
    json.dump(publications, f, indent=4)

# ------------------
# Latest Publication
# ------------------

if publications:
    with open(
        "json_data/latest_publication.json",
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            publications[0],
            f,
            indent=4
        )

# ------------------
# Coauthors
# ------------------

coauthors = set()

for p in publications:

    authors = p["authors"]

    for a in authors.split(","):

        a = a.strip()

        if a and "Himanshu" not in a:
            coauthors.add(a)

with open(
    "json_data/coauthors.json",
    "w",
    encoding="utf-8"
) as f:

    json.dump(
        sorted(list(coauthors)),
        f,
        indent=4
    )

print("All scholar files generated successfully")
