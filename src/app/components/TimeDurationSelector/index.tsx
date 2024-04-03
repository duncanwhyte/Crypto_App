export default function TimeDurationSelector() {
    return (
        <div className=" w-96 mx-auto space-x-2 flex justify-center p-1 bg-[#232336] rounded-xl">
            <div className={"p-2 text-[#A7A7CC] rounded-xl hover:bg-[#6161D6] transition-all cursor-pointer"}>1H</div>
            <div className={"p-2 text-[#A7A7CC] rounded-xl hover:bg-[#6161D6] transition-all cursor-pointer"}>1D</div>
            <div className={"p-2 text-[#A7A7CC] rounded-xl hover:bg-[#6161D6] transition-all cursor-pointer"}>7D</div>
            <div className={"p-2 text-[#A7A7CC] rounded-xl hover:bg-[#6161D6] transition-all cursor-pointer"}>14D</div>
            <div className={"p-2 text-[#A7A7CC] rounded-xl hover:bg-[#6161D6] transition-all cursor-pointer"}>1M</div>
            <div className={"p-2 text-[#A7A7CC] rounded-xl hover:bg-[#6161D6] transition-all cursor-pointer"}>1Y</div>
        </div>
    );
}