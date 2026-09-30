"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import Link from "next/link";
import { 
  ArrowLeft, BarChart3, TrendingUp, Users, 
  MousePointerClick, MessageSquare, Share2, 
  Calendar, Sparkles, Download, ChevronDown, 
  Eye, ThumbsUp
} from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

// Custom Facebook Icon
const FacebookIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [isChartLoaded, setIsChartLoaded] = useState(false);
  const [connectedPagesCount, setConnectedPagesCount] = useState(0);

  // Trigger chart animation and load data on mount
  useEffect(() => {
    // Small delay to allow CSS transitions to trigger
    setTimeout(() => setIsChartLoaded(true), 100);

    // Load connected pages count
    const savedPages = localStorage.getItem('social_studio_connected_pages');
    if (savedPages) {
      try {
        const parsedPages = JSON.parse(savedPages);
        setConnectedPagesCount(parsedPages.length);
      } catch (error) {
        console.error("Failed to load connected pages", error);
      }
    }
  }, []);

  // Mock KPI Data
  const kpis = [
    { title: "Total Reach", value: "145.2K", trend: "+12.5%", isPositive: true, icon: Eye, color: "text-blue-500", bg: "bg-blue-100" },
    { title: "Engagement", value: "24.8K", trend: "+5.2%", isPositive: true, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-100" },
    { title: "Link Clicks", value: "12.4K", trend: "-2.1%", isPositive: false, icon: MousePointerClick, color: "text-amber-500", bg: "bg-amber-100" },
    { title: "Net Followers", value: "1,240", trend: "+18.4%", isPositive: true, icon: Users, color: "text-violet-500", bg: "bg-violet-100" },
  ];

  // Mock Chart Data for CSS-based Bar Chart
  const chartData = [
    { day: "01", value: 40 }, { day: "05", value: 65 }, 
    { day: "10", value: 45 }, { day: "15", value: 90 }, 
    { day: "20", value: 55 }, { day: "25", value: 85 }, 
    { day: "30", value: 70 }
  ];

  // Mock Top Posts
  const topPosts = [
    { id: 1, content: "5 Modern Farming Techniques 🌾", reach: "24.5K", engagement: "4.2K", clicks: "850", isAi: true },
    { id: 2, content: "Weekend Product Sale Announcement 🚀", reach: "18.2K", engagement: "3.1K", clicks: "1.2K", isAi: false },
    { id: 3, content: "How to manage farm expenses properly 💡", reach: "15.8K", engagement: "2.8K", clicks: "420", isAi: true },
  ];

  return (
    <div className={`min-h-screen bg-[#F4F7F9] font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-28`}>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/social-studio" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Analytics & Insights
              </h1>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Measuring performance across your {connectedPagesCount > 0 ? <strong className="text-slate-700">{connectedPagesCount} connected pages</strong> : 'connected pages'}.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="pl-10 pr-10 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-bold rounded-xl outline-none appearance-none cursor-pointer transition-all shadow-sm"
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
              </select>
              <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            
            <button className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* AI Performance Insights Card */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[24px] p-6 md:p-8 shadow-xl shadow-indigo-500/20 mb-8 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-40 h-40 bg-violet-400/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-lg">
              <Sparkles size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                AI Performance Analysis
              </h2>
              <div className="space-y-2 text-indigo-100 text-sm font-medium">
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold mt-0.5">↑</span> 
                  Posts published between <strong className="text-white">7:00 PM - 8:30 PM</strong> are generating 45% more engagement.
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold mt-0.5">↑</span> 
                  Content with the topic <strong className="text-white">"Organic Farming"</strong> has the highest share rate this month.
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold mt-0.5">!</span> 
                  Your image-only posts are slightly underperforming. Try using <strong className="text-white">Carousels or Short Videos</strong> for the next campaign.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <div key={index} className="bg-white rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-slate-200 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                  <kpi.icon size={18} className={kpi.color} />
                </div>
                <div className={`px-2 py-1 rounded-md text-xs font-bold ${kpi.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {kpi.trend}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">{kpi.value}</h3>
                <p className="text-slate-500 text-sm font-semibold mt-1">{kpi.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart Area (Mock CSS Bar Chart) */}
          <div className="lg:col-span-2 bg-white rounded-[24px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Reach Overview</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">Daily reach performance based on {dateRange.toLowerCase()}</p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-2 text-xs font-bold text-slate-500"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Organic</span>
              </div>
            </div>
            
            <div className="h-[250px] flex items-end justify-between gap-2 md:gap-4 mt-10">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-3 w-full group">
                  <div className="w-full relative flex justify-center bg-blue-50 rounded-t-lg h-[200px]">
                    {/* The Bar with Animation */}
                    <div 
                      className="absolute bottom-0 w-full md:w-3/4 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md group-hover:from-blue-500 group-hover:to-blue-300 transition-all duration-1000 ease-out"
                      style={{ height: isChartLoaded ? `${data.value}%` : '0%' }}
                    ></div>
                    {/* Tooltip on Hover */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded shadow-lg transition-opacity whitespace-nowrap z-10 pointer-events-none">
                      {data.value}K Reach
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400">Sep {data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Breakdown */}
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Engagement Breakdown</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><ThumbsUp size={18}/></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Reactions</p>
                    <p className="text-xs font-medium text-slate-500">Likes, Loves, Wow</p>
                  </div>
                </div>
                <span className="font-black text-slate-800">18.2K</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600"><MessageSquare size={18}/></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Comments</p>
                    <p className="text-xs font-medium text-slate-500">Total replies</p>
                  </div>
                </div>
                <span className="font-black text-slate-800">4.1K</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><Share2 size={18}/></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Shares</p>
                    <p className="text-xs font-medium text-slate-500">Content spread</p>
                  </div>
                </div>
                <span className="font-black text-slate-800">2.5K</span>
              </div>
            </div>
          </div>

        </div>

        {/* Top Performing Posts Table */}
        <div className="mt-8 bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          <div className="px-6 md:px-8 py-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Top Performing Posts</h2>
            <Link href="/social-studio/posts" className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 md:px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Post Content</th>
                  <th className="px-6 md:px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Reach</th>
                  <th className="px-6 md:px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Engagement</th>
                  <th className="px-6 md:px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {topPosts.map((post) => (
                  <tr key={post.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 md:px-8 py-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          <FacebookIcon size={16} className="text-[#1877F2]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 line-clamp-1">{post.content}</p>
                          <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
                            {post.isAi ? <><Sparkles size={12} className="text-violet-500"/> AI Generated</> : "Manual Post"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-5 font-bold text-slate-700">{post.reach}</td>
                    <td className="px-6 md:px-8 py-5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-md text-xs font-bold">
                        <TrendingUp size={14} /> {post.engagement}
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-5 font-bold text-slate-700">{post.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}