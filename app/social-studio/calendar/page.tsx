"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import Link from "next/link";
import { 
  ArrowLeft, ChevronLeft, ChevronRight, Plus, 
  Calendar as CalendarIcon, Clock, Image as ImageIcon,
  Sparkles, CheckCircle2, MoreHorizontal, Trash2
} from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

// Custom Facebook Icon
const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function ContentCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);

  // Load scheduled posts from LocalStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('social_studio_scheduled_posts');
    if (savedPosts) {
      try {
        setScheduledPosts(JSON.parse(savedPosts));
      } catch (error) {
        console.error("Failed to load posts", error);
      }
    }
  }, []);

  // Delete Post Function
  const handleDeletePost = (postId: string) => {
    const isConfirm = window.confirm("Are you sure you want to delete this scheduled post?");
    if (isConfirm) {
      setScheduledPosts(prev => {
        const updatedPosts = prev.filter(post => post.id !== postId);
        // Update LocalStorage
        localStorage.setItem('social_studio_scheduled_posts', JSON.stringify(updatedPosts));
        return updatedPosts;
      });
    }
  };

  // Calendar Helper Functions
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));

  // Get formatted date string for matching (YYYY-MM-DD)
  const getFormattedDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const selectedDateStr = getFormattedDate(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
  
  // Filter posts for the selected day
  const selectedDayPosts = scheduledPosts.filter(post => post.date === selectedDateStr);

  return (
    <div className={`min-h-screen bg-[#F4F7F9] font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-28`}>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/social-studio" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50 transition-all shadow-sm">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Content Calendar
              </h1>
              <p className="text-slate-500 text-sm font-medium mt-1">
                View and manage your scheduled social media posts.
              </p>
            </div>
          </div>
          
          <Link href="/social-studio/create" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-violet-500/30">
            <Plus size={16} /> New Post
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Calendar Grid */}
          <div className="xl:col-span-8">
            <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8">
              
              {/* Calendar Controls */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-slate-800">
                  {monthNames[currentMonth]} {currentYear}
                </h2>
                <div className="flex items-center gap-2">
                  <button onClick={handlePrevMonth} className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-violet-600 transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={() => setCurrentDate(new Date())} className="px-4 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-violet-600 transition-colors">
                    Today
                  </button>
                  <button onClick={handleNextMonth} className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-violet-600 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-xs font-black text-slate-400 uppercase tracking-wider py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2 md:gap-3">
                {/* Empty Cells for alignment */}
                {Array.from({ length: firstDay }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square rounded-2xl bg-transparent"></div>
                ))}
                
                {/* Days of the Month */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const dateStr = getFormattedDate(currentYear, currentMonth, day);
                  const isToday = dateStr === getFormattedDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                  const isSelected = dateStr === selectedDateStr;
                  
                  // Check if this day has any scheduled posts
                  const dayPosts = scheduledPosts.filter(p => p.date === dateStr);
                  const hasPosts = dayPosts.length > 0;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
                      className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center border-2 transition-all group ${
                        isSelected 
                          ? "border-violet-500 bg-violet-50 shadow-sm" 
                          : isToday 
                            ? "border-slate-300 bg-slate-50 hover:border-violet-300" 
                            : "border-transparent bg-slate-50/50 hover:bg-slate-100"
                      }`}
                    >
                      <span className={`text-sm md:text-base font-bold ${
                        isSelected ? "text-violet-700" : isToday ? "text-slate-900" : "text-slate-600"
                      }`}>
                        {day}
                      </span>
                      
                      {/* Post Indicators (Dots) */}
                      {hasPosts && (
                        <div className="absolute bottom-2 flex gap-1">
                          {dayPosts.slice(0, 3).map((_, i) => (
                            <span key={i} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-violet-500' : 'bg-blue-500'}`}></span>
                          ))}
                          {dayPosts.length > 3 && <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Right Column: Selected Day Details */}
          <div className="xl:col-span-4">
            <div className="bg-[#0F172A] rounded-[32px] p-6 md:p-8 shadow-xl border border-slate-700/50 sticky top-28 min-h-[500px] flex flex-col">
              
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-700/50">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium">
                    {selectedDayPosts.length} post{selectedDayPosts.length !== 1 ? 's' : ''} scheduled
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
                  <CalendarIcon size={20} />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
                {selectedDayPosts.length > 0 ? (
                  selectedDayPosts.map((post, idx) => (
                    <div key={post.id || idx} className="bg-white/10 rounded-2xl p-5 border border-white/5 hover:bg-white/15 transition-colors group">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          post.status === "SCHEDULED" ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300"
                        }`}>
                          {post.status}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                          <Clock size={12} /> {post.time}
                        </div>
                      </div>
                      
                      <p className="text-slate-200 text-sm font-medium leading-relaxed mb-4 line-clamp-3">
                        {post.caption || "No caption provided. Contains media content."}
                      </p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                            <FacebookIcon size={10} className="text-white" />
                          </div>
                          <span className="text-xs font-bold text-slate-300">{post.pageName}</span>
                        </div>
                        
                        {/* Action Buttons: Edit/Delete */}
                        <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleDeletePost(post.id)} className="text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-white/10" title="Delete Post">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12 opacity-60">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                      <Sparkles size={24} className="text-slate-500" />
                    </div>
                    <p className="text-slate-300 font-bold mb-2">Clear Schedule</p>
                    <p className="text-slate-500 text-sm font-medium">There are no posts scheduled for this date. Take a break or create something new!</p>
                  </div>
                )}
              </div>
              
              {selectedDayPosts.length === 0 && (
                <Link href="/social-studio/create" className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-all border border-white/5">
                  <Plus size={16} /> Schedule for this day
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}