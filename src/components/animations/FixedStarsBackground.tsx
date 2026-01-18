"use client";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { StarsBackground } from "./StarsBackground";
import { ShootingStars } from "./ShootingStars";
import useScreenSize from "@/src/hooks/useScreenSize";

const FixedStarsBackground = () => {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.55,
    damping: 40,
    stiffness: 50,
  });

  const isDesktop = useScreenSize(1024);

  const scale = useTransform(smoothProgress, [0, 1], [1, 1.2]);

  return (
    <motion.div
      style={{ scale, perspective: "1000px" }}
      className="fixed top-0 left-0 z-0 h-screen w-full"
    >
      <StarsBackground starDensity={!isDesktop ? 0.0004 : 0.0002} />
      <ShootingStars />
    </motion.div>
  );
};

export default FixedStarsBackground;
