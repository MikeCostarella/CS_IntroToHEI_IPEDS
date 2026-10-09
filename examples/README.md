# Runnable examples

These five scripts build the shared HEI/IPEDS project dataset. They use only
the Python standard library: no `pip install`, no account, no API key.

```bash
cd examples
python 01_download_ipeds.py 2019 2023   # zips into data/raw/
python 02_build_database.py             # data/ipeds.sqlite (raw + curated)
python 03_check_quality.py              # PASS / WARN / FAIL, non-zero exit on FAIL
python 04_first_question.py             # the first-hour question
python 05_reconcile.py                  # needs data/hei_figures.csv (see Module 8)
```

| Script | Module | What it does |
| --- | --- | --- |
| `01_download_ipeds.py` | 4 | Downloads IPEDS complete data files and dictionaries |
| `02_build_database.py` | 5 | Loads every file into a raw layer, then builds typed curated tables |
| `03_check_quality.py` | 7 | Checks the database must pass before a release |
| `04_first_question.py` | 10 | Computing bachelor's degrees at YSU and nearby publics, by year |
| `05_reconcile.py` | 8 | Puts hand-entered HEI report figures next to IPEDS figures |

`data/` is git-ignored apart from `hei_figures.example.csv`. Everything in it
can be rebuilt from the scripts.

**Check before you trust.** IPEDS file names, column names and code values
change between years. The codes used here (award level 5 for bachelor's
degrees, CIP `99` for the grand-total row) are the ones to confirm in the
dictionary for each year you load. If a file name 404s, find the right name
in the IPEDS Data Center's complete data files list and update `FILES`.
