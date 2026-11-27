// DealBeacon entrypoint (Node 22, standard library only).
// The grader runs this file twice; both runs must write identical bytes.
// It hands in the site: copies app/ and screenshots/ from this repository
// into /output (or $MAKEFUN_OUTPUT_DIR outside the grader) and writes
// /output/dossier.json with the kit's buildDossier helper, which is the
// summary the judge reads. Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Caps from the gate: at most 4 screenshots of 256 KiB each, app/ at most
// 993 entries and 16 MiB, and the dossier text capped at 160 KiB.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

// Fail loudly instead of handing in a partial site: the grader runs this
// file twice and compares bytes, so a silent partial copy could pass one
// run and fail the comparison. A missing output file is a hard error here.
for (const required of ['app/index.html', 'app/data.js', 'dossier.json']) {
  if (!existsSync(join(out, required))) {
    throw new Error(`DealBeacon: missing output ${required}`);
  }
}
