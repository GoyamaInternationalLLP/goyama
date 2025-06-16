"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { products, Product } from "../constants/products";

const categories = [
  "ALL",
  "BASIC SERIES",
  "CALACATTA SERIES",
  "CARRARA SERIES",
  "MULTI EXOTIC SERIES",
];

const CardGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [modalCard, setModalCard] = useState<Product | null>(null);

  const filteredCards =
    selectedCategory === "ALL"
      ? products
      : products.filter((c) => c.category === selectedCategory);

  return (
    <section className="py-8 px-4 bg-white min-h-screen">
      {/* — Filter Bar — */}
      <div className="flex flex-wrap justify-center border-b border-gray-200 pb-4 mb-8">
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

      {/* — Card Grid — */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="relative aspect-[4/3] overflow-hidden rounded-md shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => setModalCard(card)}
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 20vw"
            />
            <div className="absolute bottom-0 left-0 w-full p-3 bg-black bg-opacity-60 text-white">
              <h3 className="font-medium">{card.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* — Modal — */}
      {modalCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
          onClick={() => setModalCard(null)} // Clicking overlay closes modal
        >
          <div
            className="relative bg-white max-w-4xl w-full flex flex-col md:flex-row rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent click inside from closing
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-3xl z-10"
              onClick={() => setModalCard(null)}
            >
              &times;
            </button>

            {/* Left: Large Image */}
            <div className="md:w-7/12 relative">
              <Image
                src={modalCard.image}
                alt={modalCard.title}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-3 bg-black bg-opacity-60 text-white">
                <h3 className="font-medium">{modalCard.title}</h3>
              </div>
            </div>

            {/* Right: Details */}
            <div className="md:w-5/12 p-6 flex flex-col items-center text-center">
              {modalCard.thumbnail && (
                <Image
                  src={modalCard.thumbnail}
                  alt={`${modalCard.title} thumbnail`}
                  width={120}
                  height={120}
                  className="mb-4 rounded"
                />
              )}
              <h2 className="text-xl font-bold mb-2">{modalCard.title}</h2>
              <p className="italic text-gray-700 mb-4">
                {modalCard.description}
              </p>
              <div className="text-sm text-gray-600 mb-4">
                <div>Design: {modalCard.designer}</div>
                {modalCard.supplier && (
                  <div className="whitespace-pre-line mt-1">
                    {modalCard.supplier}
                  </div>
                )}
              </div>
              {modalCard.tags && (
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {modalCard.tags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-6">
                {modalCard.date}
              </div>
              {/* — Enquiry Button — */}
              <Link
                href="/contact"
                className="px-6 py-2 bg-[#b8b49c] text-white rounded-md shadow hover:bg-[#a6a286]"
              >
                Enquiry Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CardGallery;
