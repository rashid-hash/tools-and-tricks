"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Eraser, Sparkles, Copy, Trash2, 
  CheckCircle2, FileText, AlignLeft, Layers, 
  Type, Settings2, Code, Link2, AtSign, Hash, 
  AlignJustify, UploadCloud
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Text Category Related Tools
const textRelatedTools: SuggestedTool[] = [
  { id: "word-counter", name: "Word Counter", desc: "Count words and characters.", icon: AlignLeft, href: "/tools/word-counter", color: "text-violet-500", bg: "bg-violet-100" },
  { id: "case-converter", name: "Case Converter", desc: "Change text letter cases.", icon: Type, href: "/tools/case-converter", color: "text-purple-500", bg: "bg-purple-100" },
  { id: "duplicate-remover", name: "Duplicate Remover", desc: "Remove duplicate lines.", icon: Layers, href: "/tools/duplicate-remover", color: "text-fuchsia-500", bg: "bg-fuchsia-100" }
];

export default function TextCleanerTool() {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleaning Settings State
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState<boolean>(true);
  const [removeHtmlTags, setRemoveHtmlTags] = useState<boolean>(false);
  const [removeSpecialChars, setRemoveSpecialChars] = useState<boolean>(false);
  const [removeNumbers, setRemoveNumbers] = useState<boolean>(false);
  const [removeEmails, setRemoveEmails] = useState<boolean>(false);
  const [removeUrls, setRemoveUrls] = useState<boolean>(false);

  // Core Cleaning Logic
  const handleCleanText = () => {
    if (!inputText) {
      setOutputText("");
      return;
    }

    let cleaned = inputText;

    // 1. Remove HTML Tags
    if (removeHtmlTags) {
      cleaned = cleaned.replace(/<[^>]*>?/gm, '');
    }

    // 2. Remove URLs (http/https/www)
    if (removeUrls) {
      cleaned = cleaned.replace(/https?:\/\/[^\s]+|www\.[^\s]+/g, '');
    }

    // 3. Remove Emails
    if (removeEmails) {
      cleaned = cleaned.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '');
    }

    // 4. Remove Numbers
    if (removeNumbers) {
      cleaned = cleaned.replace(/[0-9]/g, '');
    }

    // 5. Remove Special Characters & Punctuation (Unicode aware to protect Bengali/English letters)
    if (removeSpecialChars) {
      // \p{L} = Any Letter, \p{N} = Any Number. We keep letters, numbers, and whitespace.
      cleaned = cleaned.replace(/[^\p{L}\p{N}\s]/gu, '');
    }

    // 6. Remove Extra Spaces & Trim (Always do this last to clean up messes left by other removals)
    if (removeExtraSpaces) {
      cleaned = cleaned.replace(/\s+/g, ' ').trim();
    }

    setOutputText(cleaned);
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
  };

  // Helper component for styled checkboxes
  const SettingCheckbox = ({ 
    label, icon: Icon, checked, onChange 
  }: { 
    label: string, icon: any, checked: boolean, onChange: (val: boolean) => void 
  }) => (
    <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-pink-300 transition-colors group">
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${checked ? "bg-pink-500 border-pink-500" : "border-slate-300 group-hover:border-pink-400 bg-white"}`}>
        {checked && <CheckCircle2 size={12} className="text-white" />}
      </div>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="hidden" />
      <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700 select-none">
        <Icon size={14} className={checked ? "text-pink-500" : "text-slate-400"} />
        {label}
      </div>
    </label>
  );

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-bold text-pink-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-pink-500" />
          Text Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Text <span className="text-pink-500">Cleaner</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার অগোছালো টেক্সট থেকে অপ্রয়োজনীয় স্পেস, HTML ট্যাগ, লিংক বা স্পেশাল ক্যারেক্টার এক ক্লিকে মুছে ফেলে পরিষ্কার করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Settings Panel */}
          <div className="bg-pink-50/50 p-5 md:p-6 rounded-[32px] border border-pink-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
              <h3 className="text-[13px] font-bold text-pink-700 uppercase tracking-widest flex items-center gap-2">
                <Settings2 size={16} /> Filter Options
              </h3>
              
              <button 
                onClick={handleCleanText}
                disabled={!inputText}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#111827] hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-md disabled:opacity-50"
              >
                <Eraser size={16} className="text-pink-400" /> Clean Text Now
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <SettingCheckbox label="Remove Extra Spaces" icon={AlignJustify} checked={removeExtraSpaces} onChange={setRemoveExtraSpaces} />
              <SettingCheckbox label="Remove HTML Tags" icon={Code} checked={removeHtmlTags} onChange={setRemoveHtmlTags} />
              <SettingCheckbox label="Remove URLs / Links" icon={Link2} checked={removeUrls} onChange={setRemoveUrls} />
              <SettingCheckbox label="Remove Emails" icon={AtSign} checked={removeEmails} onChange={setRemoveEmails} />
              <SettingCheckbox label="Remove Numbers" icon={Hash} checked={removeNumbers} onChange={setRemoveNumbers} />
              <SettingCheckbox label="Remove Punctuation" icon={Type} checked={removeSpecialChars} onChange={setRemoveSpecialChars} />
            </div>
          </div>

          {/* Editors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
            
            {/* Input Box */}
            <div className="flex flex-col h-full rounded-[24px] border border-slate-200 overflow-hidden shadow-sm bg-white focus-within:ring-2 focus-within:ring-pink-500/20 focus-within:border-pink-400 transition-all">
              <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText size={14} /> Messy Text
                </span>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 bg-white border border-slate-200 hover:bg-pink-50 text-slate-500 hover:text-pink-600 rounded-lg transition-colors shadow-sm"
                    title="Upload TXT File"
                  >
                    <UploadCloud size={14} />
                  </button>
                  <input type="file" accept=".txt,text/plain" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  
                  <button 
                    onClick={handleClear}
                    className="p-1.5 bg-white border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-lg transition-colors shadow-sm"
                    title="Clear"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your unformatted, messy text here..."
                className="flex-1 w-full p-5 bg-transparent outline-none resize-none text-sm text-slate-700 custom-scrollbar leading-relaxed"
                spellCheck="false"
              />
            </div>

            {/* Output Box */}
            <div className="flex flex-col h-full rounded-[24px] border border-slate-200 overflow-hidden shadow-sm bg-[#0F172A] relative">
              <div className="bg-[#1E293B] border-b border-slate-700 px-5 py-2.5 flex justify-between items-center">
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Cleaned Text
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
                  placeholder="Cleaned output will appear here after clicking 'Clean Text Now'..."
                  className="w-full h-full p-5 bg-transparent outline-none resize-none text-sm text-pink-50 custom-scrollbar leading-relaxed"
                  spellCheck="false"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Sticky Sidebar */}
        <RelatedSidebar tools={textRelatedTools} />

      </div>
    </div>
  );
}