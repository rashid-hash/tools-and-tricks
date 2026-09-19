import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, MessageCircle, Heart, Share2 } from "lucide-react";

export default function FeaturedTool() {
  return (
    <section className="relative w-full max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-24 z-20">
      
      <Link href="/facebook-post" className="group block outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] rounded-[32px]">
        {/* Main Large Card (Dark Theme to break the grid) */}
        <div className="bg-[#0B1021] border border-slate-800 rounded-[32px] overflow-hidden flex flex-col md:flex-row items-center relative shadow-[0_20px_60px_rgb(11,16,33,0.15)] transition-transform duration-700 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8">
          
          {/* Background Abstract Glow */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[80%] bg-[#6366F1]/20 rounded-full blur-[100px] group-hover:bg-[#6366F1]/30 transition-colors duration-700"></div>
            <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[80%] bg-blue-500/10 rounded-full blur-[100px]"></div>
          </div>

          {/* Left Content (Text) */}
          <div className="w-full md:w-1/2 p-10 md:p-16 relative z-10 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-300 mb-6 w-fit">
              <Sparkles size={14} className="text-indigo-400" />
              Featured Tool
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.15] mb-6">
              Create viral social media mockups in seconds.
            </h2>
            
            <p className="text-slate-400 text-lg leading-relaxed font-medium mb-10 max-w-md">
              Generate ultra-realistic fake Facebook posts and Messenger chats. Perfect for content creators, marketers, and memes.
            </p>
            
            <div className="flex items-center text-white font-semibold group-hover:text-indigo-300 transition-colors duration-300 text-lg">
              Try this tool 
              <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-500 ease-out" />
            </div>
          </div>

          {/* Right Content (Visual CSS Mockup) */}
          <div className="w-full md:w-1/2 p-8 md:p-16 relative z-10 flex items-center justify-center min-h-[400px]">
             
             {/* Decorative Window/Card (Tailwind Only) */}
             <div className="w-full max-w-[340px] bg-white rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 group-hover:-rotate-2 transition-all duration-700 ease-out">
               
               {/* Mockup Header */}
               <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                   {/* Avatar Placeholder */}
                   <div className="w-full h-full bg-gradient-to-tr from-indigo-400 to-blue-400"></div>
                 </div>
                 <div className="flex flex-col">
                   <div className="w-24 h-3.5 bg-slate-200 rounded-full mb-1.5"></div>
                   <div className="w-16 h-2.5 bg-slate-100 rounded-full"></div>
                 </div>
               </div>

               {/* Mockup Body */}
               <div className="p-4 flex flex-col gap-3">
                 <div className="w-full h-3 bg-slate-100 rounded-full"></div>
                 <div className="w-[90%] h-3 bg-slate-100 rounded-full"></div>
                 <div className="w-[60%] h-3 bg-slate-100 rounded-full mb-2"></div>
                 
                 {/* Fake Image block */}
                 <div className="w-full h-32 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
                    <Sparkles size={24} className="text-slate-200" />
                 </div>
               </div>

               {/* Mockup Footer */}
               <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-slate-400">
                  <div className="flex gap-4">
                    <Heart size={18} className="hover:text-red-500 transition-colors" />
                    <MessageCircle size={18} />
                    <Share2 size={18} />
                  </div>
                  <div className="w-8 h-2.5 bg-slate-100 rounded-full"></div>
               </div>
               
             </div>
          </div>

        </div>
      </Link>
    </section>
  );
}