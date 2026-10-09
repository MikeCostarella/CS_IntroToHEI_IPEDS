"""Put a figure from Ohio's HEI reports next to the matching IPEDS figure.

Module 8. The goal is not to make the numbers agree. It is to explain,
in writing, why they do not.

    python 05_reconcile.py

Reads data/hei_figures.csv, which you fill in by hand from the public HEI
reports (copy data/hei_figures.example.csv to start). Writes
data/reconciliation.csv with a difference column and an empty
"explanation" column for you to complete.
"""

import csv
import sqlite3
from pathlib import Path

HERE = Path(__file__).parent
DB = HERE / "data" / "ipeds.sqlite"
HEI = HERE / "data" / "hei_figures.csv"
OUT = HERE / "data" / "reconciliation.csv"

# Each measure names the IPEDS query that should correspond to it. Whether
# it really does correspond is the question the lab asks you to answer.
IPEDS_QUERIES = {
    "bachelors_awarded": """
        SELECT SUM(awards_total) FROM completions
        WHERE unitid = :unitid AND file_year = :year
          AND cipcode = '99' AND major_number = 1 AND award_level = 5""",
    "computing_bachelors_awarded": """
        SELECT SUM(awards_total) FROM completions
        WHERE unitid = :unitid AND file_year = :year
          AND cipcode LIKE '11.%' AND major_number = 1 AND award_level = 5""",
}


def main() -> None:
    if not HEI.exists():
        raise SystemExit("No data/hei_figures.csv. Copy hei_figures.example.csv and fill it in (Lab 3).")
    con = sqlite3.connect(DB)
    out_rows = []
    with HEI.open(newline="") as f:
        for row in csv.DictReader(f):
            sql = IPEDS_QUERIES.get(row["measure"])
            if sql is None:
                print(f"no IPEDS query for measure {row['measure']!r}; add one")
                continue
            ipeds = con.execute(
                sql, {"unitid": int(row["unitid"]), "year": int(row["ipeds_file_year"])}
            ).fetchone()[0]
            hei = int(row["hei_value"]) if row["hei_value"] else None
            diff = None if hei is None or ipeds is None else hei - ipeds
            out_rows.append({**row, "ipeds_value": ipeds, "difference": diff, "explanation": ""})

    if not out_rows:
        raise SystemExit("No rows to reconcile.")
    with OUT.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(out_rows[0].keys()))
        w.writeheader()
        w.writerows(out_rows)

    for r in out_rows:
        print(f"{r['measure']:<30} HEI {r['hei_value']:>6}  IPEDS {r['ipeds_value']!s:>6}  diff {r['difference']}")
    print(f"\nWrote {OUT}. Now fill in the explanation column.")
    con.close()


if __name__ == "__main__":
    main()
