"use client";

import React, { useState } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import Link from "next/link";
import { 
  ArrowLeft, UploadCloud, Search, Filter, 
  Image as ImageIcon, Video, MoreVertical, 
  Download, Trash2, Play, Grid, List, Sparkles
} from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

export default function MediaLibraryPage() {
  const [activeTab, setActiveTab] = useState("All Media");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock Media Data
  const mediaItems = [
    { id: 1, name: "Autumn_Campaign_Banner.jpg", type: "image", size: "2.4 MB", date: "Oct 24, 2026", url: "bg-gradient-to-tr from-orange-400 to-rose-400", isAi: false },
    { id: 2, name: "Product_Showcase_Q4.mp4", type: "video", size: "14.8 MB", date: "Oct 22, 2026", url: "bg-gradient-to-tr from-blue-500 to-indigo-600", isAi: false },
    { id: 3, name: "AI_Generated_Farm_Concept.png", type: "image", size: "1.2 MB", date: "Oct 18, 2026", url: "bg-gradient-to-tr from-violet-500 to-fuchsia-500", isAi: true },
    { id: 4, name: "Livestock_Care_Infographic.png", type: "image", size: "3.1 MB", date: "Oct 15, 2026", url: "bg-gradient-to-tr from-emerald-400 to-teal-500", isAi: false },
    { id: 5, name: "Team_Behind_Scenes.mp4", type: "video", size: "22.5 MB", date: "Oct 10, 2026", url: "bg-gradient-to-tr from-slate-600 to-slate-800", isAi: false },
    { id: 6, name: "AI_Cow_Portrait_Cyberpunk.jpg", type: "image", size: "4.5 MB", date: "Oct 05, 2026", url: "bg-gradient-to-tr from-pink-500 to-purple-600", isAi: true },
    { id: 7, name: "Daily_Feeding_Routine.jpg", type: "image", size: "1.8 MB", date: "Oct 01, 2026", url: "bg-gradient-to-tr from-amber-300 to-orange-500", isAi: false },
    { id: 8, name: "Discount_Promo_Square.png", type: "image", size: "900 KB", date: "Sep 28, 2026", url: "bg-gradient-to-tr from-red-500 to-rose-600", isAi: false },
  ];

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "All Media") return matchesSearch;
    if (activeTab === "Images") return item.type === "image" && matchesSearch;
    if (activeTab === "Videos") return item.type === "video" && matchesSearch;
    if (activeTab === "AI Generated") return item.isAi && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className={`min-h-screen bg-[#F4F7F9] font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-28`}>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/social-studio" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50 transition-all shadow-sm">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Media Library
              </h1>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Manage, organize, and reuse your photos and videos.
              </p>
            </div>
          </div>
          
          <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-violet-500/30">
            <UploadCloud size={18} /> Upload Media
          </button>
        </div>

        {/* Storage Usage Bar */}
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-1/3">
            <h3 className="text-sm font-bold text-slate-800 mb-1">Storage Usage</h3>
            <p className="text-xs font-semibold text-slate-500 mb-3">1.2 GB of 5 GB used</p>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-violet-500 w-[24%] rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><ImageIcon size={18} /></div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Images</p>
                <p className="text-sm font-black text-slate-800">850 MB</p>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600"><Video size={18} /></div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Videos</p>
                <p className="text-sm font-black text-slate-800">350 MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar: Tabs, Search, View Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-full md:w-auto overflow-x-auto custom-scrollbar">
            {["All Media", "Images", "Videos", "AI Generated"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? "bg-slate-100 text-slate-900" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                {tab === "Images" && <ImageIcon size={14} />}
                {tab === "Videos" && <Video size={14} />}
                {tab === "AI Generated" && <Sparkles size={14} />}
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search files..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 focus:border-violet-500 text-sm font-medium rounded-xl outline-none transition-colors shadow-sm"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 text-slate-500 hover:text-violet-600 rounded-xl shadow-sm transition-colors">
              <Filter size={18} />
            </button>
            <div className="hidden md:flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-slate-100 text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
              >
                <Grid size={16} />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-slate-100 text-slate-800" : "text-slate-400 hover:text-slate-600"}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-2 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 group relative">
              
              {/* Thumbnail (Mocked with Gradients for now) */}
              <div className={`w-full aspect-square rounded-xl ${item.url} relative overflow-hidden flex items-center justify-center`}>
                {item.type === "video" && (
                  <div className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/50">
                    <Play size={18} className="ml-1" fill="currentColor" />
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <button className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-colors backdrop-blur-sm" title="Download">
                    <Download size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/20 hover:bg-rose-500 text-white flex items-center justify-center transition-colors backdrop-blur-sm" title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* AI Badge */}
                {item.isAi && (
                  <div className="absolute top-2 left-2 bg-violet-600/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <Sparkles size={10} /> AI
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="p-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1 break-all" title={item.name}>
                    {item.name}
                  </h4>
                  <button className="text-slate-400 hover:text-slate-700 shrink-0 outline-none">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{item.size}</span>
                  <span className="text-[11px] font-bold text-slate-400">{item.date}</span>
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMedia.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed mt-4">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 text-slate-400">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No media found</h3>
            <p className="text-sm font-medium text-slate-500">Try adjusting your search or filters.</p>
          </div>
        )}

      </div>
    </div>
  );
}