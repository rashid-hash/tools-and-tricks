"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Type, Sparkles, Copy, CheckCircle2, Languages, PencilLine } from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// ১ থেকে ৯৯ পর্যন্ত বাংলা শব্দের ডিকশনারি (১০০% নির্ভুলতার জন্য)
const banglaWords = [
  "শূন্য", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়", "দশ", 
  "এগারো", "বারো", "তেরো", "চৌদ্দ", "পনেরো", "ষোলো", "সতেরো", "আঠারো", "উনিশ", "বিশ", 
  "একুশ", "বাইশ", "তেইশ", "চব্বিশ", "পঁচিশ", "ছাব্বিশ", "সাতাশ", "আঠাশ", "ঊনত্রিশ", "ত্রিশ", 
  "একত্রিশ", "বত্রিশ", "তেত্রিশ", "চৌত্রিশ", "পঁয়ত্রিশ", "ছত্রিশ", "সাঁইত্রিশ", "আটত্রিশ", "ঊনচল্লিশ", "চল্লিশ", 
  "একচল্লিশ", "বিয়াল্লিশ", "তেতাল্লিশ", "চুয়াল্লিশ", "পঁয়তাল্লিশ", "ছেচল্লিশ", "সাতচল্লিশ", "আটচল্লিশ", "ঊনপঞ্চাশ", "পঞ্চাশ", 
  "একান্ন", "বায়ান্ন", "তিপ্পান্ন", "চুয়ান্ন", "পঞ্চান্ন", "ছাপ্পান্ন", "সাতান্ন", "আটান্ন", "ঊনষাট", "ষাট", 
  "একষট্টি", "বাষট্টি", "তেষট্টি", "চৌষট্টি", "পঁয়ষট্টি", "ছেষট্টি", "সাতষট্টি", "আটষট্টি", "ঊনসত্তর", "সত্তর", 
  "একাত্তর", "বাহাত্তর", "তিয়াত্তর", "চুয়াত্তর", "পঁচাত্তর", "ছিয়াত্তর", "সাতাত্তর", "আটাত্তর", "ঊনআশি", "আশি", 
  "একাশি", "বিরাশি", "তিরাশি", "চুরাশি", "পঁচাশি", "ছিয়াশি", "সাতাশি", "অষ্টাশি", "ঊননব্বই", "নব্বই", 
  "একানব্বই", "বিরানব্বই", "তিরানব্বই", "চুরানব্বই", "পঁচানব্বই", "ছিয়ানব্বই", "সাতানব্বই", "আটানব্বই", "নিরানব্বই"
];

