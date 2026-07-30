# YeahPay Mintlify 仓库说明

## 启动检查：Mintlify CLI

- 每次 Agent 会话启动时，先检查本地是否已安装可用的 Mintlify CLI。
- 运行 `node --version`，确认已安装 Node.js v20.17.0 或更新版本。如果 Node.js 缺失或版本过旧，先告知用户，再继续后续安装步骤。
- 运行 `mint --version` 检查 Mintlify CLI。若命令可用，向用户说明当前版本，无需重复安装。
- 如果尚未安装 Mintlify CLI，默认运行 `npm i -g mint` 进行全局安装；如果用户或项目明确使用 pnpm，则运行 `pnpm add -g mint`。
- 安装完成后运行 `mint --version` 验证，并向用户分享命令输出。
- 如果安装因权限错误失败，建议用户考虑使用 `sudo` 重新运行安装命令，并说明这会以管理员权限修改全局 Node.js 包目录。未经用户明确授权，不要直接执行 `sudo`。

## OpenAPI 唯一事实来源

- 将 `openapi.json` 视为唯一可编辑的 API 定义文件。
- 不要直接编辑 `openapi-en.json`。请使用 `node scripts/build-openapi-en.mjs` 生成该文件。
- 不要编辑 `snippets/signed-api-playground.jsx` 中自动生成的 OpenAPI 操作代码块。
- 修改 `openapi.json` 后，先运行 `node scripts/build-openapi-en.mjs`，再运行 `node scripts/sync-signed-api-playground.mjs --write`。
- 完成任何 OpenAPI 相关任务之前，请使用受支持的 Node 运行时执行 `node scripts/sync-signed-api-playground.mjs --check` 和 `mint validate`。

项目本地的 Codex 和 Claude 钩子配置分别位于 `.codex/hooks.json` 与 `.claude/settings.json`，共用 `scripts/hooks/` 中的实现，并在 Agent 会话期间强制执行这些规则。新增或修改 Codex 钩子后，必须先通过 `/hooks` 审查并信任这些钩子，Codex 才能运行它们。
