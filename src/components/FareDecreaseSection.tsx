"use client";
import React, { useEffect, useState } from "react";
import { Chip } from "@heroui/react";
import { TrendingDown } from "lucide-react";
import { IProduct } from "@/types/type";
import ProductCard from "./ProductCard";

export default function FareDecreaseSection() {
  const [topDecreased, setTopDecreased] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products",
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: IProduct[] = await res.json();
        const filteredAndSorted = data
          .filter((item) => item.change.dir === "down")
          .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
          .slice(0, 6);
        setTopDecreased(filteredAndSorted);
      } catch (error) {
        console.error("Error loading fare decrease data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="w-full py-12 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-7">
          <div className="flex flex-col items-start gap-2">
            <Chip
              size="sm"
              className="px-3 py-1 h-auto rounded-full bg-[#ffe4e6] text-[#e11d48] font-bold text-xs flex items-center gap-1.5"
            >
              <TrendingDown size={14} className="shrink-0" />
              <span>সাশ্রয়ী মূল্য</span>
            </Chip>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>আজ দাম কমেছে</span>
              <span className="text-[#10b981] text-xl sm:text-2xl">▼</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              আজ যেসব পণ্যের দাম কমেছে — সাশ্রয়ী বাজার করুন (শীর্ষ ৬টি)
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="h-52 rounded-3xl bg-slate-200/60 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topDecreased.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
