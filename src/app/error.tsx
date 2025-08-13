"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        We encountered an error while loading the blog posts.
      </p>
      <button
        onClick={reset}
        className="bg-primary-full hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
