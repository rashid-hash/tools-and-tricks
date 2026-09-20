"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Minimize, Sparkles, UploadCloud, Download, 
  RefreshCw, FileText, Files, Scissors, Image as ImageIcon, 
  CheckCircle2, AlertCircle
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

const pdfRelatedTools: SuggestedTool[] = [
  { id: "merge-pdf", name: "Merge PDF", desc: "Combine multiple PDFs together.", icon: Files, href: "/tools/merge-pdf", color: "text-red-500", bg: "bg-red-100" },
  { id: "split-pdf", name: "Split PDF", desc: "Extract pages from PDF.", icon: Scissors, href: "/tools/split-pdf", color: "text-rose-500", bg: "bg-rose-100" },
  { id: "pdf-to-jpg", name: "PDF to JPG", desc: "Convert PDF pages to images.", icon: ImageIcon, href: "/tools/pdf-to-jpg", color: "text-amber-500", bg: "bg-amber-100" }
];

export default function CompressPdfTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    setOriginalFile(file);
    setOriginalSize(file.size);
    setCompressedSize(0);
    setCompressedBlob(null);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCompress = async () => {
    if (!originalFile) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await originalFile.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer);
      
      // Create a fresh PDF document
      const newPdf = await PDFDocument.create();
      
      // Copy all pages. This strips out unused objects, old revisions, and unnecessary metadata.
      const copiedPages = await newPdf.copyPages(originalPdf, originalPdf.getPageIndices());
      copiedPages.forEach((page) => newPdf.addPage(page));

      // Save with object streams to maximize compression
      const pdfBytes = await newPdf.save({ useObjectStreams: true });
      
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setCompressedBlob(blob);
      setCompressedSize(blob.size);

    } catch (error) {
      console.error("Error compressing PDF:", error);
      alert("Failed to compress the PDF. The file might be encrypted or corrupted.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob || !originalFile) return;
    const url = URL.createObjectURL(compressedBlob);
    const link = document.createElement("a");
    link.href = url;
    
    const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
    link.download = `${baseName}_compressed.pdf`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setCompressedBlob(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const savedPercentage = originalSize > 0 && compressedSize > 0
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-bold text-orange-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-orange-500" />
          Pro PDF Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Compress <span className="text-orange-500">PDF File</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার ব্রাউজার ব্যবহার করে PDF ফাইলের মেটাডেটা এবং অপ্রয়োজনীয় অবজেক্ট মুছে ফেলে ফাইলের সাইজ অপ্টিমাইজ করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {!originalFile ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-80 border-3 border-dashed border-orange-200 hover:border-orange-500 bg-orange-50/50 hover:bg-orange-50 rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={32} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Upload PDF to Compress</h3>
              <p className="text-sm text-slate-400 font-medium">Processed securely in your browser</p>
              <input type="file" accept="application/pdf" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-bold text-slate-700 text-sm truncate max-w-[200px] md:max-w-[300px]">{originalFile.name}</span>
                    <span className="text-xs font-medium text-slate-500">Original Size: {formatBytes(originalSize)}</span>
                  </div>
                </div>
                <button onClick={handleReset} className="text-rose-500 p-2 hover:bg-rose-100 rounded-xl transition-colors shrink-0" title="Upload New">
                  <RefreshCw size={18} />
                </button>
              </div>

              {!compressedBlob ? (
                <div className="pt-4">
                  <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-start gap-3">
                    <div className="text-orange-500 mt-0.5"><AlertCircle size={18} /></div>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">
                      Client-side compression works by stripping unused objects, metadata, and redundant streams. Highly optimized or image-heavy PDFs may see minimal size reduction.
                    </p>
                  </div>
                  <button 
                    onClick={handleCompress}
                    disabled={isProcessing}
                    className="w-full h-16 flex items-center justify-center gap-2 bg-[#111827] hover:bg-slate-800 text-white rounded-2xl text-lg font-bold transition-all shadow-xl"
                  >
                    <Minimize size={20} className="text-orange-400" /> 
                    {isProcessing ? "Compressing PDF..." : "Start Compression"}
                  </button>
                </div>
              ) : (
                <div className="pt-2 animate-in fade-in slide-in-from-bottom-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-emerald-800 mb-1">Compression Complete</h3>
                    
                    {savedPercentage > 0 ? (
                      <p className="text-emerald-600 font-medium text-sm">
                        File size reduced by <span className="font-bold text-emerald-700">{savedPercentage}%</span>
                      </p>
                    ) : (
                      <p className="text-emerald-600 font-medium text-sm">
                        File is already highly optimized.
                      </p>
                    )}
                    
                    <div className="flex gap-8 mt-4 pt-4 border-t border-emerald-200/50 w-full justify-center">
                      <div>
                        <p className="text-xs font-bold text-emerald-600/70 uppercase tracking-widest mb-1">Original</p>
                        <p className="font-bold text-slate-600">{formatBytes(originalSize)}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-600/70 uppercase tracking-widest mb-1">Compressed</p>
                        <p className="font-bold text-emerald-700 text-xl">{formatBytes(compressedSize)}</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleDownload}
                    className="w-full h-16 flex items-center justify-center gap-2 bg-[#111827] hover:bg-slate-800 text-white rounded-2xl text-lg font-bold transition-all shadow-xl"
                  >
                    <Download size={20} className="text-orange-400" /> 
                    Download Compressed PDF
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <RelatedSidebar tools={pdfRelatedTools} />
      </div>
    </div>
  );
}