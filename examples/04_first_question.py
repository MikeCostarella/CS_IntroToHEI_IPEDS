"""The first-hour question: how many computing degrees do YSU and nearby
public universities award, and is that number moving?

Module 10. This is the file a student opens first in every AI course.

    python 04_first_question.py
"""

import sqlite3
from pathlib import Path

DB = Path(__file__).parent / "data" / "ipeds.sqlite"

# Name patterns, not UNITIDs, so the match is visible. Print what matched and
# check it -- "Kent State" alone matches several campuses.
INSTITUTIONS = [
    "Youngstown State University",
    "University of Akron Main Campus",
    "Kent State University at Kent",
    "Cleveland State University",
]

BACHELORS = 5  # AWLEVEL code -- confirm it in the C_A dictionary for your year


def main() -> None:
    con = sqlite3.connect(DB)
    print("matched institutions:")
    ids = []
    for pattern in INSTITUTIONS:
        rows = con.execute(
            "SELECT DISTINCT unitid, name FROM institution WHERE name LIKE ?",
            (pattern + "%",),
        ).fetchall()
        for unitid, name in rows:
            print(f"  {unitid}  {name}")
            ids.append(unitid)

    marks = ",".join("?" * len(ids))
    rows = con.execute(
        f"""SELECT i.name, c.file_year, SUM(c.awards_total)
            FROM completions c
            JOIN institution i ON i.unitid = c.unitid AND i.file_year = c.file_year
            WHERE c.unitid IN ({marks})
              AND c.cipcode LIKE '11.%'          -- CIP family 11: computer and information sciences
              AND c.major_number = 1
              AND c.award_level = ?
            GROUP BY 1, 2
            ORDER BY 1, 2""",
        (*ids, BACHELORS),
    ).fetchall()

    print("\nbachelor's awards in CIP 11, first major:")
    current = None
    for name, year, total in rows:
        if name != current:
            print(f"\n  {name}")
            current = name
        print(f"    file year {year}: {total:>5}")
    con.close()


if __name__ == "__main__":
    main()
