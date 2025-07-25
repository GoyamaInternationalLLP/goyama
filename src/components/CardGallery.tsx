"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import Slider from "react-slick";
import { products, Product } from "../constants/products";

// const pastelBeigeBg = "bg-[#f5f5dc]";
const categories = [
  "ALL",
  "BASIC SERIES",
  "CALACATTA SERIES",
  "CARRARA SERIES",
  "MULTI EXOTIC SERIES",
];

// ✅ Fallback placeholder for missing image
const PLACEHOLDER_IMAGE = "/placeholder.png";

// ✅ Custom loader to bypass Next.js URL validation
const localLoader = ({ src }: { src: string }) => src;

const CardGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [modalCard, setModalCard] = useState<Product | null>(null);

  const filteredCards =
    selectedCategory === "ALL"
      ? products
      : products.filter((c) => c.category === selectedCategory);

  const CustomArrow = ({
    direction,
    onClick,
  }: {
    direction: "next" | "prev";
    onClick?: () => void;
  }) => (
    <button
      onClick={onClick}
      className={clsx(
        "absolute top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-30 text-white p-2 rounded-full transition-opacity hover:bg-opacity-50",
        direction === "next" ? "right-4" : "left-4"
      )}
      aria-label={direction === "next" ? "Next" : "Previous"}
    >
      {direction === "next" ? "→" : "←"}
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
  };

  function getCardImages(card: Product): string[] {
    const arr: string[] = [];
    if (card.image) arr.push(card.image);
    if (card.thumbnail && card.thumbnail !== card.image)
      arr.push(card.thumbnail);
    while (arr.length < 4) arr.push(card.image || PLACEHOLDER_IMAGE);
    return arr.slice(0, 4);
  }

  function ProductInfoTable({ card }: { card: Product }) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700">Feature</th>
              <th className="px-4 py-3 font-medium text-gray-700">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[
              ["Sizes", card.sizes],
              ["Thickness", card.Thickness],
              ["Finish", card.finish],
              ["Customization", card.customization],
              ["Prefabrication", card.prefabrication],
              ["Application", card.Application],
            ].map(([label, value]) => (
              <tr key={label} className="bg-white hover:bg-gray-10 group">
                <td className="px-4 py-2 font-semibold text-gray-800 group-hover:text-gray-900">
                  {label}
                </td>
                <td className="px-4 py-2 text-gray-600 group-hover:text-gray-800">
                  {value || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      {/* Filter Bar */}
      <div className="flex justify-center mb-8 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={clsx(
              "uppercase text-sm tracking-wider px-4 py-2 mx-2 transition",
              selectedCategory === cat
                ? "text-[#b8b49c] border-b-2 border-[#b8b49c] font-medium"
                : "text-gray-700 hover:text-[#b8b49c]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCards.map((card) => {
          const imageSrc = card.thumbnail || card.image || PLACEHOLDER_IMAGE;

          return (
            <div
              key={card.id}
              onClick={() => setModalCard(card)}
              className="cursor-pointer shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <Image
                src={imageSrc}
                alt={card.title || "Product Image"}
                width={400}
                height={300}
                className="w-full h-48 object-cover object-center rounded-t-lg"
                priority
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold">{card.title}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalCard && (
        <div
          onClick={() => setModalCard(null)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-[72rem] w-full mx-4 flex relative max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={() => setModalCard(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
              aria-label="Close"
            >
              ×
            </button>

            {/* Left: Slider */}
            <div className="w-[55%] p-4 relative">
              <Slider {...sliderSettings}>
                {getCardImages(modalCard).map((img, idx) => (
                  <div key={idx} className="relative w-full h-[28rem]">
                    <Image
                      src={img || PLACEHOLDER_IMAGE}
                      alt={`${modalCard.title} image ${idx + 1}`}
                      fill
                      loader={localLoader}
                      className="object-contain rounded"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Vertical Divider */}
            <div className="border-l border-gray-300"></div>

            {/* Right: Info Panel */}
            <div className="w-[45%] p-6">
              <h2 className="text-3xl font-bold mb-6">{modalCard.title}</h2>
              <ProductInfoTable card={modalCard} />
              <div className="mt-6 flex justify-center">
                <Link
                  href="/contact"
                  className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Enquiry Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardGallery;
