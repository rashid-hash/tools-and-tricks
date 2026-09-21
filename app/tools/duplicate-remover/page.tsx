"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Layers, Sparkles, Copy, Trash2, 
  CheckCircle2, FileText, Eraser, AlignLeft, 
  Filter, UploadCloud, ListMinus
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Text Category Related Tools
const textRelatedTools: SuggestedTool[] = [
  { id: "word-counter", name: "Word Counter", desc: "Count words and characters.", icon: AlignLeft, href: "/tools/word-counter", color: "text-violet-500", bg: "bg-violet-100" },
  { id: "case-converter", name: "Case Converter", desc: "Change text letter cases.", icon: Type, href: "/tools/case-converter", color: "text-purple-500", bg: "bg-purple-100" },
  { id: "text-cleaner", name: "Text Cleaner", desc: "Clean and format text.", icon: Eraser, href: "/tools/text-cleaner", color: "text-pink-500", bg: "bg-pink-100" }
];

// Placeholder fix for lucide-react Type icon
import { Type } from "lucide-react";

export default function DuplicateRemoverTool() {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  
  // Settings
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [removeEmptyLines, setRemoveEmptyLines] = useState<boolean>(true);
  
  // Stats
  const [stats, setStats] = useState<{ original: number; final: number; removed: number } | null>(null);
  
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core Logic: Remove Duplicates
  const handleRemoveDuplicates = () => {
    if (!inputText) {
      setOutputText("");
      setStats(null);
      return;
    }

    let lines = inputText.split('\n');
    const originalCount = lines.length;

    if (removeEmptyLines) {
      lines = lines.filter(line => line.trim() !== '');
    }

    const seen = new Set();
    const result: string[] = [];

    for (const line of lines) {
      // If case insensitive, we compare lowercase versions
      const compareLine = caseSensitive ? line : line.toLowerCase();
      
      if (!seen.has(compareLine)) {
        seen.add(compareLine);
        result.push(line); // push the original line to preserve its original case
      }
    }

    setOutputText(result.join('\n'));
    setStats({
      original: originalCount,
      final: result.length,
      removed: originalCount - result.length
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputText(content);
    };
    reader.readAsText(file);
    
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setStats(null);
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-xs font-bold text-fuchsia-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-fuchsia-500" />
          Text Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Duplicate <span className="text-fuchsia-600">Remover</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          যেকোনো বিশাল টেক্সট বা লিস্ট থেকে ডুপ্লিকেট লাইনগুলো খুঁজে বের করে এক ক্লিকে রিমুভ করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Settings & Actions Toolbar */}
          <div className="bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${caseSensitive ? "bg-fuchsia-500 border-fuchsia-500" : "border-slate-300 group-hover:border-fuchsia-400 bg-white"}`}>
                  {caseSensitive && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="hidden" />
                <span className="text-sm font-bold text-slate-700 select-none">Case Sensitive</span>
              </label>

              <div className="hidden sm:block w-px h-5 bg-slate-200"></div>

              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${removeEmptyLines ? "bg-fuchsia-500 border-fuchsia-500" : "border-slate-300 group-hover:border-fuchsia-400 bg-white"}`}>
                  {removeEmptyLines && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <input type="checkbox" checked={removeEmptyLines} onChange={(e) => setRemoveEmptyLines(e.target.checked)} className="hidden" />
                <span className="text-sm font-bold text-slate-700 select-none">Remove Empty Lines</span>
              </label>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-fuchsia-300 hover:bg-fuchsia-50 hover:text-fuchsia-700 rounded-xl text-sm font-bold text-slate-600 transition-all shadow-sm"
              >
                <UploadCloud size={16} /> Upload TXT
              </button>
              <input type="file" accept=".txt,text/plain" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              
              <button 
                onClick={handleRemoveDuplicates}
                disabled={!inputText}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#111827] hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-md disabled:opacity-50"
              >
                <Filter size={16} className="text-fuchsia-400" /> Filter Duplicates
              </button>
            </div>

          </div>

          {/* Editors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[450px]">
            
            {/* Input Box */}
            <div className="flex flex-col h-full rounded-[24px] border border-slate-200 overflow-hidden shadow-sm bg-white focus-within:ring-2 focus-within:ring-fuchsia-500/20 focus-within:border-fuchsia-400 transition-all">
              <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <ListMinus size={14} /> Original List
                </span>
                <button 
                  onClick={handleClear}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                  title="Clear"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your list here... (each item on a new line)"
                className="flex-1 w-full p-5 bg-transparent outline-none resize-none text-sm text-slate-700 custom-scrollbar leading-relaxed"
                spellCheck="false"
              />
            </div>

            {/* Output Box */}
            <div className="flex flex-col h-full rounded-[24px] border border-slate-200 overflow-hidden shadow-sm bg-[#0F172A] relative">
              <div className="bg-[#1E293B] border-b border-slate-700 px-5 py-2.5 flex justify-between items-center">
                <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Unique List
                </span>
                
                <button 
                  onClick={handleCopy}
                  disabled={!outputText}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isCopied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {isCopied ? "Copied" : "Copy"}
                </button>
              </div>
              
              <div className="flex-1 w-full relative">
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Filtered unique lines will appear here..."
                  className="w-full h-full p-5 bg-transparent outline-none resize-none text-sm text-fuchsia-50 custom-scrollbar leading-relaxed"
                  spellCheck="false"
                />
              </div>
            </div>

          </div>

          {/* Stats Bar */}
          {stats && (
            <div className="bg-fuchsia-50 border border-fuchsia-100 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex gap-6 items-center">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase mb-0.5">Original Lines</p>
                  <p className="text-base font-bold text-slate-700">{stats.original}</p>
                </div>
                <div className="w-px h-8 bg-fuchsia-200"></div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase mb-0.5">Unique Lines</p>
                  <p className="text-base font-bold text-fuchsia-700">{stats.final}</p>
                </div>
              </div>
              
              {stats.removed > 0 ? (
                <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} /> Removed {stats.removed} duplicate {stats.removed === 1 ? 'line' : 'lines'}
                </div>
              ) : (
                <div className="px-4 py-2 bg-slate-200 text-slate-600 rounded-xl text-sm font-bold">
                  No duplicates found
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column: Sticky Sidebar */}
        <RelatedSidebar tools={textRelatedTools} />

      </div>
    </div>
  );
}