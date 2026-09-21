"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Key, Sparkles, Copy, Download, Trash2, 
  CheckCircle2, RefreshCw, Settings2, Terminal, Link2, Clock 
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Developer Utilities Related Tools
const devUtilitiesTools: SuggestedTool[] = [
  { id: "base64", name: "Base64 Encoder", desc: "Encode/Decode Base64.", icon: Terminal, href: "/tools/base64", color: "text-indigo-500", bg: "bg-indigo-100" },
  { id: "url-encoder", name: "URL Encoder", desc: "Encode or Decode URLs.", icon: Link2, href: "/tools/url-encoder", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "timestamp-converter", name: "Timestamp Converter", desc: "Convert Unix timestamps.", icon: Clock, href: "/tools/timestamp-converter", color: "text-orange-500", bg: "bg-orange-100" }
];

export default function UuidGeneratorTool() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState(false);

  // Fallback UUID v4 generator just in case crypto.randomUUID is not available
  const generateV4 = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Standard Math.random fallback for non-secure contexts
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const newUuids: string[] = [];
    for (let i = 0; i < quantity; i++) {
      let uuid = generateV4();
      if (!hyphens) uuid = uuid.replace(/-/g, "");
      if (uppercase) uuid = uuid.toUpperCase();
      newUuids.push(uuid);
    }
    setUuids(newUuids);
    setIsCopied(false);
  };

  // Generate initially on mount
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopyAll = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join("\n"));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    if (uuids.length === 0) return;
    const blob = new Blob([uuids.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `uuids_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-purple-500" />
          Dev Utility
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          UUID <span className="text-purple-500">Generator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার ডাটাবেস বা অ্যাপ্লিকেশনের জন্য ব্রাউজারের ক্রিপ্টোগ্রাফি ব্যবহার করে ১০০% ইউনিক এবং সিকিউর UUID (v4) তৈরি করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-4 md:p-8 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Settings Panel (Takes 5 columns) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-purple-50/50 p-6 rounded-3xl border border-purple-100 h-full">
                <h3 className="text-[13px] font-bold text-purple-700 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Settings2 size={16} /> Configuration
                </h3>
                
                <div className="space-y-6">
                  {/* Quantity */}
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase block mb-3">How many UUIDs?</label>
                    <select 
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full h-14 bg-white border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 rounded-xl px-4 text-lg font-bold text-[#111827] outline-none transition-all cursor-pointer shadow-sm"
                    >
                      <option value={1}>1 UUID</option>
                      <option value={5}>5 UUIDs</option>
                      <option value={10}>10 UUIDs</option>
                      <option value={20}>20 UUIDs</option>
                      <option value={50}>50 UUIDs</option>
                      <option value={100}>100 UUIDs</option>
                    </select>
                  </div>

                  {/* Format Options */}
                  <div className="space-y-4 pt-2">
                    <label className="text-[12px] font-bold text-slate-500 uppercase block mb-1">Output Format</label>
                    
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${hyphens ? "bg-purple-500 border-purple-500" : "border-slate-300 group-hover:border-purple-400 bg-white"}`}>
                        {hyphens && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} className="hidden" />
                      <span className="font-bold text-slate-700 select-none">Include Hyphens (-)</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${uppercase ? "bg-purple-500 border-purple-500" : "border-slate-300 group-hover:border-purple-400 bg-white"}`}>
                        {uppercase && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="hidden" />
                      <span className="font-bold text-slate-700 select-none">UPPERCASE</span>
                    </label>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 mt-auto">
                    <button 
                      onClick={handleGenerate}
                      className="w-full h-14 flex items-center justify-center gap-2 bg-[#111827] hover:bg-slate-800 text-white rounded-xl text-base font-bold transition-all shadow-xl"
                    >
                      <RefreshCw size={18} className="text-purple-400" /> 
                      Generate UUIDs
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Panel (Takes 7 columns) */}
            <div className="lg:col-span-7 flex flex-col h-full min-h-[400px] rounded-3xl border border-slate-200 overflow-hidden shadow-sm bg-[#0F172A] relative">
              <div className="bg-[#1E293B] border-b border-slate-700 px-5 py-3.5 flex justify-between items-center">
                <span className="text-[13px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                  <Key size={15} /> Generated Keys
                </span>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleCopyAll}
                    disabled={uuids.length === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isCopied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span className="hidden sm:inline">{isCopied ? "Copied All" : "Copy All"}</span>
                  </button>
                  <button 
                    onClick={handleDownload}
                    disabled={uuids.length === 0}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
                    title="Download as TXT file"
                  >
                    <Download size={16} />
                  </button>
                  <div className="w-px h-5 bg-slate-600 mx-1"></div>
                  <button 
                    onClick={() => setUuids([])}
                    disabled={uuids.length === 0}
                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 rounded-lg transition-colors disabled:opacity-50"
                    title="Clear"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 w-full p-5 overflow-y-auto custom-scrollbar">
                {uuids.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {uuids.map((uuid, idx) => (
                      <div key={idx} className="bg-[#1E293B] border border-slate-700/50 p-3 rounded-xl font-mono text-sm text-purple-100 hover:bg-slate-700 hover:text-white transition-colors cursor-text select-all">
                        {uuid}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500">
                    <Key size={32} className="mb-3 opacity-20" />
                    <p>Click generate to create UUIDs</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Sticky Sidebar */}
        <RelatedSidebar tools={devUtilitiesTools} />

      </div>
    </div>
  );
}