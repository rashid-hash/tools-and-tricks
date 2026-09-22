"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Sparkles, Copy, CheckCircle2, 
  StopCircle, Settings2, FileText, 
  Minimize2, List
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function AISummarizerTool() {
  const [inputText, setInputText] = useState("");
  const [summaryLength, setSummaryLength] = useState("Short (1-2 Paragraphs)");
  const [format, setFormat] = useState("Bullet Points");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const outputRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    setOutput("");
    setIsCopied(false);

    abortControllerRef.current = new AbortController();

    try {
      const aiPrompt = `You are an expert Content Summarizer. Your task is to extract the core ideas, main points, and key takeaways from the provided text.
      
      Original Text: "${inputText}"
      Desired Length: ${summaryLength}
      Output Format: ${format}
      
      Instructions:
      1. Read the original text carefully and understand the primary message.
      2. Summarize it strictly according to the requested Length and Format.
      3. Do not lose any critical data, statistics, or main arguments.
      4. If the original text is in Bengali, write the summary in standard Bengali. If English, in English.
      5. Start directly with the summary. Do not include any introductory or concluding remarks. Give me ONLY the final summarized text.`;

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
              <FileText size={14} className="text-emerald-500" /> Content & SEO
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              AI <span className="text-emerald-600">Summarizer</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            যেকোনো বড় আর্টিকেল, খবর বা ডকুমেন্টের মূল কথাগুলো খুব সহজেই ছোট করে জেনে নিন।
          </p>
        </div>
      </div>

      {/* Main Interface */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Side: Input Panel */}
        <div className="w-full lg:w-[450px] shrink-0 flex flex-col gap-6">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
            
            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <FileText size={16} className="text-emerald-500"/> Long Text / Article
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="যে লেখাটি ছোট করতে চান তা এখানে পেস্ট করুন..."
                className="w-full h-40 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none custom-scrollbar"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                  <Minimize2 size={16} className="text-emerald-500"/> Length
                </label>
                <select 
                  value={summaryLength}
                  onChange={(e) => setSummaryLength(e.target.value)}
                  className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="Short (1-2 Paragraphs)">Short</option>
                  <option value="Medium (Detailed Summary)">Medium</option>
                  <option value="One Sentence (TL;DR)">One Sentence (TL;DR)</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                  <List size={16} className="text-emerald-500"/> Format
                </label>
                <select 
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="Bullet Points">Bullet Points</option>
                  <option value="Paragraph">Paragraph</option>
                  <option value="Executive Summary">Executive Summary</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!inputText.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 group"
            >
              <Sparkles size={18} className="text-emerald-200 group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "Summarizing..." : "Summarize Now"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {isGenerating ? "Reading text..." : "Summary Result"}
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
                  {isCopied ? "Copied" : "Copy Summary"}
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
                <Minimize2 size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm">
                  বড় কোনো লেখা পেস্ট করে Summarize বাটনে ক্লিক করুন। 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}