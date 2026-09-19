"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Sparkles, Command, ArrowRight } from "lucide-react";
import { toolsData } from "@/lib/tools";
import Link from "next/link";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        searchInputRef.current?.blur();
        setIsFocused(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter logic based on user input
  const filteredTools = toolsData.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5); // Limit to top 5 results

  return (
    <section className="relative pt-44 pb-24 md:pt-52 md:pb-32 px-4 flex flex-col items-center justify-center text-center w-full">
      
      {/* Background Soft Blobs (SaaS Vibe) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#6366F1]/5 rounded-[100%] blur-[120px] -z-10 pointer-events-none"></div>

      {/* Small Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-slate-200/50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] backdrop-blur-sm text-sm font-semibold text-slate-600 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Sparkles size={16} className="text-[#6366F1]" />
        <span>100+ Free & Smart Tools</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-[40px] leading-[1.1] md:text-6xl lg:text-7xl font-extrabold text-[#111827] tracking-tight mb-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
        Everything you need. <br className="hidden sm:block" />
        One simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111827] to-[#6366F1]">toolbox.</span>
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
        Powerful everyday tools for work, creativity and life — simple, fast and free.
      </p>

      {/* Smart Search Architecture */}
      <div className="w-full max-w-[640px] relative z-40 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
        
        {/* Search Input Box */}
        <div 
          className={`relative flex items-center bg-white/80 backdrop-blur-xl rounded-2xl transition-all duration-300 ease-out border ${
            isFocused 
              ? "shadow-[0_12px_40px_rgb(99,102,241,0.12)] border-[#6366F1]/40 ring-4 ring-[#6366F1]/10" 
              : "shadow-[0_8px_30px_rgb(15,23,42,0.04)] border-slate-200/80 hover:border-slate-300"
          }`}
        >
          <Search size={24} className={`absolute left-5 transition-colors ${isFocused ? "text-[#6366F1]" : "text-slate-400"}`} strokeWidth={2} />
          
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay for click events on dropdown
            placeholder="Search a tool… Try 'EMI Calculator'"
            className="w-full h-[72px] bg-transparent pl-14 pr-24 text-[17px] text-[#111827] font-medium outline-none placeholder:text-slate-400 placeholder:font-normal rounded-2xl"
          />
          
          {/* Keyboard Shortcut Indicator */}
          <div className="absolute right-5 hidden sm:flex items-center gap-1 text-slate-400">
            <kbd className="bg-slate-100 border border-slate-200 rounded-[6px] px-2.5 py-1 text-xs font-sans font-semibold shadow-sm flex items-center gap-1">
              <Command size={14} /> K
            </kbd>
          </div>
        </div>

        {/* Command Palette Suggestions Dropdown */}
        {isFocused && searchQuery.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-3 bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-2xl shadow-[0_20px_60px_rgb(15,23,42,0.1)] overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-200">
            
            <div className="px-5 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50 border-b border-slate-100">
              Suggestions
            </div>
            
            {filteredTools.length > 0 ? (
              <ul className="py-2">
                {filteredTools.map((tool) => (
                  <li key={tool.id}>
                    <Link href={tool.url} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#6366F1]/10 group-hover:text-[#6366F1] transition-all duration-300">
                          <tool.icon size={20} strokeWidth={2} />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-[#111827] font-semibold text-[15px]">{tool.name}</h4>
                          <p className="text-slate-500 text-xs font-medium">{tool.category}</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-slate-300 group-hover:text-[#6366F1] group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-5 py-12 text-center flex flex-col items-center justify-center">
                <Search size={32} className="text-slate-200 mb-3" />
                <p className="text-slate-600 font-medium">No tools found for "{searchQuery}"</p>
                <p className="text-slate-400 text-sm mt-1">Try searching for something else.</p>
              </div>
            )}
          </div>
        )}
      </div>

    </section>
  );
}