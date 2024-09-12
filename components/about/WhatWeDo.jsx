import React from "react";

import { ThreeDCardDemo } from "@/components/ThreeDCardDemo";

export default function WhatWeDo() {
  return (
    <div className="w-full py-10 mt-12 md:mt-4">
      <div className="w-full">
        <ThreeDCardDemo>
          <div className="border-cyan-600 shadow-cyan-500 hover:shadow-lime-500 hover:border-lime-600 cursor-auto bg-transparent border-double border-4 rounded-3xl px-6 py-6 space-y-4 shadow-lg w-full">
            <div className="text-center space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 hover:text-lime-600 mb-8">
                🌟 What We Do 🌟
              </h2>
              <div className="flex flex-col md:flex-row md:justify-around space-y-6 md:space-y-0 md:space-x-6">
                {/* For Tea Leaf Suppliers */}
                <div className="flex flex-col border-b-2 md:border-b-0 md:border-e-2 pb-4 md:pb-0 pe-2 md:border-e-cyan-600">
                  <h2 className="text-lg font-semibold text-cyan-600 hover:text-lime-600 text-center">
                    For Tea Leaf Suppliers
                  </h2>
                  <p className="text-md leading-relaxed text-gray-600 pt-4">
                    📈 Compare prices and services offered by various factories
                    to choose the best options. <br />
                    🚚 Notify factories of planned tea leaf deliveries to ensure
                    efficient logistics. <br />
                    📊 Track monthly tea leaf deliveries and historical supply
                    data. <br />
                    🌿 Apply for tea powder and fertilizer from factories.{" "}
                    <br />
                    💰 Find the best prices offered for their tea leaves.
                  </p>
                </div>

                {/* For Tea Factories */}
                <div className="flex flex-col border-b-2 md:border-b-0 md:border-e-2 pb-4 md:pb-0 pe-2 md:border-e-cyan-600">
                  <h2 className="text-lg font-semibold text-cyan-600 hover:text-lime-600 text-center">
                    For Tea Factories
                  </h2>
                  <p className="text-md leading-relaxed text-gray-600 pt-4">
                    📝 Track daily tea leaf supplies from various suppliers.{" "}
                    <br />
                    🗃️ Enter and manage data about received tea leaves. <br />
                    💼 Display prices, services, and facilities offered to
                    suppliers. <br />
                    🌍 Showcase tea products for sale to a global audience.
                  </p>
                </div>

                {/* For Tea Buyers */}
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-cyan-600 hover:text-lime-600 text-center">
                    For Tea Buyers
                  </h2>
                  <p className="text-md leading-relaxed text-gray-600 pt-4">
                    🛒 Discover the best tea products from Sri Lanka. <br />
                    📝 Apply to purchase tea products directly through the
                    platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 w-full border-t-2 border-cyan-600 hover:border-lime-600" />
          </div>
        </ThreeDCardDemo>
      </div>
    </div>
  );
}
