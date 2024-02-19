import Link from "next/link";
export default function Navbar() {
    return (
        <nav className="flex justify-between items-center">
            <div>
                <h1 className="text-xl font-bold">CoinMon</h1>
            </div>
            <div>
                <Link href={"/"}>Home</Link>
                <Link href={"/portfolio"}>Portfolio</Link>
            </div>
            <div>
            <div>
                <input className="inline-block p-2 bg-[#232334] rounded-xl :focus outline-none" placeholder="Search ..." />
            </div>
            <div></div>
            <div></div>
            </div>
        </nav>
    );
}