"use client";
import { useEffect, useState } from "react";
import PortfolioModal from "../components/PortfolioModal";
import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import { callCurrentDateData } from "../lib/features/portfolioCoins/portfolioCoinsSlice";
import PortfolioCoinCard from "../components/PortfolioCoinCard";
const selectPortfolioCoins = (state) => state.portfolioCoins.coins;
const selectCurrentPriceData = (state) => state.portfolioCoins.currentDateData;
export default function Portfolio() {
  const portfolioCoins = useAppSelector(selectPortfolioCoins);
  const currentPriceData = useAppSelector(selectCurrentPriceData);
  const dispatch = useAppDispatch();
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleOpenModal = (): void => {
    setShowAssetModal(!showAssetModal);
  };
  const handleOpenEditModal = () => {
    setShowEditModal(!showEditModal);
  };
  useEffect(() => {
    dispatch(callCurrentDateData());
  }, [dispatch, portfolioCoins]);
  const coinsToRender =
    portfolioCoins &&
    currentPriceData &&
    portfolioCoins.map((coin) => {
      const newCoin = { ...coin };
      currentPriceData.forEach((currentPrice) => {
        if (coin.purchasedDateData.id === currentPrice.id) {
          newCoin["currentDateData"] = currentPrice;
        }
      });
      return newCoin;
    });
  return (
    <main className="relative">
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl">Portfolio</h1>
          <button
            onClick={handleOpenModal}
            className="bg-[#6161D6] px-20 py-3 rounded-xl"
          >
            Add Asset
          </button>
        </div>
        <div>
          <ul>
            {coinsToRender.map(
              ({
                id,
                coinAmount,
                purchasedDate,
                currentDateData,
                purchasedDateData,
              }) => (
                <PortfolioCoinCard
                  key={id}
                  id={id}
                  coinAmount={coinAmount}
                  purchaseDate={purchasedDate}
                  currentDateData={currentDateData}
                  purchasedDateData={purchasedDateData}
                  showEditModal={showEditModal}
                  handleOpenEditModal={handleOpenEditModal}
                />
              )
            )}
          </ul>
        </div>
        {showAssetModal &&
          createPortal(
            <PortfolioModal
              edit={false}
              showModal={showAssetModal}
              handleShowModal={handleOpenModal}
              currentCoinName={""}
              currentCoinAmount={""}
              currentPurchaseDate={""}
            />,
            document.body
          )}
      </div>
    </main>
  );
}
