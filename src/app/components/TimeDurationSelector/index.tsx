import { useState } from "react";
import TimeDurationInput from "../TimeDurationInput";
export default function TimeDurationSelector() {
    const [selected, setSelected] = useState<string>("");
    const handleClick = (e) => {
        switch (e.target.value) {
            case "1H":
                setSelected(e.target.value);
                break;
            case "1D":
                setSelected(e.target.value);
                break;
            case "7D":
                setSelected(e.target.value);
                break;
            case "14D":
                setSelected(e.target.value);
                break;
            case "1M":
                setSelected(e.target.value);
                break;
            case "1Y":
                setSelected(e.target.value);
                break;
        }
    };
    return (
        <div onClick={handleClick} className="mx-auto md:max-w-[463px] sm:max-w-[375px] space-x-2 flex justify-center p-1 bg-[#232336] rounded-xl">
            <TimeDurationInput time={"1H"} selected={selected} />
            <TimeDurationInput time={"1D"} selected={selected} />
            <TimeDurationInput time={"14D"} selected={selected} />
            <TimeDurationInput time={"1M"} selected={selected} />
            <TimeDurationInput time={"1Y"} selected={selected} />
        </div>
    );
}