"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Globe, Users, Lock, MoreHorizontal, X, 
  ThumbsUp, MessageSquare, Share2, BadgeCheck, 
  UploadCloud, Download 
} from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export default function FacebookPostGenerator() {
  // Post Details
  const [profileName, setProfileName] = useState("Mark Zuckerberg");
  const [isVerified, setIsVerified] = useState(true);
  const [timeText, setTimeText] = useState("2 hrs");
  const [privacy, setPrivacy] = useState<"public" | "friends" | "only_me">("public");
  const [postContent, setPostContent] = useState("Just had a great time building Next.js apps with MockupHub! 🚀\n\nWhat should we build next?");
  
  // Metrics
  const [likes, setLikes] = useState("120K");
  const [comments, setComments] = useState("4.2K");
  const [shares, setShares] = useState("1.5K");

  // Profile Picture
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewRef = useRef<HTMLDivElement>(null);
  const fbBlue = "#0866ff";

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadScreenshot = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, { quality: 1.0, pixelRatio: 3 });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "fb-fake-post.png";
        link.click();
      } catch (error) {
        console.error("Screenshot error:", error);
        alert("স্ক্রিনশট তৈরি করতে সমস্যা হচ্ছে!");
      }
    }
  };

  // Helper for Privacy Icon
  const renderPrivacyIcon = () => {
    if (privacy === "public") return <Globe size={12} className="text-gray-500 fill-gray-500" />;
    if (privacy === "friends") return <Users size={12} className="text-gray-500 fill-gray-500" />;
    return <Lock size={12} className="text-gray-500 fill-gray-500" />;
  };

  return (
    <div className={`min-h-screen bg-[#f0f2f5] p-4 md:p-8 font-sans ${notoSansBengali.className} text-gray-800 pb-20`}>
      
      <div className="max-w-6xl mx-auto mb-8 mt-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Fake <span style={{ color: fbBlue }}>Facebook Post</span> Generator
        </h1>
        <p className="text-gray-500">কনটেন্ট ক্রিয়েটরদের জন্য ১০০% রিয়েলিস্টিক ফেসবুক পোস্ট মকআপ তৈরি করুন।</p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* --- Left Panel: Controls --- */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
            
            {/* Avatar Upload */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden relative group"
               >
                 <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                 {profilePic ? (
                   // eslint-disable-next-line @next/next/no-img-element
                   <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                   <UploadCloud size={24} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                 )}
               </div>
               <div>
                 <p className="font-semibold text-gray-800">Profile Picture</p>
                 <p className="text-xs text-gray-500">Click to upload avatar</p>
               </div>
            </div>

            {/* Profile Name & Verification */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Profile Name</label>
              <div className="flex items-center gap-2">
                <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="flex-1 border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500" />
                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                  <input type="checkbox" checked={isVerified} onChange={(e) => setIsVerified(e.target.checked)} className="accent-blue-500 w-4 h-4" />
                  <span className="text-sm font-medium">Verified</span>
                </label>
              </div>
            </div>

            {/* Time & Privacy */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Time (e.g. 2 hrs, Just now)</label>
                <input type="text" value={timeText} onChange={(e) => setTimeText(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-600">Privacy</label>
                <select value={privacy} onChange={(e) => setPrivacy(e.target.value as any)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white">
                  <option value="public">Public</option>
                  <option value="friends">Friends</option>
                  <option value="only_me">Only Me</option>
                </select>
              </div>
            </div>

            {/* Post Content */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Post Content</label>
              <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 h-28 resize-none" />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500">Likes (e.g. 1.2K)</label>
                <input type="text" value={likes} onChange={(e) => setLikes(e.target.value)} className="border p-2 rounded-lg outline-none focus:border-blue-500 text-sm" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500">Comments</label>
                <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} className="border p-2 rounded-lg outline-none focus:border-blue-500 text-sm" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500">Shares</label>
                <input type="text" value={shares} onChange={(e) => setShares(e.target.value)} className="border p-2 rounded-lg outline-none focus:border-blue-500 text-sm" />
              </div>
            </div>

          </div>

          <button onClick={downloadScreenshot} className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2 text-lg" style={{ backgroundColor: fbBlue }}>
            <Download size={20} /> Download Post
          </button>
        </div>

        {/* --- Right Panel: Live Preview --- */}
        <div className="w-full lg:w-[55%] flex justify-center sticky top-20">
          
          {/* Facebook Post Container */}
          <div ref={previewRef} className="w-full max-w-[500px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans">
            
            {/* Post Header */}
            <div className="px-4 pt-3 pb-2 flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  {profilePic ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#e4e6eb] flex items-center justify-center text-gray-500">
                      <Users size={20} />
                    </div>
                  )}
                </div>
                
                {/* Name & Time */}
                <div className="flex flex-col leading-tight mt-0.5">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-[15px] text-[#050505] hover:underline cursor-pointer">{profileName}</span>
                    {isVerified && <BadgeCheck size={14} className="text-[#0866ff] fill-[#0866ff] text-white" />}
                  </div>
                  <div className="flex items-center gap-1 text-[13px] text-[#65676b] mt-0.5">
                    <span className="hover:underline cursor-pointer">{timeText}</span>
                    <span>·</span>
                    {renderPrivacyIcon()}
                  </div>
                </div>
              </div>

              {/* Top Right Icons */}
              <div className="flex items-center gap-3 text-[#65676b] mt-1">
                <MoreHorizontal size={20} className="cursor-pointer" />
                <X size={20} className="cursor-pointer" />
              </div>
            </div>

            {/* Post Text Content */}
            <div className="px-4 pb-3 pt-1">
               <p className="text-[15px] text-[#050505] whitespace-pre-wrap leading-snug">
                 {postContent}
               </p>
            </div>

            {/* Engagement Metrics (Counts) */}
            <div className="px-4 py-2.5 flex justify-between items-center text-[13px] text-[#65676b]">
              <div className="flex items-center gap-1.5 cursor-pointer">
                {/* Blue Like Circle SVG */}
                <div className="w-[18px] h-[18px] rounded-full bg-[#0866ff] flex items-center justify-center">
                  <ThumbsUp size={10} className="text-white fill-white" style={{ transform: 'scaleX(-1)' }} />
                </div>
                <span className="hover:underline">{likes}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hover:underline cursor-pointer">{comments} comments</span>
                <span className="hover:underline cursor-pointer">{shares} shares</span>
              </div>
            </div>

            {/* Action Buttons (Like, Comment, Share) */}
            <div className="px-4 pb-1">
              <div className="border-t border-[#ced0d4] flex justify-between items-center py-1">
                <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-[#65676b] font-semibold text-[14.5px] hover:bg-[#f2f2f2] transition-colors">
                   <ThumbsUp size={18} strokeWidth={2} /> Like
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-[#65676b] font-semibold text-[14.5px] hover:bg-[#f2f2f2] transition-colors">
                   <MessageSquare size={18} strokeWidth={2} /> Comment
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-[#65676b] font-semibold text-[14.5px] hover:bg-[#f2f2f2] transition-colors">
                   <Share2 size={18} strokeWidth={2} /> Share
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}