export default function PortfolioCoinStatistic({ statistic, children }) {
  return (
    <div className="text-center">
      <p>{statistic}</p>
      {children}
    </div>
  );
}
