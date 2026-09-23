"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Sparkles, Copy, CheckCircle2, 
  StopCircle, Settings2, Hash, 
  Share2, MessageSquareText
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function CaptionGeneratorTool() {
  const [context, setContext] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Engaging & Trendy");
  const [hashtags, setHashtags] = useState("Moderate (3-5)");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const outputRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleGenerate = async () => {
    if (!context.trim()) return;
    
    setIsGenerating(true);
    setOutput("");
    setIsCopied(false);

    abortControllerRef.current = new AbortController();

    try {
      const aiPrompt = `You are a top-tier Social Media Manager and Expert Copywriter. Your task is to write a highly converting, professional, and viral-worthy caption for ${platform}.
      
      Topic/Context/Image Description: "${context}"
      Desired Tone: ${tone}
      Hashtag Quantity: ${hashtags}
      
      Instructions:
      1. Write a captivating caption perfectly tailored for the specific algorithm and audience of ${platform}.
      2. Start with a strong Hook (first line) to stop the user from scrolling.
      3. Include relevant and aesthetically pleasing emojis naturally (don't overdo it unless requested).
      4. Include a clear Call to Action (CTA) at the end (e.g., "Link in bio", "Comment below", "Save this post").
      5. Add highly relevant SEO-optimized hashtags based on the requested quantity.
      6. If the context is written in Bengali, generate the caption in standard Bengali. If English, in English.
      7. Start directly with the caption. Do not include any intro like "Here is your caption".`;

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
        <Link href="/ai-tools" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors mb-6 inline-block">
          &larr; Back to AI Tools
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-700 uppercase tracking-widest mb-4">
              <Share2 size={14} className="text-blue-500" /> Social Media
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              AI <span className="text-blue-600">Caption Generator</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            ইন্সটাগ্রাম, ফেসবুক বা লিঙ্কডইনের জন্য প্রফেশনাল, এনগেজিং এবং ভাইরাল ক্যাপশন তৈরি করুন।
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
                <MessageSquareText size={16} className="text-blue-500"/> Topic / Image Description
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="আপনার পোস্টের মূল বিষয়বস্তু বা ছবির বর্ণনা দিন (যেমন: নতুন অফিসে জয়েন করলাম...)"
                className="w-full h-28 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Share2 size={16} className="text-blue-500"/> Social Platform
              </label>
              <select 
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="LinkedIn">LinkedIn (Professional)</option>
                <option value="Twitter / X">Twitter / X (Short)</option>
                <option value="TikTok">TikTok</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                  <Settings2 size={16} className="text-blue-500"/> Tone
                </label>
                <select 
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="Engaging & Trendy">Engaging</option>
                  <option value="Highly Professional">Professional</option>
                  <option value="Funny & Witty">Funny & Witty</option>
                  <option value="Storytelling & Deep">Storytelling</option>
                  <option value="Minimalist & Short">Minimalist</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                  <Hash size={16} className="text-blue-500"/> Hashtags
                </label>
                <select 
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="Moderate (3-5)">Moderate (3-5)</option>
                  <option value="High (10-15)">High (10-15)</option>
                  <option value="None">No Hashtags</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!context.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 group"
            >
              <Sparkles size={18} className="text-blue-200 group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "Writing Caption..." : "Generate Caption"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-blue-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                {isGenerating ? "AI is typing..." : "Your Custom Caption"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isGenerating ? (
                <button onClick={handleStop} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg">
                  <StopCircle size={14} /> Stop
                </button>
              ) : (
                <button onClick={handleCopy} disabled={!output} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg disabled:opacity-50">
                  {isCopied ? <CheckCircle2 size={14} className="text-blue-400" /> : <Copy size={14} />}
                  {isCopied ? "Copied" : "Copy Caption"}
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
                <MessageSquareText size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm">
                  আপনার ছবি বা পোস্টের বিষয়বস্তু লিখুন। AI আপনাকে চমৎকার একটি সোশ্যাল মিডিয়া ক্যাপশন লিখে দেবে।
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}