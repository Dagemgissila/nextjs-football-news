import SocialAuthForm from "@/components/forms/SocialAuthForm";
import Image from "next/image";
import React from "react";
import { Toaster } from "@/components/ui/sonner";

const LoginLlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full h-screen flex justify-center items-center bg-gray-200 dark:bg-gray-900 px-4 py-10 ">
      <section className="border shadow-sm min-w-full sm:min-w-[520px] px-4 py-10 rounded-[10px] bg-white dark:bg-slate-800 sm:px-10">
        <div className="flex justify-between items-center gap-2">
          <div className="space-y-3">
            <h1 className="font-bold text_cyan text-3xl font-serif">
              Football News
            </h1>
            <p className="font-semibold ">Read the latest football news</p>
          </div>

          <Image
            src="/images/football.avif"
            alt="Football News"
            width={50}
            height={50}
            className="object-contain rounded-full"
          />
        </div>
        {children}
        <SocialAuthForm />
        <Toaster />
      </section>
    </main>
  );
};

export default LoginLlayout;
