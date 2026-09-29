"use client";

import React, { useState } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import Link from "next/link";
import { 
  ArrowLeft, Repeat, Plus, Play, Pause, 
  Settings2, Trash2, CalendarClock, Zap,
  Clock, CheckCircle2, ChevronRight, X, Loader2
} from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

// Custom Facebook Icon
const FacebookIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function AutomationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form States
  const [ruleName, setRuleName] = useState("");
  const [frequency, setFrequency] = useState("Every Friday");
  const [time, setTime] = useState("19:00");
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState("Digital Agro BD");

  // Mock Active Automations
  const [automations, setAutomations] = useState([
    { 
      id: 1, 
      name: "Weekly Agro Tips", 
      frequency: "Every Friday", 
      time: "07:00 PM", 
      topic: "Agriculture tips and farming hacks", 
      platform: "Digital Agro BD", 
      status: "Active",
      nextRun: "Tomorrow, 07:00 PM"
    },
    { 
      id: 2, 
      name: "Daily Motivation", 
      frequency: "Every Day", 
      time: "08:00 AM", 
      topic: "Motivational quotes for small business", 
      platform: "MockupHub Official", 
      status: "Paused",
      nextRun: "-"
    }
  ]);

  const handleSaveAutomation = () => {
    setIsSaving(true);
    setTimeout(() => {
      const newRule = {
        id: Date.now(),
        name: ruleName || "New Automation",
        frequency: frequency,
        time: time,
        topic: topic,
        platform: page,
        status: "Active",
        nextRun: `Next ${frequency}, ${time}`
      };
      setAutomations([newRule, ...automations]);
      setIsSaving(false);
      setIsModalOpen(false);
      
      // Reset Form
      setRuleName(""); setTopic("");
    }, 1500);
  };

  const toggleStatus = (id: number) => {
    setAutomations(automations.map(auto => {
      if (auto.id === id) {
        return { ...auto, status: auto.status === "Active" ? "Paused" : "Active" };
      }
      return auto;
    }));
  };

  const deleteRule = (id: number) => {
    setAutomations(automations.filter(auto => auto.id !== id));
  };

  return (
    <div className={`min-h-screen bg-[#F4F7F9] font-sans ${notoSansBengali.className} text-slate-800 pb-20 pt-28`}>
      
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/social-studio" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-violet-600 hover:border-violet-200 hover:bg-violet-50 transition-all shadow-sm">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Automation Rules
                </h1>
                <span className="px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider rounded-md">PRO</span>
              </div>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Set it and forget it. Let AI generate and publish content on autopilot.
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Create Rule
          </button>
        </div>

        {/* Automations List */}
        <div className="space-y-6">
          {automations.length === 0 ? (
             <div className="bg-white rounded-[24px] p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center justify-center text-center">
               <div className="w-20 h-20 bg-violet-50 rounded-full flex items-center justify-center mb-4">
                 <Repeat size={32} className="text-violet-400" />
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">No active automations</h3>
               <p className="text-slate-500 text-sm max-w-md mx-auto">
                 You haven't set up any recurring rules yet. Create your first rule to automate your social media pipeline.
               </p>
             </div>
          ) : (
            automations.map((auto) => (
              <div key={auto.id} className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col lg:flex-row gap-6 lg:items-center justify-between group hover:border-violet-200 transition-colors">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-lg font-bold text-slate-900">{auto.name}</h2>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      auto.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                    }`}>
                      {auto.status}
                    </span>
                  </div>

                  {/* Logical Pipeline UI */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 text-sm font-semibold text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-400 uppercase">IF</span>
                      <CalendarClock size={16} className="text-violet-500"/> {auto.frequency} at {auto.time}
                    </div>
                    <ChevronRight size={14} className="text-slate-300 hidden md:block" />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-400 uppercase">THEN</span>
                      <Zap size={16} className="text-amber-500"/> AI Post: <span className="font-normal truncate max-w-[150px]" title={auto.topic}>{auto.topic}</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 hidden md:block" />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-400 uppercase">TO</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100">
                        <FacebookIcon size={12}/> {auto.platform}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 lg:border-l lg:border-slate-100 lg:pl-6 shrink-0">
                  <div className="hidden sm:block text-right mr-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Next Run</p>
                    <p className="text-sm font-bold text-slate-700">{auto.nextRun}</p>
                  </div>
                  
                  <button 
                    onClick={() => toggleStatus(auto.id)}
                    className={`p-3 rounded-xl transition-all shadow-sm ${
                      auto.status === "Active" 
                        ? "bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200" 
                        : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200"
                    }`}
                    title={auto.status === "Active" ? "Pause Automation" : "Resume Automation"}
                  >
                    {auto.status === "Active" ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-colors shadow-sm">
                    <Settings2 size={18} />
                  </button>
                  <button onClick={() => deleteRule(auto.id)} className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 rounded-xl transition-colors shadow-sm">
                    <Trash2 size={18} />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>

      {/* Create Automation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isSaving && setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Repeat size={18} className="text-violet-600" /> Create Automation Rule
              </h2>
              <button onClick={() => setIsModalOpen(false)} disabled={isSaving} className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full transition-colors disabled:opacity-50">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-6">
              
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Rule Name</label>
                <input
                  type="text"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  placeholder="e.g. Daily Motivation Post"
                  className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-violet-500 rounded-xl px-4 text-sm font-bold text-slate-800 outline-none transition-all"
                />
              </div>

              <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 space-y-5 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500"></div>
                
                {/* Condition: IF */}
                <div>
                  <span className="inline-block px-2 py-1 bg-violet-100 text-violet-700 text-xs font-black uppercase tracking-wider rounded mb-3">1. When (Trigger)</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-1.5">Frequency</label>
                      <select 
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full h-12 bg-white border border-slate-200 focus:border-violet-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
                      >
                        <option value="Every Day">Every Day</option>
                        <option value="Every Monday">Every Monday</option>
                        <option value="Every Friday">Every Friday</option>
                        <option value="Weekends (Sat-Sun)">Weekends (Sat-Sun)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-1.5">Time</label>
                      <div className="relative">
                        <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="time" 
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full h-12 bg-white border border-slate-200 focus:border-violet-500 rounded-xl pl-9 pr-4 text-sm font-bold text-slate-700 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Condition: THEN */}
                <div className="pt-5 border-t border-slate-200">
                  <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 text-xs font-black uppercase tracking-wider rounded mb-3 flex items-center gap-1 w-max">
                    <Zap size={12}/> 2. Do This (Action)
                  </span>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5">Generate AI Post About:</label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Describe what the AI should write about every time this rule runs..."
                    className="w-full h-20 bg-white border border-slate-200 focus:border-violet-500 rounded-xl p-4 text-sm font-medium text-slate-800 outline-none resize-none transition-all"
                  />
                </div>

                {/* Condition: TO */}
                <div className="pt-5 border-t border-slate-200">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-wider rounded mb-3 flex items-center gap-1 w-max">
                    <FacebookIcon size={12}/> 3. Publish To
                  </span>
                  <select 
                    value={page}
                    onChange={(e) => setPage(e.target.value)}
                    className="w-full h-12 bg-white border border-slate-200 focus:border-violet-500 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="Digital Agro BD">Digital Agro BD</option>
                    <option value="MockupHub Official">MockupHub Official</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                disabled={isSaving}
                className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-bold rounded-xl transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveAutomation}
                disabled={!topic.trim() || isSaving}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-violet-500/30 disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving ? <><Loader2 size={16} className="animate-spin" /> Saving Rule...</> : <><CheckCircle2 size={16} /> Save & Activate</>}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}