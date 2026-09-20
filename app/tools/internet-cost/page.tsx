"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Wifi, Sparkles, Smartphone, Activity, CalendarDays, Coins, Gauge } from "lucide-react";
import RelatedSidebar from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function InternetCostCalculator() {
  const [price, setPrice] = useState<string>("399");
  const [dataVolume, setDataVolume] = useState<string>("30");
  const [dataUnit, setDataUnit] = useState<"GB" | "MB">("GB");
  const [validityDays, setValidityDays] = useState<string>("30");

  const [result, setResult] = useState({
    totalGB: 0,
    costPerGB: 0,
    costPerDay: 0,
    dataPerDayMB: 0,
    valueRating: "",
    ratingColor: ""
  });

  useEffect(() => {
    const p = parseFloat(price) || 0;
    const v = parseFloat(dataVolume) || 0;
    const days = parseFloat(validityDays) || 1; // Prevent division by zero

    // Convert everything to GB for standard calculation
    const totalGB = dataUnit === "GB" ? v : v / 1024;
    
    let costPerGB = 0;
    if (totalGB > 0) {
      costPerGB = p / totalGB;
    }

    const costPerDay = p / days;
    const dataPerDayMB = (totalGB * 1024) / days;

    // Value Rating Logic (Based on BD Market)
    let valueRating = "";
    let ratingColor = "";
    
    if (costPerGB === 0) {
      valueRating = "Please enter data";
      ratingColor = "text-slate-400";
    } else if (costPerGB <= 15) {
      valueRating = "Excellent Value 🤩";
      ratingColor = "text-emerald-400";
    } else if (costPerGB <= 30) {
      valueRating = "Good Value 👍";
      ratingColor = "text-blue-400";
    } else if (costPerGB <= 50) {
      valueRating = "Average/Standard 😐";
      ratingColor = "text-amber-400";
    } else {
      valueRating = "Expensive 📉";
      ratingColor = "text-rose-400";
    }

    setResult({
      totalGB,
      costPerGB,
      costPerDay,
      dataPerDayMB,
      valueRating,
      ratingColor
    });
  }, [price, dataVolume, dataUnit, validityDays]);

  const loadPreset = (p: string, v: string, unit: "GB" | "MB", days: string) => {
    setPrice(p);
    setDataVolume(v);
    setDataUnit(unit);
    setValidityDays(days);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(num);
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-bold text-violet-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-violet-500" />
          Bangladesh Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Data Pack <span className="text-violet-500">Analyzer</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার মোবাইল ডেটা বা ইন্টারনেট প্যাকেজটি কি আসলেই সাশ্রয়ী? প্রতি জিবি ডেটা ও প্রতিদিনের খরচ বের করে যাচাই করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Calculator Tool */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {/* Presets */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button onClick={() => loadPreset("40", "1", "GB", "3")} className="px-4 py-2 bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 rounded-xl text-xs font-bold transition-colors">
              Mini (1GB / 3 Days)
            </button>
            <button onClick={() => loadPreset("148", "10", "GB", "7")} className="px-4 py-2 bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 rounded-xl text-xs font-bold transition-colors">
              Weekly (10GB / 7 Days)
            </button>
            <button onClick={() => loadPreset("399", "30", "GB", "30")} className="px-4 py-2 bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 rounded-xl text-xs font-bold transition-colors">
              Monthly (30GB / 30 Days)
            </button>
            <button onClick={() => loadPreset("500", "500", "MB", "30")} className="px-4 py-2 bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 rounded-xl text-xs font-bold transition-colors">
              Broadband (Tk 500 / Month)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Price Input */}
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Coins size={16} className="text-violet-500"/> Package Price
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-5 text-xl font-bold text-slate-400">৳</span>
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl pl-10 pr-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="399"
                />
              </div>
            </div>

            {/* Volume Input */}
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Gauge size={16} className="text-violet-500"/> Data Volume
              </label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  value={dataVolume}
                  onChange={(e) => setDataVolume(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="30"
                />
                <select 
                  value={dataUnit}
                  onChange={(e) => setDataUnit(e.target.value as "GB" | "MB")}
                  className="h-16 w-24 bg-slate-100 border border-slate-200 rounded-2xl px-3 text-lg font-bold text-[#111827] outline-none cursor-pointer focus:border-violet-500"
                >
                  <option value="GB">GB</option>
                  <option value="MB">MB</option>
                </select>
              </div>
            </div>
          </div>

          {/* Validity Input */}
          <div className="mb-10 w-full md:w-1/2">
            <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <CalendarDays size={16} className="text-violet-500"/> Validity (Days)
            </label>
            <div className="relative flex items-center">
              <input 
                type="number" 
                value={validityDays}
                onChange={(e) => setValidityDays(e.target.value)}
                className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                placeholder="30"
              />
              <span className="absolute right-5 text-sm font-bold text-slate-400">Days</span>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#111827] rounded-[32px] p-6 md:p-8 w-full text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              
              {/* Main Cost Breakdown */}
              <div className="space-y-6">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Cost Per GB</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-white">
                      ৳ {formatCurrency(result.costPerGB)}
                    </span>
                    <span className="text-slate-400 font-medium">/ GB</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Cost Per Day</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold tracking-tight text-white">
                      ৳ {formatCurrency(result.costPerDay)}
                    </span>
                    <span className="text-slate-400 font-medium">/ Day</span>
                  </div>
                </div>
              </div>

              {/* Package Insights */}
              <div className="space-y-6 md:border-l md:border-slate-700/50 md:pl-8">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Daily Data Quota</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                      <Activity size={18} className="text-violet-400"/>
                    </div>
                    <span className="text-xl font-bold text-white">
                      {formatCurrency(result.dataPerDayMB)} <span className="text-sm text-slate-400 font-medium">MB / Day</span>
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Package Rating</p>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700`}>
                    <Smartphone size={16} className={result.ratingColor} />
                    <span className={`text-[14px] font-bold ${result.ratingColor}`}>
                      {result.valueRating}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Sticky Sidebar Layout */}
        <RelatedSidebar />

      </div>
    </div>
  );
}