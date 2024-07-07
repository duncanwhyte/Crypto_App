import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import TimeDurationInput from "../TimeDurationInput";
import { RootState } from "@/app/lib/store";
const selectGraphTimeDuration = (state: RootState) =>
  state.graphTimeDuration.graphTimeDuration;
export default function TimeDurationSelector() {
  const chartTimeDuration = useAppSelector(selectGraphTimeDuration);
  const [selected, setSelected] = useState(chartTimeDuration);
  const dispatch = useAppDispatch();
  const handleClick = (e: any) => {
    if (parseFloat(e.target.value) === selected) return;
    const newState = parseFloat(e.target.value);
    setSelected(newState);
    switch (newState) {
      case 0.0416666666666667:
        dispatch({ type: "oneHour" });
        break;
      case 1:
        dispatch({ type: "oneDay" });
        break;
      case 7:
        dispatch({ type: "sevenDay" });
        break;
      case 14:
        dispatch({ type: "fourteenDays" });
        break;
      case 31:
        dispatch({ type: "oneMonth" });
        break;
      case 365:
        dispatch({ type: "oneYear" });
        break;
    }
  };
  return (
    <div
      onClick={handleClick}
      className="mx-auto md:max-w-[463px] sm:max-w-[375px] space-x-2 flex justify-center p-1 dark:bg-[#232336] text-[#424286] bg-[#CCCCFA] rounded-xl"
    >
      <TimeDurationInput
        time={"1H"}
        selected={selected}
        value={0.0416666666666667}
      />
      <TimeDurationInput time={"1D"} selected={selected} value={1} />
      <TimeDurationInput time={"7D"} selected={selected} value={7} />
      <TimeDurationInput time={"14D"} selected={selected} value={14} />
      <TimeDurationInput time={"1M"} selected={selected} value={31} />
      <TimeDurationInput time={"1Y"} selected={selected} value={365} />
    </div>
  );
}
