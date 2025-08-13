import { getPostBySlug } from "@/actions/blog";
import BlogShare from "@/components/elements/BlogShareComponent";
import { generatePostStaticParams } from "@/lib/static-params";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 10; // ISR revalidation

export async function generateStaticParams() {
  return generatePostStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPostBySlug(slug);

  if (!result.success || !result.data) {
    return {
      title: "Post Not Found",
    };
  }

  const post = result.data;
  const description = post.excerpt.rendered.replace(/<[^>]+>/g, "");
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return {
    title: post.title.rendered,
    description,
    openGraph: {
      title: post.title.rendered,
      description,
      type: "article",
      url: `https://blogs.xedla.com/${slug}`,
      siteName: "Xedla Pay",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: featuredImage
        ? [
            {
              url: featuredImage,
              width: 1200,
              height: 630,
              alt: post.title.rendered,
            },
          ]
        : [
            {
              url: "/img/brand/Xedla Logo.png",
              width: 1200,
              height: 630,
              alt: post.title.rendered,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.rendered,
      description,
      creator: "xedlapay",
      images: featuredImage ? [featuredImage] : ["/img/brand/Xedla Logo.png"],
    },
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const result = await getPostBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const post = result.data;
  const description = post.excerpt.rendered.replace(/<[^>]+>/g, "");
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <main className="pt-10 pb-32 antialiased text-lg post_detail">
      {/* Featured Image */}
      {featuredImage && (
        <figure className="rounded overflow-hidden w-full h-[320px] lg:h-[470px] relative">
          <Image
            alt={post.title.rendered}
            src={featuredImage}
            fill={true}
            className="object-cover"
            priority
          />
        </figure>
      )}

      <header className="mb-4 lg:mb-6 not-format px-4">
        <h1 className="mb-4 text-2xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
          {post.title.rendered}
        </h1>
      </header>

      {/* Body */}
      <div className="flex flex-col lg:flex-row justify-between px-4 mx-auto max-w-screen-xl h-full relative gap-10">
        <BlogShare />
        <article
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          className="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert flex-1"
        />
      </div>
    </main>
  );
}
