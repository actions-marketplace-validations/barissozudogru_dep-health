## Summary

<!-- One to three bullet points describing what this PR does. -->

-
-

## Related Issue

<!-- Link the issue this PR resolves, e.g. "Closes #42" -->

Closes #

## Implementation Details

<!-- Explain notable decisions, trade-offs, or anything a reviewer should pay attention to. -->

## Testing

<!-- Describe how you verified the change works correctly. -->

- [ ] Built successfully with `npm run build`
- [ ] Ran `node dist/cli.js` against a real project and confirmed correct output
- [ ] Tested edge cases (empty `package.json`, scoped packages, deprecated packages, `--json` mode)
- [ ] `--min-score` gate behaves correctly (exits 1 when threshold is breached, 0 otherwise)

## Checklist

- [ ] Follows the commit message convention (`feat:`, `fix:`, `docs:`, `chore:`)
- [ ] No new runtime dependencies introduced
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] CHANGELOG.md updated if this is a user-visible change
