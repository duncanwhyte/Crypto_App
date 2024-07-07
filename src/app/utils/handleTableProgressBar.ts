export default function handleTableProgressBar(
  num1: number,
  num2: number
): number {
  return Math.round((num1 / num2) * 100);
}
