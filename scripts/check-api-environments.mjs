import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

// Offline checks only: execute the real playground signer with synthetic credentials.
const root = new URL("../", import.meta.url);
const args = process.argv.slice(2);
const option = name => args.find(arg => arg.startsWith(`${name}=`))?.slice(name.length + 1);
const publicMode = args.includes("--public");
const spec = JSON.parse(await readFile(new URL("openapi.json", root), "utf8"));
const jsx = await readFile(new URL("snippets/signed-api-playground.jsx", root), "utf8");
const generated = jsx.split("  const operationDefinitions = ")[1]?.split("\n  // END AUTO-GENERATED OPENAPI OPERATIONS")[0];
assert.ok(generated, "Generated playground definitions are missing");
const operations = JSON.parse(generated);
const between = (start, end) => {
  assert.ok(jsx.includes(start) && jsx.includes(end), `Missing runtime marker: ${start}`);
  return jsx.split(start)[1].split(end)[0].trim();
};
const environments = new Function("text", `return ${between("  const environments = ", "  // BEGIN AUTO-GENERATED OPENAPI OPERATIONS")}`)({ test: "Test", sandbox: "Sandbox", production: "Production" });
const environmentsFor = new Function("environments", `return ${between("  const environmentsFor = ", "  const resetExample")}`)(environments);
const endpointFor = jsx.includes("  const endpointFor = ")
  ? new Function(`return ${between("  const endpointFor = ", "  const signingUrlFor")}`)()
  : (base, path) => `${base}${path}`;
const signingUrlFor = new Function("endpointFor", `return ${between("  const signingUrlFor = ", "  const copyValue")}`)(endpointFor);
const toBase64 = new Function(`return ${between("  const toBase64 = ", jsx.includes("  const endpointFor = ") ? "  const endpointFor" : "  const signingUrlFor")}`)();
const signer = new Function("context", `const { appId, appKey, rawBody, text, environment, selectedOperationId, operationForId, environmentsFor, signingUrlFor, endpointFor, createNonce, toBase64, setError, setGenerating, setResult } = context; return (${between("  const generateSignature = ", "  const selectedOperation = ")})();`);
const checkoutIds = new Set(["getRedirectUrl", "createIntent", "queryIntentStatus"]);
const domain = "https://open-api.yeahpay.net";
const expected = (operation, environment) => {
  const prefix = environment === "sandbox" ? "/acceptance/sandbox" : checkoutIds.has(operation.operationId) ? "/gwp/checkout" : "/acceptance/acceptance-open-api";
  const signingPrefix = environment === "sandbox" ? "/sandbox" : checkoutIds.has(operation.operationId) ? "/checkout" : "/acceptance-open-api";
  return { endpoint: `${domain}${prefix}${operation.path}`, signUrl: `${signingPrefix}${operation.path}` };
};
const sourceOperations = Object.entries(spec.paths).flatMap(([path, item]) => Object.entries(item)
  .filter(([, operation]) => operation?.operationId)
  .map(([method, operation]) => ({ path, method: method.toUpperCase(), ...operation })));
