"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Smartphone, Wallet, Menu, X, CreditCard } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // মেনু আইটেমের লিস্ট
  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "WhatsApp", path: "/whatsapp", icon: <MessageCircle size={18} /> },
    { name: "bKash", path: "/bkash", icon: <Smartphone size={18} /> },
    { name: "Nagad", path: "/nagad", icon: <Wallet size={18} /> },
    { name: "Rocket", path: "/rocket", icon: <CreditCard size={18} /> },
    // রকেট পেজ বানালে এটি আনকমেন্ট করে দেবেন
    // { name: "Rocket", path: "/rocket", icon: <CreditCard size={18} /> }, 
  ];

  return (
    <>
      {/* গ্লোবাল নেভিগেশন বার */}
      <nav className="bg-white shadow-sm border-b border-gray-100 fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* লোগো অংশ */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-black text-gray-800 tracking-tight flex gap-1 items-center">
                Mockup<span className="text-blue-600">Hub</span>
              </Link>
            </div>

            {/* ডেস্কটপ মেনু */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    {link.icon} {link.name}
                  </Link>
                );
              })}
            </div>

            {/* মোবাইল মেনু বাটন */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* মোবাইল মেনু ড্রপডাউন */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)} // ক্লিক করলে মেনু বন্ধ হবে
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    {link.icon} {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
      
      {/* Navbar ফিক্সড থাকায় কন্টেন্ট যেন নিচে না ঢেকে যায়, তাই এই স্পেসার */}
      <div className="h-16"></div>
    </>
  );
}