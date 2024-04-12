export default function handleCoinDateDisplay(date, graphTimeDuration: number) {
    switch (graphTimeDuration) {
        case 0.0416666666666667:
            return Intl.DateTimeFormat("en-GB", {
                minute: "2-digit",
                second: "2-digit"
            }).format(date);
        case 1:
            return Intl.DateTimeFormat("en-GB", {
                hour: "2-digit",
                minute: "numeric"
            }).format(date);
        case 7:
        case 14:
        case 31:
            return Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "short"
            }).format(date);
        case 365:
            return Intl.DateTimeFormat("en-GB", {
                month: "short"
            }).format(date);
    }
}