"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  ProgressCircle,
  Separator,
} from "@heroui/react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { ICategory } from "@/types/type";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
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

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const formattedDate = useToday();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories",
        );
        const data = await res.json();
        const categoriesArray = Array.isArray(data)
          ? data
          : data.categories || [];
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
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  // Runs when a dropdown menu item is clicked
  const handleMenuAction = (key: React.Key) => {
    if (key === "profile") router.push("/profile");
    if (key === "update") router.push("/profile/update-profile");
    if (key === "logout") handleSignOut();
  };

  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3.5">
          <div className="flex flex-col gap-1">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <span
                className="text-2xl sm:text-3xl leading-none"
                role="img"
                aria-label="bazar"
              >
                🛒
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#0e7a38] tracking-tight">
                বাজার দর
              </span>
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span role="img" aria-label="calendar">
                🗓️
              </span>
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
                    <Avatar.Image
                      alt={data?.user.name}
                      src={
                        data?.user.image ||
                        "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                      }
                    />
                    <Avatar.Fallback>
                      {data?.user.name?.[0] || "U"}
                    </Avatar.Fallback>
                  </Avatar>
                </Button>
                <Dropdown.Popover>
                  <Dropdown.Menu onAction={handleMenuAction}>
                    <Dropdown.Item id="profile" textValue="Profile">
                      প্রোফাইল
                    </Dropdown.Item>
                    <Dropdown.Item id="update" textValue="Update">
                      আপডেট প্রোফাইল
                    </Dropdown.Item>
                    <Dropdown.Item id="logout" textValue="Logout">
                      সাইন আউট
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 px-3 rounded-xl text-xs sm:text-sm 
                  font-semibold text-slate-700 hover:text-[#0e7a38] hover:bg-slate-50 transition-colors"
                >
                  <Link href="/signin">সাইন ইন</Link>
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl bg-[#0e7a38] hover:bg-[#0a5c2a] text-white 
                  text-xs sm:text-sm font-semibold shadow-sm transition-colors"
                >
                  <Link href="/signup">সাইন আপ</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        <Separator className="w-full bg-slate-100" />

        <nav
          aria-label="Category Navigation"
          className="flex items-center gap-5 sm:gap-8 py-2.5 overflow-x-auto no-scrollbar"
        >
          {categories.map((cat, index) => {
            const catSlug = cat.slug || cat.id;
            const isActive = pathname === `/category/${catSlug}`;

            return (
              <Link
                key={cat.id || index}
                href={`/category/${catSlug}`}
                title={cat.descriptionBn || cat.nameBn}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium whitespace-nowrap py-1 transition-colors ${
                  isActive
                    ? "text-[#0e7a38] font-semibold"
                    : "text-slate-700 hover:text-[#0e7a38]"
                }`}
              >
                <span className="text-base leading-none">
                  {cat.icon || "📦"}
                </span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
