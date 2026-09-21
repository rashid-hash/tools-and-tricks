"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  FileJson, Sparkles, Copy, Download, Trash2, 
  CheckCircle2, AlertTriangle, UploadCloud, 
  Minimize, Braces, Terminal, ShieldCheck
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Developer Category Related Tools
const developerRelatedTools: SuggestedTool[] = [
  { id: "json-formatter", name: "JSON Formatter", desc: "Format & beautify JSON.", icon: Braces, href: "/tools/json-formatter", color: "text-cyan-500", bg: "bg-cyan-100" },
  { id: "json-validator", name: "JSON Validator", desc: "Check if JSON is valid.", icon: ShieldCheck, href: "/tools/json-validator", color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "base64", name: "Base64 Encoder", desc: "Encode/Decode Base64.", icon: Terminal, href: "/tools/base64", color: "text-indigo-500", bg: "bg-indigo-100" }
];

export default function JsonMinifierTool() {
  const [inputJson, setInputJson] = useState<string>("");
  const [outputJson, setOutputJson] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  // Storage for size metrics
  const [stats, setStats] = useState<{ original: number; minified: number; savedPercent: string } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate Byte Size
  const getByteSize = (str: string) => new Blob([str]).size;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputJson(content);
      minifyJSON(content);
    };
    reader.readAsText(file);
    
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Core Minify Logic
  const minifyJSON = (data: string) => {
    if (!data.trim()) {
      setOutputJson("");
      setError(null);
      setStats(null);
      return;
    }

    try {
      const parsed = JSON.parse(data);
      const minified = JSON.stringify(parsed); // No spaces passed = minified!
      
      setOutputJson(minified);
      setError(null);

      // Calculate Savings
      const origSize = getByteSize(data);
      const minSize = getByteSize(minified);
      const saved = origSize > 0 ? ((origSize - minSize) / origSize) * 100 : 0;

      setStats({
        original: origSize,
        minified: minSize,
        savedPercent: saved.toFixed(1)
      });

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid JSON format");
      }
      setOutputJson("");
      setStats(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputJson(val);
    minifyJSON(val);
  };

  const handleCopy = () => {
    if (!outputJson) return;
    navigator.clipboard.writeText(outputJson);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputJson) return;
    const blob = new Blob([outputJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `minified_${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInputJson("");
    setOutputJson("");
    setError(null);
    setStats(null);
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-blue-500" />
          Developer Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          JSON <span className="text-blue-600">Minifier</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার JSON ডেটা থেকে অপ্রয়োজনীয় স্পেস এবং লাইন মুছে ফেলে ফাইল সাইজ অপ্টিমাইজ করুন।
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
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl text-sm font-bold text-slate-600 hover:text-blue-700 transition-all shadow-sm"
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

          </div>

          {/* Editors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
            
            {/* Input Editor */}
            <div className="flex flex-col h-full rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Braces size={14} /> Raw JSON
                </span>
              </div>
              <textarea
                value={inputJson}
                onChange={handleInputChange}
                placeholder='Paste your formatted JSON here...'
                className="flex-1 w-full p-4 bg-transparent outline-none resize-none font-mono text-sm text-slate-700 custom-scrollbar"
                spellCheck="false"
              />
            </div>

            {/* Output Editor */}
            <div className="flex flex-col h-full rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-[#0F172A] relative">
              <div className="bg-[#1E293B] border-b border-slate-700 px-4 py-2.5 flex justify-between items-center">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Minimize size={14} /> Minified Output
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
                    placeholder="Minified JSON will appear here..."
                    className="w-full h-full p-4 bg-transparent outline-none resize-none font-mono text-sm text-blue-100 custom-scrollbar break-all"
                    spellCheck="false"
                  />
                )}
              </div>
            </div>

          </div>

          {/* Stats Bar */}
          {stats && (
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex gap-6 items-center">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase mb-1">Original Size</p>
                  <p className="text-sm font-bold text-slate-700">{formatBytes(stats.original)}</p>
                </div>
                <div className="w-px h-8 bg-blue-200"></div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase mb-1">Minified Size</p>
                  <p className="text-sm font-bold text-blue-700">{formatBytes(stats.minified)}</p>
                </div>
              </div>
              
              {Number(stats.savedPercent) > 0 ? (
                <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} /> Saved {stats.savedPercent}% Space
                </div>
              ) : (
                <div className="px-4 py-2 bg-slate-200 text-slate-600 rounded-xl text-sm font-bold">
                  Already Minified
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column: Sticky Sidebar */}
        <RelatedSidebar tools={developerRelatedTools} />

      </div>
    </div>
  );
}