"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Languages, Sparkles, Copy, CheckCircle2, 
  FileEdit, StopCircle, Settings2, AlignLeft 
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function BanglaWriterTool() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  
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
      const aiPrompt = `You are an expert Bengali Content Writer. 
      Topic: "${topic}"
      Tone: ${tone}
      Length: ${length}
      
      Instructions:
      1. Write the entire response strictly in standard Bengali (বাংলা) language.
      2. Make it high-quality, engaging, and well-structured.
      3. Start directly with the content, without any introductory chatter like "Here is your article".`;

      // Call our custom Native API Route
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

      // Here is where the REAL magic happens
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
        setOutput("দুঃখিত, একটি সমস্যা হয়েছে। দয়া করে API Key ঠিক আছে কিনা চেক করুন।");
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
      
      {/* Breadcrumb & Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/ai-tools" className="text-sm font-bold text-slate-400 hover:text-emerald-600 transition-colors mb-6 inline-block">
          &larr; Back to AI Tools
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-4">
              <Sparkles size={14} className="text-emerald-500" /> Bangla 🇧🇩
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              বাংলা <span className="text-emerald-600">AI Writer</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            সম্পূর্ণ বাংলায় যেকোনো বিষয়ের ওপর দারুণ এবং নির্ভুল আর্টিকেল, ব্লগ পোস্ট বা প্যারাগ্রাফ লিখুন।
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
                <FileEdit size={16} className="text-emerald-500"/> Topic / Prompt
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="কি সম্পর্কে লিখতে চান? (যেমন: প্রোটিন বা আমিষ কী?)"
                className="w-full h-32 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Settings2 size={16} className="text-emerald-500"/> Content Tone
              </label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Professional">Professional (প্রফেশনাল)</option>
                <option value="Casual">Casual (সাধারণ/বন্ধুত্বপূর্ণ)</option>
                <option value="Creative">Creative (সৃজনশীল)</option>
                <option value="Informative">Informative (তথ্যবহুল)</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <AlignLeft size={16} className="text-emerald-500"/> Length
              </label>
              <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1">
                {["Short", "Medium", "Long"].map(len => (
                  <button 
                    key={len}
                    onClick={() => setLength(len)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${length === len ? "bg-white text-emerald-600 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#111827] hover:bg-slate-800 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <Sparkles size={18} className="text-emerald-400 group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "Generating..." : "Generate Content"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {isGenerating ? "AI is typing..." : "AI Output"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isGenerating ? (
                <button 
                  onClick={handleStop}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg transition-colors"
                >
                  <StopCircle size={14} /> Stop
                </button>
              ) : (
                <button 
                  onClick={handleCopy}
                  disabled={!output}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isCopied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {isCopied ? "Copied" : "Copy text"}
                </button>
              )}
            </div>
          </div>

          <div 
            ref={outputRef}
            className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar relative"
          >
            {output ? (
              <div className="text-emerald-50 text-base leading-relaxed whitespace-pre-wrap">
                {output}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                <Languages size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm">
                  আপনার টপিক লিখে "Generate Content" বাটনে ক্লিক করুন। 
                  AI কিছুক্ষণের মধ্যেই ম্যাজিকের মতো কনটেন্ট তৈরি করে দেবে।
                </p>
              </div>
            )}
          </div>
          
        </div>

      </div>
    </div>
  );
}