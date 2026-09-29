"use client";

import React, { useState } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import Link from "next/link";
import { 
  ArrowLeft, ChevronLeft, ChevronRight, 
  Filter, Plus, Clock, CheckCircle2, 
  FileText, Calendar as CalendarIcon, Zap
} from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

// Custom Facebook Icon
const FacebookIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

// Define a proper type for our posts to keep TypeScript happy
interface ScheduledPost {
  date: number;
  time: string;
  status: string;
  content: string;
  platform: string;
  isAi?: boolean;
}

export default function ContentCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState("September 2026");

  // Mock Calendar Data
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const startingEmptyDays = Array.from({ length: 2 }, (_, i) => i); // Month starts on Tuesday for Sept 2026 mock
  
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Mock Scheduled Posts Data (Changed 'type' to 'status' to fix the TS error)
  const scheduledPosts: ScheduledPost[] = [
    { date: 4, time: "10:00 AM", status: "Published", content: "Welcome to our new product line!", platform: "FB" },
    { date: 8, time: "05:30 PM", status: "Published", content: "Weekly Agrotech tips 🌾", platform: "FB" },
    { date: 15, time: "02:00 PM", status: "Draft", content: "Mid-month review draft", platform: "FB" },
    { date: 22, time: "07:00 PM", status: "Scheduled", content: "Upcoming webinar announcement 🚀", platform: "FB", isAi: true },
    { date: 26, time: "09:00 AM", status: "Scheduled", content: "Customer success story video", platform: "FB" },
    { date: 28, time: "08:15 PM", status: "Scheduled", content: "Top 5 farming techniques for 2026", platform: "FB", isAi: true },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Published": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Scheduled": return "bg-violet-100 text-violet-700 border-violet-200";
      case "Draft": return "bg-slate-100 text-slate-600 border-slate-200";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Published": return <CheckCircle2 size={12} className="mr-1" />;
      case "Scheduled": return <Clock size={12} className="mr-1" />;
      case "Draft": return <FileText size={12} className="mr-1" />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen bg-[#F4F7F9] font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-8`}>
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/social-studio" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50 transition-all shadow-sm">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Content Calendar
              </h1>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Plan, organize, and schedule your social media posts visually.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-all shadow-sm flex items-center gap-2">
              <Filter size={16} /> Filters
            </button>
            <Link href="/social-studio/create" className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-violet-500/30 flex items-center gap-2">
              <Plus size={16} /> New Post
            </Link>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="bg-white rounded-t-[24px] border-b border-slate-100 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg font-extrabold text-slate-800 min-w-[160px] text-center flex items-center justify-center gap-2">
              <CalendarIcon size={18} className="text-violet-500" /> {currentMonth}
            </h2>
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-sm font-bold text-slate-800 transition-all">Month</button>
            <button className="px-4 py-1.5 rounded-lg text-sm font-bold text-slate-500 hover:text-slate-800 transition-all">Week</button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-b-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-t-0 border-slate-100 overflow-hidden overflow-x-auto">
          <div className="min-w-[900px]">
            
            {/* Week Days Header */}
            <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-100">
              {weekDays.map((day, idx) => (
                <div key={idx} className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-7 auto-rows-[minmax(140px,auto)] border-l border-slate-50">
              
              {/* Empty Starter Days */}
              {startingEmptyDays.map((_, idx) => (
                <div key={`empty-${idx}`} className="bg-slate-50/30 border-r border-b border-slate-100 p-2 opacity-50"></div>
              ))}

              {/* Actual Days */}
              {daysInMonth.map((day) => {
                const dayPosts = scheduledPosts.filter(post => post.date === day);
                const isToday = day === 30; // Highlighting 30th as today for mockup

                return (
                  <div key={day} className={`bg-white border-r border-b border-slate-100 p-2.5 transition-colors group relative ${isToday ? 'bg-violet-50/30' : 'hover:bg-slate-50/50'}`}>
                    
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-violet-600 text-white shadow-md shadow-violet-500/30' : 'text-slate-600 group-hover:text-violet-600'}`}>
                        {day}
                      </span>
                      {/* Hover action - Add post on specific date */}
                      <button className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-violet-600 bg-white rounded-md shadow-sm transition-all">
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {dayPosts.map((post, idx) => (
                        <div 
                          key={idx} 
                          className={`p-2 rounded-lg border ${getStatusColor(post.status)} text-left shadow-sm cursor-pointer hover:opacity-80 transition-opacity`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="flex items-center text-[10px] font-extrabold uppercase tracking-wider">
                              {getStatusIcon(post.status)}
                              {post.status}
                            </span>
                            {post.platform === "FB" && <FacebookIcon size={12} className="opacity-70" />}
                          </div>
                          <p className="text-[11px] font-semibold leading-snug line-clamp-2 mb-1.5">
                            {post.content}
                          </p>
                          <div className="flex items-center justify-between text-[10px] font-bold opacity-80">
                            <span>{post.time}</span>
                            {/* Fixed the title prop TS error by wrapping with a span */}
                            {post.isAi && <span title="AI Generated"><Zap size={10} className="text-amber-500" /></span>}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}

            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
            <span className="w-3 h-3 rounded-full bg-violet-400"></span> Scheduled
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
            <span className="w-3 h-3 rounded-full bg-emerald-400"></span> Published
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
            <span className="w-3 h-3 rounded-full bg-slate-400"></span> Draft
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
            <Zap size={14} className="text-amber-500" /> AI Generated
          </div>
        </div>

      </div>
    </div>
  );
}