import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import "@fontsource/raleway";
import MainHeader from "@/components/headers/MainHeader";
import MobileHeader from "@/components/headers/MobileHeader";
import MainFooter from "@/components/footers/MainFooter";
import Backtotop from "@/components/footers/BackToTop";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Exciting News about Xedla and Ecommerce World | Xedla Pay",
    template: "%s | Xedla Pay",
  },
  description:
    "Bringing you up to date with information on how to perform secured payments on Xedla and on the Web.",
  keywords: [
    "blog",
    "technology",
    "insights",
    "xedla",
    "payments",
    "ecommerce",
  ],
  authors: [{ name: "Xedla Team" }],
  creator: "Xedla",
  publisher: "Xedla",
  metadataBase: new URL("https://blogs.xedla.com"),
  icons: {
    icon: "/img/brand/Xedla Favicon Light.png",
    shortcut: "/img/brand/Xedla Favicon Light.png",
    apple: "/img/brand/Xedla Favicon Light.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blogs.xedla.com",
    siteName: "Xedla Pay",
    title: "Exciting News about Xedla and Ecommerce World | Xedla Pay",
    description:
      "Bringing you up to date with information on how to perform secured payments on Xedla and on the Web.",
    images: [
      {
        url: "/img/brand/Xedla Logo.png",
        width: 1200,
        height: 630,
        alt: "Xedla Pay",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Exciting News about Xedla and Ecommerce World | Xedla Pay",
    description:
      "Bringing you up to date with information on how to perform secured payments on Xedla and on the Web.",
    creator: "xedlapay",
    images: ["/img/brand/Xedla Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    other: {
      "facebook-domain-verification": "fb17tl9t4iylxxmwo8f2rupt4zpe10",
    },
  },
  other: {
    "X-UA-Compatible": "IE=edge",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <div className="dark:bg-gray-800">
          <MainHeader />
          <MobileHeader />
          <main className="max-w-[1000px] mx-auto w-full min-h-screen h-full py-5 px-5 dark:text-gray-50">
            {children}
          </main>
          <MainFooter />
          <Backtotop />
        </div>
      </body>
    </html>
  );
}
