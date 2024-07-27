import Image from "next/image";
import CoinName from "../CoinName";
import PortfolioCoinStatistic from "../PortfolioCoinStatistic";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import handlePortfolioCoinPriceChange from "@/app/utils/handlePortfolioCoinPriceChange";
import handleStatisticColor from "@/app/utils/handleStatisticColor";
import handleTableProgressBar from "@/app/utils/handleTableProgressBar";
import EditPortfolioIcon from "../Svgs/EditPortfolioCoinIcon";
import DeletePortfolioCoinIcon from "../Svgs/DeletePortfolioCoinIcon";
import { CoinData, CoinToRender } from "@/app/types/types";
import { RootState } from "@/app/lib/store";
const selectCurrentCurrency = (state: RootState) => state.currentCurrency;
export default function PortfolioCoinCard({
  coin,
  id,
  purchaseDate,
  coinAmount,
  currentDateData,
  purchasedDateData,
  handleCoinToEdit,
}: {
  coin: CoinToRender;
  id: string;
  purchaseDate: string;
  coinAmount: number;
  currentDateData: CoinData;
  purchasedDateData: CoinData;
  showEditModal: boolean;
  handleCoinToEdit: (_coin: CoinToRender) => void;
}) {
  const currentCurrency = useAppSelector(selectCurrentCurrency);
  const dispatch = useAppDispatch();
  const handleRemoveCoin = (coinId: string) => {
    dispatch({ type: "portfolioCoins/removeCoin", payload: coinId });
  };
  return (
    <div>
      <div className="flex flex-col max-w-[343px] md:max-w-[460px] mx-auto mb-6 lg:max-w-none lg:mx-0 lg:flex-row">
        <div className="bg-[#CCCCFA] dark:bg-[#1E1932] px-5 py-5 lg:p-0 lg:px-[25px] lg:py-[25px] flex items-center justify-center rounded-t-3xl lg:rounded-t-none lg:rounded-tl-3xl lg:rounded-bl-3xl basis-[40%] lg:basis-[20%]">
          <div className="flex flex-col items-center">
            <Image
              width={80}
              height={80}
              src={currentDateData?.image?.large}
              alt="portfolio-coin-image"
            />
            <CoinName
              id={currentDateData?.id}
              name={currentDateData?.name}
              symbol={currentDateData?.symbol}
            />
            <p className="text-black dark:text-[#E8E8E8] lg:hidden">
              Purchased {purchaseDate?.split("-").reverse().join(".")}
            </p>
          </div>
        </div>
        <div className="bg-[#FFFFFF] dark:bg-[#191932] text-black dark:text-[#FFFFFF] p-3 lg:p-6 rounded-t-none rounded-b-3xl lg:rounded-l-none lg:rounded-r-3xl basis-[60%] lg:basis-[80%]">
          <div className="flex justify-between mb-4 lg:mb-0">
            <h3 className="text-base text-bold lg:text-xl">Market price</h3>
            <button
              onClick={() => handleRemoveCoin(id)}
              className="bg-red-400 p-2 rounded-md"
            >
              <DeletePortfolioCoinIcon />
            </button>
          </div>
          <div className="flex gap-2 lg:gap-0 mb-6">
            <div className="flex flex-col items-center p-2 lg:p-0 lg:items-start flex-1 border border-black dark:border-[#FFFFFF] rounded-xl lg:border-0">
              <PortfolioCoinStatistic statistic={"Current price"}>
                <p>
                  {handleCurrencySymbol(currentCurrency)}
                  {currentDateData?.market_data?.current_price[
                    currentCurrency
                  ].toFixed(2)}
                </p>
              </PortfolioCoinStatistic>
            </div>
            <div className="hidden lg:flex lg:flex-col lg:items-start lg:flex-1">
              <PortfolioCoinStatistic statistic={"Price change 24h"}>
                <p>
                  {handleCurrencySymbol(currentCurrency)}
                  {currentDateData?.market_data?.price_change_24h.toFixed(2)}
                </p>
              </PortfolioCoinStatistic>
            </div>
            <div className="hidden lg:flex lg:flex-col lg:items-center lg:flex-1">
              <PortfolioCoinStatistic statistic={"Market Cap vs Volume"}>
                <div className="flex items-center">
                  <span>
                    {Math.min(
                      100,
                      (currentDateData?.market_data?.total_volume[
                        currentCurrency
                      ] /
                        currentDateData?.market_data?.market_cap[
                          currentCurrency
                        ]) *
                        100
                    ).toFixed(0)}
                    %
                  </span>
                  <div className="bg-[#F3F5F9] dark:bg-neutral-400 overflow-hidden rounded-xl w-[53px] h-2">
                    <div
                      className="bg-green-400 rounded-xl h-full"
                      style={{
                        width: `${handleTableProgressBar(
                          currentDateData?.market_data?.total_volume[
                            currentCurrency
                          ],
                          currentDateData?.market_data?.market_cap[
                            currentCurrency
                          ]
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </PortfolioCoinStatistic>
            </div>
            <div className="flex flex-col p-2 border border-black dark:border-[#FFFFFF] lg:p-0 lg:border-0 rounded-xl items-center flex-1">
              <PortfolioCoinStatistic statistic={"Profit"}>
                <p
                  className={`${handleStatisticColor(
                    (currentDateData?.market_data?.current_price[
                      currentCurrency
                    ] -
                      purchasedDateData?.market_data?.current_price[
                        currentCurrency
                      ]) *
                      coinAmount
                  )}`}
                >
                  {handleCurrencySymbol(currentCurrency)}
                  {(
                    (currentDateData?.market_data?.current_price[
                      currentCurrency
                    ] -
                      purchasedDateData?.market_data?.current_price[
                        currentCurrency
                      ]) *
                    coinAmount
                  ).toFixed(2)}
                </p>
              </PortfolioCoinStatistic>
            </div>
          </div>
          <hr className="hidden lg:mb-6"></hr>
          <div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base text-bold lg:text-xl">
                  Your coin{coinAmount > 1 && "s"}
                </h3>
                <button
                  onClick={(): void => handleCoinToEdit(coin)}
                  className="bg-[#6161D6] p-2 rounded-md"
                >
                  <EditPortfolioIcon />
                </button>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-0 justify-between">
              <div className="flex flex-col items-center lg:items-start flex-1 p-2 border border-black dark:border-[#FFFFFF] rounded-xl lg:border-0 lg:p-0">
                <PortfolioCoinStatistic statistic={"Coin amount"}>
                  <p>{coinAmount}</p>
                </PortfolioCoinStatistic>
              </div>
              <div className="flex flex-col items-center lg:items-start flex-1 p-2 border border-black dark:border-[#FFFFFF] lg:border-0 rounded-xl lg:p-0">
                <PortfolioCoinStatistic statistic={"Value amount"}>
                  <p>
                    {handleCurrencySymbol(currentCurrency)}
                    {(
                      purchasedDateData?.market_data?.current_price[
                        currentCurrency
                      ] * coinAmount
                    ).toFixed(2)}
                  </p>
                </PortfolioCoinStatistic>
              </div>
              <div className="hidden lg:flex lg:flex-col lg:items-center md:flex-1">
                <PortfolioCoinStatistic statistic={"Change since purchase"}>
                  <p
                    className={`${
                      handlePortfolioCoinPriceChange(
                        purchasedDateData?.market_data?.current_price[
                          currentCurrency
                        ],
                        currentDateData?.market_data?.current_price[
                          currentCurrency
                        ]
                      ) > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {handlePortfolioCoinPriceChange(
                      purchasedDateData?.market_data?.current_price[
                        currentCurrency
                      ],
                      currentDateData?.market_data?.current_price[
                        currentCurrency
                      ]
                    ).toFixed(2)}
                    %
                  </p>
                </PortfolioCoinStatistic>
              </div>
              <div className="hidden lg:flex lg:flex-col lg:items-center lg:flex-1">
                <PortfolioCoinStatistic statistic={"Purchased date"}>
                  <p>{purchaseDate?.split("-").reverse().join(".")}</p>
                </PortfolioCoinStatistic>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
