"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Building,
  Hammer,
  Truck,
  Construction,
  Factory,
  Home,
  TreePine,
  Waves,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const IndustriesSection = () => {
  // Hook to detect when the component is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation will trigger only once
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  // Data for the industry cards with color gradients
  const industries = [
    {
      icon: Building,
      title: "Cement Manufacturing",
      description:
        "High-quality fly ash for cement production, improving strength and reducing environmental impact.",
      applications: ["Portland cement", "Blended cement", "Masonry cement"],
      color: "from-blue-500/20 to-cyan-500/20",
      shadow: "shadow-cyan-500/10",
    },
    {
      icon: Hammer,
      title: "Ready-Mix Concrete",
      description:
        "Premium fly ash for concrete production with superior performance characteristics.",
      applications: [
        "High-strength concrete",
        "Self-compacting concrete",
        "Precast elements",
      ],
      color: "from-slate-500/20 to-gray-500/20",
      shadow: "shadow-gray-500/10",
    },
    {
      icon: Construction,
      title: "Infrastructure Projects",
      description:
        "Specialized materials for large-scale infrastructure and civil engineering projects.",
      applications: ["Bridges", "Highways", "Airports", "Metro systems"],
      color: "from-emerald-500/20 to-green-500/20",
      shadow: "shadow-green-500/10",
    },
    {
      icon: Home,
      title: "Construction Industry",
      description:
        "Sustainable building materials for residential and commercial construction.",
      applications: [
        "High-rise buildings",
        "Housing projects",
        "Commercial complexes",
      ],
      color: "from-orange-500/20 to-amber-500/20",
      shadow: "shadow-amber-500/10",
    },
  ];

  // Animation variants for the container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for individual items
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="industries"
      className="py-20 md:py-24 bg-slate-900 bg-grid-pattern-dark"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Industries We Serve
            </Badge>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Powering Global Industries
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto"
          >
            Our premium fly ash and industrial materials serve diverse sectors
            worldwide, enabling sustainable construction and infrastructure
            development.
          </motion.p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.title}
              variants={itemVariants}
              className="h-full"
            >
              <Card
                className={`
                h-full flex flex-col group relative overflow-hidden
                bg-slate-800/50 border border-slate-700
                transition-all duration-300 hover:-translate-y-2
                hover:border-slate-600 hover:shadow-2xl ${industry.shadow}
              `}
              >
                <div
                  className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${industry.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${industry.color}`}
                    >
                      <industry.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <CardTitle className="text-xl text-white">
                    {industry.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col justify-between pt-0">
                  <CardDescription className="text-slate-400 mb-6">
                    {industry.description}
                  </CardDescription>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-300"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* CSS for the background grid pattern */}
      <style>{`
        .bg-grid-pattern-dark {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
};

export default IndustriesSection;
