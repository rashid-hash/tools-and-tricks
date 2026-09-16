"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { ArrowLeft, CheckCircle2, Home } from "lucide-react";

export default function NagadGenerator() {
  const [amount, setAmount] = useState("1000.00");
  const [receiverNumber, setReceiverNumber] = useState("01700-000000");
  const [trxId, setTrxId] = useState("7H34K9L2MA");
  const [time, setTime] = useState("16-09-2026 01:45 PM");
  const [newBalance, setNewBalance] = useState("5250.00");
  const [charge, setCharge] = useState("0.00");

  const previewRef = useRef<HTMLDivElement>(null);

  const downloadScreenshot = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, { quality: 1.0, pixelRatio: 2 });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "nagad-receipt.png";
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
        <h2 className="text-2xl font-bold text-[#f37021] mb-2">Nagad Receipt Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Receiver Number</label>
            <input type="text" value={receiverNumber} onChange={(e) => setReceiverNumber(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#f37021]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Amount (Tk)</label>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#f37021]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Time & Date</label>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#f37021]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">TrxID</label>
            <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#f37021] uppercase" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Charge (Tk)</label>
            <input type="text" value={charge} onChange={(e) => setCharge(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#f37021]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">New Balance</label>
            <input type="text" value={newBalance} onChange={(e) => setNewBalance(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#f37021]" />
          </div>
        </div>

        <button onClick={downloadScreenshot} className="mt-4 bg-[#f37021] text-white py-3 rounded-lg font-bold hover:bg-[#d9601a] transition w-full">
          Download Receipt
        </button>
      </div>

      {/* --- Right Panel: Live Preview --- */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div ref={previewRef} className="w-full max-w-[360px] bg-white h-[750px] relative flex flex-col shadow-2xl overflow-hidden border border-gray-200">
          
          {/* Header - Nagad Orange */}
          <div className="bg-[#f37021] px-4 py-4 flex items-center justify-between text-white shadow-md z-10">
            <ArrowLeft size={24} className="cursor-pointer" />
            <span className="font-semibold text-lg">সেন্ড মানি</span>
            <div className="w-6"></div> {/* Spacer */}
          </div>

          <div className="flex-1 bg-gray-50 relative">
            
            {/* Top Curved Background */}
            <div className="bg-[#f37021] h-24 w-full absolute top-0 rounded-b-[2rem]"></div>

            {/* Success Card */}
            <div className="relative z-10 mt-6 mx-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col items-center">
              <CheckCircle2 size={50} className="text-[#00a859] bg-white rounded-full mb-2" />
              <h2 className="text-[#00a859] font-bold text-lg text-center mb-1">সেন্ড মানি সফল হয়েছে</h2>
              <p className="text-gray-500 text-xs">{time}</p>

              <hr className="w-full my-4 border-dashed border-gray-200" />

              <div className="w-full flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">প্রাপক</span>
                  <span className="font-semibold text-gray-800">{receiverNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">ট্রানজেকশন আইডি</span>
                  <span className="font-semibold text-gray-800 uppercase">{trxId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">চার্জ</span>
                  <span className="font-semibold text-gray-800">৳ {charge}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">সর্বমোট</span>
                  <span className="font-bold text-[#f37021] text-lg">৳ {amount}</span>
                </div>
              </div>
            </div>

            {/* Balance Card */}
            <div className="relative z-10 mt-4 mx-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center">
               <span className="text-gray-600 font-medium">নতুন ব্যালেন্স</span>
               <span className="font-bold text-gray-800">৳ {newBalance}</span>
            </div>

          </div>

          {/* Bottom Button */}
          <div className="bg-white p-4 border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
             <button className="w-full flex items-center justify-center gap-2 bg-[#f37021] text-white font-bold py-3.5 rounded-full hover:bg-[#d9601a] transition shadow-md">
               <Home size={20} /> পরবর্তীতে যান
             </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}