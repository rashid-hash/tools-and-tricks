"use client";

import React, { useState } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Type, Sparkles, Copy, Trash2, 
  CheckCircle2, ArrowUp, ArrowDown, ArrowUpRight, 
  MoveVertical, FileText, Layers, Eraser, AlignLeft
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Text Category Related Tools
const textRelatedTools: SuggestedTool[] = [
  { id: "word-counter", name: "Word Counter", desc: "Count words and characters.", icon: AlignLeft, href: "/tools/word-counter", color: "text-violet-500", bg: "bg-violet-100" },
  { id: "duplicate-remover", name: "Duplicate Remover", desc: "Remove duplicate lines.", icon: Layers, href: "/tools/duplicate-remover", color: "text-fuchsia-500", bg: "bg-fuchsia-100" },
  { id: "text-cleaner", name: "Text Cleaner", desc: "Clean and format text.", icon: Eraser, href: "/tools/text-cleaner", color: "text-pink-500", bg: "bg-pink-100" }
];

export default function CaseConverterTool() {
  const [text, setText] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  // --- Conversion Logics ---

  // 1. Sentence case: Capitalize the first letter of each sentence.
  const toSentenceCase = () => {
    if (!text) return;
    const converted = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w|\n\s*\w)/g, (c) => c.toUpperCase());
    setText(converted);
  };

  // 2. lower case: All letters small.
  const toLowerCase = () => {
    if (!text) return;
    setText(text.toLowerCase());
  };

  // 3. UPPER CASE: All letters capital.
  const toUpperCase = () => {
    if (!text) return;
    setText(text.toUpperCase());
  };

  // 4. Title Case: Capitalize the first letter of every word.
  const toTitleCase = () => {
    if (!text) return;
    const converted = text.toLowerCase().replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    setText(converted);
  };

  // 5. aLtErNaTiNg cAsE: Alternate between lower and upper case.
  const toAlternatingCase = () => {
    if (!text) return;
    const converted = text.toLowerCase().split('').map((c, i) => {
      return i % 2 === 0 ? c.toLowerCase() : c.toUpperCase();
    }).join('');
    setText(converted);
  };

  // -------------------------

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
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
          Case <span className="text-violet-600">Converter</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার যেকোনো টেক্সট বা লেখাকে এক ক্লিকেই UPPERCASE, lowercase, Title Case বা অন্যান্য ফরম্যাটে রূপান্তর করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-4 md:p-6 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60 flex flex-col gap-6">
          
          {/* Action Toolbar */}
          <div className="flex flex-wrap gap-3 bg-violet-50/50 p-4 rounded-2xl border border-violet-100">
            <button 
              onClick={toSentenceCase}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-violet-400 hover:text-violet-700 rounded-xl text-sm font-bold text-slate-600 transition-all shadow-sm"
            >
              <Type size={16} className="text-violet-500" /> Sentence case
            </button>
            <button 
              onClick={toLowerCase}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-violet-400 hover:text-violet-700 rounded-xl text-sm font-bold text-slate-600 transition-all shadow-sm"
            >
              <ArrowDown size={16} className="text-violet-500" /> lower case
            </button>
            <button 
              onClick={toUpperCase}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-violet-400 hover:text-violet-700 rounded-xl text-sm font-bold text-slate-600 transition-all shadow-sm"
            >
              <ArrowUp size={16} className="text-violet-500" /> UPPER CASE
            </button>
            <button 
              onClick={toTitleCase}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-violet-400 hover:text-violet-700 rounded-xl text-sm font-bold text-slate-600 transition-all shadow-sm"
            >
              <ArrowUpRight size={16} className="text-violet-500" /> Title Case
            </button>
            <button 
              onClick={toAlternatingCase}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-violet-400 hover:text-violet-700 rounded-xl text-sm font-bold text-slate-600 transition-all shadow-sm"
            >
              <MoveVertical size={16} className="text-violet-500" /> aLtErNaTiNg
            </button>
          </div>

          {/* Text Editor Area */}
          <div className="flex-1 flex flex-col rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-400 transition-all">
            
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <FileText size={14} /> Editor
              </span>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-2">
                  {text.length} Characters
                </span>
                <button 
                  onClick={handleCopy}
                  disabled={!text}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-violet-50 text-xs font-bold text-slate-600 hover:text-violet-700 rounded-lg transition-colors disabled:opacity-50 shadow-sm"
                >
                  {isCopied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  {isCopied ? "Copied" : "Copy"}
                </button>
                <button 
                  onClick={handleClear}
                  disabled={!text}
                  className="p-1.5 bg-white border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-lg transition-colors disabled:opacity-50 shadow-sm"
                  title="Clear Text"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here, then click the buttons above to convert the case..."
              className="w-full h-[450px] p-6 bg-transparent outline-none resize-none text-base text-slate-700 custom-scrollbar leading-relaxed"
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