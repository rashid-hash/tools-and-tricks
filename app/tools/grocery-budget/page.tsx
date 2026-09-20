"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { ShoppingCart, Sparkles, Wallet, Wheat, Beef, Droplet, Carrot, SprayCan, PackagePlus, AlertCircle, PieChart } from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// এই টুলের জন্য কাস্টম রিলেটেড টুলস
const groceryRelatedTools: SuggestedTool[] = [
  { id: "rent", name: "House Rent Splitter", desc: "Split rent and bills easily.", icon: Wallet, href: "/tools/house-rent", color: "text-cyan-500", bg: "bg-cyan-100" },
  { id: "salary", name: "Salary Breakdown", desc: "Plan your monthly budget.", icon: Wallet, href: "/tools/salary-calculator", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "electricity", name: "Electricity Bill", desc: "Estimate exact unit bills.", icon: Sparkles, href: "/tools/electricity-bill", color: "text-yellow-500", bg: "bg-yellow-100" }
];

export default function GroceryBudgetCalculator() {
  // Budget Limit
  const [budgetLimit, setBudgetLimit] = useState<string>("15000");

  // Expense Categories
  const [riceDal, setRiceDal] = useState<string>("3000");
  const [protein, setProtein] = useState<string>("4500"); // Meat, Fish, Egg
  const [oilSpices, setOilSpices] = useState<string>("2000");
  const [vegetables, setVegetables] = useState<string>("1500");
  const [toiletries, setToiletries] = useState<string>("1000");
  const [others, setOthers] = useState<string>("1000");

  const [result, setResult] = useState({
    totalExpense: 0,
    remainingBudget: 0,
    isOverBudget: false,
    percentages: {
      riceDal: 0, protein: 0, oilSpices: 0, vegetables: 0, toiletries: 0, others: 0
    }
  });

  useEffect(() => {
    const limit = parseFloat(budgetLimit) || 0;
    
    const r = parseFloat(riceDal) || 0;
    const p = parseFloat(protein) || 0;
    const o = parseFloat(oilSpices) || 0;
    const v = parseFloat(vegetables) || 0;
    const t = parseFloat(toiletries) || 0;
    const oth = parseFloat(others) || 0;

    const totalExpense = r + p + o + v + t + oth;
    const remainingBudget = limit - totalExpense;
    const isOverBudget = remainingBudget < 0;

    // Calculate percentages for progress bar
    const getPct = (val: number) => totalExpense > 0 ? (val / totalExpense) * 100 : 0;

    setResult({
      totalExpense,
      remainingBudget,
      isOverBudget,
      percentages: {
        riceDal: getPct(r),
        protein: getPct(p),
        oilSpices: getPct(o),
        vegetables: getPct(v),
        toiletries: getPct(t),
        others: getPct(oth)
      }
    });
  }, [budgetLimit, riceDal, protein, oilSpices, vegetables, toiletries, others]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0, style: 'currency', currency: 'BDT' }).format(Math.ceil(num));
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-bold text-orange-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-orange-500" />
          Bangladesh Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Grocery <span className="text-orange-500">Budgeting</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার মাসিক বাজারের বাজেট প্ল্যান করুন এবং কোন খাতে কত টাকা খরচ হচ্ছে তার রিয়েল-টাইম হিসাব রাখুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Calculator Tool */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {/* Main Budget Limit Input */}
          <div className="mb-8 pb-8 border-b border-slate-100">
            <label className="text-[14px] font-extrabold text-slate-700 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Wallet size={18} className="text-orange-500"/> Total Monthly Budget (বাজেট লিমিট)
            </label>
            <div className="relative flex items-center max-w-md">
              <span className="absolute left-5 text-2xl font-bold text-slate-400">৳</span>
              <input 
                type="number" 
                value={budgetLimit}
                onChange={(e) => setBudgetLimit(e.target.value)}
                className="w-full h-16 bg-orange-50 border border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-2xl pl-12 pr-5 text-3xl font-black text-orange-900 outline-none transition-all shadow-sm"
                placeholder="15000"
              />
            </div>
          </div>

          {/* Grocery Categories */}
          <div className="mb-10">
            <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-5">
               Estimated Expenses (খরচের খাত)
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              
              {/* Rice & Dal */}
              <div>
                <label className="text-[12px] font-bold text-slate-600 mb-2 flex items-center gap-1.5"><Wheat size={14} className="text-amber-500"/> চাল ও ডাল</label>
                <input type="number" value={riceDal} onChange={(e) => setRiceDal(e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-orange-500" />
              </div>
              
              {/* Meat & Fish */}
              <div>
                <label className="text-[12px] font-bold text-slate-600 mb-2 flex items-center gap-1.5"><Beef size={14} className="text-rose-500"/> মাছ ও মাংস</label>
                <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-orange-500" />
              </div>

              {/* Oil & Spices */}
              <div>
                <label className="text-[12px] font-bold text-slate-600 mb-2 flex items-center gap-1.5"><Droplet size={14} className="text-yellow-500"/> তেল ও মশলা</label>
                <input type="number" value={oilSpices} onChange={(e) => setOilSpices(e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-orange-500" />
              </div>

              {/* Vegetables */}
              <div>
                <label className="text-[12px] font-bold text-slate-600 mb-2 flex items-center gap-1.5"><Carrot size={14} className="text-emerald-500"/> শাকসবজি</label>
                <input type="number" value={vegetables} onChange={(e) => setVegetables(e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-orange-500" />
              </div>

              {/* Toiletries */}
              <div>
                <label className="text-[12px] font-bold text-slate-600 mb-2 flex items-center gap-1.5"><SprayCan size={14} className="text-cyan-500"/> টয়লেট্রিজ</label>
                <input type="number" value={toiletries} onChange={(e) => setToiletries(e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-orange-500" />
              </div>
              
              {/* Others */}
              <div>
                <label className="text-[12px] font-bold text-slate-600 mb-2 flex items-center gap-1.5"><PackagePlus size={14} className="text-purple-500"/> অন্যান্য / স্ন্যাক্স</label>
                <input type="number" value={others} onChange={(e) => setOthers(e.target.value)} className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-orange-500" />
              </div>

            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#111827] rounded-[32px] p-6 md:p-8 w-full text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              
              {/* Total Summary */}
              <div className="space-y-6">
                <div>
                  <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <ShoppingCart size={16} /> Total Estimated Cost
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                      {formatCurrency(result.totalExpense)}
                    </span>
                  </div>
                </div>

                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${result.isOverBudget ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                  {result.isOverBudget ? <AlertCircle size={16} /> : <Wallet size={16} />}
                  <span className="text-[13px] font-bold tracking-wider">
                    {result.isOverBudget ? 'Over Budget by ' : 'Remaining Budget: '}
                    {formatCurrency(Math.abs(result.remainingBudget))}
                  </span>
                </div>
              </div>

              {/* Visual Breakdown (Progress Bar) */}
              <div className="space-y-4 lg:border-l lg:border-slate-700/50 lg:pl-8 flex flex-col justify-center">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <PieChart size={14} /> Expense Breakdown
                </p>
                
                {/* Custom Multi-color Progress Bar */}
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                  <div style={{ width: `${result.percentages.riceDal}%` }} className="h-full bg-amber-500" title="চাল ও ডাল"></div>
                  <div style={{ width: `${result.percentages.protein}%` }} className="h-full bg-rose-500" title="মাছ ও মাংস"></div>
                  <div style={{ width: `${result.percentages.oilSpices}%` }} className="h-full bg-yellow-400" title="তেল ও মশলা"></div>
                  <div style={{ width: `${result.percentages.vegetables}%` }} className="h-full bg-emerald-500" title="শাকসবজি"></div>
                  <div style={{ width: `${result.percentages.toiletries}%` }} className="h-full bg-cyan-500" title="টয়লেট্রিজ"></div>
                  <div style={{ width: `${result.percentages.others}%` }} className="h-full bg-purple-500" title="অন্যান্য"></div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 pt-2">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-[11px] text-slate-300">Carbs</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div><span className="text-[11px] text-slate-300">Protein</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-yellow-400"></div><span className="text-[11px] text-slate-300">Spices</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[11px] text-slate-300">Veg</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-cyan-500"></div><span className="text-[11px] text-slate-300">Clean</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div><span className="text-[11px] text-slate-300">Other</span></div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Sticky Sidebar Layout with Custom Tools */}
        <RelatedSidebar tools={groceryRelatedTools} />

      </div>
    </div>
  );
}