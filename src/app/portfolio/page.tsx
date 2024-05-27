"use client";
import { useEffect, useState } from "react";
import PortfolioModal from "../components/PortfolioModal";
import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import { callCurrentDateData } from "../lib/features/portfolioCoins/portfolioCoinsSlice";
import PortfolioCoinCard from "../components/PortfolioCoinCard";
const selectPortfolioCoins = (state) => state.portfolioCoins.coins;
export default function Portfolio() {
  const portfolioCoins = useAppSelector(selectPortfolioCoins);
  const dispatch = useAppDispatch();
  const [showAssetModal, setShowAssetModal] = useState(false);
  const handleOpenModal = (): void => {
    setShowAssetModal(!showAssetModal);
  };
  useEffect(() => {
    if (portfolioCoins.length === 0) {
      return;
    }
    dispatch(callCurrentDateData());
  }, [portfolioCoins]);
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
            {portfolioCoins.map(
              ({
                id,
                coinAmount,
                purchasedDate,
                currentDateData,
                purchasedDateData,
              }) => (
                <PortfolioCoinCard
                  key={id}
                  coinAmount={coinAmount}
                  purchaseDate={purchasedDate}
                  currentDateData={currentDateData}
                  purchasedDateData={purchasedDateData}
                />
              )
            )}
          </ul>
        </div>
        {showAssetModal &&
          createPortal(
            <PortfolioModal
              handleShowModal={handleOpenModal}
              showModal={showAssetModal}
            />,
            document.body
          )}
      </div>
    </main>
  );
}
