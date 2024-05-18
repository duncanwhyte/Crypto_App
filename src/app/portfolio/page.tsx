"use client";
import { useState } from "react";
import PortfolioModal from "../components/PortfolioModal";
import { createPortal } from "react-dom";
export default function Portfolio() {
  const [showAssetModal, setShowAssetModal] = useState(false);
  const handleOpenModal = (): void => {
    setShowAssetModal(!showAssetModal);
  };
  return (
    <main className="relative">
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl">Portfolio</h1>
          <button
            onClick={handleOpenModal}
            className="bg-[#6161D6] px-20 py-3 rounded-xl"
          >
            Add Asset
          </button>
        </div>
        {showAssetModal &&
          createPortal(
            <PortfolioModal
              handleShowModal={handleOpenModal}
              showModal={showAssetModal}
            />,
            document.body
          )}
      </div>
    </main>
  );
}
