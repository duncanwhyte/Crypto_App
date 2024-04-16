export default function handleCoinLabelCount(screenSize) {
    if (screenSize <= 960) {
        return 5;
    } else {
        return 7;
    }
}