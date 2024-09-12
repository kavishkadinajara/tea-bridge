"use client";
import { motion, useAnimation } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import React, { ReactNode, useEffect, useRef, useState } from "react";

import Vission_Mission from "@/components/about/Vision_Misson";
import { SparklesPreview } from "@/components/SparklesPreview";
import WhoWEAre from "@/components/about/WhoWEAre";
import WhatWeDo from "@/components/about/WhatWeDo";
import WhyChooseTeaBridge from "@/components/about/WhyChooseTeaBridge";
import OurCommitment from "@/components/about/OurCommitment";

export default function AboutPage() {
  return (
    <div className="mb-20 flex flex-col items-center justify-center gap-4 py-8 px-4 md:px-6 lg:px-8 md:py-10">
      <h1 className="text-center mb-4 text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-900 via-green-700 to-yellow-500">
        <TypeAnimation
          repeat={Infinity}
          sequence={[
            "About TeaBridge",
            2000,
            "Who are We?",
            1000,
            "What we Do?",
            1000,
            "Why Choose TeaBridge?",
            1000,
            "Our Commitment",
            1000,
          ]}
          speed={50}
          wrapper="span"
        />
      </h1>

      <SparklesPreview>
        <Vission_Mission />
        <ScrollAnimation>
          <WhoWEAre />
        </ScrollAnimation>
        <ScrollAnimation>
          <WhatWeDo />
        </ScrollAnimation>
        <ScrollAnimation>
          <WhyChooseTeaBridge />
        </ScrollAnimation>
        <ScrollAnimation>
          <OurCommitment />
        </ScrollAnimation>
      </SparklesPreview>
    </div>
  );
}

interface ScrollAnimationProps {
  children: ReactNode;
}

function ScrollAnimation({ children }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.2, // Adjusted threshold for better visibility
        rootMargin: "0px 0px -50px 0px", // Margin to trigger animation earlier
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, scale: 1 });
    } else {
      controls.start({ opacity: 0, y: 30, scale: 0.98 });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 30, scale: 1 }} // Adjusted initial values
      transition={{ duration: 0.8, ease: "easeOut" }} // Smoother transition
      className="w-full px-4 sm:px-6 lg:px-8"
    >
      {children}
    </motion.div>
  );
}
