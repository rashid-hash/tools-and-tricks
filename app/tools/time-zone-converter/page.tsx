"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Globe2, Sparkles, Clock, CalendarClock, 
  MapPin, Plus, Trash2, ArrowRight, QrCode, Key, Scale
} from "lucide-react";
import RelatedSidebar, { SuggestedTool } from "@/components/RelatedSidebar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700", "800"] });

// Utility Category Related Tools
const utilityRelatedTools: SuggestedTool[] = [
  { id: "unit-converter", name: "Unit Converter", desc: "Convert length, weight, etc.", icon: Scale, href: "/tools/unit-converter", color: "text-blue-500", bg: "bg-blue-100" },
  { id: "qr-generator", name: "QR Generator", desc: "Create custom QR codes.", icon: QrCode, href: "/tools/qr-generator", color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: "password-generator", name: "Password Generator", desc: "Create secure passwords.", icon: Key, href: "/tools/password-generator", color: "text-red-500", bg: "bg-red-100" }
];

// Popular World Timezones
const TIMEZONES = [
  { label: "USA - New York (EST/EDT)", value: "America/New_York", country: "US" },
  { label: "USA - Los Angeles (PST/PDT)", value: "America/Los_Angeles", country: "US" },
  { label: "UK - London (GMT/BST)", value: "Europe/London", country: "GB" },
  { label: "Australia - Sydney (AEST)", value: "Australia/Sydney", country: "AU" },
  { label: "Japan - Tokyo (JST)", value: "Asia/Tokyo", country: "JP" },
  { label: "UAE - Dubai (GST)", value: "Asia/Dubai", country: "AE" },
  { label: "Saudi Arabia - Riyadh (AST)", value: "Asia/Riyadh", country: "SA" },
  { label: "India - Kolkata (IST)", value: "Asia/Kolkata", country: "IN" },
  { label: "Singapore (SGT)", value: "Asia/Singapore", country: "SG" },
  { label: "Canada - Toronto (EST/EDT)", value: "America/Toronto", country: "CA" },
  { label: "Germany - Berlin (CET/CEST)", value: "Europe/Berlin", country: "DE" },
  { label: "France - Paris (CET/CEST)", value: "Europe/Paris", country: "FR" },
];

