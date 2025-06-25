"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCategory } from "@/lib/actions/category.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";
export function CreateCategory() {
  const [open, setOpen] = useState(false);

  const CategorySchema = z.object({
    name: z.string().min(1, { message: "Category name is required" }),
    image: z.custom<File>((file) => file instanceof File, {
      message: "Image is required and must be a valid file",
    }),
  });

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      image: undefined as unknown as File, // ✅ safely force the type
    },
  });

  async function onSubmit(values: z.infer<typeof CategorySchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image);

    const result = await createCategory(formData);
    if (result.success) {
      toast.success("Success", {
        description: "Tag created successfully",
      });
      form.clearErrors();
      form.reset();
      setOpen(false);
    } else {
      const details = result.error?.details;

      if (details) {
        // Loop through all field errors
        Object.entries(details).forEach(([field, messages]) => {
          if (messages && messages.length > 0) {
            form.setError(field as keyof z.infer<typeof CategorySchema>, {
              type: "manual",
              message: messages[0],
            });
          }
        });
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-cyan-500 dark:text-white font-bold hover:bg-cyan-500 cursor-pointer rounded-sm ">
          Create Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text_cyan font-bold">
            Create Category
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-10"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name"
                      {...field}
                      className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
