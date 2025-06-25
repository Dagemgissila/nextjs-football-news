import React from "react";
import Sidebar from "@/components/admin/navigation/Sidebar";
import TopnavBar from "@/components/admin/navigation/TopnavBar";
import { Toaster } from "sonner";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-gray100_gray700 relative ">
      <TopnavBar />

      <div className="flex">
        <Sidebar />

        <section className="flex min-h-screen flex-1 px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <Toaster position="top-right" />

          <div className="mx-auto w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
