"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from 'html-to-image';
import { ArrowLeft, Video, Phone, MoreVertical, Plus, Mic, Camera } from "lucide-react";

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
  
  const [messages, setMessages] = useState<Message[]>([]);

  const previewRef = useRef<HTMLDivElement>(null);

  // নতুন মেসেজ অ্যাড করার ফাংশন (আপডেটেড)
  const addMessage = () => {
    // মেসেজ বক্স খালি থাকলে একটি এলার্ট দেখাবে
    if (!newMessage.trim()) {
      alert("দয়া করে আগে বক্সে কিছু মেসেজ টাইপ করুন!");
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
    setNewMessage(""); // মেসেজ অ্যাড হওয়ার পর ইনপুট বক্স ক্লিয়ার হয়ে যাবে
  };

  // ইমেজ ডাউনলোড করার ফাংশন (html-to-image দিয়ে)
  const downloadScreenshot = async () => {
    if (previewRef.current) {
      try {
        // html-to-image ব্যবহার করে DOM কে PNG তে কনভার্ট করা হচ্ছে
        const dataUrl = await htmlToImage.toPng(previewRef.current, { 
          quality: 1.0, // বেস্ট কোয়ালিটির জন্য
          pixelRatio: 2, // ইমেজ যেন ফেটে না যায়
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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col md:flex-row gap-8 font-sans">
      
      {/* --- Left Panel: Controls --- */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chat Settings</h2>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Contact Name</label>
          <input 
            type="text" 
            value={contactName} 
            onChange={(e) => setContactName(e.target.value)} 
            className="border p-2 rounded outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Status (e.g., online, typing...)</label>
          <input 
            type="text" 
            value={onlineStatus} 
            onChange={(e) => setOnlineStatus(e.target.value)} 
            className="border p-2 rounded outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <hr className="my-4" />
        
        <h3 className="font-bold text-gray-800">Add Message</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setSenderType("them")}
            className={`flex-1 py-2 rounded font-medium ${senderType === "them" ? "bg-gray-200 text-black" : "bg-gray-50 text-gray-500 border"}`}
          >
            Received
          </button>
          <button 
            onClick={() => setSenderType("me")}
            className={`flex-1 py-2 rounded font-medium ${senderType === "me" ? "bg-green-100 text-green-700" : "bg-gray-50 text-gray-500 border"}`}
          >
            Sent
          </button>
        </div>

        <textarea 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="border p-2 rounded h-24 outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />
        
        <button 
          onClick={addMessage} 
          className="bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition"
        >
          Add Message
        </button>

        <hr className="my-4" />

        <button 
          onClick={downloadScreenshot} 
          className="bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition w-full"
        >
          Download Screenshot
        </button>
      </div>

      {/* --- Right Panel: Live Preview --- */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        {/* Mobile Device Mockup Container */}
        <div 
          ref={previewRef}
          className="w-full max-w-[380px] bg-[#efeae2] h-[750px] relative flex flex-col shadow-2xl overflow-hidden"
          style={{ fontFamily: "Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif" }}
        >
          {/* Header */}
          <div className="bg-[#075E54] text-white px-2 py-3 flex items-center justify-between shadow-md z-10">
            <div className="flex items-center gap-2">
              <ArrowLeft size={24} className="cursor-pointer" />
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                {/* Default Avatar SVG */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-500 w-8 h-8 mt-2">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-[17px]">{contactName}</span>
                <span className="text-[13px] text-gray-200">{onlineStatus}</span>
              </div>
            </div>
            <div className="flex items-center gap-5 mr-2">
              <Video size={20} className="cursor-pointer" />
              <Phone size={20} className="cursor-pointer" />
              <MoreVertical size={20} className="cursor-pointer" />
            </div>
          </div>

          {/* Chat Background & Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 relative z-0">
            {/* WhatsApp pattern background overlay */}
            <div className="absolute inset-0 opacity-40 pointer-events-none" 
     style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: 'cover' }}>
</div>            
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} relative z-10`}>
                <div className={`max-w-[80%] px-3 py-1.5 rounded-lg text-[15px] shadow-sm relative ${msg.sender === "me" ? "bg-[#dcf8c6] rounded-tr-none" : "bg-white rounded-tl-none"}`}>
                  <span className="break-words text-gray-800" style={{ lineHeight: "20px" }}>{msg.text}</span>
                  <div className="flex items-center justify-end gap-1 mt-1">
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
          <div className="bg-gray-100 p-2 flex items-center gap-2 z-10 shadow-[0_-1px_2px_rgba(0,0,0,0.05)]">
            <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 gap-3 shadow-sm">
              <span className="text-gray-400">😊</span>
              <div className="text-gray-400 text-[15px] flex-1">Message</div>
              <MoreVertical size={20} className="text-gray-400 rotate-90" />
              <Camera size={20} className="text-gray-400" />
            </div>
            <div className="w-10 h-10 bg-[#00897B] rounded-full flex items-center justify-center text-white shadow-sm">
              <Mic size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}