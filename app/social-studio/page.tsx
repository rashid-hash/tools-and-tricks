"use client";

import React, { useState } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import Link from "next/link";
import { 
  LayoutDashboard, PenSquare, CalendarDays, 
  BarChart3, Image as ImageIcon, Settings, 
  Plus, Zap, Clock, CheckCircle2, 
  Menu, X, Bell, Search, Sparkles, ArrowUpRight
} from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

// Custom Facebook Icon Component
const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function SocialStudioDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock Data for UI Visualization
  const stats = [
    { title: "Connected Pages", value: "2", icon: FacebookIcon, color: "text-blue-600", bg: "bg-blue-100", trend: "Active" },
    { title: "Scheduled Posts", value: "14", icon: Clock, color: "text-amber-600", bg: "bg-amber-100", trend: "+3 this week" },
    { title: "Published (30d)", value: "28", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100", trend: "+12% engagement" },
    { title: "AI Credits", value: "850", icon: Sparkles, color: "text-violet-600", bg: "bg-violet-100", trend: "Refills in 12 days" },
  ];

  const upcomingPosts = [
    { id: 1, content: "5 Tips for Modern Farming 🌾", page: "Digital Agro BD", time: "Today, 07:00 PM", status: "Scheduled", type: "AI Generated" },
    { id: 2, content: "Weekly Product Showcase 🚀", page: "MockupHub Official", time: "Tomorrow, 10:30 AM", status: "Draft", type: "Manual" },
    { id: 3, content: "Customer Success Story 💡", page: "Digital Agro BD", time: "Oct 2, 05:15 PM", status: "Scheduled", type: "AI Generated" },
  ];

  return (
    <div className={`min-h-screen pt-20 md:pt-24 bg-[#F4F7F9] flex font-sans ${notoSansBengali.className} text-slate-800`}>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar - Glassmorphism UI */}
      <aside className={`fixed top-20 md:top-24 lg:top-0 lg:static inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">Social<span className="text-violet-600">Studio</span></span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="ml-auto lg:hidden text-slate-400">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">Main Menu</div>
          
          <Link href="/social-studio" className="flex items-center gap-3 px-3 py-2.5 bg-violet-50 text-violet-700 rounded-xl font-semibold transition-colors">
            <LayoutDashboard size={18} /> Overview
          </Link>
          <Link href="/social-studio/create" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
            <PenSquare size={18} /> Create Post
          </Link>
          <Link href="/social-studio/calendar" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
            <CalendarDays size={18} /> Content Calendar
          </Link>
          
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-8 mb-4 px-3">Management</div>
          
          <Link href="/social-studio/analytics" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
            <BarChart3 size={18} /> Analytics
          </Link>
          <Link href="/social-studio/media" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
            <ImageIcon size={18} /> Media Library
          </Link>
          <Link href="/social-studio/settings" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
            <Settings size={18} /> Settings
          </Link>
        </nav>

        {/* User Profile Mini */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">Pro User</p>
              <p className="text-xs text-slate-500 truncate">Pro Plan Active</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white/60 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-4 md:px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Menu size={20} />
            </button>
            
            <div className="hidden md:flex items-center gap-2 bg-slate-100/80 px-4 py-2.5 rounded-xl border border-slate-200/50 focus-within:border-violet-500/50 focus-within:bg-white transition-all w-80">
              <Search size={16} className="text-slate-400" />
              <input type="text" placeholder="Search posts, pages, or automations..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 font-medium" />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 relative z-50">
  <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
    <Bell size={18} />
    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
  </button>
  
  <Link 
    href="/social-studio/accounts" 
    className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] text-xs md:text-sm font-bold rounded-xl transition-colors border border-[#1877F2]/20"
  >
    <FacebookIcon size={16} /> <span className="hidden sm:inline">Connect Page</span>
  </Link>
</div>
        </header>

        {/* Dashboard Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Welcome back, Creator! 👋
                </h1>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  Here is what's happening with your social media today.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/social-studio/create" className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-violet-500/30">
                  <Plus size={16} /> Create Post
                </Link>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-violet-100 hover:shadow-xl transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <stat.icon size={18} className={stat.color} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
                    <p className="text-slate-500 text-sm font-semibold mt-1">{stat.title}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-50">
                    <span className="text-xs font-bold text-slate-400">{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              
              {/* Left Column: Today's Schedule */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Clock size={18} className="text-violet-500" /> Upcoming Schedule
                    </h2>
                    <Link href="/social-studio/calendar" className="text-sm font-bold text-violet-600 hover:text-violet-700">
                      View Calendar &rarr;
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {upcomingPosts.map((post) => (
                      <div key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors group">
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            <FacebookIcon size={16} className="text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{post.content}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs font-semibold text-slate-500">{post.page}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                                {post.type === "AI Generated" ? <Sparkles size={10} className="text-violet-500" /> : null} 
                                {post.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0">
                          <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-1 ${
                            post.status === "Scheduled" ? "bg-amber-100 text-amber-700" : "bg-slate-200 text-slate-600"
                          }`}>
                            {post.status}
                          </div>
                          <span className="text-xs font-bold text-slate-500">{post.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Quick Actions & Automation */}
              <div className="space-y-6">
                
                {/* Quick Actions */}
                <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8">
                  <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Zap size={18} className="text-amber-500" /> Quick Actions
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-violet-50 hover:bg-violet-100 text-violet-700 transition-colors group">
                      <Sparkles size={20} className="group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-center">AI Post<br/>Generator</span>
                    </button>
                    <Link href="/social-studio/accounts" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors group">
  <FacebookIcon size={20} className="group-hover:scale-110 transition-transform" />
  <span className="text-xs font-bold text-center">Connect<br/>Page</span>
</Link>
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors group">
                      <CalendarDays size={20} className="group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-center">Bulk<br/>Schedule</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors group">
                      <ArrowUpRight size={20} className="group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-center">View<br/>Analytics</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}