"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Plane, Download, Barcode } from "lucide-react";

export default function BoardingPassGenerator() {
  const [passengerName, setPassengerName] = useState("MR JOHN DOE");
  const [airline, setAirline] = useState("BIMAN BANGLADESH");
  const [flightNo, setFlightNo] = useState("BG-245");
  const [fromCode, setFromCode] = useState("DAC");
  const [fromCity, setFromCity] = useState("Dhaka");
  const [toCode, setToCode] = useState("DXB");
  const [toCity, setToCity] = useState("Dubai");
  const [date, setDate] = useState("24 DEC 2026");
  const [time, setTime] = useState("09:45 PM");
  const [gate, setGate] = useState("G4");
  const [seat, setSeat] = useState("12A");
  const [flightClass, setFlightClass] = useState("Economy");

  const previewRef = useRef<HTMLDivElement>(null);
  const themeColor = "#0f172a"; // Slate Navy

  const downloadScreenshot = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, { quality: 1.0, pixelRatio: 3 });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "boarding-pass.png";
        link.click();
      } catch (error) {
        alert("স্ক্রিনশট তৈরি করতে সমস্যা হচ্ছে!");
      }
    }
  };

  return (
    <div className={`min-h-screen bg-gray-100 p-4 md:p-8 font-sans pb-20`}>
      <div className="max-w-6xl mx-auto mb-8 mt-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Fake <span className="text-indigo-600">Boarding Pass</span></h1>
        <p className="text-gray-500">Create ultra-realistic flight tickets for pranks and fun.</p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        {/* Controls */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Passenger Name" value={passengerName} onChange={(e) => setPassengerName(e.target.value.toUpperCase())} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 uppercase col-span-2" />
            <input type="text" placeholder="Airline Name" value={airline} onChange={(e) => setAirline(e.target.value.toUpperCase())} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 uppercase" />
            <input type="text" placeholder="Flight No (e.g. BG-245)" value={flightNo} onChange={(e) => setFlightNo(e.target.value.toUpperCase())} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 uppercase" />
            
            <input type="text" placeholder="From Code (e.g. DAC)" value={fromCode} onChange={(e) => setFromCode(e.target.value.toUpperCase())} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 uppercase font-bold" />
            <input type="text" placeholder="From City" value={fromCity} onChange={(e) => setFromCity(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100" />
            
            <input type="text" placeholder="To Code (e.g. DXB)" value={toCode} onChange={(e) => setToCode(e.target.value.toUpperCase())} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 uppercase font-bold" />
            <input type="text" placeholder="To City" value={toCity} onChange={(e) => setToCity(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100" />
            
            <input type="text" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value.toUpperCase())} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 uppercase" />
            <input type="text" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value.toUpperCase())} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 uppercase" />
            
            <div className="col-span-2 grid grid-cols-3 gap-4">
               <input type="text" placeholder="Gate" value={gate} onChange={(e) => setGate(e.target.value.toUpperCase())} className="border p-2.5 rounded-lg outline-none uppercase" />
               <input type="text" placeholder="Seat" value={seat} onChange={(e) => setSeat(e.target.value.toUpperCase())} className="border p-2.5 rounded-lg outline-none uppercase" />
               <input type="text" placeholder="Class" value={flightClass} onChange={(e) => setFlightClass(e.target.value.toUpperCase())} className="border p-2.5 rounded-lg outline-none uppercase" />
            </div>
          </div>
          <button onClick={downloadScreenshot} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2 text-lg"><Download size={20} /> Generate Ticket</button>
        </div>

        {/* Live Preview */}
        <div className="w-full lg:w-[55%] flex justify-center sticky top-20">
          
          <div ref={previewRef} className="w-full max-w-[450px] bg-white rounded-3xl shadow-2xl relative overflow-hidden flex flex-col font-mono text-gray-900 border border-gray-200">
            
            {/* Header: Airline Name */}
            <div className="px-6 py-5 bg-indigo-900 text-white flex justify-between items-center">
              <span className="text-xl font-black tracking-widest">{airline}</span>
              <Plane size={28} className="transform rotate-45" />
            </div>

            {/* Main Ticket Info */}
            <div className="px-6 py-6 flex flex-col gap-5 relative bg-white">
              
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Passenger Name</span>
                <span className="text-xl font-bold tracking-wide">{passengerName}</span>
              </div>

              {/* Route */}
              <div className="flex justify-between items-center mt-2">
                <div className="flex flex-col w-1/3">
                  <span className="text-4xl font-black text-indigo-900">{fromCode}</span>
                  <span className="text-sm text-gray-500 font-bold uppercase mt-1 truncate">{fromCity}</span>
                </div>
                <div className="flex flex-col items-center justify-center w-1/3 text-gray-300">
                   <Plane size={32} className="transform rotate-90 text-indigo-500" />
                   <div className="w-full h-0.5 bg-gray-200 border-dashed border-t-2 mt-2"></div>
                </div>
                <div className="flex flex-col w-1/3 text-right">
                  <span className="text-4xl font-black text-indigo-900">{toCode}</span>
                  <span className="text-sm text-gray-500 font-bold uppercase mt-1 truncate">{toCity}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2 border-t border-gray-100 pt-4">
                 <div>
                   <span className="block text-xs text-gray-400 font-bold uppercase tracking-widest">Flight</span>
                   <span className="block text-lg font-bold">{flightNo}</span>
                 </div>
                 <div>
                   <span className="block text-xs text-gray-400 font-bold uppercase tracking-widest">Date</span>
                   <span className="block text-lg font-bold">{date}</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4 bg-indigo-50 p-4 rounded-xl mt-2">
                 <div>
                   <span className="block text-xs text-indigo-400 font-bold uppercase tracking-widest">Boarding</span>
                   <span className="block text-xl font-black text-indigo-900">{time}</span>
                 </div>
                 <div className="text-center">
                   <span className="block text-xs text-indigo-400 font-bold uppercase tracking-widest">Gate</span>
                   <span className="block text-xl font-black text-indigo-900">{gate}</span>
                 </div>
                 <div className="text-right">
                   <span className="block text-xs text-indigo-400 font-bold uppercase tracking-widest">Seat</span>
                   <span className="block text-xl font-black text-indigo-900">{seat}</span>
                 </div>
              </div>
            </div>

            {/* Ticket Tear Line (Dashed) */}
            <div className="w-full h-10 relative flex items-center bg-white">
               <div className="w-6 h-6 rounded-full bg-gray-100 absolute -left-3 shadow-inner"></div>
               <div className="w-full border-t-2 border-dashed border-gray-300 mx-4"></div>
               <div className="w-6 h-6 rounded-full bg-gray-100 absolute -right-3 shadow-inner"></div>
            </div>

            {/* Footer: Barcode */}
            <div className="px-6 pt-2 pb-6 flex flex-col items-center bg-white">
               <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3 self-start">Class: {flightClass}</span>
               <div className="w-full flex justify-center text-gray-800 opacity-80 overflow-hidden" style={{ transform: "scaleY(2.5)", transformOrigin: "top" }}>
                 {/* Fake visual Barcode using repeated characters */}
                 <span className="font-bold tracking-tighter text-3xl">||||| | ||||| || | |||| |||| ||| || | ||||| | |||</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}