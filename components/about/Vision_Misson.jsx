import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { ThreeDCardDemo } from "@/components/ThreeDCardDemo";

export default function VisionMission() {
  return (
    <div className="container mx-auto px-4 py-14">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-10"
        initial={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 1.1 }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10">
          {/* Vision Section */}
          <ThreeDCardDemo>
            <motion.div
              className="flex justify-center border-cyan-600 shadow-cyan-500 hover:shadow-lime-500 hover:border-lime-600 cursor-pointer bg-transparent border-double border-4 rounded-3xl px-6 py-6 flex-col items-center space-y-4 shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center space-y-3">
                <h2 className="text-xl md:text-3xl font-bold text-cyan-600 hover:text-lime-600">
                  🌱 Our Vision 🌱
                </h2>
                <p className="text-md lg:text-lg leading-relaxed text-gray-600 pt-6">
                  To revolutionize the tea industry in Sri Lanka by fostering
                  seamless connections, enhancing transparency, and promoting
                  sustainable practices. We aim to empower every stakeholder,
                  from the smallest tea leaf supplier 🍃 to the largest factory
                  🏭 and international buyers 🌍. Together, we can create a
                  brighter future for the tea industry.
                </p>
              </div>
              <div className="mt-3 w-full border-t-2 border-cyan-600 hover:border-lime-600" />
            </motion.div>
          </ThreeDCardDemo>

          {/* Image Section */}
          <ThreeDCardDemo>
            <motion.div
              className="flex rounded-full bg-[#03001417] w-[200px] h-[200px] md:w-[225px] md:h-[225px] lg:w-[380px] lg:h-[380px] relative shadow-xl hover:shadow-[#0e6115] shadow-cyan-600 backdrop-blur-md mx-auto transition-all duration-300 items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  priority
                  alt="TeaBridge Image"
                  className="rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 hover:scale-110 w-[170px] h-[170px] md:w-[195px] md:h-[195px] lg:w-[340px] lg:h-[340px]"
                  height={550}
                  loading="eager"
                  src="/about/about2.png"
                  width={550}
                />
              </div>
            </motion.div>
          </ThreeDCardDemo>

          {/* Mission Section */}
          <ThreeDCardDemo>
            <motion.div
              className="border-cyan-600 shadow-cyan-500 hover:shadow-lime-500 hover:border-lime-600 cursor-pointer bg-transparent border-double border-4 rounded-3xl px-6 py-6 flex flex-col items-center space-y-4 shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center space-y-3">
                <h2 className="text-xl md:text-3xl font-bold text-cyan-600 hover:text-lime-600">
                  🎯 Our Mission 🎯
                </h2>
                <p className="text-md lg:text-lg leading-relaxed text-gray-600 pt-6">
                  At TeaBridge, our mission is to create an integrated,
                  user-friendly platform that connects tea leaf suppliers 🍃,
                  tea factories 🏭, and tea buyers 🌍. We aim to streamline
                  communication, optimize logistics, and provide real-time
                  market insights to enhance efficiency and profitability across
                  the entire tea supply chain. Through innovation and
                  dedication, we strive to elevate the quality and reputation of
                  Sri Lankan tea on a global scale.
                </p>
              </div>
              <div className="mt-3 w-full border-t-2 border-cyan-600 hover:border-lime-600" />
            </motion.div>
          </ThreeDCardDemo>

        </div>
      </motion.div>
    </div>
  );
}
