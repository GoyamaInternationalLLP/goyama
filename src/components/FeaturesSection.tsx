import React from "react";
import Link from "next/link";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Quartz",
    description:
      "Quartz stone slabs are a top choice in modern construction, prized for their strength, style, and low maintenance.Engineered from natural quartz and resins, they offer a sleek, non-porous surface that resists stains, scratches, and moisture.",
    image: "/Quartz_bg.png",
  },
  {
    title: "Fly Ash",
    description:
      "Fly ash is a fine, powder-like material produced during the combustion of pulverized coal in power plants. Rich in silica, alumina, and iron, it is widely used in construction to enhance the strength, durability, and workability of concrete, bricks, and cement.",
    image: "/flyash_bg.png",
  },
];

const FeaturesSection: React.FC = () => (
  <section className="bg-gradient-to-b from-[#18181b] to-[#232329] py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-5xl font-bold text-center mb-12 text-white">
        Our Products
      </h2>

      {/* Flex layout for centered cards */}
      <div className="flex flex-wrap justify-center items-center gap-8">
        {features.map((feature, idx) =>
          feature.title === "Quartz" ? (
            <Link href="/Quartz" key={idx} className="block">
              <FeatureCard {...feature} />
            </Link>
          ) : feature.title === "Fly Ash" ? (
            <Link href="/flyash" key={idx} className="block">
              <FeatureCard {...feature} />
            </Link>
          ) : (
            <FeatureCard key={idx} {...feature} />
          )
        )}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
