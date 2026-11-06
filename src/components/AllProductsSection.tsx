"use client";

import React, { useEffect, useState } from "react";
import { Chip } from "@heroui/react";
import { LayoutGrid } from "lucide-react";
import ProductCard from "./ProductCard";
import { IProduct } from "@/types/type";

export default function AllProductsSection() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products",
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: IProduct[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading all products data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <section id="সব-পণ্য" className="w-full py-12 bg-[#f8fafc] scroll-mt-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-7">
          <div className="flex flex-col items-start gap-2">
            <Chip
              size="sm"
              className="px-3 py-1 h-auto rounded-full bg-green-100 text-green-800 
              font-bold text-xs flex items-center gap-1.5"
            >
              <LayoutGrid size={14} className="shrink-0" />
              <span>সকল তালিকা</span>
            </Chip>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>সব পণ্য</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              বাজার দরের সম্পূর্ণ তালিকা — এক জায়গায় সব পণ্যের আজকের দাম তুলনা
              করুন
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(9)].map((_, idx) => (
              <div
                key={idx}
                className="h-52 rounded-3xl bg-slate-200/60 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
