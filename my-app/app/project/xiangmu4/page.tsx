'use client'
import React, { useState, useMemo } from 'react';

// ==========================================
// 1. 33档完整源数据 (源自 PDF《明细测算表》)
// ==========================================
const PDF_RAW_DATA = [
  { id: 1, origSalary: 4500, cutRate: 0.0, cutAmt: 0, newSalary: 4500, origSSBase: 4311, newSSBase: 4500, origCompSS: 1043.26, newCompSS: 1089.00, origEmpSS: 452.66, newEmpSS: 472.50, origCompFund: 211, newCompFund: 225.00, origEmpFund: 211, newEmpFund: 225.00, origCost: 5754.26, newCost: 5814.00, costChange: 59.74, costPct: 1.0, origNet: 3836.35, newNet: 3802.50, netChange: -33.85, comment: "公司多花钱，工资不变；单位社保多46，公司公积金多14；净变动60" },
  { id: 2, origSalary: 5000, cutRate: 0.0, cutAmt: 0, newSalary: 5000, origSSBase: 4311, newSSBase: 5000, origCompSS: 1043.26, newCompSS: 1210.00, origEmpSS: 452.66, newEmpSS: 525.00, origCompFund: 211, newCompFund: 250.00, origEmpFund: 211, newEmpFund: 250.00, origCost: 6254.26, newCost: 6460.00, costChange: 205.74, costPct: 3.3, origNet: 4336.35, newNet: 4225.00, netChange: -111.35, comment: "公司多花钱，工资不变；单位社保多167，公司公积金多39；净变动206" },
  { id: 3, origSalary: 5500, cutRate: 0.0, cutAmt: 0, newSalary: 5500, origSSBase: 4311, newSSBase: 5500, origCompSS: 1043.26, newCompSS: 1331.00, origEmpSS: 452.66, newEmpSS: 577.50, origCompFund: 211, newCompFund: 275.00, origEmpFund: 211, newEmpFund: 275.00, origCost: 6754.26, newCost: 7106.00, costChange: 351.74, costPct: 5.2, origNet: 4836.35, newNet: 4647.50, netChange: -188.85, comment: "公司多花钱，工资不变；单位社保多288，公司公积金多64；净变动352" },
  { id: 4, origSalary: 6000, cutRate: 0.0, cutAmt: 0, newSalary: 6000, origSSBase: 4311, newSSBase: 6000, origCompSS: 1043.26, newCompSS: 1452.00, origEmpSS: 452.66, newEmpSS: 630.00, origCompFund: 211, newCompFund: 300.00, origEmpFund: 211, newEmpFund: 300.00, origCost: 7254.26, newCost: 7752.00, costChange: 497.74, costPct: 6.9, origNet: 5336.35, newNet: 5070.00, netChange: -266.35, comment: "公司多花钱，工资不变；单位社保多409，公司公积金多89；净变动498" },
  { id: 5, origSalary: 7000, cutRate: 5.0, cutAmt: 350, newSalary: 6650, origSSBase: 4311, newSSBase: 6650, origCompSS: 1043.26, newCompSS: 1609.30, origEmpSS: 452.66, newEmpSS: 698.25, origCompFund: 211, newCompFund: 332.50, origEmpFund: 211, newEmpFund: 332.50, origCost: 8254.26, newCost: 8591.80, costChange: 337.54, costPct: 4.1, origNet: 6336.35, newNet: 5619.25, netChange: -717.10, comment: "公司多花钱，工资降350；单位社保多566，公司公积金多122；净变动338" },
  { id: 6, origSalary: 8000, cutRate: 5.0, cutAmt: 400, newSalary: 7600, origSSBase: 4311, newSSBase: 7600, origCompSS: 1043.26, newCompSS: 1839.20, origEmpSS: 452.66, newEmpSS: 798.00, origCompFund: 211, newCompFund: 380.00, origEmpFund: 211, newEmpFund: 380.00, origCost: 9254.26, newCost: 9819.20, costChange: 564.94, costPct: 6.1, origNet: 7336.35, newNet: 6422.00, netChange: -914.35, comment: "公司多花钱，工资降400；单位社保多796，公司公积金多169；净变动565" },
  { id: 7, origSalary: 9000, cutRate: 5.0, cutAmt: 450, newSalary: 8550, origSSBase: 4311, newSSBase: 8550, origCompSS: 1043.26, newCompSS: 2069.10, origEmpSS: 452.66, newEmpSS: 897.75, origCompFund: 211, newCompFund: 427.50, origEmpFund: 211, newEmpFund: 427.50, origCost: 10254.26, newCost: 11046.60, costChange: 792.34, costPct: 7.7, origNet: 8336.35, newNet: 7224.75, netChange: -1111.60, comment: "公司多花钱，工资降450；单位社保多1026，公司公积金多217；净变动792" },
  { id: 8, origSalary: 10000, cutRate: 5.0, cutAmt: 500, newSalary: 9500, origSSBase: 4311, newSSBase: 9500, origCompSS: 1043.26, newCompSS: 2299.00, origEmpSS: 452.66, newEmpSS: 997.50, origCompFund: 211, newCompFund: 475.00, origEmpFund: 211, newEmpFund: 475.00, origCost: 11254.26, newCost: 12274.00, costChange: 1019.74, costPct: 9.1, origNet: 9336.35, newNet: 8027.50, netChange: -1308.85, comment: "公司多花钱，工资降500；单位社保多1256，公司公积金多264；净变动1020" },
  { id: 9, origSalary: 11000, cutRate: 10.0, cutAmt: 1100, newSalary: 9900, origSSBase: 4311, newSSBase: 9900, origCompSS: 1043.26, newCompSS: 2395.80, origEmpSS: 452.66, newEmpSS: 1039.50, origCompFund: 211, newCompFund: 495.00, origEmpFund: 211, newEmpFund: 495.00, origCost: 12254.26, newCost: 12790.80, costChange: 536.54, costPct: 4.4, origNet: 10336.35, newNet: 8365.50, netChange: -1970.85, comment: "公司多花钱，工资降1100；单位社保多1353，公司公积金多284；净变动537" },
  { id: 10, origSalary: 12000, cutRate: 10.0, cutAmt: 1200, newSalary: 10800, origSSBase: 4311, newSSBase: 10800, origCompSS: 1043.26, newCompSS: 2613.60, origEmpSS: 452.66, newEmpSS: 1134.00, origCompFund: 211, newCompFund: 540.00, origEmpFund: 211, newEmpFund: 540.00, origCost: 13254.26, newCost: 13953.60, costChange: 699.34, costPct: 5.3, origNet: 11336.35, newNet: 9126.00, netChange: -2210.35, comment: "公司多花钱，工资降1200；单位社保多1570，公司公积金多329；净变动699" },
  { id: 11, origSalary: 13000, cutRate: 10.0, cutAmt: 1300, newSalary: 11700, origSSBase: 4311, newSSBase: 11700, origCompSS: 1043.26, newCompSS: 2831.40, origEmpSS: 452.66, newEmpSS: 1228.50, origCompFund: 211, newCompFund: 585.00, origEmpFund: 211, newEmpFund: 585.00, origCost: 14254.26, newCost: 15116.40, costChange: 862.14, costPct: 6.0, origNet: 12336.35, newNet: 9886.50, netChange: -2449.85, comment: "公司多花钱，工资降1300；单位社保多1788，公司公积金多374；净变动862" },
  { id: 12, origSalary: 14000, cutRate: 10.0, cutAmt: 1400, newSalary: 12600, origSSBase: 4311, newSSBase: 12600, origCompSS: 1043.26, newCompSS: 3049.20, origEmpSS: 452.66, newEmpSS: 1323.00, origCompFund: 211, newCompFund: 630.00, origEmpFund: 211, newEmpFund: 630.00, origCost: 15254.26, newCost: 16279.20, costChange: 1024.94, costPct: 6.7, origNet: 13336.35, newNet: 10647.00, netChange: -2689.35, comment: "公司多花钱，工资降1400；单位社保多2006，公司公积金多419；净变动1025" },
  { id: 13, origSalary: 15000, cutRate: 10.0, cutAmt: 1500, newSalary: 13500, origSSBase: 4311, newSSBase: 13500, origCompSS: 1043.26, newCompSS: 3267.00, origEmpSS: 452.66, newEmpSS: 1417.50, origCompFund: 211, newCompFund: 675.00, origEmpFund: 211, newCompFund: 675.00, origCost: 16254.26, newCost: 17442.00, costChange: 1187.74, costPct: 7.3, origNet: 14336.35, newNet: 11407.50, netChange: -2928.85, comment: "公司多花钱，工资降1500；单位社保多2224，公司公积金多464；净变动1188" },
  { id: 14, origSalary: 16000, cutRate: 15.0, cutAmt: 2400, newSalary: 13600, origSSBase: 4311, newSSBase: 13600, origCompSS: 1043.26, newCompSS: 3291.20, origEmpSS: 452.66, newEmpSS: 1428.00, origCompFund: 211, newCompFund: 680.00, origEmpFund: 211, newCompFund: 680.00, origCost: 17254.26, newCost: 17571.20, costChange: 316.94, costPct: 1.8, origNet: 15336.35, newNet: 11492.00, netChange: -3844.35, comment: "公司多花钱，工资降2400；单位社保多2248，公司公积金多469；净变动317" },
  { id: 15, origSalary: 17000, cutRate: 15.0, cutAmt: 2550, newSalary: 14450, origSSBase: 4311, newSSBase: 14450, origCompSS: 1043.26, newCompSS: 3496.90, origEmpSS: 452.66, newEmpSS: 1517.25, origCompFund: 211, newCompFund: 722.50, origEmpFund: 211, newEmpFund: 722.50, origCost: 18254.26, newCost: 18669.40, costChange: 415.14, costPct: 2.3, origNet: 16336.35, newNet: 12210.25, netChange: -4126.10, comment: "公司多花钱，工资降2550；单位社保多2454，公司公积金多512；净变动415" },
  { id: 16, origSalary: 18000, cutRate: 15.0, cutAmt: 2700, newSalary: 15300, origSSBase: 4311, newSSBase: 15300, origCompSS: 1043.26, newCompSS: 3702.60, origEmpSS: 452.66, newEmpSS: 1606.50, origCompFund: 211, newCompFund: 765.00, origEmpFund: 211, newCompFund: 765.00, origCost: 19254.26, newCost: 19767.60, costChange: 513.34, costPct: 2.7, origNet: 17336.35, newNet: 12928.50, netChange: -4407.85, comment: "公司多花钱，工资降2700；单位社保多2659，公司公积金多554；净变动513" },
  { id: 17, origSalary: 19000, cutRate: 15.0, cutAmt: 2850, newSalary: 16150, origSSBase: 4311, newSSBase: 16150, origCompSS: 1043.26, newCompSS: 3908.30, origEmpSS: 452.66, newEmpSS: 1695.75, origCompFund: 211, newCompFund: 807.50, origEmpFund: 211, newEmpFund: 807.50, origCost: 20254.26, newCost: 20865.80, costChange: 611.54, costPct: 3.0, origNet: 18336.35, newNet: 13646.75, netChange: -4689.60, comment: "公司多花钱，工资降2850；单位社保多2865，公司公积金多597；净变动612" },
  { id: 18, origSalary: 20000, cutRate: 15.0, cutAmt: 3000, newSalary: 17000, origSSBase: 4311, newSSBase: 17000, origCompSS: 1043.26, newCompSS: 4114.00, origEmpSS: 452.66, newEmpSS: 1785.00, origCompFund: 211, newCompFund: 850.00, origEmpFund: 211, newEmpFund: 850.00, origCost: 21254.26, newCost: 21964.00, costChange: 709.74, costPct: 3.3, origNet: 19336.35, newNet: 14365.00, netChange: -4971.35, comment: "公司多花钱，工资降3000；单位社保多3071，公司公积金多639；净变动710" },
  { id: 19, origSalary: 21000, cutRate: 15.0, cutAmt: 3150, newSalary: 17850, origSSBase: 4311, newSSBase: 17850, origCompSS: 1043.26, newCompSS: 4319.70, origEmpSS: 452.66, newEmpSS: 1874.25, origCompFund: 211, newCompFund: 892.50, origEmpFund: 211, newEmpFund: 892.50, origCost: 22254.26, newCost: 23062.20, costChange: 807.94, costPct: 3.6, origNet: 20336.35, newNet: 15083.25, netChange: -5253.10, comment: "公司多花钱，工资降3150；单位社保多3276，公司公积金多682；净变动808" },
  { id: 20, origSalary: 22000, cutRate: 15.0, cutAmt: 3300, newSalary: 18700, origSSBase: 4311, newSSBase: 18700, origCompSS: 1043.26, newCompSS: 4525.40, origEmpSS: 452.66, newEmpSS: 1963.50, origCompFund: 211, newCompFund: 935.00, origEmpFund: 211, newEmpFund: 935.00, origCost: 23254.26, newCost: 24160.40, costChange: 906.14, costPct: 3.9, origNet: 21336.35, newNet: 15801.50, netChange: -5534.85, comment: "公司多花钱，工资降3300；单位社保多482，公司公积金多724；净变动906" },
  { id: 21, origSalary: 23000, cutRate: 15.0, cutAmt: 3450, newSalary: 19550, origSSBase: 4311, newSSBase: 19550, origCompSS: 1043.26, newCompSS: 4731.10, origEmpSS: 452.66, newEmpSS: 2052.75, origCompFund: 211, newCompFund: 977.50, origEmpFund: 211, newEmpFund: 977.50, origCost: 24254.26, newCost: 25258.60, costChange: 1004.34, costPct: 4.1, origNet: 22336.35, newNet: 16519.75, netChange: -5816.60, comment: "公司多花钱，工资降3450；单位社保多3688，公司公积金多767；净变动1004" },
  { id: 22, origSalary: 24000, cutRate: 15.0, cutAmt: 3600, newSalary: 20400, origSSBase: 4311, newSSBase: 20400, origCompSS: 1043.26, newCompSS: 4936.80, origEmpSS: 452.66, newEmpSS: 2142.00, origCompFund: 211, newCompFund: 1020.00, origEmpFund: 211, newEmpFund: 1020.00, origCost: 25254.26, newCost: 26356.80, costChange: 1102.54, costPct: 4.4, origNet: 23336.35, newNet: 17238.00, netChange: -6098.35, comment: "公司多花钱，工资降3600；单位社保多3894，公司公积金多809；净变动1103" },
  { id: 23, origSalary: 25000, cutRate: 15.0, cutAmt: 3750, newSalary: 21250, origSSBase: 4311, newSSBase: 21250, origCompSS: 1043.26, newCompSS: 5142.50, origEmpSS: 452.66, newEmpSS: 2231.25, origCompFund: 211, newCompFund: 1062.50, origEmpFund: 211, newEmpFund: 1062.50, origCost: 26254.26, newCost: 27455.00, costChange: 1200.74, costPct: 4.6, origNet: 24336.35, newNet: 17956.25, netChange: -6380.10, comment: "公司多花钱，工资降3750；单位社保多4099，公司公积金多852；净变动1201" },
  { id: 24, origSalary: 26000, cutRate: 15.0, cutAmt: 3900, newSalary: 22100, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1105.00, origEmpFund: 211, newEmpFund: 1105.00, origCost: 27254.26, newCost: 28421.55, costChange: 1167.29, costPct: 4.3, origNet: 25336.35, newNet: 18731.62, netChange: -6604.73, comment: "公司多花钱，工资降3900；单位社保封顶4173，公积金多894；净变动1167" },
  { id: 25, origSalary: 27000, cutRate: 15.0, cutAmt: 4050, newSalary: 22950, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1147.50, origEmpFund: 211, newEmpFund: 1147.50, origCost: 28254.26, newCost: 29314.06, costChange: 1059.79, costPct: 3.8, origNet: 26336.35, newNet: 19539.12, netChange: -6797.23, comment: "公司多花钱，工资降4050；单位社保封顶4173，公积金多937；净变动1060" },
  { id: 26, origSalary: 28000, cutRate: 15.0, cutAmt: 4200, newSalary: 23800, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1190.00, origEmpFund: 211, newEmpFund: 1190.00, origCost: 29254.26, newCost: 30206.55, costChange: 952.29, costPct: 3.3, origNet: 27336.35, newNet: 20346.62, netChange: -6989.73, comment: "公司多花钱，工资降4200；单位社保封顶4173，公积金多979；净变动952" },
  { id: 27, origSalary: 29000, cutRate: 15.0, cutAmt: 4350, newSalary: 24650, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1232.50, origEmpFund: 211, newEmpFund: 1232.50, origCost: 30254.26, newCost: 31099.05, costChange: 844.79, costPct: 2.8, origNet: 28336.35, newNet: 21154.12, netChange: -7182.23, comment: "公司多花钱，工资降4350；单位社保封顶4173，公积金多1022；净变动845" },
  { id: 28, origSalary: 30000, cutRate: 15.0, cutAmt: 4500, newSalary: 25500, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1275.00, origEmpFund: 211, newEmpFund: 1275.00, origCost: 31254.26, newCost: 31991.55, costChange: 737.29, costPct: 2.4, origNet: 29336.35, newNet: 21961.62, netChange: -7374.73, comment: "公司多花钱，工资降4500；单位社保封顶4173，公积金多1064；净变动737" },
  { id: 29, origSalary: 31000, cutRate: 15.0, cutAmt: 4650, newSalary: 26350, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1317.50, origEmpFund: 211, newCompFund: 1317.50, origCost: 32254.26, newCost: 32884.05, costChange: 629.79, costPct: 2.0, origNet: 30336.35, newNet: 22769.12, netChange: -7567.23, comment: "公司多花钱，工资降4650；单位社保封顶4173，公积金多1107；净变动630" },
  { id: 30, origSalary: 32000, cutRate: 15.0, cutAmt: 4800, newSalary: 27200, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1360.00, origEmpFund: 211, newEmpFund: 1360.00, origCost: 33254.26, newCost: 33776.55, costChange: 522.29, costPct: 1.6, origNet: 31336.35, newNet: 23576.62, netChange: -7759.73, comment: "公司多花钱，工资降4800；单位社保封顶4173，公积金多1149；净变动522" },
  { id: 31, origSalary: 33000, cutRate: 15.0, cutAmt: 4950, newSalary: 28050, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1402.50, origEmpFund: 211, newCompFund: 1402.50, origCost: 34254.26, newCost: 34669.05, costChange: 414.79, costPct: 1.2, origNet: 32336.35, newNet: 24384.12, netChange: -7952.23, comment: "公司多花钱，工资降4950；单位社保封顶4173，公积金多1192；净变动415" },
  { id: 32, origSalary: 34000, cutRate: 15.0, cutAmt: 5100, newSalary: 28900, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1445.00, origEmpFund: 211, newCompFund: 1445.00, origCost: 35254.26, newCost: 35561.55, costChange: 307.29, costPct: 0.9, origNet: 33336.35, newNet: 25191.62, netChange: -8144.73, comment: "公司多花钱，工资降5100；单位社保封顶4173，公积金多1234；净变动307" },
  { id: 33, origSalary: 35000, cutRate: 15.0, cutAmt: 5250, newSalary: 29750, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1487.50, origEmpFund: 211, newEmpFund: 1487.50, origCost: 36254.26, newCost: 36454.05, costChange: 199.79, costPct: 0.6, origNet: 34336.35, newNet: 25999.12, netChange: -8337.23, comment: "公司多花钱，工资降5250；单位社保封顶4173，公积金多1277；净变动200" }
];

