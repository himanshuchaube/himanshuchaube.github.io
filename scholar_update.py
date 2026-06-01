from scholarly import scholarly
import json

SCHOLAR_ID = "n0ggSaUAAAAJ"

author = scholarly.search_author_id(SCHOLAR_ID)

author = scholarly.fill(author)

stats = {
"citations": author["citedby"],
"h_index": author["hindex"],
"i10_index": author["i10index"]
}

with open("json_data/scholar_stats.json",
"w",
encoding="utf-8") as f:

json.dump(
    stats,
    f,
    indent=4
)

print("Scholar stats updated")
