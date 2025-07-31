"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Building2, Globe, Award, Users } from "lucide-react";

const BusinessOverviewSection = () => {
  // Hook to detect when the component is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation will trigger only once
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  // Animation variants for the container to stagger children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // Animation variants for the title and cards
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Data for the feature cards with new gradient styles
  const cards = [
    {
      icon: Building2,
      title: "Industrial Excellence",
      description:
        "Leading manufacturer and supplier of premium industrial materials with state-of-the-art facilities and cutting-edge technology.",
      gradient: "from-blue-400/30 to-cyan-400/30",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Serving customers across 50+ countries with reliable supply chains and international quality standards.",
      gradient: "from-emerald-400/30 to-teal-400/30",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description:
        "ISO certified processes ensuring consistent quality and reliability in every product we deliver.",
      gradient: "from-amber-400/30 to-orange-400/30",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description:
        "Dedicated to building long-term partnerships through exceptional service and customized solutions.",
      gradient: "from-purple-400/30 to-pink-400/30",
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={cardVariants}
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            Our Business Vision
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Transforming industries through innovative materials and sustainable
            solutions.
          </motion.p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative"
            >
              <div
                className={`
                  relative h-full p-8 rounded-2xl border border-border/10
                  bg-gradient-to-br ${card.gradient}
                  backdrop-blur-sm
                  transform-gpu transition-all duration-500
                  hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10
                  perspective-1000
                `}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Card Content */}
                <div className="relative z-10">
                  <div className="mb-6">
                    <div
                      className={`
                      w-16 h-16 rounded-xl bg-gray-800
                      flex items-center justify-center
                      shadow-lg shadow-black/20
                      transform transition-transform duration-500
                      group-hover:rotate-12 group-hover:scale-110
                    `}
                    >
                      <card.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {card.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div className="absolute w-2 h-2 bg-white/10 rounded-full animate-float-1 top-4 right-4"></div>
                  <div className="absolute w-1 h-1 bg-white/5 rounded-full animate-float-2 bottom-6 left-6"></div>
                  <div className="absolute w-1.5 h-1.5 bg-white/5 rounded-full animate-float-3 top-1/2 left-4"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Custom animations for floating particles */}
      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -10px) rotate(120deg); }
          66% { transform: translate(-5px, 5px) rotate(240deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-8px, -8px) rotate(180deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(5px, -5px) rotate(90deg); }
          75% { transform: translate(-5px, 5px) rotate(270deg); }
        }
        .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 4s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 8s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default BusinessOverviewSection;
