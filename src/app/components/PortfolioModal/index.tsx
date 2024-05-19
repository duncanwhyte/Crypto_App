"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import useSearchCoin from "@/app/hooks/useSearchCoin";
import useFormError from "@/app/hooks/useFormError";
export default function PortfolioModal({
  showModal,
  handleShowModal,
}: {
  showModal: boolean;
  handleShowModal: any;
}) {
  const [modalInputData, setModalInputData] = useState({
    searchCoinValue: "",
    coinAmount: "",
    purchasedDate: "",
  });
  const [selectedCoin, setSelectedCoin] = useState(null);
  const timerRef = useRef();
  const [selectedCoinError, coinAmountError, purchasedDateError] = useFormError(
    selectedCoin,
    modalInputData.coinAmount,
    modalInputData.purchasedDate
  );
  const [searchedCoins, setSearchedCoins] = useSearchCoin(
    modalInputData.searchCoinValue,
    timerRef
  );
  const handleSelectedCoin = (coin) => {
    setSelectedCoin(coin);
    setSearchedCoins(null);
    setModalInputData((prev) => {
      return {
        ...prev,
      };
    });
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
                      src={selectedCoin?.thumb}
                      width={32}
                      height={32}
                      alt="selected-crypto-coin-image"
                    />
                  </div>
                </div>
                <p>
                  {selectedCoin?.name} {selectedCoin?.symbol}
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
                    name="searchCoinValue"
                    className={`bg-[#191925] w-full p-2 mb-4 rounded ${
                      selectedCoinError
                        ? "border-2 border-red-400 border-solid"
                        : "border-2 border-green-400 border-solid"
                    } active:border-none focus:outline-none`}
                    placeholder="Select Coins"
                    value={
                      selectedCoin
                        ? selectedCoin?.name
                        : modalInputData.searchCoinValue
                    }
                    disabled={selectedCoin ? true : false}
                    autoComplete="off"
                  />
                  <ul
                    className={`${
                      searchedCoins ? "opacity-100" : "opacity-0"
                    } bg-[#191925] transition-all absolute z-10 max-h-[250px] w-full overflow-scroll top-10 left-0`}
                  >
                    {searchedCoins &&
                      searchedCoins.map((coin: any) => (
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
                </div>
                <input
                  onChange={handleChange}
                  name="coinAmount"
                  className={`bg-[#191925] p-2 mb-4 rounded ${
                    coinAmountError
                      ? "border-2 border-red-400 border-solid"
                      : "border-2 border-green-400 border-solid"
                  } active:border-none focus:outline-none`}
                  placeholder="Purchased Amount"
                  autoComplete="off"
                  value={modalInputData.coinAmount}
                />
                <input
                  onChange={handleChange}
                  name="purchasedDate"
                  className={`bg-[#191925] p-2 rounded ${
                    purchasedDateError
                      ? "border-2 border-red-400 border-solid"
                      : "border-2 border-green-400 border-solid"
                  } active:border-none focus:outline-none`}
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
                  className={`${
                    checkFormValidation() ? "bg-[#232336]" : "bg-[#6161D6]"
                  } transition-all py-3 p-2 rounded-md basis-[232px]`}
                  disabled={checkFormValidation()}
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
