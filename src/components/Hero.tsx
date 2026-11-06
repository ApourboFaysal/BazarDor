"use client";

import React, { useSyncExternalStore } from "react";
import Image from "next/image";

const subscribeNoop = () => () => {};
const getToday = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const getServerToday = () => "";
const useToday = () =>
  useSyncExternalStore(subscribeNoop, getToday, getServerToday);

export default function HeroSection() {
  const formattedDate = useToday();

  return (
    <section className="w-full bg-[#f8fafc] py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div
          className="bg-white rounded-[2rem] border border-slate-200/80 shadow-sm p-6 sm:p-10 flex flex-col 
        md:flex-row items-center justify-between gap-8"
        >
          <div className="flex-1 space-y-5 text-center md:text-left">
            <div
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-[#e8f5e9] text-[#2e7d32]
             text-xs sm:text-sm font-semibold"
            >
              {formattedDate || "\u00A0"}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <div className="pt-2">
              <a
                href="#সব-পণ্য"
                className="inline-flex h-11 items-center px-6 rounded-xl bg-[#0e7a38] hover:bg-[#0a5c2a] text-white font-bold 
                text-sm transition-colors shadow-md cursor-pointer"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end w-full max-w-[320px] md:max-w-400px">
            <Image
              src="/bazar-hero.png"
              alt="আজকের বাজারের দাম"
              width={400}
              height={300}
              className="w-full h-auto object-contain"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
