export default function PortfolioCoinStatistic({
  statistic,
  children,
}: {
  statistic: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center">
      <p>{statistic}</p>
      {children}
    </div>
  );
}
