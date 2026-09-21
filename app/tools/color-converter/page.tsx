"use client";

import React, { useState, useEffect, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Palette, Sparkles, Copy, CheckCircle2, 
  Hash, Droplet, Paintbrush, Pipette, ScanLine, 
  Timer, Terminal, Scale
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Utility Category Related Tools
const utilityRelatedTools: SuggestedTool[] = [
  { id: "countdown-timer", name: "Countdown Timer", desc: "Create live countdowns.", icon: Timer, href: "/tools/countdown-timer", color: "text-amber-500", bg: "bg-amber-100" },
  { id: "time-zone", name: "Time Zone", desc: "Convert global times.", icon: Terminal, href: "/tools/time-zone-converter", color: "text-sky-500", bg: "bg-sky-100" },
  { id: "unit-converter", name: "Unit Converter", desc: "Convert length, weight, etc.", icon: Scale, href: "/tools/unit-converter", color: "text-blue-500", bg: "bg-blue-100" }
];

// Helper Math Functions for Conversion
const hexToRgb = (hex: string) => {
  let r = 0, g = 0, b = 0;
  const cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  }
  return { r, g, b };
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const rgbToCmyk = (r: number, g: number, b: number) => {
  let c = 1 - (r / 255);
  let m = 1 - (g / 255);
  let y = 1 - (b / 255);
  let k = Math.min(c, Math.min(m, y));
  
  if (k === 1) {
    c = 0; m = 0; y = 0;
  } else {
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
  }
  return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
};

export default function ColorConverterTool() {
  const [hex, setHex] = useState<string>("#EC4899"); // Default Pink/Rose
  const [rgbStr, setRgbStr] = useState<string>("");
  const [hslStr, setHslStr] = useState<string>("");
  const [cmykStr, setCmykStr] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Validate HEX format loosely before converting
    if (/^#?[0-9A-Fa-f]{3,6}$/.test(hex)) {
      const formattedHex = hex.startsWith("#") ? hex : `#${hex}`;
      const { r, g, b } = hexToRgb(formattedHex);
      
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        setRgbStr(`rgb(${r}, ${g}, ${b})`);
        
        const { h, s, l } = rgbToHsl(r, g, b);
        setHslStr(`hsl(${h}, ${s}%, ${l}%)`);
        
        const { c, m, y, k } = rgbToCmyk(r, g, b);
        setCmykStr(`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`);
      }
    } else {
      setRgbStr("Invalid format");
      setHslStr("Invalid format");
      setCmykStr("Invalid format");
    }
  }, [hex]);

  const handleCopy = (text: string, id: string) => {
    if (text === "Invalid format") return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const FormatBox = ({ label, icon: Icon, value, id }: { label: string, icon: any, value: string, id: string }) => (
    <div className="flex flex-col bg-white border border-slate-200 rounded-2xl p-4 md:p-5 hover:border-rose-300 transition-colors shadow-sm group relative overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Icon size={14} className="text-rose-400" /> {label}
        </span>
        <button 
          onClick={() => handleCopy(value, id)}
          className="p-1.5 text-slate-400 hover:text-rose-500 bg-slate-50 hover:bg-rose-50 rounded-lg transition-colors"
          title={`Copy ${label}`}
        >
          {copiedId === id ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
        </button>
      </div>
      <p className="text-base md:text-lg font-mono font-bold text-slate-700 truncate select-all">{value}</p>
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-rose-500" />
          Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Color <span className="text-rose-500">Converter</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          যেকোনো কালার কোড (HEX) দিলে সেটি রিয়েল-টাইমে RGB, HSL এবং CMYK ফরম্যাটে কনভার্ট হয়ে যাবে। কালার পিকার দিয়ে কালার সিলেক্ট করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60 flex flex-col md:flex-row gap-8">
          
          {/* Visual Picker Side */}
          <div className="w-full md:w-[320px] flex flex-col shrink-0 gap-6">
            
            {/* Big Interactive Color Box */}
            <div 
              className="w-full aspect-square rounded-[32px] shadow-inner relative overflow-hidden group cursor-pointer border border-black/10"
              style={{ backgroundColor: hex.length >= 4 ? hex : '#EC4899' }}
              onClick={() => colorInputRef.current?.click()}
            >
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold text-slate-800 flex items-center gap-2 shadow-lg">
                  <Pipette size={16} /> Choose Color
                </div>
              </div>

              {/* Hidden Native Input */}
              <input 
                type="color" 
                ref={colorInputRef}
                value={hex.length === 7 ? hex : '#EC4899'}
                onChange={(e) => setHex(e.target.value.toUpperCase())}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer pointer-events-none" 
              />
            </div>

            {/* Manual HEX Input */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 focus-within:border-rose-400 focus-within:ring-4 focus-within:ring-rose-500/10 transition-all">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                <Hash size={14} className="text-rose-400" /> HEX Code
              </label>
              <div className="flex items-center">
                <input 
                  type="text"
                  value={hex}
                  onChange={(e) => setHex(e.target.value.toUpperCase())}
                  placeholder="#EC4899"
                  maxLength={7}
                  className="w-full bg-transparent text-2xl font-mono font-bold text-slate-800 outline-none uppercase"
                />
                <button 
                  onClick={() => handleCopy(hex, "hex")}
                  className="p-2 text-slate-400 hover:text-rose-500 bg-white border border-slate-200 rounded-xl shadow-sm transition-all"
                  title="Copy HEX"
                >
                  {copiedId === "hex" ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

          </div>

          {/* Conversion Output Side */}
          <div className="flex-1 flex flex-col justify-center">
            
            <div className="mb-8">
              <h3 className="text-xl font-extrabold text-slate-800 mb-2 flex items-center gap-2">
                <ScanLine size={24} className="text-rose-500" /> Live Conversions
              </h3>
              <p className="text-sm font-medium text-slate-500">
                Click on the color box or type a HEX code to instantly get CSS-ready color formats.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormatBox id="rgb" label="RGB (Web Standard)" icon={Paintbrush} value={rgbStr} />
              <FormatBox id="hsl" label="HSL (Hue, Saturation)" icon={Palette} value={hslStr} />
              <FormatBox id="cmyk" label="CMYK (Print Format)" icon={Droplet} value={cmykStr} />
              
              {/* Tailwind Class Suggestion */}
              <div className="flex flex-col bg-slate-800 border border-slate-700 rounded-2xl p-4 md:p-5 shadow-sm group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles size={14} /> Tailwind Arbitrary
                  </span>
                  <button 
                    onClick={() => handleCopy(`bg-[${hex}]`, "tw")}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                  >
                    {copiedId === "tw" ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>
                <p className="text-base md:text-lg font-mono font-bold text-white truncate select-all">bg-[{hex}]</p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="hidden lg:block w-80 shrink-0">
           <RelatedSidebar tools={utilityRelatedTools} />
        </div>

      </div>
    </div>
  );
}