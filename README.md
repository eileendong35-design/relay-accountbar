<div align="center">
  <img src="assets/icon.png" width="96" alt="Relay Account Bar" />

  # Relay Account Bar

  **A compact multi-account companion for the OpenAI Codex desktop app**

  [![Build](https://github.com/eileendong35-design/relay-accountbar/actions/workflows/build.yml/badge.svg)](https://github.com/eileendong35-design/relay-accountbar/actions/workflows/build.yml)
  [![Electron](https://img.shields.io/badge/Electron-39-47848f?logo=electron)](https://electronjs.org)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
</div>

Relay Account Bar is an unofficial community-enhanced fork of
[ark-daemon/relay](https://github.com/ark-daemon/relay). It manages locally stored
Codex profiles, shows quota windows in a compact always-on-top panel, and makes
switching between accounts easier on Windows, macOS, and Linux.

> This project is not affiliated with or endorsed by OpenAI. Use it only with
> accounts you own or are authorized to use, and follow the applicable OpenAI
> terms and policies. It is not intended to bypass service restrictions.

## 增强功能 / Enhancements

- 紧凑型常驻账号栏，可同时查看账号、额度百分比和重置倒计时
- 点击账号即可切换，单独刷新某个账号的用量
- `Ctrl/Command + Shift + Space` 显示或隐藏账号栏
- 可通过账号栏关闭按钮或系统托盘图标进行鼠标操作
- Electron 单实例锁：重复启动只唤醒已有实例，不创建重复账号栏
- 启动优化：优先显示轻量账号栏，完整主窗口按需创建
- 账号同步和额度网络请求延后执行，减少冷启动卡顿
- 自定义版本不会被上游自动更新静默覆盖

## Original Relay features

- Encrypted local profile storage using Electron `safeStorage`
- Usage polling with five-hour, weekly, monthly, and credit windows
- Automatic switching at a configurable low-quota threshold
- Login capture, token refresh, profile import/export, and notifications
- Shared conversation data with per-account authentication and preferences
- Dark/light themes and system tray controls

## Installation

Download a package from the repository's
[Releases](https://github.com/eileendong35-design/relay-accountbar/releases) page
when one is available, or build from source.

### Build from source

Requirements: Node.js 22+ and npm 10+.

```bash
git clone https://github.com/eileendong35-design/relay-accountbar.git
cd relay-accountbar
npm ci
npm test
npm run build
```

Create a platform package on the matching operating system:

```bash
npm run dist       # Windows
npm run dist:mac   # macOS
npm run dist:linux # Linux
```

Unsigned macOS builds may require Control-clicking the app and choosing Open on
first launch. Publicly distributed macOS packages should be signed and notarized
with an Apple Developer certificate.

## Usage

1. Start Relay Account Bar and add or capture each Codex account you own.
2. Use the compact panel to inspect quotas and switch profiles.
3. Press `Ctrl + Shift + Space` on Windows/Linux or
   `Command + Shift + Space` on macOS to hide or restore the panel.
4. Single-click the tray/menu-bar icon to toggle the panel; double-click it to
   open the full dashboard.

Account credentials are operating-system specific. Do not copy a Relay data
directory from Windows to macOS. Install the app and sign in again on the new
device.

## Data and security

- Relay data stays under the operating system's application-data directory.
- Live Codex state remains in `~/.codex`.
- Stored authentication files are encrypted with DPAPI, macOS Keychain, or
  libsecret where available.
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

## Attribution and license

This repository is based on
[ark-daemon/relay](https://github.com/ark-daemon/relay), created by
[ark-daemon](https://github.com/ark-daemon). The original copyright notice is
preserved in [LICENSE](./LICENSE).

The project and these modifications are distributed under the MIT License.
