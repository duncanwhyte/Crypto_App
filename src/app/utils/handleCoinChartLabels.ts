export default function handleCoinChartLabels(data: any,graphTimeDuration: number) {
    let coinPrices: any = [];
    let coinTotalVolumes: any = [];
    switch(graphTimeDuration) {
        case 0.0416666666666667:
            coinPrices = data.prices;
            coinTotalVolumes = data.total_volumes;
            break;
        case 1:
            coinPrices = data.prices.filter((_ : number[],index : number) => index % 24 === 0);
            coinTotalVolumes = data.total_volumes.filter((_ : number[],index : number) => index % 24 === 0);
            break;
        case 7:
        case 14:
            coinPrices = data.prices.filter((_ : number[],index : number) => index % 24 === 0);
            coinTotalVolumes = data.total_volumes.filter((_ : number[],index : number) => index % 24 === 0);
            break;
        case 31:
            coinPrices = data.prices.filter((_ : number[],index : number) => index % 50 === 0);
            coinTotalVolumes = data.total_volumes.filter((_ : number[],index : number) => index % 50 === 0);
            break;
        case 365:
            coinPrices = data.prices.filter((_ : number[],index : number) => index % 30 === 0);
            coinTotalVolumes = data.total_volumes.filter((_ : number[],index : number) => index % 30 === 0);
            break;
    }
    return [coinPrices, coinTotalVolumes];
}