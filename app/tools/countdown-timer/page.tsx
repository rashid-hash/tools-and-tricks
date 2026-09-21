"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Timer, Sparkles, CalendarClock, 
  Play, RotateCcw, Hourglass, Zap, 
  QrCode, Key, Terminal, Scale
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Utility Category Related Tools
const utilityRelatedTools: SuggestedTool[] = [
  { id: "time-zone", name: "Time Zone", desc: "Convert global times.", icon: Terminal, href: "/tools/time-zone-converter", color: "text-sky-500", bg: "bg-sky-100" },
  { id: "unit-converter", name: "Unit Converter", desc: "Convert length, weight, etc.", icon: Scale, href: "/tools/unit-converter", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "password-generator", name: "Password Generator", desc: "Create secure passwords.", icon: Key, href: "/tools/password-generator", color: "text-red-500", bg: "bg-red-100" }
];

export default function CountdownTimerTool() {
  const [mounted, setMounted] = useState(false);
  const [targetDate, setTargetDate] = useState<string>("");
  const [eventName, setEventName] = useState<string>("My Awesome Event");
  
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [isFinished, setIsFinished] = useState(false);

  // Initialize with a default target (1 hour from now)
  useEffect(() => {
    setMounted(true);
    const nextHour = new Date();
    nextHour.setHours(nextHour.getHours() + 1);
    const tzOffset = nextHour.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(nextHour.getTime() - tzOffset)).toISOString().slice(0, 16);
    setTargetDate(localISOTime);
  }, []);

  // Timer Calculation Logic
  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsFinished(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsFinished(true);
      }
    };

    calculateTimeLeft(); // Initial call
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  // Quick Presets
  const setPreset = (type: "10m" | "1h" | "tomorrow" | "newyear") => {
    const date = new Date();
    
    if (type === "10m") date.setMinutes(date.getMinutes() + 10);
    if (type === "1h") date.setHours(date.getHours() + 1);
    if (type === "tomorrow") date.setDate(date.getDate() + 1);
    if (type === "newyear") {
      date.setFullYear(date.getFullYear() + 1);
      date.setMonth(0);
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      setEventName("New Year 🎉");
    }

    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(date.getTime() - tzOffset)).toISOString().slice(0, 16);
    setTargetDate(localISOTime);
  };

  if (!mounted) return null;

  // Format with leading zero
  const formatNum = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-amber-500" />
          Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Countdown <span className="text-amber-500">Timer</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          যেকোনো ইভেন্ট, পরীক্ষা বা নতুন বছরের জন্য টার্গেট ডেট সেট করুন এবং লাইভ কাউন্টডাউন শুরু করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Top Panel: Timer Display */}
          <div className="bg-[#0F172A] p-8 md:p-12 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Event Name */}
            <div className="relative z-10 text-center mb-10">
              <input 
                type="text" 
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Enter event name..."
                className="bg-transparent text-2xl md:text-3xl font-extrabold text-white outline-none text-center border-b border-transparent hover:border-slate-700 focus:border-amber-500 transition-colors px-4 py-2 placeholder:text-slate-600"
              />
            </div>

            {isFinished ? (
              <div className="relative z-10 flex flex-col items-center animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center mb-6 border border-amber-500/50">
                  <Sparkles size={40} className="text-amber-400" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-amber-400 tracking-tight">Time is up!</h2>
                <p className="text-slate-400 mt-3 font-medium">The countdown has reached its destination.</p>
              </div>
            ) : (
              /* Timer Blocks */
              <div className="relative z-10 flex flex-wrap justify-center gap-4 md:gap-6">
                
                {/* Days */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-24 md:w-32 md:h-36 bg-[#1E293B] border border-slate-700 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 w-full h-1/2 bg-white/5 border-b border-black/20"></div>
                    <span className="text-4xl md:text-6xl font-mono font-black text-white z-10">{formatNum(timeLeft.days)}</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mt-4">Days</span>
                </div>

                <div className="text-3xl md:text-5xl font-bold text-slate-600 self-start mt-4 md:mt-8 hidden sm:block">:</div>

                {/* Hours */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-24 md:w-32 md:h-36 bg-[#1E293B] border border-slate-700 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 w-full h-1/2 bg-white/5 border-b border-black/20"></div>
                    <span className="text-4xl md:text-6xl font-mono font-black text-white z-10">{formatNum(timeLeft.hours)}</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mt-4">Hours</span>
                </div>

                <div className="text-3xl md:text-5xl font-bold text-slate-600 self-start mt-4 md:mt-8 hidden sm:block">:</div>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-24 md:w-32 md:h-36 bg-[#1E293B] border border-slate-700 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 w-full h-1/2 bg-white/5 border-b border-black/20"></div>
                    <span className="text-4xl md:text-6xl font-mono font-black text-white z-10">{formatNum(timeLeft.minutes)}</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mt-4">Minutes</span>
                </div>

                <div className="text-3xl md:text-5xl font-bold text-slate-600 self-start mt-4 md:mt-8 hidden sm:block">:</div>

                {/* Seconds */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-24 md:w-32 md:h-36 bg-[#1E293B] border border-amber-500/30 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 w-full h-1/2 bg-white/5 border-b border-black/20"></div>
                    <span className="text-4xl md:text-6xl font-mono font-black text-amber-400 z-10">{formatNum(timeLeft.seconds)}</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-amber-500/70 uppercase tracking-widest mt-4">Seconds</span>
                </div>

              </div>
            )}
          </div>

          {/* Bottom Panel: Settings & Presets */}
          <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60 flex flex-col md:flex-row gap-8 items-start">
            
            {/* Custom Date Picker */}
            <div className="flex-1 w-full">
              <h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <CalendarClock size={16} className="text-amber-500" /> Set Target Date & Time
              </h3>
              <input 
                type="datetime-local"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 rounded-xl px-4 text-base font-bold text-[#111827] outline-none transition-all cursor-pointer shadow-sm"
              />
            </div>

            {/* Quick Presets */}
            <div className="flex-1 w-full">
              <h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Zap size={16} className="text-amber-500" /> Quick Presets
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setPreset("10m")}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50 rounded-xl text-sm font-bold text-slate-600 transition-all shadow-sm"
                >
                  <Hourglass size={14} className="text-amber-500" /> 10 Minutes
                </button>
                <button 
                  onClick={() => setPreset("1h")}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50 rounded-xl text-sm font-bold text-slate-600 transition-all shadow-sm"
                >
                  <Timer size={14} className="text-amber-500" /> 1 Hour
                </button>
                <button 
                  onClick={() => setPreset("tomorrow")}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50 rounded-xl text-sm font-bold text-slate-600 transition-all shadow-sm"
                >
                  <RotateCcw size={14} className="text-amber-500" /> Tomorrow
                </button>
                <button 
                  onClick={() => setPreset("newyear")}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50 rounded-xl text-sm font-bold text-slate-600 transition-all shadow-sm"
                >
                  <Play size={14} className="text-amber-500" /> Next Year
                </button>
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