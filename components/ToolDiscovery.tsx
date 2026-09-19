"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { toolsData } from "@/lib/tools";

// প্রম্পটের ইনস্ট্রাকশন অনুযায়ী ফিল্টার ক্যাটাগরিগুলো
const filters = [
  "All", 
  "Popular", 
  "New", 
  "Calculators", 
  "Mockups", 
  "Social Media", 
  "Image Tools", 
  "Business", 
  "Developer"
];

export default function ToolDiscovery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  // ফিল্টার করার লজিক
  const filteredTools = toolsData.filter((tool) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Popular") return tool.isPopular;
    if (activeFilter === "New") return tool.isNew;
    return tool.category === activeFilter;
  });

  // যতগুলো টুল দেখাবো
  const displayedTools = filteredTools.slice(0, visibleCount);

  // ফিল্টার চেঞ্জ করার ফাংশন
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setVisibleCount(8); // ফিল্টার চেঞ্জ করলে আবার প্রথম ৮টি দেখাবে
  };

  // Load More ফাংশন (স্মুথ ফিলের জন্য একটু ফেক ডিলের ব্যবস্থা)
  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 8);
      setIsLoading(false);
    }, 400); // 400ms delay for premium feel
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-24 z-20 border-t border-slate-200/50">
      
      {/* Section Header */}
      <div className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#111827] tracking-tight mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Explore all tools
        </h2>
        <p className="text-slate-500 text-[17px] font-medium leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
          Everything you need to speed up your workflow. Filter by category to find the perfect tool for your next task.
        </p>
      </div>

      {/* Filter Chips (Scrollable on mobile) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-5 py-2.5 rounded-full text-[14px] font-bold transition-all duration-300 ease-out border ${
                isActive
                  ? "bg-[#111827] text-white border-[#111827] shadow-[0_4px_14px_0_rgb(17,24,39,0.2)]"
                  : "bg-white/50 text-slate-500 border-slate-200/80 hover:bg-white hover:text-[#111827] hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 min-h-[300px]">
        {displayedTools.length > 0 ? (
          displayedTools.map((tool, index) => (
            <Link 
              href={tool.url} 
              key={tool.id} 
              className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] rounded-[22px] animate-in fade-in zoom-in-95 duration-500"
            >
              <div className="bg-white/50 backdrop-blur-md border border-slate-200/60 shadow-[0_4px_20px_rgb(15,23,42,0.02)] hover:shadow-[0_12px_35px_rgb(99,102,241,0.08)] hover:border-[#6366F1]/20 rounded-[22px] p-6 h-full flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5">
                
                <div className="w-12 h-12 rounded-[14px] bg-slate-100 text-slate-500 flex items-center justify-center mb-5 group-hover:bg-[#6366F1] group-hover:text-white transition-colors duration-500 shadow-sm border border-slate-200/50 group-hover:border-transparent">
                  <tool.icon size={22} strokeWidth={2} />
                </div>
                
                <h3 className="font-semibold text-[#111827] mb-1.5 text-[16px] tracking-tight group-hover:text-[#6366F1] transition-colors duration-300">
                  {tool.name}
                </h3>
                
                {/* Category Label */}
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-3">
                  {tool.category}
                </span>

                <p className="text-slate-500 text-[14px] leading-relaxed font-medium flex-1 mb-4">
                  {tool.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[13px] font-bold text-slate-400 group-hover:text-[#6366F1] transition-colors duration-300">
                    Open Tool
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#6366F1]/10 transition-colors duration-300">
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-[#6366F1] transition-colors duration-300" />
                  </div>
                </div>
                
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <p className="font-medium text-[15px]">No tools found in this category yet.</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredTools.length && (
        <div className="mt-12 flex justify-center">
          <button 
            onClick={handleLoadMore}
            disabled={isLoading}
            className="flex items-center gap-2 bg-white/60 hover:bg-white border border-slate-200 hover:border-slate-300 text-[#111827] px-6 py-3 rounded-xl text-[14px] font-bold transition-all shadow-sm disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin text-slate-400" />
            ) : (
              "Load more tools"
            )}
          </button>
        </div>
      )}

    </section>
  );
}