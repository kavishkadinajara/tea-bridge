import React from 'react';
import { ThreeDCardDemo } from "@/components/ThreeDCardDemo";
import { FaLeaf, FaLightbulb, FaHandsHelping } from 'react-icons/fa';

const commitments = [
  {
    icon: <FaLightbulb size={30} className="text-cyan-600 hover:text-lime-600" />,
    title: "Innovation",
    description: "Driving innovation and excellence in the tea industry with cutting-edge technology and solutions."
  },
  {
    icon: <FaHandsHelping size={30} className="text-cyan-600 hover:text-lime-600" />,
    title: "Empowerment",
    description: "Empowering every stakeholder with the tools and insights needed to thrive in a competitive market."
  },
  {
    icon: <FaLeaf size={30} className="text-cyan-600 hover:text-lime-600" />,
    title: "Sustainability",
    description: "Promoting sustainable and ethical practices to ensure the well-being of our environment and communities."
  }
];

export default function OurCommitment() {
  return (
    <div className='w-full py-10 mt-12 md:mt-4'>
      <div className='w-full'>
        <ThreeDCardDemo>
          <div className="border-cyan-600 shadow-cyan-500 hover:shadow-lime-500 hover:border-lime-600 cursor-auto bg-transparent border-double border-4 rounded-3xl px-6 py-6 space-y-4 shadow-lg w-full">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 hover:text-lime-600">🌟 Our Commitment 🌟</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
                {commitments.map((commitment, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-4 border-2 border-cyan-600 rounded-xl shadow-md hover:shadow-lg hover:border-lime-600 transition-all">
                    {commitment.icon}
                    <h3 className="text-lg font-semibold text-cyan-600 hover:text-lime-600 mt-4">{commitment.title}</h3>
                    <p className="text-gray-600 mt-2">{commitment.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 w-full border-t-2 border-cyan-600 hover:border-lime-600"></div>
          </div>
        </ThreeDCardDemo>
      </div>
    </div>
  );
}
