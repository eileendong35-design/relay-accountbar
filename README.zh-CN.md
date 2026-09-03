<div align="center">
  <img src="assets/icon.png" width="96" alt="Relay Account Bar" />

  # Relay Account Bar

  **为 OpenAI Codex 桌面应用打造的轻量多账号辅助工具**

  [![Build](https://github.com/eileendong35-design/relay-accountbar/actions/workflows/build.yml/badge.svg)](https://github.com/eileendong35-design/relay-accountbar/actions/workflows/build.yml)
  [![Electron](https://img.shields.io/badge/Electron-39-47848f?logo=electron)](https://electronjs.org)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
</div>

<div align="center">

**简体中文** | [English](./README.md)

</div>

Relay Account Bar 是 [ark-daemon/relay](https://github.com/ark-daemon/relay)
的非官方社区增强版本。它可以管理保存在本机的 Codex 账号配置，在紧凑的置顶账号栏中
显示用量额度，并帮助你在 Windows、macOS 和 Linux 上快速切换自己的账号。

> 本项目与 OpenAI 没有关联，也未获得 OpenAI 官方认可。请仅用于你本人拥有或获准使用的
> 账号，并遵守适用的 OpenAI 条款和政策。本项目不用于绕过任何服务限制。

## 主要增强功能

- 紧凑的常驻置顶账号栏，可同时查看账号、额度百分比和重置倒计时
- 点击账号即可切换，也可以单独刷新某个账号的用量
- 使用 `Ctrl/Command + Shift + Space` 显示或隐藏账号栏
- 支持通过账号栏关闭按钮或系统托盘图标进行鼠标操作
- Electron 单实例锁：重复启动时只唤醒已有实例，不会创建重复账号栏
- 启动优化：优先显示轻量账号栏，完整主窗口仅在需要时创建
- 延后账号同步与额度网络请求，减少冷启动卡顿
- 自定义版本不会被上游自动更新静默覆盖

## Relay 原有功能

- 使用 Electron `safeStorage` 加密保存本地账号配置
- 显示五小时、每周、每月及点数额度窗口
- 达到可配置的低额度阈值时自动切换账号
- 登录捕获、令牌刷新、配置导入导出及通知
- 多账号共用对话数据，同时保留各账号的认证信息和偏好设置
- 深色/浅色主题与系统托盘控制

## 安装

前往 [Releases](https://github.com/eileendong35-design/relay-accountbar/releases)
下载与你系统对应的安装包：

- Windows：安装版 `.exe` 或便携版 `.exe`
- macOS：Apple 芯片版 `.dmg`（M1/M2/M3/M4/M5）
- Linux：`.deb` 或 `.tar.gz`

macOS 安装包目前未进行 Apple 开发者签名。首次打开时可能需要按住 Control 点击应用，
选择“打开”，再确认启动。

### 从源码构建

要求：Node.js 22+、npm 10+。

```bash
git clone https://github.com/eileendong35-design/relay-accountbar.git
cd relay-accountbar
npm ci
npm run build
```

请在对应操作系统上生成安装包：

```bash
npm run dist       # Windows
npm run dist:mac   # macOS
npm run dist:linux # Linux
```

## 使用方法

1. 启动 Relay Account Bar，添加或捕获你拥有的 Codex 账号。
2. 在紧凑账号栏中查看额度，点击账号进行切换。
3. Windows/Linux 使用 `Ctrl + Shift + Space`，macOS 使用
   `Command + Shift + Space` 隐藏或恢复账号栏。
4. 单击托盘或菜单栏图标切换账号栏；双击图标打开完整控制面板。

账号凭据与操作系统绑定。请勿直接把 Windows 的 Relay 数据目录复制到 macOS。
在新设备上安装应用并重新登录账号即可。

## 数据与安全

- Relay 数据保存在操作系统的应用数据目录中。
- Codex 的当前状态仍保存在 `~/.codex`。
- 保存的认证文件会尽可能使用 Windows DPAPI、macOS 钥匙串或 Linux libsecret 加密。
- 应用仅为认证、令牌刷新和额度查询访问 OpenAI 接口，不包含分析或遥测功能。
- 导出的备份包含敏感账号令牌，请务必设置强密码并妥善保存。

请勿提交 `.env`、`auth.json`、账号导出包、签名证书或应用数据目录。

## 项目结构

```text
electron/  Electron 主进程、IPC、账号与额度服务
src/       React 控制面板与紧凑账号栏
tests/     Vitest 单元测试与集成测试
assets/    应用及托盘图标
scripts/   构建辅助脚本
```

## 参与贡献

欢迎提交问题、功能建议、文档和代码。请阅读
[中文贡献指南](./CONTRIBUTING.zh-CN.md)。

## 来源与许可

本仓库基于 [ark-daemon/relay](https://github.com/ark-daemon/relay)，原作者为
[ark-daemon](https://github.com/ark-daemon)。原始版权声明保留在 [LICENSE](./LICENSE)
中。本项目及本仓库的修改内容均使用 MIT 许可证发布。
