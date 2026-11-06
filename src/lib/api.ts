import { ICategory, IProduct } from "@/types/type";

// lib/api.ts
const API_URL = "https://api.api-store.workers.dev/api/bazardor";

export const fetchAllProducts = async (): Promise<IProduct[]> => {
  const res = await fetch(`${API_URL}/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const fetchSingleProduct = async (slug: string): Promise<IProduct> => {
  const res = await fetch(`${API_URL}/products/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Product not found");
  return res.json();
};

export const fetchCategories = async (): Promise<ICategory[]> => {
  const res = await fetch(`${API_URL}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const fetchCategoryProducts = async (slug: string): Promise<IProduct[]> => {
  const res = await fetch(`${API_URL}/products?category=${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch category products");
  return res.json();
};