"use client";
import { useEffect, useState } from "react";
import PortfolioModal from "../components/PortfolioModal";
import { RootState } from "../lib/store";
import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import { updateCurrentCoinData } from "@/app/lib/features/portfolioCoins/portfolioCoinsSlice";
import { callCurrentDateData } from "../lib/features/portfolioCoins/portfolioCoinsSlice";
import PortfolioCoinCard from "../components/PortfolioCoinCard";
import { CoinData, CoinToRender, PortfolioCoin } from "../types/types";
const selectPortfolioCoins = (state: RootState) => state.portfolioCoins.coins;
const selectCurrentPriceData = (state: RootState): CoinData[] =>
  state.portfolioCoins.currentDateData;
interface CoinToEdit {
  uniqueId: number;
  id: string;
  coinAmount: number;
  purchasedDate: string;
  name: string;
  symbol: string;
  large: string;
}
export default function Portfolio() {
  const portfolioCoins: PortfolioCoin[] = useAppSelector(selectPortfolioCoins);
  const currentPriceData: CoinData[] = useAppSelector(selectCurrentPriceData);
  const dispatch = useAppDispatch();
  const [showAssetModal, setShowAssetModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [coinToEdit, setCoinToEdit] = useState<CoinToEdit | null>(null);
  const handleOpenModal = (): void => {
    setShowAssetModal(!showAssetModal);
  };
  const handleCoinToEdit = (coin: CoinToRender): void => {
    if (coin.currentDateData) {
      const coinToSet: CoinToEdit = {
        uniqueId: coin.uniqueId,
        id: coin.purchasedDateData.id,
        coinAmount: coin.coinAmount,
        purchasedDate: coin.purchasedDate,
        name: coin.purchasedDateData.name,
        symbol: coin.purchasedDateData.symbol,
        large: coin.currentDateData.image.large,
      };
      setCoinToEdit(coinToSet);
      handleOpenEditModal();
    }
  };
  const handleOpenEditModal = (): void => {
    setShowEditModal(!showEditModal);
  };
  const handleEditCoin = (
    uniqueId: number,
    id: string,
    coinAmount: number,
    purchasedDate: string
  ): void => {
    dispatch(
      updateCurrentCoinData({
        uniqueId,
        id,
        coinAmount,
        purchasedDate,
      })
    );
    handleOpenEditModal();
    setCoinToEdit(null);
  };
  useEffect(() => {
    dispatch(callCurrentDateData());
  }, [dispatch, portfolioCoins]);
  const coinsToRender: CoinToRender[] =
    portfolioCoins &&
    currentPriceData &&
    portfolioCoins.map((coin: PortfolioCoin): CoinToRender => {
      const newCoin: PortfolioCoin = {
        ...coin,
      };
      currentPriceData.forEach((currentPrice: CoinData) => {
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
            {coinsToRender &&
              coinsToRender
                .filter((coin: CoinToRender) => coin.currentDateData)
                .map((coin: CoinToRender) => {
                  return (
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
                    />
                  );
                })}
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
