import { getCategoryPosts } from "@/actions/blog";
import Postcard from "@/components/partials/cards/Postcard";
import BlogPagination from "@/components/partials/BlogPagination";
import { generateCategoryStaticParams } from "@/lib/static-params";
import { extractIdNumber } from "@/utils";
import { capitalize } from "lodash";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; per_page?: string }>;
};

export const revalidate = 10; // ISR revalidation

export async function generateStaticParams() {
  return generateCategoryStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categorySlug = slug.split("-")[0]; // Extract slug before ID
  const result = await getCategoryPosts(categorySlug, 1, 1);

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
  const categorySlug = slug.split("-")[0]; // Extract slug before ID

  const result = await getCategoryPosts(categorySlug, page, perPage);

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
