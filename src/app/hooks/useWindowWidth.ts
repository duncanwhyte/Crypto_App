"use client";
import { useEffect, useState } from "react";
export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 600
  );
  useEffect(() => {
    const getWindowWidth = () => {
      const windowWidth = window.innerWidth;
      setWindowWidth(windowWidth);
    };
    window.addEventListener("load", getWindowWidth);
    window.addEventListener("resize", getWindowWidth);
    return () => {
      window.removeEventListener("load", getWindowWidth, true);
      window.removeEventListener("resize", getWindowWidth, true);
    };
  }, [windowWidth]);
  return windowWidth;
}
