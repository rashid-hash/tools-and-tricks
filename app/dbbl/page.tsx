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
  const [beneficiaryName, setBeneficiaryName] = useState("MD.KABIRUL ISLAM");
  const [beneficiaryBank, setBeneficiaryBank] = useState("Dutch-Bangla Bank\nPLC.");
  const [receiverAccount, setReceiverAccount] = useState("7017010588587");
  
  const [nexusPayId, setNexusPayId] = useState("01774698008");
  const [trxId, setTrxId] = useState("LID01713407090");
  const [date, setDate] = useState("07-Feb-2026");
  const [accountType, setAccountType] = useState("Nexus Debit Card");
  const [senderAccount, setSenderAccount] = useState("**** **** **** 8696");
  
  const [amount, setAmount] = useState("46,000.00");

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
        link.download = "dbbl-original-receipt.png";
        link.click();
      } catch (error) {
        console.error("Screenshot error:", error);
        alert("স্ক্রিনশট তৈরি করতে সমস্যা হচ্ছে!");
      }
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col lg:flex-row gap-8 ${roboto.className}`}>
      
      {/* --- Left Panel: Controls --- */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 font-sans">
        <h2 className="text-2xl font-bold mb-4" style={{ color: dbblRed }}>DBBL Image Background Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Beneficiary Name</label>
            <input type="text" value={beneficiaryName} onChange={(e) => setBeneficiaryName(e.target.value)} className="border p-2 rounded outline-none uppercase focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Beneficiary Bank</label>
            <textarea value={beneficiaryBank} onChange={(e) => setBeneficiaryBank(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-red-500 h-10 resize-none overflow-hidden" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Receiver A/C Number</label>
            <input type="text" value={receiverAccount} onChange={(e) => setReceiverAccount(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">NexusPay ID</label>
            <input type="text" value={nexusPayId} onChange={(e) => setNexusPayId(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Transaction ID</label>
            <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="border p-2 rounded outline-none uppercase focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Transaction Date</label>
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Card/Account Type</label>
            <input type="text" value={accountType} onChange={(e) => setAccountType(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Sender A/C Number</label>
            <input type="text" value={senderAccount} onChange={(e) => setSenderAccount(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Total Payment (BDT)</label>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 rounded outline-none font-bold focus:ring-2 focus:ring-red-500" />
          </div>
        </div>

        <button onClick={downloadScreenshot} className="mt-4 text-white py-3 rounded-lg font-bold transition w-full hover:opacity-90 shadow-md" style={{ backgroundColor: dbblRed }}>
          Download DBBL Receipt
        </button>
      </div>

      {/* --- Right Panel: Live Preview --- */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        
        {/* Main Mockup Container */}
        <div ref={previewRef} className="w-[380px] h-[822px] relative shadow-2xl overflow-hidden bg-white">
          
          {/* Background Image (The blank template you provided) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/dbbl-bg.jpeg" 
            alt="DBBL Blank Template" 
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" 
          />
          
          {/* Text Overlays (Positioned with precise percentages over the background) */}
          <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
            
            {/* 1. Beneficiary Information Block */}
            {/* top-[30%] adjusts the vertical position over the first blank box */}
            <div className="absolute top-[30.5%] left-[10%] right-[10%] flex flex-col gap-[14px]">
              <div className="flex justify-between items-start">
                <span className="text-[14.5px] text-[#4b5563]">Beneficiary Name</span>
                <span className="text-[14.5px] text-[#1f2937] font-medium uppercase text-right w-1/2 leading-tight">{beneficiaryName}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-[14.5px] text-[#4b5563]">Beneficiary Bank</span>
                <span className="text-[14.5px] text-[#1f2937] font-medium text-right w-1/2 whitespace-pre-line leading-snug">{beneficiaryBank}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-[14.5px] text-[#4b5563]">Card/Account Number</span>
                <span className="text-[14.5px] text-[#1f2937] font-medium text-right">{receiverAccount}</span>
              </div>
            </div>

            {/* 2. Payment Information Block */}
            {/* top-[53%] adjusts the vertical position over the second blank box */}
            <div className="absolute top-[52.5%] left-[10%] right-[10%] flex flex-col gap-[15px]">
              <div className="flex justify-between items-center">
                <span className="text-[14.5px] text-[#4b5563]">NexusPay ID</span>
                <span className="text-[14.5px] text-[#1f2937] font-medium">{nexusPayId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14.5px] text-[#4b5563]">Transaction ID</span>
                <span className="text-[14.5px] text-[#1f2937] font-medium uppercase">{trxId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14.5px] text-[#4b5563]">Transaction Date</span>
                <span className="text-[14.5px] text-[#1f2937] font-medium">{date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14.5px] text-[#4b5563]">Card/Account Type</span>
                <span className="text-[14.5px] text-[#1f2937] font-medium">{accountType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[14.5px] text-[#4b5563]">Card/Account Number</span>
                <span className="text-[14.5px] text-[#1f2937] font-medium">{senderAccount}</span>
              </div>
            </div>

            {/* 3. Total Payment Green Bar Text */}
            {/* font-medium (500) ensures it is not overly bold */}
            <div className="absolute top-[76.6%] left-[12%] right-[12%] flex justify-between items-center h-[50px]">
              <span className="text-white text-[15.5px] font-medium tracking-wide">Total Payment</span>
              <span className="text-white text-[15.5px] font-medium">BDT {amount}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}