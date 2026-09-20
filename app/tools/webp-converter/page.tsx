"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Layers, Sparkles, UploadCloud, Download, RefreshCw, Settings2, FileImage, Image as ImageIcon } from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// এই টুলের জন্য কাস্টম রিলেটেড টুলস
const formatRelatedTools: SuggestedTool[] = [
  { id: "jpg-to-png", name: "JPG to PNG", desc: "Convert JPG to PNG format.", icon: FileImage, href: "/tools/jpg-to-png", color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "png-to-jpg", name: "PNG to JPG", desc: "Convert PNG to JPG format.", icon: ImageIcon, href: "/tools/png-to-jpg", color: "text-amber-500", bg: "bg-amber-100" },
  { id: "compressor", name: "Image Compressor", desc: "Reduce file sizes easily.", icon: Layers, href: "/tools/compressor", color: "text-blue-500", bg: "bg-blue-100" }
];

export default function WebpConverter() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [quality, setQuality] = useState<number>(80);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, etc).");
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
      
      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Export as WebP with user-defined quality
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        
        const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
        link.download = `${baseName}_converted.webp`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsConverting(false);
      }, "image/webp", quality / 100);
    };
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setOriginalFile(null);
    setPreviewUrl("");
    setQuality(80);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-purple-500" />
          Next-Gen Format
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Convert to <span className="text-purple-500">WebP</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          যেকোনো ছবিকে ওয়েবসাইটের জন্য সবচেয়ে পারফেক্ট এবং লাইটওয়েট 'WebP' ফরম্যাটে রূপান্তর করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {!originalFile ? (
            // Upload State
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-80 border-3 border-dashed border-purple-200 hover:border-purple-500 bg-purple-50/50 hover:bg-purple-50 rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={32} className="text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Upload JPG/PNG Image</h3>
              <p className="text-sm text-slate-400 font-medium">Files are converted securely in your browser</p>
              <input type="file" accept="image/jpeg, image/jpg, image/png" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            </div>
          ) : (
            // Editor State
            <div className="space-y-6 animate-in fade-in duration-500">
              
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="font-bold text-slate-700 truncate max-w-[70%]">{originalFile.name}</span>
                <button onClick={handleReset} className="text-rose-500 p-2 hover:bg-rose-50 rounded-xl transition-colors shrink-0" title="Upload New">
                  <RefreshCw size={18} />
                </button>
              </div>

              {/* Quality Settings */}
              <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[13px] font-bold text-purple-700 uppercase tracking-wider flex items-center gap-2">
                    <Settings2 size={16} /> WebP Quality
                  </label>
                  <span className="font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-lg text-sm">{quality}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={quality} 
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium mt-2">
                  <span>Smaller File</span>
                  <span>Better Quality</span>
                </div>
              </div>
              
              {/* Image Preview */}
              <div className="w-full h-[320px] bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Preview" className="max-h-full object-contain drop-shadow-sm" />
              </div>

              {/* Action Button */}
              <button 
                onClick={handleConvertAndDownload}
                disabled={isConverting}
                className="w-full h-16 flex items-center justify-center gap-2 bg-[#111827] hover:bg-slate-800 text-white rounded-2xl text-lg font-bold transition-all shadow-xl"
              >
                <Download size={20} className="text-purple-400" /> 
                {isConverting ? "Converting..." : "Convert to WebP & Download"}
              </button>
            </div>
          )}
        </div>
        
        {/* Right Column: Sticky Sidebar */}
        <RelatedSidebar tools={formatRelatedTools} />
      </div>
    </div>
  );
}