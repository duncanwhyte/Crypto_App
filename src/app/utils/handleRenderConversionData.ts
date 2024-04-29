export default function handleRenderConversionData(conversionCoin) {
    return conversionCoin?.prices?.map((price: number[]) => price[1]);
}