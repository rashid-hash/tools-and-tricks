"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Wallet, Sparkles, Briefcase } from "lucide-react";
import RelatedSidebar from "@/components/RelatedSidebar"; // <- Sidebar Import করা হলো

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<string>("50000");
  
  // Allowance Percentages (Based on Gross)
  const [basicPct, setBasicPct] = useState<number>(50);
  const [houseRentPct, setHouseRentPct] = useState<number>(30);
  const [medicalPct, setMedicalPct] = useState<number>(10);
  const [conveyancePct, setConveyancePct] = useState<number>(10);

  // Deductions
  const [pfPct, setPfPct] = useState<number>(0); 
  const [monthlyTax, setMonthlyTax] = useState<string>("0");

  const [breakdown, setBreakdown] = useState({
    basic: 0,
    houseRent: 0,
    medical: 0,
    conveyance: 0,
    pfDeduction: 0,
    totalDeductions: 0,
    netSalary: 0
  });

  useEffect(() => {
    const gross = parseFloat(grossSalary) || 0;
    const tax = parseFloat(monthlyTax) || 0;

    const basic = (gross * basicPct) / 100;
    const houseRent = (gross * houseRentPct) / 100;
    const medical = (gross * medicalPct) / 100;
    const conveyance = (gross * conveyancePct) / 100;

    const pfDeduction = (basic * pfPct) / 100;
    const totalDeductions = pfDeduction + tax;

    const netSalary = gross - totalDeductions;

    setBreakdown({
      basic,
      houseRent,
      medical,
      conveyance,
      pfDeduction,
      totalDeductions,
      netSalary
    });
  }, [grossSalary, basicPct, houseRentPct, medicalPct, conveyancePct, pfPct, monthlyTax]);

  const setStandardFormat = () => {
    setBasicPct(50);
    setHouseRentPct(30);
    setMedicalPct(10);
    setConveyancePct(10);
  };
  
  const setGovtFormat = () => {
    setBasicPct(60);
    setHouseRentPct(30);
    setMedicalPct(5);
    setConveyancePct(5);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(num);
  };

  const totalPercentage = basicPct + houseRentPct + medicalPct + conveyancePct;

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-emerald-500" />
          Bangladesh Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Salary <span className="text-emerald-600">Breakdown</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার গ্রস স্যালারি থেকে বেসিক, বাড়িভাড়া এবং ফান্ড ডিডাকশন হিসাব করে সঠিক নেট স্যালারি বের করুন।
        </p>
      </div>

      {/* Main Layout Container (Left: Tool, Right: Sidebar) */}
      {/* max-w-7xl ব্যবহার করা হয়েছে যাতে বড় স্ক্রিনে ৩টি কলাম (ইনপুট, রেজাল্ট, সাইডবার) সুন্দরভাবে ফিট হয় */}
      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Calculator Tool (Grid layout for inputs and results) */}
        <div className="flex-1 w-full grid grid-cols-1 xl:grid-cols-5 gap-6">
          
          {/* Input Section */}
          <div className="xl:col-span-3 bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
            
            <div className="mb-6">
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Briefcase size={16} /> Monthly Gross Salary
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-5 text-xl font-bold text-slate-400">৳</span>
                <input 
                  type="number" 
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl pl-10 pr-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="50000"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <button onClick={setStandardFormat} className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-colors">
                Standard Corporate (50/30/10/10)
              </button>
              <button onClick={setGovtFormat} className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors">
                Govt Style (60/30/5/5)
              </button>
            </div>

            {/* Sliders for breakdown */}
            <div className="space-y-5 mb-8">
              <p className="text-[13px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Salary Structure (%)</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-bold text-slate-500 mb-1 block">Basic</label>
                  <div className="flex items-center gap-2">
                    <input type="number" value={basicPct} onChange={(e) => setBasicPct(Number(e.target.value))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg px-3 text-sm font-semibold outline-none" />
                    <span className="text-slate-400 text-sm">%</span>
                  </div>
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-500 mb-1 block">House Rent</label>
                  <div className="flex items-center gap-2">
                    <input type="number" value={houseRentPct} onChange={(e) => setHouseRentPct(Number(e.target.value))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg px-3 text-sm font-semibold outline-none" />
                    <span className="text-slate-400 text-sm">%</span>
                  </div>
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-500 mb-1 block">Medical</label>
                  <div className="flex items-center gap-2">
                    <input type="number" value={medicalPct} onChange={(e) => setMedicalPct(Number(e.target.value))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg px-3 text-sm font-semibold outline-none" />
                    <span className="text-slate-400 text-sm">%</span>
                  </div>
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-500 mb-1 block">Conveyance</label>
                  <div className="flex items-center gap-2">
                    <input type="number" value={conveyancePct} onChange={(e) => setConveyancePct(Number(e.target.value))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg px-3 text-sm font-semibold outline-none" />
                    <span className="text-slate-400 text-sm">%</span>
                  </div>
                </div>
              </div>
              
              {totalPercentage !== 100 && (
                <p className="text-xs font-bold text-rose-500 mt-2">Warning: Total percentage is {totalPercentage}%. It should ideally be 100%.</p>
              )}
            </div>

            <div className="space-y-5">
              <p className="text-[13px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Deductions</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-bold text-slate-500 mb-1 block">Provident Fund (% of Basic)</label>
                  <div className="flex items-center gap-2">
                    <input type="number" value={pfPct} onChange={(e) => setPfPct(Number(e.target.value))} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg px-3 text-sm font-semibold outline-none" />
                    <span className="text-slate-400 text-sm">%</span>
                  </div>
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-500 mb-1 block">Monthly Tax / TDS (৳)</label>
                  <div className="flex items-center gap-2">
                    <input type="number" value={monthlyTax} onChange={(e) => setMonthlyTax(e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg px-3 text-sm font-semibold outline-none" />
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Result Section */}
          <div className="xl:col-span-2 flex flex-col h-full">
            <div className="bg-[#111827] rounded-[32px] p-6 md:p-8 w-full text-white relative overflow-hidden shadow-xl shadow-slate-900/10 h-full flex flex-col">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <p className="text-emerald-400 text-[12px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2"><Wallet size={16}/> Net Payable Salary</p>
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
                {formatCurrency(breakdown.netSalary)}
              </div>

              <div className="space-y-4 flex-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">Basic ({basicPct}%)</span>
                  <span className="font-bold">{formatCurrency(breakdown.basic)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">House Rent ({houseRentPct}%)</span>
                  <span className="font-bold">{formatCurrency(breakdown.houseRent)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">Medical ({medicalPct}%)</span>
                  <span className="font-bold">{formatCurrency(breakdown.medical)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">Conveyance ({conveyancePct}%)</span>
                  <span className="font-bold">{formatCurrency(breakdown.conveyance)}</span>
                </div>
                
                <div className="my-4 border-t border-slate-700/50"></div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-rose-400 font-medium flex items-center gap-1">PF Deduction</span>
                  <span className="font-bold text-rose-400">- {formatCurrency(breakdown.pfDeduction)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-rose-400 font-medium flex items-center gap-1">Tax / TDS</span>
                  <span className="font-bold text-rose-400">- {formatCurrency(parseFloat(monthlyTax) || 0)}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700/50 bg-[#111827]">
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-slate-300 font-bold">Total Deductions</span>
                  <span className="font-bold text-rose-400">- {formatCurrency(breakdown.totalDeductions)}</span>
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