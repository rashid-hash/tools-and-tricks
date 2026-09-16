"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Roboto } from "next/font/google";

// DBBL অ্যাপের সাথে মিল রাখার জন্য Roboto ফন্ট ইম্পোর্ট
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function DbblOriginalGenerator() {
  // State variables for inputs
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
  
  // Theme Colors
  const dbblRed = "#e51c24";
  const dbblBlue = "#183c7d";
  const dbblGreen = "#008a4b";
  const totalGreen = "#27ae60";

  const downloadScreenshot = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, { 
          quality: 1.0, 
          pixelRatio: 3 // High resolution
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "dbbl-nexuspay-receipt.png";
        link.click();
      } catch (error) {
        console.error("Screenshot error:", error);
        alert("স্ক্রিনশট তৈরি করতে সমস্যা হচ্ছে!");
      }
    }
  };

  return (
    <div className={`min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col lg:flex-row gap-8 ${roboto.className}`}>
      
      {/* --- Left Panel: Controls --- */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 font-sans">
        <h2 className="text-2xl font-bold mb-4" style={{ color: dbblRed }}>DBBL NexusPay Settings</h2>
        
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
        
        {/* Full Red Background Container (Captured in Screenshot) */}
        <div ref={previewRef} className="w-full max-w-[390px] h-[820px] flex flex-col p-4 shadow-2xl relative" style={{ backgroundColor: dbblRed }}>
          
          {/* Inner White Receipt Box */}
          <div className="bg-white rounded-[1.5rem] w-full flex-1 flex flex-col relative overflow-hidden mt-6 shadow-sm">
            
            {/* 1. Header (Logos & Text) */}
            <div className="px-5 pt-5 pb-3">
              <div className="flex items-center gap-3">
                {/* SVG DBBL Logo */}
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-inner bg-gradient-to-br from-gray-200 to-gray-400 relative flex-shrink-0 border border-gray-300">
                  <div className="absolute w-[150%] h-[150%] bg-[#183c7d] rounded-[40%] -top-[20%] -left-[60%] transform rotate-12"></div>
                  <div className="absolute w-[150%] h-[150%] bg-[#e51c24] rounded-[40%] top-[10%] -left-[45%] transform rotate-12"></div>
                  <div className="absolute w-[150%] h-[150%] bg-[#008a4b] rounded-[40%] top-[35%] -left-[20%] transform rotate-12"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <h1 className="text-[26px] font-bold text-black tracking-tight leading-none" style={{ transform: "scaleY(1.1)" }}>Dutch-Bangla Bank</h1>
                  <p className="text-[12px] text-gray-600 text-right tracking-[0.02em] uppercase font-serif mt-1">Your Trusted Partner</p>
                </div>
              </div>
            </div>

            {/* Tri-color Line */}
            <div className="w-full h-1.5 flex mt-1">
              <div className="h-full w-[40%]" style={{ backgroundColor: dbblBlue }}></div>
              <div className="h-full w-[30%]" style={{ backgroundColor: dbblRed }}></div>
              <div className="h-full w-[30%]" style={{ backgroundColor: dbblGreen }}></div>
            </div>

            {/* Ticket Notches (Cutouts) */}
            <div className="absolute w-8 h-8 rounded-full -left-4 top-[94px]" style={{ backgroundColor: dbblRed }}></div>
            <div className="absolute w-8 h-8 rounded-full -right-4 top-[94px]" style={{ backgroundColor: dbblRed }}></div>

            {/* NexusPay Subheader */}
            <div className="flex items-center justify-between px-5 py-4 mt-2">
              <div className="flex items-center gap-2">
                 {/* Mini NexusPay Logo */}
                 <div className="w-8 h-7 rounded-md overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 relative border border-gray-300">
                    <div className="absolute w-[150%] h-[150%] bg-[#183c7d] rounded-[40%] -top-[10%] -left-[60%] transform rotate-12"></div>
                    <div className="absolute w-[150%] h-[150%] bg-[#e51c24] rounded-[40%] top-[20%] -left-[45%] transform rotate-12"></div>
                    <div className="absolute w-[150%] h-[150%] bg-[#008a4b] rounded-[40%] top-[45%] -left-[20%] transform rotate-12"></div>
                 </div>
                 <div className="font-bold text-[14px] tracking-tight">
                    <span className="text-gray-900">Nexus</span><span style={{ color: dbblRed }}>Pay</span>
                 </div>
              </div>
              <div className="text-[12px] font-semibold text-gray-800">Fund Transfer</div>
              <div className="text-[11px] text-gray-600 text-center leading-tight">
                Transaction<br/>Memo
              </div>
            </div>

            {/* Main Content Area */}
            <div className="px-5 pb-6 flex-1 flex flex-col gap-4">
              
              {/* Beneficiary Information Card */}
              <div className="border border-gray-100 rounded-xl p-4 shadow-sm bg-white">
                <h3 className="text-[16px] font-bold text-[#2d3436] mb-3">Beneficiary information</h3>
                
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-start">
                    <span className="text-[13.5px] text-gray-600 w-1/2">Beneficiary Name</span>
                    <span className="text-[13.5px] text-gray-800 font-medium w-1/2 text-right uppercase">{beneficiaryName}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-[13.5px] text-gray-600 w-[40%]">Beneficiary Bank</span>
                    <span className="text-[13.5px] text-gray-800 font-medium w-[60%] text-right whitespace-pre-line">{beneficiaryBank}</span>
                  </div>
                  <div className="flex justify-between items-start mt-1">
                    <span className="text-[13.5px] text-gray-600 w-1/2">Card/Account Number</span>
                    <span className="text-[13.5px] text-gray-800 font-medium w-1/2 text-right">{receiverAccount}</span>
                  </div>
                </div>
              </div>

              {/* Payment Information Card */}
              <div className="border border-gray-100 rounded-xl p-4 shadow-sm bg-white">
                <h3 className="text-[16px] font-bold text-[#2d3436] mb-3">Payment information</h3>
                
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[13.5px] text-gray-600">NexusPay ID</span>
                    <span className="text-[13.5px] text-gray-800 font-medium">{nexusPayId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[13.5px] text-gray-600">Transaction ID</span>
                    <span className="text-[13.5px] text-gray-800 font-medium uppercase">{trxId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[13.5px] text-gray-600">Transaction Date</span>
                    <span className="text-[13.5px] text-gray-800 font-medium">{date}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[13.5px] text-gray-600">Card/Account Type</span>
                    <span className="text-[13.5px] text-gray-800 font-medium">{accountType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[13.5px] text-gray-600">Card/Account Number</span>
                    <span className="text-[13.5px] text-gray-800 font-medium">{senderAccount}</span>
                  </div>
                </div>
              </div>

              {/* Total Payment Bar */}
              <div className="mt-1 rounded-xl p-3 flex justify-between items-center shadow-sm" style={{ backgroundColor: totalGreen }}>
                <span className="text-white font-bold text-[15px]">Total Payment</span>
                <span className="text-white font-semibold text-[15px]">BDT {amount}</span>
              </div>

              {/* Footer Text */}
              <div className="text-center mt-2">
                <p className="text-[10px] text-gray-400 font-medium">This receipt has been generated electronically</p>
              </div>

            </div>
          </div>

          {/* Bottom Action Button (Outside the white card, on red background) */}
          <div className="mt-4 mb-2 px-1">
            <div className="bg-white rounded-xl py-3.5 flex justify-center items-center shadow-sm cursor-pointer hover:bg-gray-50 transition">
              <span className="font-semibold text-[15px] tracking-wide" style={{ color: dbblRed }}>
                DOWNLOAD RECEIPT
              </span>
            </div>
            {/* iOS line placeholder */}
            <div className="w-[120px] h-1 bg-white/40 rounded-full mx-auto mt-4"></div>
          </div>

        </div>
      </div>
    </div>
  );
}