"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Files, Sparkles, UploadCloud, Download, 
  Trash2, FileText, ArrowUp, ArrowDown, Scissors, Minimize, Image as ImageIcon
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// PDF Category Related Tools
const pdfRelatedTools: SuggestedTool[] = [
  { id: "split-pdf", name: "Split PDF", desc: "Extract pages from PDF.", icon: Scissors, href: "/tools/split-pdf", color: "text-rose-500", bg: "bg-rose-100" },
  { id: "compress-pdf", name: "Compress PDF", desc: "Reduce PDF file size.", icon: Minimize, href: "/tools/compress-pdf", color: "text-orange-500", bg: "bg-orange-100" },
  { id: "pdf-to-jpg", name: "PDF to JPG", desc: "Convert PDF pages to images.", icon: ImageIcon, href: "/tools/pdf-to-jpg", color: "text-amber-500", bg: "bg-amber-100" }
];

export default function MergePdfTool() {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Multi-file Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validPdfs = files.filter(file => file.type === "application/pdf");
    
    if (validPdfs.length !== files.length) {
      alert("Only PDF files are allowed.");
    }

    setPdfFiles(prev => [...prev, ...validPdfs]);
    
    // Reset input value so same files can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Reorder Files
  const moveFileUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...pdfFiles];
    [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
    setPdfFiles(newFiles);
  };

  const moveFileDown = (index: number) => {
    if (index === pdfFiles.length - 1) return;
    const newFiles = [...pdfFiles];
    [newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]];
    setPdfFiles(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = pdfFiles.filter((_, i) => i !== index);
    setPdfFiles(newFiles);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Core Merging Engine
  const handleMergeAndDownload = async () => {
    if (pdfFiles.length < 2) {
      alert("Please upload at least 2 PDF files to merge.");
      return;
    }

    setIsMerging(true);

    try {
      // Create a new blank PDF Document
      const mergedPdf = await PDFDocument.create();

      // Loop through each uploaded file in order
      for (const file of pdfFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        
        // Copy all pages from the current pdf
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        
        // Add them to the merged document
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      // Save the merged PDF
      const pdfBytes = await mergedPdf.save();
      
      // Trigger Download
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Merged_Document_${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("Failed to merge PDFs. The files might be encrypted or corrupted.");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-red-500" />
          Pro PDF Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Merge <span className="text-red-600">PDF Files</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          একাধিক PDF ফাইলকে একত্রিত করে একটি সিঙ্গেল ফাইলে পরিণত করুন। আপনার ফাইল আপনার ব্রাউজারেই প্রসেস হবে, তাই এটি ১০০% নিরাপদ।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {/* Upload Box */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-40 border-3 border-dashed border-red-200 hover:border-red-500 bg-red-50/50 hover:bg-red-50 rounded-[24px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group mb-8"
          >
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud size={24} className="text-red-500" />
            </div>
            <h3 className="text-base font-bold text-slate-700">Add PDF Files</h3>
            <input 
              type="file" 
              accept="application/pdf" 
              multiple 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </div>

          {/* File List */}
          {pdfFiles.length > 0 && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                  Files to Merge ({pdfFiles.length})
                </h3>
                <span className="text-xs text-slate-400 font-medium">Drag to reorder functionality simulated by arrows</span>
              </div>

              <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {pdfFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="font-bold text-slate-700 text-sm truncate">{file.name}</span>
                        <span className="text-xs font-medium text-slate-400">{formatBytes(file.size)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      <div className="flex flex-col gap-1 mr-2">
                        <button 
                          onClick={() => moveFileUp(index)}
                          disabled={index === 0}
                          className={`p-1 rounded-md ${index === 0 ? "text-slate-300 cursor-not-allowed" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"}`}
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button 
                          onClick={() => moveFileDown(index)}
                          disabled={index === pdfFiles.length - 1}
                          className={`p-1 rounded-md ${index === pdfFiles.length - 1 ? "text-slate-300 cursor-not-allowed" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"}`}
                        >
                          <ArrowDown size={14} />
                        </button>
                      </div>
                      <div className="w-px h-8 bg-slate-200 mx-1"></div>
                      <button 
                        onClick={() => removeFile(index)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Remove file"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-slate-100">
                <button 
                  onClick={handleMergeAndDownload}
                  disabled={isMerging || pdfFiles.length < 2}
                  className={`w-full h-16 flex items-center justify-center gap-2 rounded-2xl text-lg font-bold transition-all shadow-xl ${
                    pdfFiles.length >= 2 
                    ? "bg-[#111827] hover:bg-slate-800 text-white shadow-slate-900/10 cursor-pointer" 
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {isMerging ? (
                    <span className="flex items-center gap-2">Merging...</span>
                  ) : (
                    <>
                      <Files size={20} className={pdfFiles.length >= 2 ? "text-red-400" : "text-slate-400"} /> 
                      {pdfFiles.length < 2 ? "Upload at least 2 files" : "Merge PDFs & Download"}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Sticky Sidebar */}
        <RelatedSidebar tools={pdfRelatedTools} />

      </div>
    </div>
  );
}