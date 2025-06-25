import React from "react";

async function getCategories() {
  const res = await fetch("http://localhost:3000/api/categories", {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

export default async function DashboardPage() {
  const data = await getCategories();

  return (
    <div>
      <h1>Categories</h1>
      {data?.data?.categories?.map((category: Category) => (
        <div key={category._id}>{category.name}</div>
      ))}
    </div>
  );
}
