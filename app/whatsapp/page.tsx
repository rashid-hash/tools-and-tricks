"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from 'html-to-image';
import { Noto_Sans_Bengali } from "next/font/google";
import { ArrowLeft, Video, Phone, MoreVertical, Plus, Mic, Camera, UploadCloud } from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

type Message = {
  id: number;
  text: string;
  sender: "me" | "them";
  time: string;
  status?: "none" | "sent" | "delivered" | "read";
};

export default function WhatsAppGenerator() {
  const [contactName, setContactName] = useState("John Doe");
  const [onlineStatus, setOnlineStatus] = useState("online");
  const [newMessage, setNewMessage] = useState("");
  const [senderType, setSenderType] = useState<"me" | "them">("them");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey, are you there?", sender: "them", time: "10:30 AM", status: "none" },
    { id: 2, text: "Yes, just checking out this new tool!", sender: "me", time: "10:32 AM", status: "read" }
  ]);

  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const waGreen = "#25D366";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setProfilePic(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addMessage = () => {
    if (!newMessage.trim()) {
      alert("দয়া করে আগে বক্সে কিছু মেসেজ টাইপ করুন!");
      return;
    }
    
    const date = new Date();
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages([...messages, {
      id: Date.now(),
      text: newMessage,
      sender: senderType,
      time: timeString,
      status: senderType === "me" ? "read" : "none"
    }]);
    setNewMessage(""); 
  };

  const downloadScreenshot = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, { 
          quality: 1.0, 
          pixelRatio: 3, 
        });
        
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "whatsapp-mockup.png";
        link.click();
      } catch (error) {
        console.error("Screenshot error:", error);
        alert("স্ক্রিনশট তৈরি করতে সমস্যা হচ্ছে! কনসোল চেক করুন।");
      }
    }
  };

  return (
    <div className={`min-h-screen pt-24 md:pt-32 bg-gray-50 p-4 md:p-8 flex flex-col gap-8 ${notoSansBengali.className} text-gray-800`}>
      
      {/* 🌟 Top Title Section 🌟 */}
      <div className="max-w-6xl mx-auto w-full text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Fake <span style={{ color: waGreen }}>WhatsApp</span> Chat
        </h1>
        <p className="text-gray-500">Create ultra-realistic WhatsApp chat screenshots for your content.</p>
      </div>

      {/* 🌟 2-Column Layout 🌟 */}
      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-8 items-start">
        
        {/* --- Left Panel: Controls --- */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
            
            {/* Profile Setup */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
               <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden shrink-0">
                 <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                 {profilePic ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover" /> : <UploadCloud size={20} className="text-gray-400" />}
               </div>
               <div className="flex-1 flex flex-col gap-2">
                 <input type="text" placeholder="Contact Name" value={contactName} onChange={(e) => setContactName(e.target.value)} className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#075E54] text-sm font-semibold" />
                 <input type="text" placeholder="Active Status" value={onlineStatus} onChange={(e) => setOnlineStatus(e.target.value)} className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-[#075E54] text-xs" />
               </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-gray-600">Add New Message</label>
              <textarea 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#075E54] h-20 resize-none"
              />
              <div className="flex gap-2">
                <button 
                  onClick={() => setSenderType("them")}
                  className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition ${senderType === "them" ? "bg-gray-200 text-gray-800" : "bg-gray-50 text-gray-500 border"}`}
                >
                  Received (Left)
                </button>
                <button 
                  onClick={() => setSenderType("me")}
                  className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition ${senderType === "me" ? "bg-[#dcf8c6] text-[#075E54]" : "bg-gray-50 text-gray-500 border"}`}
                >
                  Sent (Right)
                </button>
              </div>
              <button 
                onClick={addMessage} 
                className="bg-[#075E54] text-white py-3 rounded-lg font-bold hover:opacity-90 transition mt-2 shadow-md"
              >
                Add Message to Chat
              </button>
            </div>

          </div>

          <button 
            onClick={downloadScreenshot} 
            className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2 text-lg"
            style={{ backgroundColor: waGreen }}
          >
            Download Mockup
          </button>
        </div>

        {/* --- Right Panel: Live Preview --- */}
        <div className="w-full lg:w-[55%] flex justify-center sticky top-28">
          
          <div 
            ref={previewRef}
            className="w-full max-w-[380px] bg-[#efeae2] h-[750px] md:h-[822px] relative flex flex-col shadow-2xl overflow-hidden rounded-[2rem] border border-gray-200"
            style={{ fontFamily: "Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif" }}
          >
            {/* Top Status Bar (Placeholder) */}
            <div className="w-full flex justify-end px-4 py-1.5 bg-[#075E54] text-[11px] text-white/90 font-medium">12:30 PM</div>

            {/* Header */}
            <div className="bg-[#075E54] text-white px-2 py-3 flex items-center justify-between shadow-md z-10">
              <div className="flex items-center gap-2">
                <ArrowLeft size={24} className="cursor-pointer ml-1" />
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-500 w-8 h-8 mt-2">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col leading-tight ml-1">
                  <span className="font-semibold text-[17px]">{contactName}</span>
                  <span className="text-[13px] text-gray-200">{onlineStatus}</span>
                </div>
              </div>
              <div className="flex items-center gap-5 mr-3">
                <Video size={20} className="cursor-pointer" />
                <Phone size={20} className="cursor-pointer" />
                <MoreVertical size={20} className="cursor-pointer" />
              </div>
            </div>

            {/* Chat Background & Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 relative z-0">
              <div className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{ backgroundImage: "url('bg.jpg')", backgroundSize: 'cover' }}></div>            
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} relative z-10`}>
                  <div className={`max-w-[80%] px-3 py-1.5 rounded-lg text-[15px] shadow-sm relative ${msg.sender === "me" ? "bg-[#dcf8c6] rounded-tr-none" : "bg-white rounded-tl-none"}`}>
                    <span className="break-words text-gray-900 whitespace-pre-wrap" style={{ lineHeight: "20px" }}>{msg.text}</span>
                    <div className="flex items-center justify-end gap-1 mt-0.5">
                      <span className="text-[11px] text-gray-500">{msg.time}</span>
                      {msg.sender === "me" && (
                        <svg viewBox="0 0 16 15" width="16" height="15" className={`${msg.status === 'read' ? 'text-blue-500' : 'text-gray-400'}`}>
                           <path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.199c.143.13.36.125.498-.013l5.35-6.955a.365.365 0 0 0-.063-.51z"/>
                           <path fill="currentColor" d="M9.82 3.316l-.478-.372a.365.365 0 0 0-.51.063L3.475 9.879a.32.32 0 0 1-.484.033L1.08 8.175a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l2.87 2.607c.143.13.36.125.498-.013l5.35-6.955a.365.365 0 0 0-.063-.51z"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Input Area */}
            <div className="bg-[#f0f0f0] p-2 flex items-center gap-2 z-10 shadow-[0_-1px_2px_rgba(0,0,0,0.05)] pb-4">
              <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2.5 gap-3 shadow-sm">
                <span className="text-gray-500 text-xl leading-none">😊</span>
                <div className="text-gray-500 text-[15px] flex-1">Message</div>
                <MoreVertical size={20} className="text-gray-500 rotate-90" />
                <Camera size={20} className="text-gray-500" />
              </div>
              <div className="w-[42px] h-[42px] bg-[#00A884] rounded-full flex items-center justify-center text-white shadow-sm shrink-0">
                <Mic size={20} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}