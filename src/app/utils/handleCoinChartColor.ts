export default function handleCoinChartColor(
  hexColor: string,
  hexColor2: string
) {
  return (context: any) => {
    if (!context.chart.chartArea) return;
    const {
      ctx,
      chartArea: { top, bottom },
    } = context.chart;
    const gradient = ctx.createLinearGradient(0, top, 0, bottom);
    gradient.addColorStop(0, hexColor);
    gradient.addColorStop(1, hexColor2);
    return gradient;
  };
}