assert.equal(sourceOperations.length, operations.length);
assert.equal(operations.length, 26, "Keep all existing operations except the six removed QR endpoints");
assert.ok(!sourceOperations.some(operation => operation.path.startsWith("/order/")));
assert.ok(sourceOperations.some(operation => operation.operationId === "reversalOperation"));
assert.ok(!sourceOperations.some(operation => ["createRefund", "listRefunds"].includes(operation.operationId)));
const production = {};
let signedCases = 0;
for (const operation of operations) {
  const source = sourceOperations.find(item => item.operationId === operation.operationId);
  assert.equal(source.path, operation.path);
  const available = environmentsFor(operation);
  if (publicMode) {
    assert.deepEqual(Object.keys(available).sort(), ["production", "sandbox"]);
    const servers = source.servers ?? spec.paths[source.path].servers ?? spec.servers;
    assert.deepEqual(Object.fromEntries(servers.map(server => [server["x-environment"], server.url])), operation.serverUrls);
  }
  for (const environment of publicMode ? ["production", "sandbox"] : ["production"]) {
    const base = available[environment]?.baseUrl;
    assert.ok(base, `${operation.operationId}: missing ${environment}`);
    const fixture = expected(operation, environment);
    assert.equal(endpointFor(base, operation.path), fixture.endpoint);
    assert.equal(signingUrlFor(base, operation.path), fixture.signUrl);
    let result;
    const errors = [];
    const rawBody = JSON.stringify(operation.sampleBody);
    const appKey = "SAMPLE_NOT_A_REAL_KEY";
    await signer({ appId: " SAMPLE_APP_ID ", appKey, rawBody, text: {}, environment, selectedOperationId: operation.operationId,
      operationForId: id => operations.find(item => item.operationId === id), environmentsFor, signingUrlFor, endpointFor,
      createNonce: () => "0123456789abcdef0123456789abcdef", toBase64,
      setError: error => { if (error) errors.push(error); }, setGenerating: () => {}, setResult: value => { result = value; } });
    assert.deepEqual(errors, []);
    assert.ok(result, `${operation.operationId}: signer did not return a result`);
    assert.equal(result.endpoint, fixture.endpoint);
    assert.equal(result.signUrl, fixture.signUrl);
    const signText = [fixture.signUrl, "SAMPLE_APP_ID", result.headers.timestamp, "1.0", result.headers.nonce, rawBody, appKey].join("\n");
    assert.equal(result.signature, createHash("sha512").update(signText, "utf8").digest("base64"));
    assert.ok(result.curl.includes(`--url '${fixture.endpoint}'`));
    assert.ok(!result.curl.includes(appKey));
    assert.ok(!Object.hasOwn(result.headers, "appKey"));
    signedCases++;
    if (environment === "production") production[operation.operationId] = fixture;
  }
}
if (publicMode) {
  assert.ok(!jsx.includes("https://t-acquire-business.lepass.cn"));
  assert.match(jsx, /\[environment, setEnvironment\] = useState\("sandbox"\)/);
  assert.equal(signingUrlFor(`${domain}/gwp/checkout/`, "/openapi/v2/createIntent"), "/checkout/openapi/v2/createIntent");
  // Execute each published JavaScript signing example with a local fetch stub.
  for (const page of ["signature.mdx", "en/signature.mdx", "zh-hk/signature.mdx"]) {
    const markdown = await readFile(new URL(page, root), "utf8");
    const sample = markdown.match(/```javascript\n([\s\S]*?)\n\s*```/)?.[1];
    assert.ok(sample?.includes('from "node:crypto"'), `${page}: missing signing example`);
    const body = sample.replace(/import \{ createHash, randomUUID \} from "node:crypto";/, "");
    const appId = "SAMPLE_APP_ID";
    const apiKey = "SAMPLE_NOT_A_REAL_KEY";
    let captured;
    const fetch = async (url, request) => {
      assert.equal(captured, undefined, `${page}: unexpected extra request`);
      captured = { url, request };
      return { status: 200, text: async () => "LOCAL_STUB" };
    };
    await new Function("createHash", "randomUUID", "process", "fetch", "console", `return (async () => {${body}\n})();`)(
      createHash, randomUUID, { env: { YEAHPAY_APP_ID: appId, YEAHPAY_API_KEY: apiKey } }, fetch, { log: () => {} });
    assert.equal(captured.url, `${domain}/acceptance/sandbox/consent-payment/customers/query`, page);
    const { headers } = captured.request;
    const signText = ["/sandbox/consent-payment/customers/query", appId, headers.timestamp, headers.version, headers.nonce, captured.request.body, apiKey].join("\n");
    assert.equal(headers.signature, createHash("sha512").update(signText, "utf8").digest("base64"), page);
    assert.ok(!Object.hasOwn(headers, "apiKey"));
    assert.deepEqual(JSON.parse(captured.request.body), { merchantId: "YOUR_MERCHANT_ID", merchantCustomerId: "YOUR_CUSTOMER_REFERENCE" });
  }
}
const contracts = sourceOperations.map(operation => ({ operationId: operation.operationId, method: operation.method, path: operation.path,
  requestBody: operation.requestBody, responses: operation.responses, parameters: operation.parameters, security: operation.security }));
// Page navigation metadata is not part of the notification payload contract.
const webhooks = structuredClone(spec.webhooks);
for (const item of Object.values(webhooks ?? {})) for (const operation of Object.values(item)) if (operation?.operationId) delete operation["x-mint"];
const snapshot = { production, contractHash: createHash("sha256").update(JSON.stringify({ contracts, schemas: spec.components.schemas, webhooks })).digest("hex") };
if (option("--record")) await writeFile(option("--record"), `${JSON.stringify(snapshot, null, 2)}\n`);
if (option("--baseline")) {
  const baseline = JSON.parse(await readFile(option("--baseline"), "utf8"));
  assert.deepEqual(snapshot.production, baseline.production, "Production URLs and signing paths changed");
  assert.equal(snapshot.contractHash, baseline.contractHash, "Request, response, schema, or webhook contracts changed during environment migration");
}
console.log(`PASS: ${operations.length} operations, ${signedCases} real signer cases (${publicMode ? "production + sandbox" : "pre-migration production baseline"})${publicMode ? ", 3 published signing examples" : ""}, no network requests.`);
