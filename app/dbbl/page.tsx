"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { ArrowLeft, CheckCircle, Home, Building2 } from "lucide-react";

export default function DbblGenerator() {
  const [amount, setAmount] = useState("5000.00");
  const [receiverAccount, setReceiverAccount] = useState("105.123.4567");
  const [senderAccount, setSenderAccount] = useState("105.987.6543");
  const [trxId, setTrxId] = useState("DBBL987654321");
  const [time, setTime] = useState("16 Sep 2026, 02:45 PM");

  const previewRef = useRef<HTMLDivElement>(null);
  const themeColor = "#1e3a8a"; // DBBL Navy Blue

  const downloadScreenshot = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, { quality: 1.0, pixelRatio: 2 });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "dbbl-receipt.png";
        link.click();
      } catch (error) {
        console.error("Screenshot error:", error);
        alert("স্ক্রিনশট তৈরি করতে সমস্যা হচ্ছে!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col lg:flex-row gap-8 font-sans">
      {/* Controls */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2" style={{ color: themeColor }}>DBBL Transfer Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Sender A/C</label>
            <input type="text" value={senderAccount} onChange={(e) => setSenderAccount(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-800" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Receiver A/C</label>
            <input type="text" value={receiverAccount} onChange={(e) => setReceiverAccount(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-800" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Amount (Tk)</label>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-800" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Time & Date</label>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-800" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">TrxID</label>
            <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-800 uppercase" />
          </div>
        </div>
        <button onClick={downloadScreenshot} className="mt-4 text-white py-3 rounded-lg font-bold transition w-full hover:opacity-90" style={{ backgroundColor: themeColor }}>
          Download DBBL Receipt
        </button>
      </div>

      {/* Live Preview */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div ref={previewRef} className="w-full max-w-[360px] bg-white h-[750px] relative flex flex-col shadow-2xl overflow-hidden border border-gray-200">
          
          {/* Header */}
          <div className="px-4 py-4 flex items-center justify-between text-white shadow-sm z-10" style={{ backgroundColor: themeColor }}>
            <ArrowLeft size={24} className="cursor-pointer" />
            <span className="font-semibold text-lg">Fund Transfer</span>
            <Building2 size={24} />
          </div>

          <div className="flex-1 bg-slate-50 flex flex-col p-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-4">
              <div className="flex flex-col items-center justify-center py-6 bg-blue-50 border-b border-gray-100">
                <CheckCircle size={56} style={{ color: themeColor }} className="mb-2" />
                <h2 className="font-bold text-lg text-center" style={{ color: themeColor }}>Transfer Successful</h2>
                <p className="text-gray-500 text-xs mt-1">{time}</p>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="text-gray-500 text-sm">From A/C</span>
                  <span className="font-semibold text-gray-800">{senderAccount}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="text-gray-500 text-sm">To A/C</span>
                  <span className="font-semibold text-gray-800">{receiverAccount}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="text-gray-500 text-sm">Transaction ID</span>
                  <span className="font-semibold text-gray-800 uppercase text-xs">{trxId}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-600 font-medium">Transferred Amount</span>
                  <span className="font-bold text-xl" style={{ color: themeColor }}>৳ {amount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Button */}
          <div className="p-4 bg-white border-t border-gray-100">
             <button className="w-full flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-lg transition" style={{ backgroundColor: themeColor }}>
               <Home size={20} /> Back to Home
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}