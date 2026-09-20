"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Gem, Sparkles, Scale, Receipt, Coins, ShieldCheck, Calculator } from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// এই টুলের জন্য কাস্টম রিলেটেড টুলস
const goldRelatedTools: SuggestedTool[] = [
  { id: "vat", name: "VAT Calculator", desc: "Calculate exact VAT amounts.", icon: Calculator, href: "/tools/vat-calculator", color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "bdt-currency", name: "Currency Converter", desc: "Check current dollar rates.", icon: Coins, href: "/tools/bdt-currency", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "salary", name: "Salary Breakdown", desc: "Plan your monthly savings.", icon: ShieldCheck, href: "/tools/salary-calculator", color: "text-indigo-500", bg: "bg-indigo-100" }
];

export default function GoldPriceCalculator() {
  // Current approx market rates in BD
  const [pricePerVori, setPricePerVori] = useState<string>("135000"); 
  
  // Weight inputs
  const [vori, setVori] = useState<string>("1");
  const [ana, setAna] = useState<string>("0");
  const [roti, setRoti] = useState<string>("0");
  
  // Charges
  const [makingCharge, setMakingCharge] = useState<string>("4000"); // Per Vori
  const [vatPct, setVatPct] = useState<number>(5); // Standard 5% in BD

  const [result, setResult] = useState({
    totalVori: 0,
    baseGoldPrice: 0,
    totalMakingCharge: 0,
    subTotal: 0,
    totalVat: 0,
    grandTotal: 0
  });

  useEffect(() => {
    const v = parseFloat(vori) || 0;
    const a = parseFloat(ana) || 0;
    const r = parseFloat(roti) || 0;
    
    const price = parseFloat(pricePerVori) || 0;
    const mcPerVori = parseFloat(makingCharge) || 0;
    const vat = vatPct || 0;

    // Conversion Logic (1 Vori = 16 Ana, 1 Ana = 6 Roti)
    const totalVoriDecimal = v + (a / 16) + (r / (16 * 6));
    
    const baseGoldPrice = totalVoriDecimal * price;
    const totalMakingCharge = totalVoriDecimal * mcPerVori;
    const subTotal = baseGoldPrice + totalMakingCharge;
    const totalVat = (subTotal * vat) / 100;
    const grandTotal = subTotal + totalVat;

    setResult({
      totalVori: totalVoriDecimal,
      baseGoldPrice,
      totalMakingCharge,
      subTotal,
      totalVat,
      grandTotal
    });
  }, [vori, ana, roti, pricePerVori, makingCharge, vatPct]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0, style: 'currency', currency: 'BDT' }).format(Math.ceil(num));
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-amber-500" />
          Bangladesh Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Gold Price <span className="text-amber-500">Calculator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          ভরি, আনা এবং রতির নিখুঁত হিসাবের সাথে মজুরি ও ভ্যাট যোগ করে স্বর্ণের আসল দাম বের করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Calculator Tool */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {/* Market Price & Presets */}
          <div className="mb-8 pb-8 border-b border-slate-100">
            <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Gem size={16} className="text-amber-500"/> Current Gold Price (Per Vori)
            </label>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex items-center w-full md:w-1/2">
                <span className="absolute left-5 text-xl font-bold text-slate-400">৳</span>
                <input 
                  type="number" 
                  value={pricePerVori}
                  onChange={(e) => setPricePerVori(e.target.value)}
                  className="w-full h-16 bg-amber-50/50 border border-amber-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-2xl pl-10 pr-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-1/2">
                <button onClick={() => setPricePerVori("135000")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${pricePerVori === "135000" ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-white border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-600"}`}>
                  22K (Cadmium)
                </button>
                <button onClick={() => setPricePerVori("128000")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${pricePerVori === "128000" ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-white border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-600"}`}>
                  21K Standard
                </button>
                <button onClick={() => setPricePerVori("110000")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${pricePerVori === "110000" ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-white border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-600"}`}>
                  18K Standard
                </button>
              </div>
            </div>
          </div>

          {/* Weight Inputs */}
          <div className="mb-10">
            <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Scale size={16} className="text-amber-500"/> Gold Weight (স্বর্ণের পরিমাণ)
            </label>
            <div className="grid grid-cols-3 gap-3 md:gap-5">
              <div>
                <label className="text-[12px] font-bold text-slate-500 mb-2 block">ভরি (Vori)</label>
                <input 
                  type="number" 
                  value={vori}
                  onChange={(e) => setVori(e.target.value)}
                  className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl px-4 text-xl font-bold text-[#111827] outline-none text-center"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="text-[12px] font-bold text-slate-500 mb-2 block">আনা (Ana)</label>
                <input 
                  type="number" 
                  value={ana}
                  onChange={(e) => setAna(e.target.value)}
                  className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl px-4 text-xl font-bold text-[#111827] outline-none text-center"
                  placeholder="0"
                  max="15"
                />
              </div>
              <div>
                <label className="text-[12px] font-bold text-slate-500 mb-2 block">রতি (Roti)</label>
                <input 
                  type="number" 
                  value={roti}
                  onChange={(e) => setRoti(e.target.value)}
                  className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl px-4 text-xl font-bold text-[#111827] outline-none text-center"
                  placeholder="0"
                  max="5"
                />
              </div>
            </div>
            <p className="text-xs font-medium text-slate-400 mt-3 text-center">
              💡 সূত্র: ১ ভরি = ১৬ আনা | ১ আনা = ৬ রতি
            </p>
          </div>

          {/* Additional Charges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Making Charge (মজুরি) / Vori</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-lg font-bold text-slate-400">৳</span>
                <input 
                  type="number" 
                  value={makingCharge}
                  onChange={(e) => setMakingCharge(e.target.value)}
                  className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl pl-8 pr-4 text-lg font-bold text-[#111827] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Govt. VAT (%)</label>
              <div className="relative flex items-center">
                <input 
                  type="number" 
                  value={vatPct}
                  onChange={(e) => setVatPct(Number(e.target.value))}
                  className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-xl px-4 text-lg font-bold text-[#111827] outline-none"
                />
                <span className="absolute right-4 text-lg font-bold text-slate-400">%</span>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#111827] rounded-[32px] p-6 md:p-8 w-full text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              
              {/* Grand Total */}
              <div className="space-y-4">
                <div>
                  <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Receipt size={16} /> Final Price (সর্বমোট)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                      {formatCurrency(result.grandTotal)}
                    </span>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <Scale size={14} className="text-amber-400" />
                  <span className="text-xs font-bold text-amber-400 tracking-wider">
                    Total Weight: {result.totalVori.toFixed(4)} Vori
                  </span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3 lg:border-l lg:border-slate-700/50 lg:pl-8 flex flex-col justify-center">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">Gold Price:</span>
                  <span className="font-bold text-white">{formatCurrency(result.baseGoldPrice)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">Making Charge:</span>
                  <span className="font-bold text-white">+ {formatCurrency(result.totalMakingCharge)}</span>
                </div>
                <div className="border-t border-slate-700/50 pt-2 flex justify-between items-center text-sm mt-1">
                  <span className="text-amber-400 font-medium">VAT ({vatPct}%):</span>
                  <span className="font-bold text-amber-400">+ {formatCurrency(result.totalVat)}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Sticky Sidebar Layout with Custom Tools */}
        <RelatedSidebar tools={goldRelatedTools} />

      </div>
    </div>
  );
}