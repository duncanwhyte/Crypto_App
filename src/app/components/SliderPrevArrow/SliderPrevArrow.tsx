import Image from "next/image";
import leftArrow from "@/app/assets/arrow-right.svg";
export default function SliderPrevArrow({prev} : {prev: any}) {
    return (
        <button className={"bg-[#6161D6] p-3 rounded-full cursor-pointer z-10 absolute -left-8 top-4"} onClick={prev}>
            <Image className="rotate-180" src={leftArrow} alt="left-arrow-icon" />
        </button>
    );
}