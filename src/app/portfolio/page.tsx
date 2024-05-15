import PortfolioModal from "../components/PortfolioModal";
export default function Portfolio() {
  return (
    <main className="relative">
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl">Portfolio</h1>
          <button className="bg-[#6161D6] px-20 py-3 rounded-xl">
            Add Asset
          </button>
        </div>
        <PortfolioModal />
      </div>
    </main>
  );
}
