import TopProgressBar from "@/components/elements/TopProgressBar";
import React from "react";

const PostDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TopProgressBar width="100%" />
      {children}
    </>
  );
};

export default PostDetailLayout;
