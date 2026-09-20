"use client";

import React, { useState, useEffect, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Image as ImageIcon, Sparkles, UploadCloud, Download, Minimize, Settings2, FileImage, ArrowRightRight, Trash2 } from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// এই টুলের জন্য কাস্টম Image Editing রিলেটেড টুলস
const imageRelatedTools: SuggestedTool[] = [
  { id: "resizer", name: "Image Resizer", desc: "Resize images to exact pixels.", icon: Maximize, href: "/tools/resizer", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "jpg-to-png", name: "JPG to PNG", desc: "Convert images with transparency.", icon: FileImage, href: "/tools/jpg-to-png", color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "passport", name: "Passport Photo", desc: "Make BD standard passport photos.", icon: ImageIcon, href: "/tools/passport-photo", color: "text-indigo-500", bg: "bg-indigo-100" }
];

// Fallback Icon for Resizer (Since Maximize wasn't imported in this scope, let's use ArrowRightRight as placeholder if needed, but we imported it above ideally. Let's redefine here to be safe)
import { Maximize } from "lucide-react";

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>("");
  const [compressedPreview, setCompressedPreview] = useState<string>("");
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(75); // Default 75% quality
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format Bytes to KB/MB
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    setOriginalFile(file);
    setOriginalSize(file.size);
    
    const url = URL.createObjectURL(file);
    setOriginalPreview(url);
    
    // Initial Compression
    compressImage(url, quality);
  };

  // The Core Compression Engine (Using HTML5 Canvas)
  const compressImage = (imageUrl: string, qualityLevel: number) => {
    const img = new window.Image();
    img.src = imageUrl;
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Draw image on canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Convert to blob with specific quality (JPEG format supports quality param)
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            setCompressedBlob(blob);
            
            // Cleanup previous compressed URL to prevent memory leak
            if (compressedPreview) URL.revokeObjectURL(compressedPreview);
            setCompressedPreview(URL.createObjectURL(blob));
          }
        },
        "image/jpeg", // Output format
        qualityLevel / 100 // Quality from 0.0 to 1.0
      );
    };
  };

  // Re-compress when quality slider changes
  useEffect(() => {
    if (originalPreview) {
      compressImage(originalPreview, quality);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality]);

  // Handle Download
  const handleDownload = () => {
    if (!compressedBlob || !originalFile) return;
    
    const url = URL.createObjectURL(compressedBlob);
    const link = document.createElement("a");
    link.href = url;
    
    // Maintain original name but add _compressed and .jpg
    const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
    link.download = `${baseName}_compressed.jpg`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalPreview("");
    setCompressedPreview("");
    setCompressedBlob(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Calculate Savings
  const savedPercentage = originalSize > 0 
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100) 
    : 0;

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-blue-500" />
          Image Editing Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Smart Image <span className="text-blue-500">Compressor</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          কোয়ালিটি ঠিক রেখে ছবির সাইজ কমান। এটি পুরোপুরি আপনার ব্রাউজারে কাজ করে, তাই আপনার ছবি ১০০% নিরাপদ।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {!originalFile ? (
            // Upload State
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-80 border-3 border-dashed border-blue-200 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50 rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={32} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Click or drag image to upload</h3>
              <p className="text-sm text-slate-400 font-medium">Supports JPG, PNG, WEBP (Max 10MB)</p>
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
              
              {/* Controls */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <Settings2 size={16} /> Compression Quality
                    </label>
                    <span className="font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-lg text-sm">{quality}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={quality} 
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium mt-2">
                    <span>Smaller Size (Low Quality)</span>
                    <span>Larger Size (High Quality)</span>
                  </div>
                </div>

                <div className="flex gap-3 shrink-0">
                  <button 
                    onClick={handleReset}
                    className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 text-rose-500 rounded-xl hover:bg-rose-50 hover:border-rose-200 transition-all"
                    title="Upload New"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="h-12 px-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30"
                  >
                    <Download size={18} /> Download
                  </button>
                </div>
              </div>

              {/* Preview Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Original */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Original</span>
                    <span className="text-sm font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                      {formatBytes(originalSize)}
                    </span>
                  </div>
                  <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative group">
                    <img src={originalPreview} alt="Original" className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Compressed */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-blue-500 uppercase tracking-wider">Compressed</span>
                    <span className="text-sm font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full flex items-center gap-1">
                      {formatBytes(compressedSize)}
                      {savedPercentage > 0 && <span className="text-xs">(-{savedPercentage}%)</span>}
                    </span>
                  </div>
                  <div className="w-full h-64 bg-blue-50/50 rounded-2xl border-2 border-blue-200 overflow-hidden relative">
                    <img src={compressedPreview} alt="Compressed" className="w-full h-full object-contain" />
                    {/* Size Badge Overlay */}
                    {savedPercentage > 0 && (
                      <div className="absolute bottom-3 right-3 bg-[#111827] text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5">
                        <Minimize size={14} /> Saved {formatBytes(originalSize - compressedSize)}
                      </div>
                    )}
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