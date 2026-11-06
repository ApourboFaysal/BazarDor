import React from "react";

export default function Loading() {
  return (
    <main className="min-h-screen w-full py-8 sm:py-10 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-5 animate-pulse">
        {/* Banner Skeleton */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-sm flex items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-200/80 shrink-0" />
          <div className="flex flex-col gap-2.5 w-full">
            <div className="h-7 w-36 bg-slate-200 rounded-lg" />
            <div className="h-4 w-56 bg-slate-200/70 rounded-md" />
          </div>
        </div>
        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-200/80 shrink-0" />
                  <div className="space-y-2">
                    <div className="h-4 w-14 bg-blue-100/70 rounded-full" />
                    <div className="h-3.5 w-20 bg-slate-200/70 rounded-md" />
                  </div>
                </div>
                <div className="h-6 w-16 bg-slate-200/80 rounded-full" />
              </div>
              <div className="space-y-2 pt-1">
                <div className="h-5 w-3/4 bg-slate-200 rounded-md" />
                <div className="h-3.5 w-1/2 bg-slate-200/70 rounded-md" />
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
                <div className="space-y-2">
                  <div className="h-3 w-28 bg-slate-200/70 rounded-md" />
                  <div className="h-6 w-36 bg-slate-200 rounded-md" />
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-200/80 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}