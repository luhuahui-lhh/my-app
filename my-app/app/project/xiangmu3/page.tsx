'use client'
import React, { useState, useMemo } from 'react';

// ==========================================
// 33档完整源数据 (源自 PDF《明细测算表》)
// ==========================================
const EMPLOYEE_RAW_DATA = [
  { id: 1, origSalary: 4500, cutRate: 0.0, cutAmt: 0, newSalary: 4500, origSSBase: 4311, newSSBase: 4500, origCompSS: 1043.26, newCompSS: 1089.00, origEmpSS: 452.66, newEmpSS: 472.50, origCompFund: 211, newCompFund: 225.00, origEmpFund: 211, newEmpFund: 225.00, origCost: 5754.26, newCost: 5814.00, costChange: 59.74, origNet: 3836.35, newNet: 3802.50, netChange: -33.85 },
  { id: 2, origSalary: 5000, cutRate: 0.0, cutAmt: 0, newSalary: 5000, origSSBase: 4311, newSSBase: 5000, origCompSS: 1043.26, newCompSS: 1210.00, origEmpSS: 452.66, newEmpSS: 525.00, origCompFund: 211, newCompFund: 250.00, origEmpFund: 211, newEmpFund: 250.00, origCost: 6254.26, newCost: 6460.00, costChange: 205.74, origNet: 4336.35, newNet: 4225.00, netChange: -111.35 },
  { id: 3, origSalary: 5500, cutRate: 0.0, cutAmt: 0, newSalary: 5500, origSSBase: 4311, newSSBase: 5500, origCompSS: 1043.26, newCompSS: 1331.00, origEmpSS: 452.66, newEmpSS: 577.50, origCompFund: 211, newCompFund: 275.00, origEmpFund: 211, newEmpFund: 275.00, origCost: 6754.26, newCost: 7106.00, costChange: 351.74, origNet: 4836.35, newNet: 4647.50, netChange: -188.85 },
  { id: 4, origSalary: 6000, cutRate: 0.0, cutAmt: 0, newSalary: 6000, origSSBase: 4311, newSSBase: 6000, origCompSS: 1043.26, newCompSS: 1452.00, origEmpSS: 452.66, newEmpSS: 630.00, origCompFund: 211, newCompFund: 300.00, origEmpFund: 211, newEmpFund: 300.00, origCost: 7254.26, newCost: 7752.00, costChange: 497.74, origNet: 5336.35, newNet: 5070.00, netChange: -266.35 },
  { id: 5, origSalary: 7000, cutRate: 5.0, cutAmt: 350, newSalary: 6650, origSSBase: 4311, newSSBase: 6650, origCompSS: 1043.26, newCompSS: 1609.30, origEmpSS: 452.66, newEmpSS: 698.25, origCompFund: 211, newCompFund: 332.50, origEmpFund: 211, newEmpFund: 332.50, origCost: 8254.26, newCost: 8591.80, costChange: 337.54, origNet: 6336.35, newNet: 5619.25, netChange: -717.10 },
  { id: 6, origSalary: 8000, cutRate: 5.0, cutAmt: 400, newSalary: 7600, origSSBase: 4311, newSSBase: 7600, origCompSS: 1043.26, newCompSS: 1839.20, origEmpSS: 452.66, newEmpSS: 798.00, origCompFund: 211, newCompFund: 380.00, origEmpFund: 211, newEmpFund: 380.00, origCost: 9254.26, newCost: 9819.20, costChange: 564.94, origNet: 7336.35, newNet: 6422.00, netChange: -914.35 },
  { id: 7, origSalary: 9000, cutRate: 5.0, cutAmt: 450, newSalary: 8550, origSSBase: 4311, newSSBase: 8550, origCompSS: 1043.26, newCompSS: 2069.10, origEmpSS: 452.66, newEmpSS: 897.75, origCompFund: 211, newCompFund: 427.50, origEmpFund: 211, newEmpFund: 427.50, origCost: 10254.26, newCost: 11046.60, costChange: 792.34, origNet: 8336.35, newNet: 7224.75, netChange: -1111.60 },
  { id: 8, origSalary: 10000, cutRate: 5.0, cutAmt: 500, newSalary: 9500, origSSBase: 4311, newSSBase: 9500, origCompSS: 1043.26, newCompSS: 2299.00, origEmpSS: 452.66, newEmpSS: 997.50, origCompFund: 211, newCompFund: 475.00, origEmpFund: 211, newEmpFund: 475.00, origCost: 11254.26, newCost: 12274.00, costChange: 1019.74, origNet: 9336.35, newNet: 8027.50, netChange: -1308.85 },
  { id: 9, origSalary: 11000, cutRate: 10.0, cutAmt: 1100, newSalary: 9900, origSSBase: 4311, newSSBase: 9900, origCompSS: 1043.26, newCompSS: 2395.80, origEmpSS: 452.66, newEmpSS: 1039.50, origCompFund: 211, newCompFund: 495.00, origEmpFund: 211, newEmpFund: 495.00, origCost: 12254.26, newCost: 12790.80, costChange: 536.54, origNet: 10336.35, newNet: 8365.50, netChange: -1970.85 },
  { id: 10, origSalary: 12000, cutRate: 10.0, cutAmt: 1200, newSalary: 10800, origSSBase: 4311, newSSBase: 10800, origCompSS: 1043.26, newCompSS: 2613.60, origEmpSS: 452.66, newEmpSS: 1134.00, origCompFund: 211, newCompFund: 540.00, origEmpFund: 211, newEmpFund: 540.00, origCost: 13254.26, newCost: 13953.60, costChange: 699.34, origNet: 11336.35, newNet: 9126.00, netChange: -2210.35 },
  { id: 11, origSalary: 13000, cutRate: 10.0, cutAmt: 1300, newSalary: 11700, origSSBase: 4311, newSSBase: 11700, origCompSS: 1043.26, newCompSS: 2831.40, origEmpSS: 452.66, newEmpSS: 1228.50, origCompFund: 211, newCompFund: 585.00, origEmpFund: 211, newEmpFund: 585.00, origCost: 14254.26, newCost: 15116.40, costChange: 862.14, origNet: 12336.35, newNet: 9886.50, netChange: -2449.85 },
  { id: 12, origSalary: 14000, cutRate: 10.0, cutAmt: 1400, newSalary: 12600, origSSBase: 4311, newSSBase: 12600, origCompSS: 1043.26, newCompSS: 3049.20, origEmpSS: 452.66, newEmpSS: 1323.00, origCompFund: 211, newCompFund: 630.00, origEmpFund: 211, newEmpFund: 630.00, origCost: 15254.26, newCost: 16279.20, costChange: 1024.94, origNet: 13336.35, newNet: 10647.00, netChange: -2689.35 },
  { id: 13, origSalary: 15000, cutRate: 10.0, cutAmt: 1500, newSalary: 13500, origSSBase: 4311, newSSBase: 13500, origCompSS: 1043.26, newCompSS: 3267.00, origEmpSS: 452.66, newEmpSS: 1417.50, origCompFund: 211, newCompFund: 675.00, origEmpFund: 211, newEmpFund: 675.00, origCost: 16254.26, newCost: 17442.00, costChange: 1187.74, origNet: 14336.35, newNet: 11407.50, netChange: -2928.85 },
  { id: 14, origSalary: 16000, cutRate: 15.0, cutAmt: 2400, newSalary: 13600, origSSBase: 4311, newSSBase: 13600, origCompSS: 1043.26, newCompSS: 3291.20, origEmpSS: 452.66, newEmpSS: 1428.00, origCompFund: 211, newCompFund: 680.00, origEmpFund: 211, newEmpFund: 680.00, origCost: 17254.26, newCost: 17571.20, costChange: 316.94, origNet: 15336.35, newNet: 11492.00, netChange: -3844.35 },
  { id: 15, origSalary: 17000, cutRate: 15.0, cutAmt: 2550, newSalary: 14450, origSSBase: 4311, newSSBase: 14450, origCompSS: 1043.26, newCompSS: 3496.90, origEmpSS: 452.66, newEmpSS: 1517.25, origCompFund: 211, newCompFund: 722.50, origEmpFund: 211, newEmpFund: 722.50, origCost: 18254.26, newCost: 18669.40, costChange: 415.14, origNet: 16336.35, newNet: 12210.25, netChange: -4126.10 },
  { id: 16, origSalary: 18000, cutRate: 15.0, cutAmt: 2700, newSalary: 15300, origSSBase: 4311, newSSBase: 15300, origCompSS: 1043.26, newCompSS: 3702.60, origEmpSS: 452.66, newEmpSS: 1606.50, origCompFund: 211, newCompFund: 765.00, origEmpFund: 211, newEmpFund: 765.00, origCost: 19254.26, newCost: 19767.60, costChange: 513.34, origNet: 17336.35, newNet: 12928.50, netChange: -4407.85 },
  { id: 17, origSalary: 19000, cutRate: 15.0, cutAmt: 2850, newSalary: 16150, origSSBase: 4311, newSSBase: 16150, origCompSS: 1043.26, newCompSS: 3908.30, origEmpSS: 452.66, newEmpSS: 1695.75, origCompFund: 211, newCompFund: 807.50, origEmpFund: 211, newEmpFund: 807.50, origCost: 20254.26, newCost: 20865.80, costChange: 611.54, origNet: 18336.35, newNet: 13646.75, netChange: -4689.60 },
  { id: 18, origSalary: 20000, cutRate: 15.0, cutAmt: 3000, newSalary: 17000, origSSBase: 4311, newSSBase: 17000, origCompSS: 1043.26, newCompSS: 4114.00, origEmpSS: 452.66, newEmpSS: 1785.00, origCompFund: 211, newCompFund: 850.00, origEmpFund: 211, newEmpFund: 850.00, origCost: 21254.26, newCost: 21964.00, costChange: 709.74, origNet: 19336.35, newNet: 14365.00, netChange: -4971.35 },
  { id: 19, origSalary: 21000, cutRate: 15.0, cutAmt: 3150, newSalary: 17850, origSSBase: 4311, newSSBase: 17850, origCompSS: 1043.26, newCompSS: 4319.70, origEmpSS: 452.66, newEmpSS: 1874.25, origCompFund: 211, newCompFund: 892.50, origEmpFund: 211, newEmpFund: 892.50, origCost: 22254.26, newCost: 23062.20, costChange: 807.94, origNet: 20336.35, newNet: 15083.25, netChange: -5253.10 },
  { id: 20, origSalary: 22000, cutRate: 15.0, cutAmt: 3300, newSalary: 18700, origSSBase: 4311, newSSBase: 18700, origCompSS: 1043.26, newCompSS: 4525.40, origEmpSS: 452.66, newEmpSS: 1963.50, origCompFund: 211, newCompFund: 935.00, origEmpFund: 211, newEmpFund: 935.00, origCost: 23254.26, newCost: 24160.40, costChange: 906.14, origNet: 21336.35, newNet: 15801.50, netChange: -5534.85 },
  { id: 21, origSalary: 23000, cutRate: 15.0, cutAmt: 3450, newSalary: 19550, origSSBase: 4311, newSSBase: 19550, origCompSS: 1043.26, newCompSS: 4731.10, origEmpSS: 452.66, newEmpSS: 2052.75, origCompFund: 211, newCompFund: 977.50, origEmpFund: 211, newEmpFund: 977.50, origCost: 24254.26, newCost: 25258.60, costChange: 1004.34, origNet: 22336.35, newNet: 16519.75, netChange: -5816.60 },
  { id: 22, origSalary: 24000, cutRate: 15.0, cutAmt: 3600, newSalary: 20400, origSSBase: 4311, newSSBase: 20400, origCompSS: 1043.26, newCompSS: 4936.80, origEmpSS: 452.66, newEmpSS: 2142.00, origCompFund: 211, newCompFund: 1020.00, origEmpFund: 211, newEmpFund: 1020.00, origCost: 25254.26, newCost: 26356.80, costChange: 1102.54, origNet: 23336.35, newNet: 17238.00, netChange: -6098.35 },
  { id: 23, origSalary: 25000, cutRate: 15.0, cutAmt: 3750, newSalary: 21250, origSSBase: 4311, newSSBase: 21250, origCompSS: 1043.26, newCompSS: 5142.50, origEmpSS: 452.66, newEmpSS: 2231.25, origCompFund: 211, newCompFund: 1062.50, origEmpFund: 211, newEmpFund: 1062.50, origCost: 26254.26, newCost: 27455.00, costChange: 1200.74, origNet: 24336.35, newNet: 17956.25, netChange: -6380.10 },
  { id: 24, origSalary: 26000, cutRate: 15.0, cutAmt: 3900, newSalary: 22100, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1105.00, origEmpFund: 211, newEmpFund: 1105.00, origCost: 27254.26, newCost: 28421.55, costChange: 1167.29, origNet: 25336.35, newNet: 18731.62, netChange: -6604.73 },
  { id: 25, origSalary: 27000, cutRate: 15.0, cutAmt: 4050, newSalary: 22950, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1147.50, origEmpFund: 211, newEmpFund: 1147.50, origCost: 28254.26, newCost: 29314.06, costChange: 1059.79, origNet: 26336.35, newNet: 19539.12, netChange: -6797.23 },
  { id: 26, origSalary: 28000, cutRate: 15.0, cutAmt: 4200, newSalary: 23800, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1190.00, origEmpFund: 211, newEmpFund: 1190.00, origCost: 29254.26, newCost: 30206.55, costChange: 952.29, origNet: 27336.35, newNet: 20346.62, netChange: -6989.73 },
  { id: 27, origSalary: 29000, cutRate: 15.0, cutAmt: 4350, newSalary: 24650, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1232.50, origEmpFund: 211, newEmpFund: 1232.50, origCost: 30254.26, newCost: 31099.05, costChange: 844.79, origNet: 28336.35, newNet: 21154.12, netChange: -7182.23 },
  { id: 28, origSalary: 30000, cutRate: 15.0, cutAmt: 4500, newSalary: 25500, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1275.00, origEmpFund: 211, newEmpFund: 1275.00, origCost: 31254.26, newCost: 31991.55, costChange: 737.29, origNet: 29336.35, newNet: 21961.62, netChange: -7374.73 },
  { id: 29, origSalary: 31000, cutRate: 15.0, cutAmt: 4650, newSalary: 26350, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1317.50, origEmpFund: 211, newEmpFund: 1317.50, origCost: 32254.26, newCost: 32884.05, costChange: 629.79, origNet: 30336.35, newNet: 22769.12, netChange: -7567.23 },
  { id: 30, origSalary: 32000, cutRate: 15.0, cutAmt: 4800, newSalary: 27200, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1360.00, origEmpFund: 211, newEmpFund: 1360.00, origCost: 33254.26, newCost: 33776.55, costChange: 522.29, origNet: 31336.35, newNet: 23576.62, netChange: -7759.73 },
  { id: 31, origSalary: 33000, cutRate: 15.0, cutAmt: 4950, newSalary: 28050, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1402.50, origEmpFund: 211, newEmpFund: 1402.50, origCost: 34254.26, newCost: 34669.05, costChange: 414.79, origNet: 32336.35, newNet: 24384.12, netChange: -7952.23 },
  { id: 32, origSalary: 34000, cutRate: 15.0, cutAmt: 5100, newSalary: 28900, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1445.00, origEmpFund: 211, newEmpFund: 1445.00, origCost: 35254.26, newCost: 35561.55, costChange: 307.29, origNet: 33336.35, newNet: 25191.62, netChange: -8144.73 },
  { id: 33, origSalary: 35000, cutRate: 15.0, cutAmt: 5250, newSalary: 29750, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1487.50, origEmpFund: 211, newEmpFund: 1487.50, origCost: 36254.26, newCost: 36454.05, costChange: 199.79, origNet: 34336.35, newNet: 25999.12, netChange: -8337.23 }
];

