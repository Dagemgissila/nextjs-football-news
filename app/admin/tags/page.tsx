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
import { Createtag } from "@/components/forms/tag/CreateTag";
import { getTags } from "@/lib/actions/tag.action";

const Page = async () => {
  const tagsResponse = await getTags();
  const { data, success } = tagsResponse;

  if (!success || !data) return <div>Failed to load tags.</div>;

  return (
    <section className="w-full px-4 py-10 bg-white dark:bg-gray-800 rounded-md">
      <div className="flex justify-between py-6">
        <Input placeholder="Search" className="no-focus min-h-10 w-[300px]" />
        <Createtag />
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.tags.map((tag, index) => (
            <TableRow key={tag._id || index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{tag.name}</TableCell>
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
