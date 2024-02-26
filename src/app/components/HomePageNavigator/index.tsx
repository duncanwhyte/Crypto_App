"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function HomePageNavigator() {
    const pathName = usePathname();
    return (
        <div className="flex gap-5 justify-center">
                <Link href={"/"} className={`${pathName === "/" ? "bg-[#6161D6]" : "bg-[#232336]"} flex justify-center w-56 py-3 rounded-lg transition-all hover:scale-110`}>
                    Coins
                    </Link>
                <Link href={"/convertor"} className={`${pathName === "/" ? "bg-[#232336]" : "bg-[#6161D6]"} flex justify-center w-56 py-3 rounded-lg transition-all hover:scale-110`}>
                    Convertor
                    </Link>
        </div>
    );
}