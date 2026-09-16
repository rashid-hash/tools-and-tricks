"use client";

import Link from "next/link";
import { MessageCircle, Smartphone, Wallet, CreditCard, ArrowRight } from "lucide-react";

export default function HomePage() {
  // টুলের লিস্ট (ভবিষ্যতে আরও টুল আসলে এখানে অ্যাড করা যাবে)
  const tools = [
    {
      id: "whatsapp",
      name: "WhatsApp Mockup",
      description: "Create realistic WhatsApp chat screenshots with custom messages.",
      icon: <MessageCircle size={32} className="text-white" />,
      color: "bg-green-500",
      link: "/whatsapp",
    },
    {
      id: "bkash",
      name: "bKash Screenshot",
      description: "Generate bKash send money or payment mockup receipts easily.",
      icon: <Smartphone size={32} className="text-white" />,
      color: "bg-pink-600",
      link: "/bkash", // এই পেজগুলো আমরা পরে বানাবো
    },
    {
      id: "nagad",
      name: "Nagad Screenshot",
      description: "Create fake Nagad transaction UI for design and testing.",
      icon: <Wallet size={32} className="text-white" />,
      color: "bg-orange-500",
      link: "/nagad",
    },
    {
      id: "rocket",
      name: "Rocket Screenshot",
      description: "Generate Dutch-Bangla Rocket transaction mockups instantly.",
      icon: <CreditCard size={32} className="text-white" />,
      color: "bg-purple-600",
      link: "/rocket",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* --- Hero Section --- */}
      <header className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Free Mockup Generators
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create highly realistic UI screenshots for chat apps, mobile banking, and more. Select a tool below to get started!
        </p>
      </header>

      {/* --- Tools Grid --- */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link href={tool.link} key={tool.id}>
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 group cursor-pointer h-full flex flex-col">
                
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md ${tool.color}`}>
                  {tool.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                
                <p className="text-gray-500 text-sm mb-6 flex-1">
                  {tool.description}
                </p>
                
                <div className="flex items-center text-blue-600 font-semibold text-sm gap-2">
                  Use Tool <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="text-center py-8 text-gray-400 text-sm">
        <p>© 2026 MockupHub. Generated for testing and entertainment purposes only.</p>
      </footer>
    </div>
  );
}