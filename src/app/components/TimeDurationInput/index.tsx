export default function TimeDurationInput({time, selected}: {time: string, selected: string}) {
    return (
        <div className={`relative ${selected === time && "bg-[#6161D6]"} flex justify-center items-center grow sm:px-3 sm:py-3 md:px-5 md:py-2 text-[#A7A7CC] text-sm rounded-xl hover:bg-[#6161D6] transition-all cursor-pointer`}>
        {time}
    <input className={"absolute w-full h-full opacity-0 cursor-pointer"} name="time-duration" type={"radio"} value={time} />
    </div>
    );
}