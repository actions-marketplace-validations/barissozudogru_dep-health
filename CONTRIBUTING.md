# Contributing

Thank you for taking the time to contribute. The following guidelines keep the review process smooth for everyone.

---

## Getting Started

```bash
git clone https://github.com/barissozudogru/dep-health.git
cd dep-health
npm install
npm run build
```

Run the CLI against the repo itself to verify everything works:

```bash
node dist/cli.js
```

---

## Development Workflow

1. Fork the repository and create a branch from `main`.
2. Make your changes in `src/`. Source files are in TypeScript.
3. Build and verify:

   ```bash
   npm run build
   node dist/cli.js --help
   ```

4. Commit using the [Conventional Commits](https://www.conventionalcommits.org/) format (see below).
5. Open a pull request against `main`.

---

## Branch Naming

```
feat/short-description
fix/short-description
chore/short-description
docs/short-description
```

---

## Commit Messages

Follow the Conventional Commits specification:

```
feat: add --ignore flag to skip specific packages
fix: correct scoped package URL encoding
docs: update scoring table in README
chore: bump typescript to 5.5
```

Keep the subject line under 72 characters. Use the body for context when the change is non-trivial.

---

## Pull Requests

- One concern per PR. Split unrelated changes into separate PRs.
- Fill in the PR template fully.
- All CI checks must pass before merge.
- Squash commits will be used on merge to keep history clean.

---

## Code Style

- TypeScript strict mode is enabled. Do not introduce `any` types without justification.
- Use Node's built-in modules only. This project has zero runtime dependencies and that must remain true.
- Prefer explicit return types on exported functions.
- Keep functions small and focused. Prefer pure functions where possible.

---

## Reporting Bugs

Open an issue using the **Bug Report** template. Include:

- Node.js version (`node --version`)
- Operating system
- The command you ran
- The full output, including any error messages

---

## Requesting Features

Open an issue using the **Feature Request** template before starting implementation. This avoids duplicate effort and ensures alignment on scope.

---

## License

By contributing you agree that your changes will be licensed under the project's [MIT License](LICENSE).
