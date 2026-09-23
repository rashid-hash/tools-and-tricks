"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Sparkles, Copy, CheckCircle2, 
  StopCircle, Settings2, Video, 
  Clock, Mic
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function ReelScriptTool() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram Reels");
  const [duration, setDuration] = useState("30 Seconds");
  const [tone, setTone] = useState("Energetic & Fast-paced");
  
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
      const aiPrompt = `You are a viral short-form video expert and scriptwriter. Your task is to write a highly engaging script for ${platform}.
      
      Topic/Idea: "${topic}"
      Video Duration: ${duration}
      Vibe/Tone: ${tone}
      
      Instructions:
      1. Create a script with a powerful 3-second HOOK to grab attention instantly.
      2. Structure the script clearly with "Visuals/On-Screen Text" and "Audio/Voiceover" cues.
      3. Keep the word count appropriate for the chosen duration (approx. 130-150 words per minute).
      4. Include a strong Call to Action (CTA) at the end (e.g., Subscribe, Follow, Share).
      5. If the topic is written in Bengali, generate the script in standard Bengali. If English, in English.
      6. Start directly with the script. Do not include any introductory or concluding remarks.`;

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
        <Link href="/ai-tools" className="text-sm font-bold text-slate-400 hover:text-red-600 transition-colors mb-6 inline-block">
          &larr; Back to AI Tools
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-700 uppercase tracking-widest mb-4">
              <Video size={14} className="text-red-500" /> Video Creation
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              AI <span className="text-red-600">Reel Script</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            Instagram Reels, Shorts বা TikTok এর জন্য ভাইরাল এবং এনার্জেটিক ভিডিও স্ক্রিপ্ট তৈরি করুন।
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
                <Mic size={16} className="text-red-500"/> Video Topic / Idea
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="ভিডিওটি কী নিয়ে হবে? (যেমন: ৫টি ফিটনেস টিপস, কিভাবে ফ্রিল্যান্সিং শুরু করবেন...)"
                className="w-full h-24 bg-slate-50 border border-slate-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Video size={16} className="text-red-500"/> Platform
              </label>
              <select 
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-red-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Instagram Reels">Instagram Reels</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
                <option value="TikTok">TikTok</option>
                <option value="Facebook Reels">Facebook Reels</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                  <Clock size={16} className="text-red-500"/> Duration
                </label>
                <select 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-red-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="15 Seconds">15 Seconds (Fast)</option>
                  <option value="30 Seconds">30 Seconds</option>
                  <option value="60 Seconds">60 Seconds (Max)</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                  <Settings2 size={16} className="text-red-500"/> Vibe / Tone
                </label>
                <select 
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-red-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="Energetic & Fast-paced">Energetic</option>
                  <option value="Educational & Calm">Educational</option>
                  <option value="Funny & Entertaining">Funny</option>
                  <option value="Storytelling">Storytelling</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 group"
            >
              <Sparkles size={18} className="text-red-200 group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "Writing Script..." : "Generate Script"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-red-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                {isGenerating ? "AI is scripting..." : "Final Video Script"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isGenerating ? (
                <button onClick={handleStop} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg">
                  <StopCircle size={14} /> Stop
                </button>
              ) : (
                <button onClick={handleCopy} disabled={!output} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg disabled:opacity-50">
                  {isCopied ? <CheckCircle2 size={14} className="text-red-400" /> : <Copy size={14} />}
                  {isCopied ? "Copied" : "Copy Script"}
                </button>
              )}
            </div>
          </div>

          <div ref={outputRef} className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar relative">
            {output ? (
              <div className="text-slate-100 font-medium text-[15px] leading-relaxed whitespace-pre-wrap bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                {output}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                <Video size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm">
                  আপনার ভিডিওর টপিক লিখে জেনারেট বাটনে ক্লিক করুন। 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}