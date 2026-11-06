import React from "react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="flex items-center gap-2 w-fit mx-auto sm:mx-0"
            >
              <span className="text-2xl">🛒</span>
              <span className="text-lg font-extrabold text-[#0e7a38]">
                বাজার দর
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-400 font-medium max-w-xs">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
}
