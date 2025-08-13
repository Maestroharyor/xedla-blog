import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        The blog post you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="bg-primary-full hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Return to Blog
      </Link>
    </div>
  );
}
