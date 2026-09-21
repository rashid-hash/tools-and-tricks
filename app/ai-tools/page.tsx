"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Search, Bot, Sparkles, PenTool, FileText, Smartphone, Hash, 
  Clapperboard, Video, Image as ImageIcon, Palette, ShoppingBag, 
  Megaphone, Briefcase, Tag, Mail, MessageSquare, FileEdit, 
  GraduationCap, Brain, Calendar, ZoomIn, Flame, Lightbulb, 
  Languages, Laptop, Bug, LayoutGrid, ChevronRight
} from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Category List
const CATEGORIES = [
  "All Tools", "Social Media", "Content & SEO", "Bangla 🇧🇩", 
  "Business", "Prompts", "Career & Study", "Developer"
];

// All 30 AI Tools Data
const AI_TOOLS = [
  // Prompts & Design
  { id: "prompt-gen", name: "AI Prompt Generator", desc: "Generate perfect prompts for ChatGPT or Midjourney.", icon: Bot, category: "Prompts", color: "text-violet-500", bg: "bg-violet-100", border: "hover:border-violet-400" },
  { id: "prompt-enhancer", name: "AI Prompt Enhancer", desc: "Upgrade your basic prompts to pro-level instantly.", icon: Sparkles, category: "Prompts", color: "text-fuchsia-500", bg: "bg-fuchsia-100", border: "hover:border-fuchsia-400" },
  { id: "image-prompt", name: "AI Image Prompt", desc: "Create detailed prompts for AI image generators.", icon: ImageIcon, category: "Prompts", color: "text-blue-500", bg: "bg-blue-100", border: "hover:border-blue-400" },
  { id: "image-editing", name: "AI Image Editing Prompt", desc: "Generate prompts for photo manipulation and editing.", icon: Palette, category: "Prompts", color: "text-pink-500", bg: "bg-pink-100", border: "hover:border-pink-400" },

  // Content & SEO
  { id: "rewriter", name: "AI Rewriter", desc: "Rewrite articles to make them unique and plagiarism-free.", icon: PenTool, category: "Content & SEO", color: "text-emerald-500", bg: "bg-emerald-100", border: "hover:border-emerald-400" },
  { id: "summarizer", name: "AI Summarizer", desc: "Condense long articles or documents into short summaries.", icon: FileText, category: "Content & SEO", color: "text-teal-500", bg: "bg-teal-100", border: "hover:border-teal-400" },
  { id: "seo-title", name: "AI SEO Title", desc: "Generate click-worthy and SEO-optimized blog titles.", icon: ZoomIn, category: "Content & SEO", color: "text-cyan-500", bg: "bg-cyan-100", border: "hover:border-cyan-400" },
  { id: "meta-desc", name: "AI Meta Description", desc: "Write perfect meta descriptions to boost your CTR.", icon: LayoutGrid, category: "Content & SEO", color: "text-sky-500", bg: "bg-sky-100", border: "hover:border-sky-400" },
  { id: "content-ideas", name: "AI Content Ideas", desc: "Never run out of ideas. Get fresh topics for your blog.", icon: Lightbulb, category: "Content & SEO", color: "text-amber-500", bg: "bg-amber-100", border: "hover:border-amber-400" },

  // Social Media
  { id: "caption-gen", name: "AI Caption Generator", desc: "Catchy captions for Instagram, Facebook, and TikTok.", icon: Smartphone, category: "Social Media", color: "text-rose-500", bg: "bg-rose-100", border: "hover:border-rose-400" },
  { id: "hashtag-gen", name: "AI Hashtag Generator", desc: "Find trending hashtags to maximize your post reach.", icon: Hash, category: "Social Media", color: "text-indigo-500", bg: "bg-indigo-100", border: "hover:border-indigo-400" },
  { id: "reel-script", name: "AI Reel Script", desc: "Engaging 30-60s scripts for Reels and TikTok videos.", icon: Clapperboard, category: "Social Media", color: "text-red-500", bg: "bg-red-100", border: "hover:border-red-400" },
  { id: "yt-script", name: "AI YouTube Script", desc: "Full-length YouTube video scripts with intro and hooks.", icon: Video, category: "Social Media", color: "text-red-600", bg: "bg-red-100", border: "hover:border-red-400" },
  { id: "viral-hook", name: "AI Viral Hook", desc: "Scroll-stopping hooks to capture audience attention.", icon: Flame, category: "Social Media", color: "text-orange-500", bg: "bg-orange-100", border: "hover:border-orange-400" },

  // Bangla Special
  { id: "bn-writer", name: "বাংলা AI Writer", desc: "সম্পূর্ণ বাংলায় যেকোনো বিষয়ের ওপর দারুণ আর্টিকেল লিখুন।", icon: Languages, category: "Bangla 🇧🇩", color: "text-emerald-600", bg: "bg-emerald-100", border: "hover:border-emerald-500" },
  { id: "bn-caption", name: "বাংলা Caption", desc: "ফেসবুক বা ইন্সটাগ্রামের জন্য আকর্ষণীয় বাংলা ক্যাপশন তৈরি করুন।", icon: Smartphone, category: "Bangla 🇧🇩", color: "text-blue-600", bg: "bg-blue-100", border: "hover:border-blue-500" },
  { id: "bn-application", name: "বাংলা Application", desc: "স্কুল, কলেজ বা অফিসের জন্য প্রফেশনাল বাংলা দরখাস্ত লিখুন।", icon: FileEdit, category: "Bangla 🇧🇩", color: "text-purple-600", bg: "bg-purple-100", border: "hover:border-purple-500" },

  // Business
  { id: "product-desc", name: "AI Product Description", desc: "High-converting descriptions for eCommerce products.", icon: ShoppingBag, category: "Business", color: "text-orange-500", bg: "bg-orange-100", border: "hover:border-orange-400" },
  { id: "ad-copy", name: "AI Ad Copy", desc: "Persuasive ad copies for Facebook and Google Ads.", icon: Megaphone, category: "Business", color: "text-blue-500", bg: "bg-blue-100", border: "hover:border-blue-400" },
  { id: "business-name", name: "AI Business Name", desc: "Creative and catchy name ideas for your new startup.", icon: Briefcase, category: "Business", color: "text-indigo-500", bg: "bg-indigo-100", border: "hover:border-indigo-400" },
  { id: "slogan-gen", name: "AI Slogan Generator", desc: "Memorable slogans and taglines for your brand.", icon: Tag, category: "Business", color: "text-pink-500", bg: "bg-pink-100", border: "hover:border-pink-400" },
  { id: "email-writer", name: "AI Email Writer", desc: "Professional emails for sales, outreach, or follow-ups.", icon: Mail, category: "Business", color: "text-teal-500", bg: "bg-teal-100", border: "hover:border-teal-400" },
  { id: "reply-gen", name: "AI Reply Generator", desc: "Smart replies for customer reviews or angry emails.", icon: MessageSquare, category: "Business", color: "text-sky-500", bg: "bg-sky-100", border: "hover:border-sky-400" },

  // Career & Study
  { id: "resume-builder", name: "AI Resume Builder", desc: "Create ATS-friendly resume content that gets you hired.", icon: FileText, category: "Career & Study", color: "text-slate-600", bg: "bg-slate-200", border: "hover:border-slate-400" },
  { id: "cover-letter", name: "AI Cover Letter", desc: "Personalized cover letters tailored to the job description.", icon: FileEdit, category: "Career & Study", color: "text-blue-500", bg: "bg-blue-100", border: "hover:border-blue-400" },
  { id: "study-plan", name: "AI Study Plan", desc: "Generate a structured study timetable for exams.", icon: GraduationCap, category: "Career & Study", color: "text-violet-500", bg: "bg-violet-100", border: "hover:border-violet-400" },
  { id: "brainstorm", name: "AI Brainstorm", desc: "Overcome creative blocks with AI brainstorming.", icon: Brain, category: "Career & Study", color: "text-fuchsia-500", bg: "bg-fuchsia-100", border: "hover:border-fuchsia-400" },
  { id: "content-calendar", name: "AI Content Calendar", desc: "Plan 30 days of content for your social media channels.", icon: Calendar, category: "Career & Study", color: "text-emerald-500", bg: "bg-emerald-100", border: "hover:border-emerald-400" },

  // Developer
  { id: "code-explainer", name: "AI Code Explainer", desc: "Understand complex code snippets in plain English.", icon: Laptop, category: "Developer", color: "text-cyan-500", bg: "bg-cyan-100", border: "hover:border-cyan-400" },
  { id: "debugging", name: "AI Debugging Assistant", desc: "Find bugs and get solutions for your broken code.", icon: Bug, category: "Developer", color: "text-rose-500", bg: "bg-rose-100", border: "hover:border-rose-400" },
];

