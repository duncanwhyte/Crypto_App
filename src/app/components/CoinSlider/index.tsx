import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CoinSlide from "../CoinSlide";
import SliderNextArrow from "../SliderNextArrow/SliderNextArrow";
import  SliderPrevArrow  from "../SliderPrevArrow/SliderPrevArrow";
import { useEffect, useRef } from "react";
import { fetchCoinList } from "@/app/lib/features/coinList/coinListSlice";
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
const selectCoinList = (state) => state.coinList.data;
const selectCurrency = (state) => state.currentCurrency;
 function CoinSlider() {
    const coinList = useAppSelector(selectCoinList);
    const sliderRef = useRef<Slider>(null);
    const currentCurrency = useAppSelector(selectCurrency);
    const dispatch = useAppDispatch();
    const next = () => {
        sliderRef.current.slickNext();
    };
    const prev = () => {
        sliderRef.current.slickPrev();
    };
    const sliderSettings = {
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <SliderNextArrow next={next}/>,
        prevArrow: <SliderPrevArrow prev={prev} />,
        responsive: [
            {
                breakpoint: 1320,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1090,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 860,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    };
    useEffect(() => {
        dispatch(fetchCoinList());
    },[dispatch, currentCurrency]);
    return (
        <div className="mb-10">
        <div className="mb-6">
            <h3>Select the currency to view the statistics</h3>
        </div>
        <div className="">
        <ul className="list-none transition-all relative">
            <Slider ref={(slider: Slider) => {sliderRef.current = slider;}} {...sliderSettings}>
            {coinList.map((coin: Coin) => <CoinSlide key={coin.id} currency={currentCurrency} coinData={coin} />)}
            </Slider>
        </ul>
        </div>
        </div>
    );
}
export default CoinSlider;