export default function NumberToWordsConverter() {
  const [inputValue, setInputValue] = useState<string>("1234567");
  const [banglaNumber, setBanglaNumber] = useState("");
  const [englishNumber, setEnglishNumber] = useState("");
  const [words, setWords] = useState("");
  const [copied, setCopied] = useState(false);

  // যেকোনো বাংলা বা ইংরেজি সংখ্যাকে ইংলিশে কনভার্ট করার হেল্পার
  const sanitizeToEnglishDigits = (str: string) => {
    const bnToEn: { [key: string]: string } = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
    return str.replace(/[০-৯]/g, (match) => bnToEn[match]).replace(/[^0-9]/g, '');
  };

  // ইংলিশ থেকে বাংলা ডিজিটে কনভার্ট করার হেল্পার
  const toBanglaDigits = (str: string) => {
    const enToBn: { [key: string]: string } = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
    return str.replace(/[0-9]/g, (match) => enToBn[match]);
  };

  // কমা বসানোর ফাংশন (Indian Format: 12,34,567)
  const formatWithCommas = (numStr: string) => {
    if (!numStr) return "";
    let lastThree = numStr.substring(numStr.length - 3);
    let otherNumbers = numStr.substring(0, numStr.length - 3);
    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  };

  // সংখ্যাকে কথায় রূপান্তরের রিকার্সিভ ফাংশন (যেকোনো বিশাল সংখ্যার জন্য)
  const convertToWords = (numStr: string): string => {
    if (!numStr || isNaN(Number(numStr))) return "";
    try {
      let num = BigInt(numStr);
      if (num === 0n) return banglaWords[0];

      let parts = [];
      let koti = num / 10000000n;
      let remainder = num % 10000000n;

      if (koti > 0n) {
        parts.push(convertToWords(koti.toString()) + " কোটি");
      }

      let lakh = remainder / 100000n;
      remainder = remainder % 100000n;
      if (lakh > 0n) {
        parts.push(banglaWords[Number(lakh)] + " লক্ষ");
      }

      let hazar = remainder / 1000n;
      remainder = remainder % 1000n;
      if (hazar > 0n) {
        parts.push(banglaWords[Number(hazar)] + " হাজার");
      }

      let shotok = remainder / 100n;
      remainder = remainder % 100n;
      if (shotok > 0n) {
        parts.push(banglaWords[Number(shotok)] + " শত");
      }

      if (remainder > 0n) {
        parts.push(banglaWords[Number(remainder)]);
      }

      return parts.join(" ");
    } catch (e) {
      return "সংখ্যা অনেক বড়";
    }
  };

  useEffect(() => {
    const cleanNumber = sanitizeToEnglishDigits(inputValue);
    
    if (cleanNumber === "") {
      setBanglaNumber("");
      setEnglishNumber("");
      setWords("");
      return;
    }

    const formattedEnglish = formatWithCommas(cleanNumber);
    setEnglishNumber(formattedEnglish);
    setBanglaNumber(toBanglaDigits(formattedEnglish));
    setWords(convertToWords(cleanNumber) + " মাত্র"); // 'মাত্র' যোগ করা হলো চেক লেখার সুবিধার্থে
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleCopy = () => {
    if (words) {
      navigator.clipboard.writeText(words);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-emerald-500" />
          Bangladesh Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          সংখ্যা থেকে <span className="text-emerald-600">কথায়</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          যেকোনো বাংলা বা ইংরেজি সংখ্যা টাইপ করুন এবং ব্যাংক চেক বা দলিলের জন্য নির্ভুল কথায় রূপান্তর পান।
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60 relative overflow-hidden">
          
          <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] -z-10 pointer-events-none bg-emerald-100`}></div>

          {/* Input Section */}
          <div className="mb-10">
            <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <PencilLine size={16} /> সংখ্যা লিখুন
            </label>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full h-16 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-5 text-2xl font-bold text-[#111827] outline-none transition-all tracking-wider"
              placeholder="যেমন: ১২৩৪৫৬৭"
            />
          </div>

          {/* Formatted Numbers Display */}
          {inputValue && (
            <div className="grid grid-cols-2 gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Languages size={12}/> English</span>
                <span className="text-xl font-bold text-slate-700">{englishNumber || "-"}</span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Languages size={12}/> বাংলা</span>
                <span className="text-xl font-bold text-emerald-700">{banglaNumber || "-"}</span>
              </div>
            </div>
          )}

          {/* Words Result Display */}
          {words && (
            <div className="bg-[#111827] rounded-3xl p-6 md:p-8 w-full text-white relative overflow-hidden shadow-xl shadow-slate-900/10 animate-in zoom-in-95 duration-500 flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-emerald-400"></div>
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-emerald-400 text-[13px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <Type size={16} /> কথায়
                </span>
                
                <button 
                  onClick={handleCopy}
                  className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-bold transition-all"
                >
                  {copied ? <><CheckCircle2 size={14} className="text-emerald-400" /> কপিড</> : <><Copy size={14} /> কপি করুন</>}
                </button>
              </div>
              
              <div className="text-2xl md:text-3xl font-bold leading-relaxed text-slate-100">
                {words}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}