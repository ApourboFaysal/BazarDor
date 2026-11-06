import CategoryProducts from "@/components/CategoryProducts";
import { ICategory, IProduct } from "@/types/type";
import Link from "next/link";
import React from "react";

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

const CategoryDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const API = "https://api.api-store.workers.dev/api/bazardor";

  // 1) products of this category (try the filter first, else filter the full list)
  const filtered = await getJson<IProduct[]>(
    `${API}/products?category=${slug}`,
  );
  let products: IProduct[] = Array.isArray(filtered) ? filtered : [];
  if (products.length === 0) {
    const all = await getJson<IProduct[]>(`${API}/products`);
    if (Array.isArray(all)) products = all.filter((p) => p.category === slug);
  }

  // 2) category info (try single endpoint, then the list, then the first product)
  let category: ICategory | null = null;
  const one = await getJson<ICategory>(`${API}/categories/${slug}`);
  if (one && one.nameBn) category = one;
  if (!category) {
    const list = await getJson<ICategory[]>(`${API}/categories`);
    if (Array.isArray(list)) {
      category =
        list.find((c) => c.slug === slug || String(c.id) === slug) ?? null;
    }
  }
  if (!category && products.length > 0) {
    category = {
      id: "",
      slug,
      nameBn: products[0].categoryNameBn,
      icon: products[0].categoryIcon,
      descriptionBn: "",
    };
  }

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-black text-slate-900">
          ক্যাটাগরি খুঁজে পাওয়া যায়নি
        </h1>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0e7a38] text-white font-bold rounded-xl text-sm"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full py-8 sm:py-10 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-5">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-sm flex items-center gap-4 sm:gap-6">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f1f5f9] 
          border border-slate-200/60 flex items-center justify-center text-3xl sm:text-4xl shrink-0"
          >
            {category.icon}
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {category.nameBn}
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#e8f5e9] text-[#0e7a38] font-bold text-xs">
                মোট পণ্য: {products.length.toLocaleString("bn-BD")}টি
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {category.descriptionBn}
            </p>
          </div>
        </div>
        <CategoryProducts products={products} />
      </div>
    </main>
  );
};

export default CategoryDetailsPage;
