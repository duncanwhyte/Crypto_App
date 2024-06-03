"use client";
import { useEffect, useState } from "react";
import PortfolioModal from "../components/PortfolioModal";
import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import { updateCurrentCoinData } from "@/app/lib/features/portfolioCoins/portfolioCoinsSlice";
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
  const [coinToEdit, setCoinToEdit] = useState(null);
  const handleOpenModal = (): void => {
    setShowAssetModal(!showAssetModal);
  };
  const handleCoinToEdit = (coin) => {
    setCoinToEdit(coin);
    handleOpenEditModal();
  };
  const handleOpenEditModal = () => {
    setShowEditModal(!showEditModal);
  };
  const handleEditCoin = (coinId, coinName, amount, date) => {
    dispatch(updateCurrentCoinData({ coinId, coinName, amount, date }));
    handleOpenEditModal();
    setCoinToEdit(null);
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
            {coinsToRender.map((coin) => (
              <PortfolioCoinCard
                coin={coin}
                key={coin.id}
                id={coin.id}
                coinAmount={coin.coinAmount}
                purchaseDate={coin.purchasedDate}
                currentDateData={coin.currentDateData}
                purchasedDateData={coin.purchasedDateData}
                showEditModal={showEditModal}
                handleCoinToEdit={handleCoinToEdit}
                handleOpenEditModal={handleOpenEditModal}
              />
            ))}
          </ul>
        </div>
        {showAssetModal &&
          createPortal(
            <PortfolioModal
              coinToEdit={false}
              edit={false}
              showModal={showAssetModal}
              handleShowModal={handleOpenModal}
              handleEditCoin={false}
              currentCoinName={""}
              currentCoinAmount={""}
              currentPurchaseDate={""}
            />,
            document.body
          )}
        {coinToEdit &&
          showEditModal &&
          createPortal(
            <PortfolioModal
              edit={true}
              coinToEdit={coinToEdit}
              showModal={showEditModal}
              currentCoinName={coinToEdit.purchasedDateData.name}
              currentCoinAmount={coinToEdit.coinAmount}
              currentPurchaseDate={coinToEdit.purchasedDate}
              handleEditCoin={handleEditCoin}
              handleShowModal={handleOpenEditModal}
            />,
            document.body
          )}
      </div>
    </main>
  );
}
