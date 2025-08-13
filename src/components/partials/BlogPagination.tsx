"use client";

import React from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Props = {
  totalPosts: number;
  totalPages: number;
  currentPage?: number;
  perPage?: number;
  changerSizeOptions?: number[];
};

const BlogPagination: React.FC<Props> = ({
  totalPages,
  totalPosts,
  currentPage,
  perPage,
  changerSizeOptions,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const redirectToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  return (
    <div className="flex justify-center pt-10 pb-32">
      <Pagination
        onChange={(page) => redirectToPage(page)}
        current={currentPage || 1}
        total={totalPosts}
        pageSize={perPage || 10}
      />
    </div>
  );
};

export default BlogPagination;
