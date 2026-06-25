'use client'
import React, { useState, useMemo } from 'react';

// ==========================================
// 1. 33档完整源数据 (源自 PDF《明细测算表》)
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
  { id: 9, origSalary: 11000, cutRate: 10.0, cutAmt: 1100, newSalary: 9900, origSSBase: 4311, newSSBase: 9900, origCompSS: 1043.26, newCompSS: 2395.80, origEmpSS: 452.66, newEmpSS: 1039.50, origCompFund: 211, newCompFund: 495.00, origEmpFund: 211, newCompFund: 495.00, origCost: 12254.26, newCost: 12790.80, costChange: 536.54, origNet: 10336.35, newNet: 8365.50, netChange: -1970.85 },
  { id: 10, origSalary: 12000, cutRate: 10.0, cutAmt: 1200, newSalary: 10800, origSSBase: 4311, newSSBase: 10800, origCompSS: 1043.26, newCompSS: 2613.60, origEmpSS: 452.66, newEmpSS: 1134.00, origCompFund: 211, newCompFund: 540.00, origEmpFund: 211, newEmpFund: 540.00, origCost: 13254.26, newCost: 13953.60, costChange: 699.34, origNet: 11336.35, newNet: 9126.00, netChange: -2210.35 },
  { id: 11, origSalary: 13000, cutRate: 10.0, cutAmt: 1300, newSalary: 11700, origSSBase: 4311, newSSBase: 11700, origCompSS: 1043.26, newCompSS: 2831.40, origEmpSS: 452.66, newEmpSS: 1228.50, origCompFund: 211, newCompFund: 585.00, origEmpFund: 211, newEmpFund: 585.00, origCost: 14254.26, newCost: 15116.40, costChange: 862.14, origNet: 12336.35, newNet: 9886.50, netChange: -2449.85 },
  { id: 12, origSalary: 14000, cutRate: 10.0, cutAmt: 1400, newSalary: 12600, origSSBase: 4311, newSSBase: 12600, origCompSS: 1043.26, newCompSS: 3049.20, origEmpSS: 452.66, newEmpSS: 1323.00, origCompFund: 211, newCompFund: 630.00, origEmpFund: 211, newEmpFund: 630.00, origCost: 15254.26, newCost: 16279.20, costChange: 1024.94, origNet: 13336.35, newNet: 10647.00, netChange: -2689.35 },
  { id: 13, origSalary: 15000, cutRate: 10.0, cutAmt: 1500, newSalary: 13500, origSSBase: 4311, newSSBase: 13500, origCompSS: 1043.26, newCompSS: 3267.00, origEmpSS: 452.66, newEmpSS: 1417.50, origCompFund: 211, newCompFund: 675.00, origEmpFund: 211, newCompFund: 675.00, origCost: 16254.26, newCost: 17442.00, costChange: 1187.74, origNet: 14336.35, newNet: 11407.50, netChange: -2928.85 },
  { id: 14, origSalary: 16000, cutRate: 15.0, cutAmt: 2400, newSalary: 13600, origSSBase: 4311, newSSBase: 13600, origCompSS: 1043.26, newCompSS: 3291.20, origEmpSS: 452.66, newEmpSS: 1428.00, origCompFund: 211, newCompFund: 680.00, origEmpFund: 211, newCompFund: 680.00, origCost: 17254.26, newCost: 17571.20, costChange: 316.94, origNet: 15336.35, newNet: 11492.00, netChange: -3844.35 },
  { id: 15, origSalary: 17000, cutRate: 15.0, cutAmt: 2550, newSalary: 14450, origSSBase: 4311, newSSBase: 14450, origCompSS: 1043.26, newCompSS: 3496.90, origEmpSS: 452.66, newEmpSS: 1517.25, origCompFund: 211, newCompFund: 722.50, origEmpFund: 211, newEmpFund: 722.50, origCost: 18254.26, newCost: 18669.40, costChange: 415.14, origNet: 16336.35, newNet: 12210.25, netChange: -4126.10 },
  { id: 16, origSalary: 18000, cutRate: 15.0, cutAmt: 2700, newSalary: 15300, origSSBase: 4311, newSSBase: 15300, origCompSS: 1043.26, newCompSS: 3702.60, origEmpSS: 452.66, newEmpSS: 1606.50, origCompFund: 211, newCompFund: 765.00, origEmpFund: 211, newEmpFund: 765.00, origCost: 19254.26, newCost: 19767.60, costChange: 513.34, origNet: 17336.35, newNet: 12928.50, netChange: -4407.85 },
  { id: 17, origSalary: 19000, cutRate: 15.0, cutAmt: 2850, newSalary: 16150, origSSBase: 4311, newSSBase: 16150, origCompSS: 1043.26, newCompSS: 3908.30, origEmpSS: 452.66, newEmpSS: 1695.75, origCompFund: 211, newCompFund: 807.50, origEmpFund: 211, newEmpFund: 807.50, origCost: 20254.26, newCost: 20865.80, costChange: 611.54, origNet: 18336.35, newNet: 13646.75, netChange: -4689.60 },
  { id: 18, origSalary: 20000, text: '', cutRate: 15.0, cutAmt: 3000, newSalary: 17000, origSSBase: 4311, newSSBase: 17000, origCompSS: 1043.26, newCompSS: 4114.00, origEmpSS: 452.66, newEmpSS: 1785.00, origCompFund: 211, newCompFund: 850.00, origEmpFund: 211, newEmpFund: 850.00, origCost: 21254.26, newCost: 21964.00, costChange: 709.74, origNet: 19336.35, newNet: 14365.00, netChange: -4971.35 },
  { id: 19, origSalary: 21000, cutRate: 15.0, cutAmt: 3150, newSalary: 17850, origSSBase: 4311, newSSBase: 17850, origCompSS: 1043.26, newCompSS: 4319.70, origEmpSS: 452.66, newEmpSS: 1874.25, origCompFund: 211, newCompFund: 892.50, origEmpFund: 211, newEmpFund: 892.50, origCost: 22254.26, newCost: 23062.20, costChange: 807.94, origNet: 20336.35, newNet: 15083.25, netChange: -5253.10 },
  { id: 20, origSalary: 22000, cutRate: 15.0, cutAmt: 3300, newSalary: 18700, origSSBase: 4311, newSSBase: 18700, origCompSS: 1043.26, newCompSS: 4525.40, origEmpSS: 452.66, newEmpSS: 1963.50, origCompFund: 211, newCompFund: 935.00, origEmpFund: 211, newEmpFund: 935.00, origCost: 23254.26, newCost: 24160.40, costChange: 906.14, origNet: 21336.35, newNet: 15801.50, netChange: -5534.85 },
  { id: 21, origSalary: 23000, cutRate: 15.0, cutAmt: 3450, newSalary: 19550, origSSBase: 4311, newSSBase: 19550, origCompSS: 1043.26, newCompSS: 4731.10, origEmpSS: 452.66, newEmpSS: 2052.75, origCompFund: 211, newCompFund: 977.50, origEmpFund: 211, newEmpFund: 977.50, origCost: 24254.26, newCost: 25258.60, costChange: 1004.34, origNet: 22336.35, newNet: 16519.75, netChange: -5816.60 },
  { id: 22, origSalary: 24000, cutRate: 15.0, cutAmt: 3600, newSalary: 20400, origSSBase: 4311, newSSBase: 20400, origCompSS: 1043.26, newCompSS: 4936.80, origEmpSS: 452.66, newEmpSS: 2142.00, origCompFund: 211, newCompFund: 1020.00, origEmpFund: 211, newCompFund: 1020.00, origCost: 25254.26, newCost: 26356.80, costChange: 1102.54, origNet: 23336.35, newNet: 17238.00, netChange: -6098.35 },
  { id: 23, origSalary: 25000, cutRate: 15.0, cutAmt: 3750, newSalary: 21250, origSSBase: 4311, newSSBase: 21250, origCompSS: 1043.26, newCompSS: 5142.50, origEmpSS: 452.66, newEmpSS: 2231.25, origCompFund: 211, newCompFund: 1062.50, origEmpFund: 211, newEmpFund: 1062.50, origCost: 26254.26, newCost: 27455.00, costChange: 1200.74, origNet: 24336.35, newNet: 17956.25, netChange: -6380.10 },
  { id: 24, origSalary: 26000, cutRate: 15.0, cutAmt: 3900, newSalary: 22100, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1105.00, origEmpFund: 211, newEmpFund: 1105.00, origCost: 27254.26, newCost: 28421.55, costChange: 1167.29, origNet: 25336.35, newNet: 18731.62, netChange: -6604.73 },
  { id: 25, origSalary: 27000, cutRate: 15.0, cutAmt: 4050, newSalary: 22950, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1147.50, origEmpFund: 211, newEmpFund: 1147.50, origCost: 28254.26, newCost: 29314.06, costChange: 1059.79, origNet: 26336.35, newNet: 19539.12, netChange: -6797.23 },
  { id: 26, origSalary: 8000, cutRate: 15.0, cutAmt: 4200, newSalary: 23800, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1190.00, origEmpFund: 211, newEmpFund: 1190.00, origCost: 29254.26, newCost: 30206.55, costChange: 952.29, origNet: 27336.35, newNet: 20346.62, netChange: -6989.73 },
  { id: 27, origSalary: 29000, cutRate: 15.0, cutAmt: 4350, newSalary: 24650, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1232.50, origEmpFund: 211, newEmpFund: 1232.50, origCost: 30254.26, newCost: 31099.05, costChange: 844.79, origNet: 28336.35, newNet: 21154.12, netChange: -7182.23 },
  { id: 28, origSalary: 30000, cutRate: 15.0, cutAmt: 4500, newSalary: 25500, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1275.00, origEmpFund: 211, newEmpFund: 1275.00, origCost: 31254.26, newCost: 31991.55, costChange: 737.29, origNet: 29336.35, newNet: 21961.62, netChange: -7374.73 },
  { id: 29, origSalary: 31000, cutRate: 15.0, cutAmt: 4650, newSalary: 26350, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1317.50, origEmpFund: 211, newEmpFund: 1317.50, origCost: 32254.26, newCost: 32884.05, costChange: 629.79, origNet: 30336.35, newNet: 22769.12, netChange: -7567.23 },
  { id: 30, origSalary: 32000, cutRate: 15.0, cutAmt: 4800, newSalary: 27200, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1360.00, origEmpFund: 211, newEmpFund: 1360.00, origCost: 33254.26, newCost: 33776.55, costChange: 522.29, origNet: 31336.35, newNet: 23576.62, netChange: -7759.73 },
  { id: 31, origSalary: 33000, cutRate: 15.0, cutAmt: 4950, newSalary: 28050, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1402.50, origEmpFund: 211, newEmpFund: 1402.50, origCost: 34254.26, newCost: 34669.05, costChange: 414.79, origNet: 32336.35, newNet: 24384.12, netChange: -7952.23 },
  { id: 32, origSalary: 34000, cutRate: 15.0, cutAmt: 5100, newSalary: 28900, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1445.00, origEmpFund: 211, newEmpFund: 1445.00, origCost: 35254.26, newCost: 35561.55, costChange: 307.29, origNet: 33336.35, newNet: 25191.62, netChange: -8144.73 },
  { id: 33, origSalary: 35000, cutRate: 15.0, cutAmt: 5250, newSalary: 29750, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1487.50, origEmpFund: 211, newEmpFund: 1487.50, origCost: 36254.26, newCost: 36454.05, costChange: 199.79, origNet: 34336.35, newNet: 25999.12, netChange: -8337.23 }
];

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
// Gemini API 调用方法 (显式声明 TypeScript 类型)
// ==========================================
const callGeminiAPI = async (promptText: string, systemPrompt: string = "") => {
  const apiKey = ""; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload: any = {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text || "未获取到有效回应。";
      }
    } catch (e) {
      // 容错重试
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
    delay *= 2;
  }
  throw new Error("AI 顾问服务暂时无法连接，请稍后重试。");
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

  // 计算公积金变动
  const fundGain = useMemo(() => {
    const oldTotalFund = (currentData as any).origCompFund + (currentData as any).origEmpFund;
    const newTotalFund = (currentData as any).newCompFund + (currentData as any).newEmpFund;
    return {
      oldTotalFund,
      newTotalFund,
      diff: newTotalFund - oldTotalFund,
      compDiff: (currentData as any).newCompFund - (currentData as any).origCompFund
    };
  }, [currentData]);

  const handleGenerateReport = async () => {
    setIsReportLoading(true);
    setReportError("");
    setReport("");

    const systemPrompt = `你是一个资深企业薪酬与员工福利精算师。向员工说明公积金和社保转为“全额实缴制”后的长期资产得失。`;
    const promptText = `请针对以下档位数据进行解读：原基本工资: ¥${currentData.origSalary} 元...`;

    try {
      const result = await callGeminiAPI(promptText, systemPrompt);
      setReport(result);
    } catch (err: any) {
      setReportError(err.message || "报告生成失败，请稍后重试。");
    } finally {
      setIsReportLoading(false);
    }
  };

  const handleChatSubmit = async (customQuestion = "") => {
    const question = customQuestion || chatInput;
    if (!question.trim()) return;

    const newHistory = [...chatHistory, { role: 'user', text: question }];
    setChatHistory(newHistory);
    setChatInput("");
    setIsChatLoading(true);

    const systemPrompt = `你是一个精通住房公积金管理政策的精算 AI 助手。`;

    try {
      const result = await callGeminiAPI(question, systemPrompt);
      setChatHistory(prev => [...prev, { role: 'assistant', text: result }]);
    } catch (err: any) {
      setChatHistory(prev => [...prev, { role: 'assistant', text: `❌ 错误：${err.message}` }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      <header className="border-b border-slate-900 bg-slate-900/45 px-6 py-5 sticky top-0 z-50 backdrop-blur">
        <h1 className="text-xl font-bold text-white">薪酬保障保障明细查询与 ✨ AI 对账系统</h1>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 space-y-8">
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex flex-wrap gap-2.5 justify-center">
            {[4500, 6000, 8000, 10000, 12000, 15000, 18000, 20000, 25000, 30000, 35000].map((sal) => (
              <button
                key={sal}
                onClick={() => setSelectedSalary(sal)}
                className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${
                  selectedSalary === sal ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                ¥ {sal.toLocaleString()}
              </button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-rose-400 font-bold flex items-center gap-2"><Icons.Building /> 企业侧真实人头开支变动</h3>
            <div className="bg-slate-950 p-4 rounded-xl text-xs space-y-2">
              <p>原总支出成本: ¥ {currentData.origCost.toFixed(2)}</p>
              <p className="text-rose-400 font-bold">新总支出成本: ¥ {currentData.newCost.toFixed(2)}</p>
              <p className="text-slate-500 border-t border-slate-800 pt-2">刚性溢价差额: +¥ {currentData.costChange.toFixed(2)} / 月</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-emerald-400 font-bold flex items-center gap-2"><Icons.Wallet /> 个人侧封闭财产账户增厚</h3>
            <div className="bg-slate-950 p-4 rounded-xl text-xs space-y-2">
              <p>原公积金月缴总和: ¥ {fundGain.oldTotalFund.toFixed(2)}</p>
              <p className="text-emerald-400 font-bold">新公积金月缴总和: ¥ {fundGain.newTotalFund.toFixed(2)}</p>
              <p className="text-slate-500 border-t border-slate-800 pt-2">账户净收益增量: +¥ {fundGain.diff.toFixed(2)} / 月</p>
            </div>
          </div>
        </section>

        {/* AI保障分析模块 */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white flex items-center gap-2"><Icons.Sparkles /> ✨ AI 专属长效资产诊断</h3>
            <button onClick={handleGenerateReport} disabled={isReportLoading} className="px-4 py-2 bg-indigo-600 rounded-xl text-xs font-bold text-white">
              {isReportLoading ? "正在重算评估中..." : "一键生成智能评估报告"}
            </button>
          </div>
          {report && <div className="p-4 bg-slate-950 rounded-xl text-xs text-slate-300 whitespace-pre-wrap">{report}</div>}
        </section>

        {/* 智能理财Q&A */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-white flex items-center gap-2"><Icons.ChatBubble /> ✨ 政策疑问顾问对话</h3>
          <div className="bg-slate-950 p-4 rounded-xl h-[200px] overflow-y-auto space-y-2 text-xs">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-indigo-600/20 text-right' : 'bg-slate-900 text-left'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="询问公积金提取方法、落户保障或退休金影响..." className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs" />
            <button onClick={() => handleChatSubmit()} className="px-4 py-2 bg-indigo-600 rounded-xl text-xs text-white">发送</button>
          </div>
        </section>
      </main>
    </div>
  );
}
