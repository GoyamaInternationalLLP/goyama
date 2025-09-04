"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Data for the Quartz Technical Specifications table
const specificationsData = [
  { item: "Water Absorptions", standard: "ASTM C 97 - 09", result: "0.03%" },
  { item: "MOH Hardness", standard: "IS13630 - 13", result: "7" },
  {
    item: "Compressive Strength (N/mm²)",
    standard: "ASTM C 170",
    result: "135-160",
  },
  {
    item: "Thermal Shock Resistance",
    standard: "ASTM C 484",
    result: "Ten Cycle Pass",
  },
  {
    item: "Modulus of Rupture (N/mm²)",
    standard: "ASTM C 99",
    result: "40-60",
  },
  {
    item: "Moisture Absorption",
    standard: "ASTM C 97",
    result: "No moisture found",
  },
  { item: "Abrasion Resistance", standard: "ASTM C 1253", result: "47 cu mm" },
  { item: "Density", standard: "ASTM C 373", result: "2.4 to 2.7" },
  { item: "Cigarette Test", standard: "ASTM Z 1246", result: "Unaffected" },
  { item: "Stain Resistance", standard: "ASTM Z 1246", result: "Unaffected" },
  { item: "Wear Resistance", standard: "ASTM Z 1246", result: "Unaffected" },
  {
    item: "Thermal Expansion",
    standard: "ASTM C 531",
    result: "1.11 x 10⁻⁵ inch / F",
  },
  {
    item: "Chemical Resistance",
    standard: "ASTM C 650",
    result: "No change observed after 2 days",
  },
  {
    item: "De-icing Resistance",
    standard: "ASTM C 672",
    result: "No change observed",
  },
  {
    item: "Freeze-Thaw Resistance",
    standard: "ASTM C 1026",
    result: "Pass no change observed after 15 cycles",
  },
  {
    item: "Surface Buring Characteristics",
    standard: "ASTM E 84",
    result: "Class A-1",
  },
];

const QuartzSpecifications = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Animation variant for content sliding up
  const slideInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section ref={ref} className="bg-slate-50 py-20 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Engineered for Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover the superior physical and mechanical properties of our
            premium quartz surfaces. Each slab is meticulously tested to meet
            the highest industry standards for durability and beauty.
          </motion.p>
        </div>

        {/* Specifications Table */}
        <motion.div
          variants={slideInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-xl border border-slate-200 bg-white shadow-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100/80">
                  <TableHead className="w-[40%] text-base font-semibold text-gray-700">
                    Items
                  </TableHead>
                  <TableHead className="w-[35%] text-base font-semibold text-gray-700">
                    Standard
                  </TableHead>
                  <TableHead className="w-[25%] text-left text-base font-semibold text-gray-700">
                    Result
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specificationsData.map((spec) => (
                  <TableRow
                    key={spec.item}
                    className="odd:bg-white even:bg-slate-50/70"
                  >
                    <TableCell
                      className="font-medium text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: spec.item
                          .replace(/(\d+)/g, "<sup>$1</sup>")
                          .replace("⁻⁵", "<sup>-5</sup>"),
                      }}
                    />
                    <TableCell className="text-gray-800">
                      {spec.standard}
                    </TableCell>
                    <TableCell className="text-left text-gray-800">
                      {spec.result}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuartzSpecifications;
