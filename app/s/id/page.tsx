"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { Noto_Sans_Bengali } from "next/font/google";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "700"] });

export default function ShortLinkRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAndRedirect = async () => {
      const shortId = params.id as string;
      if (!shortId) return;

      try {
        // Firebase theke document ti khuje ber kora (slug hocche document id)
        const docRef = doc(db, "shortened_links", shortId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          
          // Click count +1 kora
          await updateDoc(docRef, {
            clicks: increment(1)
          });

          // Original URL a pathiye dewa
          window.location.href = data.originalUrl;
        } else {
          // Document na pele 404 error
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching URL from Firestore:", err);
        setError(true);
      }
    };

    fetchAndRedirect();
  }, [params]);

  if (error) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center bg-[#F4F7F9] text-slate-800 p-4 font-sans ${notoSansBengali.className}`}>
        <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-white">
          <AlertCircle size={40} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Link Not Found</h1>
        <p className="text-slate-500 font-medium mb-8 text-center max-w-md">
          The short link you are trying to access does not exist, has been deleted, or expired.
        </p>
        <button 
          onClick={() => router.push('/')} 
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-slate-900/20"
        >
          Go back to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-[#F4F7F9] text-slate-800 font-sans ${notoSansBengali.className}`}>
      <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
      <h2 className="text-xl font-bold text-slate-700">Redirecting...</h2>
      <p className="text-sm font-medium text-slate-500 mt-2">Taking you to the destination</p>
    </div>
  );
}