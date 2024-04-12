export default function handleCoinFilterPoint(graphTimeDuration: number) {
    let filterPoint = null;
    switch(graphTimeDuration) {
        case 0.0416666666666667:
            filterPoint = 1;
        case 1:
            filterPoint = 24;
        case 7:
            filterPoint = 24;
        case 14:
        case 31:
            filterPoint = 25;
        case 365:
            filterPoint = 30;
    }
    return filterPoint;
}