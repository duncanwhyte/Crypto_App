/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect} from "react";
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
                if (window.innerHeight + ref.scrollTop >= ref.offsetHeight - 50) {
                cb();
                }
                return;
            };
        window.addEventListener("scroll", handleThrottle(handleScroll, 2000));
        return () => {
        window.removeEventListener(
        "scroll",
        handleThrottle(handleScroll, 2000),
        true
        );
        };
        }, [ref]);
}