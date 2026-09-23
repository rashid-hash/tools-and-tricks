"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Sparkles, Copy, CheckCircle2, 
  StopCircle, Settings2, MessageSquareReply, 
  MessageCircle, Target
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function ReplyGeneratorTool() {
  const [originalMessage, setOriginalMessage] = useState("");
  const [replyIntent, setReplyIntent] = useState("");
  const [tone, setTone] = useState("Polite & Professional");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const outputRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleGenerate = async () => {
    if (!originalMessage.trim()) return;
    
    setIsGenerating(true);
    setOutput("");
    setIsCopied(false);

    abortControllerRef.current = new AbortController();

    try {
      const aiPrompt = `You are an expert communicator and virtual assistant. Your task is to craft the perfect reply to a given message/email.
      
      Original Message Received: "${originalMessage}"
      What I want to say (Key Points): "${replyIntent || 'Generate a suitable, logical reply based on the context'}"
      Tone of Reply: ${tone}
      
      Instructions:
      1. Write a clear, concise, and highly appropriate reply based on the requested tone.
      2. Ensure it flows naturally and addresses the points raised in the original message.
      3. If the original message and intent are in Bengali, write the reply in standard Bengali. If English, in English.
      4. Start directly with the reply text. Do not include any introductory remarks, placeholders like [Your Name], or robotic AI phrasing. Just the exact text the user can copy and send.`;

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
        <Link href="/ai-tools" className="text-sm font-bold text-slate-400 hover:text-emerald-600 transition-colors mb-6 inline-block">
          &larr; Back to AI Tools
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-4">
              <MessageSquareReply size={14} className="text-emerald-500" /> Communication
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              AI <span className="text-emerald-600">Smart Reply</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            যেকোনো ইমেইল, মেসেজ বা কমেন্টের জন্য কনটেক্সট বুঝে স্মার্ট এবং প্রফেশনাল রিপ্লাই তৈরি করুন।
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
                <MessageCircle size={16} className="text-emerald-500"/> Original Message
              </label>
              <textarea
                value={originalMessage}
                onChange={(e) => setOriginalMessage(e.target.value)}
                placeholder="আপনাকে কে কী মেসেজ বা ইমেইল পাঠিয়েছে তা এখানে পেস্ট করুন..."
                className="w-full h-28 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Target size={16} className="text-emerald-500"/> What to say? (Optional)
              </label>
              <input
                type="text"
                value={replyIntent}
                onChange={(e) => setReplyIntent(e.target.value)}
                placeholder="সংক্ষেপে বলুন কী রিপ্লাই দিতে চান (যেমন: না বলে দিন / ধন্যবাদ জানান)"
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-sm font-medium text-[#111827] outline-none transition-all"
              />
            </div>

            <div className="mb-8">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Settings2 size={16} className="text-emerald-500"/> Tone of Reply
              </label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Polite & Professional">Polite & Professional (ভদ্র ও প্রফেশনাল)</option>
                <option value="Friendly & Casual">Friendly & Casual (বন্ধুত্বপূর্ণ)</option>
                <option value="Firm & Direct (Refusal)">Firm & Direct (সরাসরি / না বলা)</option>
                <option value="Witty & Sarcastic">Witty & Clever (মজার / চতুর)</option>
                <option value="Appreciative & Grateful">Appreciative (কৃতজ্ঞতা প্রকাশ)</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!originalMessage.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 group"
            >
              <Sparkles size={18} className="text-emerald-200 group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "Drafting Reply..." : "Generate Reply"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {isGenerating ? "AI is typing..." : "Smart Reply Draft"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isGenerating ? (
                <button onClick={handleStop} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg">
                  <StopCircle size={14} /> Stop
                </button>
              ) : (
                <button onClick={handleCopy} disabled={!output} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg disabled:opacity-50">
                  {isCopied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {isCopied ? "Copied" : "Copy Reply"}
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
                <MessageSquareReply size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm mt-4">
                  আপনাকে পাঠানো মেসেজটি বামপাশে পেস্ট করুন। AI আপনাকে চমৎকার একটি রিপ্লাই লিখে দেবে।
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}