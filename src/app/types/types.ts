export interface CoinTableCoin {
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
export interface SearchedCoin {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}
//// Selected Coin Types
export interface SelectedCoinData {
  prices: number[][];
  total_volumes: number[][];
}
export interface SelectedCoin {
  id: string;
  name: string;
  symbol: string;
  total_volume: number;
  current_price: number;
  coinData: SelectedCoinData;
}
///// Portfolio Types
export interface PortfolioCoin {
  uniqueId: number;
  id: string;
  coinAmount: number;
  purchasedDate: string;
  name: string;
  symbol: string;
  large: string;
  purchasedDateData: CoinData;
  currentDateData: CoinData;
}
export interface PortfolioSliceState {
  isLoading: boolean;
  coins: PortfolioCoin[];
  currentDateData: CoinData[];
  error: boolean;
}
export interface CoinData {
  links: { [key: string]: string[] };
  description: { [key: string]: string };
  market_data: MarketData;
  id: string;
  name: string;
  image: { [key: string]: string };
  symbol: string;
}
export interface MarketData {
  ath: { [key: string]: number };
  atl: { [key: string]: number };
  ath_date: { [key: string]: string };
  atl_date: { [key: string]: string };
  circulating_supply: number;
  current_price: { [key: string]: number };
  fully_diluted_valuation: { [key: string]: number };
  total_volume: { [key: string]: number };
  total_supply: number;
  market_cap: { [key: string]: number };
  price_change_24h: number;
  max_supply: number;
}
//// Graph Time Duration Type
interface GraphTimeDuration {
  graphTimeDuration: number;
}
//// Main Redux Global State Types
export interface ReduxGlobalState {
  currentCurrency: string;
  selectedCoins: SelectedCoin[];
  graphTimeDuration: GraphTimeDuration;
}
