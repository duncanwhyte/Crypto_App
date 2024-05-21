export default function PortfolioCoinStatistic({ statistic, children }) {
  return (
    <div className="flex flex-col items-center">
      <p>{statistic}</p>
      {children}
    </div>
  );
}
