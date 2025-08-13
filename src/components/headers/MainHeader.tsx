import { getAllCategories } from "@/actions/blog";
import MainHeaderClient from "./MainHeaderClient";

export default async function MainHeaderWrapper() {
  // Fetch categories using server action
  const categoriesResult = await getAllCategories();

  // Transform categories to match the expected format
  const categories = categoriesResult.success
    ? categoriesResult.data.map((category) => ({
        name: category.name,
        link: `/category/${category.slug}-${category.id}`,
      }))
    : [
        { name: "Company News", link: "/category/company-news" },
        { name: "Product Updates", link: "/category/product-updates" },
        { name: "Marketing News", link: "/category/marketing-news" },
        { name: "Ecommerce Tips", link: "/category/ecommerce-tips" },
      ]; // Fallback to static data if fetch fails

  return <MainHeaderClient categories={categories} />;
}
