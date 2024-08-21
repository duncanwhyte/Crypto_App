import { useTheme } from "next-themes";
export default function DropDownIcon({
  showCoinList,
  handleShowCoinList,
}: {
  showCoinList: boolean;
  handleShowCoinList: () => void;
}) {
  const { resolvedTheme } = useTheme();
  return (
    <div
      className={`transition-all duration-300 [transform:rotateX(0)]  ${
        showCoinList && "[transform:rotateX(180deg)]"
      }`}
    >
      <svg
        className="cursor-pointer"
        onClick={handleShowCoinList}
        width="24"
        height="24"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.99935 9.66699L11.3327 6.33366L4.66602 6.33366L7.99935 9.66699Z"
          fill={`${resolvedTheme === "dark" ? "#FFFFFF" : "#CCCCFA"}`}
        />
      </svg>
    </div>
  );
}
