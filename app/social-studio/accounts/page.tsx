"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import Link from "next/link";
import { 
  ArrowLeft, Search, Plus, MoreVertical, 
  RefreshCw, Unplug, CheckCircle2, AlertCircle,
  ShieldCheck, Lock, ExternalLink, X, Loader2
} from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

// Custom Facebook Icon Component
const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function ConnectedAccountsPage() {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ডামি ডেটা মুছে স্টেট একদম ফাঁকা করে দিলাম
  const [connectedPages, setConnectedPages] = useState<any[]>([]);

  useEffect(() => {
    // localStorage থেকে সেভ করা পেজগুলো লোড করছি
    const savedPages = localStorage.getItem('social_studio_connected_pages');
    if (savedPages) {
      try {
        const parsedPages = JSON.parse(savedPages);
        // ডামি পেজগুলো ফিল্টার করে চিরতরে বাদ দিয়ে দিচ্ছি
        const realPages = parsedPages.filter((p: any) => p.name !== "Digital Agro BD" && p.name !== "MockupHub Official");
        
        setConnectedPages(realPages);
        // ফিল্টার করা আসল ডেটা আবার localStorage এ সেভ করছি
        localStorage.setItem('social_studio_connected_pages', JSON.stringify(realPages));
      } catch (e) {
        console.error("Failed to parse saved pages", e);
      }
    }

    // URL থেকে ফেসবুকের নতুন পেজ রিসিভ করা
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const pageName = params.get('pageName');
    const noPages = params.get('no_pages');

    if (success === 'true' && pageName) {
      setConnectedPages(prev => {
        const exists = prev.some(p => p.name === pageName);
        if (exists) return prev;

        const updatedPages = [
          { 
            id: Date.now().toString(), 
            name: pageName, 
            image: pageName.charAt(0).toUpperCase(), 
            status: "Connected", 
            lastSync: "Just now", 
            role: "Admin" 
          },
          ...prev
        ];

        localStorage.setItem('social_studio_connected_pages', JSON.stringify(updatedPages));
        return updatedPages;
      });
      
      window.history.replaceState(null, '', '/social-studio/accounts');
    } else if (noPages === 'true') {
      alert("লগইন সফল হয়েছে, কিন্তু আপনার ফেসবুক অ্যাকাউন্টে কোনো বিজনেস পেজ পাওয়া যায়নি!");
      window.history.replaceState(null, '', '/social-studio/accounts');
    }
  }, []);

  // Real OAuth Connection Flow
  const handleFacebookConnect = () => {
    setIsConnecting(true);
    // এটি ইউজারকে সরাসরি আমাদের ব্যাকএন্ড API তে পাঠাবে, যেখান থেকে ফেসবুক লগইন ওপেন হবে
    window.location.href = '/api/facebook/login';
  };

  return (
    <div className={`min-h-screen bg-[#F4F7F9] font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-28 md:pt-32`}>
      
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/social-studio" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50 transition-all shadow-sm">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Connected Accounts
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Manage your social media profiles and page connections securely.
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100">
          <div className="w-full md:w-80 flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 focus-within:border-violet-500/50 transition-all">
            <Search size={16} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search connected pages..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 font-medium" 
            />
          </div>
          
          <button 
            onClick={() => setIsConnectModalOpen(true)}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-violet-500/30"
          >
            <Plus size={16} /> Connect New Page
          </button>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Add New Account Card */}
          <button 
            onClick={() => setIsConnectModalOpen(true)}
            className="h-[220px] rounded-[24px] border-2 border-dashed border-slate-200 hover:border-violet-400 bg-slate-50/50 hover:bg-violet-50/50 flex flex-col items-center justify-center gap-3 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 group-hover:border-violet-300 transition-all shadow-sm">
              <Plus size={24} className="text-slate-400 group-hover:text-violet-600" />
            </div>
            <span className="text-sm font-bold text-slate-600 group-hover:text-violet-700">Add Social Profile</span>
          </button>

          {/* Connected Pages Cards */}
          {connectedPages.map((page) => (
            <div key={page.id} className="h-[220px] bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between group hover:shadow-xl hover:border-slate-200 transition-all relative overflow-hidden">
              
              <div className="absolute top-0 left-0 w-full h-1 bg-[#1877F2]"></div>

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xl font-black text-slate-400 relative">
                    {page.image}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                      <FacebookIcon size={12} className="text-[#1877F2]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900 line-clamp-1" title={page.name}>{page.name}</h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">{page.role}</p>
                  </div>
                </div>
                
                <button className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</span>
                  <div className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-md ${
                    page.status === "Connected" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  }`}>
                    {page.status === "Connected" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                    {page.status}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Last Sync</span>
                  <span className="text-xs font-semibold text-slate-600">{page.lastSync}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {page.status !== "Connected" && (
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg transition-colors">
                    <RefreshCw size={14} /> Reconnect
                  </button>
                )}
                <button className={`${page.status === "Connected" ? "w-full" : "w-auto px-3"} flex items-center justify-center gap-1.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-lg transition-colors`}>
                  <Unplug size={14} /> Disconnect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OAuth Connection Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => !isConnecting && setIsConnectModalOpen(false)}
          ></div>

          <div className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
            
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500" /> Secure Connection
              </h2>
              <button 
                onClick={() => setIsConnectModalOpen(false)}
                disabled={isConnecting}
                className="text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 p-1.5 rounded-full transition-colors disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-8 text-center">
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <span className="text-white font-black text-2xl">S</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse delay-150"></div>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center">
                  <FacebookIcon size={32} className="text-[#1877F2]" />
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2">Connect Facebook Page</h3>
              <p className="text-sm font-medium text-slate-500 mb-8 max-w-xs mx-auto">
                SocialStudio requires access to publish and manage scheduled posts on your behalf.
              </p>

              <div className="space-y-3 mb-8 text-left bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex items-start gap-3 text-sm font-medium text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  We never store your Facebook password.
                </div>
                <div className="flex items-start gap-3 text-sm font-medium text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  We only access pages you explicitly select.
                </div>
                <div className="flex items-start gap-3 text-sm font-medium text-slate-600">
                  <Lock size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  Tokens are encrypted & stored securely.
                </div>
              </div>

              <button 
                onClick={handleFacebookConnect}
                disabled={isConnecting}
                className="w-full flex items-center justify-center gap-2 h-14 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#1877F2]/30 disabled:opacity-80"
              >
                {isConnecting ? (
                  <><Loader2 size={18} className="animate-spin" /> Connecting to Meta...</>
                ) : (
                  <><FacebookIcon size={18} /> Continue with Facebook</>
                )}
              </button>

              <p className="text-xs font-semibold text-slate-400 mt-5 flex items-center justify-center gap-1">
                <ExternalLink size={12} /> By connecting, you agree to Meta's Terms of Service.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}