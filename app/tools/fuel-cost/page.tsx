"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Fuel, Sparkles, MapPin, Gauge, Bus, Car, Coins } from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// এই টুলের জন্য কাস্টম রিলেটেড টুলস (যাতায়াত রিলেটেড)
const fuelRelatedTools: SuggestedTool[] = [
  { id: "bus-fare", name: "Bus Fare Calculator", desc: "Estimate inter-district travel costs.", icon: Bus, href: "/tools/bus-fare", color: "text-indigo-500", bg: "bg-indigo-100" },
  { id: "emi", name: "Car Loan EMI", desc: "Calculate monthly installment for car loans.", icon: Car, href: "/tools/emi-calculator", color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "internet", name: "Internet Data Cost", desc: "Analyze your mobile data package.", icon: Coins, href: "/tools/internet-cost", color: "text-violet-500", bg: "bg-violet-100" }
];

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState<string>("150");
  const [mileage, setMileage] = useState<string>("15");
  const [fuelPrice, setFuelPrice] = useState<string>("125"); // Default Octane

  const [result, setResult] = useState({
    fuelNeeded: 0,
    totalCost: 0,
    costPerKm: 0
  });

  useEffect(() => {
    const dist = parseFloat(distance) || 0;
    const mil = parseFloat(mileage) || 0;
    const price = parseFloat(fuelPrice) || 0;

    let fuelNeeded = 0;
    let totalCost = 0;
    let costPerKm = 0;

    if (mil > 0) {
      fuelNeeded = dist / mil;
      totalCost = fuelNeeded * price;
    }
    
    if (dist > 0) {
      costPerKm = totalCost / dist;
    }

    setResult({ fuelNeeded, totalCost, costPerKm });
  }, [distance, mileage, fuelPrice]);

  const formatNumber = (num: number, decimals: number = 2) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(num);
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-rose-500" />
          Bangladesh Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Fuel Cost <span className="text-rose-500">Calculator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার গাড়ি বা বাইকের মাইলেজ এবং দূরত্বের ওপর ভিত্তি করে ভ্রমণের মোট জ্বালানি খরচ বের করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Calculator Tool */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Distance Input */}
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-rose-500"/> Total Distance
              </label>
              <div className="relative flex items-center">
                <input 
                  type="number" 
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 rounded-2xl px-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="150"
                />
                <span className="absolute right-5 text-lg font-bold text-slate-400">KM</span>
              </div>
            </div>

            {/* Mileage Input */}
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Gauge size={16} className="text-rose-500"/> Vehicle Mileage
              </label>
              <div className="relative flex items-center">
                <input 
                  type="number" 
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 rounded-2xl px-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="15"
                />
                <span className="absolute right-5 text-sm font-bold text-slate-400">KM/L</span>
              </div>
            </div>
          </div>

          {/* Fuel Price & Presets */}
          <div className="mb-10">
            <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Fuel size={16} className="text-rose-500"/> Fuel Price (Per Liter)
            </label>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex items-center w-full md:w-1/3">
                <span className="absolute left-4 text-lg font-bold text-slate-400">৳</span>
                <input 
                  type="number" 
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(e.target.value)}
                  className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 rounded-xl pl-8 pr-4 text-xl font-bold text-[#111827] outline-none transition-all"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-2/3">
                <button onClick={() => setFuelPrice("125")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${fuelPrice === "125" ? "bg-rose-50 border-rose-200 text-rose-700" : "bg-white border-slate-200 text-slate-500 hover:border-rose-300 hover:text-rose-600"}`}>
                  Octane (৳125)
                </button>
                <button onClick={() => setFuelPrice("121")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${fuelPrice === "121" ? "bg-rose-50 border-rose-200 text-rose-700" : "bg-white border-slate-200 text-slate-500 hover:border-rose-300 hover:text-rose-600"}`}>
                  Petrol (৳121)
                </button>
                <button onClick={() => setFuelPrice("106")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${fuelPrice === "106" ? "bg-rose-50 border-rose-200 text-rose-700" : "bg-white border-slate-200 text-slate-500 hover:border-rose-300 hover:text-rose-600"}`}>
                  Diesel (৳106)
                </button>
                <button onClick={() => setFuelPrice("43")} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${fuelPrice === "43" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600"}`}>
                  CNG (৳43)
                </button>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#111827] rounded-[32px] p-6 md:p-8 w-full text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              
              {/* Main Cost */}
              <div className="space-y-6">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Estimated Cost</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold tracking-tight text-white">
                      ৳ {formatNumber(result.totalCost)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-6 md:border-l md:border-slate-700/50 md:pl-8">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Fuel Required</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">
                      {formatNumber(result.fuelNeeded)}
                    </span>
                    <span className="text-sm font-medium text-slate-400">Liters / Unit</span>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Cost Per Kilometer</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-rose-400">
                      ৳ {formatNumber(result.costPerKm)}
                    </span>
                    <span className="text-sm font-medium text-slate-400">/ KM</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Sticky Sidebar Layout with Custom Tools */}
        <RelatedSidebar tools={fuelRelatedTools} />

      </div>
    </div>
  );
}