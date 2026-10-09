"""Build data/ipeds.sqlite from the zips in data/raw/.

Module 5. Two layers:

  raw      one table per IPEDS file, exactly as delivered (hd2023, c2023_a...)
  curated  a few typed tables with readable names, every year stacked,
           which is what the AI courses query

    python 02_build_database.py

The whole database is rebuilt from the zips every time. Nobody edits it by
hand, so there is nothing to lose by deleting it.
"""

import csv
import io
import re
import sqlite3
import zipfile
from pathlib import Path

HERE = Path(__file__).parent
RAW = HERE / "data" / "raw"
DB = HERE / "data" / "ipeds.sqlite"


# ---------------------------------------------------------------- raw layer

def pick_csv(zf: zipfile.ZipFile) -> tuple[str, bool]:
    """A zip may hold the original file and a revised one (..._rv.csv).
    Prefer the revised file, and record which one was used."""
    names = [n for n in zf.namelist() if n.lower().endswith(".csv")]
    revised = [n for n in names if n.lower().endswith("_rv.csv")]
    return (revised or names)[0], bool(revised)


def decode(data: bytes) -> str:
    # IPEDS files are not consistently UTF-8. Try it, then fall back.
    for enc in ("utf-8-sig", "cp1252", "latin-1"):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            continue
    raise ValueError("undecodable file")


def load_raw(con: sqlite3.Connection, zpath: Path) -> None:
    table = zpath.stem.lower()  # HD2023.zip -> hd2023
    with zipfile.ZipFile(zpath) as zf:
        member, revised = pick_csv(zf)
        text = decode(zf.read(member))

    reader = csv.reader(io.StringIO(text))
    header = [h.strip().upper() for h in next(reader)]
    con.execute(f'DROP TABLE IF EXISTS "{table}"')
    con.execute(f'CREATE TABLE "{table}" ({", ".join(chr(34) + h + chr(34) for h in header)})')

    marks = ",".join("?" * len(header))
    n = 0
    batch = []
    for row in reader:
        # Blank stays NULL. A blank is not a zero -- Module 6.
        batch.append([v.strip() or None for v in row])
        if len(batch) == 5000:
            con.executemany(f'INSERT INTO "{table}" VALUES ({marks})', batch)
            n += len(batch)
            batch.clear()
    con.executemany(f'INSERT INTO "{table}" VALUES ({marks})', batch)
    n += len(batch)

    con.execute(
        "INSERT INTO load_log VALUES (?, ?, ?, ?, datetime('now'))",
        (table, member, "revised" if revised else "as released", n),
    )
    print(f"{table:<12} {n:>8,} rows  from {member}")


# ------------------------------------------------------------ curated layer

def tables_like(con: sqlite3.Connection, pattern: str) -> list[tuple[str, int]]:
    """Raw tables matching e.g. r'hd(\\d{4})', with the year pulled out."""
    out = []
    for (name,) in con.execute("SELECT name FROM sqlite_master WHERE type='table'"):
        m = re.fullmatch(pattern, name)
        if m:
            out.append((name, int(m.group(1))))
    return sorted(out, key=lambda t: t[1])


def columns(con: sqlite3.Connection, table: str) -> set[str]:
    return {r[1] for r in con.execute(f'PRAGMA table_info("{table}")')}


def build_curated(con: sqlite3.Connection) -> None:
    con.executescript(
        """
        DROP TABLE IF EXISTS institution;
        CREATE TABLE institution (
            unitid     INTEGER NOT NULL,
            file_year  INTEGER NOT NULL,
            name       TEXT,
            city       TEXT,
            state      TEXT,
            control    INTEGER,   -- code: see the HD dictionary
            sector     INTEGER,   -- code: see the HD dictionary
            PRIMARY KEY (unitid, file_year)
        );
        DROP TABLE IF EXISTS completions;
        CREATE TABLE completions (
            unitid       INTEGER NOT NULL,
            file_year    INTEGER NOT NULL,
            cipcode      TEXT    NOT NULL,  -- '11.0701'; '99' is the grand-total row
            major_number INTEGER,           -- 1 = first major, 2 = second major
            award_level  INTEGER,           -- code: see the C_A dictionary
            awards_total INTEGER
        );
        """
    )

    for table, year in tables_like(con, r"hd(\d{4})"):
        con.execute(
            f"""INSERT INTO institution
                SELECT CAST(UNITID AS INTEGER), ?, INSTNM, CITY, STABBR,
                       CAST(CONTROL AS INTEGER), CAST(SECTOR AS INTEGER)
                FROM "{table}" """,
            (year,),
        )

    needed = {"UNITID", "CIPCODE", "MAJORNUM", "AWLEVEL", "CTOTALT"}
    for table, year in tables_like(con, r"c(\d{4})_a"):
        missing = needed - columns(con, table)
        if missing:
            # Variables change across years. Say so; do not guess.
            print(f"SKIP  {table}: no column(s) {sorted(missing)}")
            continue
        con.execute(
            f"""INSERT INTO completions
                SELECT CAST(UNITID AS INTEGER), ?, CIPCODE,
                       CAST(MAJORNUM AS INTEGER), CAST(AWLEVEL AS INTEGER),
                       CAST(CTOTALT AS INTEGER)
                FROM "{table}" """,
            (year,),
        )

    con.execute("CREATE INDEX ix_completions ON completions (unitid, file_year, cipcode)")
    for t in ("institution", "completions"):
        (n,) = con.execute(f"SELECT COUNT(*) FROM {t}").fetchone()
        print(f"{t:<12} {n:>8,} rows  (curated)")


def main() -> None:
    zips = sorted(p for p in RAW.glob("*.zip") if not p.stem.endswith("_Dict"))
    if not zips:
        raise SystemExit("No zips in data/raw/. Run 01_download_ipeds.py first.")
    DB.unlink(missing_ok=True)
    con = sqlite3.connect(DB)
    con.execute(
        "CREATE TABLE load_log (table_name TEXT, source_file TEXT, release TEXT, "
        "row_count INTEGER, loaded_at TEXT)"
    )
    for z in zips:
        load_raw(con, z)
    build_curated(con)
    con.commit()
    con.close()
    print(f"\nWrote {DB}")


if __name__ == "__main__":
    main()
