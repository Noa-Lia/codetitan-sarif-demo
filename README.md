# CodeTitan Security Scan — Demo

This repo demonstrates CodeTitan's diff-aware PR scanning surface. It contains realistic patterns of the kind CodeTitan is designed to catch — no synthetic "password=12345" vulns.

## What you'll see on the open PR

Open the [`add-tenable-integration`](../../pulls) PR. CodeTitan runs automatically and posts an inline comment listing what it found in the diff:

- **CRITICAL** — `withCredentials: true` in `src/clients/tenable.ts` without an origin whitelist. Any page the user visits can make authenticated cross-origin requests to Tenable using their stored session. Standard CSRF vector.
- **HIGH** — `jwt.sign()` in `src/auth/api-keys.ts` with no `expiresIn`. API keys issued here never expire — a compromised key is valid forever.
- **HIGH** — `path.join(process.argv[2], file)` in `scripts/convert-findings.js`. Raw CLI argv flows into a file path with no bounds check. `../../../etc/passwd` is a valid input.

CodeTitan only scans the changed files in the PR diff — it won't flag existing code that wasn't touched.

## What this proves

- `Noa-Lia/codetitan-action@v1` runs on GitHub-hosted `ubuntu-latest` runners
- Diff-aware mode activates on `pull_request` events and scans only changed surface
- PR comments appear inline on the PR with severity, file, line, and explanation
- SARIF uploads to GitHub Code Scanning for persistent alert tracking

## What this does not show

Learned-profile signal and PR Risk Score require ~50 PRs of repo history to calibrate. This demo shows the detection surface. The learning moat activates on a real repo after weeks of use.

## Add it to your own repo

```yaml
# .github/workflows/codetitan.yml
name: CodeTitan Security Scan

on:
  pull_request:

jobs:
  codetitan:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write

    steps:
      - uses: actions/checkout@v4
      - uses: Noa-Lia/codetitan-action@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

No account or API key needed. The engine runs entirely in your CI.

Full docs: [codetitan.dev](https://codetitan.dev)
