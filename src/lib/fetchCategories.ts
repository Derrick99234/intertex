import { API_BASE_URL } from "./constants";

export async function createCategory(data: {
  name: string;
  description?: string;
  status?: boolean;
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
  data: { name?: string; slug?: string; description?: string; status?: boolean }
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

export async function getAllSubCategories() {
  const res = await fetch(`${API_BASE_URL}/subcategories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getSubCategories(categoryId: string) {
  const res = await fetch(
    `${API_BASE_URL}/subcategories/category/${categoryId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      next: { revalidate: 300 }, // optional caching for Next.js
    }
  );

  if (!res.ok) throw new Error("Failed to fetch subcategories");
  return res.json();
}

export async function createSubCategory(data: {
  name: string;
  category?: string;
  description?: string;
  status?: boolean;
}) {
  const res = await fetch(`${API_BASE_URL}/subcategories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
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
  const res = await fetch(`${API_BASE_URL}/subcategories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update subcategory");
  return res.json();
}

export async function deleteSubCategory(id: string) {
  const res = await fetch(`${API_BASE_URL}/subcategories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete subcategory");
  return res.json();
}

// product types

export async function getAllProductTypes() {
  const res = await fetch(`${API_BASE_URL}/types`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch product types");
  return res.json();
}

export async function getProductTypes(subcategoryId: string) {
  const res = await fetch(
    `${API_BASE_URL}/types/by-subcategory/${subcategoryId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      next: { revalidate: 300 }, // optional caching for Next.js
    }
  );

  if (!res.ok) throw new Error("Failed to fetch subcategories");
  return res.json();
}

export async function createProductType(data: {
  name: string;
  subcategory?: string;
  description?: string;
  status?: boolean;
}) {
  const res = await fetch(`${API_BASE_URL}/types`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
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
  const res = await fetch(`${API_BASE_URL}/types/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update product type");
  return res.json();
}

export async function deleteProductType(id: string) {
  const res = await fetch(`${API_BASE_URL}/types/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete product type");
  return res.json();
}
