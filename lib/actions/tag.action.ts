"use server";

import Tag, { ITag } from "@/database/tag.model";
import action from "../handlers/action";
import { TagSchema } from "../validation";
import dbConnect from "../mongoose";
import handleError from "../handlers/error";
import { revalidatePath } from "next/cache";

export async function createTag(
  params: createTagParams
): Promise<ActionResponse<ITag>> {
  const validationResult = await action({
    params,
    schema: TagSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name } = validationResult.params!;
  const existingTag = await Tag.findOne({ name });

  if (existingTag) {
    return {
      success: false,
      error: {
        message: "Tag name already exists.",
        details: {
          name: ["This tag name is already taken."],
        },
      },
      status: 400,
    };
  }
  try {
    await dbConnect();
    const tag = await Tag.create({ name });

    revalidatePath("/admin/tags");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(tag)),
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getTags(): Promise<ActionResponse<{ tags: Tag[] }>> {
  const validationResult = await action({
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  try {
    const tags = await Tag.find().sort({ createdAt: -1 });

    return {
      success: true,
      data: {
        tags: JSON.parse(JSON.stringify(tags)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
