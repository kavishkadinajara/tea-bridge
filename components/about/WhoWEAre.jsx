import React from 'react';
import { ThreeDCardDemo } from "@/components/ThreeDCardDemo";
import Image from 'next/image';

export default function WhoWeAre() {
  return (
    <div className='container mx-auto px-4 py-10 mt-16 md:mt-12'>
      <div className='grid grid-cols-1 bg-transparent md:grid-cols-2 lg:grid-cols-3 gap-1'>
        
        <div className=' col-span-1 lg:col-span-2'>
          <ThreeDCardDemo>
            <div className="border-cyan-600 shadow-cyan-500 md:w-full hover:shadow-lime-500 hover:border-lime-600 cursor-auto bg-transparent border-double border-4 rounded-3xl px-6 py-6 flex flex-col items-center shadow-lg">
              <div className="text-center space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 hover:text-lime-600">🌿 Who We Are 🌿</h2>
                <p className="text-md lg:text-lg leading-relaxed text-gray-600 pt-6">
                  TeaBridge is a cutting-edge digital platform designed specifically for the tea industry in Sri Lanka 🌏. We understand the unique challenges faced by tea leaf suppliers 🍃, factories 🏭, and buyers 🛒, and we are committed to providing solutions that address these challenges effectively. Our platform leverages modern technology 💻 to simplify processes, improve transparency 🔍, and facilitate better decision-making 📊.
                </p>
              </div>
              <div className="mt-3 w-full border-t-2 border-cyan-600 hover:border-lime-600"></div>
            </div>
          </ThreeDCardDemo>
        </div>

        <ThreeDCardDemo>
        <div className='mt-12 lg:ml-20 md:mt-20 bg-[#03001417] rounded-3xl w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] relative shadow-xl hover:shadow-[#0e6115] shadow-cyan-600 backdrop-blur-md mx-auto'>
          <Image src={`/about/about3.png`} alt='img' width={250} height={250} className='rounded-3xl absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'/>
        </div>
        </ThreeDCardDemo>

      </div>
    </div>
  );
}
