"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { ArrowLeft, CheckCircle2, Home, Landmark } from "lucide-react";
import { Noto_Sans_Bengali } from "next/font/google";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export default function IbblGenerator() {
  const [amount, setAmount] = useState("10500.00");
  const [receiverAccount, setReceiverAccount] = useState("2050123456789");
  const [trxId, setTrxId] = useState("IBBL77889900");
  const [time, setTime] = useState("16-09-2026 14:30:15");
  const [remarks, setRemarks] = useState("Payment");

  const previewRef = useRef<HTMLDivElement>(null);
  const themeColor = "#059669"; // IBBL Green

  const downloadScreenshot = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, { quality: 1.0, pixelRatio: 3 });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "ibbl-receipt.png";
        link.click();
      } catch (error) {
        console.error("Screenshot error:", error);
        alert("স্ক্রিনশট তৈরি করতে সমস্যা হচ্ছে!");
      }
    }
  };

  return (
    <div className={`min-h-screen pt-24 md:pt-32 bg-gray-50 p-4 md:p-8 flex flex-col gap-8 ${notoSansBengali.className} text-gray-800`}>
      
      {/* 🌟 Top Title Section 🌟 */}
      <div className="max-w-6xl mx-auto w-full text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Fake <span style={{ color: themeColor }}>IBBL</span> Receipt
        </h1>
        <p className="text-gray-500">১০০% রিয়েলিস্টিক ইসলামী ব্যাংক পেমেন্ট মকআপ তৈরি করুন খুব সহজেই।</p>
      </div>

      {/* 🌟 2-Column Layout 🌟 */}
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-8 items-start">
        
        {/* --- Left Panel: Controls --- */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Receiver A/C</label>
                <input type="text" value={receiverAccount} onChange={(e) => setReceiverAccount(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-green-600/30 focus:border-green-600" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Amount (Tk)</label>
                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-green-600/30 focus:border-green-600" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Time & Date</label>
                <input type="text" value={time} onChange={(e) => setTime(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-green-600/30 focus:border-green-600" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">TrxID</label>
                <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-green-600/30 focus:border-green-600 uppercase" />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-semibold text-gray-600">Remarks</label>
                <input type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-green-600/30 focus:border-green-600" />
              </div>
            </div>
          </div>
          
          <button onClick={downloadScreenshot} className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2 text-lg" style={{ backgroundColor: themeColor }}>
            Download IBBL Receipt
          </button>
        </div>

        {/* --- Right Panel: Live Preview --- */}
        <div className="w-full lg:w-[55%] flex justify-center sticky top-28">
          
          <div ref={previewRef} className="w-[380px] h-[822px] relative flex flex-col shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] overflow-hidden bg-[#f4f7f6] rounded-[2rem] border border-gray-200">
            
            {/* Header */}
            <div className="px-4 py-4 flex items-center justify-between text-white shadow-md z-10" style={{ backgroundColor: themeColor }}>
              <ArrowLeft size={24} className="cursor-pointer" />
              <span className="font-semibold text-lg">Transaction Receipt</span>
              <Landmark size={24} />
            </div>

            <div className="flex-1 flex flex-col p-4 relative z-0">
              {/* Background design */}
              <div className="absolute top-0 left-0 w-full h-32 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mt-4 relative z-10">
                <div className="flex flex-col items-center justify-center py-6 border-b border-dashed border-gray-300">
                  <CheckCircle2 size={50} style={{ color: themeColor }} className="mb-2 bg-green-50 rounded-full" />
                  <h2 className="font-bold text-xl text-center text-gray-800">Successful</h2>
                  <p className="text-gray-500 text-xs mt-1">{time}</p>
                  <div className="mt-3 text-center">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Amount</p>
                    <h3 className="text-3xl font-bold" style={{ color: themeColor }}>৳ {amount}</h3>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <div className="flex flex-col border-b border-gray-100 pb-2">
                    <span className="text-gray-400 text-xs">To Account</span>
                    <span className="font-semibold text-gray-800">{receiverAccount}</span>
                  </div>
                  <div className="flex flex-col border-b border-gray-100 pb-2">
                    <span className="text-gray-400 text-xs">Transaction ID</span>
                    <span className="font-semibold text-gray-800 uppercase">{trxId}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs">Remarks</span>
                    <span className="font-semibold text-gray-800">{remarks}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Button */}
            <div className="p-4 bg-white border-t border-gray-200 z-10 pb-6">
               <button className="w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-full transition shadow-md hover:opacity-90" style={{ backgroundColor: themeColor }}>
                 <Home size={20} /> Back to Dashboard
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}