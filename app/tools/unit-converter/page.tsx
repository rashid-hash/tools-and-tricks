"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Ruler, Scale, Thermometer, Sparkles, 
  ArrowRightLeft, Copy, CheckCircle2, QrCode, Key, Terminal
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Utility Category Related Tools
const utilityRelatedTools: SuggestedTool[] = [
  { id: "qr-generator", name: "QR Generator", desc: "Create custom QR codes.", icon: QrCode, href: "/tools/qr-generator", color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "password-generator", name: "Password Generator", desc: "Create secure passwords.", icon: Key, href: "/tools/password-generator", color: "text-red-500", bg: "bg-red-100" },
  { id: "time-zone", name: "Time Zone", desc: "Convert global times.", icon: Terminal, href: "/tools/time-zone-converter", color: "text-sky-500", bg: "bg-sky-100" }
];

type Category = "length" | "weight" | "temperature";

const UNITS = {
  length: {
    meter: { name: "Meter (m)", ratio: 1 },
    kilometer: { name: "Kilometer (km)", ratio: 1000 },
    centimeter: { name: "Centimeter (cm)", ratio: 0.01 },
    millimeter: { name: "Millimeter (mm)", ratio: 0.001 },
    mile: { name: "Mile (mi)", ratio: 1609.344 },
    yard: { name: "Yard (yd)", ratio: 0.9144 },
    foot: { name: "Foot (ft)", ratio: 0.3048 },
    inch: { name: "Inch (in)", ratio: 0.0254 },
  },
  weight: {
    kilogram: { name: "Kilogram (kg)", ratio: 1000 },
    gram: { name: "Gram (g)", ratio: 1 },
    milligram: { name: "Milligram (mg)", ratio: 0.001 },
    metric_ton: { name: "Metric Ton (t)", ratio: 1000000 },
    pound: { name: "Pound (lb)", ratio: 453.59237 },
    ounce: { name: "Ounce (oz)", ratio: 28.34952 },
  },
  temperature: {
    celsius: { name: "Celsius (°C)" },
    fahrenheit: { name: "Fahrenheit (°F)" },
    kelvin: { name: "Kelvin (K)" },
  }
};

