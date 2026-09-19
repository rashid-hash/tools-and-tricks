"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Layers } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll Event for shrinking and adding shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
      {/* Floating Container */}
      <div 
        className={`pointer-events-auto w-full max-w-6xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between px-5 md:px-6 
        ${isScrolled 
          ? "h-[64px] bg-white/70 backdrop-blur-xl border border-slate-900/5 shadow-[0_8px_30px_rgb(15,23,42,0.06)] rounded-[20px]" 
          : "h-[76px] bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgb(15,23,42,0.02)] rounded-[22px]"
        }`}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#111827] text-white flex items-center justify-center shadow-md shadow-slate-900/20 group-hover:scale-105 transition-transform duration-300">
            <Layers size={22} strokeWidth={2.5} />
          </div>
          <span className="font-extrabold text-[22px] tracking-tight text-[#111827]">Tools&Tricks</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/tools" className="text-sm font-semibold text-slate-600 hover:text-[#111827] transition-colors">Tools</Link>
          <Link href="/ai" className="text-sm font-semibold text-slate-600 hover:text-[#111827] transition-colors">AI Tools</Link>
          <Link href="/calculators" className="text-sm font-semibold text-slate-600 hover:text-[#111827] transition-colors">Calculators</Link>
          <Link href="/developer" className="text-sm font-semibold text-slate-600 hover:text-[#111827] transition-colors">Developer</Link>
        </nav>

        {/* Actions (Search + Get Started) */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100/50 transition-all text-sm font-medium">
            <Search size={18} strokeWidth={2} />
            <kbd className="hidden xl:inline-flex items-center gap-1 bg-white border border-slate-200/80 rounded-[6px] px-2 py-0.5 text-[11px] font-sans text-slate-400 shadow-sm">
              ⌘ K
            </kbd>
          </button>
          <Link href="/explore" className="bg-[#111827] hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-[0_4px_14px_0_rgb(17,24,39,0.2)] hover:shadow-[0_6px_20px_rgba(17,24,39,0.23)] hover:-translate-y-0.5">
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="lg:hidden p-2 text-slate-600 bg-white/50 rounded-xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}