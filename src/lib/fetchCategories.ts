import { API_BASE_URL } from "./constants";
import { authFetch } from "./auth-fetch";

export async function createCategory(data: {
  name: string;
  description?: string;
  status?: boolean;
}) {
  const res = await authFetch("/categories", {
    refreshPath: "/admin/refresh",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function getCategories() {
  const res = await authFetch("/categories", {
    refreshPath: "/admin/refresh",
    method: "GET",
    next: { revalidate: 300 }, // ✅ caching for frontend
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getCategoryById(id: string) {
  const res = await authFetch(`/categories/${id}`, {
    refreshPath: "/admin/refresh",
    method: "GET",
    cache: "no-store", // get always fresh
  });

  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json();
}

export async function updateCategory(
  id: string,
  data: { name?: string; slug?: string; description?: string; status?: boolean }
) {
  const res = await authFetch(`/categories/${id}`, {
    refreshPath: "/admin/refresh",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

export async function deleteCategory(id: string) {
  const res = await authFetch(`/categories/${id}`, {
    refreshPath: "/admin/refresh",
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
}

// subcategories

export async function getAllSubCategories() {
  const res = await authFetch("/subcategories", {
    refreshPath: "/admin/refresh",
    method: "GET",
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getSubCategories(categoryId: string) {
  const res = await authFetch(`/subcategories/category/${categoryId}`, {
    refreshPath: "/admin/refresh",
    method: "GET",
    next: { revalidate: 300 }, // optional caching for Next.js
  });

  if (!res.ok) throw new Error("Failed to fetch subcategories");
  return res.json();
}

export async function createSubCategory(data: {
  name: string;
  category?: string;
  description?: string;
  status?: boolean;
}) {
  const res = await authFetch("/subcategories", {
    refreshPath: "/admin/refresh",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create subcategory");
  return res.json();
}

export async function updateSubCategory(
  id: string,
  data: { name?: string; slug?: string; description?: string; status?: boolean }
) {
  const res = await authFetch(`/subcategories/${id}`, {
    refreshPath: "/admin/refresh",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update subcategory");
  return res.json();
}

export async function deleteSubCategory(id: string) {
  const res = await authFetch(`/subcategories/${id}`, {
    refreshPath: "/admin/refresh",
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete subcategory");
  return res.json();
}

// product types

export async function getAllProductTypes() {
  const res = await authFetch("/types", {
    refreshPath: "/admin/refresh",
    method: "GET",
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch product types");
  return res.json();
}

export async function getProductTypes(subcategoryId: string) {
  const res = await authFetch(`/types/by-subcategory/${subcategoryId}`, {
    refreshPath: "/admin/refresh",
    method: "GET",
    next: { revalidate: 300 }, // optional caching for Next.js
  });

  if (!res.ok) throw new Error("Failed to fetch subcategories");
  return res.json();
}

export async function createProductType(data: {
  name: string;
  subcategory?: string;
  description?: string;
  status?: boolean;
}) {
  const res = await authFetch("/types", {
    refreshPath: "/admin/refresh",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create product type");
  return res.json();
}

export async function updateProductType(
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    status?: boolean;
    subcategory?: string;
  }
) {
  const res = await authFetch(`/types/${id}`, {
    refreshPath: "/admin/refresh",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update product type");
  return res.json();
}

export async function deleteProductType(id: string) {
  const res = await authFetch(`/types/${id}`, {
    refreshPath: "/admin/refresh",
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product type");
  return res.json();
}
