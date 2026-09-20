"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { ImageIcon, Sparkles, UploadCloud, Download, RefreshCw, FileImage, Layers } from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

const formatRelatedTools: SuggestedTool[] = [
  { id: "jpg-to-png", name: "JPG to PNG", desc: "Convert JPG to PNG format.", icon: FileImage, href: "/tools/jpg-to-png", color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "webp", name: "WebP Converter", desc: "Convert images to WebP.", icon: Layers, href: "/tools/webp-converter", color: "text-purple-500", bg: "bg-purple-100" },
  { id: "compressor", name: "Image Compressor", desc: "Reduce file sizes easily.", icon: ImageIcon, href: "/tools/compressor", color: "text-blue-500", bg: "bg-blue-100" }
];

export default function PngToJpgConverter() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("png")) {
      alert("Please upload a valid PNG image.");
      return;
    }

    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleConvertAndDownload = () => {
    if (!previewUrl || !originalFile) return;
    setIsConverting(true);

    const img = new window.Image();
    img.src = previewUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) return;
      
      // CRITICAL FIX: Fill white background for transparent PNGs before drawing
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.drawImage(img, 0, 0);

      // Export as JPEG with 95% High Quality
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        
        const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
        link.download = `${baseName}_converted.jpg`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsConverting(false);
      }, "image/jpeg", 0.95);
    };
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setOriginalFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-amber-500" />
          Format Converter
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          PNG to <span className="text-amber-500">JPG</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          যেকোনো PNG ছবিকে হাই-কোয়ালিটি JPG/JPEG ফরম্যাটে কনভার্ট করুন। ট্রান্সপারেন্ট ব্যাকগ্রাউন্ড স্বয়ংক্রিয়ভাবে সাদা হয়ে যাবে।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {!originalFile ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-80 border-3 border-dashed border-amber-200 hover:border-amber-500 bg-amber-50/50 hover:bg-amber-50 rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={32} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Upload PNG Image</h3>
              <input type="file" accept="image/png" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="font-bold text-slate-700">{originalFile.name}</span>
                <button onClick={handleReset} className="text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition-colors"><RefreshCw size={18} /></button>
              </div>
              
              <div className="w-full h-[400px] bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Preview" className="max-h-full object-contain drop-shadow-sm" />
              </div>

              <button 
                onClick={handleConvertAndDownload}
                disabled={isConverting}
                className="w-full h-16 flex items-center justify-center gap-2 bg-[#111827] hover:bg-slate-800 text-white rounded-2xl text-lg font-bold transition-all shadow-xl"
              >
                <Download size={20} className="text-amber-400" /> 
                {isConverting ? "Converting..." : "Convert to JPG & Download"}
              </button>
            </div>
          )}
        </div>
        <RelatedSidebar tools={formatRelatedTools} />
      </div>
    </div>
  );
}