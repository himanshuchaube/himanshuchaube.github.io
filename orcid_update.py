import json
import requests

ORCID_ID = "0000-0002-5288-7219"

# ORCID public API
url = f"https://pub.orcid.org/v3.0/{ORCID_ID}/works"

headers = {
    "Accept": "application/json"
}

data = requests.get(url, headers=headers).json()

publications = []

for group in data.get("group", []):

    try:
        summary = group["work-summary"][0]

        title = summary.get("title", {}) \
                       .get("title", {}) \
                       .get("value", "")

        year = summary.get("publication-date", {}) \
                      .get("year", {}) \
                      .get("value", "")

        doi = None

        for ext in summary.get("external-ids", {}) \
                          .get("external-id", []):

            if ext.get("external-id-type", "").lower() == "doi":
                doi = ext.get("external-id-value")
                break

        if not doi:
            continue

        # Crossref lookup
        crossref_url = f"https://api.crossref.org/works/{doi}"

        crossref = requests.get(crossref_url).json()

        item = crossref["message"]

        journal = ""

        if item.get("container-title"):
            journal = item["container-title"][0]

        volume = item.get("volume", "")
        issue = item.get("issue", "")
        pages = item.get("page", "")

        authors = []

        for a in item.get("author", []):

            given = a.get("given", "")
            family = a.get("family", "")

            authors.append(
                f"{given} {family}".strip()
            )

        publications.append({

            "title": title,

            "authors": ", ".join(authors),

            "year": year,

            "journal": journal,

            "volume": volume,

            "issue": issue,

            "pages": pages,

            "doi": f"https://doi.org/{doi}",

            "apa":
                f"{', '.join(authors)} "
                f"({year}). "
                f"{title}. "
                f"{journal}."

        })

    except Exception as e:

        print("Error:", e)

# latest first

publications.sort(
    key=lambda x: int(x["year"])
    if str(x["year"]).isdigit()
    else 0,
    reverse=True
)

with open(
    "json_data/publications.json",
    "w",
    encoding="utf-8"
) as f:

    json.dump(
        publications,
        f,
        indent=4,
        ensure_ascii=False
    )

if publications:

    with open(
        "json_data/latest_publication.json",
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            publications[0],
            f,
            indent=4,
            ensure_ascii=False
        )

print(
    f"Saved {len(publications)} publications"
)
