"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Avatar, Button, Dropdown, ProgressCircle, Separator } from "@heroui/react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { ICategory } from "@/types/type";
import { usePathname } from "next/navigation";
const subscribeNoop = () => () => {};
const getToday = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const getServerToday = () => "";
const useToday = () => useSyncExternalStore(subscribeNoop, getToday, getServerToday);

export default function Navbar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const formattedDate = useToday();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
        const data = await res.json();
        const categoriesArray = Array.isArray(data) ? data : data.categories || [];
        console.log("Categories loaded:", categoriesArray);
        setCategories(categoriesArray);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const { data, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3.5">
          <div className="flex flex-col gap-1">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <span className="text-2xl sm:text-3xl leading-none" role="img" aria-label="bazar">🛒</span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#0d6efd] tracking-tight">বাজার দর</span>
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span role="img" aria-label="calendar">🗓️</span>
              <span>{formattedDate || "\u00A0"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isPending ? (
              <ProgressCircle aria-label="Loading" value={60}>
                <ProgressCircle.Track>
                  <ProgressCircle.TrackCircle />
                  <ProgressCircle.FillCircle />
                </ProgressCircle.Track>
              </ProgressCircle>
            ) : data?.user.name ? (
              <Dropdown>
                <Button isIconOnly aria-label="Menu" variant="secondary">
                  <Avatar>
                    <Avatar.Image alt={data?.user.name} src={data?.user.image || "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"} />
                    <Avatar.Fallback>{data?.user.name?.[0] || "U"}</Avatar.Fallback>
                  </Avatar>
                </Button>
                <Dropdown.Popover>
                  <Dropdown.Menu onAction={(key) => console.log(key)}>
                    <Dropdown.Item id="profile" textValue="Profile">
                      <Link href="/profile">প্রোফাইল</Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="update" textValue="Update">
                      <Link href="/profile/update-profile">আপডেট প্রোফাইল</Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="logout" textValue="Logout">
                      <Button onClick={handleSignOut}>সাইন আউট</Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" className="h-9 px-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0d6efd] hover:bg-slate-50 transition-colors">
                  <Link href="/signin">সাইন ইন</Link>
                </Button>
                <Button type="button" variant="primary" className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl bg-[#0d6efd] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors">
                  <Link href="/signup">সাইন আপ</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        <Separator className="w-full bg-slate-100" />

        <nav aria-label="Category Navigation" className="flex items-center gap-5 sm:gap-8 py-2.5 overflow-x-auto no-scrollbar">
          {categories.map((cat, index) => {
            const catSlug = cat.slug || cat.id;
            const isActive = pathname === `/category/${catSlug}`;
            
            return (
              <Link
                key={cat.id || index}
                href={`/category/${catSlug}`}
                title={cat.descriptionBn || cat.nameBn}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium whitespace-nowrap py-1 transition-colors ${
                  isActive ? "text-[#0d6efd] font-semibold" : "text-slate-700 hover:text-[#0d6efd]"
                }`}
              >
                <span className="text-base leading-none">{cat.icon || "📦"}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}