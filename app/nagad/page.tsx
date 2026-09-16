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
  const [receiverNumber, setReceiverNumber] = useState("01323-513168");
  const [trxId, setTrxId] = useState("75XQFR1K");
  const [amount, setAmount] = useState("91.35");
  const [charge, setCharge] = useState("5");
  const [time, setTime] = useState("04 সেপ. 2026, 10:56 PM");

  const previewRef = useRef<HTMLDivElement>(null);
  const nagadOrange = "#ea5420";

  // Total amount calculation (as exact number/string)
  const totalAmount = (parseFloat(amount) + parseFloat(charge)).toFixed(2);

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
    <div className={`min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col lg:flex-row gap-8 ${notoSansBengali.className} text-gray-800`}>
      
      {/* --- Left Panel: Controls --- */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 font-sans">
        <h2 className="text-2xl font-bold mb-4" style={{ color: nagadOrange }}>Nagad Image Background Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Receiver Number</label>
            <input type="text" value={receiverNumber} onChange={(e) => setReceiverNumber(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#ea5420]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">TrxID</label>
            <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="border p-2 rounded outline-none uppercase focus:ring-2 focus:ring-[#ea5420]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Time & Date</label>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#ea5420]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Amount (Tk)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#ea5420]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Charge (Tk)</label>
            <input type="number" value={charge} onChange={(e) => setCharge(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#ea5420]" />
          </div>
        </div>

        <button onClick={downloadScreenshot} className="mt-4 text-white py-3 rounded-lg font-bold transition w-full hover:opacity-90 shadow-md" style={{ backgroundColor: nagadOrange }}>
          Download Screenshot
        </button>
      </div>

      {/* --- Right Panel: Live Preview --- */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        
        {/* Main Mockup Container - Standard smartphone ratio */}
        <div ref={previewRef} className="w-[380px] h-[822px] relative shadow-2xl overflow-hidden bg-white">
          
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
            {/* The left side labels (TrxID, Amount, etc.) are already in the background image. 
                We just need to place the dynamic values on the right side. */}
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
  );
}