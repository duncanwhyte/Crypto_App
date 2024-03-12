export default function handleCoinDates() {
    const currentTime = new Date();
    const daysMiliseconds = 86400000;
    const pastTime = new Date(currentTime - (daysMiliseconds * 7));
    return [Math.floor(currentTime.getTime() / 1000), Math.floor(pastTime.getTime() / 1000)];
}