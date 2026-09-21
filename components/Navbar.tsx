"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, Menu, X, Minimize, Maximize, Crop, FileImage, 
  Image as ImageIcon, Layers, FileText, UserSquare, Sparkles, 
  Files, Scissors, File, Braces, ShieldCheck, FileJson, 
  Terminal, Link2, Key, Clock, Code2, AlignLeft, Type, Eraser,
  QrCode, Scale, Globe2, Timer, Palette, Bot
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Utility Tools List
  const utilityTools = [
    { name: "QR Generator", href: "/tools/qr-generator", icon: QrCode },
    { name: "Password Gen", href: "/tools/password-generator", icon: Key },
    { name: "Unit Converter", href: "/tools/unit-converter", icon: Scale },
    { name: "Time Zone", href: "/tools/time-zone-converter", icon: Globe2 },
    { name: "Countdown Timer", href: "/tools/countdown-timer", icon: Timer },
    { name: "Color Converter", href: "/tools/color-converter", icon: Palette },
  ];

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

  // Text Tools List
  const textTools = [
    { name: "Word Counter", href: "/tools/word-counter", icon: AlignLeft },
    { name: "Case Converter", href: "/tools/case-converter", icon: Type },
    { name: "Duplicate Remover", href: "/tools/duplicate-remover", icon: Layers },
    { name: "Text Cleaner", href: "/tools/text-cleaner", icon: Eraser },
  ];

  // Developer Tools List - Group 1 (JSON)
  const jsonTools = [
    { name: "JSON Formatter", href: "/tools/json-formatter", icon: Braces },
    { name: "JSON Validator", href: "/tools/json-validator", icon: ShieldCheck },
    { name: "JSON Minifier", href: "/tools/json-minifier", icon: FileJson },
  ];

  // Developer Tools List - Group 2 (Utilities)
  const devUtilities = [
    { name: "Base64 Encoder", href: "/tools/base64", icon: Terminal },
    { name: "URL Encoder/Decoder", href: "/tools/url-encoder", icon: Link2 },
    { name: "UUID Generator", href: "/tools/uuid-generator", icon: Key },
    { name: "Timestamp Converter", href: "/tools/timestamp-converter", icon: Clock },
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
          
          {/* General Tools Dropdown */}
          <div className="relative group py-8">
            <button className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors font-bold">
              Tools <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>

            <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-[1050px] bg-white border border-slate-200 rounded-3xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-6 flex gap-6">
              
              {/* Utility Tools Column */}
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Sparkles size={14} className="text-emerald-500" /> Utility Tools
                </p>
                <div className="flex flex-col gap-1">
                  {utilityTools.map((tool) => (
                    <Link key={tool.name} href={tool.href} className="flex items-center gap-2 hover:text-emerald-600 hover:bg-slate-50 p-2 rounded-lg transition-colors text-[13px] font-semibold text-slate-600">
                      <tool.icon size={15} className="text-slate-400" />
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="w-px bg-slate-100"></div>

              {/* Image Editing Column */}
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

              <div className="w-px bg-slate-100"></div>

              {/* PDF Tools Column */}
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

              <div className="w-px bg-slate-100"></div>

              {/* Text Tools Column */}
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Type size={14} className="text-violet-500" /> Text Tools
                </p>
                <div className="flex flex-col gap-1">
                  {textTools.map((tool) => (
                    <Link key={tool.name} href={tool.href} className="flex items-center gap-2 hover:text-violet-600 hover:bg-slate-50 p-2 rounded-lg transition-colors text-[13px] font-semibold text-slate-600">
                      <tool.icon size={15} className="text-slate-400" />
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <Link href="/ai-tools" className="hover:text-indigo-600 transition-colors font-bold flex items-center gap-1.5">
            <Bot size={16} className="text-indigo-500" /> AI Tools
          </Link>
          
          {/* Developer Tools Dropdown */}
          <div className="relative group py-8">
            <button className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors font-bold">
              Developer <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>

            <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-[550px] bg-white border border-slate-200 rounded-3xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-6 flex gap-6">
              
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Braces size={14} className="text-cyan-500" /> JSON Tools
                </p>
                <div className="flex flex-col gap-1">
                  {jsonTools.map((tool) => (
                    <Link key={tool.name} href={tool.href} className="flex items-center gap-2 hover:text-cyan-600 hover:bg-cyan-50/50 p-2 rounded-lg transition-colors text-[13px] font-semibold text-slate-600">
                      <tool.icon size={15} className="text-slate-400" />
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="w-px bg-slate-100"></div>

              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Code2 size={14} className="text-indigo-500" /> Dev Utilities
                </p>
                <div className="flex flex-col gap-1">
                  {devUtilities.map((tool) => (
                    <Link key={tool.name} href={tool.href} className="flex items-center gap-2 hover:text-indigo-600 hover:bg-indigo-50/50 p-2 rounded-lg transition-colors text-[13px] font-semibold text-slate-600">
                      <tool.icon size={15} className="text-slate-400" />
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>

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
          
          {/* AI Tools prominent link in mobile menu */}
          <Link 
            href="/ai-tools" 
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-[15px] font-bold text-indigo-700 hover:bg-indigo-100 transition-colors"
          >
            <Bot size={20} /> Browse All AI Tools <Sparkles size={16} />
          </Link>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Utility Tools</p>
            <div className="grid grid-cols-2 gap-2">
              {utilityTools.map((tool) => (
                <Link key={tool.name} href={tool.href} onClick={() => setIsOpen(false)} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl text-[13px] font-semibold text-slate-600">
                  <tool.icon size={16} className="text-emerald-500" /> {tool.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Image Editing</p>
            <div className="grid grid-cols-2 gap-2">
              {imageTools.map((tool) => (
                <Link key={tool.name} href={tool.href} onClick={() => setIsOpen(false)} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl text-[13px] font-semibold text-slate-600">
                  <tool.icon size={16} className="text-blue-400" /> {tool.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">PDF Tools</p>
            <div className="grid grid-cols-2 gap-2">
              {pdfTools.map((tool) => (
                <Link key={tool.name} href={tool.href} onClick={() => setIsOpen(false)} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl text-[13px] font-semibold text-slate-600">
                  <tool.icon size={16} className="text-red-400" /> {tool.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Text Tools</p>
            <div className="grid grid-cols-2 gap-2">
              {textTools.map((tool) => (
                <Link key={tool.name} href={tool.href} onClick={() => setIsOpen(false)} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl text-[13px] font-semibold text-slate-600">
                  <tool.icon size={16} className="text-violet-500" /> {tool.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Developer Tools</p>
            <div className="grid grid-cols-1 gap-2">
              {[...jsonTools, ...devUtilities].map((tool) => (
                <Link key={tool.name} href={tool.href} onClick={() => setIsOpen(false)} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl text-[13px] font-semibold text-slate-600">
                  <tool.icon size={16} className="text-cyan-500" /> {tool.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
      )}
    </nav>
  );
}