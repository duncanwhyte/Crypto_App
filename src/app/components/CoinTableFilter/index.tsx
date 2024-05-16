import { useState } from "react";
export default function CoinTableFilter() {
  const [showCoinSorts, setShowCoinSorts] = useState(false);
  const handleShowCoinSorts = () => {
    setShowCoinSorts(!showCoinSorts);
  };
  return (
    <div className="p-1 bg-[#232336] w-32 rounded-xl">
      <div
        onClick={handleShowCoinSorts}
        className="bg-[#232336] hover:bg-[#6161D6] text-white flex items-center justify-center cursor-pointer rounded-xl"
      >
        Sort By
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`icon icon-tabler icon-tabler-arrows-sort transition-all ${
            showCoinSorts ? "rotate-180" : "rotate-0"
          }`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="white"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M3 9l4-4l4 4m-4 -4v14" />
          <path d="M21 15l-4 4l-4-4m4 4v-14" />
        </svg>
      </div>
      <div className="relative">
        <ul
          onClick={handleCoinListFilter}
          className={`transition duration-300 p-2 bg-[#232336] w-56 absolute z-10 left-0 top-0 ${
            showCoinSorts ? "flex flex-col" : "hidden"
          }`}
        >
          <li className="flex items-center">
            <input name="sort-type" value="market_cap_asc" type="radio" />
            Market Cap Ascending
          </li>
          <li className="flex items-center">
            <input name="sort-type" value="market_cap_desc" type="radio" />
            Market Cap Descending
          </li>
          <li className="flex items-center">
            <input name="sort-type" value="volume_asc" type="radio" />
            Total Volume Ascending
          </li>
          <li className="flex items-center">
            <input name="sort-type" value="volume_desc" type="radio" />
            Total Volume Descending
          </li>
          <li className="flex items-center">
            <input name="sort-type" value="id_asc" type="radio" />
            ID Ascending
          </li>
          <li className="flex items-center">
            <input name="sort-type" value="id_desc" type="radio" />
            ID Descending
          </li>
        </ul>
      </div>
    </div>
  );
}
