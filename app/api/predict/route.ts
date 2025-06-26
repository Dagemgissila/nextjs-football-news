import Prediction from "@/database/prediction.model";
import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { user, people } = await req.json();

    // Optionally add validation here

    const prediction = new Prediction({ user, people });
    await prediction.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving prediction:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
