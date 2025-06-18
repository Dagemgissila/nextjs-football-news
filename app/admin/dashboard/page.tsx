import { auth } from "@/auth";
import React from "react";

const page = async () => {
  const session = await auth();
  console.log("users", session);
  return <div>this is dashboard</div>;
};

export default page;
