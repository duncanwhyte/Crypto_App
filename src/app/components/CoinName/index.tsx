import Link from "next/link";
export default function CoinName({
  id,
  name,
  symbol,
  profit,
  priceChange,
}: {
  id: string;
  name: string;
  symbol: string;
  profit: number;
  priceChange: number;
}) {
  return (
    <>
      <Link href={`/coins/${id}/${profit}/${priceChange}`}>
        {name} ({symbol?.toUpperCase()})
      </Link>
    </>
  );
}