export default function AiToolsDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Tools");

  // Filter tools based on search and category
  const filteredTools = AI_TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All Tools" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen bg-[#F8FAFC] font-sans ${notoSansBengali.className} pb-24 pt-24 md:pt-32 relative overflow-hidden`}>
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-sm font-bold text-indigo-600 uppercase tracking-widest mb-6 shadow-sm">
            <Sparkles size={16} className="text-indigo-500 animate-pulse" />
            Powered by Next-Gen AI
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#111827] tracking-tight mb-6 leading-tight">
            Supercharge Your Workflow with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">AI Magic</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium">
            কনটেন্ট রাইটিং, মার্কেটিং, কোডিং কিংবা পড়াশোনা— ৩০টিরও বেশি ডেডিকেটেড AI টুলের সাহায্যে আপনার কাজকে করুন ১০ গুণ দ্রুত ও নিখুঁত!
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="max-w-4xl mx-auto mb-16">
          {/* Search Bar */}
          <div className="relative mb-8 group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search for an AI tool (e.g., 'Reel Script', 'বাংলা Caption')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 md:h-20 bg-white border-2 border-slate-200 focus:border-indigo-500 rounded-[2rem] pl-16 pr-6 text-lg font-semibold text-slate-800 outline-none transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:shadow-[0_8px_30px_rgba(99,102,241,0.1)] placeholder:text-slate-400"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#111827] text-white shadow-md transform scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 shadow-sm hover:shadow"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool, index) => (
              <Link 
                href={`/ai-tools/${tool.id}`} 
                key={tool.id}
                className={`group bg-white rounded-3xl p-6 border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${tool.border}`}
                style={{ animationFillMode: 'both', animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl ${tool.bg} ${tool.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                      <tool.icon size={28} strokeWidth={2.5} />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-indigo-50 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                      <ChevronRight size={18} className="text-indigo-500" />
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                      {tool.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-[#111827] mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {tool.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 line-clamp-2 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Search size={40} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No tools found</h3>
            <p className="text-slate-500">We couldn't find any AI tool matching "{searchQuery}". Try a different keyword.</p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("All Tools");}}
              className="mt-6 px-6 py-2 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-100 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </div>
  );
}