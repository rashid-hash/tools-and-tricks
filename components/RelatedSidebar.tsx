// components/RelatedSidebar.tsx
import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Banknote, Zap } from "lucide-react";

// একটি টাইপ ডিফাইন করে নিলাম
export interface SuggestedTool {
  id: string;
  name: string;
  desc: string;
  icon: React.ElementType;
  href: string;
  color: string;
  bg: string;
}

// ডিফল্ট টুলস (যদি কোনো পেজ থেকে ডেটা না পাঠানো হয়, তবে এগুলো দেখাবে)
const defaultTools: SuggestedTool[] = [
  { id: "salary", name: "Salary Calculator", desc: "Calculate your net payable salary.", icon: Banknote, href: "/tools/salary-calculator", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "vat", name: "VAT Calculator", desc: "Add or extract VAT from any amount.", icon: Calculator, href: "/tools/vat-calculator", color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "electricity", name: "Electricity Bill", desc: "Estimate DPDC/DESCO monthly bill.", icon: Zap, href: "/tools/electricity-bill", color: "text-amber-500", bg: "bg-amber-100" }
];

export default function RelatedSidebar({ tools = defaultTools }: { tools?: SuggestedTool[] }) {
  return (
    <div className="w-full lg:w-[320px] shrink-0">
      <div className="sticky top-28 flex flex-col gap-6">
        
        {/* Suggestion Box */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[24px] p-6 border border-slate-200/60 shadow-[0_8px_30px_rgb(15,23,42,0.04)]">
          <h3 className="text-[13px] font-extrabold text-slate-400 uppercase tracking-widest mb-5">
            Related Tools
          </h3>
          
          <div className="flex flex-col gap-4">
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.href} className="group flex items-start gap-3 p-3 -mx-3 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tool.bg} ${tool.color} group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#111827] group-hover:text-emerald-600 transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-[12px] text-slate-500 font-medium leading-tight mt-0.5">
                    {tool.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/tools" className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[13px] font-bold transition-colors">
            View all tools <ArrowRight size={14} />
          </Link>
        </div>

        {/* Ad or Promo Banner Space */}
        <div className="bg-gradient-to-br from-[#111827] to-slate-800 rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg shadow-slate-900/10 group cursor-pointer">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-colors"></div>
          <h3 className="text-lg font-bold mb-2">Want no ads?</h3>
          <p className="text-sm text-slate-300 font-medium mb-4">Upgrade to MockupHub Pro for a seamless, distraction-free experience.</p>
          <span className="text-emerald-400 text-[13px] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Learn more <ArrowRight size={14} />
          </span>
        </div>

      </div>
    </div>
  );
}