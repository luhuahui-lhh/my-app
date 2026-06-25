'use client'
import React, { useState, useMemo } from 'react';

// ==========================================
// 33档完整源数据...
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
  { id: 13, origSalary: 15000, cutRate: 10.0, cutAmt: 1500, newSalary: 13500, origSSBase: 4311, newSSBase: 13500, origCompSS: 1043.26, newCompSS: 3267.00, origEmpSS: 452.66, newEmpSS: 1417.50, origCompFund: 211, newCompFund: 675.00, origEmpFund: 211, newEmpFund: 675.00, origCost: 16254.26, newCost: 17442.00, costChange: 1187.74, costPct: 7.3, origNet: 14336.35, newNet: 11407.50, netChange: -2928.85, comment: "公司多花钱，工资降1500；单位社保多2224，公司公积金多464；净变动1188" },
  { id: 14, origSalary: 16000, cutRate: 15.0, cutAmt: 2400, newSalary: 13600, origSSBase: 4311, newSSBase: 13600, origCompSS: 1043.26, newCompSS: 3291.20, origEmpSS: 452.66, newEmpSS: 1428.00, origCompFund: 211, newCompFund: 680.00, origEmpFund: 211, newEmpFund: 680.00, origCost: 17254.26, newCost: 17571.20, costChange: 316.94, costPct: 1.8, origNet: 15336.35, newNet: 11492.00, netChange: -3844.35, comment: "公司多花钱，工资降2400；单位社保多2248，公司公积金多469；净变动317" },
  { id: 15, origSalary: 17000, cutRate: 15.0, cutAmt: 2550, newSalary: 14450, origSSBase: 4311, newSSBase: 14450, origCompSS: 1043.26, newCompSS: 3496.90, origEmpSS: 452.66, newEmpSS: 1517.25, origCompFund: 211, newCompFund: 722.50, origEmpFund: 211, newEmpFund: 722.50, origCost: 18254.26, newCost: 18669.40, costChange: 415.14, costPct: 2.3, origNet: 16336.35, newNet: 12210.25, netChange: -4126.10, comment: "公司多花钱，工资降2550；单位社保多2454，公司公积金多512；净变动415" },
  { id: 16, origSalary: 18000, cutRate: 15.0, cutAmt: 2700, newSalary: 15300, origSSBase: 4311, newSSBase: 15300, origCompSS: 1043.26, newCompSS: 3702.60, origEmpSS: 452.66, newEmpSS: 1606.50, origCompFund: 211, newCompFund: 765.00, origEmpFund: 211, newEmpFund: 765.00, origCost: 19254.26, newCost: 19767.60, costChange: 513.34, costPct: 2.7, origNet: 17336.35, newNet: 12928.50, netChange: -4407.85, comment: "公司多花钱，工资降2700；单位社保多2659，公司公积金多554；净变动513" },
  { id: 17, origSalary: 19000, cutRate: 15.0, cutAmt: 2850, newSalary: 16150, origSSBase: 4311, newSSBase: 16150, origCompSS: 1043.26, newCompSS: 3908.30, origEmpSS: 452.66, newEmpSS: 1695.75, origCompFund: 211, newCompFund: 807.50, origEmpFund: 211, newEmpFund: 807.50, origCost: 20254.26, newCost: 20865.80, costChange: 611.54, costPct: 3.0, origNet: 18336.35, newNet: 13646.75, netChange: -4689.60, comment: "公司多花钱，工资降2850；单位社保多2865，公司公积金多597；净变动612" },
  { id: 18, origSalary: 20000, cutRate: 15.0, cutAmt: 3000, newSalary: 17000, origSSBase: 4311, newSSBase: 17000, origCompSS: 1043.26, newCompSS: 4114.00, origEmpSS: 452.66, newEmpSS: 1785.00, origCompFund: 211, newCompFund: 850.00, origEmpFund: 211, newEmpFund: 850.00, origCost: 21254.26, newCost: 21964.00, costChange: 709.74, costPct: 3.3, origNet: 19336.35, newNet: 14365.00, netChange: -4971.35, comment: "公司多花钱，工资降3000；单位社保多3071，公司公积金多639；净变动710" },
  { id: 19, origSalary: 21000, cutRate: 15.0, cutAmt: 3150, newSalary: 17850, origSSBase: 4311, newSSBase: 17850, origCompSS: 1043.26, newCompSS: 4319.70, origEmpSS: 452.66, newEmpSS: 1874.25, origCompFund: 211, newCompFund: 892.50, origEmpFund: 211, newEmpFund: 892.50, origCost: 22254.26, newCost: 23062.20, costChange: 807.94, costPct: 3.6, origNet: 20336.35, newNet: 15083.25, netChange: -5253.10, comment: "公司多花钱，工资降3150；单位社保多3276，公司公积金多682；净变动808" },
  { id: 20, origSalary: 22000, cutRate: 15.0, cutAmt: 3300, newSalary: 18700, origSSBase: 4311, newSSBase: 18700, origCompSS: 1043.26, newCompSS: 4525.40, origEmpSS: 452.66, newEmpSS: 1963.50, origCompFund: 211, newCompFund: 935.00, origEmpFund: 211, newEmpFund: 935.00, origCost: 23254.26, newCost: 24160.40, costChange: 906.14, costPct: 3.9, origNet: 21336.35, newNet: 15801.50, netChange: -5534.85, comment: "公司多花钱，工资降3300；单位社保多3482，公司公积金多724；净变动906" },
  { id: 21, origSalary: 23000, cutRate: 15.0, cutAmt: 3450, newSalary: 19550, origSSBase: 4311, newSSBase: 19550, origCompSS: 1043.26, newCompSS: 4731.10, origEmpSS: 452.66, newEmpSS: 2052.75, origCompFund: 211, newCompFund: 977.50, origEmpFund: 211, newEmpFund: 977.50, origCost: 24254.26, newCost: 25258.60, costChange: 1004.34, costPct: 4.1, origNet: 22336.35, newNet: 16519.75, netChange: -5816.60, comment: "公司多花钱，工资降3450；单位社保多3688，公司公积金多767；净变动1004" },
  { id: 22, origSalary: 24000, cutRate: 15.0, cutAmt: 3600, newSalary: 20400, origSSBase: 4311, newSSBase: 20400, origCompSS: 1043.26, newCompSS: 4936.80, origEmpSS: 452.66, newEmpSS: 2142.00, origCompFund: 211, newCompFund: 1020.00, origEmpFund: 211, newEmpFund: 1020.00, origCost: 25254.26, newCost: 26356.80, costChange: 1102.54, costPct: 4.4, origNet: 23336.35, newNet: 17238.00, netChange: -6098.35, comment: "公司多花钱，工资降3600；单位社保多3894，公司公积金多809；净变动1103" },
  { id: 23, origSalary: 25000, cutRate: 15.0, cutAmt: 3750, newSalary: 21250, origSSBase: 4311, newSSBase: 21250, origCompSS: 1043.26, newCompSS: 5142.50, origEmpSS: 452.66, newEmpSS: 2231.25, origCompFund: 211, newCompFund: 1062.50, origEmpFund: 211, newEmpFund: 1062.50, origCost: 26254.26, newCost: 27455.00, costChange: 1200.74, costPct: 4.6, origNet: 24336.35, newNet: 17956.25, netChange: -6380.10, comment: "公司多花钱，工资降3750；单位社保多4099，公司公积金多852；净变动1201" },
  { id: 24, origSalary: 26000, cutRate: 15.0, cutAmt: 3900, newSalary: 22100, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1105.00, origEmpFund: 211, newEmpFund: 1105.00, origCost: 27254.26, newCost: 28421.55, costChange: 1167.29, costPct: 4.3, origNet: 25336.35, newNet: 18731.62, netChange: -6604.73, comment: "公司多花钱，工资降3900；单位社保封顶4173，公积金多894；净变动1167" },
  { id: 25, origSalary: 27000, cutRate: 15.0, cutAmt: 4050, newSalary: 22950, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1147.50, origEmpFund: 211, newEmpFund: 1147.50, origCost: 28254.26, newCost: 29314.06, costChange: 1059.79, costPct: 3.8, origNet: 26336.35, newNet: 19539.12, netChange: -6797.23, comment: "公司多花钱，工资降4050；单位社保封顶4173，公积金多937；净变动1060" },
  { id: 26, origSalary: 28000, cutRate: 15.0, cutAmt: 4200, newSalary: 23800, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1190.00, origEmpFund: 211, newEmpFund: 1190.00, origCost: 29254.26, newCost: 30206.55, costChange: 952.29, costPct: 3.3, origNet: 27336.35, newNet: 20346.62, netChange: -6989.73, comment: "公司多花钱，工资降4200；单位社保封顶4173，公积金多979；净变动952" },
  { id: 27, origSalary: 29000, cutRate: 15.0, cutAmt: 4350, newSalary: 24650, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1232.50, origEmpFund: 211, newEmpFund: 1232.50, origCost: 30254.26, newCost: 31099.05, costChange: 844.79, costPct: 2.8, origNet: 28336.35, newNet: 21154.12, netChange: -7182.23, comment: "公司多花钱，工资降4350；单位社保封顶4173，公积金多1022；净变动845" },
  { id: 28, origSalary: 30000, cutRate: 15.0, cutAmt: 4500, newSalary: 25500, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1275.00, origEmpFund: 211, newEmpFund: 1275.00, origCost: 31254.26, newCost: 31991.55, costChange: 737.29, costPct: 2.4, origNet: 29336.35, newNet: 21961.62, netChange: -7374.73, comment: "公司多花钱，工资降4500；单位社保封顶4173，公积金多1064；净变动737" },
  { id: 29, origSalary: 31000, cutRate: 15.0, cutAmt: 4650, newSalary: 26350, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1317.50, origEmpFund: 211, newEmpFund: 1317.50, origCost: 32254.26, newCost: 32884.05, costChange: 629.79, costPct: 2.0, origNet: 30336.35, newNet: 22769.12, netChange: -7567.23, comment: "公司多花钱，工资降4650；单位社保封顶4173，公积金多1107；净变动630" },
  { id: 30, origSalary: 32000, cutRate: 15.0, cutAmt: 4800, newSalary: 27200, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1360.00, origEmpFund: 211, newEmpFund: 1360.00, origCost: 33254.26, newCost: 33776.55, costChange: 522.29, costPct: 1.6, origNet: 31336.35, newNet: 23576.62, netChange: -7759.73, comment: "公司多花钱，工资降4800；单位社保封顶4173，公积金多1149；净变动522" },
  { id: 31, origSalary: 33000, cutRate: 15.0, cutAmt: 4950, newSalary: 28050, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1402.50, origEmpFund: 211, newEmpFund: 1402.50, origCost: 34254.26, newCost: 34669.05, costChange: 414.79, costPct: 1.2, origNet: 32336.35, newNet: 24384.12, netChange: -7952.23, comment: "公司多花钱，工资降4950；单位社保封顶4173，公积金多1192；净变动415" },
  { id: 32, origSalary: 34000, cutRate: 15.0, cutAmt: 5100, newSalary: 28900, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1445.00, origEmpFund: 211, newEmpFund: 1445.00, origCost: 35254.26, newCost: 35561.55, costChange: 307.29, costPct: 0.9, origNet: 33336.35, newNet: 25191.62, netChange: -8144.73, comment: "公司多花钱，工资降5100；单位社保封顶4173，公积金多1234；净变动307" },
  { id: 33, origSalary: 35000, cutRate: 15.0, cutAmt: 5250, newSalary: 29750, origSSBase: 4311, newSSBase: 21556, origCompSS: 1043.26, newCompSS: 5216.55, origEmpSS: 452.66, newEmpSS: 2263.30, origCompFund: 211, newCompFund: 1487.50, origEmpFund: 211, newEmpFund: 1487.50, origCost: 36254.26, newCost: 36454.05, costChange: 199.79, costPct: 0.6, origNet: 34336.35, newNet: 25999.12, netChange: -8337.23, comment: "公司多花钱，工资降5250；单位社保封顶4173，公积金多1277；净变动200" }
];

