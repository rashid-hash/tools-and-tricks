"use client";

import React, { useState, useRef, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Link2, Sparkles, Copy, Trash2, 
  CheckCircle2, AlertTriangle, ArrowRightLeft, 
  UploadCloud, Terminal, Key, Clock, FileText, Globe
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Developer Utilities Related Tools
const devUtilitiesTools: SuggestedTool[] = [
  { id: "base64", name: "Base64 Encoder", desc: "Encode/Decode Base64.", icon: Terminal, href: "/tools/base64", color: "text-indigo-500", bg: "bg-indigo-100" },
  { id: "uuid-generator", name: "UUID Generator", desc: "Generate secure UUIDs.", icon: Key, href: "/tools/uuid-generator", color: "text-purple-500", bg: "bg-purple-100" },
  { id: "timestamp-converter", name: "Timestamp Converter", desc: "Convert Unix timestamps.", icon: Clock, href: "/tools/timestamp-converter", color: "text-orange-500", bg: "bg-orange-100" }
];

export default function UrlEncoderTool() {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core Conversion Logic
  const processText = (text: string, currentMode: "encode" | "decode") => {
    if (!text) {
      setOutputText("");
      setError(null);
      return;
    }

    try {
      if (currentMode === "encode") {
        // Encode URL strictly
        const encoded = encodeURIComponent(text);
        setOutputText(encoded);
        setError(null);
      } else {
        // Decode URL safely
        const decoded = decodeURIComponent(text);
        setOutputText(decoded);
        setError(null);
      }
    } catch (err) {
      setError(`Malformed URL or invalid encoded string.`);
      setOutputText("");
    }
  };

  // Re-run conversion when mode changes
  useEffect(() => {
    processText(inputText, mode);
  }, [mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    processText(val, mode);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputText(content);
      processText(content, mode);
    };
    reader.readAsText(file);
    
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleMode = () => {
    setMode(prev => prev === "encode" ? "decode" : "encode");
    if (outputText && !error) {
      setInputText(outputText);
    }
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
    setError(null);
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-sky-500" />
          Dev Utility
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          URL <span className="text-sky-500">Encoder / Decoder</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার URL বা টেক্সটকে ওয়েব-সেফ ফরম্যাটে (URL Encode) রূপান্তর করুন, অথবা এনকোড করা লিংক থেকে আসল লিংক (Decode) বের করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-4 md:p-6 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {/* Toolbar */}
          <div className="flex flex-wrap justify-between items-center bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-200 mb-6 gap-4">
            
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              <button 
                onClick={() => setMode("encode")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === "encode" ? "bg-sky-500 text-white shadow-md" : "text-slate-500 hover:bg-slate-50"}`}
              >
                Encode URL
              </button>
              <button 
                onClick={() => setMode("decode")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === "decode" ? "bg-sky-500 text-white shadow-md" : "text-slate-500 hover:bg-slate-50"}`}
              >
                Decode URL
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50 rounded-xl text-sm font-bold text-slate-600 hover:text-sky-700 transition-all shadow-sm"
              >
                <UploadCloud size={16} /> <span className="hidden sm:inline">Upload TXT</span>
              </button>
              <input type="file" accept=".txt,text/plain" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              
              <button 
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-rose-300 hover:bg-rose-50 rounded-xl text-sm font-bold text-slate-600 hover:text-rose-600 transition-all shadow-sm"
              >
                <Trash2 size={16} /> <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>

          {/* Editors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
            
            {/* Input Box */}
            <div className="flex flex-col h-full rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-400 transition-all">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText size={14} /> {mode === "encode" ? "Original String" : "Encoded String"}
                </span>
              </div>
              <textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder={mode === "encode" ? "Paste URL or text to encode (e.g. https://mockuphub.com/search?q=বাংলা)..." : "Paste encoded string to decode (e.g. %20%3F)..."}
                className="flex-1 w-full p-5 bg-transparent outline-none resize-none font-mono text-sm text-slate-700 custom-scrollbar leading-relaxed"
                spellCheck="false"
              />
            </div>

            {/* Middle Swap Button */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[20px] z-10 items-center justify-center">
              <button 
                onClick={toggleMode}
                className="w-12 h-12 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-sky-500 hover:bg-sky-50 hover:scale-110 transition-all group"
                title="Swap Encode/Decode"
              >
                <ArrowRightLeft size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>

            {/* Output Box */}
            <div className="flex flex-col h-full rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-[#0F172A] relative">
              <div className="bg-[#1E293B] border-b border-slate-700 px-4 py-2.5 flex justify-between items-center">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe size={14} /> {mode === "encode" ? "Encoded URL" : "Decoded URL"}
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
                {error ? (
                  <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-rose-500/10">
                    <AlertTriangle size={32} className="text-rose-500 mb-3" />
                    <h3 className="text-rose-500 font-bold mb-1">Error</h3>
                    <p className="text-rose-400 text-sm">{error}</p>
                  </div>
                ) : (
                  <textarea
                    value={outputText}
                    readOnly
                    placeholder={mode === "encode" ? "Encoded output will appear here..." : "Decoded text will appear here..."}
                    className="w-full h-full p-5 bg-transparent outline-none resize-none font-mono text-sm text-sky-100 custom-scrollbar break-all leading-relaxed"
                    spellCheck="false"
                  />
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Sticky Sidebar */}
        <RelatedSidebar tools={devUtilitiesTools} />

      </div>
    </div>
  );
}