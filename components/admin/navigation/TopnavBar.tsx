import { Theme } from "@/components/home/navigation/Theme";
import { Input } from "@/components/ui/input";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const TopnavBar = () => {
  return (
    <div className="w-full background-light_slate950 fixed z-50 p-6 sm:px-12">
      <div className="flex justify-between items-center gap-6">
        <p className="text_cyan dark:texx-white font-bold text-2xl font-sans ">
          FootBall News
        </p>
        <div className="relative w-full max-w-[600px] max-lg:hidden">
          <Input
            placeholder="Search ..."
            className="paragraph-regular bg-gray-100 dark:bg-gray-900 min-h-[50px] no-focus shadow-none"
          />
        </div>

        <div className="flex gap-6 items-center justify-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Theme />
        </div>
      </div>
    </div>
  );
};

export default TopnavBar;
