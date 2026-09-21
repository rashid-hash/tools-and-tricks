"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Clock, Sparkles, Copy, CheckCircle2, 
  Terminal, Link2, Key, CalendarClock, Activity, ArrowRight, History
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Developer Utilities Related Tools
const devUtilitiesTools: SuggestedTool[] = [
  { id: "base64", name: "Base64 Encoder", desc: "Encode/Decode Base64.", icon: Terminal, href: "/tools/base64", color: "text-indigo-500", bg: "bg-indigo-100" },
  { id: "url-encoder", name: "URL Encoder", desc: "Encode or Decode URLs.", icon: Link2, href: "/tools/url-encoder", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "uuid-generator", name: "UUID Generator", desc: "Generate secure UUIDs.", icon: Key, href: "/tools/uuid-generator", color: "text-purple-500", bg: "bg-purple-100" }
];

export default function TimestampConverterTool() {
  const [mounted, setMounted] = useState(false);
  
  // Live Clock State
  const [currentEpoch, setCurrentEpoch] = useState<number>(0);
  
  // Convert: Timestamp -> Date
  const [inputEpoch, setInputEpoch] = useState<string>("");
  const [epochResult, setEpochResult] = useState<{ local: string; utc: string; relative: string } | null>(null);
  
  // Convert: Date -> Timestamp
  const [inputDate, setInputDate] = useState<string>("");
  const [dateResult, setDateResult] = useState<{ sec: number; ms: number } | null>(null);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Initialize and run live clock
  useEffect(() => {
    setMounted(true);
    const updateTime = () => setCurrentEpoch(Math.floor(Date.now() / 1000));
    updateTime();
    
    // Set initial input values based on current time to avoid hydration mismatch
    const now = new Date();
    setInputEpoch(Math.floor(now.getTime() / 1000).toString());
    
    // Format for datetime-local input (YYYY-MM-DDThh:mm)
    const tzOffset = now.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(now.getTime() - tzOffset)).toISOString().slice(0,16);
    setInputDate(localISOTime);

    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Timestamp to Date Logic
  useEffect(() => {
    if (!inputEpoch || isNaN(Number(inputEpoch))) {
      setEpochResult(null);
      return;
    }

    const num = Number(inputEpoch);
    // Auto-detect seconds vs milliseconds (if length > 11, likely milliseconds)
    const date = new Date(inputEpoch.length > 11 ? num : num * 1000);
    
    if (date.toString() === "Invalid Date") {
      setEpochResult(null);
      return;
    }

    setEpochResult({
      local: date.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'medium' }),
      utc: date.toUTCString(),
      relative: getRelativeTime(date.getTime())
    });
  }, [inputEpoch]);

  // Handle Date to Timestamp Logic
  useEffect(() => {
    if (!inputDate) {
      setDateResult(null);
      return;
    }
    const date = new Date(inputDate);
    if (date.toString() === "Invalid Date") {
      setDateResult(null);
      return;
    }

    const ms = date.getTime();
    setDateResult({
      ms: ms,
      sec: Math.floor(ms / 1000)
    });
  }, [inputDate]);

  const getRelativeTime = (timestampMs: number) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const daysDifference = Math.round((timestampMs - Date.now()) / (1000 * 60 * 60 * 24));
    
    if (daysDifference === 0) return "Today";
    return rtf.format(daysDifference, 'day');
  };

  const handleCopy = (text: string | number, id: string) => {
    navigator.clipboard.writeText(text.toString());
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!mounted) return null; // Prevent hydration errors for dates

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-bold text-orange-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-orange-500" />
          Dev Utility
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Unix Timestamp <span className="text-orange-500">Converter</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          Unix/Epoch টাইমস্ট্যাম্প থেকে মানুষের পড়ার উপযোগী ডেট বের করুন অথবা যেকোনো ডেটকে টাইমস্ট্যাম্পে কনভার্ট করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Live Clock Bar */}
          <div className="w-full bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-[0_10px_40px_rgb(15,23,42,0.04)] border border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center relative">
                <Activity size={20} className="animate-pulse" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-ping"></span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Current Epoch Time</p>
                <p className="text-sm font-medium text-slate-500">Auto-updating live timestamp</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-200">
              <span className="text-2xl font-mono font-bold text-[#111827] tracking-wider">{currentEpoch}</span>
              <div className="w-px h-6 bg-slate-300 mx-2"></div>
              <button 
                onClick={() => handleCopy(currentEpoch, 'live')}
                className="text-slate-400 hover:text-orange-500 transition-colors"
                title="Copy Live Time"
              >
                {copiedId === 'live' ? <CheckCircle2 size={20} className="text-emerald-500" /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Timestamp to Date Card */}
            <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                <History size={18} className="text-orange-500" /> Timestamp to Date
              </h3>
              
              <div className="mb-6">
                <label className="text-[12px] font-bold text-slate-500 uppercase block mb-2">Enter Timestamp (Sec or Ms)</label>
                <input 
                  type="number"
                  value={inputEpoch}
                  onChange={(e) => setInputEpoch(e.target.value)}
                  placeholder="e.g. 1718901234"
                  className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl px-4 text-lg font-mono font-bold text-[#111827] outline-none transition-all"
                />
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 h-[220px]">
                {epochResult ? (
                  <div className="flex flex-col h-full justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Local Time</p>
                      <p className="text-sm font-bold text-slate-700">{epochResult.local}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">GMT / UTC</p>
                      <p className="text-sm font-bold text-slate-700">{epochResult.utc}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-200">
                      <span className="inline-flex px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-bold">
                        {epochResult.relative}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <CalendarClock size={32} className="mb-2 opacity-30" />
                    <p className="text-sm font-medium">Invalid Timestamp</p>
                  </div>
                )}
              </div>
            </div>

            {/* Date to Timestamp Card */}
            <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                <CalendarClock size={18} className="text-orange-500" /> Date to Timestamp
              </h3>
              
              <div className="mb-6">
                <label className="text-[12px] font-bold text-slate-500 uppercase block mb-2">Select Date & Time</label>
                <input 
                  type="datetime-local"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-xl px-4 text-base font-bold text-[#111827] outline-none transition-all cursor-pointer"
                />
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 h-[220px]">
                {dateResult ? (
                  <div className="flex flex-col h-full justify-center gap-6">
                    
                    <div className="flex items-center justify-between group">
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Seconds (Standard)</p>
                        <p className="text-xl font-mono font-bold text-[#111827]">{dateResult.sec}</p>
                      </div>
                      <button 
                        onClick={() => handleCopy(dateResult.sec, 'sec')}
                        className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-200 shadow-sm transition-all"
                      >
                        {copiedId === 'sec' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                      </button>
                    </div>

                    <div className="w-full h-px bg-slate-200"></div>

                    <div className="flex items-center justify-between group">
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Milliseconds (JS Date)</p>
                        <p className="text-lg font-mono font-bold text-slate-600">{dateResult.ms}</p>
                      </div>
                      <button 
                        onClick={() => handleCopy(dateResult.ms, 'ms')}
                        className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-200 shadow-sm transition-all"
                      >
                        {copiedId === 'ms' ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <Activity size={32} className="mb-2 opacity-30" />
                    <p className="text-sm font-medium">Please select a valid date</p>
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