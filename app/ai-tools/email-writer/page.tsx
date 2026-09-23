"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Sparkles, Copy, CheckCircle2, 
  StopCircle, Settings2, Mail, 
  Send, User
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function EmailWriterTool() {
  const [recipient, setRecipient] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [tone, setTone] = useState("Professional & Formal");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const outputRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleGenerate = async () => {
    if (!keyPoints.trim()) return;
    
    setIsGenerating(true);
    setOutput("");
    setIsCopied(false);

    abortControllerRef.current = new AbortController();

    try {
      const aiPrompt = `You are an expert Executive Assistant and Professional Communicator. Your task is to write a highly effective, clear, and professional email.
      
      Recipient / Context: "${recipient || 'Not specified'}"
      Key Points to Include: "${keyPoints}"
      Tone: ${tone}
      
      Instructions:
      1. Provide a clear, concise, and catchy Subject Line first.
      2. Write the email body professionally, ensuring excellent flow, clarity, and readability.
      3. Use appropriate salutations (e.g., Dear [Name]) and sign-offs (e.g., Sincerely, Best regards).
      4. If the inputs are written in Bengali, write the email in standard professional Bengali. If English, in English.
      5. Format properly with paragraphs. 
      6. Start directly with "Subject: ..." and then the email body. Do not include any introductory or concluding remarks from the AI.`;

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
        
        await new Promise(resolve => setTimeout(resolve, Math.random() * 5 + 2)); // Slightly faster typing
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
              <Mail size={14} className="text-blue-500" /> Business Communication
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              AI <span className="text-blue-600">Email</span> Writer
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            বস, ক্লায়েন্ট বা অফিসের যেকোনো কাজের জন্য প্রফেশনাল এবং গোছানো ইমেইল লিখুন মাত্র কয়েক সেকেন্ডে।
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
                <User size={16} className="text-blue-500"/> Recipient / Context
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="কাকে ইমেইল করছেন? (যেমন: To my Boss for leave)"
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 text-sm font-medium text-[#111827] outline-none transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Settings2 size={16} className="text-blue-500"/> Key Points
              </label>
              <textarea
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
                placeholder="কী কী বিষয় ইমেইলে থাকতে হবে? (যেমন: আগামী সপ্তাহে ৩ দিনের ছুটি দরকার, কাজগুলো রাকিবকে বুঝিয়ে দিয়েছি...)"
                className="w-full h-28 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none"
              />
            </div>

            <div className="mb-8">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Send size={16} className="text-blue-500"/> Tone of Email
              </label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Professional & Formal">Professional & Formal (অফিশিয়াল)</option>
                <option value="Friendly & Casual">Friendly & Casual (ক্যাজুয়াল)</option>
                <option value="Persuasive (Sales/Pitch)">Persuasive (সেলস / পিচ)</option>
                <option value="Apologetic & Polite">Apologetic (ক্ষমা প্রার্থনা)</option>
                <option value="Urgent & Direct">Urgent & Direct (জরুরি)</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!keyPoints.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 group"
            >
              <Sparkles size={18} className="text-blue-200 group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "Drafting Email..." : "Generate Email"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-blue-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                {isGenerating ? "AI is typing..." : "Your Email Draft"}
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
                  {isCopied ? "Copied" : "Copy Email"}
                </button>
              )}
            </div>
          </div>

          <div ref={outputRef} className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar relative">
            {output ? (
              <div className="text-slate-100 text-[15px] leading-relaxed whitespace-pre-wrap bg-slate-900/50 p-6 rounded-2xl border border-slate-800 font-sans">
                {output}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                <Mail size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm mt-4">
                  ইমেইলে কী কী থাকতে হবে তা বামপাশে লিখে জেনারেট বাটনে ক্লিক করুন। 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}