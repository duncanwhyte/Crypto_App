export default function PortfolioCoinStatistic({
  statistic,
  children,
}: {
  statistic: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col-reverse items-center lg:flex-col">
      <p>{statistic}</p>
      {children}
    </div>
  );
}
