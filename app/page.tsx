"use client";

import Link from "next/link";
import { Sparkles, Zap, ShieldCheck, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      
      {/* --- Hero Section --- */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center mt-12 md:mt-24 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm mb-8 border border-blue-100">
          <Sparkles size={16} /> V1.0 is now live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight max-w-4xl leading-tight mb-6">
          Create Pixel-Perfect <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            UI Mockups Instantly
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-10">
          The ultimate screenshot generator tool for creators, developers, and pranksters. Generate highly realistic chat and payment receipts in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/whatsapp" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
            Try WhatsApp Tool <ArrowRight size={20} />
          </Link>
          <Link href="/bkash" className="bg-gray-100 text-gray-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center">
            Explore All Tools
          </Link>
        </div>
      </main>

      {/* --- Features Section --- */}
      <section className="bg-gray-50 py-20 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose MockupHub?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-500">Generate high-quality mockups in real-time. No waiting, no loading screens. Just type and download.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pixel Perfect</h3>
              <p className="text-gray-500">Our templates are crafted to match exact UI specifications, ensuring 100% realistic screenshots.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safe & Secure</h3>
              <p className="text-gray-500">Everything runs completely in your browser. We don't store your inputted data or generated images.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t border-gray-100 py-8 text-center bg-white">
        <p className="text-gray-400 font-medium text-sm">
          © 2026 MockupHub. Built for creators.
        </p>
      </footer>

    </div>
  );
}