// ==========================================
// 2. 自定义极简 SVG 图标库 (免引入报错)
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
  Check: () => (
    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Search: () => (
    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  ArrowUp: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),
  ArrowDown: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
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

  // 常量配置（对应测算规则）
  const SS_MIN_BASE = 4311;
  const SS_MAX_BASE = 21556;
  const COMP_SS_RATE = 0.242; // 1043.26 / 4311
  const EMP_SS_RATE = 0.105;  // 452.66 / 4311
  const HISTORIC_FUND_BASE = 4220; // 历史公积金底数 (211 / 0.05)

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

  // 表格数据过滤与排序
  const filteredData = useMemo(() => {
    let result = [...PDF_RAW_DATA];
    if (searchTerm) {
      result = result.filter(r => 
        r.origSalary.toString().includes(searchTerm) || 
        r.comment.includes(searchTerm)
      );
    }
    result.sort((a, b) => {
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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // 默认降序
    }
  };

  // 全局趋势图表计算用高度
  const maxChangeInRaw = Math.max(...PDF_RAW_DATA.map(d => d.costChange));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* 顶部高端标题栏 */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 text-xs font-semibold rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                董事会/高管决策参考
              </span>
              <span className="text-slate-500 text-xs">| 数据模型：深圳/主流城市基准口径</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-400 bg-clip-text text-transparent mt-1">
              企业薪酬调整与合规实缴测算沙盘
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              通过 4,500 ~ 35,000 元33个薪资档位的穿透计算，深度拆解“降薪与合规并存时”企业与员工的双向账本。
            </p>
          </div>

          {/* 交互式 Tab 菜单 */}
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
            
            {/* 顶栏警告：揭示悖论 */}
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

            {/* 洞察看板三大核心发现 */}
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

            {/* 战略建议板块 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">来自专业咨询的优化应对策略 (供决策)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-indigo-500/10 text-xs">1</span>
                    薪资包重构：引入“递延与弹性福利”
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    企业在面临不得不进行合规缴费的刚性支出时，应避免采用简单的“直接降固定薪资”策略。可考虑将固定工资中一定比例，优化转换为不纳入社保核定基数的合规津贴、商业险、弹性交通补贴或季度/年度递延绩效考核包。
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-indigo-500/10 text-xs">2</span>
                    高管层可探讨“事业合伙人/股权激励”
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    对于年薪 25-40 万（如 2.5w 档以上）的骨干，其公积金和个人所得税流失极大。企业可将其直接降薪的幅度转换为企业合伙股权红利、或科技合伙转包。在合规的同时，激活骨干的经营责任感。
                  </p>
                </div>

              </div>
            </div>

            {/* 代表性典型档位测算直观对比 */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white">典型案例对比分析表 (最受高管层关注的三组员工)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. 基层典型 5,000 元档 */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-xs text-slate-400">代表：基层生产/销售</span>
                    <h4 className="text-base font-bold text-white">原月薪 5,000 元档位</h4>
                    <p className="text-xs text-slate-500">降薪比例: 0% / 完全未降薪</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800/60">
                      <div className="text-[10px] text-slate-500">企业总人力成本</div>
                      <div className="text-sm font-bold text-slate-300">原: 6,254.26 元</div>
                      <div className="text-sm font-bold text-rose-400">新: 6,460.00 元</div>
                      <div className="text-[10px] text-rose-400/80 font-medium mt-1">成本多出 +3.3% (+206)</div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800/60">
                      <div className="text-[10px] text-slate-500">员工实际到手薪资</div>
                      <div className="text-sm font-bold text-slate-300">原: 4,336.35 元</div>
                      <div className="text-sm font-bold text-rose-500">新: 4,225.00 元</div>
                      <div className="text-[10px] text-rose-500/80 font-medium mt-1">到手减损 -2.6% (-111)</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 italic bg-slate-950/40 p-2 rounded">
                    结论：即便不降薪，员工依然因个人实缴社保上升，到手少拿111元；企业也需多花206元。
                  </p>
                </div>

                {/* 2. 中层骨干 10,000 元档 */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-xs text-slate-400">代表：组长/主管级骨干</span>
                    <h4 className="text-base font-bold text-white">原月薪 10,000 元档位</h4>
                    <p className="text-xs text-slate-500">降薪比例: 5.0% / 降薪额: 500元</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800/60">
                      <div className="text-[10px] text-slate-500">企业总人力成本</div>
                      <div className="text-sm font-bold text-slate-300">原: 11,254.26 元</div>
                      <div className="text-sm font-bold text-rose-400">新: 12,274.00 元</div>
                      <div className="text-[10px] text-rose-400/80 font-medium mt-1">成本多出 +9.1% (+1,020)</div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800/60">
                      <div className="text-[10px] text-slate-500">员工实际到手薪资</div>
                      <div className="text-sm font-bold text-slate-300">原: 9,336.35 元</div>
                      <div className="text-sm font-bold text-rose-500">新: 8,027.50 元</div>
                      <div className="text-[10px] text-rose-500/80 font-medium mt-1">到手减损 -14.0% (-1309)</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 italic bg-slate-950/40 p-2 rounded">
                    结论：最惨“成本倒挂区”，降薪未达成降本初衷，企业平白增加一千，员工面临严重的不满情绪。
                  </p>
                </div>

                {/* 3. 高层典型 20,000 元档 */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-xs text-slate-400">代表：部门总监/技术核心</span>
                    <h4 className="text-base font-bold text-white">原月薪 20,000 元档位</h4>
                    <p className="text-xs text-slate-500">降薪比例: 15.0% / 降薪额: 3000元</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800/60">
                      <div className="text-[10px] text-slate-500">企业总人力成本</div>
                      <div className="text-sm font-bold text-slate-300">原: 21,254.26 元</div>
                      <div className="text-sm font-bold text-rose-400">新: 21,964.00 元</div>
                      <div className="text-[10px] text-rose-400/80 font-medium mt-1">成本多出 +3.3% (+710)</div>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800/60">
                      <div className="text-[10px] text-slate-500">员工实际到手薪资</div>
                      <div className="text-sm font-bold text-slate-300">原: 19,336.35 元</div>
                      <div className="text-sm font-bold text-rose-500">新: 14,365.00 元</div>
                      <div className="text-[10px] text-rose-500/80 font-medium mt-1">到手减损 -25.7% (-4971)</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 italic bg-slate-950/40 p-2 rounded">
                    结论：高管对合规最敏感，自掏腰包补足五险一金导致到手工资直接少领近5,000元。
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: 交互式测算沙盘 (含 5 层堆积图) */}
        {activeTab === 'sandbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            
            {/* 左侧控制区 */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white">沙盘模拟控制端</h3>
                <p className="text-xs text-slate-400">拖动滑块实时模拟，自研企业最契合的薪资制度组合</p>
              </div>

              {/* 原工资控制 */}
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
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>¥ 4,500</span>
                  <span>中位线 ¥ 20,000</span>
                  <span>上限 ¥ 50,000</span>
                </div>
              </div>

              {/* 降薪幅度控制 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">2. 降薪比例 (针对该员工)</span>
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
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0% (无调整)</span>
                  <span>10% (常规)</span>
                  <span>40% (顶格收缩)</span>
                </div>
              </div>

              {/* 合规基数开关 */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block">3. 调整后采用足额合规实缴？</label>
                    <span className="text-[10px] text-slate-500">原方案统一按最低基数自缴</span>
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

                {/* 仅在合规实缴开启时，显示公积金缴存比例选择 */}
                {sandboxIsCompliant && (
                  <div className="space-y-1.5 border-t border-slate-800 pt-3 animate-slideDown">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">公积金单位及个人缴存比例:</span>
                      <span className="text-indigo-400 font-bold">{sandboxFundRate}%</span>
                    </div>
                    <div className="flex gap-2">
                      {[5, 7, 8, 10, 12].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => setSandboxFundRate(rate)}
                          className={`flex-1 py-1 text-xs font-semibold rounded transition ${
                            sandboxFundRate === rate 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {rate}%
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 沙盘结论速览卡 */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-xs">
                <span className="font-semibold text-slate-200">此方案策略透视：</span>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">企业总支出变动：</span>
                    <span className={`font-bold ${sandboxResult.diff.costChange >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {sandboxResult.diff.costChange >= 0 ? '多花' : '节省'} {Math.abs(sandboxResult.diff.costChange).toFixed(2)} 元 
                      ({sandboxResult.diff.costChange >= 0 ? '+' : ''}{sandboxResult.diff.costPct.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">员工到手变动：</span>
                    <span className={`font-bold ${sandboxResult.diff.netChange >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                      {sandboxResult.diff.netChange >= 0 ? '多得' : '少得'} {Math.abs(sandboxResult.diff.netChange).toFixed(2)} 元 
                      ({sandboxResult.diff.netPct.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="border-t border-slate-800 pt-2.5 text-[11px] text-slate-400 italic">
                  {sandboxResult.diff.costChange > 0 && sandboxResult.diff.netChange < 0 ? (
                    <span className="text-amber-400/90 block">
                      📌 核心诊断：典型的“高成本高流失”方案。即使您对工资进行了扣减，社保合规压力依然使得您的人头开支大幅走高，且员工由于到手折损极大，存在核心技术泄露或突然离职的隐藏业务危险。
                    </span>
                  ) : (
                    <span className="text-emerald-400 block">
                      📌 核心诊断：此测算区间企业人力总开销得到了适当的缓减。请注意评估由于到手薪水下降对基层生产效率产生的负面作用。
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* 右侧可视化图形区 */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">前后全口径总人力成本堆积对比</h3>
                    <p className="text-xs text-slate-400">穿透展现五大板块（到手、个缴五险一金、单缴五险一金）的结构分配</p>
                  </div>
                  <span className="text-[10px] text-indigo-400 font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                    5层堆叠模型
                  </span>
                </div>

                {/* 动态堆叠柱状图 (SVG 完美自绘，解决响应式和渲染崩溃) */}
                <div className="w-full flex justify-around items-end bg-slate-950 rounded-xl p-6 border border-slate-850 h-[300px] relative">
                  
                  {/* 背景参考格线线 */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none text-slate-800">
                    <div className="border-b border-slate-800/50 w-full h-0"></div>
                    <div className="border-b border-slate-800/50 w-full h-0"></div>
                    <div className="border-b border-slate-800/50 w-full h-0"></div>
                    <div className="border-b border-slate-800/50 w-full h-0"></div>
                  </div>

                  {/* 柱状1：原方案 (低基数自缴) */}
                  <div className="flex flex-col items-center w-1/3 z-10">
                    <div className="text-xs text-slate-400 font-semibold mb-2">
                      ¥{sandboxResult.orig.totalCost.toFixed(0)}
                    </div>
                    
                    {/* 堆积条 */}
                    <div className="w-16 flex flex-col-reverse rounded-t-lg overflow-hidden h-[180px] shadow-2xl transition-all duration-300">
                      {/* 1. 员工到手 (蓝色) */}
                      <div 
                        style={{ height: `${(sandboxResult.orig.net / sandboxResult.orig.totalCost) * 100}%` }}
                        className="bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer group relative"
                        title={`员工净到手: ¥${sandboxResult.orig.net.toFixed(2)}`}
                      ></div>
                      {/* 2. 个人社保 (蓝浅) */}
                      <div 
                        style={{ height: `${(sandboxResult.orig.empSS / sandboxResult.orig.totalCost) * 100}%` }}
                        className="bg-blue-400 hover:bg-blue-300 transition-colors cursor-pointer"
                        title={`个人社保扣款: ¥${sandboxResult.orig.empSS.toFixed(2)}`}
                      ></div>
                      {/* 3. 个人公积金 (蓝白) */}
                      <div 
                        style={{ height: `${(sandboxResult.orig.empFund / sandboxResult.orig.totalCost) * 100}%` }}
                        className="bg-sky-300 hover:bg-sky-200 transition-colors cursor-pointer"
                        title={`个人公积金扣款: ¥${sandboxResult.orig.empFund.toFixed(2)}`}
                      ></div>
                      {/* 4. 单位社保 (紫深) */}
                      <div 
                        style={{ height: `${(sandboxResult.orig.compSS / sandboxResult.orig.totalCost) * 100}%` }}
                        className="bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer"
                        title={`单位缴纳社保: ¥${sandboxResult.orig.compSS.toFixed(2)}`}
                      ></div>
                      {/* 5. 单位公积金 (紫浅) */}
                      <div 
                        style={{ height: `${(sandboxResult.orig.compFund / sandboxResult.orig.totalCost) * 100}%` }}
                        className="bg-indigo-400 hover:bg-indigo-300 transition-colors cursor-pointer"
                        title={`单位缴纳公积金: ¥${sandboxResult.orig.compFund.toFixed(2)}`}
                      ></div>
                    </div>

                    <div className="text-[11px] font-bold text-slate-300 mt-3 text-center">
                      原方案 (低缴)
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      (基数: {sandboxResult.orig.ssBase}/{sandboxResult.orig.fundBase})
                    </div>
                  </div>

                  {/* 成本缺口变化指示线 */}
                  <div className="flex flex-col items-center justify-center w-1/4 h-full pointer-events-none pb-12">
                    <div className={`px-2.5 py-1 text-xs rounded-full font-bold flex items-center gap-1 shadow-lg ${
                      sandboxResult.diff.costChange >= 0 
                        ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' 
                        : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {sandboxResult.diff.costChange >= 0 ? '+' : ''}{sandboxResult.diff.costPct.toFixed(1)}%
                    </div>
                    <div className="h-0.5 w-full border-t border-dashed border-slate-700 my-2"></div>
                    <div className="text-[9px] text-slate-500 text-center uppercase tracking-wider">
                      真实人力成本
                    </div>
                  </div>

                  {/* 柱状2：调整后方案 (本沙盘配置) */}
                  <div className="flex flex-col items-center w-1/3 z-10">
                    <div className="text-xs text-slate-200 font-semibold mb-2">
                      ¥{sandboxResult.new.totalCost.toFixed(0)}
                    </div>
                    
                    {/* 堆积条 */}
                    <div className="w-16 flex flex-col-reverse rounded-t-lg overflow-hidden h-[180px] shadow-2xl transition-all duration-300">
                      {/* 1. 员工到手 (蓝色) */}
                      <div 
                        style={{ height: `${(sandboxResult.new.net / sandboxResult.new.totalCost) * 100}%` }}
                        className="bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
                        title={`员工净到手: ¥${sandboxResult.new.net.toFixed(2)}`}
                      ></div>
                      {/* 2. 个人社保 (蓝浅) */}
                      <div 
                        style={{ height: `${(sandboxResult.new.empSS / sandboxResult.new.totalCost) * 100}%` }}
                        className="bg-blue-400 hover:bg-blue-300 transition-colors cursor-pointer"
                        title={`个人社保扣款: ¥${sandboxResult.new.empSS.toFixed(2)}`}
                      ></div>
                      {/* 3. 个人公积金 (蓝白) */}
                      <div 
                        style={{ height: `${(sandboxResult.new.empFund / sandboxResult.new.totalCost) * 100}%` }}
                        className="bg-sky-300 hover:bg-sky-200 transition-colors cursor-pointer"
                        title={`个人公积金扣款: ¥${sandboxResult.new.empFund.toFixed(2)}`}
                      ></div>
                      {/* 4. 单位社保 (紫深) */}
                      <div 
                        style={{ height: `${(sandboxResult.new.compSS / sandboxResult.new.totalCost) * 100}%` }}
                        className="bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer"
                        title={`单位缴纳社保: ¥${sandboxResult.new.compSS.toFixed(2)}`}
                      ></div>
                      {/* 5. 单位公积金 (紫浅) */}
                      <div 
                        style={{ height: `${(sandboxResult.new.compFund / sandboxResult.new.totalCost) * 100}%` }}
                        className="bg-indigo-400 hover:bg-indigo-300 transition-colors cursor-pointer"
                        title={`单位缴纳公积金: ¥${sandboxResult.new.compFund.toFixed(2)}`}
                      ></div>
                    </div>

                    <div className="text-[11px] font-bold text-slate-100 mt-3 text-center">
                      现方案 ({sandboxIsCompliant ? '实缴' : '低缴'})
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      (基数: {sandboxResult.new.ssBase.toFixed(0)}/{sandboxResult.new.fundBase.toFixed(0)})
                    </div>
                  </div>

                </div>
              </div>

              {/* 堆叠柱状图图例 & 数据清单 */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6 pt-5 border-t border-slate-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-blue-600"></div>
                  <div className="text-[10px]">
                    <span className="text-slate-500 block">员工净到手</span>
                    <span className="font-semibold text-slate-300">
                      ¥{sandboxResult.new.net.toFixed(0)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-blue-400"></div>
                  <div className="text-[10px]">
                    <span className="text-slate-500 block">个人社保</span>
                    <span className="font-semibold text-slate-300">
                      ¥{sandboxResult.new.empSS.toFixed(0)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-sky-300"></div>
                  <div className="text-[10px]">
                    <span className="text-slate-500 block">个人公积金</span>
                    <span className="font-semibold text-slate-300">
                      ¥{sandboxResult.new.empFund.toFixed(0)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-indigo-600"></div>
                  <div className="text-[10px]">
                    <span className="text-slate-500 block">单位社保</span>
                    <span className="font-semibold text-slate-300">
                      ¥{sandboxResult.new.compSS.toFixed(0)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-indigo-400"></div>
                  <div className="text-[10px]">
                    <span className="text-slate-500 block">单位公积金</span>
                    <span className="font-semibold text-slate-300">
                      ¥{sandboxResult.new.compFund.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: 33档精细测算对照表 */}
        {activeTab === 'table' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* 顶栏控制及搜索 */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="relative flex-1 max-w-md">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SvgIcons.Search />
                </span>
                <input
                  type="text"
                  placeholder="搜索原工资档位 (例如: 10000) 或拆解结论..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-200"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">筛选快捷键:</span>
                {['全部', '10000', '20000', '30000'].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSearchTerm(val === '全部' ? '' : val)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded border transition ${
                      (val === '全部' && !searchTerm) || searchTerm === val
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* 精致明细表格 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-950 text-slate-400 text-xs font-bold sticky top-0 z-10 border-b border-slate-800">
                    <tr>
                      <th className="p-3.5 pl-5 cursor-pointer hover:bg-slate-900 transition" onClick={() => handleSort('id')}>序号</th>
                      <th className="p-3.5 cursor-pointer hover:bg-slate-900 transition" onClick={() => handleSort('origSalary')}>
                        原月工资 {sortField === 'origSalary' && (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
                      <th className="p-3.5 cursor-pointer hover:bg-slate-900 transition" onClick={() => handleSort('cutRate')}>降薪比</th>
                      <th className="p-3.5">降薪后工资</th>
                      <th className="p-3.5 text-slate-300">原人力成本</th>
                      <th className="p-3.5 text-slate-200">现人力成本</th>
                      <th className="p-3.5 cursor-pointer text-indigo-400 hover:bg-slate-900 transition" onClick={() => handleSort('costChange')}>
                        公司成本变化 {sortField === 'costChange' && (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
                      <th className="p-3.5 cursor-pointer text-rose-400 hover:bg-slate-900 transition" onClick={() => handleSort('netChange')}>
                        员工到手机会 {sortField === 'netChange' && (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
                      <th className="p-3.5 pr-5 max-w-xs">成本变化拆解拆算结论</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-slate-800/65 bg-slate-900/40">
                    {filteredData.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-800/50 transition">
                        <td className="p-3.5 pl-5 text-slate-500 font-mono">{row.id}</td>
                        <td className="p-3.5 font-bold text-slate-200">¥{row.origSalary.toLocaleString()}</td>
                        <td className="p-3.5 text-amber-400 font-medium">{row.cutRate.toFixed(1)}%</td>
                        <td className="p-3.5 text-slate-300">¥{row.newSalary.toLocaleString()}</td>
                        <td className="p-3.5 text-slate-400">¥{row.origCost.toLocaleString()}</td>
                        <td className="p-3.5 text-slate-300 font-semibold">¥{row.newCost.toLocaleString()}</td>
                        <td className="p-3.5 font-bold">
                          <span className="text-rose-400">
                            +¥{row.costChange.toFixed(1)} (+{row.costPct}%)
                          </span>
                        </td>
                        <td className="p-3.5 font-bold">
                          <span className="text-amber-500">
                            -¥{Math.abs(row.netChange).toFixed(1)} 
                            ({((row.netChange/row.origNet)*100).toFixed(1)}%)
                          </span>
                        </td>
                        <td className="p-3.5 pr-5 text-[11px] text-slate-400 max-w-xs truncate" title={row.comment}>
                          {row.comment}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-slate-950 p-3.5 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
                <span>* 本对照表数据遵循PDF明细测算表逻辑，包含33档精细档次。</span>
                <span>当前展现 {filteredData.length} 条数据记录</span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: 全局变化趋势 */}
        {activeTab === 'trends' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* 趋势图解读卡 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">全局人力成本与到手机会变动率走向</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                观察曲线，您可以发现一个明显的现象：在 <strong>10,000元档</strong> 成本增加比例达到峰值 <strong>9.1%</strong>。这是因为在这个薪资区间，员工的原有自缴基数极低，全面实缴之后对企业的额外社保公积金支出产生了乘数倍暴增，降薪5%在巨额合规开支面前显得杯水车薪。
              </p>

              {/* SVG 趋势图自绘组件 */}
              <div className="w-full bg-slate-950 rounded-xl p-6 border border-slate-800/50">
                <div className="h-[250px] w-full relative flex items-end">
                  
                  {/* 格线线 */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-slate-800">
                    <div className="border-b border-slate-800/30 w-full h-0"></div>
                    <div className="border-b border-slate-800/30 w-full h-0"></div>
                    <div className="border-b border-slate-800/30 w-full h-0"></div>
                    <div className="border-b border-slate-800/30 w-full h-0"></div>
                  </div>

                  {/* 模拟绘制折线网格 */}
                  <div className="w-full h-full flex justify-between items-end px-4 z-10">
                    {PDF_RAW_DATA.filter((_, idx) => idx % 3 === 0 || idx === 32).map((row, index) => {
                      // 高度比例计算 (基于最高9.1%)
                      const barHeight = (row.costPct / 10) * 200; // 最多 200px
                      return (
                        <div key={index} className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer relative">
                          
                          {/* 提示泡罩 (Hover 效果) */}
                          <div className="absolute bottom-full mb-2 bg-slate-900 border border-slate-700 p-2 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity z-50 text-[10px] w-32 pointer-events-none">
                            <div className="font-bold text-slate-200">原薪: ¥{row.origSalary}</div>
                            <div className="text-rose-400 mt-0.5">企业成本: +{row.costPct}%</div>
                            <div className="text-amber-400">到手变化: -{Math.abs((row.netChange/row.origNet)*100).toFixed(1)}%</div>
                          </div>

                          {/* 柱形条 */}
                          <div 
                            style={{ height: `${barHeight}px` }}
                            className="w-4 bg-gradient-to-t from-indigo-600/40 to-indigo-500 rounded-t-sm transition-all group-hover:from-indigo-500 group-hover:to-indigo-400"
                          ></div>
                          
                          {/* 底部 X 轴标签 */}
                          <span className="text-[9px] text-slate-500 mt-2 rotate-45 md:rotate-0">
                            {row.origSalary >= 10000 ? `${row.origSalary/1000}k` : row.origSalary}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>

              {/* 核心结论图例 */}
              <div className="flex gap-6 mt-4 text-xs text-slate-400 justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-2 bg-indigo-500 rounded"></div>
                  <span>公司人力成本实际递增幅度 (%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-indigo-400 font-bold">10k 档峰值: +9.1%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-emerald-400 font-bold">35k 档谷值: +0.6%</span>
                </div>
              </div>

            </div>

            {/* 两个核心数据洞察卡 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-rose-400">
                  <SvgIcons.Warning />
                  <h4 className="font-bold text-white">警惕高薪资人才 Resignation (辞职) 风险</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  年薪超过25万的核心高管，其降薪比例为 15.0%，但由于足额实缴社保和公积金个人自缴额大幅增加，<strong>他们实际领受的到手薪水下降了 24% 左右</strong>（例如：35,000元档位月薪，到手少拿了整整 8,337 元）。这种双重折损极易引起核心骨干的危机感和流失倾向，甚至引发竞业纠纷。
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400">
                  <SvgIcons.Insight />
                  <h4 className="font-bold text-white">推荐逐步过渡与结构分流</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  若合规实缴势在必行，企业不应采用“全员一刀切降薪”来填补漏洞。建议对中层 (10k-15k) 骨干，实行合规津贴替代方案；对核心高层采用部分红利/期权股权组合进行过渡，拉长实缴转轨期以缓解企业的现金流压力和骨干辞职危机。
                </p>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* 底部版权声明 */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-6 mt-12 text-center text-xs text-slate-600">
        <p>© 2026 企业合规与成本分析决策系统 (深圳). 数据源自《明细测算表：4500-35000元工资档位对比》</p>
        <p className="mt-1 text-[10px] text-slate-700">注：本测算表到手薪资遵循 PDF 原表口径（到手工资 = 实际薪资 - 个人社保 - 个人公积金），未扣除个人所得税，仅作为经营决策战略参考。</p>
      </footer>

    </div>
  );
}