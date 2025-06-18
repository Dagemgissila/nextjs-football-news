import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter valid email address" }),
  password: z.string().min(1, { message: "Password  field is required" }),
});
