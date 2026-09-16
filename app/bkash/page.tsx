"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Noto_Sans_Bengali } from "next/font/google";

// আধুনিক বাংলা ফন্ট
const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export default function BkashGenerator() {
  const [receiverName, setReceiverName] = useState("01861815301");
  const [receiverNumber, setReceiverNumber] = useState("01861815301");
  const [time, setTime] = useState("12:17pm 24/06/26");
  const [trxId, setTrxId] = useState("DFO3N0RZ85");
  const [amount, setAmount] = useState("485.00");
  const [charge, setCharge] = useState("5.00");
  const [newBalance, setNewBalance] = useState("12.44");
  const [reference, setReference] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);
  const bkashPink = "#e2136e";

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
        link.download = "bkash-original-receipt.png";
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
        <h2 className="text-2xl font-bold mb-4" style={{ color: bkashPink }}>bKash Image Background Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Receiver Name/Top Text</label>
            <input type="text" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#e2136e]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Receiver Number</label>
            <input type="text" value={receiverNumber} onChange={(e) => setReceiverNumber(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#e2136e]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Time & Date</label>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#e2136e]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">TrxID</label>
            <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="border p-2 rounded outline-none uppercase focus:ring-2 focus:ring-[#e2136e]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Sent Amount (Tk)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#e2136e]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Charge (Tk)</label>
            <input type="number" value={charge} onChange={(e) => setCharge(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#e2136e]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">New Balance</label>
            <input type="text" value={newBalance} onChange={(e) => setNewBalance(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#e2136e]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Reference</label>
            <input type="text" value={reference} onChange={(e) => setReference(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#e2136e]" />
          </div>
        </div>

        <button onClick={downloadScreenshot} className="mt-4 text-white py-3 rounded-lg font-bold transition w-full hover:opacity-90" style={{ backgroundColor: bkashPink }}>
          Download Screenshot
        </button>
      </div>

      {/* --- Right Panel: Live Preview --- */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        
        {/* Main Mockup Container */}
        <div ref={previewRef} className="w-[380px] h-[822px] relative shadow-2xl overflow-hidden bg-white">
          
          {/* Background Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/bkash-bg.jpeg" 
            alt="bKash Blank Template" 
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" 
          />
          
          {/* Text Overlays */}
          <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">

            {/* 1. Receiver Name & Number */}
            <div className="absolute top-[20.5%] left-[20%] flex flex-col gap-[1px]">
               <span className="text-[15px] font-medium leading-tight text-[#1f2937]">{receiverName}</span>
               <span className="text-[15px] text-[#4b5563] leading-tight">{receiverNumber}</span>
            </div>

            {/* 2. Time */}
            <div className="absolute top-[34%] left-[3.5%]">
              <span className="text-[13.5px] font-sans text-[#333333] tracking-tight">{time}</span>
            </div>

            {/* 3. TrxID */}
            <div className="absolute top-[34.5%] left-[55.5%]">
              <span className="text-[14px] font-sans font-medium text-[#333333] tracking-tight">{trxId}</span>
            </div>

            {/* 4. Total Amount & Breakdown */}
            <div className="absolute top-[43.5%] left-[4%] flex flex-col">
              <span className="text-[14px] font-sans font-medium text-[#333333] mb-0.5">৳{totalAmount}</span>
              <span className="text-[12px] font-sans text-gray-500">৳{amount} + ৳{charge}</span>
            </div>

            {/* 5. New Balance */}
            <div className="absolute top-[43.5%] left-[55%]">
              <span className="text-[13px] font-sans font-medium text-[#333333]">৳{newBalance}</span>
            </div>

            {/* 6. Reference */}
            <div className="absolute top-[58%] left-[6.5%]">
              <span className="text-[14.5px] font-sans text-[#333333]">{reference}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}