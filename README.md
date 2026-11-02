# YeahPay API 文档站

本仓库用于维护 YeahPay API 的 Mintlify 文档站。站点提供简体中文、香港繁体中文和英文接入指南、OpenAPI 3.1 API Reference、SHA-512 签名说明，以及可生成签名和 cURL 的在线接口调试工具。

当前 OpenAPI 规范版本为 `2.1`，内容包括统一收银台、嵌入式收银台建单与查单、支付链接、统一撤销或退款、支付结果通知和退款结果通知等接口。嵌入式接口按商户 API V1.5 整理，前端接入页按浏览器 SDK V1.0 整理；支付链接按开放 API V2 整理，包含链接、商品、图片上传和收款成功通知。

## 主要能力

- 简体中文、香港繁体中文和英文三语文档导航。
- 根据 OpenAPI 自动生成 API Reference。
- 在线生成请求签名和 cURL。
- 自动保持中文 OpenAPI、英文与香港繁体规范、香港繁体页面和签名调试组件同步。
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

安装锁定的文档构建依赖（香港繁体转换使用 OpenCC）：

```bash
npm ci --ignore-scripts
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

`openapi.json` 是唯一可编辑的 API 定义文件。`openapi-en.json`、`openapi-zh-hk.json` 和签名调试组件中的生成块均由脚本维护。`zh-hk/` 页面从根目录简体页面生成，不直接编辑。

修改 `openapi.json` 后，按顺序执行：

```bash
node scripts/build-openapi-en.mjs
node scripts/build-zh-hk.mjs
node scripts/sync-signed-api-playground.mjs --write
node scripts/check-api-environments.mjs --public
node scripts/build-zh-hk.mjs --check
node scripts/sync-signed-api-playground.mjs --check
mint validate
```

生成链路如下：

```text
openapi.json
    ├── scripts/build-openapi-en.mjs
    │       └── openapi-en.json
    ├── scripts/build-zh-hk.mjs
    │       ├── openapi-zh-hk.json
    │       ├── zh-hk/*.mdx
    │       └── 签名调试组件的香港繁体界面文案
    └── scripts/sync-signed-api-playground.mjs
            └── snippets/signed-api-playground.jsx 中的生成块
```

英文 OpenAPI 不是通过在线翻译服务生成的。`scripts/build-openapi-en.mjs` 使用仓库内维护的中英文映射表递归翻译字段值。如果生成结果仍包含未翻译的中文，脚本会直接失败；新增或修改中文文案时，需要同时维护对应的英文映射。

香港繁体生成使用锁定版本的 OpenCC 香港转换及术语表，只转换说明文字和导航；保护代码、参数名、枚举、示例值和真实接口路径。商户 API 环境配置以 OpenAPI 为准，前端 SDK 的 `test/pro` 单独维护，不增加 SDK 沙箱选项。

各页面的 `zh-CN_link`、`zh-Hant_link` 和 `en_link` 指向同一内容的三语版本。API 页面对应链接由同步脚本写入 `x-mint.metadata`，新增指南页面时也应补齐对应链接。

环境迁移前后运行同一脚本，基线文件放在仓库外：

```bash
node scripts/check-api-environments.mjs --record=/tmp/yeahpay-api-before.json
# 完成环境改造后对照生产 URL、签名路径和接口契约：
node scripts/check-api-environments.mjs --public --baseline=/tmp/yeahpay-api-before.json
```

脚本使用虚拟凭据执行实际签名函数，不发送交易请求。日常可运行 `npm run docs:generate` 重建产物，运行 `npm run docs:check` 检查同步与环境。

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
| `embedded-checkout.mdx`、`embedded-checkout-sdk.mdx` | 嵌入式收银台流程和前端 SDK 接入；英文对应页位于 `en/` |
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
4. 全局 OpenAPI 默认服务器为 acceptance 测试地址；`getRedirectUrl`、`createIntent`、`queryIntentStatus` 通过操作级 `servers` 使用独立 Checkout 入口：测试 `https://t-acquire-business.lepass.cn/gwp/checkout`，生产 `https://open-api.yeahpay.net/gwp/checkout`。`x-environment: test/production` 同步签名工具的环境选项；签名路径保留 `/checkout`、去掉 `/gwp`。Checkout 沙箱入口仍待确认，不从 acceptance 地址推导。
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
