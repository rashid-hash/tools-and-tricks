"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Map, ArrowDownUp, Info, Ruler, Sparkles, MoveRight } from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

// Base unit is Square Feet (বর্গফুট)
const landUnits: Record<string, { name: string; rateInSqFt: number; type: "local" | "intl" }> = {
  shotok: { name: "শতক / ডেসিমাল (Shotok)", rateInSqFt: 435.6, type: "local" },
  katha: { name: "কাঠা (Katha)", rateInSqFt: 720, type: "local" },
  bigha: { name: "বিঘা (Bigha)", rateInSqFt: 14400, type: "local" },
  chhatak: { name: "ছটাক (Chhatak)", rateInSqFt: 45, type: "local" },
  ojutangsho: { name: "অযুতাংশ (Ojutangsho)", rateInSqFt: 4.356, type: "local" },
  acre: { name: "একর (Acre)", rateInSqFt: 43560, type: "local" },
  sq_ft: { name: "বর্গফুট (Sq Feet)", rateInSqFt: 1, type: "intl" },
  sq_m: { name: "বর্গমিটার (Sq Meter)", rateInSqFt: 10.7639, type: "intl" },
  hectare: { name: "হেক্টর (Hectare)", rateInSqFt: 107639.1, type: "intl" },
};

export default function LandAreaCalculator() {
  const [amount, setAmount] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState("katha");
  const [toUnit, setToUnit] = useState("shotok");
  const [result, setResult] = useState<number>(0);

  // Conversion Logic
  useEffect(() => {
    const numericAmount = parseFloat(amount) || 0;
    const rateFrom = landUnits[fromUnit].rateInSqFt;
    const rateTo = landUnits[toUnit].rateInSqFt;

    // Convert to base (Sq Ft), then to target unit
    const baseSqFt = numericAmount * rateFrom;
    const finalResult = baseSqFt / rateTo;
    
    setResult(finalResult);
  }, [amount, fromUnit, toUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleQuickConvert = (from: string, to: string) => {
    setFromUnit(from);
    setToUnit(to);
  };

  const formatNumber = (num: number) => {
    // 4 decimal places for land accuracy
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 4 }).format(num);
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
          <Map size={14} className="text-emerald-500" />
          Bangladesh Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Land Area <span className="text-emerald-600">Calculator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          Accurate conversion for standard Bangladeshi land measurements like Shotok, Katha, Bigha, and Acre.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        
        {/* Quick Actions (SaaS Vibe) */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button onClick={() => handleQuickConvert("katha", "shotok")} className="flex items-center gap-2 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-slate-600 hover:text-emerald-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm">
            কাঠা <MoveRight size={14} /> শতক
          </button>
          <button onClick={() => handleQuickConvert("bigha", "shotok")} className="flex items-center gap-2 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-slate-600 hover:text-emerald-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm">
            বিঘা <MoveRight size={14} /> শতক
          </button>
          <button onClick={() => handleQuickConvert("acre", "shotok")} className="flex items-center gap-2 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-slate-600 hover:text-emerald-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm">
            একর <MoveRight size={14} /> শতক
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60 relative overflow-hidden">
          
          {/* Amount Input */}
          <div className="mb-8">
            <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Ruler size={16} /> Enter Area Amount
            </label>
            <div className="relative flex items-center">
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                placeholder="1"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 relative mb-10">
            
            {/* From Unit */}
            <div className="w-full">
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">From</label>
              <select 
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 text-[16px] font-semibold text-[#111827] outline-none cursor-pointer appearance-none"
              >
                <optgroup label="BD Local Units">
                  {Object.entries(landUnits).filter(([_, u]) => u.type === 'local').map(([key, unit]) => (
                    <option key={key} value={key}>{unit.name}</option>
                  ))}
                </optgroup>
                <optgroup label="International Units">
                  {Object.entries(landUnits).filter(([_, u]) => u.type === 'intl').map(([key, unit]) => (
                    <option key={key} value={key}>{unit.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Swap Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-2 w-12 h-12 bg-[#111827] border border-slate-800 rounded-full flex items-center justify-center shadow-lg shadow-slate-900/30 hover:scale-110 hover:bg-emerald-600 transition-all cursor-pointer z-10 text-white" onClick={handleSwap}>
              <ArrowDownUp size={20} className="md:-rotate-90" strokeWidth={2.5} />
            </div>

            {/* To Unit */}
            <div className="w-full">
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 block md:text-right">To</label>
              <select 
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 text-[16px] font-semibold text-[#111827] outline-none cursor-pointer appearance-none"
              >
                <optgroup label="BD Local Units">
                  {Object.entries(landUnits).filter(([_, u]) => u.type === 'local').map(([key, unit]) => (
                    <option key={key} value={key}>{unit.name}</option>
                  ))}
                </optgroup>
                <optgroup label="International Units">
                  {Object.entries(landUnits).filter(([_, u]) => u.type === 'intl').map(([key, unit]) => (
                    <option key={key} value={key}>{unit.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Result Display */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 text-[#111827] relative overflow-hidden flex flex-col items-center justify-center min-h-[140px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <p className="text-slate-500 text-[14px] font-bold uppercase tracking-widest mb-2">Converted Area</p>
            <div className="flex items-baseline gap-2 text-center flex-wrap justify-center">
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-emerald-700">
                {formatNumber(result)}
              </span>
              <span className="text-xl font-bold text-slate-700">{landUnits[toUnit].name.split(" ")[0]}</span>
            </div>
          </div>

          {/* Helper Note */}
          <div className="mt-6 flex items-start gap-2 text-slate-500 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <Info size={18} className="shrink-0 mt-0.5 text-emerald-500" />
            <p className="text-[13px] font-medium leading-relaxed">
              <strong>Standard Formula:</strong> 1 Shotok (ডেসিমাল) = 435.6 sq. ft. | 1 Katha = 1.65 Shotok (720 sq. ft.) | 1 Bigha = 20 Katha (33 Shotok approx or 14,400 sq. ft.). 
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}