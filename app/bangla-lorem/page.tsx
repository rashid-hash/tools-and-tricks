"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { AlignLeft, Copy, CheckCircle2, RefreshCw, Hash, Type, FileText } from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

// বাংলা ডামি শব্দের বিশাল ভাণ্ডার
const banglaWords = [
  "আমরা", "সবাই", "দেশের", "উন্নয়নে", "কাজ", "করে", "যাচ্ছি", "আমাদের", "লক্ষ্য", "হলো", "একটি", "সুন্দর", 
  "ভবিষ্যত", "তৈরি", "করা", "যেখানে", "সমান", "অধিকার", "পাবে", "শিক্ষার", "হার", "বাড়াতে", "হবে", "যেন", 
  "সচেতন", "হয়", "প্রযুক্তির", "বিকাশ", "জীবনকে", "সহজ", "করেছে", "তবে", "এর", "সঠিক", "ব্যবহার", "নিশ্চিত", 
  "করতে", "প্রকৃতির", "সৌন্দর্য", "মুগ্ধ", "করে", "তাই", "পরিবেশ", "রক্ষায়", "এগিয়ে", "আসতে", "প্রতিদিন", 
  "নতুন", "কিছু", "শেখার", "চেষ্টা", "করুন", "জ্ঞানই", "শক্তি", "যা", "অন্ধকার", "থেকে", "আলোর", "পথে", 
  "নিয়ে", "যায়", "সময়ের", "মূল্য", "দিতে", "শিখুন", "কারণ", "হারানো", "সময়", "আর", "ফিরে", "আসে", "না",
  "মানুষ", "মানুষের", "জন্য", "জীবন", "সংগ্রামের", "অন্য", "নাম", "পৃথিবী", "খুবই", "রহস্যময়", "স্থান", "বিজ্ঞান",
  "প্রযুক্তি", "শিল্প", "সাহিত্য", "সংস্কৃতি", "বই", "পড়া", "মানুষকে", "জ্ঞানী", "করে", "তোলে"
];

export default function BanglaLoremIpsum() {
  const [count, setCount] = useState<number>(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [generatedText, setGeneratedText] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // 랜덤 শব্দ বাছাই করা
  const getRandomWord = () => banglaWords[Math.floor(Math.random() * banglaWords.length)];

  // বাক্য তৈরি করা (৮ থেকে ১৫ শব্দের মধ্যে)
  const generateSentence = () => {
    const wordCount = Math.floor(Math.random() * 8) + 8; 
    let sentence = "";
    for (let i = 0; i < wordCount; i++) {
      sentence += getRandomWord() + (i === wordCount - 1 ? "" : " ");
    }
    return sentence + "।";
  };

  // অনুচ্ছেদ (প্যারাগ্রাফ) তৈরি করা (৪ থেকে ৭ বাক্যের মধ্যে)
  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 4) + 4;
    let paragraph = "";
    for (let i = 0; i < sentenceCount; i++) {
      paragraph += generateSentence() + (i === sentenceCount - 1 ? "" : " ");
    }
    return paragraph;
  };

  // মূল জেনারেশন ফাংশন
  const generateText = () => {
    setIsGenerating(true);
    let result = "";

    setTimeout(() => {
      if (type === "words") {
        for (let i = 0; i < count; i++) {
          result += getRandomWord() + (i === count - 1 ? "" : " ");
        }
      } else if (type === "sentences") {
        for (let i = 0; i < count; i++) {
          result += generateSentence() + (i === count - 1 ? "" : " ");
        }
      } else if (type === "paragraphs") {
        for (let i = 0; i < count; i++) {
          result += generateParagraph() + (i === count - 1 ? "" : "\n\n");
        }
      }

      setGeneratedText(result);
      setIsGenerating(false);
      setCopied(false);
    }, 300); // 300ms ডিলিট স্মুথ ট্রানজিশনের জন্য
  };

  // প্রথমবার লোড হওয়ার সময় জেনারেট করা
  useEffect(() => {
    generateText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // কপি টু ক্লিপবোর্ড
  const handleCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 p-4 md:p-8 font-sans ${notoSansBengali.className} text-gray-800 pb-20`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10 mt-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
          Bangla <span className="text-teal-600">Lorem Ipsum</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
          ওয়েব ডিজাইন বা ডেভেলপমেন্টের ডেমো কাজে ব্যবহারের জন্য সুন্দর ও অর্থবোধক বাংলা ডামি টেক্সট তৈরি করুন।
        </p>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        
        {/* --- Controls Box --- */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-center gap-4 md:gap-6 relative overflow-hidden z-10">
           
           {/* Amount Input */}
           <div className="flex flex-col gap-1 w-full md:w-auto">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5"><Hash size={14}/> Amount</label>
             <input 
               type="number" 
               min="1" 
               max="100" 
               value={count} 
               onChange={(e) => setCount(Number(e.target.value))}
               className="border-2 border-gray-200 p-3 rounded-xl font-bold text-gray-800 focus:ring-4 focus:ring-teal-100 focus:border-teal-500 outline-none w-full md:w-32 text-center text-lg"
             />
           </div>

           {/* Type Selector */}
           <div className="flex flex-col gap-1 w-full md:w-auto flex-1">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5"><AlignLeft size={14}/> Generate Type</label>
             <div className="flex bg-gray-100 rounded-xl p-1.5">
                <button 
                  onClick={() => setType("paragraphs")} 
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${type === "paragraphs" ? "bg-white text-teal-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <FileText size={16}/> Paragraphs
                </button>
                <button 
                  onClick={() => setType("sentences")} 
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${type === "sentences" ? "bg-white text-teal-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <AlignLeft size={16}/> Sentences
                </button>
                <button 
                  onClick={() => setType("words")} 
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${type === "words" ? "bg-white text-teal-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <Type size={16}/> Words
                </button>
             </div>
           </div>

           {/* Generate Button */}
           <div className="w-full md:w-auto mt-5 md:mt-0 pt-1">
             <button 
               onClick={generateText} 
               className="w-full md:w-auto bg-teal-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-teal-200 hover:bg-teal-700 hover:shadow-teal-300 transition-all flex items-center justify-center gap-2"
             >
               <RefreshCw size={18} className={isGenerating ? "animate-spin" : ""} /> Generate
             </button>
           </div>
        </div>

        {/* --- Output Box --- */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden flex flex-col relative">
           
           {/* Top Toolbar */}
           <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm">
                <FileText size={18} className="text-teal-500" />
                Generated Result
              </div>
              <button 
                onClick={handleCopy}
                disabled={!generatedText}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${copied ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                {copied ? <><CheckCircle2 size={16} /> Copied to Clipboard</> : <><Copy size={16} /> Copy Text</>}
              </button>
           </div>

           {/* Text Content */}
           <div className={`p-6 md:p-8 min-h-[300px] transition-opacity duration-300 ${isGenerating ? "opacity-30" : "opacity-100"}`}>
             {generatedText ? (
               <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                 {generatedText}
               </div>
             ) : (
               <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                 <AlignLeft size={48} className="mb-4 opacity-50" />
                 <p className="font-medium">No text generated yet.</p>
               </div>
             )}
           </div>

        </div>

      </div>
    </div>
  );
}