"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
export default function Navbar() {
    const pathName = usePathname();
    return (
        <nav className="flex justify-between items-center">
            <div className="flex items-center">
                <h1 className="text-xl font-bold">CoinMon</h1>
            </div>
            <div className="flex space-x-4">
                <div>
                <Link className={`flex items-center gap-1 ${pathName === "/" ? "#FFFFF" : "text-[#808080]"}`} href={"/"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill={`${pathName === "/" ? "#FFFFF" : "none"}`} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
                    Home
                    </Link>
                </div>
                <div>
                <Link className={`flex items-center gap-1 ${pathName === "/portfolio" ? "#FFFFF" : "text-[#808080]"}`} href={"/portfolio"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill={`${pathName === "/portfolio" ? "#FFFFF" : "none"}`} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
</svg>
                    Portfolio
                    </Link>
                </div>
            </div>
            <div className="flex items-center space-x-4">
            <div className="relative">
                <input className="inline-block px-12 py-3 bg-[#232334] rounded-xl :focus outline-none" placeholder="Search..." />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 absolute top-3.5 left-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
            </div>
            <div className="flex justify-center items-center">
            </div>
            <div className="flex justify-center items-center bg-[#232334] p-2.5 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7 :hover cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>
            </div>
            </div>
        </nav>
    );
}