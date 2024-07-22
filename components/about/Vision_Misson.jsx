import React from 'react';
import Image from 'next/image';
import { ThreeDCardDemo } from "@/components/ThreeDCardDemo";
import { motion } from "framer-motion";

export default function VisionMission() {
  return (
    <div className="container mx-auto px-4 py-14">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        <div className="grid grid-cols-1 bg-transparent md:grid-cols-2 lg:grid-cols-3 gap-20">

          <ThreeDCardDemo>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="border-cyan-600 shadow-cyan-500 hover:shadow-lime-500 hover:border-lime-600 cursor-pointer bg-transparent border-double border-4 rounded-3xl px-6 py-6 flex flex-col items-center space-y-4 shadow-lg transition-all duration-300"
            >
              <div className="text-center space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 hover:text-lime-600">🌱 Our Vision 🌱</h2>
                <p className="text-md lg:text-lg leading-relaxed text-gray-600 pt-6">
                  To revolutionize the tea industry in Sri Lanka by fostering seamless connections, enhancing transparency, and promoting sustainable practices. We aim to empower every stakeholder, from the smallest tea leaf supplier 🍃 to the largest factory 🏭 and international buyers 🌍. Together, we can create a brighter future for the tea industry.
                </p>
              </div>
              <div className="mt-3 w-full border-t-2 border-cyan-600 hover:border-lime-600"></div>
            </motion.div>
          </ThreeDCardDemo>

          <ThreeDCardDemo>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-20 md:mt-16 md:-ml-6 md:hidden lg:block block rounded-full bg-[#03001417] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative shadow-xl hover:shadow-[#0e6115] shadow-cyan-600 backdrop-blur-md mx-auto perspective-1000 transition-all duration-300"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/about/about2.png"
                  alt="TeaBridge Image"
                  className="rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 hover:scale-110 w-[210px] h-[210px] lg:w-[360px] lg:h-[360px]"
                  loading="eager"
                  priority
                  width={550}
                  height={550}
                />
              </div>
            </motion.div>
          </ThreeDCardDemo>

          <ThreeDCardDemo>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="border-cyan-600 shadow-cyan-500 hover:shadow-lime-500 hover:border-lime-600 cursor-pointer bg-transparent border-double border-4 rounded-3xl px-6 py-6 flex flex-col items-center space-y-4 shadow-lg transition-all duration-300 md:mt-10"
            >
              <div className="text-center space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 hover:text-lime-600">🎯 Our Mission 🎯</h2>
                <p className="text-md lg:text-lg leading-relaxed text-gray-600 pt-6">
                  At TeaBridge, our mission is to create an integrated, user-friendly platform that connects tea leaf suppliers 🍃, tea factories 🏭, and tea buyers 🌍. We aim to streamline communication, optimize logistics, and provide real-time market insights to enhance efficiency and profitability across the entire tea supply chain. Through innovation and dedication, we strive to elevate the quality and reputation of Sri Lankan tea on a global scale.
                </p>
              </div>
              <div className="mt-3 w-full border-t-2 border-cyan-600 hover:border-lime-600"></div>
            </motion.div>
          </ThreeDCardDemo>
        </div>
      </motion.div>
    </div>
  );
}
