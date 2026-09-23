"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Sparkles, Copy, CheckCircle2, 
  StopCircle, Settings2, Image as ImageIcon, 
  MessageCircle, Heart
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function BanglaCaptionTool() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Facebook");
  const [tone, setTone] = useState("ইমোশনাল ও গভীর (Emotional)");
  
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
      const aiPrompt = `You are a native Bengali social media expert and creative writer. Your task is to write a beautiful, highly engaging Bengali caption for a social media post.
      
      Topic/Image Description: "${topic}"
      Platform: ${platform}
      Tone/Vibe: ${tone}
      
      Instructions:
      1. Write the entire caption strictly in standard, natural-sounding Bengali (বাংলা).
      2. Match the requested tone perfectly (e.g., if romantic, use poetic Bengali words; if funny, use casual trendy Bengali).
      3. Include relevant emojis naturally.
      4. Add 3-5 relevant hashtags at the end (mix of Bengali and English hashtags).
      5. Start directly with the caption. Do not include any introductory remarks like "Here is your caption".`;

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
        <Link href="/ai-tools" className="text-sm font-bold text-slate-400 hover:text-green-600 transition-colors mb-6 inline-block">
          &larr; Back to AI Tools
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-bold text-green-700 uppercase tracking-widest mb-4">
              <Sparkles size={14} className="text-green-500" /> Bangla Social 🇧🇩
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              বাংলা <span className="text-green-600">Caption</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            ফেসবুক বা ইন্সটাগ্রামের ছবির জন্য আকর্ষণীয় এবং সুন্দর বাংলা ক্যাপশন তৈরি করুন।
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
                <ImageIcon size={16} className="text-green-500"/> ছবির বিষয়বস্তু
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="ছবিটি কীসের বা আপনার মনের ভাব লিখুন (যেমন: বৃষ্টির দিনে চায়ের কাপ, বন্ধুদের সাথে আড্ডা...)"
                className="w-full h-28 bg-slate-50 border border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <MessageCircle size={16} className="text-green-500"/> প্ল্যাটফর্ম
              </label>
              <select 
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-green-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Facebook">Facebook (ফেসবুক)</option>
                <option value="Instagram">Instagram (ইন্সটাগ্রাম)</option>
                <option value="WhatsApp Status">WhatsApp Status</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Heart size={16} className="text-green-500"/> ক্যাপশনের ধরন (Tone)
              </label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-green-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Emotional & Deep">ইমোশনাল ও গভীর (Emotional)</option>
                <option value="Poetic & Romantic">কাব্যিক ও রোমান্টিক (Poetic)</option>
                <option value="Funny & Casual">মজার ও ট্রেন্ডি (Funny)</option>
                <option value="Motivational">অনুপ্রেরণামূলক (Motivational)</option>
                <option value="Attitude & Smart">স্মার্ট ও অ্যাটিটিউড (Attitude)</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 group"
            >
              <Sparkles size={18} className="text-green-200 group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "ক্যাপশন তৈরি হচ্ছে..." : "ক্যাপশন জেনারেট করুন"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-green-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-green-400 uppercase tracking-wider">
                {isGenerating ? "AI লিখছে..." : "আপনার ক্যাপশন"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isGenerating ? (
                <button onClick={handleStop} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg">
                  <StopCircle size={14} /> Stop
                </button>
              ) : (
                <button onClick={handleCopy} disabled={!output} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg disabled:opacity-50">
                  {isCopied ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
                  {isCopied ? "Copied" : "Copy Caption"}
                </button>
              )}
            </div>
          </div>

          <div ref={outputRef} className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar relative">
            {output ? (
              <div className="text-green-50 text-[16px] leading-relaxed whitespace-pre-wrap bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                {output}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                <MessageCircle size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm mt-4">
                  আপনার ছবির বিষয়বস্তু লিখে 'ক্যাপশন জেনারেট করুন' বাটনে ক্লিক করুন। 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}