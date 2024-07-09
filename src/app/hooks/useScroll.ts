/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
export default function useScroll(
  ref: HTMLTableElement | null,
  cb: () => void
) {
  useEffect(() => {
    const handleScroll = () => {
      if (ref) {
        const { bottom } = ref.getBoundingClientRect();
        if (bottom <= window.innerHeight + 100) cb();
      }
    };
    const handleThrottle = (func: () => void, delay: number) => {
      let timer: NodeJS.Timeout | null;
      return () => {
        if (!timer) {
          func();
          timer = setTimeout(() => {
            timer = null;
          }, delay);
        }
      };
    };
    const throttle = handleThrottle(handleScroll, 2000);
    if (ref) {
      window.addEventListener("scroll", throttle);
    }
    return () => {
      window.removeEventListener("scroll", throttle);
    };
  }, [ref]);
}
