"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Crop, Sparkles, UploadCloud, Download, 
  RefreshCw, FileImage, Image as ImageIcon, Minimize, Monitor, Smartphone, RectangleHorizontal
} from "lucide-react";
import ReactCrop, { type Crop as CropType, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'; // Required CSS for the cropper
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Custom Image Editing Related Tools
const imageRelatedTools: SuggestedTool[] = [
  { id: "compressor", name: "Image Compressor", desc: "Reduce file size without losing quality.", icon: Minimize, href: "/tools/compressor", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "resizer", name: "Image Resizer", desc: "Resize images to exact pixels.", icon: Monitor, href: "/tools/resizer", color: "text-indigo-500", bg: "bg-indigo-100" },
  { id: "jpg-to-png", name: "JPG to PNG", desc: "Convert images with transparency.", icon: FileImage, href: "/tools/jpg-to-png", color: "text-emerald-500", bg: "bg-emerald-100" }
];

export default function ImageCropper() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Crop State
  const [crop, setCrop] = useState<CropType>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [aspect, setAspect] = useState<number | undefined>(undefined); // undefined = Free crop

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
    setImgSrc(url);
    // Reset crop state on new image
    setCrop(undefined);
    setCompletedCrop(null);
  };

  // Set Aspect Ratio
  const handleAspectClick = (ratio: number | undefined) => {
    setAspect(ratio);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      // Provide a default centered crop box when ratio changes
      const defaultCrop: CropType = {
        unit: '%',
        width: 50,
        height: ratio ? 50 / ratio : 50,
        x: 25,
        y: 25
      };
      setCrop(defaultCrop);
    }
  };

  // Generate Cropped Image for Download
  const handleDownload = () => {
    if (!completedCrop || !imgRef.current || !originalFile) return;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      alert("No 2d context available");
      return;
    }

    // Calculate actual scale (natural size vs displayed size)
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Set canvas dimensions to the cropped size
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    ctx.imageSmoothingQuality = "high";

    // Draw the cropped area onto the canvas
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Download the canvas content
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      
      const baseName = originalFile.name.replace(/\.[^/.]+$/, "") || "image";
      link.download = `${baseName}_cropped.jpg`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, "image/jpeg", 0.95);
  };

  const handleReset = () => {
    if (imgSrc) URL.revokeObjectURL(imgSrc);
    setOriginalFile(null);
    setImgSrc("");
    setCrop(undefined);
    setCompletedCrop(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-xs font-bold text-fuchsia-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-fuchsia-500" />
          Image Editing Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Precision Image <span className="text-fuchsia-500">Cropper</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          ছবি থেকে অপ্রয়োজনীয় অংশ নিখুঁতভাবে কেটে ফেলুন। কাস্টম সাইজ অথবা নির্দিষ্ট রেশিও (যেমন- 1:1, 16:9) অনুযায়ী ছবি ক্রপ করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {!originalFile ? (
            // Upload State
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-80 border-3 border-dashed border-fuchsia-200 hover:border-fuchsia-500 bg-fuchsia-50/50 hover:bg-fuchsia-50 rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={32} className="text-fuchsia-500" />
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
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Aspect Ratio Toolbar */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap gap-3 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleAspectClick(undefined)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${aspect === undefined ? "bg-fuchsia-600 text-white border-fuchsia-600 shadow-md" : "bg-white border-slate-200 text-slate-600 hover:border-fuchsia-300"}`}
                  >
                    Free Crop
                  </button>
                  <button 
                    onClick={() => handleAspectClick(1)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${aspect === 1 ? "bg-fuchsia-600 text-white border-fuchsia-600 shadow-md" : "bg-white border-slate-200 text-slate-600 hover:border-fuchsia-300"}`}
                  >
                    <div className="w-3 h-3 border-2 border-current"></div> 1:1 (Square)
                  </button>
                  <button 
                    onClick={() => handleAspectClick(16 / 9)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${aspect === 16/9 ? "bg-fuchsia-600 text-white border-fuchsia-600 shadow-md" : "bg-white border-slate-200 text-slate-600 hover:border-fuchsia-300"}`}
                  >
                    <RectangleHorizontal size={14} /> 16:9 (Cover)
                  </button>
                  <button 
                    onClick={() => handleAspectClick(4 / 3)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${aspect === 4/3 ? "bg-fuchsia-600 text-white border-fuchsia-600 shadow-md" : "bg-white border-slate-200 text-slate-600 hover:border-fuchsia-300"}`}
                  >
                    <Monitor size={14} /> 4:3 (Standard)
                  </button>
                  <button 
                    onClick={() => handleAspectClick(3 / 4)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${aspect === 3/4 ? "bg-fuchsia-600 text-white border-fuchsia-600 shadow-md" : "bg-white border-slate-200 text-slate-600 hover:border-fuchsia-300"}`}
                  >
                    <Smartphone size={14} /> 3:4 (Portrait)
                  </button>
                </div>
                
                <button 
                  onClick={handleReset}
                  className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 text-rose-500 rounded-xl hover:bg-rose-50 hover:border-rose-200 transition-all shrink-0"
                  title="Upload New Image"
                >
                  <RefreshCw size={16} />
                </button>
              </div>

              {/* Cropper Area */}
              <div className="w-full bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4 min-h-[400px]">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                  className="max-h-[60vh] rounded-lg shadow-2xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    alt="Crop preview"
                    src={imgSrc}
                    className="max-h-[60vh] w-auto object-contain"
                  />
                </ReactCrop>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button 
                  onClick={handleDownload}
                  disabled={!completedCrop?.width || !completedCrop?.height}
                  className={`w-full h-16 flex items-center justify-center gap-2 rounded-2xl text-lg font-bold transition-all shadow-xl ${
                    completedCrop?.width && completedCrop?.height 
                    ? "bg-[#111827] hover:bg-slate-800 text-white shadow-slate-900/10 cursor-pointer" 
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <Download size={20} className={completedCrop?.width && completedCrop?.height ? "text-fuchsia-400" : "text-slate-400"} /> 
                  Download Cropped Image
                </button>
                <p className="text-center text-xs font-medium text-slate-400 mt-3">
                  Click and drag on the image to select the crop area.
                </p>
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