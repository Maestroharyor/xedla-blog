import { getBlogPosts } from "@/actions/blog";
import FeaturedPostCard from "@/components/partials/cards/FeaturedPostCard";
import Postcard from "@/components/partials/cards/Postcard";
import BlogPagination from "@/components/partials/BlogPagination";
import { Metadata } from "next";

type SearchParams = Promise<{
  page?: string;
  per_page?: string;
}>;

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Explore our latest blog posts and insights",
  openGraph: {
    title: "Blog Posts | Xedla Blog",
    description: "Explore our latest blog posts and insights",
    type: "website",
    url: "https://blogs.xedla.com",
    siteName: "Xedla Blog",
    images: [
      {
        url: "/img/brand/Xedla Logo.png",
        width: 1200,
        height: 630,
        alt: "Xedla Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Posts | Xedla Blog",
    description: "Explore our latest blog posts and insights",
    creator: "@xedla",
    images: ["/img/brand/Xedla Logo.png"],
  },
};

export const revalidate = 10; // ISR revalidation every 10 seconds

interface BlogPageProps {
  searchParams: SearchParams;
}

export default async function HomePage({ searchParams }: BlogPageProps) {
  // Await all data fetching to ensure no streaming
  const { page: pageParam, per_page: perPageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const perPage = Number(perPageParam) || 20; // Changed to 20 posts per page

  // Fetch all data synchronously - no streaming
  const result = await getBlogPosts(page, perPage);

  if (!result.success) {
    throw new Error(result.error);
  }

  const { posts, totalPosts, totalPages } = result.data;
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  const changerSizeOptions = Array.from({ length: 4 }, (_, i) => (i + 1) * 20); // Updated to match 20 posts per page

  // Render complete page without any streaming/suspense
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-10 py-10">
        {featuredPost && <FeaturedPostCard post={featuredPost} />}
        {remainingPosts.map((post) => (
          <Postcard key={post.id} post={post} />
        ))}
      </div>
      {/* Only show pagination if there are more pages */}
      {totalPages > 1 && (
        <BlogPagination
          totalPosts={totalPosts}
          totalPages={totalPages}
          currentPage={page}
          changerSizeOptions={changerSizeOptions}
          perPage={perPage}
        />
      )}
    </div>
  );
}
