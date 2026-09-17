"use client";

import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Noto_Sans_Bengali } from "next/font/google";
import { Plus, Trash2, Download, FileText, Store, User, ShoppingBag } from "lucide-react";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

interface InvoiceItem {
  id: number;
  name: string;
  qty: number;
  price: number;
}

export default function InvoiceGenerator() {
  // Business Info
  const [businessName, setBusinessName] = useState("আপনার শপ/পেজের নাম");
  const [businessPhone, setBusinessPhone] = useState("01700-000000");
  
  // Customer Info
  const [customerName, setCustomerName] = useState("কাস্টমারের নাম");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [invoiceNo, setInvoiceNo] = useState("INV-" + Math.floor(1000 + Math.random() * 9000));

  // Items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, name: "প্রোডাক্টের নাম লিখুন", qty: 1, price: 500 }
  ]);

  // Financials
  const [discount, setDiscount] = useState<number>(0);
  const [deliveryCharge, setDeliveryCharge] = useState<number>(60);
  const [advancedPaid, setAdvancedPaid] = useState<number>(0);

  const previewRef = useRef<HTMLDivElement>(null);
  const themeColor = "#0f172a"; // Premium Slate Dark

  // Calculations
  const subTotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const totalAmount = subTotal - discount + deliveryCharge;
  const dueAmount = totalAmount - advancedPaid;

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), name: "", qty: 1, price: 0 }]);
  };

  const handleRemoveItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleItemChange = (id: number, field: keyof InvoiceItem, value: any) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const downloadInvoice = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, { quality: 1.0, pixelRatio: 3 });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `Invoice-${invoiceNo}.png`;
        link.click();
      } catch (error) {
        console.error("Screenshot error:", error);
        alert("ইনভয়েস তৈরি করতে সমস্যা হচ্ছে!");
      }
    }
  };

  return (
    <div className={`min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans ${notoSansBengali.className} text-gray-800 pb-20`}>
      
      <div className="max-w-6xl mx-auto mb-8 mt-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Instant <span className="text-blue-600">Cash Memo</span> Generator
        </h1>
        <p className="text-gray-500">এফ-কমার্স এবং ছোট ব্যবসার জন্য প্রফেশনাল ইনভয়েস তৈরি করুন মাত্র কয়েক সেকেন্ডে।</p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* --- Left Panel: Data Entry --- */}
        <div className="w-full lg:w-[50%] flex flex-col gap-6">
          
          {/* Business & Invoice Info */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800 border-b pb-2"><Store size={18} className="text-blue-500" /> শপ ও ইনভয়েস ইনফো</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="শপের নাম" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500" />
              <input type="text" placeholder="শপের মোবাইল নাম্বার" value={businessPhone} onChange={(e) => setBusinessPhone(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500" />
              <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500" />
              <input type="text" placeholder="Invoice No" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-gray-50" />
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800 border-b pb-2"><User size={18} className="text-blue-500" /> কাস্টমার ইনফো</h3>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="কাস্টমারের নাম" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500" />
                <input type="text" placeholder="মোবাইল নাম্বার" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500" />
              </div>
              <textarea placeholder="সম্পূর্ণ ঠিকানা" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 h-16 resize-none" />
            </div>
          </div>

          {/* Items Entry */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800 border-b pb-2"><ShoppingBag size={18} className="text-blue-500" /> প্রোডাক্ট লিস্ট</h3>
            
            <div className="flex flex-col gap-3">
              {items.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-center bg-gray-50 p-2 rounded-lg border border-gray-100">
                  <span className="text-gray-400 font-medium px-2">{index + 1}.</span>
                  <input type="text" placeholder="প্রোডাক্টের নাম" value={item.name} onChange={(e) => handleItemChange(item.id, "name", e.target.value)} className="flex-1 border p-2 rounded outline-none focus:border-blue-500" />
                  <input type="number" placeholder="Qty" value={item.qty} onChange={(e) => handleItemChange(item.id, "qty", Number(e.target.value))} className="w-16 border p-2 rounded outline-none text-center focus:border-blue-500" />
                  <input type="number" placeholder="Price" value={item.price} onChange={(e) => handleItemChange(item.id, "price", Number(e.target.value))} className="w-24 border p-2 rounded outline-none focus:border-blue-500" />
                  <button onClick={() => handleRemoveItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded transition"><Trash2 size={18}/></button>
                </div>
              ))}
              <button onClick={handleAddItem} className="mt-2 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-100 transition border border-blue-100 text-sm">
                <Plus size={16} /> আরও প্রোডাক্ট যোগ করুন
              </button>
            </div>
          </div>

          {/* Financials Setup */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-3 gap-4">
               <div>
                  <label className="text-xs font-semibold text-gray-500">ডিসকাউন্ট (৳)</label>
                  <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="w-full border p-2.5 rounded-lg outline-none mt-1" />
               </div>
               <div>
                  <label className="text-xs font-semibold text-gray-500">ডেলিভারি চার্জ (৳)</label>
                  <input type="number" value={deliveryCharge} onChange={(e) => setDeliveryCharge(Number(e.target.value))} className="w-full border p-2.5 rounded-lg outline-none mt-1" />
               </div>
               <div>
                  <label className="text-xs font-semibold text-gray-500">অগ্রিম পেমেন্ট (৳)</label>
                  <input type="number" value={advancedPaid} onChange={(e) => setAdvancedPaid(Number(e.target.value))} className="w-full border p-2.5 rounded-lg outline-none mt-1" />
               </div>
            </div>
          </div>

          <button onClick={downloadInvoice} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition flex items-center justify-center gap-2 text-lg">
            <Download size={20} /> Download Invoice
          </button>
        </div>

        {/* --- Right Panel: Live Preview --- */}
        <div className="w-full lg:w-[50%] flex justify-center sticky top-20">
          
          {/* Invoice Canvas */}
          <div ref={previewRef} className="w-full max-w-[420px] bg-white relative flex flex-col shadow-2xl overflow-hidden border border-gray-200">
            
            {/* Header Section */}
            <div className="px-6 py-8 flex flex-col items-center justify-center text-center text-white" style={{ backgroundColor: themeColor }}>
               <h1 className="text-2xl font-bold tracking-wide">{businessName}</h1>
               <p className="text-sm text-gray-300 mt-1 flex items-center gap-1.5"><Store size={14}/> {businessPhone}</p>
            </div>

            {/* Invoice Tag */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50">
               <div>
                 <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Invoice No</p>
                 <p className="font-bold text-gray-800 text-sm">{invoiceNo}</p>
               </div>
               <div className="text-right">
                 <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">Date</p>
                 <p className="font-bold text-gray-800 text-sm">{invoiceDate}</p>
               </div>
            </div>

            {/* Bill To Section */}
            <div className="px-6 py-5 border-b border-gray-100">
               <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-2">Bill To</p>
               <h3 className="font-bold text-gray-800 text-base">{customerName || "কাস্টমারের নাম"}</h3>
               {customerPhone && <p className="text-sm text-gray-600 mt-0.5">{customerPhone}</p>}
               {customerAddress && <p className="text-sm text-gray-500 mt-1 leading-snug">{customerAddress}</p>}
            </div>

            {/* Items Table */}
            <div className="px-6 py-4 flex-1">
               <div className="flex text-[11px] text-gray-400 font-semibold uppercase tracking-wider border-b border-gray-200 pb-2 mb-3">
                 <div className="flex-1">Description</div>
                 <div className="w-12 text-center">Qty</div>
                 <div className="w-20 text-right">Amount</div>
               </div>
               
               <div className="flex flex-col gap-3 min-h-[150px]">
                 {items.map((item, i) => (
                   <div key={i} className="flex text-sm">
                     <div className="flex-1 text-gray-800 font-medium pr-2">{item.name || "Item name"}</div>
                     <div className="w-12 text-center text-gray-600">{item.qty}</div>
                     <div className="w-20 text-right text-gray-800 font-semibold">৳{item.qty * item.price}</div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Calculation Section */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col gap-2 text-sm">
               <div className="flex justify-between text-gray-600">
                 <span>Subtotal</span>
                 <span className="font-semibold text-gray-800">৳{subTotal}</span>
               </div>
               {discount > 0 && (
                 <div className="flex justify-between text-red-500">
                   <span>Discount</span>
                   <span className="font-semibold">- ৳{discount}</span>
                 </div>
               )}
               <div className="flex justify-between text-gray-600">
                 <span>Delivery Charge</span>
                 <span className="font-semibold text-gray-800">+ ৳{deliveryCharge}</span>
               </div>
               
               <div className="flex justify-between items-center mt-2 pt-2 border-t border-dashed border-gray-300">
                 <span className="font-bold text-gray-800">Grand Total</span>
                 <span className="font-bold text-lg text-gray-900">৳{totalAmount}</span>
               </div>

               {advancedPaid > 0 && (
                 <div className="flex justify-between text-blue-600 mt-1">
                   <span>Advanced Paid</span>
                   <span className="font-semibold">- ৳{advancedPaid}</span>
                 </div>
               )}
            </div>

            {/* Due Amount Highlight */}
            <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
               <span className="font-semibold uppercase tracking-wider text-sm">Total Due</span>
               <span className="text-xl font-bold">৳{dueAmount > 0 ? dueAmount : 0}</span>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-white text-center border-t border-gray-100">
               <p className="text-xs text-gray-400 font-medium flex items-center justify-center gap-1">
                 <FileText size={12}/> Thank you for shopping with us!
               </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}