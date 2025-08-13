import { searchPosts } from "@/actions/blog";
import Postcard from "@/components/partials/cards/Postcard";
import BlogPagination from "@/components/partials/BlogPagination";
import SearchForm from "@/components/partials/SearchForm";
import { postDatatype } from "@/types";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ query?: string; page?: string; per_page?: string }>;
};

export const metadata: Metadata = {
  title: "Search Posts",
  description: "Search for blog posts",
  openGraph: {
    title: "Search Posts | Xedla Blog",
    description: "Search for blog posts",
    type: "website",
    url: "https://blogs.xedla.com/search",
    siteName: "Xedla Blog",
    images: [
      {
        url: "/img/brand/Xedla Logo.png",
        width: 1200,
        height: 630,
        alt: "Search Posts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Posts | Xedla Blog",
    description: "Search for blog posts",
    creator: "@xedla",
    images: ["/img/brand/Xedla Logo.png"],
  },
};

export const revalidate = 0; // No caching for search results

export default async function SearchPage({ searchParams }: Props) {
  const {
    query: queryParam,
    page: pageParam,
    per_page: perPageParam,
  } = await searchParams;
  const query = queryParam || "";
  const page = Number(pageParam) || 1;
  const perPage = Number(perPageParam) || 20; // Changed to 20 posts per page

  let posts: postDatatype[] = [];
  let totalPosts = 0;
  let totalPages = 0;

  if (query) {
    const result = await searchPosts(query, page, perPage);
    if (result.success) {
      posts = result.data.posts;
      totalPosts = result.data.totalPosts;
      totalPages = result.data.totalPages;
    }
  }

  return (
    <div className="py-10 space-y-8">
      {query && posts.length ? (
        <>
          <h1 className="text-3xl font-bold text-center lg:text-5xl">
            Search results for{" "}
            <span className="text-primary-full dark:text-secondary-50">
              &quot;{query}&quot;
            </span>{" "}
            in Posts
          </h1>
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
        <>
          <div className="space-y-3 mb-4">
            <h1 className="text-3xl font-bold text-center lg:text-5xl">
              Search for posts
            </h1>
            <p className="text-center text-gray-400 dark:text-gray-200">
              Press Enter to search
            </p>
          </div>
          {query && !posts.length && (
            <div className="text-lg flex items-center justify-center">
              <p>No posts found...</p>
            </div>
          )}
          <SearchForm initialQuery={query} />
        </>
      )}
    </div>
  );
}
