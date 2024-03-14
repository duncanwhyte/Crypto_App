export default function handleMarketTrendColor(hour: number, hour24: number, days7: number): string {
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
    return inflationCount > deflationCount ? "#00B1A7" : "#f87171";
}