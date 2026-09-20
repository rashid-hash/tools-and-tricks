"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  UserSquare, Sparkles, UploadCloud, Download, 
  RefreshCw, Crop, Monitor, Printer, Scissors, Settings2, FileImage
} from "lucide-react";
import ReactCrop, { type Crop as CropType, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Custom Image Editing Related Tools
const imageRelatedTools: SuggestedTool[] = [
  { id: "cropper", name: "Image Cropper", desc: "Crop images to custom ratios.", icon: Crop, href: "/tools/cropper", color: "text-fuchsia-500", bg: "bg-fuchsia-100" },
  { id: "resizer", name: "Image Resizer", desc: "Resize images to exact pixels.", icon: Monitor, href: "/tools/resizer", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "image-to-pdf", name: "Image to PDF", desc: "Convert photos to A4 PDF.", icon: FileImage, href: "/tools/image-to-pdf", color: "text-red-500", bg: "bg-red-100" }
];

// Standard Dimensions at 300 DPI
const PHOTO_FORMATS = {
  passportBD: { w: 472, h: 591, aspect: 40 / 50, label: "BD Passport (40x50 mm)" },
  visaStandard: { w: 413, h: 531, aspect: 35 / 45, label: "Visa / Standard (35x45 mm)" },
  stampSize: { w: 236, h: 295, aspect: 20 / 25, label: "Stamp Size (20x25 mm)" }
};

export default function PassportPhotoMaker() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Crop & Settings State
  const [crop, setCrop] = useState<CropType>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [format, setFormat] = useState<keyof typeof PHOTO_FORMATS>("passportBD");
  const [layout, setLayout] = useState<"single" | "4r">("4r");
  const [isGenerating, setIsGenerating] = useState(false);

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
    
    // Default crop box setup
    const defaultCrop: CropType = {
      unit: '%',
      width: 50,
      height: 50 / PHOTO_FORMATS[format].aspect,
      x: 25,
      y: 10
    };
    setCrop(defaultCrop);
    setCompletedCrop(null);
  };

  // Change format and reset crop box aspect ratio
  const handleFormatChange = (newFormat: keyof typeof PHOTO_FORMATS) => {
    setFormat(newFormat);
    setCrop({
      unit: '%',
      width: 50,
      height: 50 / PHOTO_FORMATS[newFormat].aspect,
      x: 25,
      y: 10
    });
  };

  // Core Processing Engine
  const handleDownload = () => {
    if (!completedCrop || !imgRef.current || !originalFile) return;
    setIsGenerating(true);

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Calculate actual scale (natural size vs displayed size)
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    // 1. Extract the cropped region at its original resolution
    const sourceCropWidth = completedCrop.width * scaleX;
    const sourceCropHeight = completedCrop.height * scaleY;

    // Target dimensions for the specific photo size at 300 DPI
    const targetW = PHOTO_FORMATS[format].w;
    const targetH = PHOTO_FORMATS[format].h;

    // Create an offscreen canvas for the perfectly resized single photo
    const singleCanvas = document.createElement("canvas");
    singleCanvas.width = targetW;
    singleCanvas.height = targetH;
    const singleCtx = singleCanvas.getContext("2d");
    if (!singleCtx) return;

    singleCtx.imageSmoothingQuality = "high";
    singleCtx.fillStyle = "#FFFFFF"; // Fill white bg for transparent images
    singleCtx.fillRect(0, 0, targetW, targetH);
    
    singleCtx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      sourceCropWidth,
      sourceCropHeight,
      0,
      0,
      targetW,
      targetH
    );

    // 2. Output Logic (Single vs 4R Sheet)
    if (layout === "single") {
      downloadCanvasAsImage(singleCanvas, `${originalFile.name.split('.')[0]}_${format}.jpg`);
      setIsGenerating(false);
    } else {
      // 4R Sheet Generation (Landscape 4x6 inches @ 300DPI = 1800x1200 px)
      canvas.width = 1800;
      canvas.height = 1200;
      ctx.fillStyle = "#FFFFFF"; // White photo paper background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid Calculation (Fitting photos on 4R)
      // Usually fits 8 standard passport/visa photos on a 4R sheet (4 columns, 2 rows)
      const cols = 4;
      const rows = 2;
      
      // Calculate spacing to center the grid
      const totalPhotosWidth = cols * targetW;
      const totalPhotosHeight = rows * targetH;
      const spacingX = (canvas.width - totalPhotosWidth) / (cols + 1);
      const spacingY = (canvas.height - totalPhotosHeight) / (rows + 1);

      // Draw the single photo multiple times onto the 4R canvas
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const xPos = spacingX + c * (targetW + spacingX);
          const yPos = spacingY + r * (targetH + spacingY);
          
          // Draw a faint cut-line (border) around each photo
          ctx.strokeStyle = "#E2E8F0";
          ctx.lineWidth = 2;
          ctx.strokeRect(xPos - 1, yPos - 1, targetW + 2, targetH + 2);
          
          // Draw the actual photo
          ctx.drawImage(singleCanvas, xPos, yPos, targetW, targetH);
        }
      }
      downloadCanvasAsImage(canvas, `${originalFile.name.split('.')[0]}_4R_PrintSheet.jpg`);
      setIsGenerating(false);
    }
  };

  const downloadCanvasAsImage = (canvasElement: HTMLCanvasElement, filename: string) => {
    canvasElement.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, "image/jpeg", 1.0); // 100% Quality for printing
  };

  const handleReset = () => {
    if (imgSrc) URL.revokeObjectURL(imgSrc);
    setOriginalFile(null);
    setImgSrc("");
    setCompletedCrop(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-indigo-500" />
          Pro Image Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Passport Photo <span className="text-indigo-500">Maker</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          যেকোনো ছবিকে প্রফেশনাল পাসপোর্ট বা স্ট্যাম্প সাইজে রূপান্তর করুন এবং প্রিন্ট করার জন্য এক ক্লিকে 4R (৮ কপি) শিট তৈরি করুন।
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
              <h3 className="text-xl font-bold text-slate-700 mb-2">Upload Photo</h3>
              <p className="text-sm text-slate-400 font-medium">For best results, upload a photo with a plain background.</p>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
            </div>
          ) : (
            // Editor State
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Image Cropper Area (Takes 7 columns on Desktop) */}
                <div className="lg:col-span-7 flex flex-col gap-3">
                  <div className="flex justify-between items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2"><Scissors size={14}/> Crop Subject</span>
                    <button onClick={handleReset} className="text-rose-500 hover:text-rose-600 font-bold text-xs flex items-center gap-1.5 transition-colors">
                      <RefreshCw size={14} /> Upload New
                    </button>
                  </div>
                  
                  <div className="w-full bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4 min-h-[400px]">
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={PHOTO_FORMATS[format].aspect}
                      className="max-h-[60vh] shadow-xl"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img ref={imgRef} alt="Crop preview" src={imgSrc} className="max-h-[60vh] w-auto object-contain" />
                    </ReactCrop>
                  </div>
                </div>

                {/* Settings Panel (Takes 5 columns on Desktop) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  
                  {/* Photo Size Selection */}
                  <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100">
                    <label className="text-[12px] font-bold text-indigo-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Settings2 size={16} /> Select Photo Size
                    </label>
                    <div className="flex flex-col gap-2">
                      {(Object.keys(PHOTO_FORMATS) as Array<keyof typeof PHOTO_FORMATS>).map((key) => (
                        <button 
                          key={key}
                          onClick={() => handleFormatChange(key)}
                          className={`p-3 rounded-xl border text-sm font-bold text-left transition-all flex justify-between items-center ${format === key ? "bg-white border-indigo-500 text-indigo-700 shadow-sm" : "bg-transparent border-indigo-200 text-slate-500 hover:border-indigo-300"}`}
                        >
                          {PHOTO_FORMATS[key].label}
                          {format === key && <div className="w-2 h-2 rounded-full bg-indigo-500"></div>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Layout Selection */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">
                      Download Layout
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setLayout("single")}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center ${layout === "single" ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white text-slate-500 hover:border-indigo-200"}`}
                      >
                        <UserSquare size={24} className={layout === "single" ? "text-indigo-500" : "text-slate-400"} />
                        <span className="text-xs font-bold">Single Photo<br/><span className="font-medium text-[10px]">For Online Use</span></span>
                      </button>
                      
                      <button 
                        onClick={() => setLayout("4r")}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center ${layout === "4r" ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white text-slate-500 hover:border-indigo-200"}`}
                      >
                        <Printer size={24} className={layout === "4r" ? "text-indigo-500" : "text-slate-400"} />
                        <span className="text-xs font-bold">4R Print Sheet<br/><span className="font-medium text-[10px]">8 Copies on 4x6&quot;</span></span>
                      </button>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto pt-2">
                    <button 
                      onClick={handleDownload}
                      disabled={isGenerating || !completedCrop?.width}
                      className={`w-full h-16 flex items-center justify-center gap-2 rounded-2xl text-lg font-bold transition-all shadow-xl ${
                        completedCrop?.width 
                        ? "bg-[#111827] hover:bg-slate-800 text-white shadow-slate-900/10 cursor-pointer" 
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <Download size={20} className={completedCrop?.width ? "text-indigo-400" : "text-slate-400"} /> 
                      {isGenerating ? "Processing..." : `Download ${layout === '4r' ? '4R Sheet' : 'Photo'}`}
                    </button>
                    {layout === '4r' && (
                      <p className="text-center text-[11px] font-medium text-slate-400 mt-3 leading-relaxed">
                        Ready to print at any studio on standard 4R (4x6 inch) glossy paper. Cut-lines are included automatically!
                      </p>
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
