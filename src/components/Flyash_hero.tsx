"use client"; // Add this line at the top

import { motion, easeInOut, easeOut } from "framer-motion";
import { ArrowRight, Play, TrendingUp, Shield, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FlyashHero = () => {
  // Animation variants for the main container to orchestrate children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the animation of children
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for individual items to fade in and slide up
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  // Animation variants for floating decorative elements
  const floatingVariants = {
    animate: (delay = 0) => ({
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: easeInOut,
        delay: delay,
      },
    }),
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      // Applying a gradient overlay on top of the background image for better text readability
      style={{
        backgroundImage: `linear-gradient(rgba(33, 64, 114, 0.85), rgba(33, 64, 114, 0.75)), url('/img-56.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Creates a parallax effect on scroll
      }}
    >
      {/* Animated decorative background glows */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto text-center text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <Badge className="bg-accent/20 text-accent-foreground border-accent/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Leading Global Fly Ash Exporter
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-lg"
          >
            Sustainable Industrial Materials for{" "}
            <span className="text-accent">Global Infrastructure</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="max-w-3xl mx-auto mb-8 text-lg md:text-xl text-white/80"
          >
            Premier exporter of high-quality fly ash, GGBFS, and industrial
            materials to 50+ countries. Powering sustainable construction
            worldwide.
          </motion.p>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-lg">
              <div className="text-4xl font-bold text-white mb-1">50+</div>
              <div className="text-white/80 text-sm">Countries Served</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-lg">
              <div className="text-4xl font-bold text-white mb-1">2M+</div>
              <div className="text-white/80 text-sm">Tons Exported</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-lg">
              <div className="text-4xl font-bold text-white mb-1">15+</div>
              <div className="text-white/80 text-sm">Years Experience</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Explore Products
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Video
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-white/70"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">ISO Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5" />
              <span className="text-sm">Global Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">Quality Assured</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center items-start pt-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-2 bg-white/70 rounded-full"
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FlyashHero;
