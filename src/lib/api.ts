import axios from "axios";
import { postDatatype, categoryDatatype } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASEURL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_BASEURL environment variable is not set");
}

// Create centralized axios instance
export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/wp-json/wp/v2`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions for fetching data
export async function fetchPosts({
  page = 1,
  perPage = 9,
  categoryId,
  search,
}: {
  page?: number;
  perPage?: number;
  categoryId?: number;
  search?: string;
} = {}) {
  const params = new URLSearchParams({
    _embed: "true",
    page: page.toString(),
    per_page: perPage.toString(),
  });

  if (categoryId) {
    params.append("categories", categoryId.toString());
  }

  if (search) {
    params.append("search", search);
  }

  const response = await apiClient.get(`/posts?${params.toString()}`);

  return {
    posts: response.data as postDatatype[],
    totalPosts: parseInt(response.headers["x-wp-total"] || "0"),
    totalPages: parseInt(response.headers["x-wp-totalpages"] || "0"),
  };
}

export async function fetchPostBySlug(slug: string) {
  const response = await apiClient.get(`/posts?slug=${slug}&_embed`);
  return response.data[0] as postDatatype;
}

export async function fetchCategories() {
  const response = await apiClient.get("/categories?_embed&per_page=100");
  return response.data as categoryDatatype[];
}

export async function fetchCategoryBySlug(slug: string) {
  const response = await apiClient.get(`/categories?slug=${slug}`);
  return response.data[0] as categoryDatatype;
}

export async function fetchPostSlugs() {
  const response = await apiClient.get("/posts?_fields=slug&per_page=100");
  return response.data.map((post: { slug: string }) => post.slug);
}

export async function fetchCategorySlugs() {
  const response = await apiClient.get("/categories?_fields=slug&per_page=100");
  return response.data.map((cat: { slug: string }) => cat.slug);
}
