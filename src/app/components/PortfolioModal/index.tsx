"use client";
import CoinName from "../CoinName";
export default function PortfolioModal() {
  return (
    <div className="bg-[#13121A] xl:w-[888px] p-8">
      <div className="flex justify-between mb-8">
        <h2>Select Coins</h2>
        <button>(X)</button>
      </div>
      <div className="flex">
        <div className="bg-[#191932] px-[60px] py-[65px]">
          <div className="bg-[#2C2C4A] p-4 mb-4">
            <CoinName id={"bitcoin"} name={"Bitcoin"} symbol={"btc"} />
          </div>
        </div>
        <div>
          <form>
            <input className="" placeholder="Select Coins" />
            <input className="" placeholder="Purchased Amount" />
            <input className="" placeholder="Purchased Date" />
            <div className="flex">
              <button className="bg-[] basis-[232px]">Cancel</button>
              <button className="bg-[] basis-[232px]">Save and Continue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
