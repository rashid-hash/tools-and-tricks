"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Maximize, Sparkles, UploadCloud, Download, 
  Lock, Unlock, RefreshCw, FileImage, Image as ImageIcon, Minimize, Monitor, Smartphone, Scaling
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// এই টুলের জন্য কাস্টম Image Editing রিলেটেড টুলস
const imageRelatedTools: SuggestedTool[] = [
  { id: "compressor", name: "Image Compressor", desc: "Reduce image file size smartly.", icon: Minimize, href: "/tools/compressor", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "jpg-to-png", name: "JPG to PNG", desc: "Convert images with transparency.", icon: FileImage, href: "/tools/jpg-to-png", color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "passport", name: "Passport Photo Maker", desc: "Create studio-quality passport photos.", icon: ImageIcon, href: "/tools/passport-photo", color: "text-indigo-500", bg: "bg-indigo-100" }
];

export default function ImageResizer() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  
  // Dimensions
  const [originalDim, setOriginalDim] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState<number | string>("");
  const [height, setHeight] = useState<number | string>("");
  
  // Settings
  const [maintainRatio, setMaintainRatio] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Get original dimensions
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      setOriginalDim({ width: img.width, height: img.height });
      setWidth(img.width);
      setHeight(img.height);
    };
  };

  // Handle Width Change
  const handleWidthChange = (val: string) => {
    const newWidth = parseInt(val);
    setWidth(val);

    if (maintainRatio && !isNaN(newWidth) && originalDim.width > 0) {
      const ratio = originalDim.height / originalDim.width;
      setHeight(Math.round(newWidth * ratio));
    }
  };

  // Handle Height Change
  const handleHeightChange = (val: string) => {
    const newHeight = parseInt(val);
    setHeight(val);

    if (maintainRatio && !isNaN(newHeight) && originalDim.height > 0) {
      const ratio = originalDim.width / originalDim.height;
      setWidth(Math.round(newHeight * ratio));
    }
  };

  // Apply Presets
  const applyPreset = (w: number, h: number | null = null) => {
    setWidth(w);
    if (h) {
      setMaintainRatio(false); // If specific strict dimension is clicked, disable lock
      setHeight(h);
    } else {
      // If only width is provided (percentage scale), keep ratio lock
      if (originalDim.width > 0) {
        const ratio = originalDim.height / originalDim.width;
        setHeight(Math.round(w * ratio));
      }
    }
  };

  // The Core Resizing Engine (Canvas)
  const handleDownload = () => {
    if (!previewUrl || !width || !height) return;

    const img = new window.Image();
    img.src = previewUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) return;

      // Set canvas to NEW dimensions
      const finalWidth = Number(width);
      const finalHeight = Number(height);
      
      canvas.width = finalWidth;
      canvas.height = finalHeight;

      // Draw and scale image
      ctx.drawImage(img, 0, 0, finalWidth, finalHeight);

      // Download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        
        const baseName = originalFile?.name.replace(/\.[^/.]+$/, "") || "image";
        link.download = `${baseName}_${finalWidth}x${finalHeight}.jpg`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, "image/jpeg", 0.9); // High quality JPEG output
    };
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setOriginalFile(null);
    setPreviewUrl("");
    setWidth("");
    setHeight("");
    setOriginalDim({ width: 0, height: 0 });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-indigo-500" />
          Image Editing Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Smart Image <span className="text-indigo-500">Resizer</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          যেকোনো ছবির ডাইমেনশন (Width ও Height) পারফেক্টলি পরিবর্তন করুন। রেশিও লক করে ছবি চ্যাপ্টা হওয়া থেকে বাঁচান।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {!originalFile ? (
            // Upload State
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-80 border-3 border-dashed border-indigo-200 hover:border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={32} className="text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Click or drag image to upload</h3>
              <p className="text-sm text-slate-400 font-medium">Supports JPG, PNG, WEBP</p>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </div>
          ) : (
            // Editor State
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Image Preview Panel */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center bg-slate-100 px-4 py-2 rounded-xl">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Original Size</span>
                    <span className="text-sm font-bold text-slate-700">
                      {originalDim.width} × {originalDim.height} px
                    </span>
                  </div>
                  
                  {/* Checkerboard background for transparent images */}
                  <div className="w-full h-[320px] bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative flex items-center justify-center p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain drop-shadow-sm" />
                  </div>
                  
                  <button onClick={handleReset} className="mt-2 text-sm font-bold text-rose-500 hover:text-rose-600 flex items-center justify-center gap-2 py-2 bg-rose-50 rounded-xl transition-colors">
                    <RefreshCw size={16} /> Upload Different Image
                  </button>
                </div>

                {/* Resizing Controls */}
                <div className="flex flex-col gap-6">
                  
                  {/* Dimensions Input Box */}
                  <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 relative">
                    <h3 className="text-[13px] font-bold text-indigo-600 uppercase tracking-widest mb-5 flex items-center gap-2">
                      <Scaling size={16} /> Set New Dimensions
                    </h3>

                    <div className="flex items-center gap-4">
                      {/* Width Input */}
                      <div className="flex-1">
                        <label className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 block">Width (px)</label>
                        <input 
                          type="number" 
                          value={width}
                          onChange={(e) => handleWidthChange(e.target.value)}
                          className="w-full h-14 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 text-xl font-bold text-[#111827] outline-none text-center"
                        />
                      </div>

                      {/* Aspect Ratio Lock Button */}
                      <div className="flex flex-col items-center justify-center pt-5 shrink-0">
                        <button 
                          onClick={() => setMaintainRatio(!maintainRatio)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${maintainRatio ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}
                          title={maintainRatio ? "Aspect Ratio Locked" : "Aspect Ratio Unlocked"}
                        >
                          {maintainRatio ? <Lock size={16} /> : <Unlock size={16} />}
                        </button>
                        {/* Visual Link Line */}
                        <div className={`w-8 h-px mt-2 ${maintainRatio ? 'bg-indigo-300' : 'bg-transparent'}`}></div>
                      </div>

                      {/* Height Input */}
                      <div className="flex-1">
                        <label className="text-[11px] font-bold text-slate-500 uppercase mb-1.5 block">Height (px)</label>
                        <input 
                          type="number" 
                          value={height}
                          onChange={(e) => handleHeightChange(e.target.value)}
                          className="w-full h-14 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-4 text-xl font-bold text-[#111827] outline-none text-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Presets */}
                  <div>
                    <label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">Quick Presets</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => applyPreset(1920, 1080)} className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 font-semibold text-sm transition-all text-left">
                        <Monitor size={16} className="shrink-0" /> Full HD (1920x1080)
                      </button>
                      <button onClick={() => applyPreset(1080, 1080)} className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 font-semibold text-sm transition-all text-left">
                        <Smartphone size={16} className="shrink-0" /> Instagram (1080x1080)
                      </button>
                      
                      <button onClick={() => applyPreset(originalDim.width * 0.5)} className="p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 font-semibold text-sm transition-all text-center">
                        50% Smaller
                      </button>
                      <button onClick={() => applyPreset(originalDim.width * 0.75)} className="p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 font-semibold text-sm transition-all text-center">
                        75% Smaller
                      </button>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 mt-auto">
                    <button 
                      onClick={handleDownload}
                      className="w-full h-16 flex items-center justify-center gap-2 bg-[#111827] hover:bg-slate-800 text-white rounded-2xl text-lg font-bold transition-all shadow-xl shadow-slate-900/10"
                    >
                      <Download size={20} className="text-indigo-400" /> Download Resized Image
                    </button>
                    <p className="text-center text-xs font-medium text-slate-400 mt-3">
                      File will be saved as <span className="text-slate-500">_resized.jpg</span>
                    </p>
                  </div>

                </div>

              </div>
              
            </div>
          )}

        </div>

        {/* Right Column: Sticky Sidebar */}
        <RelatedSidebar tools={imageRelatedTools} />

      </div>
    </div>
  );
}