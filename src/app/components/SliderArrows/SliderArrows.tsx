import Image from "next/image";
import arrowRight from "@/app/assets/arrow-right.svg";
export function SliderNextArrow({
  next,
  chartArrow,
}: {
  next: any;
  chartArrow: boolean;
}) {
  return (
    <button
      className={`bg-[#6161D6] p-3 rounded-full cursor-pointer absolute top-4 ${
        chartArrow ? "right-[16px]" : "-right-8 "
      }`}
      onClick={next}
    >
      <Image className="" src={arrowRight} alt="left-arrow-icon" />
    </button>
  );
}
export function SliderPrevArrow({
  prev,
  chartArrow,
}: {
  prev: any;
  chartArrow: boolean;
}) {
  return (
    <button
      className={`bg-[#6161D6] p-3 rounded-full cursor-pointer z-10 absolute top-4 ${
        chartArrow ? "right-[66px]" : "-left-8"
      }`}
      onClick={prev}
    >
      <Image className="rotate-180" src={arrowRight} alt="left-arrow-icon" />
    </button>
  );
}
