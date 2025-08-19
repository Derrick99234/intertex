import { API_BASE_URL } from "./constants";

export async function createCategory(data: {
  name: string;
  description?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // if protected
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    next: { revalidate: 300 }, // ✅ caching for frontend
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getCategoryById(id: string) {
  const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    cache: "no-store", // get always fresh
  });

  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json();
}

export async function updateCategory(
  id: string,
  data: { name?: string; description?: string }
) {
  const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

export async function deleteCategory(id: string) {
  const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
}

// subcategories

export async function getSubCategories() {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
