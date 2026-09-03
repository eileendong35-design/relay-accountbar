<div align="center">
  <img src="assets/icon.png" width="96" alt="Relay Account Bar" />

  # Relay Account Bar

  **A compact multi-account companion for the OpenAI Codex desktop app**

  [![Build](https://github.com/eileendong35-design/relay-accountbar/actions/workflows/build.yml/badge.svg)](https://github.com/eileendong35-design/relay-accountbar/actions/workflows/build.yml)
  [![Electron](https://img.shields.io/badge/Electron-39-47848f?logo=electron)](https://electronjs.org)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
</div>

<div align="center">

[简体中文](./README.zh-CN.md) | **English**

</div>

Relay Account Bar is an unofficial community-enhanced fork of
[ark-daemon/relay](https://github.com/ark-daemon/relay). It manages locally stored
Codex profiles, shows quota windows in a compact always-on-top panel, and makes
switching between accounts easier on Windows and macOS.

> This project is not affiliated with or endorsed by OpenAI. Use it only with
> accounts you own or are authorized to use, and follow the applicable OpenAI
> terms and policies. It is not intended to bypass service restrictions.

## Enhancements

- Compact always-on-top account bar showing accounts, quota percentages, and
  reset countdowns at a glance
- Click an account to switch profiles, or refresh the quota for one account
- `Ctrl/Command + Shift + Space` toggles the account bar
- Mouse controls through the account-bar close button and system tray icon
- Electron single-instance lock: reopening Relay wakes the existing instance
  instead of creating another account bar
- Faster startup: the lightweight account bar appears first and the full
  dashboard is created only when needed
- Account synchronization and quota requests are deferred to reduce cold-start
  pauses
- Custom builds are protected from being silently replaced by upstream updates

## Original Relay features

- Encrypted local profile storage using Electron `safeStorage`
- Usage polling with five-hour, weekly, monthly, and credit windows
- Automatic switching at a configurable low-quota threshold
- Login capture, token refresh, profile import/export, and notifications
- Shared conversation data with per-account authentication and preferences
- Dark/light themes and system tray controls

## Installation

Download a package from the repository's
[Releases](https://github.com/eileendong35-design/relay-accountbar/releases) page,
or build from source.

### Build from source

Requirements: Node.js 22+ and npm 10+.

```bash
git clone https://github.com/eileendong35-design/relay-accountbar.git
cd relay-accountbar
npm ci
npm run build
```

Create a platform package on the matching operating system:

```bash
npm run dist       # Windows
npm run dist:mac   # macOS
```

Unsigned macOS builds may require Control-clicking the app and choosing Open on
first launch. Publicly distributed macOS packages should be signed and notarized
with an Apple Developer certificate.

## Usage

1. Start Relay Account Bar and add or capture each Codex account you own.
2. Use the compact panel to inspect quotas and switch profiles.
3. Press `Ctrl + Shift + Space` on Windows or
   `Command + Shift + Space` on macOS to hide or restore the panel.
4. Single-click the tray/menu-bar icon to toggle the panel; double-click it to
   open the full dashboard.

Account credentials are operating-system specific. Do not copy a Relay data
directory from Windows to macOS. Install the app and sign in again on the new
device.

## Data and security

- Relay data stays under the operating system's application-data directory.
- Live Codex state remains in `~/.codex`.
- Stored authentication files are encrypted with Windows DPAPI or macOS
  Keychain.
- The app contacts OpenAI endpoints only for authentication/token refresh and
  quota retrieval. It includes no analytics or telemetry.
- Export bundles contain sensitive account tokens and must be protected with a
  strong passphrase.

Never commit `.env` files, `auth.json`, exported account bundles, signing
certificates, or application-data directories.

## Project structure

```text
electron/  Electron main process, IPC, profile and quota services
src/       React dashboard and compact account bar
tests/     Vitest unit and integration tests
assets/    Application and tray icons
scripts/   Build helpers
```

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) or the
[简体中文贡献指南](./CONTRIBUTING.zh-CN.md).

## Attribution and license

This repository is based on
[ark-daemon/relay](https://github.com/ark-daemon/relay), created by
[ark-daemon](https://github.com/ark-daemon). The original copyright notice is
preserved in [LICENSE](./LICENSE).

The project and these modifications are distributed under the MIT License.
