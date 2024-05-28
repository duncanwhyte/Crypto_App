import Image from "next/image";
import CoinName from "../CoinName";
import PortfolioCoinStatistic from "../PortfolioCoinStatistic";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import handlePortfolioCoinPriceChange from "@/app/utils/handlePortfolioCoinPriceChange";
import { createPortal } from "react-dom";
import PortfolioModal from "../PortfolioModal";
const selectCurrentCurrency = (state) => state.currentCurrency;
export default function PortfolioCoinCard({
  id,
  purchaseDate,
  coinAmount,
  currentDateData,
  purchasedDateData,
  showEditModal,
  handleOpenEditModal,
}: {
  id: number;
  purchaseDate: string;
  coinAmount: number;
  currentDateData: any;
  purchasedDateData: any;
  showEditModal: any;
  handleOpenEditModal: any;
}) {
  const currentCurrency = useAppSelector(selectCurrentCurrency);
  const dispatch = useAppDispatch();
  const handleRemoveCoin = (coinId: number) => {
    dispatch({ type: "portfolioCoins/removeCoin", payload: coinId });
  };
  return (
    <div>
      <div className="flex mb-6">
        <div className="bg-[#2C2C4A] px-[60px] py-[65px] rounded-l-lg basis-[20%]">
          <div className="flex flex-col items-center">
            <div className="bg-[#2C2C4A] p-4 max-w-[64px] rounded-lg">
              <div>
                <Image
                  width={32}
                  height={32}
                  src={currentDateData?.image?.thumb}
                  alt="portfolio-coin-image"
                />
              </div>
            </div>
            <CoinName
              id={currentDateData?.id}
              name={currentDateData?.name}
              symbol={currentDateData?.symbol}
            />
          </div>
        </div>
        <div className="bg-[#191932] p-6 rounded-r-lg flex flex-col basis-[80%]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">Market price</h3>
            <button
              onClick={() => handleRemoveCoin(id)}
              className="bg-red-400 p-2 rounded-md"
            >
              <svg
                className="rotate-45"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 10.5H15"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 15.5V5.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-between">
            <PortfolioCoinStatistic statistic={"Current price"}>
              <p>
                {handleCurrencySymbol(currentCurrency)}
                {currentDateData?.market_data?.current_price[
                  currentCurrency
                ].toFixed(3)}
              </p>
            </PortfolioCoinStatistic>
            <PortfolioCoinStatistic statistic={"Price change 24h"}>
              <p>
                {handleCurrencySymbol(currentCurrency)}
                {currentDateData?.market_data?.price_change_24h}
              </p>
            </PortfolioCoinStatistic>
            <PortfolioCoinStatistic statistic={"Market Cap vs Volume"}>
              <div>
                {Math.min(
                  100,
                  Math.round(
                    currentDateData?.market_data?.market_cap[currentCurrency] /
                      currentDateData?.market_data?.total_volume[
                        currentCurrency
                      ]
                  ) * 100
                )}
                %
                <div className="bg-[#FFF] opacity-50 rounded-xl w-full h-2"></div>
                <div
                  className="bg-green-400 relative bottom-2 rounded-xl h-2"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.round(
                        currentDateData?.market_data?.market_cap[
                          currentCurrency
                        ] /
                          currentDateData?.market_data?.total_volume[
                            currentCurrency
                          ]
                      ) * 100
                    )}%`,
                  }}
                ></div>
              </div>
            </PortfolioCoinStatistic>
            <PortfolioCoinStatistic statistic={"Circ supply vs max supply"}>
              <p></p>
            </PortfolioCoinStatistic>
          </div>
          <div>
            <div>
              <h3 className="text-lg">Your Coin</h3>
              <div className="flex items-center justify-between">
                <h3 className="text-lg">Market price</h3>
                <button
                  onClick={handleOpenEditModal}
                  className="bg-[#6161D6] p-2 rounded-md"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.2594 3.60022L5.04936 12.2902C4.73936 12.6202 4.43936 13.2702 4.37936 13.7202L4.00936 16.9602C3.87936 18.1302 4.71936 18.9302 5.87936 18.7302L9.09936 18.1802C9.54936 18.1002 10.1794 17.7702 10.4894 17.4302L18.6994 8.74022C20.1194 7.24022 20.7594 5.53022 18.5494 3.44022C16.3494 1.37022 14.6794 2.10022 13.2594 3.60022Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.8906 5.0498C12.3206 7.8098 14.5606 9.9198 17.3406 10.1998"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3 22H21"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <PortfolioCoinStatistic statistic={"Coin Amount"}>
                <p>{coinAmount}</p>
              </PortfolioCoinStatistic>
              <PortfolioCoinStatistic statistic={"Value Amount"}>
                <p>
                  {handleCurrencySymbol(currentCurrency)}
                  {(
                    purchasedDateData?.market_data?.current_price[
                      currentCurrency
                    ] * coinAmount
                  ).toFixed(3)}
                </p>
              </PortfolioCoinStatistic>
              <PortfolioCoinStatistic
                statistic={"Amount price change since purchase"}
              >
                <p
                  className={`${
                    handlePortfolioCoinPriceChange(
                      purchasedDateData?.market_data?.current_price[
                        currentCurrency
                      ],
                      currentDateData?.market_data?.current_price[
                        currentCurrency
                      ]
                    ) > 100
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {Math.abs(
                    purchasedDateData?.market_data?.current_price[
                      currentCurrency
                    ] -
                      (currentDateData?.market_data?.current_price[
                        currentCurrency
                      ] /
                        purchasedDateData?.market_data?.current_price[
                          currentCurrency
                        ]) *
                        100
                  )}
                  %
                </p>
              </PortfolioCoinStatistic>
              <PortfolioCoinStatistic statistic={"Purchased Date"}>
                <p>{purchaseDate?.split("-").reverse().join(".")}</p>
              </PortfolioCoinStatistic>
            </div>
          </div>
          {showEditModal &&
            createPortal(
              <PortfolioModal
                showModal={showEditModal}
                handleShowModal={handleOpenEditModal}
                currentCoinName={currentDateData.name}
                currentCoinAmount={coinAmount}
                currentPurchaseDate={purchaseDate}
              />,
              document.body
            )}
        </div>
      </div>
    </div>
  );
}
