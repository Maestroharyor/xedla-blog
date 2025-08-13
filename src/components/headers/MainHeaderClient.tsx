"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import HeaderActions from "./HeaderActions";
import TopProgressBar from "@/components/elements/TopProgressBar";
import { useRouter, usePathname } from "next/navigation";

type Category = {
  name: string;
  link: string;
};

type MainHeaderClientProps = {
  categories: Category[];
};

const MainHeaderClient = ({ categories }: MainHeaderClientProps) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const header = document.querySelector("#desktop_header") as HTMLElement;
    let lastScrollTop = 0;
    const scrollFunction = function () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop >= 120) {
        header.classList.add("shadow-2xl", "py-5", "dark:bg-gray-700");
        header.classList.remove("py-14", "dark:bg-gray-800");
      } else {
        header.classList.remove("shadow-2xl", "py-5", "dark:bg-gray-700");
        header.classList.add("py-14", "dark:bg-gray-800");
      }
      lastScrollTop = scrollTop;
    };
    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  return (
    <>
      <TopProgressBar width="100%" />
      <header
        className="sticky top-0 bg-white dark:bg-gray-800 py-14 transition-all duration-500 ease-in-out shadow-black/5 hidden lg:flex z-10"
        id="desktop_header"
      >
        <div className="flex items-center justify-between max-w-[1000px] w-full mx-auto relative">
          <Link href={"/"}>
            <Image
              alt="Xedla Pay"
              src={"/img/brand/Xedla Logo.png"}
              width={100}
              height={44}
              className="dark:hidden"
            />
            <Image
              alt="Xedla Pay"
              src="/img/brand/Xedla Logo Footer.png"
              width={44}
              height={44}
              className="hidden dark:block"
            />
          </Link>

          <nav className="flex gap-8 items-center">
            {categories.map((item: Category) => (
              <div key={item.name}>
                <Link
                  href={item.link}
                  className={`group py-3 flex gap-1 items-center relative dark:text-gray-100 dark:hover:text-secondary-70 hover:text-primary-70 transition-all duration-300 ease-in-out ${
                    pathname === item.link
                      ? "font-bold text-primary-full dark:text-secondary-50"
                      : "text-gray-700 "
                  }`}
                >
                  <p className="text-base">{item.name}</p>
                </Link>
              </div>
            ))}
          </nav>

          <HeaderActions />
        </div>
      </header>
    </>
  );
};

export default MainHeaderClient;