// ==========================================
// 2. 自定义极简 SVG 图标库
// ==========================================
const SvgIcons = {
  Insight: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Calculator: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  Table: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Trending: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Warning: () => (
    <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Search: () => (
    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
};

// ==========================================
// 3. 主程序组件
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState('insights');
  
  // 测算沙盘控制状态
  const [sandboxSalary, setSandboxSalary] = useState(10000);
  const [sandboxCutRate, setSandboxCutRate] = useState(5.0); // %
  const [sandboxFundRate, setSandboxFundRate] = useState(5.0); // %
  const [sandboxIsCompliant, setSandboxIsCompliant] = useState(true);

  // 表格过滤与搜索
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('origSalary');
  const [sortDirection, setSortDirection] = useState('asc');

  // 常量配置
  const SS_MIN_BASE = 4311;
  const SS_MAX_BASE = 21556;
  const COMP_SS_RATE = 0.242; 
  const EMP_SS_RATE = 0.105;  
  const HISTORIC_FUND_BASE = 4220; 

  // 沙盘实时计算逻辑
  const sandboxResult = useMemo(() => {
    const origSalary = sandboxSalary;
    
    // 1. 原方案(不合规)
    const origCompSS = SS_MIN_BASE * COMP_SS_RATE;
    const origEmpSS = SS_MIN_BASE * EMP_SS_RATE;
    const origCompFund = HISTORIC_FUND_BASE * 0.05;
    const origEmpFund = HISTORIC_FUND_BASE * 0.05;
    const origTotalCost = origSalary + origCompSS + origCompFund;
    const origNet = origSalary - origEmpSS - origEmpFund;

    // 2. 调整方案 (含降薪 + 是否合规实缴)
    const newSalary = origSalary * (1 - sandboxCutRate / 100);
    const newSSBase = sandboxIsCompliant ? Math.max(SS_MIN_BASE, Math.min(SS_MAX_BASE, newSalary)) : SS_MIN_BASE;
    const newFundBase = sandboxIsCompliant ? newSalary : HISTORIC_FUND_BASE;

    const newCompSS = newSSBase * COMP_SS_RATE;
    const newEmpSS = newSSBase * EMP_SS_RATE;
    const newCompFund = newFundBase * (sandboxFundRate / 100);
    const newEmpFund = newFundBase * (sandboxFundRate / 100);

    const newTotalCost = newSalary + newCompSS + newCompFund;
    const newNet = newSalary - newEmpSS - newEmpFund;

    const costChange = newTotalCost - origTotalCost;
    const costPct = (costChange / origTotalCost) * 100;
    const netChange = newNet - origNet;
    const netPct = (netChange / origNet) * 100;

    return {
      orig: {
        salary: origSalary,
        ssBase: SS_MIN_BASE,
        fundBase: HISTORIC_FUND_BASE,
        compSS: origCompSS,
        empSS: origEmpSS,
        compFund: origCompFund,
        empFund: origEmpFund,
        totalCost: origTotalCost,
        net: origNet
      },
      new: {
        salary: newSalary,
        ssBase: newSSBase,
        fundBase: newFundBase,
        compSS: newCompSS,
        empSS: newEmpSS,
        compFund: newCompFund,
        empFund: newEmpFund,
        totalCost: newTotalCost,
        net: newNet
      },
      diff: {
        costChange,
        costPct,
        netChange,
        netPct
      }
    };
  }, [sandboxSalary, sandboxCutRate, sandboxFundRate, sandboxIsCompliant]);

  // 表格数据过滤与排序 - 完美补充排序参数类型
  const filteredData = useMemo(() => {
    let result = [...PDF_RAW_DATA];
    if (searchTerm) {
      result = result.filter((r: any) => 
        r.origSalary.toString().includes(searchTerm) || 
        r.comment.includes(searchTerm)
      );
    }
    result.sort((a: any, b: any) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (sortDirection === 'asc') {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });
    return result;
  }, [searchTerm, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* 顶部标题栏 */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 text-xs font-semibold rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                董事会/高管决策参考
              </span>
              <span className="text-slate-500 text-xs">| 数据模型：全口径实缴复算基准</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-400 bg-clip-text text-transparent mt-1">
              企业薪酬调整与合规实缴测算沙盘
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              通过 4,500 ~ 35,000 元33个薪资档位的穿透计算，深度拆解“降薪与合规并存时”企业与员工的双向账本。
            </p>
          </div>

          {/* Tab 菜单 */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('insights')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'insights' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <SvgIcons.Insight />
              战略洞察报告
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'sandbox' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <SvgIcons.Calculator />
              交互决策沙盘
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'table' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <SvgIcons.Table />
              33档精细对照表
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'trends' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <SvgIcons.Trending />
              全局变化趋势
            </button>
          </div>
        </div>
      </header>

      {/* 主体核心区域 */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        
        {/* TAB 1: 核心决策洞察报告 */}
        {activeTab === 'insights' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent border border-amber-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-start gap-4 shadow-xl">
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl mt-1">
                <SvgIcons.Warning />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-amber-400">警惕两败俱伤的“合规实缴悖论”</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  数据模型显示：<strong>所有档位在调整后，企业总人力成本无一例外全部“不降反升”</strong>，哪怕对中高层降薪 15%，也依然无法对冲社保公积金从“最低基数自缴”转向“实际薪酬实缴”带来的合规溢价。与此同时，员工的到手薪资受“降薪和自缴上升”双重挤压出现断崖式下跌。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">发现 1</span>
                    <span className="text-xs text-rose-400">最难降本区</span>
                  </div>
                  <h4 className="text-base font-bold text-white">中基层 (10k-15k) 是重灾区</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    在 <strong>10,000元档位</strong>，即便企业实施 5.0% 的降薪（降薪500元），但由于基数足额实缴，<strong>企业成本依然暴增 9.1% (+1,020元)</strong>，同时员工到手骤降 <strong>-14.0% (-1,309元)</strong>。
                  </p>
                </div>
                <div className="border-t border-slate-800 mt-5 pt-3 flex justify-between items-center">
                  <span className="text-xs text-slate-500">企业成本增幅最高峰</span>
                  <span className="text-sm font-bold text-rose-400">+9.1%</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">发现 2</span>
                    <span className="text-xs text-amber-400">高层痛感高</span>
                  </div>
                  <h4 className="text-base font-bold text-white">高层降薪到手腰斩式下跌</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    在 <strong>35,000元最高档位</strong>，企业即使采取 15% 顶格降薪（降薪5,250元），<strong>企业成本仍需微增 199.79 元 (+0.6%)</strong>。而员工实际到手净减少 <strong>-8,337.23 元 (-24.3%)</strong>，面临极大流失和负面情绪风险。
                  </p>
                </div>
                <div className="border-t border-slate-800 mt-5 pt-3 flex justify-between items-center">
                  <span className="text-xs text-slate-500">员工到手薪资最大降幅</span>
                  <span className="text-sm font-bold text-rose-500">-24.3%</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">发现 3</span>
                    <span className="text-xs text-emerald-400">合规红线</span>
                  </div>
                  <h4 className="text-base font-bold text-white">社保封顶线提供了一定缓冲</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    当原工资超过 26,000 元后，由于降薪后的工资（22,100元以上）均已超过社保缴费基数上限 <strong>21,556元</strong>，使得社保成本被封死不再增加，企业成本变动趋势才得以从暴增回到微增。
                  </p>
                </div>
                <div className="border-t border-slate-800 mt-5 pt-3 flex justify-between items-center">
                  <span className="text-xs text-slate-500">目前城市社保上限基数</span>
                  <span className="text-sm font-bold text-emerald-400">21,556 元</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 交互式测算沙盘 */}
        {activeTab === 'sandbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white">沙盘模拟控制端</h3>
                <p className="text-xs text-slate-400">实时调配算力进行精算推演</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">1. 原月薪标准(1人)</span>
                  <span className="text-indigo-400 font-bold text-sm">¥ {sandboxSalary.toLocaleString()} 元</span>
                </div>
                <input 
                  type="range" 
                  min="4500" 
                  max="50000" 
                  step="500"
                  value={sandboxSalary} 
                  onChange={(e) => setSandboxSalary(Number(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">2. 降薪比例</span>
                  <span className="text-amber-500 font-bold text-sm">{sandboxCutRate.toFixed(1)} %</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="40" 
                  step="0.5"
                  value={sandboxCutRate} 
                  onChange={(e) => setSandboxCutRate(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block">3. 调整后采用足额合规实缴？</label>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={sandboxIsCompliant}
                      onChange={() => setSandboxIsCompliant(!sandboxIsCompliant)}
                      id="compliant-toggle"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="w-full flex justify-around items-end bg-slate-950 rounded-xl p-6 border border-slate-850 h-[300px] relative">
                <div className="flex flex-col items-center w-1/3 z-10">
                  <div className="text-xs text-slate-400 font-semibold mb-2">¥{sandboxResult.orig.totalCost.toFixed(0)}</div>
                  <div className="w-16 flex flex-col-reverse rounded-t-lg overflow-hidden h-[180px] shadow-2xl">
                    <div style={{ height: `${(sandboxResult.orig.net / sandboxResult.orig.totalCost) * 100}%` }} className="bg-blue-600"></div>
                    <div style={{ height: `${(sandboxResult.orig.empSS / sandboxResult.orig.totalCost) * 100}%` }} className="bg-blue-400"></div>
                    <div style={{ height: `${(sandboxResult.orig.empFund / sandboxResult.orig.totalCost) * 100}%` }} className="bg-sky-300"></div>
                    <div style={{ height: `${(sandboxResult.orig.compSS / sandboxResult.orig.totalCost) * 100}%` }} className="bg-indigo-600"></div>
                    <div style={{ height: `${(sandboxResult.orig.compFund / sandboxResult.orig.totalCost) * 100}%` }} className="bg-indigo-400"></div>
                  </div>
                  <div className="text-[11px] font-bold text-slate-300 mt-3">原方案</div>
                </div>

                <div className="flex flex-col items-center w-1/3 z-10">
                  <div className="text-xs text-slate-200 font-semibold mb-2">¥{sandboxResult.new.totalCost.toFixed(0)}</div>
                  <div className="w-16 flex flex-col-reverse rounded-t-lg overflow-hidden h-[180px] shadow-2xl">
                    <div style={{ height: `${(sandboxResult.new.net / sandboxResult.new.totalCost) * 100}%` }} className="bg-blue-600"></div>
                    <div style={{ height: `${(sandboxResult.new.empSS / sandboxResult.new.totalCost) * 100}%` }} className="bg-blue-400"></div>
                    <div style={{ height: `${(sandboxResult.new.empFund / sandboxResult.new.totalCost) * 100}%` }} className="bg-sky-300"></div>
                    <div style={{ height: `${(sandboxResult.new.compSS / sandboxResult.new.totalCost) * 100}%` }} className="bg-indigo-600"></div>
                    <div style={{ height: `${(sandboxResult.new.compFund / sandboxResult.new.totalCost) * 100}%` }} className="bg-indigo-400"></div>
                  </div>
                  <div className="text-[11px] font-bold text-slate-100 mt-3">新方案</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 33档精细对照表 */}
        {activeTab === 'table' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="relative flex-1 max-w-md">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SvgIcons.Search />
                </span>
                <input
                  type="text"
                  placeholder="搜索原工资档位..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-950 text-slate-400 text-xs font-bold sticky top-0 z-10 border-b border-slate-800">
                    <tr>
                      <th className="p-3.5 pl-5 cursor-pointer" onClick={() => handleSort('id')}>序号</th>
                      <th className="p-3.5 cursor-pointer" onClick={() => handleSort('origSalary')}>原月工资</th>
                      <th className="p-3.5">降薪比</th>
                      <th className="p-3.5">降薪后工资</th>
                      <th className="p-3.5">原成本</th>
                      <th className="p-3.5">现成本</th>
                      <th className="p-3.5 text-indigo-400 cursor-pointer" onClick={() => handleSort('costChange')}>企业成本变化</th>
                      <th className="p-3.5 text-rose-400 cursor-pointer" onClick={() => handleSort('netChange')}>员工到手变动</th>
                      <th className="p-3.5 pr-5 max-w-xs">精算复算结论</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-slate-800/65 bg-slate-900/40">
                    {filteredData.map((row: any) => (
                      <tr key={row.id} className="hover:bg-slate-800/50 transition">
                        <td className="p-3.5 pl-5 text-slate-500 font-mono">{row.id}</td>
                        <td className="p-3.5 font-bold text-slate-200">¥{row.origSalary.toLocaleString()}</td>
                        <td className="p-3.5 text-amber-400">{row.cutRate.toFixed(1)}%</td>
                        <td className="p-3.5">¥{row.newSalary.toLocaleString()}</td>
                        <td className="p-3.5 text-slate-400">¥{row.origCost.toLocaleString()}</td>
                        <td className="p-3.5 text-slate-300 font-semibold">¥{row.newCost.toLocaleString()}</td>
                        <td className="p-3.5 font-bold text-rose-400">+¥{row.costChange.toFixed(1)} (+{row.costPct}%)</td>
                        <td className="p-3.5 font-bold text-amber-500">-¥{Math.abs(row.netChange).toFixed(1)}</td>
                        <td className="p-3.5 pr-5 text-[11px] text-slate-400 max-w-xs truncate">{row.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 全局变化趋势 */}
        {activeTab === 'trends' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-6">全局五险一金精算递增变动走向</h3>
              <div className="w-full bg-slate-950 rounded-xl p-6 border border-slate-800/50">
                <div className="h-[250px] w-full relative flex items-end">
                  <div className="w-full h-full flex justify-between items-end px-4 z-10">
                    {PDF_RAW_DATA.filter((_, idx) => idx % 3 === 0 || idx === 32).map((row: any, index: number) => {
                      const barHeight = (row.costPct / 10) * 200;
                      return (
                        <div key={index} className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer relative">
                          <div style={{ height: `${barHeight}px` }} className="w-4 bg-gradient-to-t from-indigo-600/40 to-indigo-500 rounded-t-sm"></div>
                          <span className="text-[9px] text-slate-500 mt-2">{row.origSalary >= 10000 ? `${row.origSalary/1000}k` : row.origSalary}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-6 text-center text-xs text-slate-600">
        <p>© 2026 企业合规与成本分析决策系统. 数据遵循 PDF 明细原表精算口径.</p>
      </footer>

    </div>
  );
}