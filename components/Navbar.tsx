"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Minimize, 
  Maximize, 
  Crop, 
  FileImage, 
  Image as ImageIcon, 
  Layers, 
  FileText, 
  UserSquare,
  Sparkles,
  Files,
  Scissors,
  File
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Image Editing Tools List
  const imageTools = [
    { name: "Compressor", href: "/tools/compressor", icon: Minimize },
    { name: "Resizer", href: "/tools/resizer", icon: Maximize },
    { name: "Cropper", href: "/tools/cropper", icon: Crop },
    { name: "JPG → PNG", href: "/tools/jpg-to-png", icon: FileImage },
    { name: "PNG → JPG", href: "/tools/png-to-jpg", icon: ImageIcon },
    { name: "WebP Converter", href: "/tools/webp-converter", icon: Layers },
    { name: "Passport Photo", href: "/tools/passport-photo", icon: UserSquare },
  ];

  // PDF Tools List
  const pdfTools = [
    { name: "Merge PDF", href: "/tools/merge-pdf", icon: Files },
    { name: "Split PDF", href: "/tools/split-pdf", icon: Scissors },
    { name: "Compress PDF", href: "/tools/compress-pdf", icon: Minimize },
    { name: "PDF → JPG", href: "/tools/pdf-to-jpg", icon: ImageIcon },
    { name: "JPG → PDF", href: "/tools/image-to-pdf", icon: FileText },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-xl">
            M
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">MockupHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600 text-sm">
          
          {/* Tools Dropdown (Mega Menu Style) */}
          <div className="relative group py-8">
            <button className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors font-bold">
              Tools <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>

            {/* Dropdown Panel - Expanded for 3 Columns */}
            <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-[850px] bg-white border border-slate-200 rounded-3xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-6 flex gap-6">
              
              {/* Category 1: Utility Tools */}
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Sparkles size={14} className="text-emerald-500" /> Utility
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="/tools/salary-calculator" className="hover:text-emerald-600 hover:bg-slate-50 p-2 rounded-lg transition-colors">Salary Breakdown</Link>
                  <Link href="/tools/dps-calculator" className="hover:text-emerald-600 hover:bg-slate-50 p-2 rounded-lg transition-colors">DPS Calculator</Link>
                  <Link href="/tools/bus-fare" className="hover:text-emerald-600 hover:bg-slate-50 p-2 rounded-lg transition-colors">Bus Fare Calculator</Link>
                  <Link href="/tools/house-rent" className="hover:text-emerald-600 hover:bg-slate-50 p-2 rounded-lg transition-colors">House Rent Splitter</Link>
                  <Link href="/tools" className="text-emerald-600 font-bold p-2 mt-2">View all 15+ utilities &rarr;</Link>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="w-px bg-slate-100"></div>

              {/* Category 2: Image Editing Tools */}
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ImageIcon size={14} className="text-blue-500" /> Image Editing
                </p>
                <div className="flex flex-col gap-1">
                  {imageTools.map((tool) => (
                    <Link key={tool.name} href={tool.href} className="flex items-center gap-2 hover:text-blue-600 hover:bg-slate-50 p-2 rounded-lg transition-colors text-[13px] font-semibold text-slate-600">
                      <tool.icon size={15} className="text-slate-400" />
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="w-px bg-slate-100"></div>

              {/* Category 3: PDF Tools */}
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <File size={14} className="text-red-500" /> PDF Tools
                </p>
                <div className="flex flex-col gap-1">
                  {pdfTools.map((tool) => (
                    <Link key={tool.name} href={tool.href} className="flex items-center gap-2 hover:text-red-600 hover:bg-slate-50 p-2 rounded-lg transition-colors text-[13px] font-semibold text-slate-600">
                      <tool.icon size={15} className="text-slate-400" />
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <Link href="/ai-tools" className="hover:text-emerald-600 transition-colors font-bold">AI Tools</Link>
          <Link href="/developer" className="hover:text-emerald-600 transition-colors font-bold">Developer</Link>
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/get-started" className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
          
          {/* Mobile Image Tools */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Image Editing Tools</p>
            <div className="grid grid-cols-2 gap-2">
              {imageTools.map((tool) => (
                <Link key={tool.name} href={tool.href} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl text-[13px] font-semibold text-slate-600">
                  <tool.icon size={16} className="text-blue-400" /> {tool.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile PDF Tools */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">PDF Tools</p>
            <div className="grid grid-cols-2 gap-2">
              {pdfTools.map((tool) => (
                <Link key={tool.name} href={tool.href} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl text-[13px] font-semibold text-slate-600">
                  <tool.icon size={16} className="text-red-400" /> {tool.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
      )}
    </nav>
  );
}