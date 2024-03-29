export default function handleTableProgressbarColor(hour: number, hour24: number, days7: number): string {
    /// If counter is 
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
    return inflationCount > deflationCount ? "bg-[#00B1A7]" : "bg-red-400";
}