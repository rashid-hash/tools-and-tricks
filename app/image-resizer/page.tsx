"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Download, Image as ImageIcon, FileSignature, Settings, ArrowRight, CheckCircle2 } from "lucide-react";
import { Noto_Sans_Bengali } from "next/font/google";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export default function ImageResizer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  
  // Settings State
  const [mode, setMode] = useState<"photo" | "signature" | "custom">("photo");
  const [targetWidth, setTargetWidth] = useState(300);
  const [targetHeight, setTargetHeight] = useState(300);
  const [targetKB, setTargetKB] = useState(100);

  // Result State
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [resultKB, setResultKB] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // প্রিসেট চেঞ্জ হ্যান্ডলার
  const handleModeChange = (newMode: "photo" | "signature" | "custom") => {
    setMode(newMode);
    if (newMode === "photo") {
      setTargetWidth(300); setTargetHeight(300); setTargetKB(100);
    } else if (newMode === "signature") {
      setTargetWidth(300); setTargetHeight(80); setTargetKB(60);
    }
  };

  // ছবি আপলোড হ্যান্ডলার
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setResizedImage(null); // Reset previous result
      };
      reader.readAsDataURL(file);
    }
  };

  // ছবি প্রসেসিং লজিক (Canvas + Compression)
  const processImage = () => {
    if (!selectedImage) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // সাদা ব্যাকগ্রাউন্ড (যদি PNG ট্রান্সপারেন্ট হয়)
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        let quality = 1.0;
        let dataUrl = canvas.toDataURL("image/jpeg", quality);
        let sizeInKB = (dataUrl.length * 0.75) / 1024;

        // Auto Compress Loop (Target KB এর নিচে আনা)
        while (sizeInKB > targetKB && quality > 0.1) {
          quality -= 0.05;
          dataUrl = canvas.toDataURL("image/jpeg", quality);
          sizeInKB = (dataUrl.length * 0.75) / 1024;
        }

        setResizedImage(dataUrl);
        setResultKB(parseFloat(sizeInKB.toFixed(2)));
        setIsProcessing(false);
      }
    };
  };

  return (
    <div className={`min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans ${notoSansBengali.className} text-gray-800 pb-20`}>
      
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-10 mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Premium Job <span className="text-blue-600">Photo Resizer</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
          টেলিটক বা যেকোনো সরকারি চাকরিতে আবেদনের জন্য আপনার ছবি ও স্বাক্ষর এক ক্লিকেই নির্দিষ্ট পিক্সেল ও সাইজে (KB) কনভার্ট করুন।
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* --- Left Panel: Upload & Settings --- */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          
          {/* Preset Selector */}
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex gap-2">
            <button onClick={() => handleModeChange("photo")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${mode === "photo" ? "bg-blue-50 text-blue-600 border border-blue-100" : "text-gray-500 hover:bg-gray-50"}`}>
              <ImageIcon size={18} /> Photo
            </button>
            <button onClick={() => handleModeChange("signature")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${mode === "signature" ? "bg-blue-50 text-blue-600 border border-blue-100" : "text-gray-500 hover:bg-gray-50"}`}>
              <FileSignature size={18} /> Signature
            </button>
            <button onClick={() => handleModeChange("custom")} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${mode === "custom" ? "bg-blue-50 text-blue-600 border border-blue-100" : "text-gray-500 hover:bg-gray-50"}`}>
              <Settings size={18} /> Custom
            </button>
          </div>

          {/* Configuration Settings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">Dimensions & Size</h3>
                {mode !== "custom" && <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-semibold">Auto Preset</span>}
             </div>
             
             <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Width (px)</label>
                  <input type="number" value={targetWidth} disabled={mode !== "custom"} onChange={(e) => setTargetWidth(Number(e.target.value))} className="w-full border border-gray-200 mt-1 p-2.5 rounded-lg text-center font-bold text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Height (px)</label>
                  <input type="number" value={targetHeight} disabled={mode !== "custom"} onChange={(e) => setTargetHeight(Number(e.target.value))} className="w-full border border-gray-200 mt-1 p-2.5 rounded-lg text-center font-bold text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Max KB</label>
                  <input type="number" value={targetKB} disabled={mode !== "custom"} onChange={(e) => setTargetKB(Number(e.target.value))} className="w-full border border-gray-200 mt-1 p-2.5 rounded-lg text-center font-bold text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50" />
                </div>
             </div>
          </div>

          {/* Upload Box */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="bg-white border-2 border-dashed border-blue-200 hover:border-blue-500 transition-colors rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer group shadow-sm min-h-[220px]"
          >
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud size={32} />
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">Click to Upload Image</h3>
            <p className="text-sm text-gray-500 text-center">Supports JPG, PNG (Max 5MB)</p>
            
            {originalFile && (
               <div className="mt-4 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2">
                 <CheckCircle2 size={16} /> Image Loaded Successfully
               </div>
            )}
          </div>

          <button 
            onClick={processImage} 
            disabled={!selectedImage || isProcessing}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? "Processing..." : "Process Image"} <ArrowRight size={20} />
          </button>
        </div>

        {/* --- Right Panel: Live Preview & Result --- */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col">
            <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
               <ImageIcon className="text-blue-500" /> Result Preview
            </h3>

            {!selectedImage && !resizedImage ? (
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50 text-gray-400">
                <ImageIcon size={48} className="mb-3 opacity-50" />
                <p>Upload an image to see preview</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center">
                {/* Result Image Display */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 inline-block mb-6 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={resizedImage || selectedImage || ""} 
                    alt="Preview" 
                    className="shadow-md object-contain"
                    style={{ width: targetWidth, height: targetHeight, maxWidth: "100%" }}
                  />
                  {resizedImage && (
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle2 size={18} />
                    </div>
                  )}
                </div>

                {/* Status Box */}
                {resizedImage && resultKB !== null && (
                  <div className="w-full bg-blue-50 rounded-xl p-5 border border-blue-100 flex justify-between items-center mb-6">
                    <div>
                      <p className="text-sm text-blue-600 font-semibold mb-1">Final Size</p>
                      <p className="text-2xl font-black text-gray-900">{targetWidth} <span className="text-gray-400 text-lg">x</span> {targetHeight} <span className="text-sm text-gray-500 font-medium">px</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-600 font-semibold mb-1">File Size</p>
                      <p className={`text-2xl font-black ${resultKB <= targetKB ? "text-green-600" : "text-red-500"}`}>
                        {resultKB} <span className="text-sm font-medium">KB</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Download Button */}
                {resizedImage && (
                  <a 
                    href={resizedImage}
                    download={`mockuphub-${mode}.jpg`}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
                  >
                    <Download size={20} /> Download Ready File
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}