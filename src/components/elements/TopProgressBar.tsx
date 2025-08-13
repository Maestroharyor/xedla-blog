"use client";
import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  width: string;
  height?: number;
  bgcolor?: string;
  duration?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  width,
  height = 3,
  duration = 0.3,
}) => {
  const [scrollWidth, setScrollWidth] = useState<string | null>(null);

  const scrollHandler = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const documentHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / documentHeight) * 100;

    if (documentHeight > 0) {
      setScrollWidth(`${scrolled}%`);
    } else {
      setScrollWidth(null);
    }
  };

  useEffect(() => {
    try {
      window.addEventListener("scroll", scrollHandler);
      return () => {
        window.removeEventListener("scroll", scrollHandler);
      };
    } catch (error) {
      // console.error(error);
    }
  }, []);

  const scrollStyle: React.CSSProperties = {
    margin: 0,
    padding: 0,
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 102,
    height: `${height}px`,
    width: scrollWidth || "0", // Ensure that width is not null
    transitionProperty: "width",
    transitionDuration: `${duration}s`,
    transitionTimingFunction: "ease-out",
  };

  return (
    <div style={scrollStyle} className="bg-primary-full dark:bg-gray-300" />
  );
};

export default ProgressBar;
