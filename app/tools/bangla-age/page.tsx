"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { CalendarDays, Sparkles, User, Clock, CalendarHeart, Gift } from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function BanglaAgeCalculator() {
  const [dob, setDob] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [totalDays, setTotalDays] = useState(0);
  const [nextBirthday, setNextBirthday] = useState({ months: 0, days: 0 });

  // ইংরেজি সংখ্যাকে বাংলায় রূপান্তরের ফাংশন
  const toBanglaNumber = (num: number | string) => {
    const bnNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(c => bnNumbers[parseInt(c)] || c).join('');
  };

  useEffect(() => {
    if (!dob || !targetDate) return;

    const bDate = new Date(dob);
    const tDate = new Date(targetDate);

    if (bDate > tDate) {
      setAge({ years: 0, months: 0, days: 0 });
      setTotalDays(0);
      return;
    }

    // Exact Age Calculation
    let years = tDate.getFullYear() - bDate.getFullYear();
    let months = tDate.getMonth() - bDate.getMonth();
    let days = tDate.getDate() - bDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(tDate.getFullYear(), tDate.getMonth(), 0);
      days += prevMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });

    // Total Days on Earth
    const diffTime = Math.abs(tDate.getTime() - bDate.getTime());
    setTotalDays(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Next Birthday Calculation
    let nextBdayYear = tDate.getFullYear();
    let nextBdayDate = new Date(nextBdayYear, bDate.getMonth(), bDate.getDate());
    
    if (tDate > nextBdayDate) {
      nextBdayDate = new Date(nextBdayYear + 1, bDate.getMonth(), bDate.getDate());
    }
    
    let nextMonths = nextBdayDate.getMonth() - tDate.getMonth();
    let nextDays = nextBdayDate.getDate() - tDate.getDate();

    if (nextDays < 0) {
      nextMonths--;
      const prevMonthForNextBday = new Date(nextBdayDate.getFullYear(), nextBdayDate.getMonth(), 0);
      nextDays += prevMonthForNextBday.getDate();
    }
    if (nextMonths < 0) {
      nextMonths += 12;
    }

    setNextBirthday({ months: nextMonths, days: nextDays });

  }, [dob, targetDate]);

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-emerald-500" />
          Bangladesh Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          বাংলা বয়স <span className="text-emerald-600">Calculator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার সঠিক বয়স, পৃথিবীতে কাটানো মোট দিন এবং পরবর্তী জন্মদিনের ক্ষণগণনা জানুন সম্পূর্ণ বাংলায়।
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60 relative overflow-hidden">
          
          {/* Subtle Background Decoration */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

          {/* Inputs Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-10">
            {/* DOB Input */}
            <div className="flex-1">
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <User size={16} /> জন্ম তারিখ
              </label>
              <input 
                type="date" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-[16px] font-semibold text-[#111827] outline-none transition-all cursor-pointer"
              />
            </div>

            {/* Target Date Input */}
            <div className="flex-1">
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <CalendarDays size={16} /> হিসাবের তারিখ
              </label>
              <input 
                type="date" 
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-[16px] font-semibold text-[#111827] outline-none transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Result Display (Shows only when DOB is selected) */}
          {dob ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Main Age Card */}
              <div className="bg-[#111827] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-slate-900/10 text-center flex flex-col items-center justify-center min-h-[160px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>
                
                <p className="text-emerald-400 text-[14px] font-bold uppercase tracking-widest mb-3">আপনার বর্তমান বয়স</p>
                <div className="flex items-baseline justify-center gap-2 md:gap-4 flex-wrap">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-extrabold tracking-tight">{toBanglaNumber(age.years)}</span>
                    <span className="text-xl font-medium text-slate-400">বছর</span>
                  </div>
                  <span className="text-3xl text-slate-600 hidden md:inline">,</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-extrabold tracking-tight">{toBanglaNumber(age.months)}</span>
                    <span className="text-xl font-medium text-slate-400">মাস</span>
                  </div>
                  <span className="text-3xl text-slate-600 hidden md:inline">,</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-extrabold tracking-tight">{toBanglaNumber(age.days)}</span>
                    <span className="text-xl font-medium text-slate-400">দিন</span>
                  </div>
                </div>
              </div>

              {/* Extra Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Total Days */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[13px] font-bold uppercase tracking-wider mb-0.5">পৃথিবীতে মোট সময়</p>
                    <p className="text-2xl font-extrabold text-[#111827]">
                      {toBanglaNumber(totalDays)} <span className="text-base font-medium text-slate-500">দিন</span>
                    </p>
                  </div>
                </div>

                {/* Next Birthday */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Gift size={24} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[13px] font-bold uppercase tracking-wider mb-0.5">পরবর্তী জন্মদিন</p>
                    <p className="text-xl font-extrabold text-[#111827]">
                      আর {toBanglaNumber(nextBirthday.months)} মাস {toBanglaNumber(nextBirthday.days)} দিন
                    </p>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            // Placeholder State
            <div className="bg-slate-50 border border-slate-100 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center">
              <CalendarHeart size={48} className="text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-400 mb-1">হিসাব দেখতে জন্ম তারিখ সিলেক্ট করুন</h3>
              <p className="text-sm text-slate-400 font-medium max-w-sm">
                আপনার জন্ম তারিখ এবং বর্তমান তারিখ সিলেক্ট করলে এখানে আপনার বয়সের বিস্তারিত তথ্য দেখা যাবে।
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}