"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Banknote, ArrowDownUp, Info, Sparkles, Receipt } from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

// Standard approximate exchange rates (Base: BDT)
const exchangeRates: Record<string, number> = {
  BDT: 1,
  USD: 119.50,
  EUR: 132.40,
  GBP: 155.20,
  SAR: 31.85,
  AED: 32.50,
  MYR: 25.60,
  SGD: 89.20,
};

const currencies = [
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "SAR", name: "Saudi Riyal", symbol: "ر.س" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
];

export default function BDTCurrencyConverter() {
  const [amount, setAmount] = useState<string>("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BDT");
  
  // Features
  const [addIncentive, setAddIncentive] = useState(false);
  const [result, setResult] = useState<number>(0);
  const [incentiveAmount, setIncentiveAmount] = useState<number>(0);

  // Conversion Logic
  useEffect(() => {
    const numericAmount = parseFloat(amount) || 0;
    const rateFrom = exchangeRates[fromCurrency];
    const rateTo = exchangeRates[toCurrency];

    // Convert everything to BDT first, then to target currency
    let baseResult = (numericAmount * rateFrom) / rateTo;
    
    // Remittance logic (Only applies if converting TO BDT from foreign currency)
    let bonus = 0;
    if (addIncentive && toCurrency === "BDT" && fromCurrency !== "BDT") {
      bonus = baseResult * 0.025; // 2.5% BD Govt Incentive
    }

    setResult(baseResult + bonus);
    setIncentiveAmount(bonus);
  }, [amount, fromCurrency, toCurrency, addIncentive]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    // If swapped away from BDT destination, turn off incentive
    if (fromCurrency === "BDT") setAddIncentive(false);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(num);
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-emerald-500" />
          Bangladesh Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Currency & <span className="text-emerald-600">Remittance</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          Live equivalent exchange calculations with built-in 2.5% Bangladesh Government remittance incentive support.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60 relative overflow-hidden">
          
          {/* Subtle Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Amount</label>
            <div className="relative flex items-center">
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                placeholder="1000"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 relative mb-8">
            
            {/* From Currency */}
            <div className="w-full">
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">From</label>
              <select 
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 text-[16px] font-semibold text-[#111827] outline-none cursor-pointer appearance-none"
              >
                {currencies.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
              </select>
            </div>

            {/* Swap Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-2 w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-lg shadow-slate-200/50 hover:scale-110 hover:border-emerald-500 hover:text-emerald-600 transition-all cursor-pointer z-10 text-slate-400" onClick={handleSwap}>
              <ArrowDownUp size={20} className="md:-rotate-90" strokeWidth={2.5} />
            </div>

            {/* To Currency */}
            <div className="w-full">
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 block md:text-right">To</label>
              <select 
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 text-[16px] font-semibold text-[#111827] outline-none cursor-pointer appearance-none"
              >
                {currencies.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
              </select>
            </div>
          </div>

          {/* Remittance Toggle (Only visible if converting to BDT) */}
          {toCurrency === "BDT" && fromCurrency !== "BDT" && (
            <div className="mb-8 flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-2xl cursor-pointer hover:bg-emerald-100/50 transition-colors" onClick={() => setAddIncentive(!addIncentive)}>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${addIncentive ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-300 text-transparent'}`}>
                  ✓
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#111827]">Add 2.5% Govt. Incentive</h4>
                  <p className="text-[13px] text-emerald-600/70 font-medium leading-tight mt-0.5">For official inward remittances</p>
                </div>
              </div>
              <Receipt size={24} className="text-emerald-500 opacity-50" />
            </div>
          )}

          {/* Result Display */}
          <div className="bg-[#111827] rounded-2xl p-6 text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
            
            <p className="text-slate-400 text-[14px] font-medium mb-1">Total Converted Amount</p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight">
                {formatNumber(result)}
              </span>
              <span className="text-xl font-medium text-emerald-400">{toCurrency}</span>
            </div>
            
            {/* Detailed Breakdown */}
            <div className="flex flex-col gap-2 pt-4 border-t border-slate-700/50 text-[13px] font-medium">
              <div className="flex justify-between text-slate-300">
                <span>Current Exchange Rate:</span>
                <span>1 {fromCurrency} = {formatNumber(exchangeRates[fromCurrency] / exchangeRates[toCurrency])} {toCurrency}</span>
              </div>
              {addIncentive && incentiveAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>2.5% Incentive Bonus:</span>
                  <span>+ {formatNumber(incentiveAmount)} {toCurrency}</span>
                </div>
              )}
            </div>
          </div>

          {/* Helper Note */}
          <div className="mt-6 flex items-start gap-2 text-slate-400 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <Info size={16} className="shrink-0 mt-0.5 text-slate-400" />
            <p className="text-[12px] font-medium leading-relaxed">
              Rates are approximate market indications. Actual bank transfer rates may vary slightly. The 2.5% incentive is provided by the Bangladesh Government for valid official remittance channels.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}