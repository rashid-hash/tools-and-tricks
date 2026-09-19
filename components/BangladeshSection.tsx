// components/BangladeshSection.tsx
import React from "react";
import Link from "next/link";
import { Banknote, Map, Calculator, Zap, CalendarDays, Landmark, ArrowRight, Sparkles } from "lucide-react";

export default function BangladeshSection() {
  // এই টুলগুলো যেহেতু স্পেশাল, তাই এগুলোকে আমরা এখানেই ডিফাইন করছি
  const bdTools = [
    {
      id: "bdt-converter",
      name: "BDT Currency Converter",
      description: "Live exchange rates and remittance calculator for Taka.",
      icon: Banknote,
      url: "/bdt-converter",
    },
    {
      id: "land-calculator",
      name: "Land Area Calculator",
      description: "Convert Katha, Bigha, Shotok, and Ojutangsho effortlessly.",
      icon: Map,
      url: "/land-calculator",
    },
    {
      id: "salary-tax",
      name: "Salary & Tax Calculator",
      description: "Calculate net salary and NBR income tax easily.",
      icon: Calculator,
      url: "/salary-tax",
    },
    {
      id: "electricity-bill",
      name: "Electricity Bill (Desco/DPDC)",
      description: "Estimate your monthly electricity bill based on units.",
      icon: Zap,
      url: "/electricity-bill",
    },
    {
      id: "bangla-date",
      name: "Bangla Date Converter",
      description: "Convert English dates to accurate Bangla calendar dates.",
      icon: CalendarDays,
      url: "/bangla-date",
    },
    {
      id: "bd-loan",
      name: "Bank Loan EMI",
      description: "Calculate monthly installments for BD bank interest rates.",
      icon: Landmark,
      url: "/emi-calculator",
    }
  ];

  return (
    <section className="relative w-full max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-24 z-20">
      
      {/* Premium Highlight Box */}
      <div className="bg-gradient-to-br from-emerald-900 via-[#0B1512] to-[#0A1015] rounded-[32px] overflow-hidden relative shadow-[0_20px_60px_rgb(16,185,129,0.08)] border border-emerald-900/50">
        
        {/* Soft Background Glows */}
        <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[30%] h-[50%] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="p-8 md:p-14">
          
          {/* Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[12px] font-bold text-emerald-400 uppercase tracking-widest mb-6">
                <Sparkles size={14} className="text-emerald-500" />
                Localized Tools
              </div>
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-white tracking-tight mb-4 leading-tight">
                Made for everyday life <br className="hidden sm:block" />
                in Bangladesh <span className="text-2xl ml-1">🇧🇩</span>
              </h2>
              <p className="text-emerald-100/60 text-[17px] font-medium leading-relaxed">
                A carefully curated collection of tools designed specifically for local calculations, formats, and daily needs.
              </p>
            </div>
            
            <Link href="/bangladesh" className="shrink-0 flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-950/50 hover:bg-emerald-900/50 px-5 py-3 rounded-xl border border-emerald-800/50">
              View all BD Tools <ArrowRight size={16} />
            </Link>
          </div>

          {/* Tools Grid (Horizontal Compact Cards for SaaS Look) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 relative z-10">
            {bdTools.map((tool, index) => (
              <Link 
                href={tool.url} 
                key={tool.id}
                className="group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-emerald-500/30 rounded-[20px] p-5 flex items-start gap-4 transition-all duration-300 backdrop-blur-md"
              >
                {/* Emerald Tinted Icon */}
                <div className="w-12 h-12 rounded-[14px] bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  <tool.icon size={22} strokeWidth={2} />
                </div>
                
                <div className="flex-1 pt-0.5">
                  <h3 className="font-bold text-white text-[15px] tracking-tight mb-1 group-hover:text-emerald-300 transition-colors duration-300">
                    {tool.name}
                  </h3>
                  <p className="text-emerald-100/50 text-[13px] leading-relaxed font-medium line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}