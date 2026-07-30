# YeahPay API 文档站

本仓库用于维护 YeahPay 新加坡交易 API 的 Mintlify 文档站。站点同时提供中文和英文接入指南、OpenAPI 3.1 API Reference、SHA-512 签名说明，以及可生成签名和 cURL 的在线接口调试工具。

当前 OpenAPI 规范版本为 `2.1`，内容包括收银台、扫码交易、统一撤销或退款、支付结果通知和退款结果通知等接口。

## 主要能力

- 中文和英文双语文档导航。
- 根据 OpenAPI 自动生成 API Reference。
- 在线生成请求签名和 cURL。
- 自动保持中文 OpenAPI、英文 OpenAPI 和签名调试组件同步。
- 为 Codex 和 Claude Code 提供相同的 `sanity-check` skill 与 hook 约束。

## 环境要求

- Node.js v20.17.0 或更新版本。
- Mintlify CLI。

先确认 Node.js 版本：

```bash
node --version
```

全局安装 Mintlify CLI：

```bash
npm i -g mint
```

如果使用 pnpm：

```bash
pnpm add -g mint
```

确认 CLI 可以运行：

```bash
mint --version
```

## 本地预览

在仓库根目录运行：

```bash
mint dev
```

默认可以通过 `http://localhost:3000` 访问本地文档站。

修改完成后执行完整校验：

```bash
mint validate
```

## OpenAPI 维护流程

`openapi.json` 是唯一可编辑的 API 定义文件。英文规范和签名调试组件均由脚本生成。

修改 `openapi.json` 后，按顺序执行：

```bash
node scripts/build-openapi-en.mjs
node scripts/sync-signed-api-playground.mjs --write
node scripts/sync-signed-api-playground.mjs --check
mint validate
```

生成链路如下：

```text
openapi.json
    ├── scripts/build-openapi-en.mjs
    │       └── openapi-en.json
    └── scripts/sync-signed-api-playground.mjs
            └── snippets/signed-api-playground.jsx 中的生成块
```

英文 OpenAPI 不是通过在线翻译服务生成的。`scripts/build-openapi-en.mjs` 使用仓库内维护的中英文映射表递归翻译字段值。如果生成结果仍包含未翻译的中文，脚本会直接失败；新增或修改中文文案时，需要同时维护对应的英文映射。

## Sanity Check

可以直接运行共享检查脚本：

```bash
bash scripts/sanity-check-openapi.sh
```

脚本会：

1. 在临时目录中根据 `openapi.json` 重建英文规范。
2. 比较当前 `openapi-en.json`。
3. 检查签名调试组件的生成块。
4. 发现漂移时自动重新生成并同步。
5. 修复后再次执行严格检查。

在 Codex 中可以调用：

```text
$sanity-check
```

在 Claude Code 中可以调用：

```text
/sanity-check
```

## Agent 自动化

Codex 和 Claude Code 共用 `scripts/hooks/` 下的 hook 实现：

- `PreToolUse`：阻止直接修改生成文件和签名调试组件的生成块。
- `PostToolUse`：编辑完成后检查并自动同步 OpenAPI 产物。
- `Stop`：结束任务前执行同步检查和 `mint validate`。

平台配置入口：

- Codex：`.codex/hooks.json`
- Claude Code：`.claude/settings.json`
- 公共项目规则：`AGENTS.md`
- Claude Code 项目规则入口：`CLAUDE.md`

新增或修改 Codex hook 后，需要在 Codex 中通过 `/hooks` 审查并信任配置。

## 目录说明

| 路径 | 用途 |
| --- | --- |
| `docs.json` | Mintlify 站点、双语导航和主题配置 |
| `index.mdx`、`signature.mdx`、`api-tester.mdx` | 中文接入文档 |
| `en/` | 英文接入文档 |
| `openapi.json` | 中文 OpenAPI 唯一事实来源 |
| `openapi-en.json` | 自动生成的英文 OpenAPI |
| `snippets/` | 签名接口调试组件 |
| `scripts/` | OpenAPI 生成、同步、检查和 hook 脚本 |
| `.codex/` | Codex hooks 和 skill |
| `.claude/` | Claude Code hooks 和 skill |

## 限制与注意事项

1. 不要直接编辑 `openapi-en.json`，重新生成时所有手工修改都会被覆盖。
2. 不要直接编辑 `snippets/signed-api-playground.jsx` 中标记为自动生成的 OpenAPI 操作块；组件其他非生成部分可以正常维护。
3. 新增中文 OpenAPI 文案但未补充英文映射时，英文生成脚本会失败。
4. 当前 OpenAPI 只配置了测试环境服务器地址。增加或修改其他环境地址前，需要先确认实际网关地址。
5. 仓库没有 Node.js 包清单或锁文件；生成脚本仅依赖 Node.js 内置模块，Mintlify CLI 需要单独全局安装。
6. 仓库没有内置发布工作流。线上发布方式取决于外部 Mintlify 项目的部署配置。
7. `docs.json` 中的 Support、Dashboard 和页脚社交链接仍是 Mintlify 通用配置，正式发布前应替换为 YeahPay 的实际链接。

## 提交前检查

涉及 OpenAPI 或接口调试组件的修改，至少执行：

```bash
bash scripts/sanity-check-openapi.sh
mint validate
git diff --check
```
