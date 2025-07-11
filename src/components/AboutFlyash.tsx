import Image from "next/image";
import React from "react";

const sections = [
  {
    title: "What is Fly Ash?",
    description:
      "Fly ash is a fine, powder-like material produced during the combustion of pulverized coal in power plants. Rich in silica, alumina, and iron, it is widely used in construction to enhance the strength, durability, and workability of concrete, bricks, and cement. As an eco-friendly material, fly ash plays a key role in recycling industrial byproducts and promoting sustainable building practices.",
    imgSrc: "/img-57.png", // replace with your image path
    imgAlt: "Available sizes diagram",
    reverse: false,
  },
  {
    title: "Benefits of Fly Ash",
    description:
      "We recommend a minimum 1/8″ radius on both the top and bottom of any edge. For high-traffic areas, a 1/4″ radius is best for added safety and durability.",
    imgSrc: "/img-59.png", // replace with your image path
    imgAlt: "Edge profiles diagram",
    reverse: true,
  },
];

export default function AboutFlyash() {
  return (
    <div className="bg-white">
      {sections.map(({ title, description, imgSrc, imgAlt, reverse }, idx) => (
        <section
          key={idx}
          className={`container mx-auto px-4 py-12 flex flex-col ${
            reverse ? "md:flex-row-reverse" : "md:flex-row"
          } items-center gap-8`}
        >
          {/* Image */}
          <div className="w-full md:w-1/2 flex-shrink-0">
            <Image
              src={imgSrc}
              alt={imgAlt}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
