export default function handleCoinDates(graphTimeDuration) {
    const currentTime = new Date();
    const daysMiliseconds = 86400000;
    const pastTime = new Date(currentTime - (daysMiliseconds * graphTimeDuration));
    return [Math.floor(currentTime.getTime() / 1000), Math.floor(pastTime.getTime() / 1000)];
}