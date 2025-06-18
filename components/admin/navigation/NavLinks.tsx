"use client";
import React from "react";
import { sidebarLinks } from "@/constants/sidebarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavLinks = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname == item.route;
        return (
          <Link
            href={item.route}
            key={item.route}
            className={`flex items-center justify-start text-[18px]  p-2 gap-4 ${
              isActive
                ? "bg-cyan-500 rounded-md text-white font-bold"
                : "font-medium"
            }`}
          >
            {item.icon}
            <p className="max-lg:hidden">{item.label}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
