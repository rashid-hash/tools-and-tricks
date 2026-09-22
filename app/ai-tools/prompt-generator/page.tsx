"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Sparkles, Copy, CheckCircle2, 
  StopCircle, Settings2, TerminalSquare, 
  Wand2, Image as ImageIcon, MessageSquare
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

export default function PromptGeneratorTool() {
  const [topic, setTopic] = useState("");
  const [targetModel, setTargetModel] = useState("Midjourney (Image)");
  const [style, setStyle] = useState("Cinematic");
  
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
      // Dynamic System Prompt for generating prompts
      const aiPrompt = `You are an expert Prompt Engineer. Your task is to generate a highly detailed, optimized, and professional prompt for the following AI model: ${targetModel}.
      
      Topic/Idea: "${topic}"
      Style/Vibe: ${style}
      
      Instructions:
      1. If it's an Image model (Midjourney/DALL-E), include lighting, camera angles, atmosphere, resolution, and stylistic keywords.
      2. If it's a Text model (ChatGPT/Claude), create a structured prompt with a clear persona, task, context, and format requirements.
      3. Write the prompt in English.
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
        <Link href="/ai-tools" className="text-sm font-bold text-slate-400 hover:text-violet-600 transition-colors mb-6 inline-block">
          &larr; Back to AI Tools
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-bold text-violet-700 uppercase tracking-widest mb-4">
              <TerminalSquare size={14} className="text-violet-500" /> Prompt Engineering
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight flex items-center gap-3">
              AI <span className="text-violet-600">Prompt Generator</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium max-w-sm">
            ChatGPT, Midjourney বা DALL-E এর জন্য বেস্ট কোয়ালিটির প্রম্পট তৈরি করুন মাত্র এক ক্লিকে।
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
                <Wand2 size={16} className="text-violet-500"/> Core Idea / Subject
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: A futuristic cyberpunk city during heavy rain with neon lights..."
                className="w-full h-32 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl p-4 text-sm font-medium text-[#111827] outline-none transition-all resize-none"
              />
            </div>

            <div className="mb-6">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Settings2 size={16} className="text-violet-500"/> Target AI Model
              </label>
              <select 
                value={targetModel}
                onChange={(e) => setTargetModel(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-violet-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <optgroup label="Image Models">
                  <option value="Midjourney (Image)">Midjourney v6</option>
                  <option value="DALL-E 3 (Image)">DALL-E 3</option>
                  <option value="Stable Diffusion (Image)">Stable Diffusion</option>
                </optgroup>
                <optgroup label="Text Models">
                  <option value="ChatGPT (Text)">ChatGPT / GPT-4</option>
                  <option value="Claude 3 (Text)">Claude 3</option>
                </optgroup>
              </select>
            </div>

            <div className="mb-8">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <ImageIcon size={16} className="text-violet-500"/> Aesthetic / Style
              </label>
              <select 
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-violet-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="Cinematic & Photorealistic">Cinematic & Photorealistic</option>
                <option value="Anime / Manga Studio">Anime / Manga Style</option>
                <option value="3D Pixar/Disney Render">3D Pixar/Disney Render</option>
                <option value="Professional & Corporate">Professional (For Text)</option>
                <option value="Creative & Storytelling">Creative (For Text)</option>
              </select>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl disabled:opacity-50 group"
            >
              <Sparkles size={18} className="text-white group-hover:scale-110 transition-transform" /> 
              {isGenerating ? "Optimizing Prompt..." : "Generate Prompt"}
            </button>
          </div>
        </div>

        {/* Right Side: Output Panel */}
        <div className="flex-1 w-full bg-[#0F172A] rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.15)] border border-slate-700/50 flex flex-col overflow-hidden h-[600px] relative">
          
          <div className="bg-[#1E293B] border-b border-slate-700 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? "bg-violet-400 animate-pulse" : "bg-slate-500"}`}></div>
              <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                {isGenerating ? "Crafting Prompt..." : "Generated Prompt"}
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
                <TerminalSquare size={48} className="mb-4 text-slate-600" />
                <p className="font-medium text-center max-w-sm">
                  আপনার আইডিয়া বা টপিকটি বামপাশে লিখুন। AI আপনার জন্য একদম প্রফেশনাল প্রম্পট জেনারেট করে দেবে।
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}