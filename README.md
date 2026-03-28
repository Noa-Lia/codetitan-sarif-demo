# CodeTitan SARIF Demo

Minimal public demo repo for testing GitHub code scanning SARIF ingestion without exposing the private `codetitan.dev` repo.

What this repo proves:
- GitHub Actions can generate a SARIF file
- GitHub code scanning can ingest a CodeTitan-branded SARIF payload
- Alerts appear against a real file in a public repository

What this repo does not prove:
- The full private CodeTitan action/runtime
- The latest private analyzer heuristics

## Files

- `demo.js`: harmless source file with a fake hardcoded secret example
- `generate-sarif.mjs`: writes `codetitan-report.sarif`
- `.github/workflows/codetitan-sarif-demo.yml`: uploads the SARIF file to GitHub code scanning

## How To Use

1. Create a new public GitHub repo, for example `Noa-Lia/codetitan-sarif-demo`.
2. Copy these files into that repo or push this folder as a new repo.
3. Push to `main` or `master`.
4. Open the `Actions` tab and run `CodeTitan SARIF Demo`.
5. Open the `Security` or `Code scanning` tab and confirm the alert appears.

## Expected Result

The workflow uploads one `HARDCODED_SECRET` alert pointing at `demo.js`.

## Notes

- The secret in `demo.js` is fake and only exists to create a visible alert.
- No private CodeTitan code or secrets are required for this demo.
