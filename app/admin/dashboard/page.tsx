import { auth } from "@/auth";
import dbConnect from "@/lib/mongoose";
import React from "react";

const page = async () => {
  const session = await auth();
  console.log("users", session);
  const db = await dbConnect();
  console.log(db);
  return <div>this is dashboard</div>;
};

export default page;
