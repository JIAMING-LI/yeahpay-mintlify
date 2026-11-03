import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import assert from "node:assert/strict";
import { hkText, hkProse } from "./zh-hk-text.mjs";

const root = new URL("../", import.meta.url);
const check = process.argv.includes("--check");
const source = JSON.parse(await readFile(new URL("openapi.json", root), "utf8"));
const pages = (await readdir(root)).filter(name => name.endsWith(".mdx"));
const routeMap = new Map();
const slug = value => value.toLowerCase().replaceAll(" ", "-");
for (const item of [...Object.values(source.paths), ...Object.values(source.webhooks ?? {})]) {
  for (const operation of Object.values(item)) {
    if (!operation?.operationId) continue;
    const tag = operation.tags?.[0];
    const original = `/api-reference/${tag ? `${slug(tag)}/` : ""}${slug(operation.summary)}`;
    const translated = `/zh-hk/api-reference/${tag ? `${slug(hkText(tag))}/` : ""}${slug(hkText(operation.summary))}`;
    routeMap.set(original, translated);
  }
}
const pageNames = new Set(pages.map(name => name.slice(0, -4)));
function localLink(value) {
  if (!value.startsWith("/") || value.startsWith("//")) return value;
  const [pathAndQuery, hash] = value.split("#");
  const [path, query] = pathAndQuery.split("?");
  const localized = routeMap.get(path) ?? (path === "/" ? "/zh-hk" : pageNames.has(path.slice(1)) ? `/zh-hk${path}` : path);
  return localized + (query ? `?${query}` : "") + (hash ? `#${hkText(decodeURIComponent(hash))}` : "");
}
function mdx(text) {
  const blocks = text.split(/(^[ \t]*```[^\n]*\n[\s\S]*?^[ \t]*```[ \t]*$)/gm);
  return blocks.map((block, index) => {
    if (index % 2) {
      let code = block.split("\n").map(line => /^\s*\/\//.test(line) ? hkText(line) : line).join("\n");
      // Localize only known presentation strings; request payloads and protocol values stay literal.
      for (const label of ["沙箱请求地址：", "签名 URL：", "生产支付意图请求地址：", "正在加载收银台", "请在收银台内重新加载", "会话不可用，请查询原订单结果", "无法加载收银台，请通过商户后端确认原订单"]) code = code.replaceAll(label, hkText(label));
      return code.replace('<html lang="zh-CN">', '<html lang="zh-HK">');
    }
    const targets = [];
    const hold = value => `YEAHPAYLINK${targets.push(localLink(value)) - 1}TOKEN`;
    let output = block.replace(/\]\((\/[^)\s]+)\)/g, (_, value) => `](${hold(value)})`)
      .replace(/href="(\/[^"\s]+)"/g, (_, value) => `href="${hold(value)}"`);
    output = hkProse(output).replace(/YEAHPAYLINK(\d+)TOKEN/g, (_, i) => targets[Number(i)]);
    return output.replace('locale="zh"', 'locale="zh-HK"');
  }).join("").replace(/^[ \t]+$/gm, "");
}
function translate(value, key = "", parentKey = "") {
  if (["example", "enum", "const", "default", "$ref"].includes(key)) return value;
  if (key === "examples") {
    if (Array.isArray(value)) return value;
    return Object.fromEntries(Object.entries(value).map(([name, example]) => [name,
      Object.fromEntries(Object.entries(example).map(([field, item]) => [field,
        ["summary", "description"].includes(field) && typeof item === "string" ? hkProse(item) : item,
      ])),
    ]));
  }
  if (typeof value === "string") {
    if (["description", "summary", "title"].includes(key)) return hkProse(value);
    if (key === "name" && parentKey === "tags") return hkText(value);
    return value;
  }
  if (Array.isArray(value)) return key === "tags" ? value.map(item => typeof item === "string" ? hkText(item) : translate(item, "", "tags")) : value.map(item => translate(item, key, parentKey));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([nestedKey, item]) => [nestedKey, translate(item, nestedKey, key || parentKey)]));
  return value;
}
const spec = translate(source);
function protocol(value, key = "") {
  if (["example", "enum", "const", "default", "$ref"].includes(key)) return value;
  if (key === "examples") {
    if (Array.isArray(value)) return value;
    return Object.fromEntries(Object.entries(value).map(([name, example]) => [name,
      Object.fromEntries(Object.entries(example).filter(([field]) => !["summary", "description"].includes(field))),
    ]));
  }
  if (Array.isArray(value)) return value.map(item => protocol(item));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value)
    .filter(([name, item]) => name !== "x-mint" && !(name === "tags" && Array.isArray(item)) && !(["description", "summary", "title"].includes(name) && typeof item === "string"))
    .map(([name, item]) => [name, protocol(item, name)]));
  return value;
}
assert.deepEqual(protocol(spec), protocol(source), "Localization changed protocol data");
for (const path of Object.keys(source.paths)) {
  for (const method of Object.keys(source.paths[path])) {
    const operation = spec.paths[path][method];
    if (!operation?.operationId) continue;
    operation["x-mint"] = { ...(operation["x-mint"] ?? {}), content: `<Card title="網上簽名測試" href="/zh-hk/api-tester?operationId=${operation.operationId}">使用此介面參數產生請求簽名和 cURL。</Card>` };
  }
}
const outputs = new Map([["openapi-zh-hk.json", `${JSON.stringify(spec, null, 2)}\n`]]);
for (const page of pages) outputs.set(`zh-hk/${page}`, mdx(await readFile(new URL(page, root), "utf8")));
const snippetPath = "snippets/signed-api-playground.jsx";
const snippet = await readFile(new URL(snippetPath, root), "utf8");
const start = "    // BEGIN AUTO-GENERATED HONG KONG TEXT";
const end = "    // END AUTO-GENERATED HONG KONG TEXT";
const zhStart = snippet.indexOf("    zh: ") + "    zh: ".length;
const zhEnd = snippet.indexOf("\n    },", zhStart) + "\n    }".length;
assert.ok(zhStart > 0 && zhEnd > zhStart && snippet.includes(start) && snippet.includes(end));
const zh = new Function(`return (${snippet.slice(zhStart, zhEnd)})`)();
const localized = value => typeof value === "string" ? hkText(value) : Array.isArray(value) ? value.map(localized) : Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localized(item)]));
const labels = JSON.stringify(localized(zh), null, 2).split("\n").map((line, index) => `${index ? "    " : '    "zh-HK": '}${line}`).join("\n") + ",";
outputs.set(snippetPath, snippet.slice(0, snippet.indexOf(start)) + `${start}\n${labels}\n${end}` + snippet.slice(snippet.indexOf(end) + end.length));
const drift = [];
for (const [path, expected] of outputs) {
  const url = new URL(path, root);
  const current = await readFile(url, "utf8").catch(error => { if (error.code === "ENOENT") return null; throw error; });
  if (current === expected) continue;
  drift.push(path);
  if (!check) { await mkdir(new URL("./", url), { recursive: true }); await writeFile(url, expected); }
}
if (check && drift.length) throw new Error(`Hong Kong artifacts are out of sync:\n${drift.join("\n")}`);
console.log(check ? "Hong Kong artifacts are synchronized." : `Generated Hong Kong artifacts: ${drift.length} updated.`);
