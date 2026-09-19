import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { toolsData } from "@/lib/tools";

export default function QuickAccess() {
  // Filter only the popular tools and take the top 8
  const popularTools = toolsData.filter(tool => tool.isPopular).slice(0, 8);

  return (
    <section className="relative w-full max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-24 z-20">
      
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-[12px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          Popular right now
        </h2>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {popularTools.map((tool, index) => (
          <Link 
            href={tool.url} 
            key={tool.id} 
            className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] rounded-[22px]"
            style={{ 
              animationDelay: `${600 + index * 100}ms`,
              animationFillMode: "both"
            }}
          >
            <div className="bg-white/60 backdrop-blur-xl border border-slate-200/60 shadow-[0_4px_20px_rgb(15,23,42,0.03)] hover:shadow-[0_12px_35px_rgb(99,102,241,0.08)] hover:border-[#6366F1]/20 rounded-[22px] p-6 h-full flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 relative overflow-hidden animate-in fade-in slide-in-from-bottom-6">
              
              {/* Ultra-subtle Hover Gradient Background Blob */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#6366F1]/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Icon Container */}
              <div className="w-12 h-12 rounded-[14px] bg-slate-100 text-slate-500 flex items-center justify-center mb-6 group-hover:bg-[#6366F1]/10 group-hover:text-[#6366F1] transition-colors duration-300 shadow-sm border border-slate-200/50">
                <tool.icon size={22} strokeWidth={2} />
              </div>
              
              {/* Tool Content */}
              <h3 className="font-semibold text-[#111827] mb-2 text-[16px] tracking-tight group-hover:text-[#6366F1] transition-colors duration-300">
                {tool.name}
              </h3>
              
              <p className="text-slate-500 text-[14px] leading-relaxed font-medium flex-1">
                {tool.description}
              </p>
              
              {/* Call to Action with Micro-interaction Arrow */}
              <div className="mt-6 flex items-center text-[13px] font-bold text-slate-400 group-hover:text-[#6366F1] transition-colors duration-300">
                Try this tool 
                <ArrowRight size={14} className="ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" />
              </div>
              
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}