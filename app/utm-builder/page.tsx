"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Copy, CheckCircle2, Link as LinkIcon, 
  Megaphone, Target, Tag, Globe, 
  Settings2, ArrowRight
} from "lucide-react";
import Link from "next/link";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

export default function UtmBuilderTool() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Auto-generate UTM URL when inputs change
  useEffect(() => {
    if (!url.trim()) {
      setGeneratedUrl("");
      return;
    }

    try {
      // Add https:// if protocol is missing
      let baseUrl = url.trim();
      if (!/^https?:\/\//i.test(baseUrl)) {
        baseUrl = 'https://' + baseUrl;
      }

      const parsedUrl = new URL(baseUrl);
      
      if (source.trim()) parsedUrl.searchParams.set('utm_source', source.trim());
      if (medium.trim()) parsedUrl.searchParams.set('utm_medium', medium.trim());
      if (campaign.trim()) parsedUrl.searchParams.set('utm_campaign', campaign.trim());
      if (term.trim()) parsedUrl.searchParams.set('utm_term', term.trim());
      if (content.trim()) parsedUrl.searchParams.set('utm_content', content.trim());

      setGeneratedUrl(parsedUrl.toString());
    } catch (e) {
      setGeneratedUrl("Invalid URL format");
    }
  }, [url, source, medium, campaign, term, content]);

  const handleCopy = () => {
    if (!generatedUrl || generatedUrl === "Invalid URL format") return;
    navigator.clipboard.writeText(generatedUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen bg-[#F4F7F9] font-sans ${notoSansBengali.className} pb-20 pt-24 md:pt-28 text-slate-800`}>
      
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="mb-10">
          <Link href="/" className="text-sm font-bold text-slate-400 hover:text-emerald-600 transition-colors mb-4 inline-block">
            &larr; Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <Target size={24} className="text-emerald-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Campaign <span className="text-emerald-600">UTM Builder</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium mt-2 max-w-xl">
            Facebook, Google ba onnanno ad campaign-er traffic track korar jonno sohojei UTM parameter jukto link toiri korun.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Input Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              
              <div className="space-y-5">
                {/* Website URL */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-2">
                    <Globe size={14} className="text-emerald-500"/> Website URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-sm font-medium text-slate-800 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Campaign Source */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-2">
                      <Megaphone size={14} className="text-emerald-500"/> Campaign Source <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      placeholder="e.g. google, facebook, newsletter"
                      className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-sm font-medium text-slate-800 outline-none transition-all"
                    />
                  </div>

                  {/* Campaign Medium */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-2">
                      <LinkIcon size={14} className="text-emerald-500"/> Campaign Medium
                    </label>
                    <input
                      type="text"
                      value={medium}
                      onChange={(e) => setMedium(e.target.value)}
                      placeholder="e.g. cpc, banner, email"
                      className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-sm font-medium text-slate-800 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Campaign Name */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-2">
                    <Tag size={14} className="text-emerald-500"/> Campaign Name
                  </label>
                  <input
                    type="text"
                    value={campaign}
                    onChange={(e) => setCampaign(e.target.value)}
                    placeholder="e.g. summer_sale, promo_2026"
                    className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-sm font-medium text-slate-800 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Campaign Term */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-2">
                      <Settings2 size={14} className="text-emerald-500"/> Campaign Term
                    </label>
                    <input
                      type="text"
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      placeholder="e.g. running+shoes"
                      className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-sm font-medium text-slate-800 outline-none transition-all"
                    />
                  </div>

                  {/* Campaign Content */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-2">
                      <Settings2 size={14} className="text-emerald-500"/> Campaign Content
                    </label>
                    <input
                      type="text"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="e.g. logolink, textlink"
                      className="w-full h-12 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 text-sm font-medium text-slate-800 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Output & Preview */}
          <div className="lg:col-span-5">
            <div className="bg-[#0F172A] rounded-3xl p-6 shadow-xl border border-slate-700/50 sticky top-28 h-full min-h-[400px] flex flex-col">
              <h3 className="font-bold text-emerald-400 text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                <Globe size={16} /> Generated UTM Link
              </h3>
              
              <div className="flex-1">
                {generatedUrl ? (
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700 break-all text-slate-200 text-sm font-mono leading-relaxed relative group">
                    {generatedUrl}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60 min-h-[200px]">
                    <Target size={48} className="mb-4 text-slate-600" />
                    <p className="font-medium text-center text-sm px-6">
                      Website URL abong Source dile ekhane apnar trackable UTM link toiri hobe.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <button 
                  onClick={handleCopy}
                  disabled={!generatedUrl || generatedUrl === "Invalid URL format"}
                  className="w-full flex items-center justify-center gap-2 h-14 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:shadow-none"
                >
                  {isCopied ? (
                    <><CheckCircle2 size={18} /> Copied to Clipboard!</>
                  ) : (
                    <><Copy size={18} /> Copy UTM Link</>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}