/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
export default function useFormError(selectedCoin, coinAmount, purchasedDate) {
  const [errors, setErrors] = useState([false, false, false]);
  const errorPipeline = [
    () => {
      if (!selectedCoin) {
        return true;
      }
      return false;
    },
    () => {
      if (coinAmount < 0 || typeof coinAmount === "string") {
        return true;
      }
      return false;
    },
    () => {
      const now = new Date();
      const dateToCheck = new Date(purchasedDate);
      const daysMiliseconds = 86400000;
      if (now - dateToCheck > daysMiliseconds) {
        return false;
      }
      return true;
    },
  ];
  useEffect(() => {
    const newErrors = errorPipeline.reduce((init, currVal) => {
      return [...init, currVal()];
    }, []);
    setErrors(newErrors);
  }, [selectedCoin, coinAmount, purchasedDate]);
  return errors;
}
