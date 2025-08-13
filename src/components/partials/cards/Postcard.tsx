import Link from "next/link";
import React from "react";
import Image from "next/image";
import { postDatatype } from "@/types";
import moment from "moment";

type Props = {
  post: postDatatype;
};
const Postcard = ({ post }: Props) => {
  function generateRandomPaddedNumber(min: number, max: number): string {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    // Use string padding to add leading zeros if necessary
    return randomNumber.toString().padStart(2, "0");
  }

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <Link href={`/${post.slug}`}>
        <figure className="rounded overflow-hidden w-full h-[300px]  relative">
          {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
            <Image
              alt={post.title.rendered}
              src={post._embedded["wp:featuredmedia"][0].source_url}
              fill={true}
              className="object-cover"
              sizes="100%"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-lg">
                No Image
              </span>
            </div>
          )}
        </figure>
      </Link>
      <div className="flex text-gray-500 dark:text-gray-200 gap-4 text-base">
        <p> {moment(post.date).format("MMM D, YYYY")}</p>{" "}
        {post._embedded["wp:term"] && (
          <Link
            href={`/category/${post._embedded["wp:term"][0][0].slug}-${post._embedded["wp:term"][0][0].id}`}
            className="flex items-center gap-1 text-gray-500 dark:text-gray-200 hover:text-primary-full dark:hover:text-secondary-70 transition-all duration-300 ease-in-out"
          >
            <span>▣</span>
            <span>{post._embedded["wp:term"][0][0].name}</span>
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-2 text-lg">
        <Link
          href={`/${post.slug}`}
          className="text-primary-full hover:text-purple-700 dark:text-secondary-40 dark:hover:text-secondary-70 text-3xl font-bold transition-all duration-300 ease-in-out"
        >
          <h3>{post.title.rendered}</h3>
        </Link>
        <p
          className=""
          dangerouslySetInnerHTML={{
            __html: `${post.excerpt.rendered
              .replace(/<[^>]+>/g, "")
              .substring(0, 120)}...`,
          }}
        />
      </div>
    </div>
  );
};

export default Postcard;
