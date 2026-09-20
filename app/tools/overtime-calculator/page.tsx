"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Clock, Sparkles, Coins, Info } from "lucide-react";
import RelatedSidebar from "@/components/RelatedSidebar"; // <- Sidebar Import করা হয়েছে

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function OvertimeCalculator() {
  const [basicSalary, setBasicSalary] = useState<string>("15000");
  const [workingDays, setWorkingDays] = useState<string>("26");
  const [dailyHours, setDailyHours] = useState<string>("8");
  const [otHours, setOtHours] = useState<string>("20");
  const [otMultiplier, setOtMultiplier] = useState<number>(2); // BD Law is Double (2x)

  const [result, setResult] = useState({
    hourlyRate: 0,
    otHourlyRate: 0,
    totalOtAmount: 0
  });

  useEffect(() => {
    const basic = parseFloat(basicSalary) || 0;
    const days = parseFloat(workingDays) || 26;
    const hours = parseFloat(dailyHours) || 8;
    const overtime = parseFloat(otHours) || 0;

    const totalWorkingHours = days * hours;
    const hourlyRate = basic / (totalWorkingHours > 0 ? totalWorkingHours : 208);
    const otHourlyRate = hourlyRate * otMultiplier;
    const totalOtAmount = otHourlyRate * overtime;

    setResult({ hourlyRate, otHourlyRate, totalOtAmount });
  }, [basicSalary, workingDays, dailyHours, otHours, otMultiplier]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT', maximumFractionDigits: 2 }).format(num);
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
          Overtime <span className="text-emerald-600">Calculator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          বাংলাদেশ শ্রম আইন অনুযায়ী আপনার বেসিক স্যালারি থেকে ওভারটাইম (OT) রেট এবং মোট বিল হিসাব করুন।
        </p>
      </div>

      {/* Main Layout Container (Left: Tool, Right: Sidebar) */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column: Calculator Tool */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="md:col-span-2">
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Coins size={16} /> Basic Salary (বেসিক বেতন)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-5 text-xl font-bold text-slate-400">৳</span>
                <input 
                  type="number" 
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl pl-10 pr-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="15000"
                />
              </div>
            </div>

            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Working Days / Month</label>
              <input 
                type="number" 
                value={workingDays}
                onChange={(e) => setWorkingDays(e.target.value)}
                className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 text-lg font-bold text-[#111827] outline-none"
              />
            </div>
            
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Hours / Day</label>
              <input 
                type="number" 
                value={dailyHours}
                onChange={(e) => setDailyHours(e.target.value)}
                className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 text-lg font-bold text-[#111827] outline-none"
              />
            </div>
          </div>

          <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl mb-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 w-full">
              <label className="text-[13px] font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Clock size={16} /> Total OT Hours Worked
              </label>
              <input 
                type="number" 
                value={otHours}
                onChange={(e) => setOtHours(e.target.value)}
                className="w-full h-16 bg-white border border-emerald-200 focus:border-emerald-500 rounded-xl px-5 text-2xl font-bold text-emerald-900 outline-none shadow-sm"
                placeholder="20"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">OT Rate Multiplier</label>
              <select 
                value={otMultiplier}
                onChange={(e) => setOtMultiplier(Number(e.target.value))}
                className="w-full h-16 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 text-lg font-bold text-[#111827] outline-none"
              >
                <option value={2}>Double (2x) - BD Law</option>
                <option value={1.5}>Time and a half (1.5x)</option>
                <option value={1}>Single (1x)</option>
              </select>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#111827] rounded-3xl p-6 md:p-8 w-full text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <p className="text-emerald-400 text-[13px] font-bold uppercase tracking-widest mb-1">Total Overtime Bill</p>
            <div className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              {formatCurrency(result.totalOtAmount)}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-700/50">
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Regular Hourly Rate</p>
                <p className="text-lg font-bold">{formatCurrency(result.hourlyRate)} / hr</p>
              </div>
              <div>
                <p className="text-emerald-400 text-xs font-medium uppercase tracking-wider mb-1">OT Hourly Rate ({otMultiplier}x)</p>
                <p className="text-lg font-bold text-emerald-400">{formatCurrency(result.otHourlyRate)} / hr</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-2 text-slate-500 text-xs font-medium bg-slate-50 p-4 rounded-xl">
            <Info size={16} className="shrink-0 mt-0.5 text-slate-400" />
            <p>বাংলাদেশ শ্রম আইন ২০০৬ (ধারা ১০৮) অনুযায়ী একজন শ্রমিকের স্বাভাবিক কর্মঘণ্টার অতিরিক্ত কাজের জন্য মূল মজুরির (Basic) দ্বিগুণ হারে ওভারটাইম ভাতা প্রদান করতে হয়।</p>
          </div>

        </div>

        {/* Right Column: Sticky Sidebar Layout */}
        <RelatedSidebar />

      </div>
    </div>
  );
}