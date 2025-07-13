"use client";

import React, { useState } from "react";
import KitchenCanvas from "./KitchenCanvas";
import MarbleCanvas from "./MarbleCanvas";
import ModelOverlay from "./ModelOverlay";

const Guide: React.FC = () => {
  // const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const fullText = `
    Goyama International was founded by two partners united by a shared vision: to bridge gaps in global construction supply chains with innovation, reliability, and deep industry insight. One partner brings hands-on experience from the U.S. construction market; the other offers in-depth knowledge of India’s engineering landscape. Together, we collaborate with a trusted network of manufacturers and fabricators to source, customize, and deliver high-quality materials that exceed client expectations across borders.

    Our mission is simple—make international procurement seamless, responsive, and future-ready. We don’t just trade materials; we build partnerships, deliver turnkey solutions, and drive innovation throughout the global construction ecosystem.
  `.trim();

  // const previewText = fullText.slice(0, 200).trim() + "…";

  // Dummy submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Download action: open brochure link
    window.open("https://drive.google.com/drive/folders/16OYn4ih_SoqvZ0eGDmRz45jkmzkThHeG", "_blank");
    setModalOpen(false);
  };

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-screen flex gap-8 h-[60vh]">
        {/* LEFT COLUMN: Text */}
        {/* <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Global Trade, Local Expertise – That’s Goyama International
          </h2>

          <p className="text-gray-700 leading-relaxed">{expanded ? fullText : previewText}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-yellow-600 font-medium hover:underline focus:outline-none"
            >
              {expanded ? "Show Less ↑" : "Read More ↓"}
            </button>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center px-5 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none"
            >
              <span className="mr-2">📄</span>
              Download Brochure
            </button>
          </div>
        </div> */}

        {/* RIGHT COLUMN: Optimized Image */}
        {/* <div className="flex justify-center w-full h-[60vh] lg:justify-end"> */}
        {/* <Image
            src="/img49.png"
            alt="Container ship and global map"
            width={520}
            height={200}
            className="rounded-lg shadow-md"
            priority
          /> */}
        <ModelOverlay>
          <MarbleCanvas />
        </ModelOverlay>

        <ModelOverlay>
          <KitchenCanvas />
        </ModelOverlay>
        {/* </div> */}
      </div>

      {/* Modal */}
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

export default Guide;
