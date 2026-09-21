"use client";

import React, { useState, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import QRCode from "react-qr-code";
import { 
  QrCode, Sparkles, Download, Type, Link2, 
  Phone, Mail, Wifi, MapPin, AlignLeft, ShieldCheck, Key
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Utility Category Related Tools
const utilityRelatedTools: SuggestedTool[] = [
  { id: "password-generator", name: "Password Generator", desc: "Create secure passwords.", icon: Key, href: "/tools/password-generator", color: "text-red-500", bg: "bg-red-100" },
  { id: "color-converter", name: "Color Converter", desc: "HEX to RGB/HSL converter.", icon: Sparkles, href: "/tools/color-converter", color: "text-rose-500", bg: "bg-rose-100" },
  { id: "json-validator", name: "JSON Validator", desc: "Check if JSON is valid.", icon: ShieldCheck, href: "/tools/json-validator", color: "text-emerald-500", bg: "bg-emerald-100" }
];

export default function QrGeneratorTool() {
  const [inputValue, setInputValue] = useState<string>("https://mockuphub.com");
  const [qrType, setQrType] = useState<"text" | "url" | "phone" | "email" | "wifi">("url");
  
  // Customization State
  const [fgColor, setFgColor] = useState<string>("#111827");
  const [bgColor, setBgColor] = useState<string>("#FFFFFF");
  const [size, setSize] = useState<number>(256);

  const qrRef = useRef<HTMLDivElement>(null);

  // Type specific inputs
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [wifiName, setWifiName] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiType, setWifiType] = useState<"WEP" | "WPA" | "nopass">("WPA");

  // Dynamic Value Generator based on selected Type
  React.useEffect(() => {
    switch (qrType) {
      case "url":
      case "text":
        // Direct input handles these
        break;
      case "phone":
        setInputValue(`tel:${phone}`);
        break;
      case "email":
        setInputValue(`mailto:${email}?subject=${encodeURIComponent(subject)}`);
        break;
      case "wifi":
        setInputValue(`WIFI:T:${wifiType};S:${wifiName};P:${wifiPass};H:;`);
        break;
    }
  }, [qrType, phone, email, subject, wifiName, wifiPass, wifiType]);

  const handleDownload = () => {
    if (!qrRef.current) return;
    
    // Find the SVG element inside the wrapper
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    // Set high resolution for download
    const scale = 4; // 4x multiplier for better quality (1024px)
    canvas.width = size * scale;
    canvas.height = size * scale;

    img.onload = () => {
      // Draw background
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw SVG
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Trigger download
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `mockuphub-qr-${new Date().getTime()}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const tabs = [
    { id: "url", icon: Link2, label: "URL" },
    { id: "text", icon: Type, label: "Text" },
    { id: "phone", icon: Phone, label: "Phone" },
    { id: "email", icon: Mail, label: "Email" },
    { id: "wifi", icon: Wifi, label: "Wi-Fi" },
  ];

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-emerald-500" />
          Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          QR Code <span className="text-emerald-500">Generator</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার ওয়েবসাইট, ওয়াই-ফাই বা কন্টাক্ট নাম্বারের জন্য কাস্টম ডিজাইনের কিউআর কোড (QR Code) তৈরি করুন এবং হাই-কোয়ালিটি PNG ফরমেটে ডাউনলোড করুন।
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full flex flex-col md:flex-row gap-6">
          
          {/* Input & Settings Panel */}
          <div className="flex-1 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60 flex flex-col gap-8">
            
            {/* Tab Selector */}
            <div>
              <p className="text-[12px] font-bold text-slate-500 uppercase block mb-3">Select QR Type</p>
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setQrType(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      qrType === tab.id 
                        ? "bg-emerald-500 text-white shadow-md" 
                        : "bg-slate-50 text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
                    }`}
                  >
                    <tab.icon size={16} /> <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Input Forms */}
            <div className="flex-1">
              {qrType === "url" && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase block mb-2">Website URL</label>
                    <input 
                      type="url" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="https://mockuphub.com"
                      className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-base font-bold text-[#111827] outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {qrType === "text" && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase block mb-2">Your Text / Message</label>
                    <textarea 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full h-32 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl p-4 text-base font-bold text-[#111827] outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {qrType === "phone" && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase block mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1XXX XXXXXX"
                      className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-base font-bold text-[#111827] outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {qrType === "email" && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase block mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@example.com"
                      className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-base font-bold text-[#111827] outline-none transition-all mb-4"
                    />
                    <label className="text-[12px] font-bold text-slate-500 uppercase block mb-2">Subject (Optional)</label>
                    <input 
                      type="text" 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Meeting inquiry..."
                      className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-base font-bold text-[#111827] outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {qrType === "wifi" && (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <label className="text-[12px] font-bold text-slate-500 uppercase block mb-2">Network Name (SSID)</label>
                    <input 
                      type="text" 
                      value={wifiName}
                      onChange={(e) => setWifiName(e.target.value)}
                      placeholder="My_Home_WiFi"
                      className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-base font-bold text-[#111827] outline-none transition-all mb-4"
                    />
                    <label className="text-[12px] font-bold text-slate-500 uppercase block mb-2">Password</label>
                    <input 
                      type="password" 
                      value={wifiPass}
                      onChange={(e) => setWifiPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-base font-bold text-[#111827] outline-none transition-all mb-4"
                    />
                    <label className="text-[12px] font-bold text-slate-500 uppercase block mb-2">Security</label>
                    <select 
                      value={wifiType}
                      onChange={(e) => setWifiType(e.target.value as any)}
                      className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-base font-bold text-[#111827] outline-none transition-all cursor-pointer"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None (Open)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Design & Colors */}
            <div className="pt-6 border-t border-slate-100">
              <p className="text-[12px] font-bold text-slate-500 uppercase block mb-4">Custom Colors</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0" />
                  <span className="text-sm font-bold text-slate-700">QR Color</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0" />
                  <span className="text-sm font-bold text-slate-700">Background</span>
                </div>
              </div>
            </div>

          </div>

          {/* Preview Panel */}
          <div className="w-full md:w-[350px] bg-[#0F172A] p-6 rounded-3xl shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-700/50 flex flex-col items-center">
            
            <h3 className="text-[13px] font-bold text-emerald-400 uppercase tracking-widest mb-8 flex items-center gap-2 w-full justify-center">
              <QrCode size={16} /> Live Preview
            </h3>

            {/* QR Code Container */}
            <div 
              ref={qrRef}
              className="p-4 bg-white rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: bgColor }}
            >
              <QRCode
                value={inputValue || "https://mockuphub.com"}
                size={220}
                fgColor={fgColor}
                bgColor={bgColor}
                level="Q" // Higher error correction
                className="w-full h-auto"
              />
            </div>

            <p className="text-xs text-slate-400 mt-6 text-center font-medium max-w-[250px] break-all">
              {inputValue || "Enter text to generate QR code"}
            </p>

            <button 
              onClick={handleDownload}
              className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-base font-bold transition-all shadow-[0_5px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.4)]"
            >
              <Download size={18} /> Download HD PNG
            </button>

          </div>

        </div>

        {/* Right Column: Sticky Sidebar */}
        <RelatedSidebar tools={utilityRelatedTools} />

      </div>
    </div>
  );
}