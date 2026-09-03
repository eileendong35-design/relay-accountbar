# Contributing to Relay Account Bar

[简体中文](./CONTRIBUTING.zh-CN.md) | **English**

Thanks for your interest in improving Relay Account Bar. This is a
community-driven open-source project, and contributions of all kinds are
welcome: bug reports, feature ideas, documentation, and code.

## Ways to contribute

- **Report a bug** — Open an issue with clear reproduction steps, your OS and
  version, the actual result, and the expected result.
- **Suggest a feature** — Open an issue describing the use case. Explain the
  problem before the solution.
- **Improve docs** — Typos, unclear instructions, and missing setup steps are
  all welcome fixes.
- **Submit code** — Fix a bug or build a feature. For non-trivial work, open an
  issue first so the approach can be discussed.

## Development setup

```bash
# Clone your fork
git clone https://github.com/<your-username>/relay-accountbar.git
cd relay-accountbar

# Install dependencies
npm ci

# Run the test suite
npm test

# Launch the app in development
npm start
```

### Project layout

- `electron/` — Electron main process, IPC, and platform services.
- `src/` — React renderer, shared types, and UI utilities.
- `tests/` — Vitest unit and integration suites.
- `scripts/` — Build and asset-generation helpers.

## Before opening a pull request

1. Run `npm test` and add tests for new behavior.
2. Keep TypeScript types strict and avoid undocumented `any` escapes.
3. Never write authentication material as plaintext. Keep `contextIsolation`
   enabled and retain the trusted-sender guard for IPC handlers.
4. Prefer small, focused commits and one logical topic per pull request.
5. Explain what changed, why it changed, and how it was tested. Screenshots are
   appreciated for UI changes.

## Coding conventions

- Match the existing service-oriented structure and keep one primary concern
  per file.
- Prefer pure, testable functions for parsing and business logic. Keep side
  effects at the edges.
- Discuss new runtime dependencies before adding them; the application
  deliberately keeps its dependency tree small.

## Reporting security issues

Do not open a public issue for security vulnerabilities. Contact the repository
maintainer privately with the details and, if possible, reproduction steps.

## Code of conduct

Be respectful, assume good intent, and keep discussion focused on the work.
Harassment or hostility is not welcome.

## License

By contributing, you agree that your contributions will be licensed under the
[MIT License](./LICENSE) covering this project.
