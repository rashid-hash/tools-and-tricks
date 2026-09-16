"use client";

import React, { useState, useEffect } from "react";
import { CalendarDays, Clock, Gift, Activity, CalendarHeart } from "lucide-react";
import { Noto_Sans_Bengali } from "next/font/google";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export default function AgeCalculator() {
  const [dob, setDob] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>("");
  
  // Results State
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  const [extraDetails, setExtraDetails] = useState<{ totalMonths: number; totalDays: number; nextBirthdayDays: number } | null>(null);

  // ডিফল্ট হিসেবে আজকের তারিখ সেট করা
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTargetDate(today);
  }, []);

  const calculateAge = () => {
    if (!dob || !targetDate) return;

    const birthDate = new Date(dob);
    const target = new Date(targetDate);

    if (birthDate > target) {
      alert("জন্মতারিখ অবশ্যই টার্গেট তারিখের আগে হতে হবে!");
      return;
    }

    // মূল ক্যালকুলেশন
    let years = target.getFullYear() - birthDate.getFullYear();
    let months = target.getMonth() - birthDate.getMonth();
    let days = target.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });

    // অতিরিক্ত ডেটা ক্যালকুলেশন
    const totalMonths = years * 12 + months;
    const timeDiff = target.getTime() - birthDate.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));

    // পরবর্তী জন্মদিনের ক্যালকুলেশন
    const currentYear = target.getFullYear();
    let nextBday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
    
    if (nextBday < target) {
      nextBday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate());
    }
    const daysToNextBday = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 3600 * 24));

    setExtraDetails({ totalMonths, totalDays, nextBirthdayDays: daysToNextBday });
  };

  return (
    <div className={`min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans ${notoSansBengali.className} text-gray-800 pb-20`}>
      
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-10 mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Smart <span className="text-indigo-600">Age Calculator</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
          চাকরির সার্কুলার বা যেকোনো নির্দিষ্ট তারিখ অনুযায়ী আপনার সঠিক বয়স (বছর, মাস ও দিন) বের করুন এক নিমিষেই।
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* --- Left Panel: Controls --- */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">
            
            {/* DOB Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <CalendarDays size={18} className="text-indigo-500" /> Date of Birth
              </label>
              <input 
                type="date" 
                value={dob} 
                onChange={(e) => setDob(e.target.value)} 
                className="w-full border-2 border-gray-200 p-4 rounded-xl font-bold text-gray-800 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Target Date Input */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Clock size={18} className="text-indigo-500" /> Calculate At
                </label>
                <button 
                  onClick={() => setTargetDate(new Date().toISOString().split("T")[0])}
                  className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-100 transition-colors"
                >
                  Set Today
                </button>
              </div>
              <input 
                type="date" 
                value={targetDate} 
                onChange={(e) => setTargetDate(e.target.value)} 
                className="w-full border-2 border-gray-200 p-4 rounded-xl font-bold text-gray-800 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <button 
              onClick={calculateAge} 
              disabled={!dob || !targetDate}
              className="w-full mt-2 bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              Calculate Age
            </button>
          </div>
        </div>

        {/* --- Right Panel: Results --- */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex-1 flex flex-col justify-center min-h-[350px]">
            
            {!age ? (
              <div className="flex flex-col items-center justify-center text-gray-400 opacity-60">
                <CalendarHeart size={64} className="mb-4 text-gray-300" />
                <p className="text-lg font-medium">Select dates to view results</p>
              </div>
            ) : (
              <div className="flex flex-col gap-8 animate-in fade-in zoom-in duration-300">
                
                {/* Main Result */}
                <div className="text-center">
                  <p className="text-gray-500 font-semibold mb-2 tracking-wide uppercase text-sm">Exact Age</p>
                  <div className="flex justify-center items-end gap-2 md:gap-4">
                    <div className="flex flex-col items-center">
                      <span className="text-5xl md:text-7xl font-black text-indigo-600 tabular-nums leading-none">{age.years}</span>
                      <span className="text-sm md:text-base font-semibold text-gray-500 mt-2">Years</span>
                    </div>
                    <span className="text-3xl text-gray-300 font-light mb-6">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-5xl md:text-7xl font-black text-indigo-600 tabular-nums leading-none">{age.months}</span>
                      <span className="text-sm md:text-base font-semibold text-gray-500 mt-2">Months</span>
                    </div>
                    <span className="text-3xl text-gray-300 font-light mb-6">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-5xl md:text-7xl font-black text-indigo-600 tabular-nums leading-none">{age.days}</span>
                      <span className="text-sm md:text-base font-semibold text-gray-500 mt-2">Days</span>
                    </div>
                  </div>
                </div>

                <hr className="border-dashed border-gray-200" />

                {/* Extra Stats */}
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                     <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                       <Activity size={20} />
                     </div>
                     <div>
                       <p className="text-xs text-gray-500 font-semibold uppercase">Total Days</p>
                       <p className="text-xl font-bold text-gray-900 tabular-nums">{extraDetails?.totalDays.toLocaleString()}</p>
                     </div>
                   </div>

                   <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                     <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center">
                       <Gift size={20} />
                     </div>
                     <div>
                       <p className="text-xs text-gray-500 font-semibold uppercase">Next Birthday</p>
                       <p className="text-xl font-bold text-gray-900 tabular-nums">{extraDetails?.nextBirthdayDays} <span className="text-sm font-medium text-gray-500">days</span></p>
                     </div>
                   </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}