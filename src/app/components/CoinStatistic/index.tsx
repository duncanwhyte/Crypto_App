import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
export default function CoinStatistic({
  statisticText,
  statisticData,
  currentCurrency,
  coinSymbol,
}: {
  statisticText: string;
  statisticData: number | string;
  currentCurrency: string | null;
  coinSymbol: string | null;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <svg
          width="80"
          height="81"
          viewBox="0 0 80 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_bd_587_10750)">
            <circle
              cx="36"
              cy="36.5"
              r="12"
              fill="#6161D6"
              fill-opacity="0.5"
              shape-rendering="crispEdges"
            />
            <circle
              cx="36"
              cy="36.5"
              r="11.5"
              stroke="url(#paint0_linear_587_10750)"
              shape-rendering="crispEdges"
            />
          </g>
          <path
            d="M32 36.5H40"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M36 40.5V32.5"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <defs>
            <filter
              id="filter0_bd_587_10750"
              x="0"
              y="0.5"
              width="80"
              height="80"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
              <feComposite
                in2="SourceAlpha"
                operator="in"
                result="effect1_backgroundBlur_587_10750"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="8"
                operator="dilate"
                in="SourceAlpha"
                result="effect2_dropShadow_587_10750"
              />
              <feOffset dx="4" dy="4" />
              <feGaussianBlur stdDeviation="10" />s
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.470588 0 0 0 0 0.470588 0 0 0 0 0.980392 0 0 0 0.15 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_backgroundBlur_587_10750"
                result="effect2_dropShadow_587_10750"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect2_dropShadow_587_10750"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_587_10750"
              x1="36"
              y1="24.5"
              x2="36"
              y2="48.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#7878FA" />
              <stop offset="1" stop-color="#7878FA" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
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
