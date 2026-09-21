"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Braces, Sparkles, Copy, Trash2, 
  CheckCircle2, AlertTriangle, UploadCloud, FileJson, 
  Terminal, ShieldCheck
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Developer Category Related Tools
const developerRelatedTools: SuggestedTool[] = [
  { id: "json-formatter", name: "JSON Formatter", desc: "Format & beautify JSON.", icon: Braces, href: "/tools/json-formatter", color: "text-cyan-500", bg: "bg-cyan-100" },
  { id: "json-minifier", name: "JSON Minifier", desc: "Compress JSON data.", icon: FileJson, href: "/tools/json-minifier", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "base64", name: "Base64 Encoder", desc: "Encode/Decode Base64.", icon: Terminal, href: "/tools/base64", color: "text-indigo-500", bg: "bg-indigo-100" }
];

export default function JsonValidatorTool() {
  const [inputJson, setInputJson] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputJson(content);
      validateJSON(content);
    };
    reader.readAsText(file);
    
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Core Validation Logic
  const validateJSON = (data: string) => {
    if (!data.trim()) {
      setIsValid(null);
      setErrorMessage(null);
      return;
    }

    try {
      JSON.parse(data);
      setIsValid(true);
      setErrorMessage(null);
    } catch (err: unknown) {
      setIsValid(false);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Invalid JSON format");
      }
    }
  };

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputJson(val);
    validateJSON(val);
  };

  // Copy to Clipboard
  const handleCopy = () => {
    if (!inputJson) return;
    navigator.clipboard.writeText(inputJson);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    setInputJson("");
    setIsValid(null);
    setErrorMessage(null);
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-emerald-500" />
          Developer Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          JSON <span className="text-emerald-500">Validator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার JSON ডেটা সঠিক আছে কি না তা চেক করুন। কোনো ভুল থাকলে রিয়েল-টাইমে এরর মেসেজসহ তা ধরে ফেলুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-4 md:p-6 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {/* Toolbar */}
          <div className="flex justify-between items-center bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-200 mb-6">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 rounded-xl text-sm font-bold text-slate-600 hover:text-emerald-700 transition-all shadow-sm"
              >
                <UploadCloud size={16} /> <span className="hidden sm:inline">Upload JSON</span>
              </button>
              <input type="file" accept=".json,application/json" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              
              <button 
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-rose-300 hover:bg-rose-50 rounded-xl text-sm font-bold text-slate-600 hover:text-rose-600 transition-all shadow-sm"
              >
                <Trash2 size={16} /> <span className="hidden sm:inline">Clear</span>
              </button>
            </div>

            <button 
              onClick={handleCopy}
              disabled={!inputJson}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 rounded-xl text-sm font-bold text-slate-600 hover:text-emerald-700 transition-all shadow-sm disabled:opacity-50"
            >
              {isCopied ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
              <span className="hidden sm:inline">{isCopied ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Input Editor (Takes up more space) */}
            <div className="lg:col-span-3 flex flex-col h-[500px] rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-[#0F172A] focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-400 transition-all relative">
              <div className="bg-[#1E293B] border-b border-slate-700 px-4 py-2.5 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Braces size={14} className="text-emerald-400" /> JSON Code
                </span>
              </div>
              <textarea
                value={inputJson}
                onChange={handleInputChange}
                placeholder='Paste your JSON code here to validate...&#10;{&#10;  "status": "success",&#10;  "message": "Welcome to MockupHub"&#10;}'
                className="flex-1 w-full p-4 bg-transparent outline-none resize-none font-mono text-sm text-emerald-50 custom-scrollbar leading-relaxed"
                spellCheck="false"
              />
            </div>

            {/* Validation Status Panel (Takes up less space) */}
            <div className="lg:col-span-2 flex flex-col h-[500px] rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm relative p-6">
              <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <ShieldCheck size={16} /> Status
              </h3>
              
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                
                {isValid === null && (
                  <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                    <div className="w-20 h-20 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mb-4">
                      <FileJson size={32} className="text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">Waiting for input</h3>
                    <p className="text-sm font-medium text-slate-500 max-w-[200px]">
                      Paste your JSON on the left to instantly validate it.
                    </p>
                  </div>
                )}

                {isValid === true && (
                  <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                    <div className="w-20 h-20 bg-emerald-100 border border-emerald-200 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 size={40} className="text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-600 mb-2">Valid JSON</h3>
                    <p className="text-sm font-medium text-slate-500 max-w-[250px]">
                      Great job! Your JSON data is perfectly formatted and valid.
                    </p>
                  </div>
                )}

                {isValid === false && (
                  <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center w-full">
                    <div className="w-20 h-20 bg-rose-100 border border-rose-200 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle size={40} className="text-rose-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-rose-600 mb-3">Invalid JSON</h3>
                    
                    <div className="w-full bg-rose-50 border border-rose-200 rounded-xl p-4 text-left">
                      <p className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2">Error Details:</p>
                      <p className="text-sm font-mono text-rose-600 break-all bg-white p-3 rounded-lg border border-rose-100">
                        {errorMessage}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Sticky Sidebar */}
        <RelatedSidebar tools={developerRelatedTools} />

      </div>
    </div>
  );
}