"use client";

import React from "react";
import { updateUser, useSession } from "@/lib/auth-client";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { ArrowLeft, Mail, User, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UpdateProfilePage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { data: resData, error } = await updateUser({
      name: data.name as string,
    });

    if (error) {
      toast.error(error.message || "আপডেট করা যায়নি");
    } else if (resData) {
      toast.success("প্রোফাইল আপডেট হয়েছে");
      router.push("/profile");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f8fafc] px-4 py-12">
      <div className="w-full max-w-115 flex flex-col items-center">
        <div className="w-full flex justify-start mb-6">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-xs sm:text-sm 
            font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>প্রোফাইলে ফিরে যান</span>
          </Link>
        </div>

        <div className="text-center mb-7">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            তথ্য পরিবর্তন
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2">
            আপনার প্রোফাইলের নাম পরিবর্তন করুন।
          </p>
        </div>

        <Card
          className="w-full p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 
        shadow-[0_10px_35px_rgba(15,23,42,0.04)]"
        >
          <Card.Content className="p-0">
            <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <TextField
                name="email"
                type="email"
                isReadOnly
                isDisabled
                value={session?.user?.email || ""}
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-xs sm:text-sm font-semibold text-slate-400">
                  ইমেইল (পরিবর্তনযোগ্য নয়)
                </Label>
                <div className="relative flex items-center">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-3.5 text-slate-400"
                  />
                  <Input
                    placeholder={
                      isPending ? "লোড হচ্ছে..." : "example@mail.com"
                    }
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-100/80 border border-slate-200/80 
                    text-sm text-slate-500 cursor-not-allowed focus:outline-none"
                  />
                </div>
              </TextField>

              <TextField
                key={session?.user?.name || "user-name"}
                name="name"
                type="text"
                isRequired
                defaultValue={session?.user?.name || ""}
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-xs sm:text-sm font-bold text-slate-800">
                  পূর্ণ নাম
                </Label>
                <div className="relative flex items-center">
                  <User
                    size={18}
                    className="pointer-events-none absolute left-3.5 text-slate-400"
                  />
                  <Input
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                    className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50/60 border border-slate-200 
                    text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0e7a38] focus:bg-white 
                    focus:outline-none transition-colors"
                  />
                </div>
                <FieldError className="text-xs text-red-500" />
              </TextField>

              <Button
                type="submit"
                variant="primary"
                isDisabled={isPending}
                className="w-full h-11 mt-1 rounded-xl bg-[#0e7a38] hover:bg-[#0a5c2a] 
                disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Check size={17} strokeWidth={2.5} />
                <span>তথ্য আপডেট করুন</span>
              </Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
