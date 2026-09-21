"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Scissors, Sparkles, UploadCloud, Download, 
  RefreshCw, FileText, Files, Minimize, Image as ImageIcon, Settings2
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// PDF Category Related Tools
const pdfRelatedTools: SuggestedTool[] = [
  { id: "merge-pdf", name: "Merge PDF", desc: "Combine multiple PDFs together.", icon: Files, href: "/tools/merge-pdf", color: "text-red-500", bg: "bg-red-100" },
  { id: "compress-pdf", name: "Compress PDF", desc: "Reduce PDF file size.", icon: Minimize, href: "/tools/compress-pdf", color: "text-orange-500", bg: "bg-orange-100" },
  { id: "pdf-to-jpg", name: "PDF to JPG", desc: "Convert PDF pages to images.", icon: ImageIcon, href: "/tools/pdf-to-jpg", color: "text-amber-500", bg: "bg-amber-100" }
];

export default function SplitPdfTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [startPage, setStartPage] = useState<number | "">("");
  const [endPage, setEndPage] = useState<number | "">("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle File Upload and Get Total Pages
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    setOriginalFile(file);
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();
      
      setTotalPages(pageCount);
      setStartPage(1);
      setEndPage(pageCount);
    } catch (error) {
      console.error("Error loading PDF:", error);
      alert("Failed to read the PDF. It might be encrypted or corrupted.");
      handleReset();
    } finally {
      setIsProcessing(false);
    }
  };

  // The Core Splitting Engine
  const handleSplitAndDownload = async () => {
    if (!originalFile || totalPages === 0) return;
    
    const start = Number(startPage);
    const end = Number(endPage);

    if (start < 1 || end > totalPages || start > end) {
      alert(`Invalid page range. Please select between 1 and ${totalPages}.`);
      return;
    }

    setIsProcessing(true);

    try {
      const arrayBuffer = await originalFile.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      // Create an array of page indices to extract (0-indexed)
      // e.g., if user wants pages 2 to 4, indices = [1, 2, 3]
      const pageIndices = Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i);
      
      // Copy selected pages
      const copiedPages = await newPdf.copyPages(originalPdf, pageIndices);
      
      // Add them to the new document
      copiedPages.forEach((page) => newPdf.addPage(page));

      // Save and Download
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      
      const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
      link.download = `${baseName}_Pages_${start}-${end}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error splitting PDF:", error);
      alert("An error occurred while splitting the PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setOriginalFile(null);
    setTotalPages(0);
    setStartPage("");
    setEndPage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-rose-500" />
          Pro PDF Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Split <span className="text-rose-500">PDF Pages</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          বড় কোনো PDF ফাইল থেকে শুধু আপনার প্রয়োজনীয় নির্দিষ্ট পেজগুলো কেটে আলাদা একটি PDF তৈরি করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {!originalFile ? (
            // Upload State
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-80 border-3 border-dashed border-rose-200 hover:border-rose-500 bg-rose-50/50 hover:bg-rose-50 rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={32} className="text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Upload PDF File</h3>
              <p className="text-sm text-slate-400 font-medium">Processed securely in your browser</p>
              <input type="file" accept="application/pdf" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            </div>
          ) : (
            // Editor State
            <div className="space-y-6 animate-in fade-in duration-500">
              
              {/* File Info Bar */}
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-bold text-slate-700 text-sm truncate max-w-[200px] md:max-w-[300px]">{originalFile.name}</span>
                    <span className="text-xs font-medium text-slate-500">{formatBytes(originalFile.size)} • {totalPages} Pages Total</span>
                  </div>
                </div>
                <button onClick={handleReset} className="text-rose-500 p-2 hover:bg-rose-100 rounded-xl transition-colors shrink-0" title="Upload New">
                  <RefreshCw size={18} />
                </button>
              </div>

              {/* Extraction Settings */}
              <div className="bg-rose-50/50 p-6 md:p-8 rounded-3xl border border-rose-100">
                <h3 className="text-[13px] font-bold text-rose-700 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Settings2 size={16} /> Page Extraction Range
                </h3>
                
                <div className="flex flex-col md:flex-row items-center gap-4">
                  {/* Start Page */}
                  <div className="flex-1 w-full">
                    <label className="text-[11px] font-bold text-slate-500 uppercase mb-2 block">From Page</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        min="1"
                        max={totalPages}
                        value={startPage}
                        onChange={(e) => setStartPage(e.target.value ? Number(e.target.value) : "")}
                        className="w-full h-14 bg-white border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 rounded-xl px-4 text-xl font-bold text-[#111827] outline-none transition-all"
                        placeholder="1"
                      />
                    </div>
                  </div>

                  <div className="hidden md:flex flex-col items-center justify-center mt-6">
                    <div className="w-8 h-px bg-slate-300"></div>
                  </div>

                  {/* End Page */}
                  <div className="flex-1 w-full">
                    <label className="text-[11px] font-bold text-slate-500 uppercase mb-2 block">To Page</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        min="1"
                        max={totalPages}
                        value={endPage}
                        onChange={(e) => setEndPage(e.target.value ? Number(e.target.value) : "")}
                        className="w-full h-14 bg-white border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 rounded-xl px-4 text-xl font-bold text-[#111827] outline-none transition-all"
                        placeholder={totalPages.toString()}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-white rounded-xl border border-rose-100 flex items-start gap-3">
                  <div className="text-rose-500 mt-0.5"><Scissors size={18} /></div>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    This will create a new PDF containing exactly <span className="font-bold text-rose-600">{(Number(endPage) || 0) - (Number(startPage) || 0) + 1}</span> page(s) extracted from the original document.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={handleSplitAndDownload}
                disabled={isProcessing}
                className="w-full h-16 flex items-center justify-center gap-2 bg-[#111827] hover:bg-slate-800 text-white rounded-2xl text-lg font-bold transition-all shadow-xl"
              >
                <Download size={20} className="text-rose-400" /> 
                {isProcessing ? "Processing..." : "Extract Pages & Download"}
              </button>
              
            </div>
          )}

        </div>

        {/* Right Column: Sticky Sidebar */}
        <RelatedSidebar tools={pdfRelatedTools} />

      </div>
    </div>
  );
}