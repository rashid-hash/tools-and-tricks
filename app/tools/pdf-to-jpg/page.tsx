"use client";

import React, { useState, useRef, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Image as ImageIcon, Sparkles, UploadCloud, Download, 
  RefreshCw, FileText, ChevronLeft, ChevronRight, Settings2, FileImage, Files, Scissors
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

const pdfRelatedTools: SuggestedTool[] = [
  { id: "merge-pdf", name: "Merge PDF", desc: "Combine multiple PDFs together.", icon: Files, href: "/tools/merge-pdf", color: "text-red-500", bg: "bg-red-100" },
  { id: "split-pdf", name: "Split PDF", desc: "Extract pages from PDF.", icon: Scissors, href: "/tools/split-pdf", color: "text-rose-500", bg: "bg-rose-100" },
  { id: "image-to-pdf", name: "Image to PDF", desc: "Convert JPG/PNG to PDF.", icon: FileImage, href: "/tools/image-to-pdf", color: "text-purple-500", bg: "bg-purple-100" }
];

export default function PdfToJpgTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [pdfDocument, setPdfDocument] = useState<any>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imageQuality, setImageQuality] = useState<number>(2); // Scale multiplier (2 = High Res)
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfjsLibRef = useRef<any>(null);

  // 1. Updated PDF.js Initialization (Forcing .mjs extension)
  useEffect(() => {
    const initPdfJs = async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        
        // pdfjs-dist এর লেটেস্ট ভার্সনগুলোর জন্য বাধ্যতামূলক .mjs এক্সটেনশন
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
        
        pdfjsLibRef.current = pdfjsLib;
      } catch (error) {
        console.error("Failed to initialize PDF.js:", error);
      }
    };
    initPdfJs();
  }, []);

  // 2. Updated File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    if (!pdfjsLibRef.current) {
      alert("PDF processor is still loading. Please wait a second.");
      return;
    }

    setOriginalFile(file);
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      // ArrayBuffer কে Uint8Array তে কনভার্ট করা (লেটেস্ট ভার্সনের রিকোয়ারমেন্ট)
      const typedArray = new Uint8Array(arrayBuffer);
      
      const loadingTask = pdfjsLibRef.current.getDocument({ data: typedArray });
      const pdf = await loadingTask.promise;
      
      setPdfDocument(pdf);
      setTotalPages(pdf.numPages);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error loading PDF:", error);
      alert("Failed to read the PDF. Please check your internet connection to load the PDF Worker.");
      handleReset();
    } finally {
      setIsProcessing(false);
    }
  };

  // Render the selected page to canvas
  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDocument || !canvasRef.current) return;
      setIsProcessing(true);

      try {
        const page = await pdfDocument.getPage(currentPage);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        if (!ctx) return;

        // Scale determines resolution. 2.0 is good for high-quality JPG exports.
        const viewport = page.getViewport({ scale: imageQuality });
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
          background: "rgba(255, 255, 255, 1)" // Ensure white bg instead of transparent
        };

        await page.render(renderContext).promise;
      } catch (error) {
        console.error("Error rendering page:", error);
      } finally {
        setIsProcessing(false);
      }
    };

    renderPage();
  }, [pdfDocument, currentPage, imageQuality]);

  // Handle Download Action
  const handleDownload = () => {
    if (!canvasRef.current || !originalFile) return;

    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      
      const baseName = originalFile.name.replace(/\.[^/.]+$/, "");
      link.download = `${baseName}_Page_${currentPage}.jpg`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, "image/jpeg", 0.95); // High quality JPG
  };

  const handleReset = () => {
    setOriginalFile(null);
    setPdfDocument(null);
    setTotalPages(0);
    setCurrentPage(1);
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
      
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-amber-500" />
          Pro PDF Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          PDF to <span className="text-amber-500">JPG</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          PDF ফাইলের যেকোনো পেজকে হাই-রেজোলিউশন (High Resolution) JPG ইমেজে রূপান্তর করুন একদম নিরাপদে।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        <div className="flex-1 w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
          
          {!originalFile ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-80 border-3 border-dashed border-amber-200 hover:border-amber-500 bg-amber-50/50 hover:bg-amber-50 rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={32} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Upload PDF File</h3>
              <p className="text-sm text-slate-400 font-medium">Processed securely in your browser</p>
              <input type="file" accept="application/pdf" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-500">
              
              {/* File Info Bar */}
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-bold text-slate-700 text-sm truncate max-w-[200px] md:max-w-[300px]">{originalFile.name}</span>
                    <span className="text-xs font-medium text-slate-500">{formatBytes(originalFile.size)} • {totalPages} Pages</span>
                  </div>
                </div>
                <button onClick={handleReset} className="text-rose-500 p-2 hover:bg-rose-100 rounded-xl transition-colors shrink-0" title="Upload New">
                  <RefreshCw size={18} />
                </button>
              </div>

              {/* PDF Preview and Controls */}
              <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100">
                
                {/* Pagination Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1 || isProcessing}
                      className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="font-bold text-slate-700 w-24 text-center">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages || isProcessing}
                      className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Quality Selector */}
                  <div className="flex items-center gap-3 bg-white px-4 py-2 border border-slate-200 rounded-xl">
                    <Settings2 size={16} className="text-amber-600" />
                    <span className="text-sm font-bold text-slate-600">Export Quality:</span>
                    <select 
                      value={imageQuality} 
                      onChange={(e) => setImageQuality(Number(e.target.value))}
                      className="text-sm font-bold text-[#111827] bg-transparent outline-none cursor-pointer"
                    >
                      <option value={1}>Standard (1x)</option>
                      <option value={2}>High Res (2x)</option>
                      <option value={3}>Ultra HD (3x)</option>
                    </select>
                  </div>
                </div>

                {/* Canvas Render Area */}
                <div className="w-full h-auto bg-slate-200 rounded-2xl border border-slate-300 overflow-hidden flex items-center justify-center relative min-h-[400px]">
                  {isProcessing && (
                    <div className="absolute inset-0 bg-slate-100/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                      <RefreshCw size={32} className="text-amber-500 animate-spin mb-3" />
                      <p className="font-bold text-slate-600 text-sm">Rendering Page...</p>
                    </div>
                  )}
                  
                  {/* The actual canvas rendering the PDF page */}
                  <canvas 
                    ref={canvasRef} 
                    className="max-w-full h-auto shadow-md bg-white transition-opacity duration-300"
                    style={{ opacity: isProcessing ? 0.3 : 1 }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={handleDownload}
                disabled={isProcessing}
                className="w-full h-16 flex items-center justify-center gap-2 bg-[#111827] hover:bg-slate-800 text-white rounded-2xl text-lg font-bold transition-all shadow-xl"
              >
                <Download size={20} className="text-amber-400" /> 
                Download Page {currentPage} as JPG
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