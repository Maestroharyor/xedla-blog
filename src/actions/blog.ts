"use server";

import {
  fetchPosts,
  fetchPostBySlug,
  fetchCategoryBySlug,
  fetchCategoryById,
  fetchCategories,
  fetchPostsByCategory,
} from "@/lib/api";
import { postDatatype, categoryDatatype } from "@/types";

export async function getBlogPosts(page: number = 1, perPage: number = 9) {
  try {
    const result = await fetchPosts({ page, perPage });
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      success: false,
      error: "Failed to fetch blog posts",
      data: { posts: [], totalPosts: 0, totalPages: 0 },
    };
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const post = await fetchPostBySlug(slug);
    return {
      success: true,
      data: post,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      success: false,
      error: "Failed to fetch post",
      data: null,
    };
  }
}

export async function getCategoryPosts(
  categorySlug: string,
  page: number = 1,
  perPage: number = 10
) {
  try {
    const category = await fetchCategoryBySlug(categorySlug);
    if (!category) {
      return {
        success: false,
        error: "Category not found",
        data: { posts: [], totalPosts: 0, totalPages: 0, category: null },
      };
    }

    const result = await fetchPosts({ page, perPage, categoryId: category.id });
    return {
      success: true,
      data: {
        ...result,
        category,
      },
    };
  } catch (error) {
    console.error("Error fetching category posts:", error);
    return {
      success: false,
      error: "Failed to fetch category posts",
      data: { posts: [], totalPosts: 0, totalPages: 0, category: null },
    };
  }
}

export async function getPostsByCategory(
  categoryId: number,
  page: number = 1,
  perPage: number = 10
) {
  try {
    // Fetch category by ID
    const category = await fetchCategoryById(categoryId);
    if (!category) {
      return {
        success: false,
        error: "Category not found",
        data: { posts: [], totalPosts: 0, totalPages: 0, category: null },
      };
    }

    // Fetch posts by category ID
    const result = await fetchPostsByCategory({
      categoryId,
      page,
      perPage,
    });

    return {
      success: true,
      data: {
        ...result,
        category,
      },
    };
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return {
      success: false,
      error: "Failed to fetch posts by category",
      data: { posts: [], totalPosts: 0, totalPages: 0, category: null },
    };
  }
}

export async function searchPosts(
  query: string,
  page: number = 1,
  perPage: number = 9
) {
  try {
    const result = await fetchPosts({ page, perPage, search: query });
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error searching posts:", error);
    return {
      success: false,
      error: "Failed to search posts",
      data: { posts: [], totalPosts: 0, totalPages: 0 },
    };
  }
}

export async function getAllCategories() {
  try {
    const categories = await fetchCategories();
    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      error: "Failed to fetch categories",
      data: [],
    };
  }
}
