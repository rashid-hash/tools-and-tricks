"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { FileText, Sparkles, UploadCloud, Download, RefreshCw, Settings2, FileImage, Image as ImageIcon, Crop } from "lucide-react";
import jsPDF from "jspdf";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Custom Image Editing Related Tools
const documentRelatedTools: SuggestedTool[] = [
  { id: "compressor", name: "Image Compressor", desc: "Reduce file sizes easily.", icon: ImageIcon, href: "/tools/compressor", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "cropper", name: "Image Cropper", desc: "Crop your images perfectly.", icon: Crop, href: "/tools/cropper", color: "text-fuchsia-500", bg: "bg-fuchsia-100" },
  { id: "jpg-to-png", name: "JPG to PNG", desc: "Convert JPG to PNG format.", icon: FileImage, href: "/tools/jpg-to-png", color: "text-emerald-500", bg: "bg-emerald-100" }
];

export default function ImageToPdfConverter() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);
  
  // Settings
  const [pageFormat, setPageFormat] = useState<"a4" | "fit">("a4");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  };

  const handleConvertAndDownload = () => {
    if (!previewUrl || !originalFile) return;
    setIsConverting(true);

    const img = new window.Image();
    img.src = previewUrl;
    
    img.onload = () => {
      let pdf: jsPDF;
      const imgWidthPx = img.width;
      const imgHeightPx = img.height;

      // Determine orientation based on image dimensions
      const orientation = imgWidthPx > imgHeightPx ? "landscape" : "portrait";

      if (pageFormat === "fit") {
        // Fit exactly to image size (converting px to mm, approx 0.264583 mm per pixel)
        const pxToMm = 0.264583;
        const pdfWidth = imgWidthPx * pxToMm;
        const pdfHeight = imgHeightPx * pxToMm;
        
        pdf = new jsPDF({
          orientation: orientation,
          unit: "mm",
          format: [pdfWidth, pdfHeight]
        });
        
        pdf.addImage(img, "JPEG", 0, 0, pdfWidth, pdfHeight);
        
      } else {
        // A4 Standard Size (210 x 297 mm)
        pdf = new jsPDF({
          orientation: orientation,
          unit: "mm",
          format: "a4"
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgRatio = imgWidthPx / imgHeightPx;
        const pdfRatio = pdfWidth / pdfHeight;

        let finalWidth = pdfWidth;
        let finalHeight = pdfHeight;
        let x = 0;
        let y = 0;

        // Scale image to fit within A4 while maintaining aspect ratio
        if (imgRatio > pdfRatio) {
          finalHeight = pdfWidth / imgRatio;
          y = (pdfHeight - finalHeight) / 2; // Center vertically
        } else {
          finalWidth = pdfHeight * imgRatio;
          x = (pdfWidth - finalWidth) / 2; // Center horizontally
        }

        pdf.addImage(img, "JPEG", x, y, finalWidth, finalHeight);
      }

      // Save PDF
      const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
      pdf.save(`${baseName}_document.pdf`);
      
      setIsConverting(false);
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
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-red-500" />
          Document Converter
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Image to <span className="text-red-500">PDF</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          যেকোনো ছবি, ডকুমেন্টের স্ক্যান কপি বা মার্কশিটকে প্রফেশনাল A4 সাইজের PDF-এ রূপান্তর করুন একদম নিরাপদে।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {!originalFile ? (
            // Upload State
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-80 border-3 border-dashed border-red-200 hover:border-red-500 bg-red-50/50 hover:bg-red-50 rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={32} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Upload Image to Convert</h3>
              <p className="text-sm text-slate-400 font-medium">Supports JPG, PNG, WEBP</p>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            </div>
          ) : (
            // Editor State
            <div className="space-y-6 animate-in fade-in duration-500">
              
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="font-bold text-slate-700 truncate max-w-[70%]">{originalFile.name}</span>
                <button onClick={handleReset} className="text-slate-500 p-2 hover:bg-slate-200 rounded-xl transition-colors shrink-0" title="Upload New">
                  <RefreshCw size={18} />
                </button>
              </div>

              {/* PDF Settings */}
              <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                <label className="text-[13px] font-bold text-red-700 uppercase tracking-wider flex items-center gap-2 mb-4">
                  <Settings2 size={16} /> Document Layout Size
                </label>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => setPageFormat("a4")}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all flex items-center gap-3 text-left ${pageFormat === "a4" ? "border-red-500 bg-white shadow-sm" : "border-slate-200 bg-slate-50 hover:border-red-200 text-slate-500"}`}
                  >
                    <FileText size={24} className={pageFormat === "a4" ? "text-red-500" : "text-slate-400"} />
                    <div>
                      <h4 className={`font-bold ${pageFormat === "a4" ? "text-slate-900" : ""}`}>A4 Page (Standard)</h4>
                      <p className="text-xs font-medium mt-0.5">Fits image nicely in center</p>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setPageFormat("fit")}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all flex items-center gap-3 text-left ${pageFormat === "fit" ? "border-red-500 bg-white shadow-sm" : "border-slate-200 bg-slate-50 hover:border-red-200 text-slate-500"}`}
                  >
                    <FileImage size={24} className={pageFormat === "fit" ? "text-red-500" : "text-slate-400"} />
                    <div>
                      <h4 className={`font-bold ${pageFormat === "fit" ? "text-slate-900" : ""}`}>Fit Exact Image</h4>
                      <p className="text-xs font-medium mt-0.5">PDF matches image dimensions</p>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Image Preview */}
              <div className="w-full h-[320px] bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Preview" className="max-h-full object-contain drop-shadow-sm border border-slate-300 bg-white p-2" />
              </div>

              {/* Action Button */}
              <button 
                onClick={handleConvertAndDownload}
                disabled={isConverting}
                className="w-full h-16 flex items-center justify-center gap-2 bg-[#111827] hover:bg-slate-800 text-white rounded-2xl text-lg font-bold transition-all shadow-xl"
              >
                <Download size={20} className="text-red-400" /> 
                {isConverting ? "Creating PDF..." : "Generate PDF Document"}
              </button>
            </div>
          )}
        </div>
        
        {/* Right Column: Sticky Sidebar */}
        <RelatedSidebar tools={documentRelatedTools} />
      </div>
    </div>
  );
}