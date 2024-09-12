import React from "react";
import {
  FaChartLine,
  FaSync,
  FaCheckCircle,
  FaGlobe,
  FaUserFriends,
} from "react-icons/fa";

import { ThreeDCardDemo } from "@/components/ThreeDCardDemo";

const features = [
  {
    icon: (
      <FaChartLine className="text-cyan-600 hover:text-lime-600" size={30} />
    ),
    title: "Efficiency and Coordination",
    description:
      "Our platform ensures that all stakeholders are well-informed and coordinated, reducing delays and mismanagement.",
  },
  {
    icon: <FaSync className="text-cyan-600 hover:text-lime-600" size={30} />,
    title: "Real-Time Insights",
    description:
      "Access real-time information on prices, supply schedules, and market trends to make informed decisions.",
  },
  {
    icon: (
      <FaCheckCircle className="text-cyan-600 hover:text-lime-600" size={30} />
    ),
    title: "Quality Assurance",
    description:
      "Tools for quality checks and feedback mechanisms help maintain high standards, enhancing the reputation of Sri Lankan tea.",
  },
  {
    icon: <FaGlobe className="text-cyan-600 hover:text-lime-600" size={30} />,
    title: "Expanded Market Access",
    description:
      "Our online marketplace allows suppliers and factories to reach new buyers, expanding their market reach.",
  },
  {
    icon: (
      <FaUserFriends className="text-cyan-600 hover:text-lime-600" size={30} />
    ),
    title: "User-Friendly Interface",
    description:
      "Designed to be intuitive and easy to use, TeaBridge makes digital transformation accessible for all.",
  },
];

export default function WhyChooseTeaBridge() {
  return (
    <div className="w-full py-10 mt-12 md:mt-4">
      <div className="bg-transparent w-full">
        <ThreeDCardDemo>
          <div className="border-cyan-600 shadow-cyan-500 hover:shadow-lime-500 hover:border-lime-600 cursor-auto bg-transparent border-double border-4 rounded-3xl px-6 py-6 space-y-4 shadow-lg w-full">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 hover:text-lime-600">
                🌟 Why Choose TeaBridge? 🌟
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-6 border-2 border-cyan-600 rounded-xl shadow-md hover:shadow-lg hover:border-lime-600 transition-all"
                  >
                    {feature.icon}
                    <h3 className="text-lg font-semibold text-cyan-600 hover:text-lime-600 mt-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 w-full border-t-2 border-cyan-600 hover:border-lime-600" />
          </div>
        </ThreeDCardDemo>
      </div>
    </div>
  );
}
