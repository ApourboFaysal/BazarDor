import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] px-4 text-center">
      <span className="text-8xl mb-4">🛒</span>

      <h1 className="text-4xl font-black text-slate-900 mb-2">
        ৪০৪ - পেজটি খুঁজে পাওয়া যায়নি
      </h1>

      <p className="text-slate-500 mb-6 max-w-md">
        আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে অথবা কখনোই ছিল না।
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0e7a38] text-white
         font-bold rounded-xl shadow-md hover:bg-[#0a5c2a] transition-colors"
      >
        <Home size={18} />
        <span>হোম পেজে ফিরে যান</span>
      </Link>
    </div>
  );
}
