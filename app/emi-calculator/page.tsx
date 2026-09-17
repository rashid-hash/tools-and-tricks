"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Calculator, Coins, CalendarDays, Percent, PieChart, Info } from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export default function EmiCalculator() {
  // States
  const [principal, setPrincipal] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(9);
  const [tenure, setTenure] = useState<number>(3);
  const [tenureType, setTenureType] = useState<"years" | "months">("years");

  // Calculated Results
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  // EMI Calculation Logic
  useEffect(() => {
    const calculateEMI = () => {
      let p = principal;
      let r = interestRate / 12 / 100; // Monthly Interest Rate
      let n = tenureType === "years" ? tenure * 12 : tenure; // Total number of months

      if (p > 0 && n > 0) {
        if (r > 0) {
          const emiCalc = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
          const totalPay = emiCalc * n;
          setEmi(Math.round(emiCalc));
          setTotalPayment(Math.round(totalPay));
          setTotalInterest(Math.round(totalPay - p));
        } else {
          // Zero Interest Case
          setEmi(Math.round(p / n));
          setTotalPayment(p);
          setTotalInterest(0);
        }
      } else {
        setEmi(0);
        setTotalPayment(0);
        setTotalInterest(0);
      }
    };

    calculateEMI();
  }, [principal, interestRate, tenure, tenureType]);

  // Chart percentage logic
  const principalPercent = totalPayment > 0 ? (principal / totalPayment) * 100 : 100;
  const interestPercent = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

  // Number Formatter (Indian/BD format with commas)
  const formatNumber = (num: number) => {
    return num.toLocaleString("en-IN");
  };

  return (
    <div className={`min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans ${notoSansBengali.className} text-gray-800 pb-20`}>
      
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-10 mt-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Smart <span className="text-emerald-600">EMI Calculator</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
          পার্সোনাল লোন, কার লোন বা হোম লোনের মাসিক কিস্তি (EMI) এবং মোট সুদের পরিমাণ হিসাব করুন একদম নিখুঁতভাবে।
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* --- Left Panel: Controls --- */}
        <div className="w-full lg:w-[50%] bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-8">
          
          {/* Principal Amount */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <Coins size={18} className="text-emerald-500" /> লোনের পরিমাণ (৳)
              </label>
              <div className="bg-emerald-50 text-emerald-700 font-bold px-4 py-2 rounded-lg border border-emerald-100 min-w-[120px] text-right">
                {formatNumber(principal)}
              </div>
            </div>
            <input 
              type="range" min="10000" max="10000000" step="10000" 
              value={principal} 
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 font-medium">
              <span>10K</span>
              <span>1 Crore</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <Percent size={18} className="text-emerald-500" /> সুদের হার (Annual)
              </label>
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 px-3 py-1">
                <input 
                  type="number" value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="bg-transparent w-16 text-right font-bold text-gray-700 outline-none"
                />
                <span className="text-gray-500 font-bold ml-1">%</span>
              </div>
            </div>
            <input 
              type="range" min="1" max="30" step="0.1" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Loan Tenure */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <CalendarDays size={18} className="text-emerald-500" /> লোনের মেয়াদ
              </label>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                  onClick={() => setTenureType("years")} 
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${tenureType === "years" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Years
                </button>
                <button 
                  onClick={() => setTenureType("months")} 
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${tenureType === "months" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Months
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="1" 
                max={tenureType === "years" ? 30 : 360} 
                value={tenure} 
                onChange={(e) => setTenure(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="w-20 bg-gray-50 rounded-lg border border-gray-200 px-3 py-2 flex items-center justify-center">
                 <input 
                  type="number" value={tenure} 
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="bg-transparent w-full text-center font-bold text-gray-700 outline-none"
                />
              </div>
            </div>
          </div>

        </div>

        {/* --- Right Panel: Live Results --- */}
        <div className="w-full lg:w-[50%] flex flex-col gap-6">
          <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between h-full min-h-[400px]">
            
            {/* Background Decorations */}
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-emerald-700/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-emerald-600/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col gap-8">
              
              {/* Main EMI Result */}
              <div className="text-center bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-sm">
                <p className="text-emerald-100 font-semibold mb-1 uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                  <Calculator size={16}/> মাসিক কিস্তি (EMI)
                </p>
                <div className="flex justify-center items-end gap-1">
                  <span className="text-4xl md:text-5xl font-black">৳ {formatNumber(emi)}</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-emerald-700/50 pb-3">
                  <span className="text-emerald-100 font-medium text-sm md:text-base">আসল টাকা (Principal)</span>
                  <span className="font-bold text-lg">৳ {formatNumber(principal)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-emerald-700/50 pb-3">
                  <span className="text-emerald-100 font-medium text-sm md:text-base">মোট সুদ (Total Interest)</span>
                  <span className="font-bold text-lg text-red-300">৳ {formatNumber(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-50 font-medium text-sm md:text-base">সর্বমোট পরিশোধ (Total Payment)</span>
                  <span className="font-bold text-xl text-emerald-300">৳ {formatNumber(totalPayment)}</span>
                </div>
              </div>

              {/* Visual Progress Bar Chart */}
              <div className="mt-2">
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-emerald-300 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Principal ({principalPercent.toFixed(1)}%)</span>
                  <span className="text-red-300 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400"></div> Interest ({interestPercent.toFixed(1)}%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-red-400 overflow-hidden flex">
                   <div 
                     className="h-full bg-emerald-400 transition-all duration-500 ease-out"
                     style={{ width: `${principalPercent}%` }}
                   ></div>
                </div>
              </div>

            </div>
            
            <div className="relative z-10 mt-6 flex items-start gap-2 bg-black/20 p-3 rounded-xl border border-white/5">
              <Info size={20} className="text-emerald-200 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-100 leading-relaxed">
                এই হিসাবটি 'Reducing Balance' পদ্ধতির ওপর ভিত্তি করে করা হয়েছে। ব্যাংক বা আর্থিক প্রতিষ্ঠানের হিডেন চার্জ অনুযায়ী কিস্তির পরিমাণ সামান্য কম-বেশি হতে পারে।
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}