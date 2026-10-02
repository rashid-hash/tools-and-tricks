"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Roboto } from "next/font/google";

// DBBL অ্যাপের ফন্ট
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function DbblOriginalGenerator() {
  const [beneficiaryName, setBeneficiaryName] = useState("NAME");
  const [beneficiaryBank, setBeneficiaryBank] = useState("Dutch-Bangla Bank\nPLC.");
  const [receiverAccount, setReceiverAccount] = useState("7017010000000");
  
  const [nexusPayId, setNexusPayId] = useState("01700000000");
  const [trxId, setTrxId] = useState("LID01713400000");
  const [date, setDate] = useState("01-Feb-2026");
  const [accountType, setAccountType] = useState("Nexus Debit Card");
  const [senderAccount, setSenderAccount] = useState("**** **** **** 8600");
  
  const [amount, setAmount] = useState("20,000.00");

  const previewRef = useRef<HTMLDivElement>(null);
  const dbblRed = "#e51c24";

  const downloadScreenshot = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, { 
          quality: 1.0, 
          pixelRatio: 3 
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "dbbl-perfect-receipt.png";
        link.click();
      } catch (error) {
        console.error("Screenshot error:", error);
        alert("স্ক্রিনশট তৈরি করতে সমস্যা হচ্ছে!");
      }
    }
  };

  return (
    // 🌟 Added pt-24 md:pt-32 and flex-col 🌟
    <div className={`min-h-screen pt-24 md:pt-32 bg-gray-50 p-4 md:p-8 flex flex-col gap-8 ${roboto.className} text-gray-800`}>
      
      {/* 🌟 Top Title Section 🌟 */}
      <div className="max-w-6xl mx-auto w-full text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Fake <span style={{ color: dbblRed }}>DBBL</span> Receipt
        </h1>
        <p className="text-gray-500">১০০% রিয়েলিস্টিক ডাচ-বাংলা ব্যাংক পেমেন্ট মকআপ তৈরি করুন খুব সহজেই।</p>
      </div>

      {/* 🌟 2-Column Layout 🌟 */}
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-8 items-start">
        
        {/* --- Left Panel: Controls --- */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 font-sans">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Beneficiary Name</label>
                <input type="text" value={beneficiaryName} onChange={(e) => setBeneficiaryName(e.target.value)} className="border p-2.5 rounded-lg outline-none uppercase focus:ring-2 focus:ring-red-500/30 focus:border-red-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Beneficiary Bank (Press Enter for PLC.)</label>
                <textarea value={beneficiaryBank} onChange={(e) => setBeneficiaryBank(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 h-11 resize-none overflow-hidden" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Receiver A/C Number</label>
                <input type="text" value={receiverAccount} onChange={(e) => setReceiverAccount(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">NexusPay ID</label>
                <input type="text" value={nexusPayId} onChange={(e) => setNexusPayId(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Transaction ID</label>
                <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="border p-2.5 rounded-lg outline-none uppercase focus:ring-2 focus:ring-red-500/30 focus:border-red-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Transaction Date</label>
                <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Card/Account Type</label>
                <input type="text" value={accountType} onChange={(e) => setAccountType(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Sender A/C Number</label>
                <input type="text" value={senderAccount} onChange={(e) => setSenderAccount(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500" />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm font-semibold text-gray-600">Total Payment (BDT)</label>
                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2.5 rounded-lg outline-none font-bold focus:ring-2 focus:ring-red-500/30 focus:border-red-500" />
              </div>
            </div>

          </div>

          <button onClick={downloadScreenshot} className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2 text-lg" style={{ backgroundColor: dbblRed }}>
            Download DBBL Receipt
          </button>
        </div>

        {/* --- Right Panel: Live Preview --- */}
        <div className="w-full lg:w-[55%] flex justify-center sticky top-28">
          
          {/* Main Mockup Container - Standard smartphone ratio */}
          <div ref={previewRef} className="w-[380px] h-[822px] relative shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] overflow-hidden bg-white rounded-[2rem] border border-gray-200">
            
            {/* Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/dbbl-bg.jpeg" 
              alt="DBBL Blank Template" 
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" 
            />
            
            {/* Text Overlays - Positioned precisely over the background */}
            <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
              
              {/* 1. Beneficiary Information Block */}
              <div className="absolute top-[31%] left-[12%] right-[12.5%] flex flex-col gap-[12.5px]">
                <div className="flex justify-between items-start">
                  <span className="text-[14px] text-gray-600 tracking-tight">Beneficiary Name</span>
                  <span className="text-[14px] text-gray-800 font-medium uppercase text-right tracking-tight">{beneficiaryName}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[14px] text-gray-600 tracking-tight">Beneficiary Bank</span>
                  <span className="text-[14px] text-gray-800 font-medium text-right whitespace-pre-line leading-tight tracking-tight">{beneficiaryBank}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[14px] text-gray-600 tracking-tight">Card/Account Number</span>
                  <span className="text-[14px] text-gray-800 font-medium text-right tracking-tight">{receiverAccount}</span>
                </div>
              </div>

              {/* 2. Payment Information Block */}
              <div className="absolute top-[52%] left-[12%] right-[12.5%] flex flex-col gap-[9px]">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-600 tracking-tight">NexusPay ID</span>
                  <span className="text-[14px] text-gray-800 font-medium tracking-tight">{nexusPayId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-600 tracking-tight">Transaction ID</span>
                  <span className="text-[14px] text-gray-800 font-medium uppercase tracking-tight">{trxId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-600 tracking-tight">Transaction Date</span>
                  <span className="text-[14px] text-gray-800 font-medium tracking-tight">{date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-600 tracking-tight">Card/Account Type</span>
                  <span className="text-[14px] text-gray-800 font-medium tracking-tight">{accountType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-gray-600 tracking-tight">Card/Account Number</span>
                  <span className="text-[14px] text-gray-800 font-medium tracking-tight">{senderAccount}</span>
                </div>
              </div>

              {/* 3. Total Payment Green Bar Text */}
              <div className="absolute top-[72.5%] left-[14.5%] right-[14.5%] flex justify-between items-center h-[50px]">
                <span className="text-white text-[14.5px] font-simple tracking-wide">Total Payment</span>
                <span className="text-white text-[14.5px] font-simple">BDT {amount}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}