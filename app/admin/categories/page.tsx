import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { CreateCategory } from "@/components/forms/Category/CreateCategory";
import { getCategories } from "@/lib/actions/category.action";
import Image from "next/image";

const Page = async () => {
  const tagsResponse = await getCategories();
  const { data, success } = tagsResponse;

  if (!success || !data) return <div>Failed to load categories.</div>;

  return (
    <section className="w-full px-4 py-10 bg-white dark:bg-gray-800 rounded-md">
      <div className="flex justify-between py-6">
        <Input placeholder="Search" className="no-focus min-h-10 w-[300px]" />
        <CreateCategory />
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>

            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.categories.map((category, index) => (
            <TableRow key={category._id || index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Image
                  src={`${category.image}`}
                  alt={category.name}
                  width={50}
                  height={50}
                />
              </TableCell>

              <TableCell>
                <button className="text-blue-500 hover:underline">Edit</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default Page;
