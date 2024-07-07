"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function HomePageNavigator() {
  const pathName = usePathname();
  return (
    <div className="flex gap-5 justify-center">
      <Link
        href={"/"}
        className={`${
          pathName === "/"
            ? "bg-[#CCCCFA] dark:bg-[#6161D6] text-[#FFFFFF]"
            : "bg-[#FFFFFF] text-[#424286] dark:bg-[#232336] dark:text-[#FFFFFF]"
        } flex justify-center w-56 py-3 rounded-lg transition-all hover:scale-105 md:hover:scale-110`}
      >
        Coins
      </Link>
      <Link
        href={"/convertor"}
        className={`${
          pathName === "/convertor"
            ? "bg-[#CCCCFA] dark:bg-[#6161D6] text-[#FFFFFF]"
            : "bg-[#FFFFFF] text-[#424286] dark:bg-[#232336] dark:text-[#FFFFFF]"
        } flex justify-center w-56 py-3 rounded-lg transition-all hover:scale-105 md:hover:scale-110`}
      >
        Convertor
      </Link>
    </div>
  );
}
