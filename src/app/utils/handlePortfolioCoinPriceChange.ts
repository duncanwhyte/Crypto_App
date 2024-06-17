export default function handlePortfolioCoinPriceChange(
  purchasedPrice: number,
  currentPrice: number
): number {
  return ((currentPrice - purchasedPrice) / purchasedPrice) * 100;
}
