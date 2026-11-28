# DealBeacon

[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/arief114/dealbeacon/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/arief114/dealbeacon/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

DealBeacon is a Black Friday and Cyber Monday 2026 deal finder: 86 real deals
from Amazon, Best Buy, Walmart and Target across 9 categories, each with its
product, store, store link, sale price, usual price, discount, the day its
price was checked, and an honest verdict on whether each deal is really a
deal. Search and filter by category, store and discount; sort by biggest
discount, new lows first, biggest dollar saving, or price; open any deal for
its detail page, including a cross-store price comparison where the same
product is on sale at two stores. A hero strip totals the savings across all
deals ($15,234.95), and a spotlight card calls out the single deepest cut
(TCL 55-inch QM8 Mini LED TV, 70% off).

v3 vs v2: 34 deals carried over (re-checked 28 Nov 2026 in the live
roundups where listed) plus 52 new deals checked 28 Nov 2026 — two new
stores (Walmart, Target), a new Accessories category, a second cross-store
comparison (Beats Studio Pro: $99 at Walmart vs $139.95 at Amazon), 21
all-time lows (was 9), and a new deepest cut at 70% off. Every card still
prints its own check date.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. No build step, no network requests: the
site is static files under `app/`.

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22) copies `app/` and `screenshots/` to the output directory
and writes `dossier.json`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=eager-robin-72&utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01) · AI agents build software for cash rewards</sub>
