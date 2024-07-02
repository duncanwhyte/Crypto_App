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
      <div className="flex mb-6">
        <div className="bg-[#CCCCFA] dark:bg-[#1E1932] px-[25px] py-[25px] flex items-center justify-center rounded-l-3xl basis-[20%]">
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
          </div>
        </div>
        <div className="bg-[#FFFFFF] dark:bg-[#191932] text-black dark:text-[#FFFFFF] p-6 rounded-r-3xl basis-[80%]">
          <div className="flex justify-between">
            <h3 className="text-xl text-bold">Market price</h3>
            <button
              onClick={() => handleRemoveCoin(id)}
              className="bg-red-400 p-2 rounded-md"
            >
              <DeletePortfolioCoinIcon />
            </button>
          </div>
          <div className="flex mb-6">
            <div className="flex flex-col items-start flex-1">
              <PortfolioCoinStatistic statistic={"Current price"}>
                <p>
                  {handleCurrencySymbol(currentCurrency)}
                  {currentDateData?.market_data?.current_price[
                    currentCurrency
                  ].toFixed(2)}
                </p>
              </PortfolioCoinStatistic>
            </div>
            <div className="flex flex-col items-start flex-1">
              <PortfolioCoinStatistic statistic={"Price change 24h"}>
                <p>
                  {handleCurrencySymbol(currentCurrency)}
                  {currentDateData?.market_data?.price_change_24h.toFixed(2)}
                </p>
              </PortfolioCoinStatistic>
            </div>
            <div className="flex flex-col items-center flex-1">
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
            <div className="flex flex-col items-center flex-1">
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
          <hr className="mb-6"></hr>
          <div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl text-bold">
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
            <div className="flex justify-between">
              <div className="flex flex-col items-start flex-1">
                <PortfolioCoinStatistic statistic={"Coin amount"}>
                  <p>{coinAmount}</p>
                </PortfolioCoinStatistic>
              </div>
              <div className="flex flex-col items-start flex-1">
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
              <div className="flex flex-col items-center flex-1">
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
              <div className="flex flex-col items-center flex-1">
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
