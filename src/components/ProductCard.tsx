"use client";

import React from "react";
import { Card, Chip, Separator } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { IProduct } from "@/types/type";
import { pctText, unitLabel, unitName } from "@/lib/unit";

export default function ProductCard({ product }: { product: IProduct }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link href={`/product/${product.slug}`} className="block h-full group">
      <Card
        className="h-full p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md 
      transition-all flex flex-col justify-between"
      >
        <Card.Content className="p-0 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center
               justify-center text-2xl shrink-0"
              >
                {product.image}
              </div>
              <div className="flex flex-col items-start gap-1">
                <Chip
                  size="sm"
                  className="px-2.5 py-0.5 h-5 rounded-full bg-[#e8f5e9] text-[#0e7a38] font-bold text-[11px]"
                >
                  {product.categoryNameBn}
                </Chip>
                <span className="text-xs text-slate-500 font-medium">
                  {unitLabel(product.unit)}
                </span>
              </div>
            </div>
            <Chip
              size="sm"
              className={`px-2.5 py-0.5 h-6 rounded-full text-xs font-bold flex items-center gap-1 border 
                ${
                  isUp
                    ? "bg-[#ecfdf5] text-[#059669] border-[#d1fae5]"
                    : isDown
                      ? "bg-[#fff1f2] text-[#e11d48] border-[#ffe4e6]"
                      : "bg-slate-100 text-slate-600 border-slate-200"
                }`}
            >
              {isUp && "▲ "}
              {isDown && "▼ "}
              {!isUp && !isDown && "— "}
              {pctText(product.change.pct)}%
            </Chip>
          </div>

          <div className="flex flex-col gap-1.5 mt-0.5">
            <h3
              className="text-lg font-extrabold text-slate-900 group-hover:text-[#0e7a38] 
            transition-colors leading-snug"
            >
              {product.nameBn}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              গতকাল: {product.yesterday.toLocaleString("bn-BD")} টাকা
            </p>
          </div>
        </Card.Content>

        <div className="mt-5">
          <Separator className="w-full bg-slate-100 mb-3.5" />
          <Card.Footer className="p-0 flex items-end justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] text-slate-400 font-medium">
                আজকের দাম
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-slate-900">
                  {product.today.toLocaleString("bn-BD")} টাকা
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  / {unitName(product.unit)}
                </span>
              </div>
            </div>
            <div
              className="w-9 h-9 rounded-full bg-slate-100/80 group-hover:bg-[#0e7a38] text-slate-500
             group-hover:text-white flex items-center justify-center transition-colors shrink-0"
            >
              <ArrowRight size={16} />
            </div>
          </Card.Footer>
        </div>
      </Card>
    </Link>
  );
}
