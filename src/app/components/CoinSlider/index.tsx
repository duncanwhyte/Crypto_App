"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CoinSlide from "../CoinSlide";
import { useRef } from "react";
import { SliderNextArrow, SliderPrevArrow } from "../SliderArrows/SliderArrows";
import { fetchCoinData } from "@/app/lib/features/selectedCoins/selectedCoinsSlice";
import { RootState } from "@/app/lib/store";
import useWindowWidth from "@/app/hooks/useWindowWidth";
interface Coin {
  name: string;
  id: string;
  image: string;
  symbol: string;
  current_price: number;
  total_volume: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}
const selectCoinList = (state: RootState): Coin[] => state.coinList.data;
const selectUserCoins = (state: RootState): Coin[] =>
  state.selectedCoins.selectedCoins;
const selectCurrency = (state: RootState) => state.currentCurrency;
function CoinSlider() {
  const coinList = useAppSelector(selectCoinList);
  const [coin1, coin2, coin3] = useAppSelector(selectUserCoins);
  const windowWidth = useWindowWidth();
  const sliderRef = useRef<Slider | null>(null);
  const currentCurrency: string = useAppSelector(selectCurrency);
  const dispatch = useAppDispatch();
  const handleAddCoin = (coin: Coin): void => {
    if (
      coin.id === coin1?.id ||
      coin.id === coin2?.id ||
      coin.id === coin3?.id
    ) {
      dispatch({ type: "selectedCoins/deselectCoin", payload: coin.id });
      return;
    }
    dispatch(fetchCoinData(coin));
  };
  const next = (): void => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const prev = (): void => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const sliderSettings = {
    speed: 300,
    slidesToShow: windowWidth >= 1024 ? 4 : 3,
    nextArrow:
      windowWidth >= 768 ? (
        <SliderNextArrow chartArrow={false} next={next} />
      ) : (
        <></>
      ),
    prevArrow:
      windowWidth >= 768 ? (
        <SliderPrevArrow chartArrow={false} prev={prev} />
      ) : (
        <></>
      ),
  };
  return (
    <div className="mb-10">
      <div className="mb-6">
        <h3>Select the currency to view the statistics</h3>
      </div>
      <div className="">
        <ul className="list-none transition-all lg:overflow-visible relative">
          <Slider
            ref={(slider: Slider) => {
              sliderRef.current = slider;
            }}
            {...sliderSettings}
          >
            {coinList.map((coin: Coin) => (
              <CoinSlide
                selected={
                  coin.id === coin1?.id ||
                  coin.id === coin2?.id ||
                  coin.id === coin3?.id
                }
                handleAddCoin={handleAddCoin}
                key={coin.id}
                currency={currentCurrency}
                coinData={coin}
              />
            ))}
          </Slider>
        </ul>
      </div>
    </div>
  );
}
export default CoinSlider;
