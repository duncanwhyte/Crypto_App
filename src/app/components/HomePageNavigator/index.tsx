"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function HomePageNavigator() {
    const pathName = usePathname();
    return (
        <div className="flex gap-5 justify-center">
            <div>
                <Link href={"/"} className={`${pathName === "/" ? "bg-[#6161D6]" : "bg-[#232336]"} w-56 py-3 rounded-lg`}>
                    <button>
                    Coins
                    </button>
                    </Link>
            </div>
                <Link href={"/convertor"} className={`${pathName === "/" ? "bg-[#232336]" : "bg-[#6161D6]"} w-56 py-3 rounded-lg`}>
                <button>
                    Convertor
                </button>
                    </Link>
        </div>
    );
}