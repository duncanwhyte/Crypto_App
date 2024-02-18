import Link from "next/link";
export default function Navbar() {
    return (
        <nav className="flex items-center">
            <div>
                <h1 className="text-xl">CoinMon</h1>
            </div>
            <div>
                <Link href={"/"}>Home</Link>
                <Link href={"/portfolio"}>Portfolio</Link>
            </div>
            <div>
            <div>
                <input placeholder="Search ..." />
            </div>
            <div></div>
            <div></div>
            </div>
        </nav>
    );
}