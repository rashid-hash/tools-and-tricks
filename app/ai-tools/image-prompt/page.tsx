"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Sparkles, Copy, CheckCircle2, 
  StopCircle, Settings2, Image as ImageIcon, 
  Camera, Sun
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function ImagePromptTool() {
  const [topic, setTopic] = useState("");
  const [artStyle, setArtStyle] = useState("Photorealistic & Cinematic");
  const [lighting, setLighting] = useState("Dramatic Lighting");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const outputRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    setOutput("");
    setIsCopied(false);

    abortControllerRef.current = new AbortController();

    try {
      const aiPrompt = `You are an expert AI Image Prompt Designer for Midjourney v6 and DALL-E 3.
      
      Core Concept/Subject: "${topic}"
      Art Style: ${artStyle}
      Lighting/Atmosphere: ${lighting}
      
      Instructions:
      1. Write a highly detailed, descriptive, and comma-separated image prompt in English.
      2. Include vivid details about the subject, background environment, and mood.
      3. Automatically append suitable camera settings (e.g., 35mm lens, f/1.8, DSLR), rendering engines (e.g., Unreal Engine 5, Octane Render), and quality modifiers (e.g., 8k resolution, highly detailed, masterpiece) based on the chosen Art Style.
      4. Start directly with the prompt text. Do not include any introductory or concluding remarks. Give me ONLY the final prompt.`;

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
        
        await new Promise(resolve => setTimeout(resolve, Math.random() * 10 + 5));
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
        <Link href="/ai-tools" className="text-sm font-bold text-slate-400 hover:text-sky-600 transition-colors mb-6 inline-block">
          &larr; Back to AI Tools
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-700 uppercase tracking-widest mb-4">
              <ImageIcon size={14} className="text-sky-500" /> Image Prompt
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              AI <span className="text-sky-600">Image Prompt</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            Midjourney বা DALL-E এর জন্য আপনার আইডিয়া থেকে পারফেক্ট ও ডিটেইলড প্রম্পট তৈরি করুন।
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
                <Settings2 size={16} className="text-sky-500"/> Core Subject / Idea
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="কি ধরণের ছবি চান? (যেমন: A flying car in a cyberpunk city...)"
                className="w-full h-32 bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Camera size={16} className="text-sky-500"/> Art Style
              </label>
              <select 
                value={artStyle}
                onChange={(e) => setArtStyle(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-sky-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Photorealistic & Cinematic">Photorealistic & Cinematic</option>
                <option value="3D Pixar / Disney Render">3D Pixar / Disney Render</option>
                <option value="Anime / Studio Ghibli">Anime / Studio Ghibli</option>
                <option value="Cyberpunk / Sci-Fi">Cyberpunk / Sci-Fi</option>
                <option value="Oil Painting & Fine Art">Oil Painting & Fine Art</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Sun size={16} className="text-sky-500"/> Lighting & Atmosphere
              </label>
              <select 
                value={lighting}
                onChange={(e) => setLighting(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-sky-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Dramatic & Cinematic Lighting">Dramatic & Cinematic Lighting</option>
                <option value="Natural Sunlight (Golden Hour)">Natural Sunlight (Golden Hour)</option>
                <option value="Neon Lights (Dark Vibe)">Neon Lights (Dark Vibe)</option>
                <option value="Soft Studio Lighting">Soft Studio Lighting</option>
                <option value="Misty & Mysterious">Misty & Mysterious</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 group"
            >
              <Sparkles size={18} className="text-white group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "Generating..." : "Generate Image Prompt"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-sky-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                {isGenerating ? "Crafting Prompt..." : "Final Image Prompt"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {isGenerating ? (
                <button onClick={handleStop} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-lg">
                  <StopCircle size={14} /> Stop
                </button>
              ) : (
                <button onClick={handleCopy} disabled={!output} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg disabled:opacity-50">
                  {isCopied ? <CheckCircle2 size={14} className="text-sky-400" /> : <Copy size={14} />}
                  {isCopied ? "Copied" : "Copy Prompt"}
                </button>
              )}
            </div>
          </div>

          <div ref={outputRef} className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar relative">
            {output ? (
              <div className="text-slate-100 font-mono text-[15px] leading-relaxed whitespace-pre-wrap bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                {output}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                <ImageIcon size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm">
                  আপনি কেমন ছবি চাচ্ছেন তা বামপাশে লিখুন। AI সেটিকে Midjourney বা DALL-E এর উপযোগী হাই-কোয়ালিটি প্রম্পটে বদলে দেবে।
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}