// ==========================================
// SVG 图标库
// ==========================================
const Icons = {
  TrendingUp: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  ShieldCheck: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Wallet: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  Building: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-5 h-5 text-indigo-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  ChatBubble: () => (
    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
};

// ==========================================
// Gemini API 调用方法 (带指数退避重试)
// ==========================================
const callGeminiAPI = async (promptText, systemPrompt = "") => {
  const apiKey = ""; // 运行时会被环境自动填充
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: promptText }] }]
  };

  if (systemPrompt) {
    payload.systemInstruction = { parts: [{ text: systemPrompt }] };
  }

  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text || "未获取到有效回应。";
      }
    } catch (e) {
      // 捕获错误，继续重试
    }
    // 指数退避等待 1s, 2s, 4s, 8s, 16s
    await new Promise((resolve) => setTimeout(resolve, delay));
    delay *= 2;
  }
  throw new Error("AI 诊断暂不可用，请稍候再试。");
};

export default function App() {
  const [selectedSalary, setSelectedSalary] = useState(10000);

  // AI 报告生成状态
  const [report, setReport] = useState("");
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [reportError, setReportError] = useState("");

  // AI Q&A 对话状态
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      text: '您好！我是您的 ✨ AI 政策与财务顾问。有关本次合规实缴给您带来的长期利益、提取途径或社会保障影响，您可以随时向我提问。'
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // 匹配特定档位的真实数据
  const currentData = useMemo(() => {
    const data = EMPLOYEE_RAW_DATA.find(d => d.origSalary === selectedSalary);
    if (data) return data;
    return EMPLOYEE_RAW_DATA.reduce((prev, curr) => 
      Math.abs(curr.origSalary - selectedSalary) < Math.abs(prev.origSalary - selectedSalary) ? curr : prev
    );
  }, [selectedSalary]);

  // 计算员工在调整后实际储蓄到个人公积金账户的增量 (公积金是100%属于员工个人的)
  const fundGain = useMemo(() => {
    const oldTotalFund = currentData.origCompFund + currentData.origEmpFund;
    const newTotalFund = currentData.newCompFund + currentData.newEmpFund;
    return {
      oldTotalFund,
      newTotalFund,
      diff: newTotalFund - oldTotalFund,
      compDiff: currentData.newCompFund - currentData.origCompFund
    };
  }, [currentData]);

  // 一键生成专属 AI 分析报告
  const handleGenerateReport = async () => {
    setIsReportLoading(true);
    setReportError("");
    setReport("");

    const systemPrompt = `你是一个具备温情且极其严密客观的资深企业薪酬与员工福利精算师。你当前需要向一位员工解读公司将住房公积金和社保转为“全额实缴制”后，该员工在当前档位下的利益得失。
请不要用洗脑、说教、和稀泥的套话，要用真诚、透明的财务数据逻辑向他们说明以下事实：
1. 短期来看，因为五险一金自缴部分按高基数扣除，员工到手现金有所调整，但这笔扣掉的钱和公司多缴的钱，100%存入了员工个人的住房公积金账户与医疗/养老账户中，成为了封闭的“实物资产”。
2. 特别是住房公积金，它具有全额可提取性（买房、付房贷、租房或离职提取），公司多存入的部分相当于给员工的隐性免税现金加薪。
3. 养老金未来的核定标准和医疗保险个人账户的现金池都得到了按比例同步上涨，切实巩固了未来基础兜底权益。

请用以下提供的数据进行极其精确的量化对比，生成一篇结构清晰（建议分为：一、财务现状穿透；二、隐性财产增厚账本；三、未来保障性溢价；四、提取指南）的个性化理财性分析报告。字数约500-600字左右。`;

    const promptText = `请针对以下档位数据进行解读：
- 原基本工资: ¥${currentData.origSalary} 元
- 调整后基本工资: ¥${currentData.newSalary} 元 (降幅: ${currentData.cutRate}%)
- 调整前公司支付成本（工资 + 低保缴五险一金）: ¥${currentData.origCost} 元
- 调整后公司实际支付成本（工资 + 足额缴五险一金）: ¥${currentData.newCost} 元 (公司为您额外多支付刚性支出: ¥${currentData.costChange} 元)
- 原员工实发到手: ¥${currentData.origNet} 元
- 现员工实发到手: ¥${currentData.newNet} 元 (减少额: ¥${Math.abs(currentData.netChange).toFixed(2)} 元)
- 公积金充值额（个人缴+单位缴）: 由原来的 ¥${fundGain.oldTotalFund} 元 提升到 现在的 ¥${fundGain.newTotalFund} 元 (每月净存入增厚 ¥${fundGain.diff.toFixed(2)} 元，其中单位多为您存入 ¥${fundGain.compDiff.toFixed(2)} 元)
- 社保缴费基数: 由 ¥${currentData.origSSBase} 元 提高到 ¥${currentData.newSSBase} 元`;

    try {
      const result = await callGeminiAPI(promptText, systemPrompt);
      setReport(result);
    } catch (err) {
      setReportError(err.message || "报告生成失败，请稍后重试。");
    } finally {
      setIsReportLoading(false);
    }
  };

  // AI 智能 Q&A 提交
  const handleChatSubmit = async (customQuestion = "") => {
    const question = customQuestion || chatInput;
    if (!question.trim()) return;

    const newHistory = [...chatHistory, { role: 'user', text: question }];
    setChatHistory(newHistory);
    setChatInput("");
    setIsChatLoading(true);

    const systemPrompt = `你是一个精通中国社会保险法、住房公积金管理政策，以及懂财富精算的 AI 助手。你面对的是一位对薪资结构调整、社保公积金实缴有困惑的员工。
请结合该员工的财务数据，用平和、严谨、客观的专业态度回答他的问题。数据背景：
- 现薪资: ¥${currentData.newSalary}
- 到手差额: ¥${currentData.netChange.toFixed(2)}
- 现公积金月充值总和: ¥${fundGain.newTotalFund.toFixed(2)} (比之前多存入 ¥${fundGain.diff.toFixed(2)})
- 公司在此档位每月人头支出实际增加了 ¥${currentData.costChange.toFixed(2)}，说明公司没有占一分钱便宜。
请以理财规划师或合规顾问的专业口吻作答，多列数据和法律保障事实，少说教。`;

    try {
      const result = await callGeminiAPI(question, systemPrompt);
      setChatHistory(prev => [...prev, { role: 'assistant', text: result }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'assistant', text: `❌ 抱歉，连接 AI 顾问出错：${err.message || "请稍后重试"}` }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      
      {/* 顶部纯净非说教式标题栏 */}
      <header className="border-b border-slate-900 bg-slate-900/45 px-6 py-5 sticky top-0 z-50 backdrop-blur">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-400 text-xs font-semibold tracking-wider uppercase">企业账包与个人长效保障透视表</span>
            </div>
            <h1 className="text-xl font-bold text-white mt-1">薪酬保障透明查询与 ✨AI 智能对账系统</h1>
          </div>
          <div className="text-xs text-slate-500 md:text-right">
            基于客观数据逻辑 · 拒绝空洞宣传 · 支持 ✨ AI 专属分析
          </div>
        </div>
      </header>

      {/* 主面板 */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 space-y-8">
        
        {/* 数据输入与滑块段 */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-base font-bold text-slate-100">请选择您的原工资档位进行测算对账</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              本次合规调整，由于“住房公积金和社保”从过去的最低额度转变为足额比例实缴，导致公司支出成本及个人长期福利储蓄发生了重大重构。
            </p>
          </div>

          {/* 交互式薪资档位选择 */}
          <div className="flex flex-wrap gap-2.5 justify-center py-2">
            {[4500, 6000, 8000, 10000, 12000, 15000, 18000, 20000, 25000, 30000, 35000].map((sal) => (
              <button
                key={sal}
                onClick={() => setSelectedSalary(sal)}
                className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all duration-150 ${
                  selectedSalary === sal 
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/15' 
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                ¥ {sal.toLocaleString()}
              </button>
            ))}
          </div>

          {/* 精密拖拽条 */}
          <div className="max-w-md mx-auto space-y-2 pt-2">
            <input 
              type="range" 
              min="4500" 
              max="35000" 
              step="500"
              value={selectedSalary}
              onChange={(e) => setSelectedSalary(Number(e.target.value))}
              className="w-full accent-indigo-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>¥ 4,500</span>
              <span>中位数 ¥ 18,000</span>
              <span>上限 ¥ 35,000</span>
            </div>
          </div>
        </section>

        {/* 核心对账看板：两个账本的真实对比 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 账本 1：公司真实支付的总人头成本 (上升) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-slate-850 transition">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <Icons.Building />
                <h3>账本一：公司因您产生的总人头开支</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                部分员工误以为公司降低薪资比例是为了“省钱占便宜”。以下是真实账目明细：<strong>即使您的基本工资有所调整，但由于强制足额实缴社保与公积金，公司为您实际支付的总人头费用其实上升了。</strong>
              </p>
            </div>

            {/* 公司成本变动视觉展示 */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60 space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>原总支出成本（工资+单位五险一金）</span>
                <span className="font-mono text-slate-300">¥ {currentData.origCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-200 font-bold">
                <span>现总支出成本（调整后实缴总额）</span>
                <span className="font-mono text-rose-400 text-sm">¥ {currentData.newCost.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
                <span className="text-[11px] text-slate-500">公司因您多支出的刚性费用</span>
                <span className="text-sm font-bold text-rose-400 flex items-center gap-0.5">
                  + ¥ {currentData.costChange.toFixed(2)} / 月
                </span>
              </div>
            </div>

            <div className="bg-rose-500/5 border border-rose-500/10 p-3.5 rounded-xl text-[11px] text-rose-300/90 leading-relaxed">
              💡 <strong>事实透视：</strong> 这一档位公司不仅没有省下任何费用，反而每月因强制合规<strong>额外掏出 ¥{currentData.costChange.toFixed(0)} 现金</strong>。公司并非利用降薪降本，而是正在消化合规转型带来的成本增量压力。
            </div>
          </div>

          {/* 账本 2：您的长期个人账户资产 (大幅增益) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-slate-850 transition">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Icons.Wallet />
                <h3>账本二：您的个人长期实物资产增厚</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                到手现金的确受到了社保/公积金自缴额上升及降薪的重合压缩，但这些被扣掉的钱和公司多交的钱，<strong>全部足额储蓄进了你个人的封闭式财产账户中</strong>，且额度成倍增加。
              </p>
            </div>

            {/* 长期利益变动展示 */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60 space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>原公积金账户充值（自缴+单位缴存总和）</span>
                <span className="font-mono text-slate-300">¥ {fundGain.oldTotalFund.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-200 font-bold">
                <span>现公积金账户充值（实缴制下月充值）</span>
                <span className="font-mono text-emerald-400 text-sm">¥ {fundGain.newTotalFund.toFixed(0)}</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
                <span className="text-[11px] text-slate-500">您每月净多得的公积金储蓄</span>
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-0.5">
                  + ¥ {fundGain.diff.toFixed(2)} / 月
                </span>
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/10 p-3.5 rounded-xl text-[11px] text-emerald-300/90 leading-relaxed">
              💡 <strong>事实透视：</strong> 住房公积金余额可全额提取用于买房、还贷、甚至全额租房。公司合规后，为您个人公积金账户多充值了 <strong>¥{fundGain.compDiff.toFixed(0)}</strong>，这些钱完全是公司额外赠予您的个人资产。
            </div>
          </div>

        </section>

        {/* ==========================================
            新加核心模块：✨ AI 智能财务精算保障分析
            ========================================== */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Icons.Sparkles />
              <h3 className="font-bold text-white text-base">✨ AI 专属长效资产诊断</h3>
            </div>
            <button
              onClick={handleGenerateReport}
              disabled={isReportLoading}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-950/40 flex items-center justify-center gap-2 transition"
            >
              {isReportLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin"></span>
                  正在用 AI 精算分析中...
                </>
              ) : (
                "✨ 一键生成当前档位长效资产分析报告"
              )}
            </button>
          </div>

          {/* AI 报告展示区 */}
          {report && (
            <div className="bg-slate-950/80 border border-slate-800/80 p-6 rounded-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-indigo-400 border-b border-slate-800 pb-2">
                <span className="font-semibold">诊断报告针对应收总额：¥ {currentData.origSalary.toLocaleString()} 元</span>
                <span>生成时间: 2026年6月</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                {report}
              </div>
            </div>
          )}

          {/* 错误通知 */}
          {reportError && (
            <div className="p-4 bg-rose-950/30 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex gap-2">
              <span>⚠️</span>
              <p>{reportError}</p>
            </div>
          )}

          {/* 提示占位 */}
          {!report && !isReportLoading && !reportError && (
            <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl bg-slate-950/30">
              <p className="text-xs text-slate-500">点击上方按钮，基于您当前选择的工资档位生成专属于您的 AI 保障账本深度解析报告。</p>
            </div>
          )}
        </section>

        {/* ==========================================
            新加核心模块：✨ AI 智能政策与福利问答
            ========================================== */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3 flex items-center gap-2">
            <Icons.ChatBubble />
            <h3 className="font-bold text-white text-base">✨ AI 政策与理财规划智能问答</h3>
          </div>

          {/* 聊天窗口 */}
          <div className="bg-slate-950 rounded-xl border border-slate-850 p-4 h-[350px] overflow-y-auto space-y-4">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900 text-slate-200 border border-slate-800'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 border border-slate-800 text-slate-400 rounded-2xl px-4 py-3 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
                  AI 顾问正在为您精算解答中...
                </div>
              </div>
            )}
          </div>

          {/* 热点问题快捷点击 */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block">您可能最想问的热点问题（点击立即询问）：</span>
            <div className="flex flex-wrap gap-2">
              {[
                "1. 增加的公积金怎样提取最方便？",
                "2. 社保基数上涨后，长期能帮我多拿多少退休金？",
                "3. 这次调整，公司在我的岗位上真的多花钱了吗？"
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChatSubmit(q)}
                  disabled={isChatLoading}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 disabled:border-slate-900 disabled:text-slate-600 rounded-lg text-[11px] text-indigo-300 transition text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* 聊天输入框 */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="请输入您的财务或福利政策疑难问题..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
              disabled={isChatLoading}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={() => handleChatSubmit()}
              disabled={isChatLoading}
              className="px-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl text-xs font-bold text-white transition flex items-center justify-center"
            >
              ✨ 发送
            </button>
          </div>
        </section>

        {/* 动态前后全口径柱状对比图 */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white">五层全口径人头成本堆积对账</h3>
              <p className="text-xs text-slate-400">通过五险一金细节折射，看看钱到底流向了哪里</p>
            </div>
            <span className="text-[10px] text-indigo-400 font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              数据口径 100% 对齐测算表
            </span>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-around items-end bg-slate-950 rounded-xl p-6 border border-slate-850 h-[300px] relative gap-8">
            
            {/* 背景格线 */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none text-slate-800">
              <div className="border-b border-slate-800/40 w-full h-0"></div>
              <div className="border-b border-slate-800/40 w-full h-0"></div>
              <div className="border-b border-slate-800/40 w-full h-0"></div>
              <div className="border-b border-slate-800/40 w-full h-0"></div>
            </div>

            {/* 柱形1：原低缴方案 */}
            <div className="flex flex-col items-center w-full md:w-1/3 z-10">
              <div className="text-xs text-slate-400 font-semibold mb-2">
                公司支付总开支: ¥{currentData.origCost.toFixed(0)}
              </div>
              
              <div className="w-14 flex flex-col-reverse rounded-t-lg overflow-hidden h-[160px] shadow-2xl transition-all duration-300">
                {/* 1. 员工到手 */}
                <div 
                  style={{ height: `${(currentData.origNet / currentData.origCost) * 100}%` }}
                  className="bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer"
                  title={`实发到手: ¥${currentData.origNet}`}
                ></div>
                {/* 2. 个人社保 */}
                <div 
                  style={{ height: `${(currentData.origEmpSS / currentData.origCost) * 100}%` }}
                  className="bg-indigo-400"
                ></div>
                {/* 3. 个人公积金 */}
                <div 
                  style={{ height: `${(currentData.origEmpFund / currentData.origCost) * 100}%` }}
                  className="bg-blue-400"
                ></div>
                {/* 4. 单位社保 */}
                <div 
                  style={{ height: `${(currentData.origCompSS / currentData.origCost) * 100}%` }}
                  className="bg-indigo-500/70"
                ></div>
                {/* 5. 单位公积金 */}
                <div 
                  style={{ height: `${(currentData.origCompFund / currentData.origCost) * 100}%` }}
                  className="bg-sky-400/80"
                ></div>
              </div>

              <div className="text-[11px] font-bold text-slate-400 mt-3 text-center">
                调整前方案 (低社保缴存)
              </div>
              <div className="text-[9px] text-slate-500 mt-0.5">
                (社保基数: 4311 | 公积金基数: 4220)
              </div>
            </div>

            {/* 差值核心变化指示牌 */}
            <div className="flex flex-col items-center justify-center w-full md:w-1/4 h-full pointer-events-none pb-8 text-center">
              <div className="px-2.5 py-1 text-xs rounded-full font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                企业人力支出多出: +¥{currentData.costChange.toFixed(0)}
              </div>
              <div className="h-0.5 w-full border-t border-dashed border-slate-800 my-2"></div>
              <div className="text-[9px] text-slate-500">
                公司每月为您多付社保与公积金
              </div>
            </div>

            {/* 柱形2：调整合规后方案 */}
            <div className="flex flex-col items-center w-full md:w-1/3 z-10">
              <div className="text-xs text-slate-200 font-semibold mb-2">
                公司支付总开支: ¥{currentData.newCost.toFixed(0)}
              </div>
              
              <div className="w-14 flex flex-col-reverse rounded-t-lg overflow-hidden h-[160px] shadow-2xl transition-all duration-300">
                {/* 1. 员工到手 */}
                <div 
                  style={{ height: `${(currentData.newNet / currentData.newCost) * 100}%` }}
                  className="bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer"
                  title={`实发到手: ¥${currentData.newNet}`}
                ></div>
                {/* 2. 个人社保 */}
                <div 
                  style={{ height: `${(currentData.newEmpSS / currentData.newCost) * 100}%` }}
                  className="bg-indigo-400"
                ></div>
                {/* 3. 个人公积金 */}
                <div 
                  style={{ height: `${(currentData.newEmpFund / currentData.newCost) * 100}%` }}
                  className="bg-blue-400"
                ></div>
                {/* 4. 单位社保 */}
                <div 
                  style={{ height: `${(currentData.newCompSS / currentData.newCost) * 100}%` }}
                  className="bg-indigo-500/70"
                ></div>
                {/* 5. 单位公积金 */}
                <div 
                  style={{ height: `${(currentData.newCompFund / currentData.newCost) * 100}%` }}
                  className="bg-sky-400/80"
                ></div>
              </div>

              <div className="text-[11px] font-bold text-slate-100 mt-3 text-center">
                调整后方案 (全额合规缴存)
              </div>
              <div className="text-[9px] text-slate-500 mt-0.5">
                (社保基数: {currentData.newSSBase} | 公积金基数: {currentData.newSalary})
              </div>
            </div>

          </div>

          {/* 柱体成分图例 */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-4 border-t border-slate-800 text-[10px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-indigo-600"></div>
              <span>员工直接实发到手</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-indigo-400"></div>
              <span>个人扣缴五险</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-blue-400"></div>
              <span>个人自缴一金</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-indigo-500/70"></div>
              <span>单位为您缴纳社保费</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-sky-400/80"></div>
              <span>单位为您存入公积金</span>
            </div>
          </div>
        </section>

        {/* 知识点对账：合规实缴能为我带来什么切身利益？ */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-2">
            <Icons.ShieldCheck />
            <h3 className="font-bold text-white text-sm">除了现金，足额实缴能为您换回哪些“刚性价值”？</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-200">1. 公积金余额增厚与低息贷款权益</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                合规足额实缴后，公积金每月个人和公司注入大幅增加，余额滚存速度提高2-3倍。在购买首套及改善型住宅时，更易申请到公积金低息贷款（利率远低于商业房贷），为您省下数十万利息。
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-200">2. 医疗卡个人余额与养老统筹大幅增益</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                社保缴存基数提高后，直接存入您个人医疗账户的现金卡余额按月同比上涨，生病就医或药店购药直接抵扣；同时，未来退休养老金核定基数被整体拉高，切实保障了长远利益。
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-200">3. 城市积分、落户与社会信用杠杆</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                在许多主流一、二线城市，子女入学、申领新能源车牌、申请共有产权房或办理落户时，往往一票否决地考核近12个月或数年“实际社保缴纳基数”。实缴基数提高，无形中赋予了您更高含金量的城市信用特权。
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* 页脚 */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-6 text-center text-[11px] text-slate-600">
        <p>© 2026 薪资透明核对与长效保障机制。数据均经100%客观测算，保留每一笔资金合规流转记录。</p>
      </footer>

    </div>
  );
}