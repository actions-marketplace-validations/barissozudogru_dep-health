# dep-health

A CLI that gives each npm dependency a health score combining freshness, security, and maintenance signals.

## Installation

```bash
npm install -g @barissozudogru/dep-health
# or
npx @barissozudogru/dep-health
```

## Usage

```bash
# Analyze the current directory
dep-health

# Analyze a specific project
dep-health --path ./my-project

# JSON output for CI pipelines
dep-health --json > report.json

# CI gate: exit 1 if any dependency scores below 5
dep-health --min-score 5
```

## Scoring

Each dependency receives a score from **0 to 10** (higher is better), calculated from four weighted signals:

| Signal | Weight | Logic |
|--------|--------|-------|
| Freshness | 30% | Major versions behind: -3 each. Minor: -1. Patch: -0.5 |
| Recency | 30% | Last publish < 6 months: 10. < 1 year: 7. < 2 years: 4. Older: 1 |
| Deprecation | 20% | Deprecated: 0. Not deprecated: 10 |
| Popularity | 20% | TypeScript types: +2. Weekly downloads: tiered 0-8 |

## Categories

- **CRITICAL** (0-3) - Immediate attention required
- **WARNING** (4-6) - Should be updated soon
- **HEALTHY** (7-10) - Looks good

## CI Integration

```yaml
- name: Check dependency health
  run: npx @barissozudogru/dep-health --min-score 4
```

Exit code is `1` if any dependency scores below the threshold, `0` otherwise.

## Options

```
--path <dir>       Directory containing package.json (default: cwd)
--json             Output results as JSON
--min-score <n>    Exit 1 if any dep scores below n (CI gate)
--prod-only        Analyze only production dependencies (skip devDependencies)
--dev-only         Analyze only dev dependencies (skip dependencies)
-h, --help         Show help
```

## Requirements

- Node.js >= 18.0.0
- No external dependencies — uses Node's built-in `https` module

## License

MIT
