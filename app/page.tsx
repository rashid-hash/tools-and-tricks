import React from "react";
import Link from "next/link";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  ArrowRight, Sparkles, ShieldCheck, Zap, 
  Layers, Bot, Image as ImageIcon, FileText, 
  Code2, Wrench, Type, QrCode, Key, Languages, Paintbrush
} from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function HomePage() {
  // Category Data
  const categories = [
    { name: "AI Tools", desc: "Smart AI generators & writers", icon: Bot, href: "/ai-tools", color: "text-indigo-500", bg: "bg-indigo-100", border: "hover:border-indigo-400" },
    { name: "Image Editing", desc: "Compress, resize & convert", icon: ImageIcon, href: "/tools/compressor", color: "text-blue-500", bg: "bg-blue-100", border: "hover:border-blue-400" },
    { name: "PDF Tools", desc: "Merge, split & edit PDFs", icon: FileText, href: "/tools/merge-pdf", color: "text-red-500", bg: "bg-red-100", border: "hover:border-red-400" },
    { name: "Text Tools", desc: "Format & clean your text", icon: Type, href: "/tools/word-counter", color: "text-violet-500", bg: "bg-violet-100", border: "hover:border-violet-400" },
    { name: "Developer Tools", desc: "JSON, Encoders & UUIDs", icon: Code2, href: "/tools/json-formatter", color: "text-cyan-500", bg: "bg-cyan-100", border: "hover:border-cyan-400" },
    { name: "Utility Tools", desc: "QR, Passwords & Converters", icon: Wrench, href: "/tools/qr-generator", color: "text-emerald-500", bg: "bg-emerald-100", border: "hover:border-emerald-400" },
  ];

  // Popular Tools Data
  const popularTools = [
    { name: "বাংলা AI Writer", desc: "Generate high-quality Bengali content instantly.", icon: Languages, href: "/ai-tools/bn-writer", color: "text-emerald-500", bg: "bg-emerald-100" },
    { name: "QR Generator", desc: "Create custom colored QR codes with logos.", icon: QrCode, href: "/tools/qr-generator", color: "text-teal-500", bg: "bg-teal-100" },
    { name: "Password Gen", desc: "Client-side secure strong password creator.", icon: Key, href: "/tools/password-generator", color: "text-red-500", bg: "bg-red-100" },
    { name: "Color Converter", desc: "Convert HEX to RGB, HSL & CMYK instantly.", icon: Paintbrush, href: "/tools/color-converter", color: "text-rose-500", bg: "bg-rose-100" },
  ];

  return (
    <div className={`min-h-screen bg-[#F8FAFC] font-sans ${notoSansBengali.className} relative overflow-hidden`}>
      
      {/* Background Abstract Shapes */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[80%] rounded-full bg-emerald-400/10 blur-[120px]"></div>
        <div className="absolute top-[10%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-500/10 blur-[100px]"></div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 md:px-8 relative z-10 pt-32 pb-20 md:pt-40 md:pb-32">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-bold text-slate-600 shadow-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            50+ Premium Tools, 100% Free Forever
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-[#111827] tracking-tight mb-8 leading-[1.1]">
            The Ultimate Toolkit for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">
              Creators & Developers
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            দৈনন্দিন জীবনের প্রয়োজনীয় সব ডিজিটাল টুলস এখন এক ছাদের নিচে! ছবি এডিট, পিডিএফ কনভার্ট থেকে শুরু করে অ্যাডভান্সড AI টুলস— সবকিছু ব্যবহার করুন সম্পূর্ণ ফ্রিতে।
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/ai-tools"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#111827] hover:bg-slate-800 text-white rounded-2xl text-base font-bold transition-all shadow-[0_10px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_10px_40px_rgba(15,23,42,0.3)] hover:-translate-y-1"
            >
              <Sparkles size={18} className="text-emerald-400" /> Explore AI Tools
            </Link>
            <Link 
              href="#categories"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 rounded-2xl text-base font-bold transition-all shadow-sm hover:border-slate-300"
            >
              Browse All Tools <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* TRUST BADGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-32 border-y border-slate-200/60 py-10">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-1">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Lightning Fast</h3>
            <p className="text-sm text-slate-500 font-medium">Tools run directly in your browser for instant results.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-1">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">100% Secure</h3>
            <p className="text-sm text-slate-500 font-medium">Client-side processing means your data never leaves your device.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-1">
              <Layers size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Registration</h3>
            <p className="text-sm text-slate-500 font-medium">Jump straight in. No accounts, no paywalls, no hidden fees.</p>
          </div>
        </div>

        {/* CATEGORIES SECTION */}
        <div id="categories" className="mb-32 scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-4">Everything You Need</h2>
            <p className="text-slate-500 font-medium text-lg">Choose from our massive collection of premium tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <Link 
                href={cat.href} 
                key={idx}
                className={`group flex items-center gap-5 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${cat.border}`}
              >
                <div className={`w-16 h-16 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon size={30} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-[#111827]">{cat.name}</h3>
                  <p className="text-sm text-slate-500 font-medium">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* POPULAR TOOLS HIGHLIGHT */}
        <div className="bg-[#0F172A] rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-6">
                <Sparkles size={14} /> Trending Now
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Most Popular Tools Used by Our Community
              </h2>
              <p className="text-slate-400 font-medium text-lg mb-8 max-w-xl mx-auto lg:mx-0">
                আমাদের ইউজারদের সবচেয়ে পছন্দের এই টুলগুলো ট্রাই করে দেখতে পারেন। আপনার দৈনন্দিন কাজকে করে তুলবে আরও সহজ।
              </p>
              <Link 
                href="/ai-tools"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#111827] hover:bg-slate-100 rounded-xl font-bold transition-colors"
              >
                View all trending <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {popularTools.map((tool, idx) => (
                <Link 
                  href={tool.href}
                  key={idx}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:bg-slate-800 transition-colors group"
                >
                  <div className={`w-12 h-12 rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <tool.icon size={24} />
                  </div>
                  <h3 className="text-white font-bold mb-2">{tool.name}</h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">{tool.desc}</p>
                </Link>
              ))}
            </div>

          </div>
        </div>

        {/* SIMPLE FOOTER */}
        <div className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-500">
          <p>© {new Date().getFullYear()} MockupHub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#111827]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#111827]">Terms of Service</Link>
            <Link href="#" className="hover:text-[#111827]">Contact Us</Link>
          </div>
        </div>

      </div>
    </div>
  );
}