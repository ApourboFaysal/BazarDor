"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

// Shows a toast when a protected page sends the user to /signin
export default function LoginToast() {
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("login") === "required") {
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    }
  }, [params]);

  return null;
}
