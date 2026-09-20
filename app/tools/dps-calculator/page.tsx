"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { PiggyBank, Sparkles, TrendingUp, CalendarDays, Coins, Landmark, ShieldCheck } from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// এই টুলের জন্য কাস্টম ফাইন্যান্সিয়াল রিলেটেড টুলস
const savingsRelatedTools: SuggestedTool[] = [
  { id: "emi", name: "Loan/EMI Calculator", desc: "Calculate your bank loan installments.", icon: Landmark, href: "/tools/emi-calculator", color: "text-rose-500", bg: "bg-rose-100" },
  { id: "salary", name: "Salary Breakdown", desc: "Calculate your net payable salary.", icon: ShieldCheck, href: "/tools/salary-calculator", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "gold", name: "Gold Price Calculator", desc: "Check current gold prices & making charges.", icon: Coins, href: "/tools/gold-price", color: "text-amber-500", bg: "bg-amber-100" }
];

export default function DPSCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState<string>("5000");
  const [interestRate, setInterestRate] = useState<string>("8.5");
  const [years, setYears] = useState<string>("5");
  const [taxRate, setTaxRate] = useState<number>(15); // Default No TIN (15%)

  const [result, setResult] = useState({
    totalPrincipal: 0,
    grossInterest: 0,
    taxAmount: 0,
    netInterest: 0,
    maturityAmount: 0
  });

  useEffect(() => {
    const P = parseFloat(monthlyDeposit) || 0;
    const r = parseFloat(interestRate) || 0;
    const t = parseFloat(years) || 0;
    const n = t * 12; // Total months
    const tax = taxRate || 0;

    // BD Banks typical formula for DPS: 
    // Interest = P * (n * (n+1) / 2) * (r / 1200)
    const totalPrincipal = P * n;
    const grossInterest = P * ((n * (n + 1)) / 2) * (r / 1200);
    
    const taxAmount = (grossInterest * tax) / 100;
    const netInterest = grossInterest - taxAmount;
    const maturityAmount = totalPrincipal + netInterest;

    setResult({
      totalPrincipal,
      grossInterest,
      taxAmount,
      netInterest,
      maturityAmount
    });
  }, [monthlyDeposit, interestRate, years, taxRate]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0, style: 'currency', currency: 'BDT' }).format(Math.ceil(num));
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-emerald-500" />
          Bangladesh Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          DPS <span className="text-emerald-500">Calculator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার মাসিক জমার পরিমাণ এবং ব্যাংকের ইন্টারেস্ট রেট অনুযায়ী সরকারি ট্যাক্স কাটার পর ডিপিএস-এর মেয়াদোত্তীর্ণ মূল্য (Maturity Amount) জানুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Calculator Tool */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Deposit Input */}
            <div className="md:col-span-2">
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <PiggyBank size={16} className="text-emerald-500"/> Monthly Deposit (মাসিক জমা)
              </label>
              <div className="relative flex items-center mb-3">
                <span className="absolute left-5 text-xl font-bold text-slate-400">৳</span>
                <input 
                  type="number" 
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl pl-10 pr-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="5000"
                />
              </div>
              <div className="flex gap-2">
                {[1000, 2000, 5000, 10000].map(amount => (
                  <button 
                    key={amount} 
                    onClick={() => setMonthlyDeposit(amount.toString())} 
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${monthlyDeposit === amount.toString() ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600"}`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <TrendingUp size={16} className="text-emerald-500"/> Interest Rate (মুনাফার হার)
              </label>
              <div className="relative flex items-center">
                <input 
                  type="number" 
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-5 text-xl font-bold text-[#111827] outline-none transition-all"
                  step="0.1"
                />
                <span className="absolute right-5 text-lg font-bold text-slate-400">%</span>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <CalendarDays size={16} className="text-emerald-500"/> Duration (মেয়াদ)
              </label>
              <div className="relative flex items-center">
                <input 
                  type="number" 
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-5 text-xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="5"
                />
                <span className="absolute right-5 text-sm font-bold text-slate-400">Years</span>
              </div>
            </div>
          </div>

          {/* Tax/TIN Options */}
          <div className="mb-10">
            <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">
              Govt. Tax on Interest (TIN Status)
            </label>
            <div className="flex flex-col md:flex-row gap-3">
              <button 
                onClick={() => setTaxRate(10)} 
                className={`flex-1 p-4 rounded-xl border-2 transition-all flex items-center justify-between ${taxRate === 10 ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-200"}`}
              >
                <div className="text-left">
                  <h4 className={`font-bold ${taxRate === 10 ? "text-emerald-700" : "text-slate-700"}`}>Have e-TIN</h4>
                  <p className="text-xs text-slate-500 mt-0.5">10% tax on profit</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${taxRate === 10 ? "border-emerald-500" : "border-slate-300"}`}>
                  {taxRate === 10 && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>}
                </div>
              </button>
              
              <button 
                onClick={() => setTaxRate(15)} 
                className={`flex-1 p-4 rounded-xl border-2 transition-all flex items-center justify-between ${taxRate === 15 ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-200"}`}
              >
                <div className="text-left">
                  <h4 className={`font-bold ${taxRate === 15 ? "text-emerald-700" : "text-slate-700"}`}>No e-TIN</h4>
                  <p className="text-xs text-slate-500 mt-0.5">15% tax on profit</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${taxRate === 15 ? "border-emerald-500" : "border-slate-300"}`}>
                  {taxRate === 15 && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>}
                </div>
              </button>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#111827] rounded-[32px] p-6 md:p-8 w-full text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              
              {/* Grand Total */}
              <div className="space-y-4">
                <div>
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Landmark size={16} /> Total Maturity Amount
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                      {formatCurrency(result.maturityAmount)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-400">মেয়াদ শেষে ব্যাংক আপনাকে ঠিক এই পরিমাণ টাকা দেবে।</p>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3 lg:border-l lg:border-slate-700/50 lg:pl-8 flex flex-col justify-center">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">Total Deposited Amount:</span>
                  <span className="font-bold text-white">{formatCurrency(result.totalPrincipal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">Gross Profit (Interest):</span>
                  <span className="font-bold text-white">+ {formatCurrency(result.grossInterest)}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-700/50 pb-2">
                  <span className="text-rose-400 font-medium">Govt Tax ({taxRate}%):</span>
                  <span className="font-bold text-rose-400">- {formatCurrency(result.taxAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-1">
                  <span className="text-emerald-400 font-medium">Net Profit (After Tax):</span>
                  <span className="font-bold text-emerald-400"> {formatCurrency(result.netInterest)}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Sticky Sidebar Layout with Custom Tools */}
        <RelatedSidebar tools={savingsRelatedTools} />

      </div>
    </div>
  );
}