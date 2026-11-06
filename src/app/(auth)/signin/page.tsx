"use client";

import React from "react";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const { data: resData, error } = await signIn.email({
      email: data.email as string, // required, The email address of the user.
      password: data.password as string, // required, The password of the user.
      callbackURL: "/", // go to the home page after login
    });

    if (error) {
      toast.error(error.message || "সাইন ইন করা যায়নি");
      return;
    }

    if (resData) {
      toast.success("সাইন ইন সফল হয়েছে!");
    }
  };

  // Google login
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/", // go to the home page after login
    });
  };

  // GitHub login
  const handleGithubSignIn = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/", // go to the home page after login
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">সাইন ইন</h1>
      <p className="mt-2 text-gray-600">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      {/* Card */}
      <Card className="mt-8 w-full max-w-md rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-none">
        <Card.Content className="flex flex-col gap-4">
          <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <TextField
              name="email"
              type="email"
              isRequired
              className="flex flex-col gap-1"
            >
              <Label>ইমেইল</Label>
              <Input placeholder="you@example.com" />
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              type="password"
              isRequired
              minLength={8}
              className="flex flex-col gap-1"
            >
              <Label>পাসওয়ার্ড</Label>
              <Input placeholder="কমপক্ষে ৮ অক্ষর" />
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Main button */}
            <Button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold"
            >
              সাইন ইন
            </Button>
          </Form>

          {/* "or" divider */}
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-gray-600">অথবা</span>
            <Separator className="flex-1" />
          </div>

          {/* Social buttons (design only) */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onPress={handleGoogleSignIn}
            >
              <FcGoogle size={18} />
              Google দিয়ে চালিয়ে যান
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onPress={handleGithubSignIn}
            >
              <FaGithub size={18} />
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-800">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="text-green-600 font-medium">
              সাইন আপ করুন
            </Link>
          </p>
        </Card.Content>
      </Card>

      {/* Back to home */}
      <Link href="/" className="mt-6 text-sm text-gray-600">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}