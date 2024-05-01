export function coinNameSort(sortNames: boolean | null) {
    return (a, b) => {
        if (sortNames) {
            return a.name.localeCompare(b.name);
        } else if (sortNames === false) {
            return b.name.localeCompare(a.name);
        }
    };
}
export function coinPriceSort(sortPrices: boolean | null) {
    return (a, b) => {
        if (sortPrices) {
            return a.current_price - b.current_price;
        } else if (sortPrices === false) {
            return b.current_price - a.current_price;
        }
    };
}
export function coinOneHourSort(sortOneHour: boolean | null) {
    return (a, b) => {
        if (sortOneHour) {
            return a.price_change_percentage_1h_in_currency - b.price_change_percentage_1h_in_currency;
        } else if (sortOneHour === false) {
            return b.price_change_percentage_1h_in_currency - a.price_change_percentage_1h_in_currency;
        }
    };
}
export function coinTwentyFourHourSort(sortTwentyFourHour: boolean | null) {
    return (a, b) => {
        if (sortTwentyFourHour) {
            return a.price_change_percentage_24h_in_currency - b.price_change_percentage_24h_in_currency;
        } else if (sortTwentyFourHour === false) {
            return b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency;
        }
    };
}
export function coinSevenDaySort(sortSevenDay) {
    return (a, b) => {
        if (sortSevenDay) {
            return a.price_change_percentage_7d_in_currency - b.price_change_percentage_7d_in_currency;
        } else if (sortSevenDay === false) {
            return b.price_change_percentage_7d_in_currency - a.price_change_percentage_7d_in_currency;
        }
    };
}
export function coinMarketCapSort(sortMarketCap: boolean | null) {
    return (a, b) => {
        if (sortMarketCap) {
            return a.market_cap - b.market_cap;
        } else if (sortMarketCap === false) {
            return b.market_cap - a.market_cap;
        }
    };
}
export function coinTotalSupplySort(sortTotalSupply: boolean | null) {
    return (a, b) => {
        if (sortTotalSupply) {
            return a.total_volume - b.total_volume;
        } else if (sortTotalSupply === false) {
            return b.total_volume - a.total_volume;
        }
    };
}