"use client";

import React, { useState } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import Link from "next/link";
import { 
  ArrowLeft, User, Bell, CreditCard, 
  ShieldCheck, Smartphone, Mail, Globe, 
  Key, LogOut, CheckCircle2, ChevronRight
} from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  return (
    <div className={`min-h-screen bg-[#F4F7F9] font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-8`}>
      
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/social-studio" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50 transition-all shadow-sm">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Settings & Preferences
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Manage your account, billing, and system preferences.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Settings Sidebar navigation */}
          <div className="w-full md:w-64 shrink-0 space-y-2">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "profile" ? "bg-violet-600 text-white shadow-md shadow-violet-500/20" : "bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:bg-violet-50"}`}
            >
              <div className="flex items-center gap-3"><User size={18} /> My Profile</div>
              {activeTab === "profile" && <ChevronRight size={16} />}
            </button>
            
            <button 
              onClick={() => setActiveTab("billing")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "billing" ? "bg-violet-600 text-white shadow-md shadow-violet-500/20" : "bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:bg-violet-50"}`}
            >
              <div className="flex items-center gap-3"><CreditCard size={18} /> Billing & Plan</div>
              {activeTab === "billing" && <ChevronRight size={16} />}
            </button>

            <button 
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "notifications" ? "bg-violet-600 text-white shadow-md shadow-violet-500/20" : "bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:bg-violet-50"}`}
            >
              <div className="flex items-center gap-3"><Bell size={18} /> Notifications</div>
              {activeTab === "notifications" && <ChevronRight size={16} />}
            </button>

            <button 
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "security" ? "bg-violet-600 text-white shadow-md shadow-violet-500/20" : "bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:bg-violet-50"}`}
            >
              <div className="flex items-center gap-3"><ShieldCheck size={18} /> Security</div>
              {activeTab === "security" && <ChevronRight size={16} />}
            </button>
          </div>

          {/* Settings Content Area */}
          <div className="flex-1 bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8 min-h-[500px]">
            
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Personal Information</h2>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-violet-100 border border-violet-200 flex items-center justify-center text-2xl font-black text-violet-600">
                    U
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-all shadow-sm">
                      Change Avatar
                    </button>
                    <p className="text-xs text-slate-400 font-medium mt-2">JPG, GIF or PNG. Max size of 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2">Full Name</label>
                    <input type="text" defaultValue="Pro User" className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-violet-500 rounded-xl px-4 text-sm font-bold text-slate-800 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2">Email Address</label>
                    <input type="email" defaultValue="user@example.com" disabled className="w-full h-12 bg-slate-100 border border-slate-200 rounded-xl px-4 text-sm font-bold text-slate-500 outline-none cursor-not-allowed" />
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="text-xs font-bold text-slate-500 block mb-2">Timezone</label>
                  <select className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-violet-500 rounded-xl px-4 text-sm font-bold text-slate-800 outline-none cursor-pointer">
                    <option>Asia/Dhaka (GMT+6)</option>
                    <option>America/New_York (GMT-5)</option>
                    <option>Europe/London (GMT+0)</option>
                  </select>
                </div>

                <button className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-violet-500/30">
                  Save Changes
                </button>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Subscription Plan</h2>
                
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white mb-8 shadow-lg shadow-indigo-500/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="px-2.5 py-1 bg-white/20 rounded-md text-xs font-black uppercase tracking-wider mb-2 inline-block">Pro Plan</span>
                      <h3 className="text-2xl font-bold">৳1,500 / month</h3>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm font-bold bg-emerald-500 text-white px-3 py-1 rounded-full border border-emerald-400 shadow-sm">
                      <CheckCircle2 size={16}/> Active
                    </span>
                  </div>
                  <p className="text-indigo-100 text-sm font-medium mb-6">Your next billing date is October 15, 2026.</p>
                  
                  <div className="flex gap-3">
                    <button className="px-5 py-2 bg-white text-indigo-600 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                      Manage Subscription
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-800 mb-4">Plan Limits (Monthly)</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                      <span>AI Credits (850 / 1000)</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-violet-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                      <span>Scheduled Posts (42 / 500)</span>
                      <span>8%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: "8%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Mail size={18}/></div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Email Notifications</h4>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">Receive post failure and billing alerts via email.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"><Smartphone size={18}/></div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Push Notifications</h4>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">Get instant browser alerts when a post is published.</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={pushNotif} onChange={() => setPushNotif(!pushNotif)} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Security & Authentication</h2>
                
                <div className="space-y-4 mb-8">
                  <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Key size={18} className="text-slate-500" />
                      <span className="text-sm font-bold text-slate-700">Change Password</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={18} className="text-slate-500" />
                      <span className="text-sm font-bold text-slate-700">Two-Factor Authentication (2FA)</span>
                    </div>
                    <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">Disabled</span>
                  </button>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-bold rounded-xl transition-all">
                    <LogOut size={16} /> Sign Out All Devices
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}