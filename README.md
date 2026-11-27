# DealBeacon

[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

DealBeacon is a Black Friday and Cyber Monday 2026 deal finder: 20 real deals
from Amazon and Best Buy, each with its product, store, store link, sale
price, usual price, discount and the day its price was checked — plus an
honest verdict on whether each deal is really a deal. Search and filter by
category, store and discount; sort by biggest discount, biggest dollar
saving, or price; open any deal for its detail page, including a cross-store
price comparison where the same product is on sale at both stores.

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
