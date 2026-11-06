"use client";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Chip } from "@heroui/react";
import Link from "next/link";
import { IProduct } from "@/types/type";
import { pctText, unitName } from "@/lib/unit";

export default function Marque() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products",
        );
        const data = await res.json();
        setProducts(data.slice(0, 10));
      } catch (error) {
        console.error(error);
      }
    };
    fetchTickerData();
  }, []);
  if (products.length === 0) return null;
  return (
    <div className="w-full bg-white text-slate-900 flex items-center h-11 overflow-hidden border-b border-slate-200">
      <Marquee pauseOnHover={true} speed={45} gradient={false}>
        {products.map((item) => {
          const isUp = item.change.dir === "up";
          const isDown = item.change.dir === "down";
          return (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="flex items-center gap-2 mx-3 px-3 py-1 rounded-lg hover:bg-slate-100 whitespace-nowrap text-xs sm:text-sm"
            >
              <span className="text-base leading-none">{item.image}</span>
              <span className="font-bold text-slate-900">{item.nameBn}</span>
              <span className="font-bold text-slate-600">
                {item.today.toLocaleString("bn-BD")} টাকা/{unitName(item.unit)}
              </span>
              <Chip
                size="sm"
                className={`px-2 py-0.5 h-5 rounded-full text-[11px] font-bold flex items-center gap-0.5 ${isUp ? "bg-[#d1fae5] text-[#059669]" : isDown ? "bg-[#ffe4e6] text-[#e11d48]" : "bg-slate-200 text-slate-700"}`}
              >
                {isUp && "▲ "}
                {isDown && "▼ "}
                {!isUp && !isDown && "— "}
                {pctText(item.change.pct)}%
              </Chip>
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
}
