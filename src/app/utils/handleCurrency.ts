export default function handleCurrency(number: number) {
    if (number >= 1.0e+9) {
        return `${(number / 1.0e+9).toFixed(2)}  B`;
    } 
    if (number >= 1.0e+6) {
        return `${(number / 1.0e+6).toFixed(2)} M`;
    } else {
        return number;
    }
}