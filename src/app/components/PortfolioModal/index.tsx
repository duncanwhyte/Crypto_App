"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import useSearchCoin from "@/app/hooks/useSearchCoin";
import useFormError from "@/app/hooks/useFormError";
import { useAppDispatch } from "@/app/lib/hooks";
import { callPortfolioCoinData } from "@/app/lib/features/portfolioCoins/portfolioCoinsSlice";
import { ModalFormData, SearchedCoin } from "@/app/types/types";
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
  const [modalInputData, setModalInputData] = useState<ModalFormData>({
    searchCoinValue: currentCoinName || "",
    coinAmount: currentCoinAmount.toString() || "",
    purchasedDate: currentPurchaseDate || "",
  });
  const dispatch = useAppDispatch();
  const [selectedCoin, setSelectedCoin] = useState(coinToEdit || null);
  const [coinInputFocused, setCoinInputFocused] = useState(false);
  const timerRef = useRef<number>();
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
  const handleSelectedCoin = (coin: SearchedCoin) => {
    setSelectedCoin(coin);
    previousCoinRef.current = coin;
    setModalInputData((prev): ModalFormData => {
      return {
        ...prev,
        ["searchCoinValue"]: coin.name,
      };
    });
    setCoinInputFocused(false);
    setSearchedCoins(null);
  };
  const handleCoinsFocused = (): void => {
    setCoinInputFocused(true);
  };
  const handleCoinBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setModalInputData((prev) => {
      return {
        ...prev,
        [name]: value,
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
  const handleSaveAsset = (
    coin: SearchedCoin,
    coinAmount: string,
    purchasedDate: string
  ): void => {
    dispatch(
      callPortfolioCoinData({
        coin,
        coinAmount: parseFloat(coinAmount),
        purchasedDate,
      })
    );
    handleShowModal(!showModal);
  };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center backdrop-blur-sm fixed top-0 left-0 z-10">
      <div
        className={`bg-[#FFFFFF] dark:bg-[#13121A] w-[90%] max-w-[375px] lg:w-[888px] lg:max-w-none p-4 lg:p-8 rounded-xl transition-all ${
          showModal ? "translate-0" : "-translate-y-[1000px]"
        }`}
      >
        <div className="flex justify-between mb-8">
          <h2>Select Coins</h2>
          <button onClick={handleShowModal}>(X)</button>
        </div>
        <div className="flex flex-col lg:flex lg:flex-row lg:justify-between">
          <div className="bg-[#CCCCFA] dark:bg-[#191932] h-[226px] lg:h-auto mb-6 lg:mb-0 basis-[40%] rounded-xl">
            {selectedCoin && (
              <div className="bg-[#CCCCFA] dark:bg-[#191932] basis-[40%] mb-6 px-5 py-[30px] lg:w-auto lg:h-auto lg:mb-0 lg:p-0 lg:px-[60px] lg:py-[65px] lg:basis-[40%] lg:mr-6 rounded-xl">
                <div className="flex flex-col items-center">
                  <div className="p-4 rounded-lg">
                    <Image
                      src={selectedCoin.large}
                      width={70}
                      height={70}
                      alt="selected-crypto-coin-image"
                    />
                  </div>
                  <p className="">
                    {selectedCoin.name} {selectedCoin.symbol.toUpperCase()}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="lg:basis-[60%]">
            <form onSubmit={(e) => e.preventDefault()} className="">
              <div className="flex flex-col mb-6">
                <div className="relative">
                  <input
                    onChange={handleChange}
                    onBlur={handleCoinBlur}
                    onFocus={handleCoinsFocused}
                    name="searchCoinValue"
                    className={`bg-[#F3F5F9] dark:bg-[#191925] text-black dark:text-[#FFFFFF] placeholder-black dark:placeholder-[#FFFFFF] dark:placeholder-neutral-400 w-full p-2 mb-4 ${
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
                    <ul className="bg-[#F3F5F9] text-black dark:text-[#FFFFFF] dark:bg-[#191925] transition-all absolute z-10 max-h-[250px] w-[calc(100%-1px)] overflow-scroll top-10 left-0">
                      {searchedCoins &&
                        searchedCoins?.map((coin: SearchedCoin) => (
                          <li
                            onClick={(): void => handleSelectedCoin(coin)}
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
                  className={`bg-[#F3F5F9] dark:bg-[#191925] text-black dark:text-[#FFFFFF] placeholder-black dark:placeholder-[#FFFFFF] p-2 mb-4 rounded ${
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
                  className={`bg-[#F3F5F9] dark:bg-[#191925] text-black dark:text-[#FFFFFF] placeholder-neutral-400 dark:placeholder-[#FFFFFF] p-2 rounded ${
                    purchasedDateError
                      ? "outline-2 outline-red-400 outline"
                      : "outline-2 outline-green-400 outline"
                  } focus:outline-none`}
                  placeholder="Purchased Date"
                  value={modalInputData.purchasedDate}
                  type="date"
                />
              </div>
              <div className="flex gap-4 justify-between">
                <button
                  onClick={handleShowModal}
                  className="bg-[#F3F5F9] dark:bg-[#232336] py-3 rounded-md basis-[40%] lg:basis-[232px]"
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
                    checkFormValidation()
                      ? "bg-[#F3F5F9] dark:bg-[#6161D6]"
                      : "bg-[#CCCCFA] dark:bg-[#232336]"
                  } transition-all rounded-md basis-[60%] p-2 lg:py-3 lg:p-2 lg:basis-[232px]`}
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
