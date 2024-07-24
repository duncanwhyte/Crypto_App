import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
export default function CoinStatistic({
  statisticText,
  statisticData,
  currentCurrency,
  coinSymbol,
}: {
  statisticText: string;
  statisticData: string | null | undefined;
  currentCurrency: string | null;
  coinSymbol: string | null;
}) {
  return (
    <div className="flex justify-between mb-3 items-center">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-full bg-[#403d84]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 8H12"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 12V4"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        {statisticText}
      </div>
      <p>
        {currentCurrency && handleCurrencySymbol(currentCurrency)}
        {statisticData}
        {coinSymbol}
      </p>
    </div>
  );
}
