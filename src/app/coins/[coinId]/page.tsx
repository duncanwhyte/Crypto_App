/* eslint-disable react-hooks/exhaustive-deps */
import CoinPage from "@/app/components/CoinPage";
export default function Coin({
  params,
}: {
  params: { coinId: string; uniqueId: number };
}) {
  return <CoinPage coinId={params.coinId} />;
}
