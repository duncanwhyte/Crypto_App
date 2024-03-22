import Image from "next/image";
import bitcoinImg from "@/app/assets/btc.svg";
export default function CoinSlider() {
    return (
        <div>
        <div className="mb-6">
            <h3>Select the currency to view the statistics</h3>
        </div>
        <div>
        <ul className="list-none">
            <li className="bg-[#191925] flex rounded-xl w-60 p-5 hover:bg-[#6161D6] transition-all cursor-pointer">
                <div className="pr-4">
                    <Image className="w-8 h-8" src={bitcoinImg} alt="bitcoin-img" />
                </div>
                <div className="flex flex-col">
                <div>
                    <h3>Bitcoin (BTC)</h3>
                </div>
                <div className="flex justify-between">
                    <h3>$24000 USD</h3>
                    <p>2.35%</p>
                </div>
                </div>
            </li>
        </ul>
        </div>
        </div>
    );
}