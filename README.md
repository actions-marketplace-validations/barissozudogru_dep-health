<h1 align="center">dep-health</h1>

<p align="center">
  A health score for every npm dependency in your project.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Node.js-%3E%3D18-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js >= 18">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat" alt="MIT License">
  <img src="https://img.shields.io/badge/Zero_Dependencies-brightgreen?style=flat" alt="Zero Dependencies">
</p>

---

## What It Does

`dep-health` queries the npm registry for every dependency in your `package.json` and returns a score from **0 to 10** for each one. Scores are calculated from four weighted signals: how up-to-date the package is, how recently it was published, whether it is deprecated, and how popular it is. Results are grouped into CRITICAL / WARNING / HEALTHY categories so you can prioritise what needs attention.

It ships with zero runtime dependencies and uses Node's built-in `https` module exclusively.

---

## Scoring Breakdown

Each dependency receives a weighted score out of 10. Higher is better.

| Signal | Weight | Detail |
|---|---|---|
| Freshness | 30% | Major versions behind: -3 each. Minor: -1 each. Patch: -0.5 each. |
| Recency | 30% | Last publish < 6 months: 10. < 1 year: 7. < 2 years: 4. Older: 1. |
| Deprecation | 20% | Deprecated: 0. Not deprecated: 10. |
| Popularity | 20% | TypeScript types present: +2. Weekly downloads: tiered 0 – 8. |

**Download tiers** (popularity sub-score):

| Weekly downloads | Score contribution |
|---|---|
| >= 1,000,000 | +8 |
| >= 100,000 | +7 |
| >= 10,000 | +5 |
| >= 1,000 | +3 |
| >= 100 | +1 |
| < 100 | 0 |

---

## Quick Start

```bash
# Run without installing
npx @barissozudogru/dep-health

# Or install globally
npm install -g @barissozudogru/dep-health
dep-health
```

---

## Usage

```bash
# Analyze the current directory
dep-health

# Analyze a specific project
dep-health --path ./my-project

# Only production dependencies
dep-health --prod-only

# Only dev dependencies
dep-health --dev-only

# JSON output for downstream tooling
dep-health --json > report.json

# CI gate: exit 1 if any dependency scores below 5
dep-health --min-score 5
```

---

## Options

| Flag | Description | Default |
|---|---|---|
| `--path <dir>` | Directory containing `package.json` | Current working directory |
| `--json` | Output results as JSON instead of the formatted table | Off |
| `--min-score <n>` | Exit with code `1` if any dependency scores below `n` | Off |
| `--prod-only` | Analyze only `dependencies` (skip `devDependencies`) | Off |
| `--dev-only` | Analyze only `devDependencies` (skip `dependencies`) | Off |
| `-v, --version` | Print version and exit | — |
| `-h, --help` | Show help message | — |

`--prod-only` and `--dev-only` are mutually exclusive.

---

## Example Output

```
dep-health  v0.3.0 of my-app  2026-03-12T10:00:00.000Z
────────────────────────────────────────────────────────────────────────

  CRITICAL (2)

    moment  [prod]
    ████░░░░░░ 4.0 -> 2.29.4   2.29.4 is latest
    3 major behind  |  last publish: 14mo ago  |  1.2M/wk
    freshness:1.0  recency:4.0  deprecation:0.0  popularity:10.0
    note: Moment is a legacy project...

    request  [prod] [DEPRECATED]
    ██░░░░░░░░ 2.0 -> 2.88.2
    up to date  |  last publish: 4y ago  |  8.1M/wk
    freshness:10.0  recency:1.0  deprecation:0.0  popularity:10.0

  WARNING (1)

    lodash  [dev]
    ██████░░░░ 6.0 -> 4.17.21
    1 minor behind  |  last publish: 22mo ago  |  45.2M/wk
    freshness:9.0  recency:4.0  deprecation:10.0  popularity:10.0

  HEALTHY (3)

    typescript  [dev] [TS]
    ██████████ 9.8 -> 5.4.5
    up to date  |  last publish: 2mo ago  |  62.0M/wk
    freshness:10.0  recency:10.0  deprecation:10.0  popularity:10.0

────────────────────────────────────────────────────────────────────────
  Overall project score:  6.2 / 10  (WARNING)
  6 packages analyzed  |  2 critical  |  1 warning  |  3 healthy
```

---

## CI Integration

Add a step to your CI pipeline to fail the build when dependencies fall below a health threshold.

**GitHub Actions:**

```yaml
- name: Check dependency health
  run: npx @barissozudogru/dep-health --min-score 4
```

**With JSON output for artifact upload:**

```yaml
- name: Dependency health report
  run: npx @barissozudogru/dep-health --json > dep-health-report.json

- name: Enforce health gate
  run: npx @barissozudogru/dep-health --min-score 4
```

---

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Analysis complete. All dependencies at or above `--min-score` (or no gate set). |
| `1` | One or more dependencies scored below `--min-score`, or a fatal error occurred. |

---

## Requirements

- Node.js >= 18.0.0
- No runtime dependencies

---

## License

[MIT](LICENSE)
