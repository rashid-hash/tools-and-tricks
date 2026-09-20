"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { PiggyBank, Sparkles, TrendingUp, CalendarDays, Coins, Wallet, LineChart, ShieldCheck } from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// এই টুলের জন্য কাস্টম ফাইন্যান্সিয়াল রিলেটেড টুলস
const savingsRelatedTools: SuggestedTool[] = [
  { id: "dps", name: "DPS Calculator", desc: "Calculate your monthly DPS maturity.", icon: PiggyBank, href: "/tools/dps-calculator", color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "salary", name: "Salary Breakdown", desc: "Plan your monthly savings & budget.", icon: ShieldCheck, href: "/tools/salary-calculator", color: "text-indigo-500", bg: "bg-indigo-100" },
  { id: "gold", name: "Gold Price Calculator", desc: "Check current gold prices as investment.", icon: Coins, href: "/tools/gold-price", color: "text-amber-500", bg: "bg-amber-100" }
];

export default function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState<string>("50000");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("2000");
  const [interestRate, setInterestRate] = useState<string>("7.5");
  const [years, setYears] = useState<string>("10");

  const [result, setResult] = useState({
    totalInvested: 0,
    totalInterestEarned: 0,
    futureValue: 0
  });

  useEffect(() => {
    const P = parseFloat(initialDeposit) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = parseFloat(interestRate) || 0;
    const t = parseFloat(years) || 0;
    
    const n = 12; // Compounding frequency (Monthly)
    const ratePerPeriod = r / 100 / n;
    const totalPeriods = n * t;

    let futureValueInitial = 0;
    let futureValueMonthly = 0;

    // Compound Interest for Initial Deposit: FV = P(1 + r/n)^(nt)
    if (ratePerPeriod > 0) {
      futureValueInitial = P * Math.pow(1 + ratePerPeriod, totalPeriods);
      // Future Value of a Series (Monthly Contributions): FV = PMT * (((1 + r/n)^(nt) - 1) / (r/n))
      futureValueMonthly = PMT * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);
    } else {
      futureValueInitial = P;
      futureValueMonthly = PMT * totalPeriods;
    }

    const futureValue = futureValueInitial + futureValueMonthly;
    const totalInvested = P + (PMT * totalPeriods);
    const totalInterestEarned = futureValue - totalInvested;

    setResult({
      totalInvested,
      totalInterestEarned,
      futureValue
    });
  }, [initialDeposit, monthlyContribution, interestRate, years]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0, style: 'currency', currency: 'BDT' }).format(Math.ceil(num));
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-cyan-500" />
          Bangladesh Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Savings <span className="text-cyan-500">Calculator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          চক্রবৃদ্ধি মুনাফার (Compound Interest) মাধ্যমে আপনার জমানো টাকা ভবিষ্যতে কত হবে তা রিয়েল-টাইমে হিসাব করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Calculator Tool */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Initial Deposit Input */}
            <div className="md:col-span-2">
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Wallet size={16} className="text-cyan-500"/> Initial Deposit (প্রাথমিক জমা)
              </label>
              <div className="relative flex items-center mb-3">
                <span className="absolute left-5 text-xl font-bold text-slate-400">৳</span>
                <input 
                  type="number" 
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl pl-10 pr-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="50000"
                />
              </div>
            </div>

            {/* Monthly Contribution */}
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <PiggyBank size={16} className="text-cyan-500"/> Monthly Contribution
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-lg font-bold text-slate-400">৳</span>
                <input 
                  type="number" 
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-xl pl-8 pr-4 text-xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="2000"
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <TrendingUp size={16} className="text-cyan-500"/> Annual Interest Rate
              </label>
              <div className="relative flex items-center">
                <input 
                  type="number" 
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-xl px-4 text-xl font-bold text-[#111827] outline-none transition-all"
                  step="0.1"
                />
                <span className="absolute right-4 text-lg font-bold text-slate-400">%</span>
              </div>
            </div>

            {/* Duration */}
            <div className="md:col-span-2">
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <CalendarDays size={16} className="text-cyan-500"/> Time Period (বছর)
              </label>
              <div className="relative flex items-center">
                <input 
                  type="number" 
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-xl px-4 text-xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="10"
                />
                <span className="absolute right-4 text-sm font-bold text-slate-400">Years</span>
              </div>
              
              {/* Quick Year Presets */}
              <div className="flex gap-2 mt-3">
                {[5, 10, 15, 20].map(yr => (
                  <button 
                    key={yr} 
                    onClick={() => setYears(yr.toString())} 
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${years === yr.toString() ? "bg-cyan-50 border-cyan-200 text-cyan-700" : "bg-white border-slate-200 text-slate-500 hover:border-cyan-300 hover:text-cyan-600"}`}
                  >
                    {yr} Years
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Result Card */}
          <div className="bg-[#111827] rounded-[32px] p-6 md:p-8 w-full text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              
              {/* Grand Total */}
              <div className="space-y-4">
                <div>
                  <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <LineChart size={16} /> Total Savings Balance
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                      {formatCurrency(result.futureValue)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {years} বছর পর চক্রবৃদ্ধি মুনাফাসহ আপনার সঞ্চিত মোট অর্থ।
                </p>
              </div>

              {/* Breakdown List */}
              <div className="space-y-4 lg:border-l lg:border-slate-700/50 lg:pl-8 flex flex-col justify-center">
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Invested Amount</p>
                  <span className="font-bold text-xl text-white">{formatCurrency(result.totalInvested)}</span>
                </div>
                
                <div className="bg-cyan-500/10 p-4 rounded-2xl border border-cyan-500/20">
                  <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">Total Interest Earned</p>
                  <span className="font-bold text-xl text-cyan-400">+ {formatCurrency(result.totalInterestEarned)}</span>
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