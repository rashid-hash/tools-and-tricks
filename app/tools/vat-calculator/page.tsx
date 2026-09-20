"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Calculator, Sparkles, PlusCircle, MinusCircle, Receipt, ArrowRight } from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function VATCalculator() {
  const [amount, setAmount] = useState<string>("1000");
  const [vatRate, setVatRate] = useState<number>(15);
  const [calcMode, setCalcMode] = useState<"exclusive" | "inclusive">("exclusive");
  
  const [result, setResult] = useState({
    baseAmount: 0,
    vatAmount: 0,
    totalAmount: 0
  });

  const standardRates = [15, 10, 7.5, 5];

  useEffect(() => {
    const numericAmount = parseFloat(amount) || 0;
    const rate = vatRate || 0;

    let base = 0;
    let vat = 0;
    let total = 0;

    if (calcMode === "exclusive") {
      // Add VAT to the base amount
      base = numericAmount;
      vat = (numericAmount * rate) / 100;
      total = base + vat;
    } else {
      // Extract VAT from the total amount
      total = numericAmount;
      base = numericAmount / (1 + rate / 100);
      vat = total - base;
    }

    setResult({
      baseAmount: base,
      vatAmount: vat,
      totalAmount: total
    });
  }, [amount, vatRate, calcMode]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT', minimumFractionDigits: 2 }).format(num);
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
          VAT <span className="text-emerald-600">Calculator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          দ্রুত এবং নির্ভুলভাবে যেকোনো অ্যামাউন্টের ভ্যাট (VAT) যোগ করুন অথবা মোট মূল্য থেকে ভ্যাট আলাদা করুন।
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60 relative overflow-hidden">
          
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

          {/* Mode Selection */}
          <div className="flex bg-slate-100 rounded-2xl p-1.5 mb-8">
            <button 
              onClick={() => setCalcMode("exclusive")}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all ${calcMode === "exclusive" ? "bg-white text-emerald-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
            >
              <PlusCircle size={18} /> Add VAT (Exclusive)
            </button>
            <button 
              onClick={() => setCalcMode("inclusive")}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all ${calcMode === "inclusive" ? "bg-white text-emerald-600 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"}`}
            >
              <MinusCircle size={18} /> Extract VAT (Inclusive)
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-10">
            {/* Amount Input */}
            <div className="flex-1">
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                {calcMode === "exclusive" ? "Base Amount (Without VAT)" : "Total Amount (With VAT)"}
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-5 text-xl font-bold text-slate-400">৳</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl pl-10 pr-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="1000"
                />
              </div>
            </div>

            {/* VAT Rate Input */}
            <div className="md:w-1/3">
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">VAT Rate (%)</label>
              <div className="relative flex items-center">
                <input 
                  type="number" 
                  value={vatRate}
                  onChange={(e) => setVatRate(Number(e.target.value))}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-5 text-xl font-bold text-[#111827] outline-none transition-all"
                />
                <span className="absolute right-5 text-lg font-bold text-slate-400">%</span>
              </div>
            </div>
          </div>

          {/* Standard Rates Quick Access */}
          <div className="mb-10">
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-3">Standard BD Rates</p>
            <div className="flex flex-wrap gap-3">
              {standardRates.map(rate => (
                <button
                  key={rate}
                  onClick={() => setVatRate(rate)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-all border ${vatRate === rate ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600"}`}
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>

          {/* Result Display */}
          <div className="bg-[#111827] rounded-3xl p-6 md:p-8 w-full text-white relative overflow-hidden shadow-xl shadow-slate-900/10 animate-in zoom-in-95 duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-700/50">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400">
                <Receipt size={24} />
              </div>
              <div>
                <p className="text-emerald-400 text-[12px] font-bold uppercase tracking-widest mb-0.5">Calculation Result</p>
                <h3 className="text-xl font-bold text-white">VAT Breakdown</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-slate-300 text-[15px] font-medium">
                <span>Base Amount (Net):</span>
                <span className="font-bold text-white">{formatCurrency(result.baseAmount)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300 text-[15px] font-medium">
                <span>VAT Amount ({vatRate}%):</span>
                <span className="font-bold text-emerald-400">
                  {calcMode === "exclusive" ? "+" : "-"} {formatCurrency(result.vatAmount)}
                </span>
              </div>
              
              <div className="pt-4 mt-2 border-t border-slate-700/50 flex justify-between items-center">
                <span className="text-slate-200 text-lg font-bold">Total Amount (Gross):</span>
                <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {formatCurrency(result.totalAmount)}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}