"""Download IPEDS complete data files, and their dictionaries, for a range of years.

Module 4. A download you can re-run beats a download you remember doing.

    python 01_download_ipeds.py 2019 2023

Zips land in data/raw/. Files already there are skipped, so a re-run only
fetches what is missing. Nothing here needs an account or an API key.
"""

import sys
import urllib.request
from pathlib import Path

BASE = "https://nces.ed.gov/ipeds/datacenter/data/"

# The survey files the shared dataset starts with, by IPEDS file name.
# {y} is the year in the file name. That is NOT always the academic year the
# data describe -- Module 2 is about exactly that difference.
FILES = [
    "HD{y}",     # Institutional characteristics: one row per institution
    "C{y}_A",    # Completions: awards by program (CIP code) and award level
    "EF{y}A",    # Fall enrollment: headcount by level, race/ethnicity, gender
]

RAW = Path(__file__).parent / "data" / "raw"


def fetch(name: str) -> None:
    for suffix in (".zip", "_Dict.zip"):
        target = RAW / f"{name}{suffix}"
        if target.exists():
            print(f"have  {target.name}")
            continue
        url = BASE + name + suffix
        try:
            with urllib.request.urlopen(url, timeout=120) as resp:
                target.write_bytes(resp.read())
            print(f"got   {target.name}")
        except Exception as exc:  # a missing year is information, not a crash
            print(f"MISS  {name}{suffix}: {exc}")


def main() -> None:
    first = int(sys.argv[1]) if len(sys.argv) > 1 else 2019
    last = int(sys.argv[2]) if len(sys.argv) > 2 else 2023
    RAW.mkdir(parents=True, exist_ok=True)
    for year in range(first, last + 1):
        for pattern in FILES:
            fetch(pattern.format(y=year))


if __name__ == "__main__":
    main()
