"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Noto_Sans_Bengali } from "next/font/google";

// আধুনিক বাংলা ফন্ট
const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export default function NagadGenerator() {
  const [receiverNumber, setReceiverNumber] = useState("01300-000000");
  const [trxId, setTrxId] = useState("75XQFJJJ");
  const [amount, setAmount] = useState("91.35");
  const [charge, setCharge] = useState("5");
  const [time, setTime] = useState("04 সেপ. 2026, 10:56 PM");

  const previewRef = useRef<HTMLDivElement>(null);
  const nagadOrange = "#ea5420";

  // Total amount calculation (as exact number/string)
  const totalAmount = (parseFloat(amount || "0") + parseFloat(charge || "0")).toFixed(2);

  const downloadScreenshot = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, { 
          quality: 1.0, 
          pixelRatio: 3 
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "nagad-original-receipt.png";
        link.click();
      } catch (error) {
        console.error("Screenshot error:", error);
        alert("স্ক্রিনশট তৈরি করতে সমস্যা হচ্ছে!");
      }
    }
  };

  return (
    // 🌟 Added pt-24 md:pt-32 and flex-col 🌟
    <div className={`min-h-screen pt-24 md:pt-32 bg-gray-50 p-4 md:p-8 flex flex-col gap-8 ${notoSansBengali.className} text-gray-800`}>
      
      {/* 🌟 Top Title Section 🌟 */}
      <div className="max-w-6xl mx-auto w-full text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Fake <span style={{ color: nagadOrange }}>Nagad</span> Receipt
        </h1>
        <p className="text-gray-500">১০০% রিয়েলিস্টিক নগদ পেমেন্ট মকআপ তৈরি করুন খুব সহজেই।</p>
      </div>

      {/* 🌟 2-Column Layout 🌟 */}
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-8 items-start">
        
        {/* --- Left Panel: Controls --- */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 font-sans">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-semibold text-gray-600">Receiver Number</label>
                <input type="text" value={receiverNumber} onChange={(e) => setReceiverNumber(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-[#ea5420]/30 focus:border-[#ea5420]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">TrxID</label>
                <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="border p-2.5 rounded-lg outline-none uppercase focus:ring-2 focus:ring-[#ea5420]/30 focus:border-[#ea5420]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Time & Date</label>
                <input type="text" value={time} onChange={(e) => setTime(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-[#ea5420]/30 focus:border-[#ea5420]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Amount (Tk)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-[#ea5420]/30 focus:border-[#ea5420]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Charge (Tk)</label>
                <input type="number" value={charge} onChange={(e) => setCharge(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-[#ea5420]/30 focus:border-[#ea5420]" />
              </div>
            </div>

          </div>
          
          <button onClick={downloadScreenshot} className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2 text-lg" style={{ backgroundColor: nagadOrange }}>
            Download Screenshot
          </button>
        </div>

        {/* --- Right Panel: Live Preview --- */}
        <div className="w-full lg:w-[55%] flex justify-center sticky top-28">
          
          {/* Main Mockup Container - Standard smartphone ratio */}
          <div ref={previewRef} className="w-[380px] h-[822px] relative shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] overflow-hidden bg-white rounded-[2rem] border border-gray-200">
            
            {/* Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/nagad-bg.jpg" 
              alt="Nagad Blank Template" 
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" 
            />
            
            {/* Text Overlays - Positioned precisely over the background */}
            <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
              
              {/* 1. Receiver Number (Top Center) */}
              <div className="absolute top-[23%] w-full text-center">
                <span className="text-[14px] font-medium text-[#4b4b4b]">{receiverNumber}</span>
              </div>

              {/* 2. Details List (Right Aligned) */}
              <div className="absolute top-[28%] left-[40%] right-[6%] flex flex-col gap-[3px]">
                
                {/* TrxID */}
                <div className="text-right">
                  <span className="text-[14px] font-medium text-[#4b4b4b] uppercase">{trxId}</span>
                </div>
                
                {/* Amount */}
                <div className="text-right">
                  <span className="text-[14px] font-medium text-[#4b4b4b]">{amount} টাকা</span>
                </div>
                
                {/* Charge */}
                <div className="text-right">
                  <span className="text-[14px] font-medium text-[#4b4b4b]">{charge} টাকা</span>
                </div>
                
                {/* Total Amount */}
                <div className="text-right">
                  <span className="text-[14px] font-medium text-[#4b4b4b]">{totalAmount} টাকা</span>
                </div>
                
                {/* Time */}
                <div className="text-right">
                  <span className="text-[14px] font-medium text-[#4b4b4b]">{time}</span>
                </div>
                
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}