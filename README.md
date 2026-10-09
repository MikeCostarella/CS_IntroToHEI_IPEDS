# Intro to HEI & IPEDS

A self-directed course that builds one documented, tested higher-education
dataset (federal IPEDS data plus Ohio's published HEI figures) for the AI
courses to use in their projects.

**Live site:** https://mikecostarella.github.io/CS_IntroToHEI_IPEDS/

Twelve modules in four units. The output is a versioned **project kit**: a
SQLite database, CSV extracts, a data dictionary, a datasheet, and a
first-hour script.

## Where it sits

```
Python Programming  ->  Intro to HEI & IPEDS  (builds the kit)
                              |
                              v  the kit is used by
        Introduction to AI/ML, LLM Foundations, Agentic AI Foundations
```

This is a companion course, not a gate. The AI courses link to the released
kit, and their students can start from it directly.

Assumed: Python basics and a little SQL. No statistics, no machine learning.

## Runnable examples

The scripts in [`examples/`](examples/) build the dataset using only the
Python standard library:

```bash
cd examples
python 01_download_ipeds.py 2019 2023
python 02_build_database.py
python 03_check_quality.py
python 04_first_question.py
```

## The site

Built on the fleet pattern: a typed registry in `react-app/src/data` drives
navigation, the syllabus, the counts and the search index, with hash routing
and section deep links. The build runs the test suite before it bundles.

```bash
cd react-app
npm install
npm run dev
```

```bash
cd react-app
npm test          # vitest
npm run typecheck # tsc --noEmit
npm run build     # tsc -b && vite build
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`: install, test, build,
publish to GitHub Pages. The build stamp in the menu and footer shows which
build is live.

## License

Course content: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
Code, including the example scripts: MIT. See [LICENSE.md](LICENSE.md).
IPEDS data is published by NCES and is in the public domain; HEI reports are
published by the Ohio Department of Higher Education.
