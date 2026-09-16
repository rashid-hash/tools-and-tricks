"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { ArrowLeft, CheckCircle2, Home } from "lucide-react";

export default function BkashGenerator() {
  const [amount, setAmount] = useState("500.00");
  const [receiverNumber, setReceiverNumber] = useState("01700-000000");
  const [trxId, setTrxId] = useState("8H34K9L2MA");
  const [time, setTime] = useState("12:45 PM 16/09/2026");
  const [newBalance, setNewBalance] = useState("1250.00");
  const [reference, setReference] = useState("Payment");

  const previewRef = useRef<HTMLDivElement>(null);

  const downloadScreenshot = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, { quality: 1.0, pixelRatio: 2 });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "bkash-receipt.png";
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
        <h2 className="text-2xl font-bold text-pink-600 mb-2">bKash Receipt Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Receiver Number</label>
            <input type="text" value={receiverNumber} onChange={(e) => setReceiverNumber(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-pink-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Amount (Tk)</label>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-pink-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Time & Date</label>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-pink-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">TrxID</label>
            <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-pink-500 uppercase" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">New Balance</label>
            <input type="text" value={newBalance} onChange={(e) => setNewBalance(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-pink-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Reference</label>
            <input type="text" value={reference} onChange={(e) => setReference(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-pink-500" />
          </div>
        </div>

        <button onClick={downloadScreenshot} className="mt-4 bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition w-full">
          Download Receipt
        </button>
      </div>

      {/* --- Right Panel: Live Preview --- */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div ref={previewRef} className="w-full max-w-[360px] bg-white h-[750px] relative flex flex-col shadow-2xl overflow-hidden border border-gray-200">
          
          {/* Header */}
          <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
            <ArrowLeft size={24} className="text-pink-600 cursor-pointer" />
            <span className="font-semibold text-gray-800 text-lg">সেন্ড মানি</span>
            <div className="w-6"></div> {/* Spacer for center alignment */}
          </div>

          {/* Success Banner */}
          <div className="flex flex-col items-center justify-center bg-[#fdf3f6] py-6 px-4">
            <CheckCircle2 size={56} className="text-[#e2136e] bg-white rounded-full mb-3" />
            <h2 className="text-[#e2136e] font-bold text-xl text-center">আপনার সেন্ড মানি<br/>সফল হয়েছে</h2>
          </div>

          {/* Info Cards */}
          <div className="p-4 flex flex-col gap-4">
            
            {/* Receiver & Amount Card */}
            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-500 text-sm">প্রাপক</span>
                <span className="font-semibold text-gray-800">{receiverNumber}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-500 text-sm">সময়</span>
                <span className="text-gray-800 text-sm">{time}</span>
              </div>
              <hr className="my-2 border-gray-100" />
              <div className="flex justify-between items-center mt-3">
                <span className="text-gray-500 text-sm">সর্বমোট</span>
                <span className="font-bold text-lg text-gray-800">৳ {amount}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500 text-sm">নতুন ব্যালেন্স</span>
                <span className="font-semibold text-gray-800 text-sm">৳ {newBalance}</span>
              </div>
            </div>

            {/* TrxID Card */}
            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-xs mb-1">ট্রানজেকশন আইডি</p>
                <p className="font-semibold text-gray-800 uppercase tracking-wide">{trxId}</p>
              </div>
              <button className="text-[#e2136e] text-sm font-semibold px-3 py-1 rounded bg-pink-50">কপি</button>
            </div>

            {/* Reference Card */}
            <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
              <span className="text-gray-500 text-sm">রেফারেন্স</span>
              <p className="font-medium text-gray-800 mt-1">{reference}</p>
            </div>
            
          </div>

          {/* Bottom Button */}
          <div className="absolute bottom-6 left-0 w-full px-4">
             <button className="w-full flex items-center justify-center gap-2 border border-[#e2136e] text-[#e2136e] font-semibold py-3 rounded-full hover:bg-pink-50 transition">
               <Home size={20} /> হোমে ফিরে যান
             </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}