"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { ArrowLeft, CheckCircle, Home } from "lucide-react";

export default function RocketGenerator() {
  const [amount, setAmount] = useState("1500.00");
  const [receiverNumber, setReceiverNumber] = useState("01700-000000-1"); // রকেটের লাস্টে একটা এক্সট্রা ডিজিট থাকে
  const [trxId, setTrxId] = useState("9A2B3C4D5E");
  const [time, setTime] = useState("16-09-2026 02:30 PM");
  const [newBalance, setNewBalance] = useState("10500.00");
  const [charge, setCharge] = useState("5.00");

  const previewRef = useRef<HTMLDivElement>(null);

  // রকেটের থিম কালার (পার্পল/ম্যাজেন্টা টাইপ)
  const themeColor = "#88198f"; 

  const downloadScreenshot = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, { quality: 1.0, pixelRatio: 2 });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "rocket-receipt.png";
        link.click();
      } catch (error) {
        console.error("Screenshot error:", error);
        alert("স্ক্রিনশট তৈরি করতে সমস্যা হচ্ছে!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col lg:flex-row gap-8 font-sans">
      
      {/* --- Left Panel: Controls --- */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2" style={{ color: themeColor }}>Rocket Receipt Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Receiver Number</label>
            <input type="text" value={receiverNumber} onChange={(e) => setReceiverNumber(e.target.value)} className="border p-2 rounded outline-none focus:ring-2" style={{ focusRing: themeColor }} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Amount (Tk)</label>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 rounded outline-none focus:ring-2" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Time & Date</label>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} className="border p-2 rounded outline-none focus:ring-2" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">TrxID</label>
            <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 uppercase" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Charge (Tk)</label>
            <input type="text" value={charge} onChange={(e) => setCharge(e.target.value)} className="border p-2 rounded outline-none focus:ring-2" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">New Balance</label>
            <input type="text" value={newBalance} onChange={(e) => setNewBalance(e.target.value)} className="border p-2 rounded outline-none focus:ring-2" />
          </div>
        </div>

        <button 
          onClick={downloadScreenshot} 
          className="mt-4 text-white py-3 rounded-lg font-bold transition w-full hover:opacity-90"
          style={{ backgroundColor: themeColor }}
        >
          Download Receipt
        </button>
      </div>

      {/* --- Right Panel: Live Preview --- */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div ref={previewRef} className="w-full max-w-[360px] bg-white h-[750px] relative flex flex-col shadow-2xl overflow-hidden border border-gray-200">
          
          {/* Header - Rocket Purple */}
          <div className="px-4 py-4 flex items-center justify-between text-white shadow-sm z-10" style={{ backgroundColor: themeColor }}>
            <ArrowLeft size={24} className="cursor-pointer" />
            <span className="font-semibold text-lg tracking-wide">সেন্ড মানি</span>
            <div className="w-6"></div> {/* Spacer */}
          </div>

          <div className="flex-1 bg-gray-50 flex flex-col">
            
            {/* Success Banner */}
            <div className="flex flex-col items-center justify-center py-8 bg-white border-b border-gray-100">
              <CheckCircle size={64} style={{ color: themeColor }} className="bg-white rounded-full mb-3" />
              <h2 className="font-bold text-xl text-center text-gray-800">সেন্ড মানি সফল হয়েছে</h2>
              <p className="text-gray-500 text-sm mt-1">{time}</p>
            </div>

            {/* Transaction Details */}
            <div className="p-4 flex-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 flex flex-col gap-4">
                  
                  <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500 text-sm">প্রাপক</span>
                    <span className="font-semibold text-gray-800">{receiverNumber}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500 text-sm">পরিমাণ</span>
                    <span className="font-semibold text-gray-800">৳ {amount}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500 text-sm">চার্জ</span>
                    <span className="font-semibold text-gray-800">৳ {charge}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500 text-sm">ট্রানজেকশন আইডি</span>
                    <span className="font-semibold text-gray-800 uppercase">{trxId}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-500 text-sm font-medium">নতুন ব্যালেন্স</span>
                    <span className="font-bold text-lg" style={{ color: themeColor }}>৳ {newBalance}</span>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Bottom Button */}
          <div className="bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
             <button 
                className="w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-lg transition shadow-sm hover:opacity-90"
                style={{ backgroundColor: themeColor }}
             >
               <Home size={20} /> হোম-এ ফিরে যান
             </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}