import React from "react";
import BarChart from "@/components/BarChart";

interface AnalyzeProps {
  userId: string;
}

const barChartData = [
  { label: "Jan", quantity: 730 },
  { label: "Feb", quantity: 745 },
  { label: "Mar", quantity: 720 },
  { label: "Apr", quantity: 830 },
  { label: "May", quantity: 645 },
  { label: "Jun", quantity: 720 },
  { label: "Jul", quantity: 730 },
  { label: "Aug", quantity: 745 },
  { label: "Sep", quantity: 820 },
  { label: "Oct", quantity: 620 },
];

const Analyze: React.FC<AnalyzeProps> = ({ userId }) => {
  return (
    <section className="px-10 py-10">
      <div className="text-center">
        <h1 className="md:text-3xl text-lg font-bold text-gray-800 dark:text-white">
          Tea Leaves Collection Data
        </h1>
        <p className="mt-4 md:text-lg text-gray-600 dark:text-gray-400">
          A detailed overview of your tea leaves collected over the past nine
          months.
        </p>
      </div>
      <div className="mt-12 flex justify-center w-full">
        <div className="w-full max-w-4xl">
          <BarChart data={barChartData} />
        </div>
      </div>
    </section>
  );
};

export default Analyze;
