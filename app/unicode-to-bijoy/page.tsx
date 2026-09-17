"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Type, ArrowRightLeft, Copy, Trash2, CheckCircle2, ClipboardPaste } from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

export default function UnicodeToBijoyConverter() {
  const [unicodeText, setUnicodeText] = useState("");
  const [bijoyText, setBijoyText] = useState("");
  const [copied, setCopied] = useState(false);

  // --- Core Conversion Logic (Unicode to Bijoy) ---
  const convertUnicodeToBijoy = (text: string) => {
    if (!text) return "";
    
    let str = text;
    // Basic Re-arrangements for Pre-Kars (ি, ে, ৈ)
    // This is a simplified reliable mapping for standard Bangla characters
    const mapping: { [key: string]: string } = {
      "অ": "A", "আ": "Av", "ই": "B", "ঈ": "C", "উ": "D", "ঊ": "E", "ঋ": "F", "এ": "G", "ঐ": "H", "ও": "I", "ঔ": "J",
      "ক": "K", "খ": "L", "গ": "M", "ঘ": "N", "ঙ": "O", "চ": "P", "ছ": "Q", "জ": "R", "ঝ": "S", "ঞ": "T",
      "ট": "U", "ঠ": "V", "ড": "W", "ঢ": "X", "ণ": "Y", "ত": "Z", "থ": "_", "দ": "`", "ধ": "a", "ন": "b",
      "প": "c", "ফ": "d", "ব": "e", "ভ": "f", "ম": "g", "য": "h", "র": "i", "ল": "j", "শ": "k", "ষ": "l", "স": "m", "হ": "n",
      "ড়": "o", "ঢ়": "p", "য়": "q", "ৎ": "r", "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
      "া": "v", "ি": "w", "ী": "x", "ু": "y", "ূ": "z", "ৃ": "…", "ে": "†", "ৈ": "‡", "ো": "†v", "ৌ": "‡Š",
      "ং": "s", "ঃ": "t", "ঁ": "u", "্": "&", "্য": "¨", "্র": "«", "র্": "©"
    };

    // Pre-processing Juktokkhor & Pre-Kars (Complex rules simplified for speed)
    str = str.replace(/ে/g, "†");
    str = str.replace(/ৈ/g, "‡");
    str = str.replace(/ো/g, "†v");
    str = str.replace(/ৌ/g, "‡Š");
    
    // Replace mapping
    let out = "";
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (mapping[char]) {
        out += mapping[char];
      } else {
        out += char;
      }
    }
    
    // Post-processing for ি (w) and ে (e) which sit before the consonant in Bijoy
    // Using a regex to swap the position of 'w', '†', '‡' with the preceding consonant
    out = out.replace(/([K-n])(w|†|‡)/g, "$2$1");

    return out;
  };

  // Real-time conversion
  useEffect(() => {
    setBijoyText(convertUnicodeToBijoy(unicodeText));
  }, [unicodeText]);

  const handleCopy = () => {
    if (bijoyText) {
      navigator.clipboard.writeText(bijoyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUnicodeText(text);
    } catch (error) {
      alert("Please allow clipboard access or paste manually.");
    }
  };

  const clearText = () => {
    setUnicodeText("");
    setBijoyText("");
  };

  return (
    <div className={`min-h-screen bg-[#0f172a] p-4 md:p-8 font-sans ${notoSansBengali.className} text-gray-200 pb-20`}>
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 mt-6 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
          Unicode to <span className="text-purple-500">Bijoy</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          ফেসবুক বা ওয়েবসাইটের লেখাকে এক ক্লিকেই বিজয় (SutonnyMJ) ফন্টে রূপান্তর করুন ডিজাইনের কাজের জন্য।
        </p>
      </div>

      <div className="max-w-6xl mx-auto bg-[#1e293b] rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
        
        {/* Toolbar */}
        <div className="bg-[#0f172a]/50 p-4 border-b border-gray-700/50 flex flex-wrap justify-between items-center gap-4">
           <div className="flex items-center gap-2 text-purple-400 font-semibold bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
             <Type size={18} /> Developer Text Tool
           </div>
           
           <div className="flex gap-2">
             <button onClick={handlePaste} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition font-medium">
               <ClipboardPaste size={16} /> Paste Unicode
             </button>
             <button onClick={clearText} className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm transition font-medium border border-red-500/20">
               <Trash2 size={16} /> Clear
             </button>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-700/50">
          
          {/* --- Left Box: Unicode Input --- */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col h-[400px]">
             <div className="flex justify-between items-center mb-4">
                <label className="font-bold text-gray-300 flex items-center gap-2 text-lg">
                  ইউনিকোড টেক্সট (Input)
                </label>
             </div>
             <textarea 
               value={unicodeText} 
               onChange={(e) => setUnicodeText(e.target.value)}
               placeholder="এখানে বাংলা ইউনিকোড লেখা পেস্ট বা টাইপ করুন..." 
               className="w-full flex-1 bg-[#0f172a] text-gray-100 p-5 rounded-xl border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none resize-none text-lg leading-relaxed placeholder-gray-600 transition"
             />
          </div>

          {/* --- Divider Icon --- */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-[20%]">
             <div className="bg-purple-600 text-white p-3 rounded-full shadow-lg shadow-purple-500/20 border-4 border-[#1e293b]">
               <ArrowRightLeft size={24} />
             </div>
          </div>

          {/* --- Right Box: Bijoy Output --- */}
          <div className="w-full lg:w-1/2 p-6 flex flex-col h-[400px] bg-[#1e293b] relative">
             <div className="flex justify-between items-center mb-4">
                <label className="font-bold text-purple-400 flex items-center gap-2 text-lg">
                  বিজয় টেক্সট (Output)
                </label>
                <button 
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${copied ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/20"}`}
                >
                  {copied ? <><CheckCircle2 size={16} /> Copied!</> : <><Copy size={16} /> Copy Bijoy</>}
                </button>
             </div>
             
             {/* Note: The font-family should ideally be SutonnyMJ for proper rendering, but standard ascii shows the raw converted string. */}
             <textarea 
               value={bijoyText} 
               readOnly
               placeholder="Avcbvi weRq †U·U GLv‡b ˆZwi n‡e..." 
               className="w-full flex-1 bg-[#0f172a] text-purple-200 p-5 rounded-xl border border-purple-500/30 outline-none resize-none text-xl leading-relaxed placeholder-gray-600"
               style={{ fontFamily: "Arial, sans-serif" }}
             />
             
             {/* Helper Note */}
             <div className="mt-4 bg-purple-500/10 border border-purple-500/20 p-3 rounded-lg flex items-start gap-3">
               <div className="mt-0.5 text-purple-400">💡</div>
               <p className="text-sm text-gray-400 leading-snug">
                 বিজয় টেক্সট দেখতে এখানে কিছুটা ইংরেজি অক্ষরের মতো মনে হতে পারে। কপি করে আপনার <span className="text-gray-200 font-semibold">Illustrator বা MS Word</span>-এ পেস্ট করুন এবং ফন্ট পরিবর্তন করে <span className="text-purple-300 font-semibold">SutonnyMJ</span> সিলেক্ট করুন।
               </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}