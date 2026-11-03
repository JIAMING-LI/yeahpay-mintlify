import * as OpenCC from "opencc-js";

const convert = OpenCC.Converter({ from: "cn", to: "hk" });
const terms = new Map([
  ["户", "戶"], ["説", "說"], ["閲", "閱"], ["税", "稅"],
  ["籤名", "簽名"], ["驗籤", "驗簽"], ["併發送", "並發送"],
  ["文檔", "文件"], ["接口", "介面"], ["創建", "建立"], ["獲取", "取得"],
  ["加載", "載入"], ["服務器", "伺服器"], ["服務端", "伺服器端"], ["代碼", "程式碼"],
  ["沙箱", "沙盒"], ["信息", "資料"], ["默認", "預設"], ["異步", "非同步"],
  ["鏈接", "連結"], ["生成", "產生"], ["在線", "網上"], ["簽名調試", "簽名測試"], ["調試", "除錯"],
]);

export function hkText(text) {
  let output = convert(text);
  for (const [from, to] of terms) output = output.replaceAll(from, to);
  return output;
}

// Preserve protocol literals and URLs while localizing prose.
export function hkProse(text) {
  const protectedText = [];
  const hold = value => `YEAHPAYPROTECTED${protectedText.push(value) - 1}TOKEN`;
  let output = text.replace(/`[^`\n]+`|https?:\/\/[^\s<>"'`)]+/g, hold);
  output = hkText(output);
  return output.replace(/YEAHPAYPROTECTED(\d+)TOKEN/g, (_, index) => protectedText[Number(index)]);
}
