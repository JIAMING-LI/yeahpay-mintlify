export const SignedApiPlayground = ({ locale = "en" }) => {
  const copyResetDelay = 1600
  const textByLocale = {
    en: {
      eyebrow: "YeahPay developer tool",
      title: "Signed API playground",
      description:
        "Build the exact request body, calculate its SHA-512 signature locally, and copy the generated values into the API playground.",
      loading: "Loading API operations...",
      loadError: "Could not load the OpenAPI specification.",
      operation: "API operation",
      environment: "Environment",
      sandbox: "Sandbox",
      production: "Production",
      credentials: "Credentials",
      storageHint: "Kept only in this page's memory",
      appId: "appId",
      appKey: "appKey",
      appIdPlaceholder: "Enter your application ID",
      appKeyPlaceholder: "Enter your API key",
      requestBody: "Request body",
      refreshExample: "Reset example",
      requestHint:
        "This exact JSON string is included in the signature. Whitespace and property order matter.",
      generate: "Generate signature",
      generating: "Generating...",
      required: "Enter both appId and appKey.",
      invalidJson: "The request body must be valid JSON.",
      unsupported: "This browser does not support Web Crypto.",
      generationError: "Could not generate the signature.",
      output: "Signed request",
      outputDescription: "Generated locally. Your appKey is never included in the request.",
      waiting: "Complete the request on the left, then generate its signature.",
      endpoint: "Endpoint",
      signingUrl: "Signing URL",
      headers: "Headers",
      signature: "signature",
      curl: "cURL",
      copy: "Copy",
      copied: "Copied",
      useInPlayground: "Use these values in Mintlify",
      useSteps: [
        "Enter the same body values in the API playground.",
        "Copy appId, version, timestamp, nonce, algorithm, and signature into the matching header fields.",
        "Do not send appKey. It is used only for local signing.",
      ],
      serializationWarning:
        "The signature is valid only if Mintlify serializes the body exactly as shown here. The generated cURL is the most reliable request sample.",
      selectOperation: "Select an API operation",
    },
    zh: {
      eyebrow: "YeahPay 开发者工具",
      title: "API 签名调试台",
      description: "生成准确的请求体，在浏览器本地计算 SHA-512 签名，然后将结果复制到 API Playground。",
      loading: "正在加载接口...",
      loadError: "无法加载 OpenAPI 文件。",
      operation: "API 接口",
      environment: "环境",
      sandbox: "沙箱环境",
      production: "生产环境",
      credentials: "应用凭证",
      storageHint: "仅保存在当前页面内存中",
      appId: "appId",
      appKey: "appKey",
      appIdPlaceholder: "请输入应用 ID",
      appKeyPlaceholder: "请输入 API 密钥",
      requestBody: "请求体",
      refreshExample: "重置示例",
      requestHint: "签名会使用这里完整的 JSON 字符串，空格和字段顺序都会影响签名。",
      generate: "生成签名",
      generating: "正在生成...",
      required: "请输入 appId 和 appKey。",
      invalidJson: "请求体必须是有效的 JSON。",
      unsupported: "当前浏览器不支持 Web Crypto。",
      generationError: "无法生成签名。",
      output: "签名请求",
      outputDescription: "全部在浏览器本地生成，appKey 不会放入请求。",
      waiting: "在左侧填写请求参数，然后生成签名。",
      endpoint: "请求地址",
      signingUrl: "签名 URL",
      headers: "公共请求头",
      signature: "signature",
      curl: "cURL",
      copy: "复制",
      copied: "已复制",
      useInPlayground: "复制到 Mintlify API Playground",
      useSteps: [
        "在 API Playground 中填写与左侧完全相同的请求参数。",
        "把 appId、version、timestamp、nonce、algorithm 和 signature 复制到对应 Header。",
        "不要发送 appKey，它只用于本地签名。",
      ],
      serializationWarning: "只有 Mintlify 生成的请求体与这里完全一致时签名才有效；生成的 cURL 是最可靠的请求示例。",
      selectOperation: "请选择 API 接口",
    },
    // BEGIN AUTO-GENERATED HONG KONG TEXT
    "zh-HK": {
      "eyebrow": "YeahPay 開發者工具",
      "title": "API 簽名測試台",
      "description": "產生準確的請求體，在瀏覽器本地計算 SHA-512 簽名，然後將結果複製到 API Playground。",
      "loading": "正在載入介面...",
      "loadError": "無法載入 OpenAPI 文件。",
      "operation": "API 介面",
      "environment": "環境",
      "sandbox": "沙盒環境",
      "production": "生產環境",
      "credentials": "應用憑證",
      "storageHint": "僅保存在當前頁面內存中",
      "appId": "appId",
      "appKey": "appKey",
      "appIdPlaceholder": "請輸入應用 ID",
      "appKeyPlaceholder": "請輸入 API 密鑰",
      "requestBody": "請求體",
      "refreshExample": "重置示例",
      "requestHint": "簽名會使用這裏完整的 JSON 字符串，空格和字段順序都會影響簽名。",
      "generate": "產生簽名",
      "generating": "正在產生...",
      "required": "請輸入 appId 和 appKey。",
      "invalidJson": "請求體必須是有效的 JSON。",
      "unsupported": "當前瀏覽器不支持 Web Crypto。",
      "generationError": "無法產生簽名。",
      "output": "簽名請求",
      "outputDescription": "全部在瀏覽器本地產生，appKey 不會放入請求。",
      "waiting": "在左側填寫請求參數，然後產生簽名。",
      "endpoint": "請求地址",
      "signingUrl": "簽名 URL",
      "headers": "公共請求頭",
      "signature": "signature",
      "curl": "cURL",
      "copy": "複製",
      "copied": "已複製",
      "useInPlayground": "複製到 Mintlify API Playground",
      "useSteps": [
        "在 API Playground 中填寫與左側完全相同的請求參數。",
        "把 appId、version、timestamp、nonce、algorithm 和 signature 複製到對應 Header。",
        "不要發送 appKey，它只用於本地簽名。"
      ],
      "serializationWarning": "只有 Mintlify 產生的請求體與這裏完全一致時簽名才有效；產生的 cURL 是最可靠的請求示例。",
      "selectOperation": "請選擇 API 介面"
    },
    // END AUTO-GENERATED HONG KONG TEXT
  }
  const text = textByLocale[locale] ?? textByLocale.en
  const environments = {
    sandbox: {
      label: text.sandbox,
    },
    production: {
      label: text.production,
    },
  }
  // BEGIN AUTO-GENERATED OPENAPI OPERATIONS
  // Source fingerprint: 483ecdb9b013257e
  const operationDefinitions = [
    {
      "operationId": "getRedirectUrl",
      "method": "POST",
      "path": "/openapi/v2/getRedirectUrl",
      "summaryZh": "获取统一收银台地址",
      "summaryEn": "Get Unified Checkout URL",
      "summaryHk": "取得統一收銀台地址",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/gwp/checkout"
      },
      "sampleBody": {
        "merchantId": "SAMPLE_MERCHANT_ID",
        "merchantOrderId": "ORDER_TIMESTAMP",
        "amount": 1000,
        "currency": "SGD",
        "productType": "VIRTUAL",
        "productList": [
          {
            "productName": "Monthly plan",
            "quantity": 1,
            "unitPrice": 1000
          }
        ],
        "consumerInfo": {
          "firstName": "Tan",
          "lastName": "Mei",
          "email": "buyer@example.com"
        },
        "locale": "en-US",
        "callbackUrl": "https://merchant.example.com/yeahpay/callback",
        "notificationUrl": "https://merchant.example.com/yeahpay/notify"
      }
    },
    {
      "operationId": "createIntent",
      "method": "POST",
      "path": "/openapi/v2/createIntent",
      "summaryZh": "创建支付意图",
      "summaryEn": "Create PaymentIntent",
      "summaryHk": "建立支付意圖",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/gwp/checkout"
      },
      "sampleBody": {
        "merchantId": "SAMPLE_MERCHANT_ID",
        "requestId": "pay-TIMESTAMP",
        "merchantOrderId": "ORDER-TIMESTAMP",
        "amount": 1000,
        "currency": "SGD",
        "checkout": {
          "buttonType": "PAY",
          "locale": "en-US"
        },
        "callback": {
          "returnUrl": "https://shop.example.com/payment/result",
          "notificationUrl": "https://shop.example.com/payment/notify"
        }
      }
    },
    {
      "operationId": "queryIntentStatus",
      "method": "POST",
      "path": "/openapi/v2/queryIntentStatus",
      "summaryZh": "查询支付意图",
      "summaryEn": "Query PaymentIntent",
      "summaryHk": "查詢支付意圖",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/gwp/checkout"
      },
      "sampleBody": {
        "merchantId": "SAMPLE_MERCHANT_ID",
        "merchantOrderId": "ORDER-TIMESTAMP"
      }
    },
    {
      "operationId": "createConsentCustomer",
      "method": "POST",
      "path": "/consent-payment/customers/create",
      "summaryZh": "创建客户",
      "summaryEn": "Create customer",
      "summaryHk": "建立客戶",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "merchantId": "SAMPLE_MERCHANT_ID",
        "merchantCustomerId": "SAMPLE_MERCHANT_CUSTOMER_ID",
        "firstName": "SAMPLE_FIRST_NAME",
        "lastName": "SAMPLE_LAST_NAME",
        "email": "SAMPLE_EMAIL",
        "phone": "SAMPLE_PHONE",
        "address": {
          "countryCode": "SAMPLE_COUNTRY_CODE",
          "state": "SAMPLE_STATE",
          "city": "SAMPLE_CITY",
          "district": "SAMPLE_DISTRICT",
          "postalCode": "SAMPLE_POSTAL_CODE",
          "street": "SAMPLE_STREET"
        }
      }
    },
    {
      "operationId": "updateConsentCustomer",
      "method": "POST",
      "path": "/consent-payment/customers/update",
      "summaryZh": "更新客户",
      "summaryEn": "Update customer",
      "summaryHk": "更新客戶",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "merchantId": "SAMPLE_MERCHANT_ID",
        "customerId": "SAMPLE_CUSTOMER_ID",
        "merchantCustomerId": "SAMPLE_MERCHANT_CUSTOMER_ID",
        "firstName": "SAMPLE_FIRST_NAME",
        "lastName": "SAMPLE_LAST_NAME",
        "email": "SAMPLE_EMAIL",
        "phone": "SAMPLE_PHONE",
        "address": {
          "countryCode": "SAMPLE_COUNTRY_CODE",
          "state": "SAMPLE_STATE",
          "city": "SAMPLE_CITY",
          "district": "SAMPLE_DISTRICT",
          "postalCode": "SAMPLE_POSTAL_CODE",
          "street": "SAMPLE_STREET"
        }
      }
    },
    {
      "operationId": "queryConsentCustomer",
      "method": "POST",
      "path": "/consent-payment/customers/query",
      "summaryZh": "查询客户",
      "summaryEn": "Query customer",
      "summaryHk": "查詢客戶",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "merchantId": "SAMPLE_MERCHANT_ID",
        "customerId": "SAMPLE_CUSTOMER_ID",
        "merchantCustomerId": "SAMPLE_MERCHANT_CUSTOMER_ID"
      }
    },
    {
      "operationId": "queryCustomerConsents",
      "method": "POST",
      "path": "/consent-payment/customers/consents",
      "summaryZh": "查询客户授权",
      "summaryEn": "Query customer consents",
      "summaryHk": "查詢客戶授權",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "pageSize": 100,
        "currentPage": 100,
        "form": {
          "merchantId": "SAMPLE_MERCHANT_ID",
          "customerId": "SAMPLE_CUSTOMER_ID"
        }
      }
    },
    {
      "operationId": "queryConsent",
      "method": "POST",
      "path": "/consent-payment/consents/query",
      "summaryZh": "查询授权",
      "summaryEn": "Query consent",
      "summaryHk": "查詢授權",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "merchantId": "SAMPLE_MERCHANT_ID",
        "consentId": "SAMPLE_CONSENT_ID",
        "customerId": "SAMPLE_CUSTOMER_ID",
        "merchantCustomerId": "SAMPLE_MERCHANT_CUSTOMER_ID"
      }
    },
    {
      "operationId": "cancelConsent",
      "method": "POST",
      "path": "/consent-payment/consents/cancel",
      "summaryZh": "取消授权",
      "summaryEn": "Cancel consent",
      "summaryHk": "取消授權",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "merchantId": "SAMPLE_MERCHANT_ID",
        "consentId": "SAMPLE_CONSENT_ID",
        "reason": "SAMPLE_REASON"
      }
    },
    {
      "operationId": "activateConsent",
      "method": "POST",
      "path": "/consent-payment/consents/activate",
      "summaryZh": "重新启用授权",
      "summaryEn": "Reactivate consent",
      "summaryHk": "重新啓用授權",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "merchantId": "SAMPLE_MERCHANT_ID",
        "consentId": "SAMPLE_CONSENT_ID",
        "reason": "SAMPLE_REASON"
      }
    },
    {
      "operationId": "createConsentCharge",
      "method": "POST",
      "path": "/consent-payment/charges/create",
      "summaryZh": "发起后续扣款",
      "summaryEn": "Initiate subsequent charge",
      "summaryHk": "發起後續扣款",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "merchantId": "SAMPLE_MERCHANT_ID",
        "consentId": "SAMPLE_CONSENT_ID",
        "merchantOrderId": "ORDER_TIMESTAMP",
        "amount": 100,
        "currency": "SGD",
        "notifyUrl": "https://merchant.example.com/yeahpay/callback",
        "description": "127.0.0.1"
      }
    },
    {
      "operationId": "listConsentCharges",
      "method": "POST",
      "path": "/consent-payment/charges/list",
      "summaryZh": "查询扣款列表",
      "summaryEn": "List charges",
      "summaryHk": "查詢扣款列表",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "pageSize": 100,
        "currentPage": 100,
        "form": {
          "merchantId": "SAMPLE_MERCHANT_ID",
          "consentId": "SAMPLE_CONSENT_ID"
        }
      }
    },
    {
      "operationId": "reversalOperation",
      "method": "POST",
      "path": "/unified/reversalOperation",
      "summaryZh": "统一撤销或退款",
      "summaryEn": "Unified reversal or refund",
      "summaryHk": "統一撤銷或退款",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "sceneType": 1,
        "merchantId": "SAMPLE_MERCHANT_ID",
        "notifyUrl": "https://merchant.example.com/yeahpay/callback",
        "amount": 100,
        "leshuaOrderId": "ORDER_TIMESTAMP",
        "posNo": "SAMPLE_POS_NO",
        "merchantRefundId": "REFUND_TIMESTAMP",
        "terminalId": "SAMPLE_TERMINAL_ID",
        "oriThirdOrderId": "ORDER_TIMESTAMP",
        "thirdOrderId": "ORDER_TIMESTAMP",
        "language": "SAMPLE_LANGUAGE"
      }
    },
    {
      "operationId": "preAuthCompleteOnline",
      "method": "POST",
      "path": "/cardOrder/preAuthCompleteOnline",
      "summaryZh": "预授权完成",
      "summaryEn": "Complete Pre-Authorization",
      "summaryHk": "預授權完成",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "orderId": "ORDER_TIMESTAMP",
        "merchantId": "SAMPLE_MERCHANT_ID",
        "amount": "100",
        "currency": "SGD",
        "language": "SAMPLE_LANGUAGE"
      }
    },
    {
      "operationId": "preAuthCompleteCancelOnline",
      "method": "POST",
      "path": "/cardOrder/preAuthCompleteCancelOnline",
      "summaryZh": "预授权完成撤销",
      "summaryEn": "Cancel Pre-Authorization Completion",
      "summaryHk": "預授權完成撤銷",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "orderId": "ORDER_TIMESTAMP",
        "merchantId": "SAMPLE_MERCHANT_ID",
        "amount": "100",
        "currency": "SGD",
        "language": "SAMPLE_LANGUAGE"
      }
    },
    {
      "operationId": "batchSettleOnline",
      "method": "POST",
      "path": "/cardOrder/batchSettleOnline",
      "summaryZh": "结算请款",
      "summaryEn": "Batch Settlement",
      "summaryHk": "結算請款",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "merchantId": "SAMPLE_MERCHANT_ID",
        "language": "SAMPLE_LANGUAGE"
      }
    },
    {
      "operationId": "settleQuery",
      "method": "POST",
      "path": "/cardOrder/settleQuery",
      "summaryZh": "请款查询",
      "summaryEn": "Settlement Query",
      "summaryHk": "請款查詢",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "batchSettleId": "SAMPLE_BATCH_SETTLE_ID",
        "merchantId": "SAMPLE_MERCHANT_ID",
        "language": "SAMPLE_LANGUAGE"
      }
    },
    {
      "operationId": "createPaymentLink",
      "method": "POST",
      "path": "/payment-link/links/create",
      "summaryZh": "创建支付链接",
      "summaryEn": "Create Payment Link",
      "summaryHk": "建立支付連結",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "requestId": "createPaymentLink-TIMESTAMP-1",
        "merchantLinkNo": "LINK-1-TIMESTAMP",
        "name": "Sample payment link",
        "linkType": "FIXED_AMOUNT",
        "amount": 9900,
        "paymentLimitType": "UNLIMITED",
        "expireTime": 1924992000,
        "notifyUrl": "https://merchant.example.com/plink/callback",
        "merchantId": "SAMPLE_MERCHANT_ID"
      }
    },
    {
      "operationId": "queryPaymentLinks",
      "method": "POST",
      "path": "/payment-link/links/query",
      "summaryZh": "分页查询支付链接",
      "summaryEn": "List Payment Links",
      "summaryHk": "分頁查詢支付連結",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "createdTimeStart": 1792627200,
        "createdTimeEnd": 1792713600,
        "status": [
          "ACTIVE",
          "PENDING"
        ],
        "source": "API",
        "page": 1,
        "pageSize": 10,
        "merchantId": "SAMPLE_MERCHANT_ID"
      }
    },
    {
      "operationId": "getPaymentLinkDetail",
      "method": "POST",
      "path": "/payment-link/links/detail",
      "summaryZh": "查询支付链接详情",
      "summaryEn": "Get Payment Link Details",
      "summaryHk": "查詢支付連結詳情",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "merchantLinkNo": "LINK-TIMESTAMP",
        "includePayments": true,
        "paymentPage": 1,
        "paymentPageSize": 10,
        "merchantId": "SAMPLE_MERCHANT_ID"
      }
    },
    {
      "operationId": "modifyPaymentLink",
      "method": "POST",
      "path": "/payment-link/links/modify",
      "summaryZh": "修改支付链接",
      "summaryEn": "Modify Payment Link",
      "summaryHk": "修改支付連結",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "requestId": "modifyPaymentLink-TIMESTAMP-1",
        "merchantLinkNo": "LINK-TIMESTAMP",
        "operation": "UPDATE_FIELDS",
        "name": "Sample payment link",
        "notifyUrl": "https://merchant.example.com/plink/callback-v2",
        "merchantId": "SAMPLE_MERCHANT_ID"
      }
    },
    {
      "operationId": "createPaymentLinkProduct",
      "method": "POST",
      "path": "/payment-link/products/create",
      "summaryZh": "创建支付链接商品",
      "summaryEn": "Create Payment Link Product",
      "summaryHk": "建立支付連結商品",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "requestId": "createPaymentLinkProduct-TIMESTAMP-1",
        "merchantProductNo": "SKU-TIMESTAMP",
        "name": "Sample product",
        "price": 4900,
        "description": "Sample description",
        "imageFileId": "SAMPLE_FILE_ID",
        "merchantId": "SAMPLE_MERCHANT_ID"
      }
    },
    {
      "operationId": "queryPaymentLinkProducts",
      "method": "POST",
      "path": "/payment-link/products/query",
      "summaryZh": "分页查询支付链接商品",
      "summaryEn": "List Payment Link Products",
      "summaryHk": "分頁查詢支付連結商品",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "page": 1,
        "pageSize": 10,
        "merchantId": "SAMPLE_MERCHANT_ID"
      }
    },
    {
      "operationId": "getPaymentLinkProductDetail",
      "method": "POST",
      "path": "/payment-link/products/detail",
      "summaryZh": "查询支付链接商品详情",
      "summaryEn": "Get Payment Link Product Details",
      "summaryHk": "查詢支付連結商品詳情",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "merchantProductNo": "SKU-TIMESTAMP",
        "merchantId": "SAMPLE_MERCHANT_ID"
      }
    },
    {
      "operationId": "modifyPaymentLinkProduct",
      "method": "POST",
      "path": "/payment-link/products/modify",
      "summaryZh": "修改支付链接商品",
      "summaryEn": "Modify Payment Link Product",
      "summaryHk": "修改支付連結商品",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "requestId": "modifyPaymentLinkProduct-TIMESTAMP-1",
        "merchantProductNo": "SKU-TIMESTAMP",
        "operation": "UPDATE_FIELDS",
        "price": 5900,
        "merchantId": "SAMPLE_MERCHANT_ID"
      }
    },
    {
      "operationId": "uploadPaymentLinkImage",
      "method": "POST",
      "path": "/payment-link/attach/upload",
      "summaryZh": "上传支付链接商品图片",
      "summaryEn": "Upload Payment Link Product Image",
      "summaryHk": "上傳支付連結商品圖片",
      "serverUrls": {
        "sandbox": "https://open-api.yeahpay.net/acceptance/sandbox",
        "production": "https://open-api.yeahpay.net/acceptance/acceptance-open-api"
      },
      "sampleBody": {
        "file": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a0j8AAAAASUVORK5CYII=",
        "fileName": "sample.png",
        "merchantId": "SAMPLE_MERCHANT_ID"
      }
    }
  ]
  // END AUTO-GENERATED OPENAPI OPERATIONS
  const operations = operationDefinitions.map((operation) => ({
    ...operation,
    summary: locale === "zh" ? operation.summaryZh : locale === "zh-HK" ? operation.summaryHk : operation.summaryEn,
  }))
  const sampleBodyFor = (operation) => {
    const timestamp = Date.now().toString()
    const serialized = JSON.stringify(operation?.sampleBody ?? {})
      .replaceAll("TIMESTAMP", timestamp)
      .replaceAll('"zh-CN"', locale === "en" ? '"en"' : '"zh-CN"')
    const body = JSON.parse(serialized)
    if (operation?.path.startsWith("/payment-link/")) {
      const now = Math.floor(Date.now() / 1000)
      const offsets = {
        effectiveTime: 60,
        expireTime: 7 * 86400,
        createdTimeStart: -86400,
        createdTimeEnd: 0,
        effectiveTimeStart: -86400,
        effectiveTimeEnd: 0,
        expireTimeStart: 0,
        expireTimeEnd: 7 * 86400,
      }
      for (const [field, offset] of Object.entries(offsets)) {
        if (typeof body[field] === "number") body[field] = now + offset
      }
    }
    return body
  }

  const [selectedOperationId, setSelectedOperationId] = useState(operations[0]?.operationId ?? "")
  const [environment, setEnvironment] = useState("sandbox")
  const [appId, setAppId] = useState("")
  const [appKey, setAppKey] = useState("")
  const [rawBody, setRawBody] = useState(JSON.stringify(sampleBodyFor(operations[0]), null, 2))
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const [generating, setGenerating] = useState(false)
  const [copiedField, setCopiedField] = useState("")

  const operationForId = (operationId) => operations.find((operation) => operation.operationId === operationId)

  const environmentsFor = (operation) => Object.fromEntries(
    Object.entries(operation?.serverUrls ?? {}).map(([key, baseUrl]) => [key, { label: environments[key].label, baseUrl }])
  )

  const resetExample = (operationId = selectedOperationId) => {
    const operation = operationForId(operationId)
    if (!operation) return
    setRawBody(JSON.stringify(sampleBodyFor(operation), null, 2))
    setResult(null)
    setError("")
  }

  const createNonce = () => {
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID().replaceAll("-", "")
    const bytes = new Uint8Array(16)
    globalThis.crypto.getRandomValues(bytes)
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")
  }

  const toBase64 = (buffer) => {
    const bytes = new Uint8Array(buffer)
    let binary = ""
    for (let index = 0; index < bytes.length; index += 1) binary += String.fromCharCode(bytes[index])
    return globalThis.btoa(binary)
  }

  const endpointFor = (baseUrl, path) => `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`

  const signingUrlFor = (baseUrl, path) => {
    return new URL(endpointFor(baseUrl, path)).pathname
      .replace(/^\/(?:gw|gwp|acceptance)(?=\/)/, "")
  }

  const copyValue = async (field, value) => {
    await navigator.clipboard.writeText(value)
    setCopiedField(field)
    globalThis.setTimeout(() => setCopiedField(""), copyResetDelay)
  }

  useEffect(() => {
    const requestedOperationId = new URLSearchParams(globalThis.location?.search ?? "").get("operationId")
    const requestedOperation = operationForId(requestedOperationId)
    if (requestedOperation) {
      changeOperation(requestedOperation.operationId)
    }
  }, [])

  const changeOperation = (operationId) => {
    setSelectedOperationId(operationId)
    const operation = operationForId(operationId)
    const availableEnvironments = environmentsFor(operation)
    setEnvironment((current) => availableEnvironments[current] ? current : Object.keys(availableEnvironments)[0])
    setRawBody(JSON.stringify(sampleBodyFor(operation), null, 2))
    setResult(null)
    setError("")
  }

  const generateSignature = async () => {
    if (!appId.trim() || !appKey) {
      setError(text.required)
      return
    }
    try {
      JSON.parse(rawBody)
    } catch {
      setError(text.invalidJson)
      return
    }
    if (!globalThis.crypto?.subtle || !globalThis.crypto?.getRandomValues) {
      setError(text.unsupported)
      return
    }

    const operation = operationForId(selectedOperationId)
    if (!operation) return
    setGenerating(true)
    setError("")
    try {
      const baseUrl = environmentsFor(operation)[environment].baseUrl
      const endpoint = endpointFor(baseUrl, operation.path)
      const signUrl = signingUrlFor(baseUrl, operation.path)
      const timestamp = Date.now().toString()
      const nonce = createNonce()
      const version = "1.0"
      const algorithm = "SHA-512"
      const signText = [signUrl, appId.trim(), timestamp, version, nonce, rawBody, appKey].join("\n")
      const digest = await globalThis.crypto.subtle.digest("SHA-512", new TextEncoder().encode(signText))
      const signature = toBase64(digest)
      const headers = {
        "Content-Type": "application/json",
        appId: appId.trim(),
        version,
        timestamp,
        nonce,
        algorithm,
        signature,
      }
      const escapedBody = rawBody.replaceAll("'", "'\\''")
      const headerLines = Object.entries(headers)
        .map(([name, value]) => `  --header '${name}: ${value}' \\`)
        .join("\n")
      const curl = `curl --request ${operation.method} \\\n  --url '${endpoint}' \\\n${headerLines}\n  --data-raw '${escapedBody}'`
      setResult({ operation, endpoint, signUrl, headers, signature, curl })
    } catch (signatureError) {
      console.error(signatureError)
      setError(text.generationError)
    } finally {
      setGenerating(false)
    }
  }

  const selectedOperation = operationForId(selectedOperationId)
  const selectedEnvironments = environmentsFor(selectedOperation)

  return (
    <div className="not-prose my-8 overflow-hidden rounded-2xl border border-blue-100 bg-[#f2f3f5] shadow-[0_20px_60px_-36px_rgba(0,85,255,0.4)] dark:border-blue-950 dark:bg-[#06072b]">
      <div className="relative overflow-hidden border-b border-blue-900 bg-[#06072b] px-6 py-7 text-white dark:border-blue-950">
        <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border border-blue-300/25" />
        <div className="absolute -right-2 -top-4 h-28 w-28 rounded-full border border-blue-300/25" />
        <div className="relative">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-300">{text.eyebrow}</div>
          <h2 className="m-0 text-2xl font-semibold tracking-tight text-white">{text.title}</h2>
          <p className="mt-2 mb-0 max-w-2xl text-sm leading-6 text-blue-100/70">{text.description}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <section className="space-y-6 border-b border-zinc-200 p-5 sm:p-6 lg:border-r lg:border-b-0 dark:border-zinc-800">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_180px]">
            <label className="space-y-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{text.operation}</span>
              <select
                value={selectedOperationId}
                onChange={(event) => changeOperation(event.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 text-sm text-[#161647] outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 dark:border-blue-950 dark:bg-[#0a1446] dark:text-white"
              >
                <option value="">{text.selectOperation}</option>
                {operations.map((operation) => (
                  <option key={operation.operationId} value={operation.operationId}>
                    {operation.method} · {operation.summary}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{text.environment}</span>
              <select
                value={environment}
                onChange={(event) => {
                  setEnvironment(event.target.value)
                  setResult(null)
                }}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 text-sm text-[#161647] outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 dark:border-blue-950 dark:bg-[#0a1446] dark:text-white"
              >
                {Object.entries(selectedEnvironments).map(([key, value]) => (
                  <option key={key} value={key}>{value.label}</option>
                ))}
              </select>
            </label>
          </div>

          {selectedOperation && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-900">
              <span className="rounded-md bg-blue-50 px-2 py-1 font-mono text-[11px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">{selectedOperation.method}</span>
              <code className="break-all text-xs text-zinc-700 dark:text-zinc-300">{new URL(endpointFor(selectedEnvironments[environment].baseUrl, selectedOperation.path)).pathname}</code>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{text.credentials}</div>
                <div className="mt-1 text-xs text-zinc-500">{text.storageHint}</div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={appId}
                onChange={(event) => setAppId(event.target.value)}
                placeholder={text.appIdPlaceholder}
                aria-label={text.appId}
                autoComplete="off"
                spellCheck="false"
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-[#161647] outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 dark:border-blue-950 dark:bg-[#0a1446] dark:text-white"
              />
              <input
                type="password"
                value={appKey}
                onChange={(event) => setAppKey(event.target.value)}
                placeholder={text.appKeyPlaceholder}
                aria-label={text.appKey}
                autoComplete="new-password"
                spellCheck="false"
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 font-mono text-sm text-[#161647] outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 dark:border-blue-950 dark:bg-[#0a1446] dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{text.requestBody}</div>
                <div className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-500">{text.requestHint}</div>
              </div>
              <button type="button" onClick={() => resetExample()} className="shrink-0 text-xs font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-300">
                {text.refreshExample}
              </button>
            </div>
            <textarea
              value={rawBody}
              onChange={(event) => {
                setRawBody(event.target.value)
                setResult(null)
              }}
              spellCheck="false"
              aria-label={text.requestBody}
              className="min-h-[360px] w-full resize-y rounded-xl border border-blue-950 bg-[#0a1446] px-4 py-3 font-mono text-xs leading-5 text-blue-50 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">{error}</div>}

          <button
            type="button"
            onClick={generateSignature}
            disabled={generating || !selectedOperationId}
            className="w-full rounded-xl bg-gradient-to-r from-[#0061ff] to-[#576dff] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-14px_rgba(0,85,255,0.8)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {generating ? text.generating : text.generate}
          </button>
        </section>

        <section className="min-w-0 space-y-5 bg-white p-5 sm:p-6 dark:bg-zinc-950">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">{text.output}</div>
            <p className="mt-1 mb-0 text-xs leading-5 text-zinc-500 dark:text-zinc-400">{text.outputDescription}</p>
          </div>

          {!result ? (
            <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-8 text-center text-sm leading-6 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-500">
              {text.waiting}
            </div>
          ) : (
            <div className="space-y-5">
              {[
                { field: "endpoint", label: text.endpoint, value: result.endpoint },
                { field: "signUrl", label: text.signingUrl, value: result.signUrl },
                { field: "signature", label: text.signature, value: result.signature },
              ].map((item) => (
                <div key={item.field} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{item.label}</span>
                    <button type="button" onClick={() => copyValue(item.field, item.value)} className="text-xs font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-300">
                      {copiedField === item.field ? text.copied : text.copy}
                    </button>
                  </div>
                  <pre className="max-h-36 overflow-auto whitespace-pre-wrap break-all rounded-xl bg-zinc-950 p-3 font-mono text-xs leading-5 text-zinc-100">{item.value}</pre>
                </div>
              ))}

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{text.headers}</span>
                  <button type="button" onClick={() => copyValue("headers", JSON.stringify(result.headers, null, 2))} className="text-xs font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-300">
                    {copiedField === "headers" ? text.copied : text.copy}
                  </button>
                </div>
                <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                  {Object.entries(result.headers).map(([name, value]) => (
                    <div key={name} className="grid grid-cols-[100px_minmax(0,1fr)_48px] items-center gap-2 border-b border-zinc-100 px-3 py-2.5 last:border-b-0 dark:border-zinc-800">
                      <code className="text-[11px] font-semibold text-blue-700 dark:text-blue-300">{name}</code>
                      <code className="truncate text-[11px] text-zinc-600 dark:text-zinc-300">{value}</code>
                      <button type="button" onClick={() => copyValue(`header-${name}`, String(value))} className="text-[11px] font-semibold text-zinc-500 hover:text-blue-700">
                        {copiedField === `header-${name}` ? "✓" : text.copy}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{text.curl}</span>
                  <button type="button" onClick={() => copyValue("curl", result.curl)} className="text-xs font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-300">
                    {copiedField === "curl" ? text.copied : text.copy}
                  </button>
                </div>
                <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-all rounded-xl bg-[#0a1446] p-3 font-mono text-xs leading-5 text-blue-50">{result.curl}</pre>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
                <div className="text-sm font-semibold text-amber-900 dark:text-amber-200">{text.useInPlayground}</div>
                <ol className="mt-2 mb-0 space-y-1 pl-5 text-xs leading-5 text-amber-800 dark:text-amber-300">
                  {text.useSteps.map((step) => <li key={step}>{step}</li>)}
                </ol>
                <p className="mt-3 mb-0 text-xs leading-5 text-amber-700 dark:text-amber-400">{text.serializationWarning}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
