export default function PortfolioCoinStatistic({ statistic, children }) {
  return (
    <div className="basis-1/4 ">
      <p>{statistic}</p>
      {children}
    </div>
  );
}
