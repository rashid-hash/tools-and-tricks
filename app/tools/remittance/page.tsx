"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Banknote, Sparkles, Receipt, ArrowDownUp, Info, Wallet, Globe, TrendingUp } from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Standard approximate exchange rates (Base: BDT)
const exchangeRates: Record<string, number> = {
  USD: 119.50,
  EUR: 132.40,
  GBP: 155.20,
  SAR: 31.85,
  AED: 32.50,
  MYR: 25.60,
  SGD: 89.20,
};

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "SAR", name: "Saudi Riyal", symbol: "ر.س" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
];

// এই টুলের জন্য কাস্টম রিলেটেড টুলস
const remittanceRelatedTools: SuggestedTool[] = [
  { id: "bdt-currency", name: "BDT Currency Converter", desc: "Live exchange rates and conversion.", icon: Globe, href: "/tools/bdt-currency-converter", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "salary", name: "Salary Breakdown", desc: "Calculate your net payable salary.", icon: Wallet, href: "/tools/salary-calculator", color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "dps", name: "DPS Calculator", desc: "Check monthly DPS maturity amount.", icon: TrendingUp, href: "/tools/dps-calculator", color: "text-amber-500", bg: "bg-amber-100" }
];

export default function RemittanceCalculator() {
  const [sendAmount, setSendAmount] = useState<string>("1000");
  const [foreignCurrency, setForeignCurrency] = useState("USD");
  const [customRate, setCustomRate] = useState<string>("");
  const [addIncentive, setAddIncentive] = useState(true);

  const [result, setResult] = useState({
    baseAmountBDT: 0,
    incentiveAmountBDT: 0,
    totalReceiveBDT: 0
  });

  useEffect(() => {
    const amount = parseFloat(sendAmount) || 0;
    const defaultRate = exchangeRates[foreignCurrency];
    const userRate = parseFloat(customRate);
    
    // Use custom rate if provided and greater than 0, otherwise use default
    const activeRate = (userRate > 0) ? userRate : defaultRate;

    const baseAmountBDT = amount * activeRate;
    const incentiveAmountBDT = addIncentive ? (baseAmountBDT * 0.025) : 0; // 2.5% incentive
    const totalReceiveBDT = baseAmountBDT + incentiveAmountBDT;

    setResult({
      baseAmountBDT,
      incentiveAmountBDT,
      totalReceiveBDT
    });
  }, [sendAmount, foreignCurrency, customRate, addIncentive]);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(num);
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-emerald-500" />
          Bangladesh Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Remittance <span className="text-emerald-600">Calculator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          প্রবাস থেকে পাঠানো টাকার বর্তমান এক্সচেঞ্জ রেট এবং সরকারি ২.৫% প্রণোদনা (Incentive) যোগ করে মোট কত টাকা দেশে পৌঁছাবে তা হিসাব করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Calculator Tool */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Amount Input */}
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Globe size={16} className="text-emerald-500"/> Sending Amount (পাঠানোর পরিমাণ)
              </label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-5 text-2xl font-bold text-[#111827] outline-none transition-all"
                  placeholder="1000"
                />
                <select 
                  value={foreignCurrency}
                  onChange={(e) => {
                    setForeignCurrency(e.target.value);
                    setCustomRate(""); // Reset custom rate on currency change
                  }}
                  className="h-16 w-28 bg-slate-100 border border-slate-200 rounded-2xl px-3 text-lg font-bold text-[#111827] outline-none cursor-pointer focus:border-emerald-500 appearance-none"
                >
                  {currencies.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                </select>
              </div>
            </div>

            {/* Custom Rate Input */}
            <div>
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <TrendingUp size={16} className="text-emerald-500"/> Exchange Rate (Optional)
              </label>
              <div className="relative flex items-center">
                <input 
                  type="number" 
                  value={customRate}
                  onChange={(e) => setCustomRate(e.target.value)}
                  className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-5 text-xl font-bold text-[#111827] outline-none transition-all"
                  placeholder={`Default: ${exchangeRates[foreignCurrency]}`}
                  step="0.01"
                />
                <span className="absolute right-5 text-sm font-bold text-slate-400">BDT</span>
              </div>
            </div>
            
          </div>

          {/* Incentive Toggle */}
          <div className="mb-10">
             <div 
               className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors border-2 ${addIncentive ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-slate-200 hover:border-emerald-200'}`} 
               onClick={() => setAddIncentive(!addIncentive)}
             >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${addIncentive ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-transparent'}`}>
                    ✓
                  </div>
                  <div>
                    <h4 className={`text-[15px] font-bold ${addIncentive ? 'text-emerald-900' : 'text-slate-700'}`}>Include 2.5% Govt. Incentive</h4>
                    <p className="text-[13px] text-slate-500 font-medium leading-tight mt-0.5">সরকারি আড়াই শতাংশ প্রণোদনা যোগ করুন</p>
                  </div>
                </div>
                <Receipt size={24} className={addIncentive ? 'text-emerald-500' : 'text-slate-300'} />
              </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#111827] rounded-[32px] p-6 md:p-8 w-full text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              
              {/* Grand Total */}
              <div className="space-y-4">
                <div>
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Banknote size={16} /> Total Received (সর্বমোট)
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                      ৳ {formatCurrency(result.totalReceiveBDT)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  প্রণোদনা সহ দেশে প্রাপক ঠিক এই পরিমাণ টাকা হাতে পাবেন।
                </p>
              </div>

              {/* Breakdown List */}
              <div className="space-y-4 lg:border-l lg:border-slate-700/50 lg:pl-8 flex flex-col justify-center">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">Base Amount ({sendAmount} {foreignCurrency}):</span>
                  <span className="font-bold text-white">৳ {formatCurrency(result.baseAmountBDT)}</span>
                </div>
                
                {addIncentive && (
                  <div className="flex justify-between items-center text-sm bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                    <span className="text-emerald-400 font-medium">Incentive Bonus (2.5%):</span>
                    <span className="font-bold text-emerald-400">+ ৳ {formatCurrency(result.incentiveAmountBDT)}</span>
                  </div>
                )}
                
                <div className="border-t border-slate-700/50 pt-2 text-xs text-slate-500 flex justify-between">
                  <span>Applied Exchange Rate:</span>
                  <span>1 {foreignCurrency} = {parseFloat(customRate) > 0 ? parseFloat(customRate) : exchangeRates[foreignCurrency]} BDT</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Sticky Sidebar Layout with Custom Tools */}
        <RelatedSidebar tools={remittanceRelatedTools} />

      </div>
    </div>
  );
}