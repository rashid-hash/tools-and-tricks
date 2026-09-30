"use client";

import React, { useState, useEffect, useRef } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import Link from "next/link";
import { 
  ArrowLeft, Image as ImageIcon, Video, Link as LinkIcon, 
  Hash, Calendar as CalendarIcon, Clock, Sparkles, 
  Globe, MoreHorizontal, CalendarDays, Save, 
  Loader2, X, ChevronDown, Trash2
} from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

// Custom Facebook Icon
const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function CreatePostPage() {
  const [availablePages, setAvailablePages] = useState<{name: string, id: string, image?: string}[]>([]);
  const [selectedPage, setSelectedPage] = useState("");
  
  const [caption, setCaption] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  
  // Media State
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Button Action States
  const [isScheduling, setIsScheduling] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  
  // AI Modal States
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiTone, setAiTone] = useState("Professional");
  const [aiLanguage, setAiLanguage] = useState("Bengali");
  const [isGenerating, setIsGenerating] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Load Pages from LocalStorage
  useEffect(() => {
    const savedPages = localStorage.getItem('social_studio_connected_pages');
    if (savedPages) {
      try {
        const parsedPages = JSON.parse(savedPages);
        const realPages = parsedPages.filter((p: any) => p.name !== "Digital Agro BD" && p.name !== "MockupHub Official");
        
        if (realPages && realPages.length > 0) {
          setAvailablePages(realPages);
          setSelectedPage(realPages[0].name); 
        }
      } catch (error) {
        console.error("Failed to load pages for composer", error);
      }
    }
  }, []);

  const getSelectedPageImage = () => {
    const page = availablePages.find(p => p.name === selectedPage);
    return page?.image || selectedPage.charAt(0)?.toUpperCase() || "P";
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Hashtag
  const handleAddHashtag = () => {
    setCaption(prev => prev + (prev.endsWith(" ") || prev === "" ? "#" : " #"));
  };

  // Real Facebook Graph API Publish/Schedule
  const handleSchedulePost = async () => {
    if (!caption.trim() && !mediaPreview) {
      alert("Please add a caption or image to post.");
      return;
    }

    const targetPage = availablePages.find(p => p.name === selectedPage);
    if (!targetPage || !targetPage.id) {
      alert("Page ID not found. Please reconnect your page.");
      return;
    }

    let scheduledUnixTime = null;
    
    if (scheduleDate && scheduleTime) {
      const scheduleDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
      scheduledUnixTime = Math.floor(scheduleDateTime.getTime() / 1000);
      
      const currentTime = Math.floor(Date.now() / 1000);
      if (scheduledUnixTime < currentTime + 600) {
        alert("Facebook requires scheduled posts to be at least 10 minutes in the future.");
        return;
      }
    }
    
    setIsScheduling(true);
    
    try {
      const response = await fetch('/api/facebook/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          caption, 
          pageId: targetPage.id,
          scheduledUnixTime,
          mediaBase64: mediaPreview 
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert(`Error from Meta: ${data.error}`);
      } else {
        alert(`Success! Post ID: ${data.postId}`);
        
        // Save to localStorage for the Dashboard
        const newScheduledPost = {
          id: data.postId || Date.now().toString(),
          caption: caption || "Photo Post",
          pageName: targetPage.name,
          date: scheduleDate || "Today",
          time: scheduleTime || "Just Now",
          status: scheduledUnixTime ? "SCHEDULED" : "PUBLISHED"
        };
        
        const existingPosts = JSON.parse(localStorage.getItem('social_studio_scheduled_posts') || '[]');
        localStorage.setItem('social_studio_scheduled_posts', JSON.stringify([newScheduledPost, ...existingPosts]));

        setCaption("");
        setMediaPreview(null);
        setScheduleDate("");
        setScheduleTime("");
      }
    } catch (error) {
      alert("Failed to connect to the server.");
    } finally {
      setIsScheduling(false);
    }
  };

  // Handle Save Draft
  const handleSaveDraft = () => {
    if (!caption.trim() && !mediaPreview) {
      alert("Post is empty. Nothing to save!");
      return;
    }
    
    setIsSavingDraft(true);
    setTimeout(() => {
      setIsSavingDraft(false);
      alert("Draft saved successfully!");
    }, 1000);
  };

  // Handle AI Generate
  const handleGenerateAI = async () => {
    if (!aiTopic.trim()) return;
    
    setIsGenerating(true);
    abortControllerRef.current = new AbortController();

    try {
      const prompt = `You are an expert Social Media Manager. Write a highly engaging Facebook post.
      Topic: "${aiTopic}"
      Tone: ${aiTone}
      Language: ${aiLanguage}
      
      Instructions:
      1. Include a catchy hook.
      2. Provide the main content structured nicely with emojis.
      3. Add a Call to Action (CTA).
      4. Include 3-5 relevant hashtags at the end.
      5. Output ONLY the post content, no introductory text.`;

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: abortControllerRef.current.signal
      });

      const data = await res.json();
      
      if (!data.error) {
        setCaption(data.text);
        setIsAiModalOpen(false);
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        alert("Generation failed. Please try again.");
      }
    }
    setIsGenerating(false);
  };

  return (
    <div className={`min-h-screen bg-[#F4F7F9] font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-28`}>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/social-studio" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50 transition-all shadow-sm">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Create Post
              </h1>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Design, generate, and schedule your social media content.
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex gap-3">
            <button 
              onClick={handleSaveDraft}
              disabled={isSavingDraft || isScheduling}
              className="px-5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isSavingDraft ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
              {isSavingDraft ? "Saving..." : "Save Draft"}
            </button>
            <button 
              onClick={handleSchedulePost}
              disabled={isScheduling || isSavingDraft}
              className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-violet-500/30 flex items-center gap-2 disabled:opacity-50"
            >
              {isScheduling ? <Loader2 size={16} className="animate-spin" /> : <CalendarDays size={16} />} 
              {isScheduling ? "Scheduling..." : "Schedule Post"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          <div className="xl:col-span-7 space-y-6">
            
            <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8">
              
              <div className="mb-6">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                  Select Profile
                </label>
                <div className="relative">
                  <select 
                    value={selectedPage}
                    onChange={(e) => setSelectedPage(e.target.value)}
                    className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-xl pl-12 pr-10 text-sm font-bold text-slate-800 outline-none appearance-none cursor-pointer transition-all"
                  >
                    {availablePages.length > 0 ? (
                      availablePages.map((page, index) => (
                        <option key={page.id || index} value={page.name}>{page.name}</option>
                      ))
                    ) : (
                      <option value="">No pages connected</option>
                    )}
                  </select>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#1877F2]/10 rounded-full flex items-center justify-center">
                    <FacebookIcon size={14} className="text-[#1877F2]" />
                  </div>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-end mb-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Post Caption
                  </label>
                  <button 
                    onClick={() => setIsAiModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-bold rounded-lg transition-colors group"
                  >
                    <Sparkles size={14} className="group-hover:scale-110 transition-transform" /> Write with AI
                  </button>
                </div>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="What do you want to share with your audience?"
                  className="w-full h-40 bg-slate-50 border border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl p-4 text-[15px] font-medium text-slate-800 outline-none transition-all resize-none custom-scrollbar"
                />
                
                <div className="flex items-center gap-2 mt-3">
                  <input 
                    type="file" 
                    accept="image/*,video/*" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                  
                  <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors border border-transparent hover:border-violet-100" title="Add Image">
                    <ImageIcon size={20} />
                  </button>
                  <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors border border-transparent hover:border-violet-100" title="Add Video">
                    <Video size={20} />
                  </button>
                  <button onClick={() => alert("Link attachment feature coming soon!")} className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors border border-transparent hover:border-violet-100" title="Add Link">
                    <LinkIcon size={20} />
                  </button>
                  <button onClick={handleAddHashtag} className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors border border-transparent hover:border-violet-100" title="Add Hashtag">
                    <Hash size={20} />
                  </button>
                </div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-4 flex items-center gap-2">
                  <Clock size={16} className="text-slate-400" /> Scheduling
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <CalendarIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="date" 
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full h-12 bg-white border border-slate-200 focus:border-violet-500 rounded-xl pl-12 pr-4 text-sm font-bold text-slate-700 outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="time" 
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full h-12 bg-white border border-slate-200 focus:border-violet-500 rounded-xl pl-12 pr-4 text-sm font-bold text-slate-700 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="md:hidden flex gap-3">
              <button 
                onClick={handleSaveDraft}
                disabled={isSavingDraft || isScheduling}
                className="flex-1 py-3.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl shadow-sm flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {isSavingDraft ? <Loader2 size={16} className="animate-spin" /> : "Draft"}
              </button>
              <button 
                onClick={handleSchedulePost}
                disabled={isScheduling || isSavingDraft}
                className="flex-[2] py-3.5 bg-violet-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-violet-500/30 flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {isScheduling ? <Loader2 size={16} className="animate-spin" /> : "Schedule"}
              </button>
            </div>
          </div>

          <div className="xl:col-span-5">
            <div className="bg-[#0F172A] rounded-[32px] p-6 shadow-xl border border-slate-700/50 sticky top-28 min-h-[500px]">
              <h3 className="font-bold text-slate-300 text-xs uppercase tracking-wider mb-6 flex items-center gap-2">
                <Globe size={16} /> Live Facebook Preview
              </h3>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-[400px] mx-auto font-sans">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 shrink-0 uppercase">
                      {getSelectedPageImage()}
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-[#050505] leading-tight">{selectedPage || "Select a Page"}</h4>
                      <div className="flex items-center gap-1 text-[13px] text-[#65676B] mt-0.5">
                        Just now · <Globe size={12} />
                      </div>
                    </div>
                  </div>
                  <MoreHorizontal size={20} className="text-[#65676B]" />
                </div>
                
                <div className="px-4 pb-3 text-[15px] text-[#050505] whitespace-pre-wrap break-words min-h-[40px]">
                  {caption ? caption : <span className="text-slate-300 italic">Your caption will appear here...</span>}
                </div>

                {mediaPreview ? (
                  <div className="relative group">
                    <img src={mediaPreview} alt="Post Preview" className="w-full object-cover max-h-[350px]" />
                    <button 
                      onClick={() => setMediaPreview(null)}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                      title="Remove Media"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-slate-100 border-y border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2">
                    <ImageIcon size={32} className="opacity-50" />
                    <span className="text-xs font-semibold">No media attached</span>
                  </div>
                )}

                <div className="px-4 py-2 flex items-center justify-between text-[#65676B] text-[13px] font-semibold border-b border-slate-200">
                  <div className="flex items-center gap-1"><span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"><FacebookIcon size={10} className="text-white"/></span> 0</div>
                  <div>0 Comments · 0 Shares</div>
                </div>
                <div className="px-2 py-1 flex items-center justify-between">
                  <button className="flex-1 py-2 rounded-md hover:bg-slate-100 text-[#65676B] text-[15px] font-semibold flex items-center justify-center gap-2 transition-colors">
                    Like
                  </button>
                  <button className="flex-1 py-2 rounded-md hover:bg-slate-100 text-[#65676B] text-[15px] font-semibold flex items-center justify-center gap-2 transition-colors">
                    Comment
                  </button>
                  <button className="flex-1 py-2 rounded-md hover:bg-slate-100 text-[#65676B] text-[15px] font-semibold flex items-center justify-center gap-2 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {isAiModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isGenerating && setIsAiModalOpen(false)}></div>
          
          <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-violet-50/50">
              <h2 className="text-base font-bold text-violet-900 flex items-center gap-2">
                <Sparkles size={18} className="text-violet-600" /> AI Content Generator
              </h2>
              <button onClick={() => setIsAiModalOpen(false)} disabled={isGenerating} className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full transition-colors disabled:opacity-50">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Topic / Idea</label>
                <textarea
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="e.g. 5 tips for organic farming in Bangladesh..."
                  className="w-full h-24 bg-slate-50 border border-slate-200 focus:border-violet-500 rounded-xl p-4 text-sm font-medium text-slate-800 outline-none resize-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Tone</label>
                  <select 
                    value={aiTone}
                    onChange={(e) => setAiTone(e.target.value)}
                    className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-violet-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none"
                  >
                    <option value="Professional">Professional</option>
                    <option value="Friendly">Friendly</option>
                    <option value="Educational">Educational</option>
                    <option value="Marketing">Marketing / Sales</option>
                    <option value="Funny">Funny / Viral</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Language</label>
                  <select 
                    value={aiLanguage}
                    onChange={(e) => setAiLanguage(e.target.value)}
                    className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-violet-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none"
                  >
                    <option value="Bengali">Bengali</option>
                    <option value="English">English</option>
                    <option value="Banglish">Banglish</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleGenerateAI}
                disabled={!aiTopic.trim() || isGenerating}
                className="w-full flex items-center justify-center gap-2 h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg disabled:opacity-50 mt-4"
              >
                {isGenerating ? <><Loader2 size={18} className="animate-spin" /> Generating Magic...</> : <><Sparkles size={18} /> Generate Content</>}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}