/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blogs.xedla.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/post/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/blog/category/:slug",
        destination: "/category/:slug",
        permanent: true,
      },
      {
        source: "/blog/search",
        destination: "/search",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
