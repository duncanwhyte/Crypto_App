"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
interface Coin  {
    id: string,
    symbol: string,
    name: string
}
export default function Navbar() {
    const pathName = usePathname();
    const [coinSearchVal, setCoinSearchVal] = useState("");
    const [debouncedCoinVal, setDebouncedCoinVal] = useState("");
    const [coinList, setCoinList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const handleSearchCoin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCoinSearchVal(e.target.value);
    };
    const getCoins = async () => {
        try {
            setIsLoading(true);
            const coinReq = await fetch("https://api.coingecko.com/api/v3/coins/list");
            const coinData = await coinReq.json();
            setCoinList(coinData);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };
    useEffect(() => {
        getCoins();
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedCoinVal(coinSearchVal);
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [coinSearchVal]);
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
                <input onChange={(e) => handleSearchCoin(e)} className="inline-block px-12 py-3 bg-[#232334] rounded-xl :focus outline-none" placeholder="Search..." value={coinSearchVal} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 absolute top-3.5 left-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
<ul className={`${coinList && coinSearchVal ? "opacity-100" : "opacity-0"} absolute w-full h-44 p-2 bg-[#232334] rounded-xl overflow-x-hidden overflow-y-scroll `}>
    {isLoading && "Fetching Coins..."}
    {error && "Could Not Fetch Coins..."}
    {debouncedCoinVal && coinList && coinList.filter((coin: Coin) => coin.name.includes(debouncedCoinVal)).map((coin: Coin) => <Link key={coin.id} href={`/coins/${coin.id}`}>{coin.name}</Link>)}
</ul>
            </div>
            <div>
            <div className="min-w-24 relative">
                <select className="appearance-none bg-[#232334] px-6 py-3 rounded-xl w-full focus:outline-none">
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                    <option value="EUR">EUR</option>
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                </select>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute top-4 right-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
            </div>
            </div>
            <div className="flex justify-center items-center bg-[#232334] p-2.5 rounded-xl transition-all hover:bg-[#6161D6] hover:cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7 :hover cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>
            </div>
            </div>
        </nav>
    );
}