export default function TimeZoneConverterTool() {
  const [mounted, setMounted] = useState(false);
  
  // Base time is the user's local time input
  const [localTimeInput, setLocalTimeInput] = useState<string>("");
  
  // Selected Target Zones
  const [targetZones, setTargetZones] = useState<string[]>([
    "America/New_York", 
    "Europe/London", 
    "Asia/Tokyo"
  ]);
  const [newZone, setNewZone] = useState<string>("Australia/Sydney");

  useEffect(() => {
    setMounted(true);
    // Initialize with current local time
    const now = new Date();
    const tzOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now.getTime() - tzOffset)).toISOString().slice(0,16);
    setLocalTimeInput(localISOTime);
  }, []);

  // Format a date object to a specific timezone
  const formatToZone = (dateObj: Date, zoneValue: string) => {
    if (isNaN(dateObj.getTime())) return null;

    try {
      // Time format (e.g., 10:30 AM)
      const timeString = new Intl.DateTimeFormat('en-US', {
        timeZone: zoneValue,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(dateObj);

      // Date format (e.g., Mon, Sep 25)
      const dateString = new Intl.DateTimeFormat('en-US', {
        timeZone: zoneValue,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }).format(dateObj);

      return { timeString, dateString };
    } catch (error) {
      return null;
    }
  };

  const handleAddZone = () => {
    if (!targetZones.includes(newZone)) {
      setTargetZones([...targetZones, newZone]);
    }
  };

  const handleRemoveZone = (zoneToRemove: string) => {
    setTargetZones(targetZones.filter(z => z !== zoneToRemove));
  };

  if (!mounted) return null;

  const currentDateObj = new Date(localTimeInput);

  return (
    <div className={`min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-24 md:pt-32`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-bold text-sky-700 uppercase tracking-widest mb-4">
          <Sparkles size={14} className="text-sky-500" />
          Utility Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
          Time Zone <span className="text-sky-500">Converter</span>
        </h1>
        <p className="text-slate-500 text-[16px] max-w-xl mx-auto font-medium">
          আপনার লোকাল সময়ের সাথে বিশ্বের বিভিন্ন দেশের (যেমন- USA, UK) সময়ের পার্থক্য এক নজরে দেখে নিন। গ্লোবাল মিটিং সেট করার জন্য দারুণ!
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        
        {/* Left Column: Tool Area */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Top Panel: Local Time Input */}
          <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-[60px] rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center shrink-0">
                  <CalendarClock size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Your Local Time</h3>
                  <p className="text-lg font-extrabold text-[#111827]">
                    Set time to convert &rarr;
                  </p>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <input 
                  type="datetime-local"
                  value={localTimeInput}
                  onChange={(e) => setLocalTimeInput(e.target.value)}
                  className="w-full md:w-[280px] h-14 bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 rounded-2xl px-5 text-base font-bold text-[#111827] outline-none transition-all cursor-pointer shadow-sm"
                />
              </div>

            </div>
          </div>

          {/* Bottom Panel: Target Zones List */}
          <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[32px] shadow-[0_20px_60px_rgb(15,23,42,0.06)] border border-slate-200/60">
            
            {/* Add Zone Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-8 pb-8 border-b border-slate-100">
              <div className="flex-1 w-full relative">
                <Globe2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select 
                  value={newZone}
                  onChange={(e) => setNewZone(e.target.value)}
                  className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 text-sm font-bold text-slate-700 outline-none cursor-pointer focus:border-sky-500 transition-colors"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value} disabled={targetZones.includes(tz.value)}>
                      {tz.label} {targetZones.includes(tz.value) ? "(Added)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <button 
                onClick={handleAddZone}
                disabled={targetZones.includes(newZone)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#111827] hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-md disabled:opacity-50"
              >
                <Plus size={16} className="text-sky-400" /> Add City
              </button>
            </div>

            {/* Converted Time Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {targetZones.map((zoneValue) => {
                const tzInfo = TIMEZONES.find(t => t.value === zoneValue);
                const formatted = formatToZone(currentDateObj, zoneValue);
                
                if (!formatted) return null;

                return (
                  <div key={zoneValue} className="group flex flex-col justify-between p-5 bg-[#0F172A] border border-slate-700 rounded-2xl relative overflow-hidden transition-all hover:border-sky-500/50">
                    
                    <button 
                      onClick={() => handleRemoveZone(zoneValue)}
                      className="absolute top-4 right-4 p-2 text-slate-500 hover:text-rose-400 bg-slate-800 hover:bg-rose-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      title="Remove City"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="mb-6 pr-10">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin size={14} className="text-sky-400" />
                        <h4 className="text-sm font-bold text-sky-100">{tzInfo?.label.split(' - ')[1] || zoneValue.split('/')[1]}</h4>
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-6">
                        {tzInfo?.label.split(' - ')[0] || zoneValue.split('/')[0]}
                      </p>
                    </div>

                    <div className="flex items-end justify-between border-t border-slate-700/50 pt-4 mt-auto">
                      <div>
                        <p className="text-3xl font-extrabold text-white tracking-tight mb-1">
                          {formatted.timeString}
                        </p>
                        <p className="text-sm font-bold text-sky-400">
                          {formatted.dateString}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {targetZones.length === 0 && (
                <div className="col-span-1 md:col-span-2 py-10 flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Globe2 size={40} className="mb-3 opacity-20" />
                  <p className="text-sm font-medium">No cities added. Add a city to see the converted time.</p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="hidden lg:block w-80 shrink-0">
           <RelatedSidebar tools={utilityRelatedTools} />
        </div>

      </div>
    </div>
  );
}