import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoriesData } from "@/lib/tools";

export default function CategoryExplorer() {
  return (
    <section className="relative w-full max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-24 z-20 border-t border-slate-200/50">
      
      {/* Section Header */}
      <div className="mb-12 max-w-2xl">
        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#111827] tracking-tight mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Tools for every task
        </h2>
        <p className="text-slate-500 text-[17px] font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
          Everything organized, so you can find what you need in seconds.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {categoriesData.map((category, index) => (
          <Link 
            href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} 
            key={index}
            className="group outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] rounded-[24px]"
            style={{ 
              animationDelay: `${200 + index * 100}ms`,
              animationFillMode: "both"
            }}
          >
            <div className="bg-white/40 backdrop-blur-md border border-slate-200/50 hover:border-[#6366F1]/30 hover:bg-white/70 shadow-[0_4px_20px_rgb(15,23,42,0.02)] hover:shadow-[0_12px_40px_rgb(99,102,241,0.06)] rounded-[24px] p-6 transition-all duration-500 ease-out h-full flex items-start gap-5 animate-in fade-in slide-in-from-bottom-6">
              
              {/* Category Icon */}
              <div className="w-14 h-14 rounded-[16px] bg-slate-100/80 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-[#6366F1] group-hover:text-white transition-colors duration-500 shadow-sm border border-slate-200/50 group-hover:border-transparent">
                <category.icon size={26} strokeWidth={1.75} />
              </div>
              
              {/* Category Content */}
              <div className="flex-1 pt-0.5">
                <h3 className="font-bold text-[#111827] text-[17px] tracking-tight mb-1.5 group-hover:text-[#6366F1] transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-slate-500 text-[14px] leading-relaxed font-medium mb-4 line-clamp-2">
                  {category.description}
                </p>
                
                {/* Tool Count & Animated Arrow */}
                <div className="flex items-center text-[13px] font-bold text-slate-400 group-hover:text-[#6366F1] transition-colors duration-300">
                  {category.count} {category.count > 1 ? 'tools' : 'tool'} 
                  <ArrowRight size={14} className="ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" />
                </div>
              </div>
              
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}