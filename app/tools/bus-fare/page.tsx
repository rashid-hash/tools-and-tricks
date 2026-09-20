"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Bus, Sparkles, MapPin, Users, Ticket, Plus, Navigation } from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// এই টুলের জন্য কাস্টম রিলেটেড টুলস
const travelRelatedTools: SuggestedTool[] = [
  { id: "fuel", name: "Fuel Cost Calculator", desc: "Calculate fuel costs for bikes/cars.", icon: Navigation, href: "/tools/fuel-cost", color: "text-rose-500", bg: "bg-rose-100" },
  { id: "rent", name: "House Rent Splitter", desc: "Split rent and bills easily.", icon: Users, href: "/tools/house-rent", color: "text-cyan-500", bg: "bg-cyan-100" },
  { id: "salary", name: "Salary Breakdown", desc: "Calculate your net payable salary.", icon: Ticket, href: "/tools/salary-calculator", color: "text-blue-500", bg: "bg-blue-100" }
];

export default function BusFareCalculator() {
  const [distance, setDistance] = useState<string>("250");
  const [busType, setBusType] = useState<number>(2.15); // Default Non-AC BRTA rate
  const [passengers, setPassengers] = useState<string>("1");
  const [tollCharges, setTollCharges] = useState<string>("0");

  const [result, setResult] = useState({
    baseFarePerPerson: 0,
    tollPerPerson: 0,
    totalPerPerson: 0,
    grandTotal: 0
  });

  useEffect(() => {
    const dist = parseFloat(distance) || 0;
    const rate = busType || 0;
    const pax = parseInt(passengers) || 1;
    const totalToll = parseFloat(tollCharges) || 0;

    // Calculation
    const baseFarePerPerson = dist * rate;
    const tollPerPerson = totalToll / pax;
    const totalPerPerson = baseFarePerPerson + tollPerPerson;
    const grandTotal = totalPerPerson * pax;

    setResult({
      baseFarePerPerson,
      tollPerPerson,
      totalPerPerson,
      grandTotal
    });
  }, [distance, busType, passengers, tollCharges]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0, style: 'currency', currency: 'BDT' }).format(Math.ceil(num));
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-indigo-500" />
          Bangladesh Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Bus/Travel Fare <span className="text-indigo-500">Estimator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আন্তঃজেলা ভ্রমণের দূরত্ব এবং সরকারি রেটের ওপর ভিত্তি করে আপনার বাস ভাড়া ও টোলের হিসাব বের করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Calculator Tool */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Distance Input */}
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-indigo-500"/> Total Distance
              </label>
              <div className="relative flex items-center">
                <input 
                  type="number" 
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="250"
                />
                <span className="absolute right-5 text-lg font-bold text-slate-400">KM</span>
              </div>
            </div>

            {/* Passengers Input */}
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Users size={16} className="text-indigo-500"/> Total Passengers
              </label>
              <div className="relative flex items-center">
                <input 
                  type="number" 
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="1"
                  min="1"
                />
                <span className="absolute right-5 text-lg font-bold text-slate-400">Persons</span>
              </div>
            </div>

          </div>

          {/* Bus Type & Presets */}
          <div className="mb-8">
            <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Bus size={16} className="text-indigo-500"/> Bus Type & Rate (Per KM)
            </label>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex items-center w-full md:w-1/3">
                <span className="absolute left-4 text-lg font-bold text-slate-400">৳</span>
                <input 
                  type="number" 
                  value={busType}
                  onChange={(e) => setBusType(Number(e.target.value))}
                  className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl pl-8 pr-4 text-xl font-bold text-[#111827] outline-none transition-all"
                  step="0.01"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-2/3">
                <button onClick={() => setBusType(2.15)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${busType === 2.15 ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600"}`}>
                  BRTA Non-AC (৳2.15)
                </button>
                <button onClick={() => setBusType(3.50)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${busType === 3.50 ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600"}`}>
                  Standard AC (৳3.50)
                </button>
                <button onClick={() => setBusType(5.00)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${busType === 5.00 ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600"}`}>
                  Luxury AC (৳5.00+)
                </button>
              </div>
            </div>
          </div>

          {/* Tolls & Ferry */}
          <div className="mb-10 w-full md:w-1/2">
            <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Plus size={16} className="text-indigo-500"/> Additional Bridge Tolls / Ferry
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-5 text-xl font-bold text-slate-400">৳</span>
              <input 
                type="number" 
                value={tollCharges}
                onChange={(e) => setTollCharges(e.target.value)}
                className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl pl-10 pr-5 text-lg font-bold text-[#111827] outline-none transition-all"
                placeholder="0"
              />
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#111827] rounded-[32px] p-6 md:p-8 w-full text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              
              {/* Main Cost Per Person */}
              <div className="space-y-6">
                <div>
                  <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Ticket size={16} /> Ticket Price (Per Person)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                      {formatCurrency(result.totalPerPerson)}
                    </span>
                  </div>
                </div>
                
                {parseInt(passengers) > 1 && (
                  <div className="pt-4 border-t border-slate-700/50">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Group Total ({passengers} Persons)</p>
                    <span className="text-2xl font-bold text-slate-200">
                      {formatCurrency(result.grandTotal)}
                    </span>
                  </div>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-4 md:border-l md:border-slate-700/50 md:pl-8 flex flex-col justify-center">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">Distance Fare:</span>
                  <span className="font-bold text-white">{formatCurrency(result.baseFarePerPerson)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">Tolls (Shared per pax):</span>
                  <span className="font-bold text-white">+ {formatCurrency(result.tollPerPerson)}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Sticky Sidebar Layout with Custom Tools */}
        <RelatedSidebar tools={travelRelatedTools} />

      </div>
    </div>
  );
}