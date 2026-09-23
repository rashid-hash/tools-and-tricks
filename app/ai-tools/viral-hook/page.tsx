"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Sparkles, Copy, CheckCircle2, 
  StopCircle, Settings2, Zap, 
  Magnet, Target
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function ViralHookTool() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("TikTok & Reels (Video)");
  const [style, setStyle] = useState("Curiosity & Question");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const outputRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    setOutput("");
    setIsCopied(false);

    abortControllerRef.current = new AbortController();

    try {
      const aiPrompt = `You are a master Copywriter and Viral Content Strategist. Your task is to generate highly engaging, attention-grabbing HOOKS (opening lines/hooks) that stop the scroll within the first 3 seconds.
      
      Topic/Idea: "${topic}"
      Target Platform: ${platform}
      Hook Style: ${style}
      
      Instructions:
      1. Generate exactly 5 to 7 powerful and punchy hooks.
      2. Tailor the hooks specifically for the requested platform's audience and format.
      3. Use psychological triggers (curiosity, FOMO, shock, value) based on the chosen Hook Style.
      4. If the topic is written in Bengali, generate the hooks in standard Bengali. If English, in English.
      5. Format the output as a clean numbered list. Start directly with the hooks. Do not include any introductory or concluding remarks.`;

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
        <Link href="/ai-tools" className="text-sm font-bold text-slate-400 hover:text-purple-600 transition-colors mb-6 inline-block">
          &larr; Back to AI Tools
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-700 uppercase tracking-widest mb-4">
              <Zap size={14} className="text-purple-500" /> Viral Strategy
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              AI <span className="text-purple-600">Viral Hook</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            ভিডিও বা পোস্টের শুরুতে অডিয়েন্সকে আটকে রাখার মতো চমকপ্রদ এবং ভাইরাল হুক জেনারেট করুন।
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
                <Target size={16} className="text-purple-500"/> Core Topic / Idea
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="কী নিয়ে ভিডিও বা পোস্ট করবেন? (যেমন: কিভাবে দ্রুত ঘুমাবো, ফ্রিল্যান্সিং এর ভুল...)"
                className="w-full h-24 bg-slate-50 border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Magnet size={16} className="text-purple-500"/> Target Platform
              </label>
              <select 
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="TikTok & Reels (Video)">TikTok / Instagram Reels</option>
                <option value="YouTube Shorts (Video)">YouTube Shorts</option>
                <option value="Twitter / X (Text)">Twitter / X</option>
                <option value="LinkedIn (Text)">LinkedIn Post</option>
                <option value="YouTube Long Form (Video)">YouTube Long Video</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Settings2 size={16} className="text-purple-500"/> Hook Style
              </label>
              <select 
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Curiosity & Question">Curiosity / Question</option>
                <option value="Controversial & Unpopular Opinion">Controversial Opinion</option>
                <option value="Shocking Fact / Statistic">Shocking Fact / Statistic</option>
                <option value="Negative Hook (Mistakes to avoid)">Negative (Mistakes to avoid)</option>
                <option value="Value & How-to">Value / How-to</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 group"
            >
              <Sparkles size={18} className="text-purple-200 group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "Brainstorming Hooks..." : "Generate Viral Hooks"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-purple-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                {isGenerating ? "AI is generating..." : "Viral Hooks"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isGenerating ? (
                <button onClick={handleStop} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg">
                  <StopCircle size={14} /> Stop
                </button>
              ) : (
                <button onClick={handleCopy} disabled={!output} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg disabled:opacity-50">
                  {isCopied ? <CheckCircle2 size={14} className="text-purple-400" /> : <Copy size={14} />}
                  {isCopied ? "Copied" : "Copy Hooks"}
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
                <Zap size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm">
                  আপনার ভিডিও বা পোস্টের টপিক লিখে Generate বাটনে ক্লিক করুন। 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}