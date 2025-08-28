"use client";

import { useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { Button } from "./ui/button";
import ImageSlider from "./ui/image-slider";
import { COLLECTION_ITEMS } from "@/constants";

interface CampProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  peopleJoined: string;
}

export const CampSite = ({ backgroundImage, title, subtitle }: CampProps) => {
  return (
    <div className={`h-[70vh] w-full min-w-[900px] ${backgroundImage} bg-cover object-cover bg-no-repeat`}>
      <div className="flex h-full flex-col items-start justify-between p-6 lg:px-20 lg:py-10">
        <div className="flexCenter gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="bold-18 text-white">{title}</h4>
            <p className="regular-14 text-white">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Camp = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Download action: open brochure link
    window.open("https://drive.google.com/drive/folders/16OYn4ih_SoqvZ0eGDmRz45jkmzkThHeG", "_blank");
    setModalOpen(false);
  };

  return (
    <section
      className="py-10"
      // className="2xl:max-container relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20"
    >
      {/* Heading */}
      <h2 className="text-center text-black text-5xl font-bold mb-8">Collections</h2>

      {/* Scrollable Camp Sites */}
      <div className="h-[340px] lg:h-[400px] xl:h-[600px]">
        {/* <InfiniteMovingCards
          items={[]}
          speed="slow"
        /> */}
        <ImageSlider collections={COLLECTION_ITEMS} />
      </div>

      <div className="bg-amber-50 flex flex-col gap-10 py-10 justify-center items-center mt-10">
        <h1 className="font-extrabold text-goyama-blue text-3xl">Dowload our brochure now</h1>
        <Button
          onClick={() => setModalOpen(true)}
          size="lg"
          className="inline-flex text-lg items-center px-5 py-2 bg-goyama-yellow text-white rounded-none hover:bg-yellow-600 focus:outline-none"
        >
          <span className="mr-2">📄</span>
          Download Brochure
        </Button>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative bg-white w-full max-w-md mx-auto rounded-xl shadow-lg p-8"
            style={{ minHeight: 520 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-3xl text-black hover:text-gray-600 z-10"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6">Download Our Brochure And Discover More...</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-xs font-semibold mb-1">NAME</label>
                <input
                  className="w-full border-b outline-none py-2 px-1 text-base"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold mb-1">EMAIL</label>
                <input
                  type="email"
                  className="w-full border-b outline-none py-2 px-1 text-base"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold mb-1">PHONE</label>
                <input
                  className="w-full border-b outline-none py-2 px-1 text-base"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold mb-1">LOCATION</label>
                <input
                  className="w-full border-b outline-none py-2 px-1 text-base"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-xs font-semibold mb-1">MESSAGE</label>
                <textarea
                  rows={2}
                  className="w-full border-b outline-none py-2 px-1 text-base resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-2 rounded mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Camp;
