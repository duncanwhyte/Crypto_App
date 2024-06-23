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
interface CoinToEdit {
  id: number;
  coinAmount: number;
  purchasedDate: string;
  name: string;
  symbol: string;
  thumb: string;
}
export default function Portfolio() {
  const portfolioCoins = useAppSelector(selectPortfolioCoins);
  const currentPriceData = useAppSelector(selectCurrentPriceData);
  const dispatch = useAppDispatch();
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [coinToEdit, setCoinToEdit] = useState<CoinToEdit | null>(null);
  const handleOpenModal = (): void => {
    setShowAssetModal(!showAssetModal);
  };
  const handleCoinToEdit = (coin) => {
    const coinToSet = {
      uniqueId: coin.uniqueId,
      id: coin.purchasedDateData.id,
      coinAmount: coin.coinAmount,
      purchasedDate: coin.purchasedDate,
      name: coin.purchasedDateData.name,
      symbol: coin.purchasedDateData.symbol,
      thumb: coin.purchasedDateData.image.thumb,
    };
    setCoinToEdit(coinToSet);
    handleOpenEditModal();
  };
  const handleOpenEditModal = () => {
    setShowEditModal(!showEditModal);
  };
  const handleEditCoin = (uniqueId, id, amount, date) => {
    dispatch(updateCurrentCoinData({ uniqueId, id, amount, date }));
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
    <main className="relative px-20">
      <div>
        <div className="flex justify-between mb-6">
          <h1 className="text-[#353570] dark:text-[#FFFFFF] text-2xl">
            Portfolio
          </h1>
          <button
            onClick={handleOpenModal}
            className="bg-[#CCCCFA] dark:bg-[#6161D6] text-[#FFFFFF] px-20 py-3 rounded-xl"
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
              currentCoinName={coinToEdit.name}
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
