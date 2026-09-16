"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Phone, Copy, EyeOff, RefreshCcw, Share2, Star, ArrowRight, Check } from "lucide-react";

export default function BkashGenerator() {
  // State variables for inputs
  const [receiverName, setReceiverName] = useState("01861815301"); // স্ক্রিনশটে নামের জায়গায় নাম্বার দেওয়া আছে
  const [receiverNumber, setReceiverNumber] = useState("01861815301");
  const [time, setTime] = useState("12:17pm 24/06/26");
  const [trxId, setTrxId] = useState("DFO3N0RZ85");
  const [amount, setAmount] = useState("485.00");
  const [charge, setCharge] = useState("5.00");
  const [newBalance, setNewBalance] = useState("12.44");
  const [reference, setReference] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);
  const bkashPink = "#e2136e";

  // Total amount calculation
  const totalAmount = (parseFloat(amount) + parseFloat(charge)).toFixed(2);

  const downloadScreenshot = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, { 
          quality: 1.0, 
          pixelRatio: 3 // High resolution for perfect text crispness
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "bkash-original-mockup.png";
        link.click();
      } catch (error) {
        console.error("Screenshot error:", error);
        alert("স্ক্রিনশট তৈরি করতে সমস্যা হচ্ছে!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col lg:flex-row gap-8 font-sans text-gray-800">
      
      {/* --- Left Panel: Controls --- */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4" style={{ color: bkashPink }}>bKash Original Layout</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Receiver Name/Top Text</label>
            <input type="text" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} className="border p-2 rounded outline-none focus:ring-2" style={{ focusRing: bkashPink }} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Receiver Number</label>
            <input type="text" value={receiverNumber} onChange={(e) => setReceiverNumber(e.target.value)} className="border p-2 rounded outline-none focus:ring-2" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Time & Date (e.g. 12:17pm 24/06/26)</label>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} className="border p-2 rounded outline-none focus:ring-2" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">TrxID</label>
            <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 uppercase" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Sent Amount (Tk)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 rounded outline-none focus:ring-2" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Charge (Tk)</label>
            <input type="number" value={charge} onChange={(e) => setCharge(e.target.value)} className="border p-2 rounded outline-none focus:ring-2" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">New Balance</label>
            <input type="text" value={newBalance} onChange={(e) => setNewBalance(e.target.value)} className="border p-2 rounded outline-none focus:ring-2" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Reference</label>
            <input type="text" value={reference} onChange={(e) => setReference(e.target.value)} className="border p-2 rounded outline-none focus:ring-2" />
          </div>
        </div>

        <button onClick={downloadScreenshot} className="mt-4 text-white py-3 rounded-lg font-bold transition w-full hover:opacity-90" style={{ backgroundColor: bkashPink }}>
          Download Screenshot
        </button>
      </div>

      {/* --- Right Panel: Live Preview --- */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        {/* Mobile Device Mockup Container */}
        <div ref={previewRef} className="w-full max-w-[380px] bg-white h-[800px] relative flex flex-col shadow-2xl overflow-hidden font-sans border border-gray-100">
          
          {/* Top Status Bar Placeholder */}
          <div className="w-full flex justify-end px-4 py-2 bg-white text-[10px] text-gray-500 font-medium">
            59
          </div>

          <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
            
            {/* 1. Header Success Message */}
            <div className="px-5 mt-6 flex justify-between items-center">
              <h1 className="text-xl font-bold tracking-tight">
                <span style={{ color: bkashPink }}>আপনার সেন্ড মানি</span> <span className="text-[#00a859]">সফল হয়েছে</span>
              </h1>
              <div className="w-8 h-8 rounded-full border-2 border-[#00a859] flex items-center justify-center">
                <Check size={18} strokeWidth={3} className="text-[#00a859]" />
              </div>
            </div>

            {/* 2. Profile Section */}
            <div className="px-5 mt-10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#95c2d3] flex items-center justify-center text-white text-xl">
                  {receiverName ? receiverName.charAt(0).toUpperCase() : "0"}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[15px] font-medium text-gray-800">{receiverName}</span>
                  <span className="text-[15px] text-gray-600 mt-0.5">{receiverNumber}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-1.5 border px-4 py-1.5 rounded-full" style={{ borderColor: bkashPink, color: bkashPink }}>
                <Phone size={14} />
                <span className="text-sm font-semibold">কল</span>
              </div>
            </div>

            {/* 3. Grid Details Section */}
            <div className="mt-8 border-t border-b border-gray-100 flex flex-col">
              
              {/* Row 1: Time & TrxID */}
              <div className="flex border-b border-gray-100">
                <div className="w-1/2 border-r border-gray-100 p-4">
                  <p className="text-xs text-gray-500 mb-1">সময়</p>
                  <p className="text-[14px] text-gray-800">{time}</p>
                </div>
                <div className="w-1/2 p-4">
                  <p className="text-xs text-gray-500 mb-1">ট্রানজেকশন আইডি</p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[14px] text-gray-800 font-medium">{trxId}</p>
                    <Copy size={14} style={{ color: bkashPink }} />
                  </div>
                </div>
              </div>

              {/* Row 2: Amount & Balance */}
              <div className="flex border-b border-gray-100">
                <div className="w-1/2 border-r border-gray-100 p-4">
                  <p className="text-xs text-gray-500 mb-1">সর্বমোট</p>
                  <p className="text-[15px] text-gray-800 font-medium mb-1">৳{totalAmount}</p>
                  <p className="text-xs text-gray-400">৳{amount} + ৳{charge}</p>
                </div>
                <div className="w-1/2 p-4">
                  <p className="text-xs text-gray-500 mb-1">নতুন ব্যালেন্স</p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[15px] text-gray-800 font-medium">৳{newBalance}</p>
                    <EyeOff size={14} style={{ color: bkashPink }} />
                  </div>
                </div>
              </div>

              {/* Row 3: Reference */}
              <div className="flex">
                <div className="w-full p-4 h-16">
                  <p className="text-xs text-gray-500">রেফারেন্স</p>
                  <p className="text-[14px] text-gray-800 mt-1">{reference}</p>
                </div>
              </div>
            </div>

            {/* 4. Action Buttons (Auto Pay & Share) */}
            <div className="px-4 mt-6 flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border font-medium text-sm" style={{ borderColor: bkashPink, color: bkashPink }}>
                <RefreshCcw size={16} /> অটো পে চালু করুন
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border font-medium text-sm" style={{ borderColor: bkashPink, color: bkashPink }}>
                <Share2 size={16} fill={bkashPink} /> শেয়ার
              </button>
            </div>

            {/* 5. Rewards Section */}
            <div className="mt-8 flex flex-col items-center justify-center text-center px-4 pb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: bkashPink }}>
                <Star size={20} className="text-white" fill="white" />
              </div>
              <p className="text-sm text-gray-600 mb-1">আপনি অর্জন করেছেন</p>
              <h3 className="text-[17px] font-bold text-gray-800 mb-2">বিকাশ রিওয়ার্ড পয়েন্ট</h3>
              <p className="text-xs text-gray-600">পয়েন্ট ব্যবহার করতে <span style={{ color: bkashPink }}>বিকাশ রিওয়ার্ডস</span> চেক করুন!</p>
            </div>

          </div>

          {/* 6. Bottom Button */}
          <div className="absolute bottom-0 left-0 w-full bg-white pt-2 pb-6 px-4">
             <button className="w-full flex items-center justify-between text-white font-bold py-4 px-5 rounded-xl shadow-md transition" style={{ backgroundColor: bkashPink }}>
               <span className="text-[15px]">হোম-এ ফিরে যাই</span>
               <ArrowRight size={20} />
             </button>
             {/* iOS Home Indicator line placeholder */}
             <div className="w-1/3 h-1 bg-gray-300 rounded-full mx-auto mt-4"></div>
          </div>
          
        </div>
      </div>
    </div>
  );
}