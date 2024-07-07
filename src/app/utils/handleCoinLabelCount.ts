export default function handleCoinLabelCount(screenSize: number): number {
  if (screenSize <= 960) {
    return 5;
  } else {
    return 7;
  }
}
