// components/Footer.tsx
import React from "react";
import Link from "next/link";
import { Layers } from "lucide-react"; // শুধুমাত্র Layers আইকনটি রাখলাম

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200/60 pt-16 md:pt-24 pb-10 px-5 md:px-6 relative z-20">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Top Section (Links & Logo) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-16">
          
          {/* Brand Info (Left) */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-[10px] bg-[#111827] text-white flex items-center justify-center shadow-md shadow-slate-900/20 group-hover:scale-105 transition-transform duration-300">
                <Layers size={18} strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-[20px] tracking-tight text-[#111827]">MockupHub</span>
            </Link>
            <p className="text-slate-500 text-[15px] leading-relaxed font-medium max-w-sm">
              Simple tools for everyday life. Powerful utilities designed with premium precision to speed up your workflow.
            </p>
          </div>

          {/* Tools Columns */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="font-bold text-[#111827] text-[15px] mb-5 tracking-tight">Tools & Utilities</h4>
            <ul className="flex flex-col gap-3.5">
              <li><Link href="/tools" className="text-[14px] font-medium text-slate-500 hover:text-[#6366F1] transition-colors">All Tools</Link></li>
              <li><Link href="/ai" className="text-[14px] font-medium text-slate-500 hover:text-[#6366F1] transition-colors">AI Tools</Link></li>
              <li><Link href="/calculators" className="text-[14px] font-medium text-slate-500 hover:text-[#6366F1] transition-colors">Calculators</Link></li>
              <li><Link href="/images" className="text-[14px] font-medium text-slate-500 hover:text-[#6366F1] transition-colors">Image & PDF</Link></li>
              <li><Link href="/developer" className="text-[14px] font-medium text-slate-500 hover:text-[#6366F1] transition-colors">Developer Tools</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="font-bold text-[#111827] text-[15px] mb-5 tracking-tight">Company</h4>
            <ul className="flex flex-col gap-3.5">
              <li><Link href="/about" className="text-[14px] font-medium text-slate-500 hover:text-[#6366F1] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-[14px] font-medium text-slate-500 hover:text-[#6366F1] transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-[14px] font-medium text-slate-500 hover:text-[#6366F1] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[14px] font-medium text-slate-500 hover:text-[#6366F1] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section (Copyright & Socials) */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-100 gap-4">
          <p className="text-slate-400 text-[14px] font-medium">
            © {currentYear} MockupHub. All rights reserved.
          </p>
          
          {/* Social Icons (Replaced with native SVGs to avoid build errors) */}
          <div className="flex items-center gap-2">
            
            {/* Twitter */}
            <a href="#" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#6366F1]/10 hover:text-[#6366F1] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            
            {/* Facebook */}
            <a href="#" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#6366F1]/10 hover:text-[#6366F1] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            
            {/* Instagram */}
            <a href="#" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#6366F1]/10 hover:text-[#6366F1] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            
            {/* Github */}
            <a href="#" className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#6366F1]/10 hover:text-[#6366F1] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            
          </div>
        </div>

      </div>
    </footer>
  );
}