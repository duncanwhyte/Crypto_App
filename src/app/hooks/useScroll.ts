/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
const handleThrottle = (func, delay: number) => {
  let timer;
  return () => {
    if (!timer) {
      func();
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  };
};
export default function useScroll(ref, cb) {
  useEffect(() => {
    const handleScroll = () => {
      const { bottom } = ref.getBoundingClientRect();
      if (bottom <= window.innerHeight + 100) cb();
      return;
    };
    if (ref) {
      window.addEventListener("scroll", handleThrottle(handleScroll, 2000));
    }
    return () => {
      window.removeEventListener(
        "scroll",
        handleThrottle(handleScroll, 2000),
        true
      );
    };
  }, [ref]);
}
