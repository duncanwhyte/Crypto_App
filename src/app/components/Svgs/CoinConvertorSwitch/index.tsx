import { useTheme } from "next-themes";
export default function CoinConvertorSwitch({
  handleCoinSwitch,
}: {
  handleCoinSwitch: () => void;
}) {
  const { resolvedTheme } = useTheme();
  return (
    <svg
      onClick={handleCoinSwitch}
      className="cursor-pointer p-3 bg-[#F3F5F9] dark:bg-[#13121A] rounded-full w-[72px] h-[72px] left-1/2 top-1/2 -mt-[30px] -ml-[calc(36px-16px)] lg:-ml-[calc(72px-36px)]  md:p-3 md:bg-transparent md:dark:bg-transparent md:-mt-[36px] md:-ml-[46px] 2xl:-ml-[36px] absolute"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="48"
        height="48"
        rx="24"
        fill={`${resolvedTheme === "dark" ? "#FFFFFF" : "#3D3D7E"}`}
      />
      <path
        d="M14.5 28L18.5 32M18.5 32L22.5 28M18.5 32L18.5 18C18.5 16.8954 19.3954 16 20.5 16V16"
        stroke={`${resolvedTheme === "dark" ? "#3D3D7E" : "#FFFFFF"}`}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M25.5 20L29.5 16M29.5 16L33.5 20M29.5 16L29.5 31C29.5 32.1046 28.6046 33 27.5 33V33"
        stroke={`${resolvedTheme === "dark" ? "#3D3D7E" : "#FFFFFF"}`}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
