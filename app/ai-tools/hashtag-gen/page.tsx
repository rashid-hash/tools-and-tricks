"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Sparkles, Copy, CheckCircle2, 
  StopCircle, Settings2, Hash, 
  Tag, BarChart2
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function HashtagGeneratorTool() {
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [quantity, setQuantity] = useState("Mix of 20 (Best for Reach)");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const outputRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    
    setIsGenerating(true);
    setOutput("");
    setIsCopied(false);

    abortControllerRef.current = new AbortController();

    try {
      const aiPrompt = `You are an expert Social Media Strategist and SEO Specialist. Your task is to generate highly optimized, trending, and relevant hashtags.
      
      Core Topic/Keyword: "${keyword}"
      Target Platform: ${platform}
      Quantity Request: ${quantity}
      
      Instructions:
      1. Provide a strategic mix of Broad, Niche, and Trending hashtags perfectly suited for the specified platform's algorithm.
      2. Ensure all tags are relevant to the topic.
      3. Format the output purely as a space-separated list of hashtags (e.g., #example #trending #foryou).
      4. DO NOT use bullet points, numbers, or commas.
      5. Start directly with the hashtags. Do not include any introductory, concluding, or explanatory text.`;

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
        
        await new Promise(resolve => setTimeout(resolve, Math.random() * 5 + 2));
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
        <Link href="/ai-tools" className="text-sm font-bold text-slate-400 hover:text-pink-600 transition-colors mb-6 inline-block">
          &larr; Back to AI Tools
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-bold text-pink-700 uppercase tracking-widest mb-4">
              <Hash size={14} className="text-pink-500" /> Social Media SEO
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              AI <span className="text-pink-600">Hashtag Generator</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            যেকোনো টপিকের জন্য ট্রেন্ডিং এবং ভাইরাল হ্যাশট্যাগ তৈরি করুন মাত্র এক ক্লিকে।
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
                <Tag size={16} className="text-pink-500"/> Topic / Keyword
              </label>
              <textarea
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="আপনার পোস্টের মূল বিষয়বস্তু লিখুন (যেমন: street photography, fitness tips...)"
                className="w-full h-24 bg-slate-50 border border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <BarChart2 size={16} className="text-pink-500"/> Platform Algorithm
              </label>
              <select 
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="Twitter / X">Twitter / X</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Facebook">Facebook</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Settings2 size={16} className="text-pink-500"/> Quantity
              </label>
              <select 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Mix of 20 (Best for Reach)">Mix of 20 (Best for Reach)</option>
                <option value="Max 30 (Instagram Limit)">Max 30 (Instagram Limit)</option>
                <option value="Top 5 (For LinkedIn/Twitter)">Top 5 (For LinkedIn/Twitter)</option>
                <option value="Only Niche Tags (10-15)">Only Niche Tags (10-15)</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!keyword.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 group"
            >
              <Sparkles size={18} className="text-pink-200 group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "Finding Hashtags..." : "Generate Hashtags"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-pink-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                {isGenerating ? "Analyzing Trends..." : "Viral Hashtags"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isGenerating ? (
                <button onClick={handleStop} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg">
                  <StopCircle size={14} /> Stop
                </button>
              ) : (
                <button onClick={handleCopy} disabled={!output} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg disabled:opacity-50">
                  {isCopied ? <CheckCircle2 size={14} className="text-pink-400" /> : <Copy size={14} />}
                  {isCopied ? "Copied" : "Copy All"}
                </button>
              )}
            </div>
          </div>

          <div ref={outputRef} className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar relative">
            {output ? (
              <div className="text-pink-100 font-medium text-[16px] leading-relaxed whitespace-pre-wrap bg-slate-900/50 p-6 rounded-2xl border border-slate-800 break-words">
                {output}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                <Hash size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm">
                  আপনার কি-ওয়ার্ডটি লিখে জেনারেট বাটনে ক্লিক করুন। 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}