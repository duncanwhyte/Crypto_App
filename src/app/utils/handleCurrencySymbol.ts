export default function handleCurrencySymbol(currency: string) {
    let symbol;
    switch (currency) {
        case "usd":
            symbol = "$";
            break;
        case "gbp":
            symbol = "£";
            break;
        case "eur":
            symbol = "€";
            break;
        case "eth":
            symbol = "Ξ";
            break;
        case "btc":
            symbol = "₿";
            break;
    }
    return symbol;
}