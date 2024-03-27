import Image from "next/image";
import arrowRight from "@/app/assets/arrow-right.svg";
export function SliderNextArrow({next} : { next: any}) {
    return (
        <button className={"bg-[#6161D6] p-3 rounded-full cursor-pointer absolute -right-8 top-4"} onClick={next}>
            <Image className="" src={arrowRight} alt="left-arrow-icon" />
        </button>
    );
}
export function SliderPrevArrow({prev} : {prev: any}) {
    return (
        <button className={"bg-[#6161D6] p-3 rounded-full cursor-pointer z-10 absolute -left-8 top-4"} onClick={prev}>
            <Image className="rotate-180" src={arrowRight} alt="left-arrow-icon" />
        </button>
    );
}