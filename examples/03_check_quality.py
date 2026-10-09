"""Checks the shared database must pass before anyone builds on it.

Module 7. Each check prints PASS, WARN or FAIL with a count you can look up.
The script exits non-zero on any FAIL, so it can gate a release.

    python 03_check_quality.py
"""

import sqlite3
import sys
from pathlib import Path

DB = Path(__file__).parent / "data" / "ipeds.sqlite"

failures = 0


def check(label: str, bad: int, level: str = "FAIL") -> None:
    global failures
    status = "PASS" if bad == 0 else level
    if status == "FAIL":
        failures += 1
    print(f"{status:<5} {label}: {bad:,}")


def one(con: sqlite3.Connection, sql: str) -> int:
    return con.execute(sql).fetchone()[0]


def main() -> None:
    con = sqlite3.connect(DB)

    # 1. Every load produced rows.
    check("raw tables that loaded zero rows",
          one(con, "SELECT COUNT(*) FROM load_log WHERE row_count = 0"))

    # 2. One row per institution per year.
    check("duplicate (unitid, file_year) in institution",
          one(con, """SELECT COUNT(*) FROM (
                        SELECT unitid, file_year FROM institution
                        GROUP BY 1, 2 HAVING COUNT(*) > 1)"""))

    # 3. Every completion belongs to an institution we know about that year.
    check("completions rows with no matching institution",
          one(con, """SELECT COUNT(*) FROM completions c
                      LEFT JOIN institution i
                        ON i.unitid = c.unitid AND i.file_year = c.file_year
                      WHERE i.unitid IS NULL"""), level="WARN")

    # 4. Award counts are never negative.
    check("negative award counts",
          one(con, "SELECT COUNT(*) FROM completions WHERE awards_total < 0"))

    # 5. Detail rows add up to the grand-total row (CIP '99').
    #    A WARN here is a question for the dictionary, not a bug to patch.
    check("institution-year-levels where first-major detail != CIP 99 total",
          one(con, """WITH detail AS (
                        SELECT unitid, file_year, award_level, SUM(awards_total) AS s
                        FROM completions
                        WHERE major_number = 1 AND cipcode <> '99'
                          AND length(cipcode) = 7          -- six-digit CIP, 'NN.NNNN'
                        GROUP BY 1, 2, 3),
                      total AS (
                        SELECT unitid, file_year, award_level, awards_total AS t
                        FROM completions
                        WHERE major_number = 1 AND cipcode = '99')
                      SELECT COUNT(*) FROM detail d
                      JOIN total t USING (unitid, file_year, award_level)
                      WHERE d.s <> t.t"""), level="WARN")

    # 6. Which files came from a revised (final) release, and which did not.
    print("\nrelease status by file:")
    for name, release in con.execute("SELECT table_name, release FROM load_log ORDER BY 1"):
        print(f"      {name:<12} {release}")

    con.close()
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
