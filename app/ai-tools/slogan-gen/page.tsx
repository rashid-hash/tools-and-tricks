"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Sparkles, Copy, CheckCircle2, 
  StopCircle, Settings2, Quote, 
  Building, Target
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function SloganGeneratorTool() {
  const [brandName, setBrandName] = useState("");
  const [coreValue, setCoreValue] = useState("");
  const [tone, setTone] = useState("Short & Catchy");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const outputRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleGenerate = async () => {
    if (!brandName.trim()) return;
    
    setIsGenerating(true);
    setOutput("");
    setIsCopied(false);

    abortControllerRef.current = new AbortController();

    try {
      const aiPrompt = `You are an expert Brand Strategist and Copywriter. Your task is to generate highly memorable, creative, and catchy slogans/taglines.
      
      Brand/Product Name: "${brandName}"
      Core Value/What it does: "${coreValue || 'Not specified'}"
      Tone/Style: ${tone}
      
      Instructions:
      1. Generate 10 unique and powerful slogans or taglines for the brand.
      2. Ensure they fit the requested tone perfectly.
      3. Make them easy to remember and impactful (like Nike's "Just Do It" or Apple's "Think Different").
      4. If the input is in Bengali, provide standard Bengali slogans. If English, in English.
      5. Format as a clean numbered list. Start directly with the slogans. Do not include any intro like "Here are your slogans".`;

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt }),
        signal: abortControllerRef.current.signal
      });

      const data = await res.json();
      
      if (data.error) {
        setOutput(`Error: ${data.error}`);
        setIsGenerating(false);
        return;
      }

      // Typing Effect
      const fullText = data.text;
      const words = fullText.split('');
      let currentText = "";

      for (let i = 0; i < words.length; i++) {
        if (abortControllerRef.current?.signal.aborted) break;
        
        currentText += words[i];
        setOutput(currentText);
        
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
        
        await new Promise(resolve => setTimeout(resolve, Math.random() * 10 + 5));
      }

    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setOutput("দুঃখিত, একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
      }
    }

    setIsGenerating(false);
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/ai-tools" className="text-sm font-bold text-slate-400 hover:text-fuchsia-600 transition-colors mb-6 inline-block">
          &larr; Back to AI Tools
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-xs font-bold text-fuchsia-700 uppercase tracking-widest mb-4">
              <Quote size={14} className="text-fuchsia-500" /> Branding
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              AI <span className="text-fuchsia-600">Slogan</span> Generator
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            আপনার ব্যবসা বা ব্র্যান্ডের জন্য মনে রাখার মতো এবং আকর্ষণীয় ট্যাগলাইন বা স্লোগান তৈরি করুন।
          </p>
        </div>
      </div>

      {/* Main Interface */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Side: Input Panel */}
        <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
            
            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Building size={16} className="text-fuchsia-500"/> Brand / Product Name
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="ব্র্যান্ডের নাম (যেমন: ফুডপান্ডা, ডিজিটাল এগ্রো)"
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/10 rounded-xl px-4 text-sm font-medium text-[#111827] outline-none transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Target size={16} className="text-fuchsia-500"/> Core Value / What you do
              </label>
              <textarea
                value={coreValue}
                onChange={(e) => setCoreValue(e.target.value)}
                placeholder="আপনার ব্যবসা মূলত কী নিয়ে বা মূল বৈশিষ্ট্য কী? (যেমন: ঘরে বসে দ্রুত খাবার ডেলিভারি...)"
                className="w-full h-24 bg-slate-50 border border-slate-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none"
              />
            </div>

            <div className="mb-8">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Settings2 size={16} className="text-fuchsia-500"/> Slogan Style
              </label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-fuchsia-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Short, Catchy & Punchy">Short, Catchy & Punchy (ছোট ও আকর্ষণীয়)</option>
                <option value="Trustworthy & Professional">Trustworthy & Corporate (প্রফেশনাল)</option>
                <option value="Emotional & Inspiring">Emotional & Inspiring (আবেগপূর্ণ)</option>
                <option value="Funny & Clever">Funny & Clever (মজার ও চতুর)</option>
                <option value="Rhyming (Chhanda)">Rhyming (ছন্দ মেলানো)</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!brandName.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 group"
            >
              <Sparkles size={18} className="text-fuchsia-200 group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "Brainstorming Slogans..." : "Generate Slogans"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-fuchsia-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider">
                {isGenerating ? "AI is thinking..." : "Slogan Ideas"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isGenerating ? (
                <button onClick={handleStop} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg">
                  <StopCircle size={14} /> Stop
                </button>
              ) : (
                <button onClick={handleCopy} disabled={!output} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg disabled:opacity-50">
                  {isCopied ? <CheckCircle2 size={14} className="text-fuchsia-400" /> : <Copy size={14} />}
                  {isCopied ? "Copied" : "Copy Slogans"}
                </button>
              )}
            </div>
          </div>

          <div ref={outputRef} className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar relative">
            {output ? (
              <div className="text-slate-100 text-[16px] leading-relaxed whitespace-pre-wrap bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                {output}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                <Quote size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm mt-4">
                  আপনার ব্র্যান্ডের নাম এবং কাজ লিখে Generate বাটনে ক্লিক করুন। 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}