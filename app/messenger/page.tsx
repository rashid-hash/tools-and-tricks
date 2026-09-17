"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Noto_Sans_Bengali } from "next/font/google";
import { ArrowLeft, Phone, Video, Info, PlusCircle, Camera, Image as ImageIcon, Mic, Smile, ThumbsUp, Trash2, Download, UploadCloud } from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

interface ChatMessage {
  id: number;
  text: string;
  sender: "me" | "them";
}

export default function MessengerGenerator() {
  const [contactName, setContactName] = useState("Ahsan Habib");
  const [activeStatus, setActiveStatus] = useState("Active now");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hey! Are you using MockupHub?", sender: "them" },
    { id: 2, text: "Yes! It's amazing for creating fake screenshots. 🚀", sender: "me" }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const msgrBlue = "#0084ff";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setProfilePic(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addMessage = (sender: "me" | "them") => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender }]);
      setNewMessage("");
    }
  };

  const removeMessage = (id: number) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const downloadScreenshot = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, { quality: 1.0, pixelRatio: 3 });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "messenger-mockup.png";
        link.click();
      } catch (error) {
        alert("স্ক্রিনশট তৈরি করতে সমস্যা হচ্ছে!");
      }
    }
  };

  return (
    <div className={`min-h-screen bg-[#f0f2f5] p-4 md:p-8 font-sans ${notoSansBengali.className} pb-20`}>
      <div className="max-w-6xl mx-auto mb-8 mt-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Fake <span style={{ color: msgrBlue }}>Messenger</span> Chat</h1>
        <p className="text-gray-500">Create ultra-realistic Messenger chat screenshots for your content.</p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        {/* Controls */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
            
            {/* Profile Setup */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
               <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden">
                 <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                 {profilePic ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover" /> : <UploadCloud size={20} className="text-gray-400" />}
               </div>
               <div className="flex-1 flex flex-col gap-2">
                 <input type="text" placeholder="Contact Name" value={contactName} onChange={(e) => setContactName(e.target.value)} className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 text-sm font-semibold" />
                 <input type="text" placeholder="Active Status" value={activeStatus} onChange={(e) => setActiveStatus(e.target.value)} className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 text-xs" />
               </div>
            </div>

            {/* Message Entry */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-gray-600">Add New Message</label>
              <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 h-20 resize-none" />
              <div className="flex gap-2">
                <button onClick={() => addMessage("them")} className="flex-1 bg-gray-200 text-gray-800 font-bold py-2.5 rounded-lg hover:bg-gray-300 transition text-sm">Add as Them (Left)</button>
                <button onClick={() => addMessage("me")} className="flex-1 text-white font-bold py-2.5 rounded-lg hover:opacity-90 transition text-sm" style={{ backgroundColor: msgrBlue }}>Add as Me (Right)</button>
              </div>
            </div>

            {/* Message List Management */}
            <div className="flex flex-col gap-2 mt-4 max-h-[200px] overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border border-gray-100 text-sm">
                  <span className="truncate w-[80%]">{msg.sender === "me" ? "Me: " : "Them: "}{msg.text}</span>
                  <button onClick={() => removeMessage(msg.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>

          </div>
          <button onClick={downloadScreenshot} className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2 text-lg" style={{ backgroundColor: msgrBlue }}><Download size={20} /> Download Mockup</button>
        </div>

        {/* Live Preview */}
        <div className="w-full lg:w-[55%] flex justify-center sticky top-20">
          <div ref={previewRef} className="w-[380px] h-[822px] bg-white relative shadow-2xl overflow-hidden flex flex-col font-sans border border-gray-200">
            
            {/* Top Status Bar (Placeholder) */}
            <div className="w-full flex justify-end px-4 py-1.5 bg-white text-[11px] text-gray-500 font-medium">12:30 PM</div>

            {/* Header */}
            <div className="px-3 py-2 flex justify-between items-center border-b border-gray-200 shadow-sm bg-white z-10">
              <div className="flex items-center gap-3">
                <ArrowLeft size={24} className="text-[#0084ff] cursor-pointer" />
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden relative">
                    {profilePic ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#e4e6eb]"></div>}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-bold text-[15px] text-gray-900">{contactName}</span>
                    <span className="text-[12px] text-gray-500">{activeStatus}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[#0084ff]">
                <Phone size={22} strokeWidth={2} />
                <Video size={24} strokeWidth={2} />
                <Info size={24} strokeWidth={2} />
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-1 bg-white">
              {/* Profile Intro */}
              <div className="flex flex-col items-center justify-center text-center mt-6 mb-8">
                 <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-3">
                    {profilePic ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#e4e6eb]"></div>}
                 </div>
                 <h2 className="text-xl font-bold text-gray-900">{contactName}</h2>
                 <p className="text-sm text-gray-500">You're friends on Facebook</p>
              </div>

              {/* Messages */}
              {messages.map((msg, index) => {
                const isMe = msg.sender === "me";
                return (
                  <div key={msg.id} className={`flex w-full ${isMe ? "justify-end" : "justify-start"} mb-1`}>
                    {!isMe && (
                      <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden shrink-0 mr-2 self-end mb-1">
                        {profilePic ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#e4e6eb]"></div>}
                      </div>
                    )}
                    <div className={`px-4 py-2.5 rounded-[1.2rem] max-w-[70%] text-[15px] leading-snug whitespace-pre-wrap shadow-sm ${isMe ? "bg-[#0084ff] text-white rounded-br-sm" : "bg-[#e4e6eb] text-black rounded-bl-sm"}`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Input Area */}
            <div className="px-3 py-3 bg-white border-t border-gray-100 flex items-center gap-3">
               <div className="flex items-center gap-3 text-[#0084ff]">
                 <PlusCircle size={22} />
                 <Camera size={22} />
                 <ImageIcon size={22} />
                 <Mic size={22} />
               </div>
               <div className="flex-1 bg-[#f0f2f5] rounded-full flex items-center px-4 py-2 text-gray-500 text-[15px]">
                 <span className="flex-1">Aa</span>
                 <Smile size={20} className="text-[#0084ff]" />
               </div>
               <ThumbsUp size={24} className="text-[#0084ff] fill-[#0084ff]" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}