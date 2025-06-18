import React from "react";
import Navbar from "@/components/home/navigation";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="main_bg relative min-h-screen">
      <Navbar />
      {children}
    </main>
  );
};

export default RootLayout;
