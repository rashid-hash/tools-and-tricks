"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Braces, Sparkles, Copy, Download, Trash2, 
  CheckCircle2, AlertTriangle, UploadCloud, FileJson, 
  Settings2, Terminal
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Developer Category Related Tools
const developerRelatedTools: SuggestedTool[] = [
  { id: "json-validator", name: "JSON Validator", desc: "Check if JSON is valid.", icon: CheckCircle2, href: "/tools/json-validator", color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "json-minifier", name: "JSON Minifier", desc: "Compress JSON data.", icon: FileJson, href: "/tools/json-minifier", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "base64", name: "Base64 Encoder", desc: "Encode/Decode Base64.", icon: Terminal, href: "/tools/base64", color: "text-indigo-500", bg: "bg-indigo-100" }
];

export default function JsonFormatterTool() {
  const [inputJson, setInputJson] = useState<string>("");
  const [outputJson, setOutputJson] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [indentSpace, setIndentSpace] = useState<number>(2);
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
      formatJSON(content, indentSpace);
    };
    reader.readAsText(file);
    
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Core Formatting Logic
  const formatJSON = (data: string, spaces: number) => {
    if (!data.trim()) {
      setOutputJson("");
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(data);
      const formatted = JSON.stringify(parsed, null, spaces);
      setOutputJson(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON format");
      setOutputJson("");
    }
  };

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputJson(val);
    formatJSON(val, indentSpace);
  };

  // Handle Indent Change
  const handleIndentChange = (spaces: number) => {
    setIndentSpace(spaces);
    formatJSON(inputJson, spaces);
  };

  // Copy to Clipboard
  const handleCopy = () => {
    if (!outputJson) return;
    navigator.clipboard.writeText(outputJson);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Download JSON File
  const handleDownload = () => {
    if (!outputJson) return;
    const blob = new Blob([outputJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `formatted_${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInputJson("");
    setOutputJson("");
    setError(null);
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-cyan-500" />
          Developer Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          JSON <span className="text-cyan-600">Formatter</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার অগোছালো (Minified) JSON ডেটাকে সুন্দরভাবে ফরম্যাট বা Pretty Print করুন। ব্রাউজারের ভেতরেই রিয়েল-টাইমে কাজ করে।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-4 md:p-6 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {/* Toolbar */}
          <div className="flex flex-wrap justify-between items-center bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-200 mb-6 gap-4">
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 rounded-xl text-sm font-bold text-slate-600 hover:text-cyan-700 transition-all shadow-sm"
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

            <div className="flex items-center gap-3 bg-white px-3 py-1.5 border border-slate-200 rounded-xl">
              <Settings2 size={14} className="text-cyan-600" />
              <span className="text-xs font-bold text-slate-500 uppercase">Indent:</span>
              <select 
                value={indentSpace} 
                onChange={(e) => handleIndentChange(Number(e.target.value))}
                className="text-sm font-bold text-[#111827] bg-transparent outline-none cursor-pointer"
              >
                <option value={2}>2 Spaces</option>
                <option value={3}>3 Spaces</option>
                <option value={4}>4 Spaces</option>
              </select>
            </div>

          </div>

          {/* Editors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
            
            {/* Input Editor */}
            <div className="flex flex-col h-full rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white focus-within:ring-2 focus-within:ring-cyan-500/20 focus-within:border-cyan-400 transition-all">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Braces size={14} /> Input JSON
                </span>
              </div>
              <textarea
                value={inputJson}
                onChange={handleInputChange}
                placeholder='Paste your JSON data here...&#10;e.g. {"name":"MockupHub","type":"Tools"}'
                className="flex-1 w-full p-4 bg-transparent outline-none resize-none font-mono text-sm text-slate-700 custom-scrollbar"
                spellCheck="false"
              />
            </div>

            {/* Output Editor */}
            <div className="flex flex-col h-full rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-[#0F172A] relative">
              <div className="bg-[#1E293B] border-b border-slate-700 px-4 py-2.5 flex justify-between items-center">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileJson size={14} /> Formatted Output
                </span>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleCopy}
                    disabled={!outputJson}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
                    title="Copy to clipboard"
                  >
                    {isCopied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                  <button 
                    onClick={handleDownload}
                    disabled={!outputJson}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
                    title="Download JSON file"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 w-full relative">
                {error ? (
                  <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-rose-500/10">
                    <AlertTriangle size={32} className="text-rose-500 mb-3" />
                    <h3 className="text-rose-500 font-bold mb-1">Invalid JSON</h3>
                    <p className="text-rose-400 text-sm font-mono break-all">{error}</p>
                  </div>
                ) : (
                  <textarea
                    value={outputJson}
                    readOnly
                    placeholder="Formatted output will appear here..."
                    className="w-full h-full p-4 bg-transparent outline-none resize-none font-mono text-sm text-cyan-100 custom-scrollbar"
                    spellCheck="false"
                  />
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