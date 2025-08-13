import { getPostsByCategory } from "@/actions/blog";
import Postcard from "@/components/partials/cards/Postcard";
import BlogPagination from "@/components/partials/BlogPagination";
import { extractIdNumber } from "@/utils";
import { capitalize } from "lodash";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; per_page?: string }>;
};

export const revalidate = 60; // ISR revalidation every 60 seconds

// Generate static params for all categories at build time
export async function generateStaticParams() {
  try {
    // Import the function we need from actions
    const { getAllCategories } = await import("@/actions/blog");

    // Fetch all categories
    const categoriesResult = await getAllCategories();

    if (!categoriesResult.success) {
      console.warn(
        "Failed to fetch categories for generateStaticParams:",
        categoriesResult.error
      );
      return [];
    }

    // Generate slug parameters for all categories
    const params = categoriesResult.data.map((category) => ({
      slug: `${category.slug}-${category.id}`,
    }));

    console.log(
      `Generated ${params.length} category static params:`,
      params.map((p) => p.slug)
    );

    return params;
  } catch (error) {
    console.error("Error in generateStaticParams for categories:", error);
    // Return empty array on error to allow dynamic rendering
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryId = parseInt(extractIdNumber(slug)); // Extract ID from slug
  const result = await getPostsByCategory(categoryId, 1, 1);

  if (!result.success || !result.data.category) {
    return {
      title: "Category Not Found",
    };
  }

  const category = result.data.category;

  return {
    title: `${category.name} Posts`,
    description: category.description || `Posts in ${category.name} category`,
    openGraph: {
      title: `${category.name} Posts | Xedla Blog`,
      description: category.description || `Posts in ${category.name} category`,
      type: "website",
      url: `https://blogs.xedla.com/category/${slug}`,
      siteName: "Xedla Blog",
      images: [
        {
          url: "/img/brand/Xedla Logo.png",
          width: 1200,
          height: 630,
          alt: `${category.name} Posts`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Posts | Xedla Blog`,
      description: category.description || `Posts in ${category.name} category`,
      creator: "@xedla",
      images: ["/img/brand/Xedla Logo.png"],
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageParam, per_page: perPageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const perPage = Number(perPageParam) || 18; // Changed to 18 posts per page for categories
  const categoryId = parseInt(extractIdNumber(slug)); // Extract ID from slug

  const result = await getPostsByCategory(categoryId, page, perPage);

  if (!result.success || !result.data.category) {
    notFound();
  }

  const { posts, totalPosts, totalPages, category } = result.data;

  return (
    <div className="py-10 space-y-8">
      <h1 className="text-3xl font-bold text-center lg:text-5xl">
        Show Posts in{" "}
        <span className="text-primary-full dark:text-secondary-50">
          {capitalize(category.name || "")}
        </span>{" "}
        Category
      </h1>
      {posts && posts.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-10 py-10">
            {posts.map((post) => (
              <Postcard key={post.id} post={post} />
            ))}
          </div>
          {/* Only show pagination if there are more pages */}
          {totalPages > 1 && (
            <BlogPagination
              totalPosts={totalPosts}
              totalPages={totalPages}
              currentPage={page}
              perPage={perPage}
            />
          )}
        </>
      ) : (
        <div className="text-lg flex items-center justify-center">
          <p>No posts found...</p>
        </div>
      )}
    </div>
  );
}
