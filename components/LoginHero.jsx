/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { motion } from "framer-motion";

import { LampContainer } from "@/components/ui/lamp";
import { SparklesPreview } from "@/components/SparklesPreview";
import { ThreeDCardDemo } from "@/components/ThreeDCardDemo";

export default function LoginHero() {
  return (
    <SparklesPreview>
      <ThreeDCardDemo>
        <LampContainer className="">
          <ThreeDCardDemo>
            <motion.h1
              className="-mt-28 bg-gradient-conic from-lime-500 via-transparent to-transparent py-4 bg-clip-text text-center text-5xl font-extrabold tracking-tight text-transparent md:text-7xl z-10 text-white hover:text-lime-800 dark:hover:text-lime-950 transition-colors duration-300"
              initial={{ opacity: 0.5, y: 100 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              TEABRIDGE
            </motion.h1>
          </ThreeDCardDemo>

          <ThreeDCardDemo>
            <motion.h2
              className=" bg-gradient-conic from-lime-500 via-transparent to-transparent py-2 bg-clip-text text-center text-xl font-medium tracking-tight text-transparent md:text-3xl z-10 text-white hover:text-green-700 transition-colors duration-300"
              initial={{ opacity: 0.5, y: 100 }}
              transition={{
                delay: 0.5,
                duration: 1,
                ease: "easeInOut",
              }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              CONNECTING TEA INDUSTRY
            </motion.h2>
          </ThreeDCardDemo>

          <ThreeDCardDemo>
            <motion.p
              className=" max-w-2xl text-center text-lg leading-relaxed text-slate-950 dark:text-slate-300 md:text-xl z-10 hover:text-xl transition-colors duration-300"
              initial={{ opacity: 0.5, y: 100 }}
              transition={{
                delay: 0.7,
                duration: 1.2,
                ease: "easeInOut",
              }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              "TeaBridge is revolutionizing the tea industry by seamlessly
              connecting tea leaf suppliers, factories, and buyers. Experience
              enhanced efficiency and transparency with our innovative platform
              designed to streamline every aspect of tea production and trade."
            </motion.p>
          </ThreeDCardDemo>
        </LampContainer>
      </ThreeDCardDemo>
    </SparklesPreview>
  );
}
