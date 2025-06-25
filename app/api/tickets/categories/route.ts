import Category from "@/database/category.model";
import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    await dbConnect();
    const categories = await Category.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: { categories: JSON.parse(JSON.stringify(categories)) },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
