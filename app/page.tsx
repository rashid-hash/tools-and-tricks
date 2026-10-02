import React from "react";
import Link from "next/link";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  ArrowRight, Sparkles, ShieldCheck, Zap, 
  Layers, Image as ImageIcon, Type, 
  Smartphone, CreditCard, Receipt, Calculator, 
  LayoutDashboard, Link as LinkIcon, Share2, 
  MessageCircle, Calendar, Repeat
} from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function HomePage() {
  // 🌟 Your Actual Tools Categorized 🌟
  const toolCategories = [
    {
      title: "Social Media & Marketing",
      tools: [
        { name: "Social Studio", desc: "Advanced dashboard & post automation", icon: LayoutDashboard, href: "/social-studio", color: "text-violet-500", bg: "bg-violet-100", border: "hover:border-violet-400" },
        { name: "URL Shortener", desc: "Shorten links with UTM & Social tracking", icon: LinkIcon, href: "/url-shortener", color: "text-blue-500", bg: "bg-blue-100", border: "hover:border-blue-400" },
        { name: "UTM Builder", desc: "Generate tracking URLs for campaigns", icon: Share2, href: "/utm-builder", color: "text-rose-500", bg: "bg-rose-100", border: "hover:border-rose-400" },
        { name: "Facebook Post", desc: "Create realistic FB post mockups", icon: MessageCircle, href: "/facebook-post", color: "text-blue-600", bg: "bg-blue-100", border: "hover:border-blue-400" },
        { name: "Messenger Chat", desc: "Create fake Messenger conversations", icon: MessageCircle, href: "/messenger", color: "text-purple-500", bg: "bg-purple-100", border: "hover:border-purple-400" },
        { name: "WhatsApp Chat", desc: "Generate WhatsApp chat mockups", icon: MessageCircle, href: "/whatsapp", color: "text-emerald-500", bg: "bg-emerald-100", border: "hover:border-emerald-400" },
      ]
    },
    {
      title: "Finance & Mockups",
      tools: [
        { name: "bKash Receipt", desc: "Generate realistic bKash payment mockups", icon: Smartphone, href: "/bkash", color: "text-pink-500", bg: "bg-pink-100", border: "hover:border-pink-400" },
        { name: "Nagad Receipt", desc: "Create Nagad transaction mockups", icon: Smartphone, href: "/nagad", color: "text-orange-500", bg: "bg-orange-100", border: "hover:border-orange-400" },
        { name: "Rocket Receipt", desc: "Generate Rocket payment mockups", icon: Smartphone, href: "/rocket", color: "text-purple-600", bg: "bg-purple-100", border: "hover:border-purple-400" },
        { name: "DBBL Receipt", desc: "Dutch-Bangla Bank transaction mockups", icon: CreditCard, href: "/dbbl", color: "text-blue-500", bg: "bg-blue-100", border: "hover:border-blue-400" },
        { name: "IBBL Receipt", desc: "Islami Bank receipt mockups", icon: CreditCard, href: "/ibbl", color: "text-green-500", bg: "bg-green-100", border: "hover:border-green-400" },
        { name: "Invoice Generator", desc: "Create and print professional PDF invoices", icon: Receipt, href: "/invoice-generator", color: "text-indigo-500", bg: "bg-indigo-100", border: "hover:border-indigo-400" },
        { name: "EMI Calculator", desc: "Calculate loan EMIs and interest easily", icon: Calculator, href: "/emi-calculator", color: "text-teal-500", bg: "bg-teal-100", border: "hover:border-teal-400" },
      ]
    },
    {
      title: "Utility & Typography",
      tools: [
        { name: "Age Calculator", desc: "Calculate your exact age with details", icon: Calendar, href: "/age-calculator", color: "text-amber-500", bg: "bg-amber-100", border: "hover:border-amber-400" },
        { name: "Image Resizer", desc: "Compress and resize images quickly", icon: ImageIcon, href: "/image-resizer", color: "text-sky-500", bg: "bg-sky-100", border: "hover:border-sky-400" },
        { name: "Unicode to Bijoy", desc: "Convert Bangla fonts seamlessly", icon: Repeat, href: "/unicode-to-bijoy", color: "text-emerald-500", bg: "bg-emerald-100", border: "hover:border-emerald-400" },
        { name: "Bangla Lorem Ipsum", desc: "Generate dummy Bangla text for design", icon: Type, href: "/bangla-lorem", color: "text-slate-500", bg: "bg-slate-100", border: "hover:border-slate-400" },
      ]
    }
  ];

  // Featured / Popular Tools
  const popularTools = [
    { name: "Social Studio", desc: "Advanced dashboard & post automation.", icon: LayoutDashboard, href: "/social-studio", color: "text-violet-500", bg: "bg-violet-100" },
    { name: "bKash Receipt", desc: "Generate realistic payment mockups.", icon: Smartphone, href: "/bkash", color: "text-pink-500", bg: "bg-pink-100" },
    { name: "URL Shortener", desc: "Shorten links with UTM tracking.", icon: LinkIcon, href: "/url-shortener", color: "text-blue-500", bg: "bg-blue-100" },
    { name: "Invoice Generator", desc: "Create professional PDF invoices.", icon: Receipt, href: "/invoice-generator", color: "text-indigo-500", bg: "bg-indigo-100" },
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
            15+ Premium Tools, 100% Free Forever
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-[#111827] tracking-tight mb-8 leading-[1.1]">
            The Ultimate Toolkit for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">
              Creators & Developers
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            দৈনন্দিন জীবনের প্রয়োজনীয় সব ডিজিটাল টুলস এখন এক ছাদের নিচে! মকআপ জেনারেটর, পিডিএফ ইনভয়েস থেকে শুরু করে অ্যাডভান্সড সোশ্যাল টুলস— সবকিছু ব্যবহার করুন সম্পূর্ণ ফ্রিতে।
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/social-studio"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#111827] hover:bg-slate-800 text-white rounded-2xl text-base font-bold transition-all shadow-[0_10px_30px_rgba(15,23,42,0.2)] hover:shadow-[0_10px_40px_rgba(15,23,42,0.3)] hover:-translate-y-1"
            >
              <Sparkles size={18} className="text-emerald-400" /> Explore Social Studio
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
            <p className="text-sm text-slate-500 font-medium">Your data is processed securely and efficiently.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-1">
              <Layers size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Registration</h3>
            <p className="text-sm text-slate-500 font-medium">Jump straight in. No paywalls, no hidden fees.</p>
          </div>
        </div>

        {/* ALL TOOLS CATEGORIES SECTION */}
        <div id="categories" className="mb-32 scroll-mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-4">Everything You Need</h2>
            <p className="text-slate-500 font-medium text-lg">Choose from our massive collection of premium tools</p>
          </div>

          {toolCategories.map((category, catIdx) => (
            <div key={catIdx} className="mb-16">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-3 inline-block">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool, idx) => (
                  <Link 
                    href={tool.href} 
                    key={idx}
                    className={`group flex items-center gap-5 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${tool.border}`}
                  >
                    <div className={`w-16 h-16 rounded-2xl ${tool.bg} ${tool.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <tool.icon size={30} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-[#111827]">{tool.name}</h3>
                      <p className="text-sm text-slate-500 font-medium">{tool.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
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
                আমাদের ইউজারদের সবচেয়ে পছন্দের এই টুলগুলো ট্রাই করে দেখতে পারেন। আপনার দৈনন্দিন কাজকে করে তুলবে আরও সহজ।
              </p>
              <Link 
                href="/social-studio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#111827] hover:bg-slate-100 rounded-xl font-bold transition-colors"
              >
                Go to Social Studio <ArrowRight size={18} />
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
          <p>© {new Date().getFullYear()} SocialStudio & Tools. All rights reserved.</p>
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