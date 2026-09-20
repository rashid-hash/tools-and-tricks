"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Zap, Sparkles, Lightbulb, Receipt, Plus } from "lucide-react";
import RelatedSidebar from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Interface for Slab Breakdown
interface SlabBreakdown {
  label: string;
  units: number;
  rate: number;
  total: number;
}

export default function ElectricityBillCalculator() {
  const [consumedUnits, setConsumedUnits] = useState<string>("150");
  const [demandCharge, setDemandCharge] = useState<string>("80"); // Standard Tk 40/kW, assuming 2kW
  const [meterRent, setMeterRent] = useState<string>("40");
  const [vatPct, setVatPct] = useState<number>(5);

  const [result, setResult] = useState({
    energyCharge: 0,
    totalVat: 0,
    totalBill: 0,
    slabs: [] as SlabBreakdown[]
  });

  useEffect(() => {
    const units = parseFloat(consumedUnits) || 0;
    const demand = parseFloat(demandCharge) || 0;
    const rent = parseFloat(meterRent) || 0;
    
    let energyCharge = 0;
    let slabs: SlabBreakdown[] = [];

    // BD Residential Tariff Logic (Approximate recent rates)
    if (units > 0 && units <= 50) {
      // Lifeline standard
      energyCharge = units * 4.63;
      slabs.push({ label: '0-50 (Lifeline)', units, rate: 4.63, total: energyCharge });
    } else if (units > 50) {
      let remaining = units;
      
      // Slab 1: 0-75
      if (remaining > 0) {
        let u = Math.min(remaining, 75);
        let cost = u * 5.26;
        energyCharge += cost;
        slabs.push({ label: 'First 0-75', units: u, rate: 5.26, total: cost });
        remaining -= u;
      }
      // Slab 2: 76-200
      if (remaining > 0) {
        let u = Math.min(remaining, 125);
        let cost = u * 7.20;
        energyCharge += cost;
        slabs.push({ label: '76-200', units: u, rate: 7.20, total: cost });
        remaining -= u;
      }
      // Slab 3: 201-300
      if (remaining > 0) {
        let u = Math.min(remaining, 100);
        let cost = u * 7.59;
        energyCharge += cost;
        slabs.push({ label: '201-300', units: u, rate: 7.59, total: cost });
        remaining -= u;
      }
      // Slab 4: 301-400
      if (remaining > 0) {
        let u = Math.min(remaining, 100);
        let cost = u * 8.02;
        energyCharge += cost;
        slabs.push({ label: '301-400', units: u, rate: 8.02, total: cost });
        remaining -= u;
      }
      // Slab 5: 401-600
      if (remaining > 0) {
        let u = Math.min(remaining, 200);
        let cost = u * 12.67;
        energyCharge += cost;
        slabs.push({ label: '401-600', units: u, rate: 12.67, total: cost });
        remaining -= u;
      }
      // Slab 6: 601+
      if (remaining > 0) {
        let cost = remaining * 14.61;
        energyCharge += cost;
        slabs.push({ label: '601+', units: remaining, rate: 14.61, total: cost });
      }
    }

    const principalAmount = energyCharge + demand + rent;
    const totalVat = (principalAmount * vatPct) / 100;
    const totalBill = principalAmount + totalVat;

    setResult({
      energyCharge,
      totalVat,
      totalBill,
      slabs
    });
  }, [consumedUnits, demandCharge, meterRent, vatPct]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(num);
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
          Electricity Bill <span className="text-amber-500">Estimator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার ব্যবহৃত ইউনিট (Units) অনুযায়ী সরকারি স্ল্যাব রেটে বাসাবাড়ির বিদ্যুৎ বিলের হিসাব বের করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Calculator Tool */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {/* Main Input */}
          <div className="mb-8">
            <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Zap size={16} className="text-amber-500" /> Consumed Units (ব্যবহৃত ইউনিট)
            </label>
            <div className="relative flex items-center">
              <input 
                type="number" 
                value={consumedUnits}
                onChange={(e) => setConsumedUnits(e.target.value)}
                className="w-full h-20 bg-amber-50/50 border border-amber-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-2xl px-6 text-4xl font-black text-amber-900 outline-none transition-all"
                placeholder="150"
              />
              <span className="absolute right-6 text-xl font-bold text-amber-700/50">kWh</span>
            </div>
          </div>

          {/* Additional Charges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="text-[12px] font-bold text-slate-500 mb-2 block">Demand Charge (Tk)</label>
              <input 
                type="number" 
                value={demandCharge}
                onChange={(e) => setDemandCharge(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-[12px] font-bold text-slate-500 mb-2 block">Meter Rent (Tk)</label>
              <input 
                type="number" 
                value={meterRent}
                onChange={(e) => setMeterRent(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-[12px] font-bold text-slate-500 mb-2 block">Govt VAT (%)</label>
              <input 
                type="number" 
                value={vatPct}
                onChange={(e) => setVatPct(Number(e.target.value))}
                className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm font-semibold outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Results Breakdown */}
          <div className="bg-[#111827] rounded-[24px] overflow-hidden shadow-xl shadow-slate-900/10">
            
            <div className="p-6 md:p-8 relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-slate-700/50 pb-6 mb-6">
                <div>
                  <p className="text-amber-400 text-[12px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Receipt size={16}/> Total Estimated Bill
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                      ৳ {formatCurrency(result.totalBill)}
                    </span>
                  </div>
                </div>
                
                <div className="text-left md:text-right">
                  <p className="text-slate-400 text-[13px] font-medium mb-1">Total VAT ({vatPct}%)</p>
                  <p className="text-xl font-bold text-slate-200">+ ৳ {formatCurrency(result.totalVat)}</p>
                </div>
              </div>

              {/* Energy Charge Slabs Table */}
              <div>
                <p className="text-slate-300 text-sm font-bold mb-4 flex items-center gap-2">
                  <Lightbulb size={16} className="text-amber-400" /> Energy Charge Breakdown
                </p>
                <div className="space-y-2">
                  {result.slabs.map((slab, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <span className="text-slate-300 font-medium w-32">{slab.label}</span>
                        <span className="text-slate-400 text-xs">{slab.units} units × ৳{slab.rate}</span>
                      </div>
                      <span className="font-bold text-white">৳ {formatCurrency(slab.total)}</span>
                    </div>
                  ))}
                  
                  {/* Additional Fixed Charges */}
                  <div className="flex justify-between items-center text-sm p-3 border-t border-slate-700 mt-2 text-slate-300">
                    <span className="flex items-center gap-2"><Plus size={14} className="text-slate-500"/> Demand Charge</span>
                    <span className="font-bold">৳ {formatCurrency(parseFloat(demandCharge) || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 text-slate-300">
                    <span className="flex items-center gap-2"><Plus size={14} className="text-slate-500"/> Meter Rent</span>
                    <span className="font-bold">৳ {formatCurrency(parseFloat(meterRent) || 0)}</span>
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