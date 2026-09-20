"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Home, Sparkles, Users, Zap, Droplet, Flame, Wifi, Brush, Receipt, Calculator, ShoppingCart, UserCheck } from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// এই টুলের জন্য কাস্টম রিলেটেড টুলস
const rentRelatedTools: SuggestedTool[] = [
  { id: "grocery", name: "Grocery Budget", desc: "Manage monthly grocery lists.", icon: ShoppingCart, href: "/tools/grocery-budget", color: "text-amber-500", bg: "bg-amber-100" },
  { id: "electricity", name: "Electricity Bill Estimator", desc: "Estimate exact unit bills.", icon: Zap, href: "/tools/electricity-bill", color: "text-yellow-500", bg: "bg-yellow-100" },
  { id: "salary", name: "Salary Breakdown", desc: "Plan your monthly budget.", icon: Calculator, href: "/tools/salary-calculator", color: "text-emerald-500", bg: "bg-emerald-100" }
];

export default function HouseRentSplitter() {
  // States
  const [roommates, setRoommates] = useState<string>("3");
  const [baseRent, setBaseRent] = useState<string>("15000");
  
  // Bills
  const [electricity, setElectricity] = useState<string>("1500");
  const [gas, setGas] = useState<string>("1080"); // BD Standard Double Burner
  const [water, setWater] = useState<string>("500");
  const [internet, setInternet] = useState<string>("1000");
  const [maid, setMaid] = useState<string>("2000"); // Bua/Service Charge

  const [result, setResult] = useState({
    totalBills: 0,
    totalExpense: 0,
    perPerson: 0
  });

  useEffect(() => {
    const r = parseFloat(baseRent) || 0;
    const e = parseFloat(electricity) || 0;
    const g = parseFloat(gas) || 0;
    const w = parseFloat(water) || 0;
    const i = parseFloat(internet) || 0;
    const m = parseFloat(maid) || 0;
    const members = parseInt(roommates) || 1;

    const totalBills = e + g + w + i + m;
    const totalExpense = r + totalBills;
    const perPerson = totalExpense / members;

    setResult({
      totalBills,
      totalExpense,
      perPerson
    });
  }, [baseRent, electricity, gas, water, internet, maid, roommates]);

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
          House Rent <span className="text-cyan-500">Splitter</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          মেস বা শেয়ার্ড ফ্ল্যাটের মোট ভাড়া এবং অন্যান্য সব বিল মেম্বারদের মাঝে সমানভাবে ভাগ করে জনপ্রতি খরচ বের করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Calculator Tool */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-slate-100 pb-8">
            
            {/* Base Rent Input */}
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Home size={16} className="text-cyan-500"/> Total House Rent (ভাড়া)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-5 text-xl font-bold text-slate-400">৳</span>
                <input 
                  type="number" 
                  value={baseRent}
                  onChange={(e) => setBaseRent(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl pl-10 pr-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="15000"
                />
              </div>
            </div>

            {/* Roommates Input */}
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Users size={16} className="text-cyan-500"/> Number of Roommates
              </label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={roommates}
                  onChange={(e) => setRoommates(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl px-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="3"
                  min="1"
                />
              </div>
              <div className="flex gap-2 mt-3">
                {[2, 3, 4, 5, 6].map(num => (
                  <button 
                    key={num} 
                    onClick={() => setRoommates(num.toString())} 
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${roommates === num.toString() ? "bg-cyan-50 border-cyan-200 text-cyan-700" : "bg-white border-slate-200 text-slate-500 hover:border-cyan-300 hover:text-cyan-600"}`}
                  >
                    {num} Persons
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Utility Bills Section */}
          <div className="mb-10">
            <h3 className="text-[14px] font-extrabold text-slate-700 uppercase tracking-widest mb-5 flex items-center gap-2">
               Additional Utility Bills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              
              {/* Electricity */}
              <div>
                <label className="text-[12px] font-bold text-slate-500 mb-2 flex items-center gap-1.5"><Zap size={14}/> Electricity</label>
                <input type="number" value={electricity} onChange={(e) => setElectricity(e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-cyan-500" />
              </div>
              
              {/* Gas */}
              <div>
                <label className="text-[12px] font-bold text-slate-500 mb-2 flex items-center gap-1.5"><Flame size={14}/> Gas Bill</label>
                <input type="number" value={gas} onChange={(e) => setGas(e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-cyan-500" />
              </div>

              {/* Water */}
              <div>
                <label className="text-[12px] font-bold text-slate-500 mb-2 flex items-center gap-1.5"><Droplet size={14}/> Water/WASA</label>
                <input type="number" value={water} onChange={(e) => setWater(e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-cyan-500" />
              </div>

              {/* Internet */}
              <div>
                <label className="text-[12px] font-bold text-slate-500 mb-2 flex items-center gap-1.5"><Wifi size={14}/> WiFi</label>
                <input type="number" value={internet} onChange={(e) => setInternet(e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-cyan-500" />
              </div>

              {/* Maid / Service */}
              <div>
                <label className="text-[12px] font-bold text-slate-500 mb-2 flex items-center gap-1.5"><Brush size={14}/> Maid / Bua</label>
                <input type="number" value={maid} onChange={(e) => setMaid(e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-cyan-500" />
              </div>

            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#111827] rounded-[32px] p-6 md:p-8 w-full text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              
              {/* Per Person Split */}
              <div className="space-y-4">
                <div>
                  <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <UserCheck size={16} /> Share Per Person (জনপ্রতি)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                      {formatCurrency(result.perPerson)}
                    </span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <Users size={14} className="text-cyan-400" />
                  <span className="text-xs font-bold text-cyan-400 tracking-wider">
                    Divided among {roommates || 1} people
                  </span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3 lg:border-l lg:border-slate-700/50 lg:pl-8 flex flex-col justify-center">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">House Rent:</span>
                  <span className="font-bold text-white">{formatCurrency(parseFloat(baseRent) || 0)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">Total Utility Bills:</span>
                  <span className="font-bold text-white">+ {formatCurrency(result.totalBills)}</span>
                </div>
                <div className="border-t border-slate-700/50 pt-2 flex justify-between items-center text-sm mt-1">
                  <span className="text-slate-300 font-bold">Total Group Expense:</span>
                  <span className="font-bold text-cyan-400">{formatCurrency(result.totalExpense)}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Sticky Sidebar Layout with Custom Tools */}
        <RelatedSidebar tools={rentRelatedTools} />

      </div>
    </div>
  );
}