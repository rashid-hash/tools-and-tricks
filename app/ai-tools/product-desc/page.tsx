"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Sparkles, Copy, CheckCircle2, 
  StopCircle, Settings2, ShoppingBag, 
  PackageSearch, Target
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function ProductDescriptionTool() {
  const [productDetails, setProductDetails] = useState("");
  const [platform, setPlatform] = useState("E-commerce Website (Daraz/Shopify)");
  const [tone, setTone] = useState("Persuasive & Sales-driven");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const outputRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleGenerate = async () => {
    if (!productDetails.trim()) return;
    
    setIsGenerating(true);
    setOutput("");
    setIsCopied(false);

    abortControllerRef.current = new AbortController();

    try {
      const aiPrompt = `You are an expert E-commerce Copywriter and Sales Strategist. Your task is to write a highly converting, SEO-optimized product description.
      
      Product Details/Features: "${productDetails}"
      Target Platform: ${platform}
      Tone/Vibe: ${tone}
      
      Instructions:
      1. Write a captivating product description that focuses on BENEFITS rather than just features.
      2. Include a catchy headline/title at the top.
      3. Use bullet points for key features/specifications to make it highly readable.
      4. Add a strong Call to Action (CTA) at the end (e.g., "Order Now", "Buy Today").
      5. Tailor the format based on the platform (e.g., short and engaging for Facebook/Instagram, detailed and SEO-focused for Shopify/Amazon).
      6. If the input is in Bengali, write the entire description in highly persuasive standard Bengali. If English, in English.
      7. Start directly with the description. Do not include any introductory or concluding remarks from the AI.`;

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
        <Link href="/ai-tools" className="text-sm font-bold text-slate-400 hover:text-violet-600 transition-colors mb-6 inline-block">
          &larr; Back to AI Tools
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-bold text-violet-700 uppercase tracking-widest mb-4">
              <ShoppingBag size={14} className="text-violet-500" /> E-Commerce & Business
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              AI <span className="text-violet-600">Product Description</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            যেকোনো প্রোডাক্টের জন্য সেলস-কনভার্টিং এবং আকর্ষণীয় ডেসক্রিপশন তৈরি করুন মুহূর্তের মধ্যেই।
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
                <PackageSearch size={16} className="text-violet-500"/> Product Details & Features
              </label>
              <textarea
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
                placeholder="প্রোডাক্টের নাম এবং এর মূল ফিচারগুলো লিখুন (যেমন: প্রিমিয়াম কটন টি-শার্ট, কালো রঙ, গরমের জন্য আরামদায়ক...)"
                className="w-full h-28 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Target size={16} className="text-violet-500"/> Target Platform
              </label>
              <select 
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-violet-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="E-commerce Website (Daraz/Shopify)">Daraz / Shopify / Website</option>
                <option value="Facebook/Instagram Post">Facebook / Instagram Page</option>
                <option value="Amazon Product Listing">Amazon Product Listing</option>
                <option value="Short Ad Copy">Short Ad Copy (বিজ্ঞাপন)</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Settings2 size={16} className="text-violet-500"/> Tone & Vibe
              </label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-violet-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Persuasive & Sales-driven">আকর্ষণীয় ও সেলস-ফোকাসড (Persuasive)</option>
                <option value="Luxury & Premium">প্রিমিয়াম ও লাক্সারি (Luxury)</option>
                <option value="Storytelling">স্টোরিটেলিং (Storytelling)</option>
                <option value="Direct & Feature-heavy">সরাসরি ও ফিচার-ফোকাসড (Direct)</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!productDetails.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 group"
            >
              <Sparkles size={18} className="text-violet-200 group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "Writing Description..." : "Generate Description"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-violet-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                {isGenerating ? "AI is generating..." : "Product Description"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isGenerating ? (
                <button onClick={handleStop} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg">
                  <StopCircle size={14} /> Stop
                </button>
              ) : (
                <button onClick={handleCopy} disabled={!output} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg disabled:opacity-50">
                  {isCopied ? <CheckCircle2 size={14} className="text-violet-400" /> : <Copy size={14} />}
                  {isCopied ? "Copied" : "Copy Content"}
                </button>
              )}
            </div>
          </div>

          <div ref={outputRef} className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar relative">
            {output ? (
              <div className="text-slate-100 text-[16px] leading-relaxed whitespace-pre-wrap bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                {output}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                <ShoppingBag size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm mt-4">
                  আপনার প্রোডাক্টের নাম এবং কয়েকটি ফিচার লিখে জেনারেট বাটনে ক্লিক করুন। 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}