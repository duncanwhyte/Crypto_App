"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import useSearchCoin from "@/app/hooks/useSearchCoin";
export default function PortfolioModal() {
  const [modalInputData, setModalInputData] = useState({
    searchCoinValue: "",
    coinAmount: 0,
    purchasedDate: null,
  });
  const [selectedCoin, setSelectedCoin] = useState(null);
  const timerRef = useRef();
  const searchedCoins = useSearchCoin(modalInputData.searchCoinValue, timerRef);
  const handleSelectedCoin = (coin) => {
    setSelectedCoin(coin);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalInputData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div className="bg-[#13121A] xl:w-[888px] p-8 rounded-xl absolute">
      <div className="flex justify-between mb-8">
        <h2>Select Coins</h2>
        <button>(X)</button>
      </div>
      <div className="flex justify-between ">
        <div className="bg-[#191932] px-[60px] py-[65px] basis-[40%] mr-6 rounded-xl">
          <div className="bg-[#2C2C4A] flex justify-center p-4 mb-4 rounded-xl">
            {selectedCoin && (
              <Image
                width={32}
                height={32}
                src={selectedCoin?.thumb}
                alt="crypto-coin-image"
              />
            )}
          </div>
          {selectedCoin && (
            <p>
              {selectedCoin?.name} ({selectedCoin?.symbol})
            </p>
          )}
        </div>
        <div className="basis-[60%]">
          <form className="">
            <div className="flex flex-col mb-6">
              <div className="relative">
                <input
                  onChange={handleChange}
                  name="searchCoinValue"
                  className="bg-[#191925] p-2 mb-4 rounded active:border-none focus:outline-none relative"
                  placeholder="Select Coins"
                  value={modalInputData.searchCoinValue}
                />
                <ul
                  className={`${
                    modalInputData.searchCoinValue && searchedCoins
                      ? "opacity-100"
                      : "opacity-0"
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
                name="coinAmount"
                className="bg-[#191925] p-2 mb-4 rounded active:border-none focus:outline-none"
                placeholder="Purchased Amount"
              />
              <input
                name="purchasedDate"
                className="bg-[#191925] p-2 rounded active:border-none focus:outline-none"
                placeholder="Purchased Date"
                type="date"
              />
            </div>
            <div className="flex justify-between">
              <button className="bg-[#232336] py-3 rounded-md basis-[232px]">
                Cancel
              </button>
              <button className="bg-[#6161D6] py-3 p-2 rounded-md basis-[232px]">
                Save and Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
