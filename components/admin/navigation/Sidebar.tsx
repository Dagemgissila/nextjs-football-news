import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";
import NavLinks from "./NavLinks";
import { signOut } from "@/auth";

const Sidebar = () => {
  return (
    <div
      className="custom-scrollbar sticky top-0 left-0 h-screen background-light_slate950
    flex flex-col pt-30 p-6 overflow-y-auto shadow-cyan-300 shadow-sm border-r dark:shadow-none justify-between max-sm:hidden lg:w-[266px]"
    >
      <div>
        <div className="flex flex-1 flex-col gap-6">
          <NavLinks />
        </div>
      </div>

      <div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <Button
            type="submit"
            className="base-medium flex w-fit !bg-transparent px-4 py-3"
          >
            <LogOut className="text-black dark:text-white" />
            <span className="text_cyan max-lg:hidden">Logout</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
