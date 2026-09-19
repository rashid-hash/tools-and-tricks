import React from "react";
import { Zap, Lock, Target, MonitorSmartphone } from "lucide-react";

export default function WhyUsersLoveIt() {
  const benefits = [
    {
      title: "Fast",
      description: "Instant tools with no unnecessary steps. Get your work done in seconds.",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "group-hover:border-amber-500/30",
      shadow: "group-hover:shadow-amber-500/10"
    },
    {
      title: "Private",
      description: "Your files stay yours. Everything is processed securely in your browser.",
      icon: Lock,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "group-hover:border-emerald-500/30",
      shadow: "group-hover:shadow-emerald-500/10"
    },
    {
      title: "Simple",
      description: "No complicated interfaces. Designed for clarity and extreme ease of use.",
      icon: Target,
      color: "text-[#6366F1]",
      bg: "bg-[#6366F1]/10",
      border: "group-hover:border-[#6366F1]/30",
      shadow: "group-hover:shadow-[#6366F1]/10"
    },
    {
      title: "Works everywhere",
      description: "Perfectly optimized for your desktop, tablet, and mobile devices.",
      icon: MonitorSmartphone,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "group-hover:border-rose-500/30",
      shadow: "group-hover:shadow-rose-500/10"
    }
  ];

  return (
    <section className="relative w-full max-w-6xl mx-auto px-5 md:px-6 py-20 md:py-32 z-20">
      
      {/* Section Header */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#111827] tracking-tight mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Why users love it
        </h2>
        <p className="text-slate-500 text-[17px] font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
          Built with premium engineering and design principles to make your daily tasks effortless.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className={`group p-6 rounded-[24px] bg-transparent hover:bg-white/60 transition-all duration-500 border border-transparent ${benefit.border} hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${benefit.shadow} animate-in fade-in slide-in-from-bottom-6`}
            style={{ 
              animationDelay: `${200 + index * 100}ms`,
              animationFillMode: "both"
            }}
          >
            {/* Elegant Icon Container */}
            <div className={`w-12 h-12 rounded-[16px] ${benefit.bg} ${benefit.color} flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out`}>
              <benefit.icon size={24} strokeWidth={2} />
            </div>
            
            {/* Text Content */}
            <h3 className="font-bold text-[#111827] text-[18px] tracking-tight mb-2">
              {benefit.title}
            </h3>
            <p className="text-slate-500 text-[15px] leading-relaxed font-medium">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}