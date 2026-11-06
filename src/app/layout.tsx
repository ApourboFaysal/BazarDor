import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Marque from "@/components/Marque";
import Footer from "@/components/Footer";
import LoginToast from "@/components/LoginToast";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description:
    "বাংলাদেশের বিভিন্ন বাজারের সবজি, মাছ, মাংস, চাল ও অন্যান্য পণ্যের আজকের দাম তুলনা করুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <Marque />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
        <Suspense fallback={null}>
          <LoginToast />
        </Suspense>
      </body>
    </html>
  );
}
