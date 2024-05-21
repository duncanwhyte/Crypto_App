import Image from "next/image";
import CoinName from "../CoinName";
import PortfolioCoinStatistic from "../PortfolioCoinStatistic";
import { useAppSelector } from "@/app/lib/hooks";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
const selectCurrentCurrency = (state) => state.currentCurrency;
export default function PortfolioCoinCard({
  purchaseDate,
  coinAmount,
  currentDateData,
  purchasedDateData,
}) {
  const currentCurrency = useAppSelector(selectCurrentCurrency);
  return (
    <div>
      <div className="flex">
        <div className="bg-[#2C2C4A] px-[60px] py-[65px] rounded-l-lg">
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
        <div className="bg-[#191932] p-6 rounded-r-lg flex flex-col justify-between w-full">
          <h3 className="text-lg">Market price</h3>
          <div className="flex justify-between">
            <PortfolioCoinStatistic statistic={"Current price"}>
              <p>
                {handleCurrencySymbol(currentCurrency)}
                {currentDateData?.market_data?.current_price[currentCurrency]}
              </p>
            </PortfolioCoinStatistic>
            <PortfolioCoinStatistic statistic={"Price change 24h"}>
              <p>
                {handleCurrencySymbol(currentCurrency)}
                {currentDateData?.market_data?.price_change_24h}
              </p>
            </PortfolioCoinStatistic>
            <PortfolioCoinStatistic
              statistic={"Market Cap vs Volume"}
            ></PortfolioCoinStatistic>
            <PortfolioCoinStatistic statistic={"Circ supply vs max supply"}>
              <p></p>
            </PortfolioCoinStatistic>
          </div>
          <hr></hr>
          <div>
            <h3 className="text-lg">Your Coin</h3>
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
              ></PortfolioCoinStatistic>
              <PortfolioCoinStatistic statistic={"Purchased Date"}>
                <p>{purchaseDate}</p>
              </PortfolioCoinStatistic>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
