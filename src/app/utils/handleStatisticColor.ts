export default function handleStatisticColor(num: number): string {
  if (num > 0) {
    return "text-green-400";
  } else {
    return "text-red-400";
  }
}
