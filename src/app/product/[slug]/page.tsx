import React from "react";
import Link from "next/link";
import { Card } from "@heroui/react";
import { Home, ChevronRight } from "lucide-react";

const ProductDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  let product: any = null;

  try {
    let res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${slug}`, { cache: "no-store" });
    let data = await res.json();

    if (data && !data.id && data.product) data = data.product;

    if (!data || !data.id) {
      const allRes = await fetch("https://api.api-store.workers.dev/api/bazardor/products", { cache: "no-store" });
      const allProducts = await allRes.json();
      const found = allProducts.find((p: any) => p.slug === slug || p.id.toString() === slug);
      if (found) data = found;
    }

    if (data && data.id) product = data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <span className="text-6xl block">🛒</span>
        <h1 className="text-2xl font-black text-slate-900">পণ্য খুঁজে পাওয়া যায়নি</h1>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm">
          <Home className="w-5 h-5" /> হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const apiMarkets = product.markets || [];

  let globalMin = Infinity;
  let globalMax = -Infinity;
  let totalMin = 0;
  let totalMax = 0;

  apiMarkets.forEach((m: any) => {
    const minVal = m.min || 0;
    const maxVal = m.max || 0;
    
    if (minVal < globalMin) globalMin = minVal;
    if (maxVal > globalMax) globalMax = maxVal;
    
    totalMin += minVal;
    totalMax += maxVal;
  });

  if (apiMarkets.length === 0) {
    globalMin = product.today;
    globalMax = product.today;
    totalMin = product.today;
    totalMax = product.today;
  }

  const globalAvg = apiMarkets.length > 0 
    ? Math.round((totalMin + totalMax) / (apiMarkets.length * 2)) 
    : product.today;

  return (
    <main className="min-h-screen w-full py-6 sm:py-10 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
          <Link href="/" className="flex items-center gap-1 hover:text-blue-600"><Home size={14} /> হোম</Link>
          <ChevronRight size={14} />
          <Link href={`/category/${product.category}`} className="flex items-center gap-1 hover:text-blue-600">
            <span>{product.categoryIcon || "📦"}</span>
            <span>{product.categoryNameBn}</span>
          </Link>
          <ChevronRight size={14} />
          <span className="font-bold text-slate-900">{product.nameBn}</span>
        </div>

        <Card className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm">
          <Card.Content className="p-0 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-3xl shrink-0">
                {product.image || "🛒"}
              </div>
              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{product.nameBn}</h1>
                <p className="text-xs text-slate-500 font-medium">{product.unitNameBn || "প্রতি কেজি"}</p>
                <p className="text-xs text-slate-500 mt-2">পণ্যটির সম্ভাব্য আজকের বাজার দর।</p>
              </div>
            </div>
            <div className="flex flex-col md:items-end bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 min-w-150px">
              <span className="text-[11px] font-bold text-slate-400 uppercase">আজকের গড় দাম</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-black text-slate-800">{product.today?.toLocaleString("bn-BD") || "০"}</span>
                <span className="text-xs font-bold text-slate-500">টাকা / {product.unitNameBn || "কেজি"}</span>
              </div>
              <span className={`text-xs font-bold mt-1 ${product.change?.dir === "up" ? "text-rose-600" : product.change?.dir === "down" ? "text-emerald-600" : "text-slate-500"}`}>
                {product.change?.dir === "up" ? "▲" : product.change?.dir === "down" ? "▼" : "—"} {Math.abs(product.change?.pct || 0).toLocaleString("bn-BD")}%
              </span>
            </div>
          </Card.Content>
        </Card>


        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-800 ml-1">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white border border-slate-200 rounded-2xl p-4 shadow-none relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400"></div>
              <Card.Title className="text-xs font-bold text-slate-500 mb-1">সর্বনিম্ন দাম</Card.Title>
              <Card.Content className="p-0 text-2xl font-black text-emerald-600">{globalMin.toLocaleString("bn-BD")} টাকা</Card.Content>
              <Card.Footer className="p-0 mt-1 text-[11px] text-slate-400">সবচেয়ে কম দামের বাজার</Card.Footer>
            </Card>

            <Card className="bg-white border border-slate-200 rounded-2xl p-4 shadow-none relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-rose-400"></div>
              <Card.Title className="text-xs font-bold text-slate-500 mb-1">সর্বোচ্চ দাম</Card.Title>
              <Card.Content className="p-0 text-2xl font-black text-rose-600">{globalMax.toLocaleString("bn-BD")} টাকা</Card.Content>
              <Card.Footer className="p-0 mt-1 text-[11px] text-slate-400">সবচেয়ে বেশি দামের বাজার</Card.Footer>
            </Card>

            <Card className="bg-white border border-slate-200 rounded-2xl p-4 shadow-none relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-400"></div>
              <Card.Title className="text-xs font-bold text-slate-500 mb-1">গড় দাম</Card.Title>
              <Card.Content className="p-0 text-2xl font-black text-blue-600">{globalAvg.toLocaleString("bn-BD")} টাকা</Card.Content>
              <Card.Footer className="p-0 mt-1 text-[11px] text-slate-400">সকল বাজারের গড় হিসাব</Card.Footer>
            </Card>
          </div>
        </div>
        <Card className="bg-white rounded-3xl border border-slate-200/80 p-0 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-800">বাজারভিত্তিক আজকের দাম</h2>
          </div>
          
          {apiMarkets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-600px">
                <thead>
                  <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-500">
                    <th className="py-3 px-5 border-b border-slate-100">বাজার</th>
                    <th className="py-3 px-5 border-b border-slate-100">বিভাগ</th>
                    <th className="py-3 px-5 border-b border-slate-100 text-center">সর্বনিম্ন</th>
                    <th className="py-3 px-5 border-b border-slate-100 text-center">সর্বোচ্চ</th>
                    <th className="py-3 px-5 border-b border-slate-100 text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                  {apiMarkets.map((m: any, idx: number) => {
                    const mMin = m.min || 0;
                    const mMax = m.max || 0;
                    const mAvg = Math.round((mMin + mMax) / 2); 

                    return (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-5 font-semibold">{m.market || "অজানা বাজার"}</td>
                        <td className="py-3 px-5 text-slate-500">{m.division || "বাংলাদেশ"}</td>
                        <td className="py-3 px-5 text-center">{mMin.toLocaleString("bn-BD")} টাকা</td>
                        <td className="py-3 px-5 text-center">{mMax.toLocaleString("bn-BD")} টাকা</td>
                        <td className="py-3 px-5 text-right font-bold">{mAvg.toLocaleString("bn-BD")} টাকা</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-sm">
              এই পণ্যের জন্য বাজারভিত্তিক কোনো ডাটা পাওয়া যায়নি।
            </div>
          )}
        </Card>

        <div className="text-center pt-4">
          <p className="text-xs text-slate-400">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

      </div>
    </main>
  );
};

export default ProductDetailsPage;