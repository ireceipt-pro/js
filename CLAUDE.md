# @ireceipt.pro/js — instructions for Claude

Library for creating PDF files or images from HTML templates via the iReceipt.pro service. Published to npm as `@ireceipt.pro/js`.

## Stack

- TypeScript (`tsc`), targeting CJS + ESM dual build with type declarations.
- Node `>=16` runtime; CI tests on Node 20, 22 and 24.
- ESLint via `prebuild` (no separate `lint` script).
- Test runner: `tsx --test`, with `nyc` for coverage.

## Commands you must know

```bash
npm run build          # prebuild (eslint) + clean + tsc types/cjs/esm + write package.json shim
npm test               # tsx --test test/library.test.ts — used by autoupdate verification
npm run cov            # nyc-wrapped npm test — used by PR checks
```

This repo does NOT have a separate `lint` script; ESLint runs as `prebuild` so it gates every build.

## Definition of "done" for any change you make

You are NOT done with a code change until **both** of the following exit 0 in the working tree on the branch you're going to push:

```bash
npm run build      # implicitly runs eslint via prebuild
npm test
```

Run these explicitly with the `Bash` tool before your last commit on the branch. Do not assume "the change looks right" is sufficient — `tsc` errors and ESLint errors must be observed as exit code 0, not inferred. If either fails, fix and re-run from a clean state until both pass. Only then commit and push.

If `npm install` is needed (e.g. lockfile changed), run it with `--no-audit --no-fund` and ensure it returned 0 before running checks.

## Test secrets

CI loads `IRECEIPTPRO_API_KEY` from repo secrets. Without it the integration tests fail.

## Boundaries

- Do not modify product logic when fixing dependency-compatibility issues. Acceptable edits: type adjustments, renamed exports, breaking-change shims, ESLint-config tweaks for new rule defaults.
- Do not bump the package `version` manually. Versioning is handled by the autoupdate flow / maintainer on release.
- Do not edit `.github/workflows/build-and-deploy.yml` unless explicitly asked — it is the release pipeline.
- Do not push to `main` directly. Always work on the existing branch you were summoned to.

## When you are working on an autoupdate PR

- Branch will be `chore/autoupdate-<run_id>`.
- Goal: bring `npm run build && npm test` to green.
- Push compatibility fixes onto this branch. Each push re-runs `pr-checks.yml` automatically.
- If a fix is impossible without changing product behavior, stop and leave a comment explaining what's blocked rather than guessing.

## CI quirks specific to this repo

This repo follows the unified `autoupdate-with-claude` baseline. Several workarounds are intentional:
- `autoupdate.yml` uses `GITHUB_TOKEN` and explicitly dispatches `pr-checks.yml` after PR creation.
- `autoupdate.yml` dispatches `claude.yml` directly via `workflow_dispatch` instead of an `@claude` comment.
- Releases are wired via `release-on-version-bump.yml`.
- All actions pinned to the `@v4` line because the runner image currently lacks `externals/node24`.
- Test jobs require `IRECEIPTPRO_API_KEY` from repo secrets.

Do **not** "fix" any of the above by replacing dispatch calls with comment-based mentions, or by bumping action versions back to `@v5/@v6`.
