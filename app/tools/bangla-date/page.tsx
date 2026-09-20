"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { CalendarDays, Sparkles, Sun, CloudRain, Wind, Snowflake, Flower2, Leaf } from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function BanglaDateConverter() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [banglaDate, setBanglaDate] = useState<{ day: string; month: string; year: string; season: string; seasonIdx: number } | null>(null);

  // ইংরেজি সংখ্যাকে বাংলায় রূপান্তরের ফাংশন
  const toBanglaNumber = (num: number | string) => {
    const bnNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(c => bnNumbers[parseInt(c)] || c).join('');
  };

  // ঋতুর জন্য আইকন এবং কালার ম্যাপিং
  const seasonConfig = [
    { name: "গ্রীষ্মকাল (Summer)", icon: Sun, color: "text-amber-500", bg: "bg-amber-100", border: "border-amber-200" },
    { name: "বর্ষাকাল (Monsoon)", icon: CloudRain, color: "text-blue-500", bg: "bg-blue-100", border: "border-blue-200" },
    { name: "শরৎকাল (Autumn)", icon: CloudRain, color: "text-slate-400", bg: "bg-slate-100", border: "border-slate-200" }, // For lack of distinct autumn cloud
    { name: "হেমন্তকাল (Late Autumn)", icon: Wind, color: "text-orange-400", bg: "bg-orange-100", border: "border-orange-200" },
    { name: "শীতকাল (Winter)", icon: Snowflake, color: "text-cyan-500", bg: "bg-cyan-100", border: "border-cyan-200" },
    { name: "বসন্তকাল (Spring)", icon: Flower2, color: "text-pink-500", bg: "bg-pink-100", border: "border-pink-200" }
  ];
  // শরৎকালের জন্য ভালো আইকন হিসেবে Leaf ব্যবহার করছি
  seasonConfig[2].icon = Leaf;

  useEffect(() => {
    if (!selectedDate) return;

    const d = new Date(selectedDate);
    const day = d.getDate();
    const month = d.getMonth() + 1; // 1-12
    const year = d.getFullYear();

    let bnDay = 0, bnMonthIdx = 0, bnYear = 0;

    // বাংলা সাল পরিবর্তন হয় ১৪ এপ্রিলে (১ বৈশাখ)
    if (month < 4 || (month === 4 && day < 14)) {
        bnYear = year - 594;
    } else {
        bnYear = year - 593;
    }

    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

    // বাংলাদেশ সরকারের নতুন ক্যালেন্ডার নিয়ম অনুযায়ী ম্যাপিং
    if (month === 1) {
        if (day <= 14) { bnMonthIdx = 8; bnDay = day + 16; } // পৌষ
        else { bnMonthIdx = 9; bnDay = day - 14; } // মাঘ
    } else if (month === 2) {
        if (day <= 13) { bnMonthIdx = 9; bnDay = day + 17; } // মাঘ
        else { bnMonthIdx = 10; bnDay = day - 13; } // ফাল্গুন
    } else if (month === 3) {
        if (day <= 14) { bnMonthIdx = 10; bnDay = day + (isLeapYear ? 16 : 15); } // ফাল্গুন (লিপ ইয়ারে ৩০ দিন)
        else { bnMonthIdx = 11; bnDay = day - 14; } // চৈত্র
    } else if (month === 4) {
        if (day <= 13) { bnMonthIdx = 11; bnDay = day + 17; } // চৈত্র
        else { bnMonthIdx = 0; bnDay = day - 13; } // বৈশাখ
    } else if (month === 5) {
        if (day <= 14) { bnMonthIdx = 0; bnDay = day + 17; } // বৈশাখ
        else { bnMonthIdx = 1; bnDay = day - 14; } // জ্যৈষ্ঠ
    } else if (month === 6) {
        if (day <= 14) { bnMonthIdx = 1; bnDay = day + 17; } // জ্যৈষ্ঠ
        else { bnMonthIdx = 2; bnDay = day - 14; } // আষাঢ়
    } else if (month === 7) {
        if (day <= 15) { bnMonthIdx = 2; bnDay = day + 16; } // আষাঢ়
        else { bnMonthIdx = 3; bnDay = day - 15; } // শ্রাবণ
    } else if (month === 8) {
        if (day <= 15) { bnMonthIdx = 3; bnDay = day + 16; } // শ্রাবণ
        else { bnMonthIdx = 4; bnDay = day - 15; } // ভাদ্র
    } else if (month === 9) {
        if (day <= 15) { bnMonthIdx = 4; bnDay = day + 16; } // ভাদ্র
        else { bnMonthIdx = 5; bnDay = day - 15; } // আশ্বিন
    } else if (month === 10) {
        if (day <= 16) { bnMonthIdx = 5; bnDay = day + 15; } // আশ্বিন
        else { bnMonthIdx = 6; bnDay = day - 16; } // কার্তিক
    } else if (month === 11) {
        if (day <= 15) { bnMonthIdx = 6; bnDay = day + 15; } // কার্তিক
        else { bnMonthIdx = 7; bnDay = day - 15; } // অগ্রহায়ণ
    } else if (month === 12) {
        if (day <= 15) { bnMonthIdx = 7; bnDay = day + 15; } // অগ্রহায়ণ
        else { bnMonthIdx = 8; bnDay = day - 15; } // পৌষ
    }

    const bMonthNames = ["বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"];
    const seasonIdx = Math.floor(bnMonthIdx / 2);

    setBanglaDate({
      day: toBanglaNumber(bnDay),
      month: bMonthNames[bnMonthIdx],
      year: toBanglaNumber(bnYear),
      season: seasonConfig[seasonIdx].name,
      seasonIdx: seasonIdx
    });

  }, [selectedDate]);

  const activeSeason = banglaDate ? seasonConfig[banglaDate.seasonIdx] : seasonConfig[0];
  const SeasonIcon = activeSeason.icon;

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-emerald-500" />
          Bangladesh Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          বাংলা Date <span className="text-emerald-600">Converter</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          যেকোনো ইংরেজি তারিখকে বাংলাদেশ সরকারের নির্ভুল ক্যালেন্ডার অনুযায়ী বাংলা তারিখে রূপান্তর করুন।
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60 relative overflow-hidden">
          
          {/* Decorative Blob based on Season */}
          <div className={`absolute -top-10 -right-10 w-64 h-64 rounded-full blur-[100px] -z-10 pointer-events-none transition-colors duration-1000 ${activeSeason.bg}`}></div>

          {/* Input Section */}
          <div className="mb-10">
            <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
              <CalendarDays size={16} /> ইংরেজি তারিখ নির্বাচন করুন
            </label>
            <div className="relative max-w-sm mx-auto">
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-5 text-lg font-semibold text-[#111827] outline-none transition-all cursor-pointer text-center"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-10 opacity-50">
            <div className="w-16 h-px bg-slate-300"></div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">ফলাফল</div>
            <div className="w-16 h-px bg-slate-300"></div>
          </div>

          {/* Result Display */}
          {banglaDate && (
            <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
              
              {/* Season Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 transition-all duration-500 shadow-sm ${activeSeason.bg} ${activeSeason.border} ${activeSeason.color}`}>
                <SeasonIcon size={18} strokeWidth={2.5} />
                <span className="text-[14px] font-bold tracking-wide">{banglaDate.season}</span>
              </div>

              {/* Main Bangla Date */}
              <div className="bg-[#111827] rounded-3xl p-8 md:p-10 w-full text-white relative overflow-hidden shadow-xl shadow-slate-900/10 text-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-emerald-400"></div>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-2">
                  <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-emerald-400">
                    {banglaDate.day}
                  </span>
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    {banglaDate.month}
                  </span>
                </div>
                
                <div className="mt-4 flex justify-center items-center gap-2 text-slate-400 text-xl font-medium border-t border-slate-700/50 pt-4 max-w-[200px] mx-auto">
                  <span>{banglaDate.year}</span>
                  <span>বঙ্গাব্দ</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}