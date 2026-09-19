import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Navbar ইমপোর্ট করা হলো

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tools&Tricks - Free Screenshot Generators",
  description: "Create WhatsApp, bKash, and Nagad mockup screenshots easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* ওয়েবসাইটের সব পেজেই এখন এটি দেখাবে */}
        <main>{children}</main>
      </body>
    </html>
  );
}