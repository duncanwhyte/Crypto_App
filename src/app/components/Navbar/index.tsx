import Link from "next/link";
export default function Navbar() {
    return (
        <nav className="flex justify-between items-center">
            <div className="flex items-center">
                <h1 className="text-xl font-bold">CoinMon</h1>
            </div>
            <div className="space-x-4">
                <Link href={"/"}>Home</Link>
                <Link className="text-[#808080] :active" href={"/portfolio"}>Portfolio</Link>
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
            <div className="flex justify-center items-center bg-[#232334] p-3 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7 :hover cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>
            </div>
            </div>
        </nav>
    );
}