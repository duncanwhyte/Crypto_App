import { Ref } from "react";
export default function SelectedCoinStatistic({
  priceRef,
  defaultPrice,
}: {
  priceRef: null | Ref<HTMLParagraphElement>;
  defaultPrice: string;
}) {
  return <p ref={priceRef}>{defaultPrice}</p>;
}
