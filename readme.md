# Torrent Vibe — 现代化的 qBittorrent 客户端

<img src="https://object.innei.in/bed/2025/10/07/1759845583729.jpg" alt="Torrent Vibe" />

Torrent Vibe 是一款面向 qBittorrent 的现代化界面，旨在以更流畅的性能、更直观的设计与跨平台一致的体验，重塑你的 BT 管理流程。

> 本仓库 fork 自 [Torrent-Vibe/Torrent-Vibe](https://github.com/Torrent-Vibe/Torrent-Vibe)。

## 项目简介

Torrent Vibe 既可作为 qBittorrent 默认 WebUI 的替代方案，也可作为独立的桌面客户端（Electron）使用。
它在保留 qBittorrent 全部核心能力的同时，提供更现代的交互、组织能力和多服务器管理体验。

工程上，本项目采用：

- **pnpm + Turbo** 多包工作区（`layer/*`、`packages/*`）
- 主进程 `layer/main`（Electron，TypeScript + ESM）
- 渲染进程 `layer/renderer`（React 19 + Vite + Tailwind v4）
- 同一份渲染代码同时产出 **桌面端渲染层** 与 **qBittorrent 备用 Web UI** 两种构建

## 下载与安装

### 方式一：桌面客户端（推荐）

前往 Releases 下载对应平台的安装包：

[🚀 前往 Releases 下载桌面客户端](https://github.com/Torrent-Vibe/Torrent-Vibe/releases)

### 方式二：作为 qBittorrent 备用 Web UI

如果你只想替换现有 qBittorrent 的 Web 界面：

1. **下载 Web 包**
   - 进入 [Releases](https://github.com/Torrent-Vibe/Torrent-Vibe/releases) 页面
   - 下载 `Torrent.Vibe-X.X.X.X-web.tar.gz`（`X.X.X.X` 为版本号）

2. **解压**
   - 解压到 qBittorrent 可访问的目录，解压后会得到一个 `public` 目录

3. **在 qBittorrent 中启用**
   - 打开 qBittorrent，进入 **工具 → 选项**
   - 切换到 **Web UI** 选项卡
   - 勾选 **"使用备用 Web UI"**
   - 将 **文件位置** 指向你刚才解压出的 `public` 目录
   - 应用设置并刷新页面

## 核心特性

### 🎨 现代化界面

- 桌面与移动端均经过适配的简洁界面
- 内置深色模式，适应任何光线环境
- 流畅的动画与响应式交互

### ⚡ 实时监控

- 下载/上传速度实时跟踪
- 进度与种子统计实时更新
- 即时状态提醒

### 📁 智能组织

- 强大的筛选与搜索能力
- 分类（Category）与标签（Tag）管理
- 可自定义的种子组织工具

### ⚙️ 精细控制

- 细粒度的带宽控制与计划任务
- 完整的 qBittorrent 偏好设置入口
- 增强的种子操作选项

### 🗂️ 多服务器管理（仅桌面端）

把多个 qBittorrent 服务端纳入同一个工作区，无需在多个浏览器标签间来回切换：

- **一键切换**：点一下即可在不同服务器之间跳转
- **统一感知**：状态徽标展示服务器健康状况，问题先知
- **安全为先**：每个服务器的凭据本地加密存储，导出文件不包含密码
- **按需排序**：按你的工作流命名与排列服务器
- **零迁移成本**：首次启动会自动接管现有配置
- **团队友好**：服务器列表可导入/导出，方便团队成员保持一致

> Web UI 模式下仍专注单一服务器，连接表单也更精简。

### 🔗 路径映射（仅桌面端）

- 把远端下载路径桥接到本地或局域网存储
- 直接在桌面端触发 "打开文件"、"在访达/资源管理器中显示"、"打开所在文件夹" 等操作
- 拖拽排序决定优先级，第一条匹配的规则生效

### 🤖 AI 元数据增强（仅桌面端）

- 智能解析种子名称，自动识别内容类型
- 自动抽取标题、年份、媒体类型、技术规格等信息
- 集成 TMDB，自动补全电影/剧集的评分、上映日期与简介
- 提供置信度评分，帮助你判断 AI 结果质量
- 支持多语言，可给出本地化标题建议
- 仅在设置中配置了 OpenAI API Key 后启用

## 适合谁使用？

- **普通用户**：想要一个更现代、更易用的 BT 管理界面
- **进阶用户**：需要更强的筛选、组织与控制能力
- **移动端用户**：希望在手机/平板上高效管理下载任务
- **任何人**：在寻找一个比 qBittorrent 默认 Web UI 更精致的替代方案

## 开发指南

环境要求：Node.js + **pnpm**（参见 `package.json` 中的 `packageManager` 字段）。

```bash
# 安装依赖
pnpm install

# 启动 Electron 桌面端（主要开发入口，带 live reload）
pnpm dev:electron

# 仅启动渲染层 Vite 开发服务器（浏览器预览 / Web UI 模式）
pnpm dev

# 构建备用 Web UI 包
pnpm build

# 构建桌面端完整安装包
pnpm build:electron

# 类型检查（整个工作区）
pnpm typecheck:turbo

# ESLint / Prettier
pnpm lint
pnpm format
```

> 本仓库**没有单元测试套件**。"
通过测试" 指 `pnpm typecheck:turbo` 与 `pnpm lint` 均通过，并通过 `pnpm dev:electron`（必要时配合浏览器预览）完成手动 QA。
>
> 更多架构细节请参见 `CLAUDE.md` 与 `docs/` 目录（包括 store/actions 模式、日志规范、热更新清单等）。

## 社区与支持

Torrent Vibe 在保持与 qBittorrent 完全兼容的前提下，为你提供更现代的使用体验。
无论你是在下载大体积文件、整理媒体库还是分发软件，它都希望成为你值得拥有的那个客户端。

---

_用 Torrent Vibe 重塑你的 BT 管理 —— 让功能与设计兼得。_
