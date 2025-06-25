"use server";
import Category, { ICategory } from "@/database/category.model";
import action from "../handlers/action";
import { CategorySchema } from "../validation";
import handleError from "../handlers/error";
import { writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
export async function createCategory(
  formData: FormData
): Promise<ActionResponse<ICategory>> {
  const name = formData.get("name");
  const image = formData.get("image") as File;

  if (typeof name !== "string" || !(image instanceof File)) {
    return {
      success: false,
      status: 400,
      error: {
        message: "Invalid form submission",
        details: {
          ...(typeof name !== "string" && { name: ["Name is required"] }),
          ...(image instanceof File === false && {
            image: ["Image is required"],
          }),
        },
      },
    };
  }

  const validationResult = await action({
    params: { name, image },
    schema: CategorySchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    // Save image locally (you can upload to S3, Cloudinary instead if needed)
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const fileName = `${Date.now()}-${image.name}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    // Create Category in DB
    const category = await Category.create({
      name,
      image: `/uploads/${fileName}`,
    });

    // Optionally revalidate path
    revalidatePath("/admin/categories");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(category)),
      status: 201,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getCategories(): Promise<
  ActionResponse<{ categories: Category[] }>
> {
  const validationResult = await action({
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return {
      success: true,
      data: { categories: JSON.parse(JSON.stringify(categories)) },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
