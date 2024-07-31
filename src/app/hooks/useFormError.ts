/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SearchedCoin } from "../types/types";
export default function useFormError(
  selectedCoin: SearchedCoin,
  coinAmount: string,
  purchasedDate: string
): boolean[] {
  const [errors, setErrors] = useState<boolean[]>([false, false, false]);
  const errorPipeline: { (): boolean }[] = [
    (): boolean => {
      if (!selectedCoin) {
        return true;
      }
      return false;
    },
    (): boolean => {
      if (isNaN(parseFloat(coinAmount))) {
        return true;
      }
      if (parseFloat(coinAmount) < 0) {
        return true;
      }
      return false;
    },
    (): boolean => {
      const now = new Date();
      const dateToCheck = new Date(purchasedDate);
      const daysMilliseconds: number = 86400000;
      if (now.valueOf() - dateToCheck.valueOf() > daysMilliseconds) {
        return false;
      }
      return true;
    },
  ];
  useEffect(() => {
    const newErrors: boolean[] = errorPipeline.reduce(
      (init: [] | boolean[], currVal: { (): boolean }): boolean[] => {
        return [...init, currVal()];
      },
      []
    );
    setErrors(newErrors);
  }, [selectedCoin, coinAmount, purchasedDate]);
  return errors;
}
