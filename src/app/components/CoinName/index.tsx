import Link from "next/link";
export default function CoinName({id,name, symbol}: {id: string, name: string, symbol: string}) {
    return (
        <>
        <Link href={`/coins/${id}`}>{name} ({symbol?.toUpperCase()})</Link>
        </>
    );
}