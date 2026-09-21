"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Key, Sparkles, Copy, CheckCircle2, 
  RefreshCw, ShieldAlert, ShieldCheck, Shield, ShieldHalf, 
  Settings2, Hash, Type, Link2, QrCode, Terminal
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Utility Category Related Tools
const utilityRelatedTools: SuggestedTool[] = [
  { id: "qr-generator", name: "QR Generator", desc: "Create custom QR codes.", icon: QrCode, href: "/tools/qr-generator", color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "uuid-generator", name: "UUID Generator", desc: "Generate secure UUIDs.", icon: Key, href: "/tools/uuid-generator", color: "text-purple-500", bg: "bg-purple-100" },
  { id: "base64", name: "Base64 Encoder", desc: "Encode/Decode Base64.", icon: Terminal, href: "/tools/base64", color: "text-indigo-500", bg: "bg-indigo-100" }
];

export default function PasswordGeneratorTool() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [isCopied, setIsCopied] = useState(false);
  const [strength, setStrength] = useState<{ label: string; score: number; color: string; icon: any }>({
    label: "Strong", score: 4, color: "text-emerald-500", icon: ShieldCheck
  });

  // Secure Password Generation Logic
  const generatePassword = useCallback(() => {
    const chars = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    };

    let charPool = "";
    if (options.uppercase) charPool += chars.uppercase;
    if (options.lowercase) charPool += chars.lowercase;
    if (options.numbers) charPool += chars.numbers;
    if (options.symbols) charPool += chars.symbols;

    // Fallback if all options are unchecked
    if (charPool === "") {
      charPool = chars.lowercase; 
      setOptions(prev => ({ ...prev, lowercase: true }));
    }

    let newPassword = "";
    
    // Using Crypto API for secure random generation if available
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const randomValues = new Uint32Array(length);
      crypto.getRandomValues(randomValues);
      for (let i = 0; i < length; i++) {
        newPassword += charPool[randomValues[i] % charPool.length];
      }
    } else {
      // Fallback for older browsers
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        newPassword += charPool[randomIndex];
      }
    }

    setPassword(newPassword);
    calculateStrength(newPassword, charPool.length);
  }, [length, options]);

  // Calculate Password Strength
  const calculateStrength = (pass: string, poolSize: number) => {
    let score = 0;
    
    if (pass.length > 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (pass.length >= 16) score += 1;

    let varietyCount = 0;
    if (/[A-Z]/.test(pass)) varietyCount++;
    if (/[a-z]/.test(pass)) varietyCount++;
    if (/[0-9]/.test(pass)) varietyCount++;
    if (/[^A-Za-z0-9]/.test(pass)) varietyCount++;
    
    if (varietyCount >= 3) score += 1;

    if (score <= 1) {
      setStrength({ label: "Weak", score: 1, color: "text-rose-500 bg-rose-50 border-rose-200", icon: ShieldAlert });
    } else if (score === 2) {
      setStrength({ label: "Fair", score: 2, color: "text-amber-500 bg-amber-50 border-amber-200", icon: ShieldHalf });
    } else if (score === 3) {
      setStrength({ label: "Good", score: 3, color: "text-blue-500 bg-blue-50 border-blue-200", icon: Shield });
    } else {
      setStrength({ label: "Strong", score: 4, color: "text-emerald-500 bg-emerald-50 border-emerald-200", icon: ShieldCheck });
    }
  };

  // Generate on initial render and when options change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const toggleOption = (key: keyof typeof options) => {
    setOptions(prev => {
      const next = { ...prev, [key]: !prev[key] };
      // Prevent unchecking all options
      if (!Object.values(next).includes(true)) return prev;
      return next;
    });
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // UI Components
  const OptionCheckbox = ({ label, icon: Icon, objKey }: { label: string, icon: any, objKey: keyof typeof options }) => (
    <label className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 cursor-pointer hover:border-red-300 hover:shadow-sm transition-all group select-none">
      <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
        <div className={`p-2 rounded-lg ${options[objKey] ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-400"} transition-colors`}>
          <Icon size={16} />
        </div>
        {label}
      </div>
      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${options[objKey] ? "bg-red-500 border-red-500" : "border-slate-300 group-hover:border-red-400 bg-slate-50"}`}>
        {options[objKey] && <CheckCircle2 size={14} className="text-white" />}
      </div>
      <input type="checkbox" checked={options[objKey]} onChange={() => toggleOption(objKey)} className="hidden" />
    </label>
  );

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-red-500" />
          Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Password <span className="text-red-500">Generator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার যেকোনো অ্যাকাউন্টের সুরক্ষার জন্য ক্রিপ্টোগ্রাফিক্যালি সিকিউর এবং অনুমান অযোগ্য শক্তিশালী পাসওয়ার্ড তৈরি করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full max-w-2xl mx-auto flex flex-col gap-6">
          
          {/* Password Display Box */}
          <div className="bg-[#0F172A] p-6 md:p-8 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 relative overflow-hidden group">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[80px] rounded-full pointer-events-none"></div>

            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">Generated Password</p>
            
            <div className="text-center mb-8 relative">
              <h2 className="text-3xl md:text-5xl font-mono font-bold text-white break-all tracking-wide select-all">
                {password}
              </h2>
            </div>

            {/* Strength & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-700/50">
              
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${strength.color} transition-colors duration-500`}>
                <strength.icon size={16} />
                <span className="text-sm font-bold uppercase tracking-wider">{strength.label}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={generatePassword}
                  className="flex-1 sm:flex-none p-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all shadow-sm flex items-center justify-center group/btn"
                  title="Regenerate"
                >
                  <RefreshCw size={18} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                </button>
                
                <button 
                  onClick={handleCopy}
                  className="flex-[2] sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-all shadow-[0_5px_15px_rgba(239,68,68,0.3)] hover:shadow-[0_8px_25px_rgba(239,68,68,0.4)]"
                >
                  {isCopied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  {isCopied ? "Copied to Clipboard" : "Copy Password"}
                </button>
              </div>

            </div>
          </div>

          {/* Settings Box */}
          <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.04)] border border-slate-200/60">
            <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Settings2 size={16} className="text-red-500" /> Customize Options
            </h3>
            
            {/* Length Slider */}
            <div className="mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-bold text-slate-600">Password Length</label>
                <span className="text-2xl font-black text-[#111827]">{length}</span>
              </div>
              
              <input 
                type="range" 
                min="8" max="64" 
                value={length} 
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/20"
              />
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-2">
                <span>8</span>
                <span>32</span>
                <span>64</span>
              </div>
            </div>

            {/* Checkboxes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <OptionCheckbox label="Uppercase (A-Z)" icon={Type} objKey="uppercase" />
              <OptionCheckbox label="Lowercase (a-z)" icon={Type} objKey="lowercase" />
              <OptionCheckbox label="Numbers (0-9)" icon={Hash} objKey="numbers" />
              <OptionCheckbox label="Symbols (!@#$)" icon={Link2} objKey="symbols" />
            </div>

          </div>

        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="hidden lg:block w-80 shrink-0">
           <RelatedSidebar tools={utilityRelatedTools} />
        </div>

      </div>
    </div>
  );
}