"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Smartphone, Wallet, Menu, X, CreditCard, ChevronDown, Wrench, Building2, Landmark, Crop, Calculator, FileText, Coins, ThumbsUp, Plane, Type } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // টুলের লিস্ট
  const toolsLinks = [
    { name: "Unicode to Bijoy", path: "/unicode-to-bijoy", icon: <Type size={16} /> },
    { name: "Messenger Chat", path: "/messenger", icon: <MessageCircle size={16} /> },
    { name: "Flight Ticket", path: "/boarding-pass", icon: <Plane size={16} /> },
    { name: "FB Post Mockup", path: "/facebook-post", icon: <ThumbsUp size={16} /> },
    { name: "Invoice Generator", path: "/invoice-generator", icon: <FileText size={16} /> },
    { name: "EMI Calculator", path: "/emi-calculator", icon: <Coins size={16} /> },
    { name: "Photo & Sign Resizer", path: "/image-resizer", icon: <Crop size={16} /> },
    { name: "Age Calculator", path: "/age-calculator", icon: <Calculator size={16} /> },
    { name: "WhatsApp Mockup", path: "/whatsapp", icon: <MessageCircle size={16} /> },
    { name: "bKash Receipt", path: "/bkash", icon: <Smartphone size={16} /> },
    { name: "Nagad Receipt", path: "/nagad", icon: <Wallet size={16} /> },
    { name: "Rocket Receipt", path: "/rocket", icon: <CreditCard size={16} /> },
    { name: "DBBL Transfer", path: "/dbbl", icon: <Building2 size={16} /> },
    { name: "IBBL Receipt", path: "/ibbl", icon: <Landmark size={16} /> },
  ];

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-100 fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-black text-gray-800 tracking-tight flex gap-1 items-center">
                Mockup<span className="text-blue-600">Hub</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className={`font-semibold px-3 py-2 rounded-lg transition-colors ${pathname === "/" ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"}`}>
                Home
              </Link>

              {/* Tools Dropdown (Hover) */}
              <div className="relative group">
                <button className="flex items-center gap-1 font-semibold text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Wrench size={18} /> Tools <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                  <div className="p-2 flex flex-col gap-1">
                    {toolsLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.path}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          pathname === link.path ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        }`}
                      >
                        {link.icon} {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-blue-600">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
            <div className="px-4 py-4 flex flex-col gap-2">
              <Link href="/" onClick={() => setIsOpen(false)} className={`font-semibold px-4 py-3 rounded-lg ${pathname === "/" ? "bg-blue-50 text-blue-600" : "text-gray-600"}`}>
                Home
              </Link>
              
              <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Our Tools</div>
              
              {toolsLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                    pathname === link.path ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className={`${pathname === link.path ? "text-blue-600" : "text-gray-400"}`}>{link.icon}</span> 
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16"></div>
    </>
  );
}