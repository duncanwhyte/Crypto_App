"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import useSearchCoin from "@/app/hooks/useSearchCoin";
import useFormError from "@/app/hooks/useFormError";
import { useAppDispatch } from "@/app/lib/hooks";
import { callPortfolioCoinData } from "@/app/lib/features/portfolioCoins/portfolioCoinsSlice";
export default function PortfolioModal({
  coinToEdit,
  edit,
  showModal,
  handleShowModal,
  handleEditCoin,
  currentCoinName,
  currentCoinAmount,
  currentPurchaseDate,
}: {
  coinToEdit: any;
  edit: boolean;
  showModal: boolean;
  handleShowModal: any;
  handleEditCoin: any;
  currentCoinName: string;
  currentCoinAmount: number | string;
  currentPurchaseDate: string;
}) {
  const [modalInputData, setModalInputData] = useState({
    searchCoinValue: currentCoinName || "",
    coinAmount: currentCoinAmount || "",
    purchasedDate: currentPurchaseDate || "",
  });
  const dispatch = useAppDispatch();
  const [selectedCoin, setSelectedCoin] = useState(coinToEdit || null);
  const [coinInputFocused, setCoinInputFocused] = useState(false);
  const timerRef = useRef();
  const previousCoinRef = useRef(coinToEdit || null);
  const [selectedCoinError, coinAmountError, purchasedDateError] = useFormError(
    selectedCoin,
    modalInputData.coinAmount,
    modalInputData.purchasedDate
  );
  const [searchedCoins, setSearchedCoins] = useSearchCoin(
    modalInputData.searchCoinValue,
    coinInputFocused,
    timerRef
  );
  const handleSelectedCoin = (coin) => {
    setSelectedCoin(coin);
    previousCoinRef.current = coin;
    setModalInputData((prev) => {
      return {
        ...prev,
        ["searchCoinValue"]: coin.name,
      };
    });
    setCoinInputFocused(false);
    setSearchedCoins(null);
  };
  const handleCoinsFocused = () => {
    setCoinInputFocused(true);
  };
  const handleCoinBlur = (e) => {
    if (!previousCoinRef.current) {
      return;
    } else if (previousCoinRef.current.name !== e.target.value) {
      setModalInputData((prev) => {
        return {
          ...prev,
          searchCoinValue: previousCoinRef.current.name,
        };
      });
    }
    setCoinInputFocused(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let number: undefined | number;
    if (name === "coinAmount") {
      number = parseFloat(value);
    }
    setModalInputData((prev) => {
      return {
        ...prev,
        [name]: number ? number : value,
      };
    });
  };
  const checkFormValidation = (): boolean => {
    if (
      selectedCoin &&
      modalInputData.coinAmount &&
      modalInputData.purchasedDate
    ) {
      return false;
    } else {
      return true;
    }
  };
  const handleSaveAsset = (coin, coinAmount, purchasedDate) => {
    dispatch(
      callPortfolioCoinData({
        coin,
        coinAmount: coinAmount,
        purchasedDate,
      })
    );
    handleShowModal(!showModal);
  };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center backdrop-blur-sm fixed top-0 left-0 z-10">
      <div
        className={`bg-[#13121A] w-[888px] p-8 rounded-xl transition-all ${
          showModal ? "translate-0" : "-translate-y-[1000px]"
        }`}
      >
        <div className="flex justify-between mb-8">
          <h2>Select Coins</h2>
          <button onClick={handleShowModal}>(X)</button>
        </div>
        <div className="flex justify-between">
          <div className="bg-[#191932] px-[60px] py-[65px] basis-[40%] mr-6 rounded-xl">
            {selectedCoin && (
              <div className="flex flex-col items-center">
                <div className="bg-[#2C2C4A] p-4 max-w-[64px] rounded-lg">
                  <div>
                    <Image
                      src={selectedCoin.thumb}
                      width={32}
                      height={32}
                      alt="selected-crypto-coin-image"
                    />
                  </div>
                </div>
                <p>
                  {selectedCoin.name} {selectedCoin.symbol.toUpperCase()}
                </p>
              </div>
            )}
          </div>
          <div className="basis-[60%]">
            <form onSubmit={(e) => e.preventDefault()} className="">
              <div className="flex flex-col mb-6">
                <div className="relative">
                  <input
                    onChange={handleChange}
                    onBlur={handleCoinBlur}
                    onFocus={handleCoinsFocused}
                    name="searchCoinValue"
                    className={`bg-[#191925] w-full p-2 mb-4 ${
                      selectedCoinError
                        ? "outline-2 outline-red-400 outline"
                        : "outline-2 outline-green-400 outline"
                    } ${
                      searchedCoins ? "rounded-t" : "rounded"
                    } focus:outline-none`}
                    placeholder="Select Coins"
                    value={modalInputData.searchCoinValue}
                    autoComplete="off"
                  />
                  {searchedCoins && (
                    <ul className="bg-[#191925] transition-all absolute z-10 max-h-[250px] w-[calc(100%-1px)] overflow-scroll top-10 left-0">
                      {searchedCoins.map((coin: any) => (
                        <li
                          onClick={() => handleSelectedCoin(coin)}
                          id={coin.id}
                          className="flex cursor-pointer"
                          key={coin.id}
                        >
                          <Image
                            src={coin.thumb}
                            width={24}
                            height={24}
                            alt="crypto-coin-image"
                          />
                          <p>
                            {coin.name} {coin.symbol.toUpperCase()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <input
                  onChange={handleChange}
                  name="coinAmount"
                  className={`bg-[#191925] p-2 mb-4 rounded ${
                    coinAmountError
                      ? "outline-2 outline-red-400 outline"
                      : "outline-2 outline-green-400 outline"
                  } focus:outline-none`}
                  placeholder="Purchased Amount"
                  autoComplete="off"
                  value={modalInputData.coinAmount}
                />
                <input
                  onChange={handleChange}
                  name="purchasedDate"
                  className={`bg-[#191925] p-2 rounded ${
                    purchasedDateError
                      ? "outline-2 outline-red-400 outline"
                      : "outline-2 outline-green-400 outline"
                  } focus:outline-none`}
                  placeholder="Purchased Date"
                  value={modalInputData.purchasedDate}
                  type="date"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleShowModal}
                  className="bg-[#232336] py-3 rounded-md basis-[232px]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    edit
                      ? handleEditCoin(
                          coinToEdit.uniqueId,
                          selectedCoin.id,
                          modalInputData.coinAmount,
                          modalInputData.purchasedDate
                        )
                      : handleSaveAsset(
                          selectedCoin,
                          modalInputData.coinAmount,
                          modalInputData.purchasedDate
                        );
                  }}
                  className={`${
                    checkFormValidation() ? "bg-[#232336]" : "bg-[#6161D6]"
                  } transition-all py-3 p-2 rounded-md basis-[232px]`}
                  disabled={
                    !selectedCoinError &&
                    !coinAmountError &&
                    !purchasedDateError
                      ? false
                      : true
                  }
                >
                  Save and Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
