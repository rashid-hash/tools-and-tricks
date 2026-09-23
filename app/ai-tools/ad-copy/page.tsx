"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Sparkles, Copy, CheckCircle2, 
  StopCircle, Settings2, Megaphone, 
  Target, MousePointerClick
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function AdCopyTool() {
  const [product, setProduct] = useState("");
  const [platform, setPlatform] = useState("Facebook Ads");
  const [tone, setTone] = useState("Persuasive & Urgent");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const outputRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleGenerate = async () => {
    if (!product.trim()) return;
    
    setIsGenerating(true);
    setOutput("");
    setIsCopied(false);

    abortControllerRef.current = new AbortController();

    try {
      const aiPrompt = `You are a top-tier Media Buyer and Expert Copywriter. Your task is to write highly converting and click-driving Ad Copy.
      
      Product/Service Info: "${product}"
      Target Platform: ${platform}
      Tone/Vibe: ${tone}
      
      Instructions:
      1. Write an engaging Ad Copy tailored specifically for the ${platform} algorithm and user behavior.
      2. Include these sections clearly:
         - [Primary Text / Hook]
         - [Headline]
         - [Description]
         - [Call To Action]
      3. Focus on customer benefits, pain points, and a strong hook to stop the scroll.
      4. If the product info is written in Bengali, write the Ad Copy in standard Bengali. If English, in English.
      5. Start directly with the Ad Copy. Do not include any introductory or concluding remarks.`;

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
        <Link href="/ai-tools" className="text-sm font-bold text-slate-400 hover:text-sky-600 transition-colors mb-6 inline-block">
          &larr; Back to AI Tools
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-700 uppercase tracking-widest mb-4">
              <Megaphone size={14} className="text-sky-500" /> Advertising
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              AI <span className="text-sky-600">Ad Copy</span> Generator
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            ফেসবুক বা গুগল অ্যাডের জন্য হাই-কনভার্টিং এবং আকর্ষণীয় বিজ্ঞাপনের লেখা তৈরি করুন।
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
                <Target size={16} className="text-sky-500"/> Product / Offer Details
              </label>
              <textarea
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="আপনার প্রোডাক্ট, সার্ভিস বা অফার সম্পর্কে বিস্তারিত লিখুন (যেমন: ৫০% ছাড়ে ডিজিটাল মার্কেটিং কোর্স...)"
                className="w-full h-28 bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <MousePointerClick size={16} className="text-sky-500"/> Ad Platform
              </label>
              <select 
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-sky-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Facebook Ads">Facebook Ads</option>
                <option value="Google Search Ads">Google Search Ads</option>
                <option value="Instagram Ads">Instagram Ads</option>
                <option value="LinkedIn Ads">LinkedIn Ads (B2B)</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Settings2 size={16} className="text-sky-500"/> Tone / Strategy
              </label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-sky-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Persuasive & Urgent (FOMO)">Persuasive & Urgent (FOMO)</option>
                <option value="Storytelling (Long form)">Storytelling (Long form)</option>
                <option value="Direct & Benefit-driven">Direct & Benefit-driven</option>
                <option value="Creative & Catchy">Creative & Catchy</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!product.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 group"
            >
              <Sparkles size={18} className="text-sky-200 group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "Writing Ad Copy..." : "Generate Ad Copy"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-sky-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                {isGenerating ? "Analyzing Market..." : "Winning Ad Copy"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isGenerating ? (
                <button onClick={handleStop} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg">
                  <StopCircle size={14} /> Stop
                </button>
              ) : (
                <button onClick={handleCopy} disabled={!output} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg disabled:opacity-50">
                  {isCopied ? <CheckCircle2 size={14} className="text-sky-400" /> : <Copy size={14} />}
                  {isCopied ? "Copied" : "Copy Ad Text"}
                </button>
              )}
            </div>
          </div>

          <div ref={outputRef} className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar relative">
            {output ? (
              <div className="text-slate-100 text-[15px] leading-relaxed whitespace-pre-wrap bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                {output}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                <Megaphone size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm mt-4">
                  আপনার প্রোডাক্ট বা অফারের তথ্য লিখে 'Generate Ad Copy' বাটনে ক্লিক করুন। 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}