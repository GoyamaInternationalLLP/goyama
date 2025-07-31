"use client";

import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const mapBackgroundImage = "/globe.png";

const GlobalExportSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const regions = [
    {
      name: "North America",
      coverage: "95% Coverage",
      position: "top-1/4 left-[15%]",
    },
    {
      name: "Europe",
      coverage: "88% Coverage",
      position: "top-[20%] left-[45%]",
    },
    {
      name: "Asia Pacific",
      coverage: "92% Coverage",
      position: "top-1/3 right-[15%]",
    },
    {
      name: "Middle East",
      coverage: "78% Coverage",
      position: "top-1/2 left-[55%]",
    },
    {
      name: "South America",
      coverage: "72% Coverage",
      position: "bottom-1/4 left-[25%]",
    },
    {
      name: "Africa",
      coverage: "65% Coverage",
      position: "bottom-1/4 left-[48%]",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.15,
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
      },
    }),
  };

  return (
    <section ref={ref} className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Our Global Service Network
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            From local communities to international markets, our comprehensive
            logistics network ensures reliable delivery of premium fly ash
            worldwide.
          </motion.p>
        </motion.div>

        {/* World Map with Tags */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative w-full max-w-6xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 mb-20"
        >
          {/* Using Next.js Image component for optimization */}
          <Image
            src={mapBackgroundImage}
            alt="Global Service Network"
            fill
            className="object-cover bg-slate-100"
            onError={(e: any) => {
              e.currentTarget.src =
                "https://placehold.co/1280x720/e2e8f0/64748b?text=Image+Not+Found";
            }}
            priority
          />
          <div className="absolute inset-0 bg-black/10" />

          {regions.map((region, i) => (
            <motion.div
              key={region.name}
              custom={i}
              variants={tagVariants}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${region.position}`}
            >
              <div className="relative">
                <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-lg shadow-lg text-center">
                  <p className="font-bold text-sm text-gray-800">
                    {region.name}
                  </p>
                  <p className="text-xs text-gray-600">{region.coverage}</p>
                </div>
                <div className="absolute left-1/2 -bottom-2 w-4 h-4 bg-white/80 transform -translate-x-1/2 rotate-45 backdrop-blur-md" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Invitation Message / CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
          >
            Partner with a Global Leader
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Join our network of satisfied clients and leverage our global
            expertise for your next project. We provide reliable, on-time
            delivery of high-quality materials, no matter where you are.
          </motion.p>
          <motion.div variants={itemVariants}>
            <a href="/contact">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Request a Quote <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalExportSection;
