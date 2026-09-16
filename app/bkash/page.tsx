"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Hind_Siliguri } from "next/font/google";
import { Phone, Copy, EyeOff, RefreshCcw, Share2, Star, ArrowRight, Check } from "lucide-react";

// গুগলের "Hind Siliguri" ফন্টটি ইম্পোর্ট করা হলো (বিকাশের ফন্টের সাথে ১০০% মিল পাওয়ার জন্য)
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
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
  const bkashGreen = "#00a859";

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
        link.download = "bkash-original-mockup.png";
        link.click();
      } catch (error) {
        console.error("Screenshot error:", error);
        alert("স্ক্রিনশট তৈরি করতে সমস্যা হচ্ছে!");
      }
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col lg:flex-row gap-8 ${hindSiliguri.className} text-gray-800`}>
      
      {/* --- Left Panel: Controls --- */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 font-sans">
        <h2 className="text-2xl font-bold mb-4" style={{ color: bkashPink }}>bKash Original Layout</h2>
        
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
            <input type="text" value={trxId} onChange={(e) => setTrxId(e.target.value)} className="border p-2 rounded outline-none focus:ring-2 focus:ring-[#e2136e] uppercase" />
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
        <div ref={previewRef} className="w-full max-w-[380px] bg-white h-[800px] relative flex flex-col shadow-2xl overflow-hidden border border-gray-100">
          
          <div className="w-full flex justify-end px-4 py-2 bg-white text-[11px] text-gray-500 font-medium font-sans">
            59
          </div>

          <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
            
            {/* Header Success Message */}
            <div className="px-5 mt-4 flex justify-between items-center">
              <h1 className="text-[20px] font-semibold tracking-tight">
                <span style={{ color: bkashPink }}>আপনার সেন্ড মানি</span> <span style={{ color: bkashGreen }}>সফল হয়েছে</span>
              </h1>
              {/* Thinner Check Icon */}
              <div className="w-[34px] h-[34px] rounded-full border-[1.5px] flex items-center justify-center" style={{ borderColor: bkashGreen }}>
                <Check size={20} strokeWidth={1.5} style={{ color: bkashGreen }} />
              </div>
            </div>

            {/* Profile Section */}
            <div className="px-5 mt-10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-[50px] h-[50px] rounded-full bg-[#95c2d3] flex items-center justify-center text-white text-2xl font-sans">
                  {receiverName ? receiverName.charAt(0).toUpperCase() : "0"}
                </div>
                <div className="flex flex-col leading-[1.2] font-sans">
                  <span className="text-[15px] font-medium text-gray-800">{receiverName}</span>
                  <span className="text-[15px] text-gray-600 mt-0.5">{receiverNumber}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-1.5 border px-4 py-1.5 rounded-md" style={{ borderColor: bkashPink, color: bkashPink }}>
                {/* Thinner Phone Icon */}
                <Phone size={15} strokeWidth={1.5} />
                <span className="text-[15px] font-medium">কল</span>
              </div>
            </div>

            {/* Grid Details Section */}
            <div className="mt-8 border-t border-b border-gray-100 flex flex-col">
              
              <div className="flex border-b border-gray-100">
                <div className="w-1/2 border-r border-gray-100 p-4">
                  <p className="text-[13px] text-gray-500 mb-1">সময়</p>
                  <p className="text-[15px] text-gray-800 font-sans">{time}</p>
                </div>
                <div className="w-1/2 p-4">
                  <p className="text-[13px] text-gray-500 mb-1">ট্রানজেকশন আইডি</p>
                  <div className="flex items-center gap-1.5 font-sans">
                    <p className="text-[15px] text-gray-800 uppercase">{trxId}</p>
                    {/* Thinner Copy Icon */}
                    <Copy size={16} strokeWidth={1.5} style={{ color: bkashPink }} />
                  </div>
                </div>
              </div>

              <div className="flex border-b border-gray-100">
                <div className="w-1/2 border-r border-gray-100 p-4">
                  <p className="text-[13px] text-gray-500 mb-1">সর্বমোট</p>
                  <p className="text-[16px] text-gray-800 font-sans mb-1">৳{totalAmount}</p>
                  <p className="text-[13px] text-gray-400 font-sans">৳{amount} + ৳{charge}</p>
                </div>
                <div className="w-1/2 p-4">
                  <p className="text-[13px] text-gray-500 mb-1">নতুন ব্যালেন্স</p>
                  <div className="flex items-center gap-1.5 font-sans">
                    <p className="text-[16px] text-gray-800">৳{newBalance}</p>
                    {/* Thinner EyeOff Icon */}
                    <EyeOff size={16} strokeWidth={1.5} style={{ color: bkashPink }} />
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="w-full p-4 h-16">
                  <p className="text-[13px] text-gray-500">রেফারেন্স</p>
                  <p className="text-[15px] text-gray-800 mt-1 font-sans">{reference}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-4 mt-6 flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-md border font-medium text-[15px]" style={{ borderColor: bkashPink, color: bkashPink }}>
                <RefreshCcw size={18} strokeWidth={1.5} /> অটো পে চালু করুন
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-md border font-medium text-[15px]" style={{ borderColor: bkashPink, color: bkashPink }}>
                <Share2 size={18} strokeWidth={1.5} fill={bkashPink} /> শেয়ার
              </button>
            </div>

            {/* Rewards Section */}
            <div className="mt-10 flex flex-col items-center justify-center text-center px-4 pb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: bkashPink }}>
                <Star size={22} strokeWidth={0} fill="white" />
              </div>
              <p className="text-[15px] text-gray-600 mb-1">আপনি অর্জন করেছেন</p>
              <h3 className="text-[19px] font-semibold text-gray-800 mb-2">বিকাশ রিওয়ার্ড পয়েন্ট</h3>
              <p className="text-[13px] text-gray-600">পয়েন্ট ব্যবহার করতে <span style={{ color: bkashPink }}>বিকাশ রিওয়ার্ডস</span> চেক করুন!</p>
            </div>

          </div>

          {/* Bottom Button */}
          <div className="absolute bottom-0 left-0 w-full bg-white pt-2 pb-6 px-4">
             <button className="w-full flex items-center justify-between text-white font-medium py-3.5 px-5 rounded-lg transition" style={{ backgroundColor: bkashPink }}>
               <span className="text-[16px]">হোম-এ ফিরে যাই</span>
               <ArrowRight size={22} strokeWidth={1.5} />
             </button>
             <div className="w-[120px] h-1.5 bg-gray-300 rounded-full mx-auto mt-4"></div>
          </div>
          
        </div>
      </div>
    </div>
  );
}