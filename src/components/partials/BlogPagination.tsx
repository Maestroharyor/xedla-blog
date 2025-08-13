"use client";

import React from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
  current,
  pageSize
) => {
  // console.log(current, pageSize);
};

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

  const redirectToPage = ({
    page,
    perPage: newPerPage,
  }: {
    page?: number;
    perPage?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page) {
      params.set("page", page.toString());
    }
    if (newPerPage) {
      params.set("per_page", newPerPage.toString());
    }

    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  return (
    <div className="flex justify-center pt-10 pb-32">
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={(page, pageSize) =>
          redirectToPage({ page, perPage: pageSize })
        }
        current={currentPage || 1}
        total={totalPosts}
        pageSize={perPage || 10}
        pageSizeOptions={changerSizeOptions || [10, 20, 30, 40, 50, 100]}
      />
    </div>
  );
};

export default BlogPagination;
