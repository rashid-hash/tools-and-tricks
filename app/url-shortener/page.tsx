"use client";

import React, { useState, useEffect } from "react";
import { Noto_Sans_Bengali } from "next/font/google";
import { 
  Link as LinkIcon, BarChart3, Copy, CheckCircle2, 
  Trash2, Activity, Calendar, ArrowRight, TrendingUp
} from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"] });

interface ShortLink {
  id: string;
  originalUrl: string;
  shortUrl: string;
  slug: string;
  clicks: number;
  createdAt: string;
  timestamp: number;
}

export default function UrlShortenerDashboard() {
  const [longUrl, setLongUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-time fetch links from Firebase Firestore
  useEffect(() => {
    const q = query(collection(db, "shortened_links"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const linksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ShortLink[];
      setLinks(linksData);
    });

    return () => unsubscribe();
  }, []);

  const generateSlug = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!longUrl.trim()) return;
    setIsSubmitting(true);

    try {
      let finalUrl = longUrl;
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl;
      }

      const slug = customSlug.trim() || generateSlug();
      const shortDomain = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';
      
      const newLink = {
        originalUrl: finalUrl,
        slug: slug,
        shortUrl: `${shortDomain}/s/${slug}`,
        clicks: 0,
        createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        timestamp: Date.now()
      };

      // Save to Firestore using slug as Document ID
      await setDoc(doc(db, "shortened_links", slug), newLink);

      setLongUrl("");
      setCustomSlug("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to shorten URL. Check database permissions.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (slug: string) => {
    const isConfirm = window.confirm("Are you sure you want to delete this link?");
    if (isConfirm) {
      try {
        await deleteDoc(doc(db, "shortened_links", slug));
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <div className={`min-h-screen bg-[#F4F7F9] font-sans ${notoSansBengali.className} pb-20 pt-24 md:pt-28 text-slate-800`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <Link href="/" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors mb-4 inline-block">
              &larr; Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              Premium <span className="text-blue-600">Link Manager</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-2">
              ইউআরএল শর্ট করুন, কাস্টম এলিয়েন (Slug) তৈরি করুন এবং রিয়েল-টাইম ক্লিক ট্র্যাক করুন।
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200/60 flex-1 md:flex-none">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                <LinkIcon size={14} className="text-blue-500"/> Total Links
              </div>
              <div className="text-2xl font-black text-slate-800">{links.length}</div>
            </div>
            <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200/60 flex-1 md:flex-none">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                <BarChart3 size={14} className="text-emerald-500"/> Total Clicks
              </div>
              <div className="text-2xl font-black text-slate-800">{totalClicks}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Panel: Shortener Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 sticky top-28">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Activity size={20} className="text-blue-600" /> Create New Link
              </h2>
              
              <form onSubmit={handleShorten} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Destination URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="https://your-long-url.com/example"
                    className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Custom Slug (Optional)
                  </label>
                  <div className="flex items-center relative">
                    <span className="absolute left-4 text-slate-400 text-sm font-medium">/s/</span>
                    <input
                      type="text"
                      value={customSlug}
                      onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                      placeholder="my-custom-link"
                      className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl pl-9 pr-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!longUrl.trim() || isSubmitting}
                  className="w-full flex items-center justify-center gap-2 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:shadow-none"
                >
                  {isSubmitting ? "Saving to Cloud..." : <>Shorten URL <ArrowRight size={18} /></>}
                </button>
              </form>
            </div>
          </div>

          {/* Right Panel: Links Dashboard */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800">Cloud Links</h3>
                <span className="text-xs font-bold text-slate-500 bg-slate-200/50 px-3 py-1 rounded-full">
                  {links.length} Active
                </span>
              </div>

              {links.length === 0 ? (
                <div className="p-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <LinkIcon size={24} className="text-blue-400" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-700 mb-2">No links created yet</h4>
                  <p className="text-slate-500 text-sm max-w-sm">
                    বামপাশের ফর্মটি ব্যবহার করে আপনার প্রথম ইউআরএল শর্ট করুন এবং এখানে তার বিস্তারিত ট্র্যাকিং দেখুন।
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Short Link</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Original URL</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Clicks</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {links.map((link) => (
                        <tr key={link.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                          
                          {/* Short Link Cell */}
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <a 
                                href={link.shortUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-sm font-bold text-blue-600 hover:text-blue-700 mb-1 flex items-center gap-1.5"
                              >
                                {link.slug}
                              </a>
                              <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                                <Calendar size={12} /> {link.createdAt}
                              </div>
                            </div>
                          </td>

                          {/* Original URL Cell */}
                          <td className="px-6 py-4 max-w-[200px]">
                            <p className="text-sm text-slate-600 truncate font-medium" title={link.originalUrl}>
                              {link.originalUrl}
                            </p>
                          </td>

                          {/* Clicks Cell */}
                          <td className="px-6 py-4 text-center">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">
                              <TrendingUp size={14} /> {link.clicks}
                            </div>
                          </td>

                          {/* Actions Cell */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleCopy(link.shortUrl, link.id)}
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Copy Short URL"
                              >
                                {copiedId === link.id ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                              </button>
                              <button 
                                onClick={() => handleDelete(link.slug)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Link"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}