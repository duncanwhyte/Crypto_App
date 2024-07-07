export default function CoinStatisticCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#1E1932] rounded-xl max-w-[560px] mb-4 mx-auto px-8 py-10 xl:mb-0 xl:mx-0 xl:max-w-none xl:basis-[calc(50%-12px)]">
      {children}
    </div>
  );
}
