"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Final data for the Fly Ash Chemical Composition table
const compositionData = [
  { parameter: "SiO₂ + Al₂O₃ + Fe₂O₃", limit: "≥ 70% (by mass)" },
  { parameter: "Reactive SiO₂", limit: "≥ 25% (initial type test)" },
  {
    parameter: "Loss on Ignition (LOI)",
    limit: "≤ 5% (Cat A), ≤ 7% (Cat B), ≤ 9% (Cat C)",
  },
  { parameter: "SO₃ (Sulphate)", limit: "≤ 3.0%" },
  { parameter: "Chloride (Cl⁻)", limit: "≤ 0.10%" },
  { parameter: "Total Alkalis (Na₂Oeq)", limit: "≤ 5.0%" },
  { parameter: "Reactive CaO", limit: "≤ 10%" },
  { parameter: "Free CaO", limit: "≤ 3.0% (requires soundness test if >1.5%)" },
  { parameter: "MgO", limit: "≤ 4.0%" },
  { parameter: "Total P₂O₅ (Phosphate)", limit: "≤ 5.0% (Type test only)" },
  { parameter: "Soluble P₂O₅", limit: "≤ 100 mg/kg (Type test only)" },
];

const FlyAshComposition = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Animation variant for content sliding in from the left
  const slideInFromLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animation variant for content sliding in from the right
  const slideInFromRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section ref={ref} className="bg-slate-50 py-20 md:py-24 overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Fly Ash – Chemical Composition & Specification Limits
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-md md:text-lg text-gray-500 max-w-4xl mx-auto"
          >
            As per ASTM C618 (USA), IS 3812 (India), and BS EN 450-1 (UK)
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Composition Table */}
          <motion.div
            variants={slideInFromLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="rounded-xl border border-slate-200 bg-white shadow-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-100">
                    <TableHead className="text-base font-semibold text-gray-700">
                      Parameter
                    </TableHead>
                    <TableHead className="text-left text-base font-semibold text-gray-700">
                      Limit
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {compositionData.map((item) => (
                    <TableRow
                      key={item.parameter}
                      className="odd:bg-white even:bg-slate-50/50"
                    >
                      <TableCell
                        className="font-medium text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: item.parameter
                            .replace(/(\d+)/g, "<sub>$1</sub>")
                            .replace("⁻", "<sup>-</sup>"),
                        }}
                      />
                      <TableCell className="text-left text-gray-800">
                        {item.limit}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          {/* Fly Ash Image */}
          <motion.div
            variants={slideInFromRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="rounded-xl overflow-hidden shadow-2xl shadow-slate-300/60">
              <Image
                src="/img65.jpg"
                alt="High-quality fly ash powder"
                width={600}
                height={600}
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FlyAshComposition;
