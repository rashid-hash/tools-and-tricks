"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Sparkles, Copy, CheckCircle2, 
  StopCircle, Settings2, FileSignature, 
  User, Briefcase
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function BanglaApplicationTool() {
  const [topic, setTopic] = useState("");
  const [recipient, setRecipient] = useState("প্রধান শিক্ষক / অধ্যক্ষ");
  const [tone, setTone] = useState("অত্যন্ত বিনয়ী ও প্রফেশনাল (Formal)");
  
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
      const aiPrompt = `You are an expert in formal Bengali letter and application writing. Your task is to write a flawless, professional, and properly formatted application (দরখাস্ত) in Bengali.
      
      Subject/Topic: "${topic}"
      Recipient: ${recipient}
      Tone: ${tone}
      
      Instructions:
      1. Write the application entirely in standard, formal Bengali (প্রমিত বাংলা).
      2. Follow the traditional Bengali application format exactly:
         - Date (আজকের তারিখ)
         - Recipient (বরাবর, [Recipient])
         - Address/Institution Name (প্রতিষ্ঠানের নাম/ঠিকানা - use placeholders like [প্রতিষ্ঠানের নাম] if unknown)
         - Subject (বিষয়: [Topic])
         - Salutation (জনাব / মহোদয়,)
         - Body Paragraph(s) starting with "বিনীত নিবেদন এই যে..." or similar formal openings.
         - Closing (অতএব, বিনীত প্রার্থনা...)
         - Sign-off (বিনীত নিবেদক, [আপনার নাম])
      3. Make the language highly respectful and professional.
      4. Start directly with the application text (from the Date). Do not include any introductory remarks.`;

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
        <Link href="/ai-tools" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors mb-6 inline-block">
          &larr; Back to AI Tools
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20 text-xs font-bold text-slate-700 uppercase tracking-widest mb-4">
              <FileSignature size={14} className="text-slate-500" /> Formal Writing
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              বাংলা <span className="text-blue-600">Application</span> Writer
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            অফিস, স্কুল বা কলেজের জন্য নিখুঁত ফরম্যাটে প্রফেশনাল বাংলা দরখাস্ত বা চিঠি তৈরি করুন।
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
                <Briefcase size={16} className="text-blue-500"/> আবেদনের বিষয়
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="কী বিষয়ে দরখাস্ত লিখতে চান? (যেমন: ৩ দিনের ছুটির আবেদন, ট্রান্সফার সার্টিফিকেট...)"
                className="w-full h-28 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <User size={16} className="text-blue-500"/> প্রাপক (কার বরাবর)
              </label>
              <select 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="প্রধান শিক্ষক / অধ্যক্ষ (স্কুল/কলেজ)">প্রধান শিক্ষক / অধ্যক্ষ (স্কুল/কলেজ)</option>
                <option value="ম্যানেজার / বস (অফিস)">ম্যানেজার / বস (অফিস)</option>
                <option value="চেয়ারম্যান / মেয়র (সরকারি)">চেয়ারম্যান / মেয়র (সরকারি)</option>
                <option value="থানার ওসি (থানা/পুলিশ)">থানার ওসি (জিডি/অভিযোগ)</option>
                <option value="বরাবর (সাধারণ)">বরাবর (সাধারণ)</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Settings2 size={16} className="text-blue-500"/> আবেদনের ধরন
              </label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="অত্যন্ত বিনয়ী ও প্রফেশনাল (Formal & Polite)">অত্যন্ত বিনয়ী ও প্রফেশনাল</option>
                <option value="জরুরি ও তাত্ক্ষণিক (Urgent)">জরুরি ও তাত্ক্ষণিক</option>
                <option value="অভিযোগ পত্র (Complaint)">অভিযোগ পত্র (Complaint)</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 group"
            >
              <Sparkles size={18} className="text-blue-400 group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "দরখাস্ত লেখা হচ্ছে..." : "দরখাস্ত তৈরি করুন"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-blue-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                {isGenerating ? "AI লিখছে..." : "আপনার দরখাস্ত"}
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
                  {isCopied ? "Copied" : "Copy Application"}
                </button>
              )}
            </div>
          </div>

          <div ref={outputRef} className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar relative">
            {output ? (
              <div className="text-slate-100 text-[16px] leading-relaxed whitespace-pre-wrap bg-slate-900/50 p-6 rounded-2xl border border-slate-800 font-medium">
                {output}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                <FileSignature size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm mt-4">
                  আপনার আবেদনের বিষয় লিখে 'দরখাস্ত তৈরি করুন' বাটনে ক্লিক করুন। 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}