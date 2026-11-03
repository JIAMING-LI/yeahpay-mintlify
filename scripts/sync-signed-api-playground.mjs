import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const mode = process.argv[2] ?? "--check";
if (!new Set(["--check", "--write"]).has(mode)) {
  throw new Error("Usage: node scripts/sync-signed-api-playground.mjs [--check|--write]");
}

const rootUrl = new URL("../", import.meta.url);
const zhSpecUrl = new URL("openapi.json", rootUrl);
const enSpecUrl = new URL("openapi-en.json", rootUrl);
const hkSpecUrl = new URL("openapi-zh-hk.json", rootUrl);
const componentUrl = new URL("snippets/signed-api-playground.jsx", rootUrl);
const startMarker = "  // BEGIN AUTO-GENERATED OPENAPI OPERATIONS";
const endMarker = "  // END AUTO-GENERATED OPENAPI OPERATIONS";
const methods = ["get", "post", "put", "patch", "delete"];

const parse = async (url) => JSON.parse(await readFile(url, "utf8"));
const zhSpec = await parse(zhSpecUrl);
const enSpec = await parse(enSpecUrl);
const hkSpec = await parse(hkSpecUrl).catch(error => { if (error.code === "ENOENT") return null; throw error; });
const component = await readFile(componentUrl, "utf8");

function resolveRef(spec, input) {
  if (!input?.$ref) return input ?? {};
  return input.$ref
    .replace(/^#\//, "")
    .split("/")
    .reduce(
      (current, segment) => current?.[segment.replaceAll("~1", "/").replaceAll("~0", "~")],
      spec
    );
}

function collectProperties(spec, input, seen = new Set()) {
  const schema = resolveRef(spec, input);
  if (!schema || seen.has(schema)) return {};
  seen.add(schema);
  const properties = { ...(schema.properties ?? {}) };
  for (const part of schema.allOf ?? []) {
    Object.assign(properties, collectProperties(spec, part, seen));
  }
  return properties;
}

function sampleString(name, schema) {
  const normalized = name.toLowerCase();
  if (schema.format === "uri" || normalized.endsWith("url") || normalized === "callback") {
    return "https://merchant.example.com/yeahpay/callback";
  }
  if (normalized.includes("timestamp")) return "TIMESTAMP";
  if (normalized.includes("merchantid")) return "SAMPLE_MERCHANT_ID";
  if (normalized.includes("refundid")) return "REFUND_TIMESTAMP";
  if (normalized.includes("orderid")) return "ORDER_TIMESTAMP";
  if (normalized.includes("currency")) return "SGD";
  if (normalized === "lang") return "zh-CN";
  if (normalized.includes("amount")) return "100";
  if (normalized.includes("ip")) return "127.0.0.1";
  if (normalized.includes("goodslist")) return "[]";
  return `SAMPLE_${name.replace(/([a-z])([A-Z])/g, "$1_$2").toUpperCase()}`;
}

function sampleValue(spec, input, name, depth = 0) {
  const schema = resolveRef(spec, input);
  if (!schema || depth > 6) return null;
  if (schema.example !== undefined) return schema.example;
  if (schema["x-default"] !== undefined) return schema["x-default"];
  if (schema.default !== undefined) return schema.default;
  if (schema.const !== undefined) return schema.const;
  if (Array.isArray(schema.enum) && schema.enum.length > 0) return schema.enum[0];

  if (schema.type === "object" || schema.properties || schema.allOf) {
    const properties = collectProperties(spec, schema);
    return Object.fromEntries(
      Object.entries(properties).map(([propertyName, propertySchema]) => [
        propertyName,
        sampleValue(spec, propertySchema, propertyName, depth + 1),
      ])
    );
  }
  if (schema.type === "array") return [sampleValue(spec, schema.items ?? {}, name, depth + 1)];
  if (schema.type === "integer" || schema.type === "number") {
    return Math.max(schema.minimum ?? 1, 100);
  }
  if (schema.type === "boolean") return false;
  return sampleString(name, schema);
}

function operationEntries(spec) {
  const entries = [];
  for (const [path, pathItem] of Object.entries(spec.paths ?? {})) {
    for (const method of methods) {
      const operation = pathItem?.[method];
      if (!operation?.operationId) continue;
      entries.push({ path, method, operation });
    }
  }
  return entries;
}

function localizedEntries(spec) {
  return [...operationEntries(spec), ...Object.entries(spec.webhooks ?? {}).flatMap(([path, item]) =>
    methods.filter(method => item[method]?.operationId).map(method => ({ path, method, operation: item[method] })))];
}

// Explicit counterparts keep the language selector available across translated tab names.
const localizedSpecs = [["zh-CN", "", zhSpec], ["en", "/en", enSpec], ...(hkSpec ? [["zh-Hant", "/zh-hk", hkSpec]] : [])];
const localizedRoutes = new Map();
const slug = value => value.toLowerCase().replaceAll(" ", "-");
for (const [language, prefix, spec] of localizedSpecs) {
  for (const { operation } of localizedEntries(spec)) {
    const links = localizedRoutes.get(operation.operationId) ?? {};
    links[`${language}_link`] = encodeURI(`${prefix}/api-reference/${operation.tags?.[0] ? `${slug(operation.tags[0])}/` : ""}${slug(operation.summary)}`);
    localizedRoutes.set(operation.operationId, links);
  }
}
for (const [, , spec] of localizedSpecs) {
  for (const { operation } of localizedEntries(spec)) {
    operation["x-mint"] = { ...(operation["x-mint"] ?? {}), metadata: { ...(operation["x-mint"]?.metadata ?? {}), ...localizedRoutes.get(operation.operationId) } };
  }
}

function addTesterLinks(spec, locale) {
  for (const { operation } of operationEntries(spec)) {
    const hrefPrefix = locale === "zh" ? "/api-tester" : locale === "zh-HK" ? "/zh-hk/api-tester" : "/en/api-tester";
    const title = locale === "zh" ? "在线签名调试" : locale === "zh-HK" ? "網上簽名測試" : "Signed request tester";
    const body = locale === "zh"
      ? "使用此接口参数生成请求签名和 cURL。"
      : locale === "zh-HK" ? "使用此介面參數產生請求簽名和 cURL。" : "Generate the signature and cURL for this operation.";
    operation["x-mint"] = {
      ...(operation["x-mint"] ?? {}),
      content: `<Card title="${title}" href="${hrefPrefix}?operationId=${operation.operationId}">${body}</Card>`,
    };
  }
}

addTesterLinks(zhSpec, "zh");
addTesterLinks(enSpec, "en");
if (hkSpec) addTesterLinks(hkSpec, "zh-HK");

const definitions = operationEntries(zhSpec).map(({ path, method, operation }) => {
  const enOperation = enSpec.paths?.[path]?.[method];
  const hkOperation = hkSpec?.paths?.[path]?.[method];
  if (hkSpec && !hkOperation?.operationId) throw new Error(`Hong Kong OpenAPI is missing ${method.toUpperCase()} ${path}`);
  if (!enOperation?.operationId) {
    throw new Error(`English OpenAPI is missing ${method.toUpperCase()} ${path}`);
  }
  const requestSchema = operation.requestBody?.content?.["application/json"]?.schema ?? {
    type: "object",
  };
  const overrideServers = operation.servers ?? zhSpec.paths[path].servers ?? zhSpec.servers;
  const serverUrls = overrideServers && Object.fromEntries(overrideServers.map((server) => {
    if (!["test", "sandbox", "production"].includes(server["x-environment"])) {
      throw new Error(`An environment is required for the server override on ${operation.operationId}`);
    }
    return [server["x-environment"], server.url];
  }));
  return {
    operationId: operation.operationId,
    method: method.toUpperCase(),
    path,
    summaryZh: operation.summary ?? operation.operationId,
    summaryEn: enOperation.summary ?? enOperation.operationId,
    ...(hkOperation ? { summaryHk: hkOperation.summary ?? hkOperation.operationId } : {}),
    ...(serverUrls ? { serverUrls } : {}),
    sampleBody: sampleValue(zhSpec, requestSchema, "body"),
  };
});

const fingerprint = createHash("sha256")
  .update(JSON.stringify(definitions))
  .digest("hex")
  .slice(0, 16);
const definitionLines = JSON.stringify(definitions, null, 2).split("\n");
const definitionBlock = definitionLines
  .map((line, index) => index === 0 ? `  const operationDefinitions = ${line}` : `  ${line}`)
  .join("\n");
const generatedBlock = [
  startMarker,
  `  // Source fingerprint: ${fingerprint}`,
  definitionBlock,
  endMarker,
].join("\n");
const startIndex = component.indexOf(startMarker);
const endIndex = component.indexOf(endMarker);
if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
  throw new Error("Generated operation markers are missing from signed-api-playground.jsx");
}
const expectedComponent =
  component.slice(0, startIndex) +
  generatedBlock +
  component.slice(endIndex + endMarker.length);
