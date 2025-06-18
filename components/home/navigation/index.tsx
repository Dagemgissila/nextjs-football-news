import React from "react";
import { Theme } from "./Theme";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="w-full flex justify-between fixed z-10 p-6 shadow-2xl shadow-blue-200 dark:shadow-none gap-5 sm:px-12">
      <div>
        <p className="text_cyan dark:texx-white font-bold text-2xl font-sans">
          FootBall News
        </p>
      </div>

      <div className="flex gap-4">
        <Link
          href="/home"
          className="px-4 py-2 text-cyan-500 font-bold rounded-md transition-all duration-200 hover:text-white hover:bg-cyan-500 hover:shadow-lg"
        >
          Home
        </Link>
        <Link
          href="/news"
          className="px-4 py-2 text-cyan-500 font-bold rounded-md transition-all duration-200 hover:text-white hover:bg-cyan-500 hover:shadow-lg"
        >
          News
        </Link>
      </div>

      <div>
        <Theme />
      </div>
    </div>
  );
};

export default Navbar;
