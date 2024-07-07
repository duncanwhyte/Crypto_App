export default function handleCurrency(number: number): string | number {
  if (number >= 1.0e12) {
    return `${(number / 1.0e12).toFixed(2)}T`;
  }
  if (number >= 1.0e9) {
    return `${(number / 1.0e9).toFixed(2)}B`;
  }
  if (number >= 1.0e6) {
    return `${(number / 1.0e6).toFixed(2)}M`;
  } else {
    return number;
  }
}
