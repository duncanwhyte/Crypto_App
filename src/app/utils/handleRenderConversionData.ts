import { ConversionCoin } from "../types/types";
export default function handleRenderConversionData(
  conversionCoin: ConversionCoin
): number[] {
  return conversionCoin?.prices?.map((price: number[]) => price[1]);
}