const expectedZhSpec = `${JSON.stringify(zhSpec, null, 2)}\n`;
const expectedEnSpec = `${JSON.stringify(enSpec, null, 2)}\n`;
const expectedHkSpec = hkSpec ? `${JSON.stringify(hkSpec, null, 2)}\n` : null;
const currentZhSpec = await readFile(zhSpecUrl, "utf8");
const currentEnSpec = await readFile(enSpecUrl, "utf8");
const currentHkSpec = hkSpec ? await readFile(hkSpecUrl, "utf8") : null;
const drift = [];
if (component !== expectedComponent) drift.push("snippets/signed-api-playground.jsx");
if (currentZhSpec !== expectedZhSpec) drift.push("openapi.json x-mint links");
if (currentEnSpec !== expectedEnSpec) drift.push("openapi-en.json x-mint links");
if (currentHkSpec !== expectedHkSpec) drift.push("openapi-zh-hk.json x-mint links");

if (mode === "--check") {
  if (drift.length > 0) {
    console.error(`Generated OpenAPI artifacts are out of sync:\n- ${drift.join("\n- ")}\nRun: node scripts/sync-signed-api-playground.mjs --write`);
    process.exitCode = 1;
  } else {
    console.log(`Signed API playground is synchronized (${fingerprint}).`);
  }
} else {
  if (component !== expectedComponent) await writeFile(componentUrl, expectedComponent);
  if (currentZhSpec !== expectedZhSpec) await writeFile(zhSpecUrl, expectedZhSpec);
  if (currentEnSpec !== expectedEnSpec) await writeFile(enSpecUrl, expectedEnSpec);
  if (currentHkSpec !== expectedHkSpec) await writeFile(hkSpecUrl, expectedHkSpec);
  console.log(drift.length > 0
    ? `Synchronized generated OpenAPI artifacts (${fingerprint}): ${drift.join(", ")}`
    : `Generated OpenAPI artifacts already synchronized (${fingerprint}).`);
}
