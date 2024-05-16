"use client";
import CoinName from "../CoinName";
export default function PortfolioModal() {
  return (
    <div className="bg-[#13121A] xl:w-[888px] p-8">
      <div className="flex justify-between mb-8">
        <h2>Select Coins</h2>
        <button>(X)</button>
      </div>
      <div className="flex justify-between">
        <div className="bg-[#191932] px-[60px] py-[65px] basis-[40%]">
          <div className="bg-[#2C2C4A] p-4 mb-4">
            <CoinName id={"bitcoin"} name={"Bitcoin"} symbol={"btc"} />
          </div>
        </div>
        <div className="basis-[60%]">
          <form className="flex flex-col">
            <input
              className="bg-[#191925] p-2 rounded active:border-none focus:outline-none"
              placeholder="Select Coins"
            />
            <input
              className="bg-[#191925] p-2 rounded active:border-none focus:outline-none"
              placeholder="Purchased Amount"
            />
            <input
              className="bg-[#191925] p-2 rounded active:border-none focus:outline-none"
              placeholder="Purchased Date"
            />
            <div className="flex">
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
