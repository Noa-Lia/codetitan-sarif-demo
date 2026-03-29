# CodeTitan SARIF Demo

Minimal public demo repo for proving the real public CodeTitan GitHub Action on a public GitHub repository.

What this repo proves:
- the public `Noa-Lia/codetitan-action@main` action runs on GitHub-hosted runners
- CodeTitan can surface a real MVP finding from a public JS file
- GitHub code scanning can ingest the SARIF emitted by the action
- Alerts appear against a real file in a public repository

What this repo does not prove:
- the private `codetitan.dev` monorepo
- a public CLI install path
- automatic remediation inside GitHub Actions

## Files

- `demo.js`: a tiny JS file with an intentionally fake hardcoded secret
- `.github/workflows/codetitan-sarif-demo.yml`: runs the real CodeTitan public action and uploads SARIF

## How To Use

1. Push to `main` or `master`.
2. Open the `Actions` tab and run `CodeTitan SARIF Demo`.
3. Open the `Security` or `Code scanning` tab and confirm the alert appears.

## Expected Result

The workflow uploads one `HARDCODED_SECRET` alert pointing at `demo.js` while still passing the workflow, because the gate is set to `CRITICAL`.

## Notes

- The secret in `demo.js` is fake and only exists to create a visible alert.
- The workflow caches the packed runtime under `.codetitan-action-runtime` so repeat runs are faster.
