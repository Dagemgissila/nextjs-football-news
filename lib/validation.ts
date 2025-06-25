import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter valid email address" }),
  password: z.string().min(1, { message: "Password  field is required" }),
});

export const TagSchema = z.object({
  name: z
    .string()
    .min(3, { message: "the tag name should be at least 3 character" }),
});

export const CategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "category name should be at least 3 character" }),
  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Image is required",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image must be less than 5MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Only JPG, PNG, or WEBP images are allowed",
      }
    ),
});