export default function UnitConverterTool() {
  const [category, setCategory] = useState<Category>("length");
  
  const [fromUnit, setFromUnit] = useState<string>("meter");
  const [toUnit, setToUnit] = useState<string>("foot");
  
  const [fromValue, setFromValue] = useState<string>("1");
  const [toValue, setToValue] = useState<string>("");
  
  const [isCopied, setIsCopied] = useState(false);

  // Synchronous handler to prevent render mismatches
  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    if (newCategory === "length") {
      setFromUnit("meter");
      setToUnit("foot");
    } else if (newCategory === "weight") {
      setFromUnit("kilogram");
      setToUnit("pound");
    } else if (newCategory === "temperature") {
      setFromUnit("celsius");
      setToUnit("fahrenheit");
    }
    setFromValue("1");
  };

  // Core Conversion Logic
  useEffect(() => {
    if (fromValue === "") {
      setToValue("");
      return;
    }

    const val = parseFloat(fromValue);
    if (isNaN(val)) {
      setToValue("");
      return;
    }

    // Safeguard to ensure current units exist in the current category
    const currentCategoryUnits = UNITS[category] as any;
    if (!currentCategoryUnits[fromUnit] || !currentCategoryUnits[toUnit]) {
      return;
    }

    let result = 0;

    if (category === "temperature") {
      if (fromUnit === toUnit) result = val;
      else if (fromUnit === "celsius" && toUnit === "fahrenheit") result = (val * 9/5) + 32;
      else if (fromUnit === "celsius" && toUnit === "kelvin") result = val + 273.15;
      else if (fromUnit === "fahrenheit" && toUnit === "celsius") result = (val - 32) * 5/9;
      else if (fromUnit === "fahrenheit" && toUnit === "kelvin") result = (val - 32) * 5/9 + 273.15;
      else if (fromUnit === "kelvin" && toUnit === "celsius") result = val - 273.15;
      else if (fromUnit === "kelvin" && toUnit === "fahrenheit") result = (val - 273.15) * 9/5 + 32;
    } else {
      const fromRatio = currentCategoryUnits[fromUnit].ratio;
      const toRatio = currentCategoryUnits[toUnit].ratio;
      const baseValue = val * fromRatio;
      result = baseValue / toRatio;
    }

    setToValue(parseFloat(result.toFixed(6)).toString());
  }, [fromValue, fromUnit, toUnit, category]);

  const handleSwap = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    
    const tempVal = toValue;
    setFromValue(tempVal);
  };

  const handleCopy = () => {
    if (!toValue) return;
    navigator.clipboard.writeText(`${toValue}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const categories = [
    { id: "length", icon: Ruler, label: "Length" },
    { id: "weight", icon: Scale, label: "Weight" },
    { id: "temperature", icon: Thermometer, label: "Temperature" },
  ];

  // Safe Extraction for the UI Render
  const activeFromUnitData = (UNITS[category] as any)[fromUnit];
  const activeToUnitData = (UNITS[category] as any)[toUnit];

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-blue-500" />
          Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Unit <span className="text-blue-600">Converter</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          দৈনন্দিন জীবনের প্রয়োজনীয় এককগুলো (যেমন- মিটার, ফিট, কেজি, পাউন্ড, সেলসিয়াস) খুব সহজেই রিয়েল-টাইমে রূপান্তর করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-10 pb-6 border-b border-slate-100 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id as Category)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                  category === cat.id 
                    ? "bg-blue-500 text-white shadow-md shadow-blue-500/20 transform scale-105" 
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                <cat.icon size={18} /> {cat.label}
              </button>
            ))}
          </div>

          {/* Converter Interface */}
          <div className="relative flex flex-col md:flex-row items-center gap-6">
            
            {/* From Box */}
            <div className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-3xl p-5 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-400 transition-all">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">From</label>
              
              <input 
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder="0"
                className="w-full bg-transparent text-4xl md:text-5xl font-extrabold text-[#111827] outline-none mb-4"
              />
              
              <select 
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer hover:border-blue-300 transition-colors"
              >
                {Object.entries(UNITS[category]).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>

            {/* Middle Swap Button */}
            <button 
              onClick={handleSwap}
              className="w-14 h-14 shrink-0 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-blue-500 hover:bg-blue-50 hover:scale-110 transition-all group z-10 -my-3 md:my-0"
              title="Swap Units"
            >
              <ArrowRightLeft size={24} className="group-hover:rotate-180 transition-transform duration-500" />
            </button>

            {/* To Box */}
            <div className="flex-1 w-full bg-[#0F172A] border border-slate-700 rounded-3xl p-5 relative overflow-hidden group">
              <label className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-4">To</label>
              
              <div className="flex items-center justify-between mb-4">
                <input 
                  type="text"
                  value={toValue}
                  readOnly
                  placeholder="0"
                  className="w-full bg-transparent text-4xl md:text-5xl font-extrabold text-white outline-none"
                />
                <button 
                  onClick={handleCopy}
                  disabled={!toValue}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-all disabled:opacity-0"
                  title="Copy Result"
                >
                  {isCopied ? <CheckCircle2 size={20} className="text-emerald-400" /> : <Copy size={20} />}
                </button>
              </div>
              
              <select 
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full h-12 bg-[#1E293B] border border-slate-600 rounded-xl px-4 text-sm font-bold text-blue-100 outline-none cursor-pointer hover:border-blue-400 transition-colors"
              >
                {Object.entries(UNITS[category]).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Real-time Equation Help (Safe Render Check Added) */}
          {toValue && fromValue && activeFromUnitData && activeToUnitData && (
            <div className="mt-8 text-center animate-in fade-in">
              <p className="text-sm font-bold text-slate-500">
                <span className="text-slate-800">{fromValue}</span> {activeFromUnitData.name.split(' ')[0]} 
                <span className="mx-2 text-blue-400">=</span> 
                <span className="text-blue-600">{toValue}</span> {activeToUnitData.name.split(' ')[0]}
              </p>
            </div>
          )}

        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="hidden lg:block w-80 shrink-0">
           <RelatedSidebar tools={utilityRelatedTools} />
        </div>

      </div>
    </div>
  );
}