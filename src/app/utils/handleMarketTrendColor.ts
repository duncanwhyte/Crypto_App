export default function handleMarketTrendColor(
  hour: number,
  hour24: number,
  days7: number,
  light: boolean
): string {
  let inflationCount: number = 0;
  let deflationCount: number = 0;
  if (hour > 0) {
    inflationCount++;
  }
  if (hour < 0) {
    deflationCount++;
  }
  if (hour24 > 0) {
    inflationCount++;
  }
  if (hour24 < 0) {
    deflationCount++;
  }
  if (days7 > 0) {
    inflationCount++;
  }
  if (days7 < 0) {
    deflationCount++;
  }
  return inflationCount > deflationCount
    ? `rgba(0, 177, 167, ${light ? "0.5" : "1"})`
    : `rgba(248, 113, 113, ${light ? "0.5" : "1"})`;
}
