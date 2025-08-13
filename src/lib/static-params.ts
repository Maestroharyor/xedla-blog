import { fetchPostSlugs, fetchCategorySlugs } from "./api";

export async function generatePostStaticParams() {
  try {
    const slugs = await fetchPostSlugs();
    return slugs.map((slug: string) => ({
      slug,
    }));
  } catch (error) {
    console.error("Error generating post static params:", error);
    return [];
  }
}

export async function generateCategoryStaticParams() {
  try {
    const slugs = await fetchCategorySlugs();
    return slugs.map((slug: string) => ({
      slug,
    }));
  } catch (error) {
    console.error("Error generating category static params:", error);
    return [];
  }
}
