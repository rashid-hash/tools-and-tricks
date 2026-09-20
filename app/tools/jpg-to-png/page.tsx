"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { FileImage, Sparkles, UploadCloud, Download, RefreshCw, Image as ImageIcon, Layers } from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

const formatRelatedTools: SuggestedTool[] = [
  { id: "png-to-jpg", name: "PNG to JPG", desc: "Convert PNG to JPG format.", icon: ImageIcon, href: "/tools/png-to-jpg", color: "text-amber-500", bg: "bg-amber-100" },
  { id: "webp", name: "WebP Converter", desc: "Convert images to WebP.", icon: Layers, href: "/tools/webp-converter", color: "text-purple-500", bg: "bg-purple-100" },
  { id: "compressor", name: "Image Compressor", desc: "Reduce file sizes easily.", icon: FileImage, href: "/tools/compressor", color: "text-blue-500", bg: "bg-blue-100" }
];

export default function JpgToPngConverter() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
      alert("Please upload a valid JPG/JPEG image.");
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
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        
        const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
        link.download = `${baseName}_converted.png`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsConverting(false);
      }, "image/png");
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
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-emerald-500" />
          Format Converter
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          JPG to <span className="text-emerald-500">PNG</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          যেকোনো JPG বা JPEG ছবিকে মুহূর্তের মধ্যে কোয়ালিটি লস ছাড়াই PNG ফরম্যাটে কনভার্ট করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {!originalFile ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-80 border-3 border-dashed border-emerald-200 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-50 rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Upload JPG Image</h3>
              <input type="file" accept="image/jpeg, image/jpg" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="font-bold text-slate-700">{originalFile.name}</span>
                <button onClick={handleReset} className="text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition-colors"><RefreshCw size={18} /></button>
              </div>
              
              <div className="w-full h-[400px] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Preview" className="max-h-full object-contain drop-shadow-sm" />
              </div>

              <button 
                onClick={handleConvertAndDownload}
                disabled={isConverting}
                className="w-full h-16 flex items-center justify-center gap-2 bg-[#111827] hover:bg-slate-800 text-white rounded-2xl text-lg font-bold transition-all shadow-xl"
              >
                <Download size={20} className="text-emerald-400" /> 
                {isConverting ? "Converting..." : "Convert to PNG & Download"}
              </button>
            </div>
          )}
        </div>
        <RelatedSidebar tools={formatRelatedTools} />
      </div>
    </div>
  );
}