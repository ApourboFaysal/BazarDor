"use client";

import React, { useState } from "react";
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
import { signIn, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Passwords must match
    if (data.password !== data.confirmPassword) {
      setPasswordError("পাসওয়ার্ড মিলছে না");
      toast.error("পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);

    const { data: resData, error } = await signUp.email({
      email: data.email as string, // user email address
      password: data.password as string, // user password -> min 8 characters by default
      name: data.name as string, // user display name
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন আপ করা যায়নি");
      return;
    }

    if (resData?.user.name) {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
      router.push("/signin");
    }
  };

  // Google sign up / login
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/", // go to the home page after login
    });
  };

  // GitHub sign up / login
  const handleGithubSignIn = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/", // go to the home page after login
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mt-2 text-gray-600">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      {/* Card */}
      <Card className="mt-8 w-full max-w-md rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-none">
        <Card.Content className="flex flex-col gap-4">
          <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <TextField name="name" isRequired className="flex flex-col gap-1">
              <Label>নাম</Label>
              <Input placeholder="যেমন: রহিম উদ্দিন" />
              <FieldError className="text-xs text-red-500" />
            </TextField>

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
              minLength={8}
              isRequired
              className="flex flex-col gap-1"
            >
              <Label>পাসওয়ার্ড</Label>
              <Input placeholder="কমপক্ষে ৮ অক্ষর" />
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Confirm password */}
            <TextField
              name="confirmPassword"
              type="password"
              isRequired
              isInvalid={!!passwordError}
              className="flex flex-col gap-1"
            >
              <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
              <Input placeholder="আবার লিখুন" />
              {passwordError ? (
                <span className="text-xs text-red-500">{passwordError}</span>
              ) : (
                <FieldError className="text-xs text-red-500" />
              )}
            </TextField>

            {/* Main button */}
            <Button
              type="submit"
              isDisabled={loading}
              className="w-full bg-green-600 text-white font-semibold"
            >
              {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
            </Button>
          </Form>

          {/* "or" divider */}
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-gray-600">অথবা</span>
            <Separator className="flex-1" />
          </div>

          {/* Social buttons */}
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

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-800">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="text-green-600 font-medium">
              সাইন ইন করুন
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