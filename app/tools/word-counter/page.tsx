"use client";

import React, { useState } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Type, Sparkles, Copy, Trash2, 
  CheckCircle2, AlignLeft, LayoutList, 
  Clock, Hash, WholeWord, Eraser, Layers
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Text Category Related Tools
const textRelatedTools: SuggestedTool[] = [
  { id: "case-converter", name: "Case Converter", desc: "Change text letter cases.", icon: Type, href: "/tools/case-converter", color: "text-violet-500", bg: "bg-violet-100" },
  { id: "duplicate-remover", name: "Duplicate Remover", desc: "Remove duplicate lines.", icon: Layers, href: "/tools/duplicate-remover", color: "text-fuchsia-500", bg: "bg-fuchsia-100" },
  { id: "text-cleaner", name: "Text Cleaner", desc: "Clean and format text.", icon: Eraser, href: "/tools/text-cleaner", color: "text-pink-500", bg: "bg-pink-100" }
];

export default function WordCounterTool() {
  const [text, setText] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  // Core Counting Logic
  const calculateStats = () => {
    const trimmedText = text.trim();
    
    // Words: Split by one or more whitespace characters
    const wordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
    
    // Characters: Total length including spaces
    const charCount = text.length;
    
    // Characters without spaces
    const charNoSpacesCount = text.replace(/\s/g, '').length;
    
    // Paragraphs: Split by one or more newline characters
    const paragraphCount = trimmedText ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
    
    // Sentences: Split by . ! or ? 
    const sentenceCount = trimmedText ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    
    // Reading Time: Average 200 words per minute
    const readingTime = Math.ceil(wordCount / 200);

    return { wordCount, charCount, charNoSpacesCount, paragraphCount, sentenceCount, readingTime };
  };

  const stats = calculateStats();

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(prev => prev + clipboardText);
    } catch (err) {
      alert("Failed to read clipboard contents.");
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-bold text-violet-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-violet-500" />
          Text Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Word & Character <span className="text-violet-600">Counter</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          যেকোনো টেক্সট বা প্যারাগ্রাফের শব্দ, অক্ষর, বাক্য এবং পড়ার সময় (Reading Time) রিয়েল-টাইমে গণনা করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Top Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Words Card */}
            <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mb-3">
                <WholeWord size={20} />
              </div>
              <span className="text-3xl font-extrabold text-[#111827]">{stats.wordCount}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Words</span>
            </div>

            {/* Characters Card */}
            <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                <Type size={20} />
              </div>
              <span className="text-3xl font-extrabold text-[#111827]">{stats.charCount}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Characters</span>
            </div>

            {/* Sentences Card */}
            <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
                <AlignLeft size={20} />
              </div>
              <span className="text-3xl font-extrabold text-[#111827]">{stats.sentenceCount}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Sentences</span>
            </div>

            {/* Paragraphs Card */}
            <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-3">
                <LayoutList size={20} />
              </div>
              <span className="text-3xl font-extrabold text-[#111827]">{stats.paragraphCount}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Paragraphs</span>
            </div>

          </div>

          {/* Text Editor Area */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60 overflow-hidden">
            
            {/* Toolbar */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
                <span className="flex items-center gap-1.5"><Hash size={16} className="text-violet-500"/> {stats.charNoSpacesCount} Chars (no space)</span>
                <div className="w-px h-4 bg-slate-300"></div>
                <span className="flex items-center gap-1.5"><Clock size={16} className="text-violet-500"/> ~{stats.readingTime} min read</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePaste}
                  className="px-4 py-2 bg-white border border-slate-200 hover:border-violet-300 hover:bg-violet-50 rounded-xl text-sm font-bold text-slate-600 hover:text-violet-700 transition-all shadow-sm"
                >
                  Paste
                </button>
                <button 
                  onClick={handleCopy}
                  disabled={!text}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-violet-300 hover:bg-violet-50 rounded-xl text-sm font-bold text-slate-600 hover:text-violet-700 transition-all shadow-sm disabled:opacity-50"
                >
                  {isCopied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  <span className="hidden sm:inline">{isCopied ? "Copied" : "Copy"}</span>
                </button>
                <button 
                  onClick={handleClear}
                  disabled={!text}
                  className="p-2.5 bg-white border border-slate-200 hover:border-rose-300 hover:bg-rose-50 rounded-xl text-slate-600 hover:text-rose-600 transition-all shadow-sm disabled:opacity-50"
                  title="Clear Text"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here to start counting..."
              className="w-full h-[400px] p-6 bg-transparent outline-none resize-none text-base text-slate-700 custom-scrollbar leading-relaxed"
              spellCheck="false"
            />
          </div>

        </div>

        {/* Right Column: Sticky Sidebar */}
        <RelatedSidebar tools={textRelatedTools} />

      </div>
    </div>
  );
}