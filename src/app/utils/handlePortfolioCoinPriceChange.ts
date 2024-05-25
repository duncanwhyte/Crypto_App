export default function handlePortfolioCoinPriceChange(
  purchasedPrice: number,
  currentPrice: number
): number {
  return ((purchasedPrice - currentPrice) / purchasedPrice) * 100;
}
