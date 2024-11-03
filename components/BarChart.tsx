"use client";
import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface BarChartData {
  label: string;
  quantity: number;
}

interface BarChartProps {
  data: BarChartData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartRef = useRef<ChartJS<"bar"> | null>(null);

  interface ChartData {
    labels: string[];
    datasets: Dataset[];
  }

  interface Dataset {
    label: string;
    data: number[];
    backgroundColor: (context: any) => CanvasGradient;
    borderColor: string;
    borderWidth: number;
    borderRadius: number;
    hoverBackgroundColor: string;
    hoverBorderColor: string;
    hoverBorderWidth: number;
    barThickness?: number | "flex";
  }

  const chartData: ChartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Tea Leaves Collected",
        data: data.map((d) => d.quantity),
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);

          gradient.addColorStop(0, "rgba(29, 98, 14, 0.8)");
          gradient.addColorStop(1, "rgba(119, 221, 119, 0.5)");

          return gradient;
        },
        borderColor: "rgba(29, 98, 14, 1)",
        borderWidth: 2,
        borderRadius: 8, // Rounded corners
        hoverBackgroundColor: "rgba(29, 98, 14, 1)",
        hoverBorderColor: "rgba(0, 100, 0, 1)",
        hoverBorderWidth: 2,
        barThickness: 50, // or "flex" if you prefer
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
            weight: "bold" as const,
            family: "'Poppins', sans-serif",
          },
          color: "#333",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 1,
        borderRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          color: "#666",
          font: {
            size: 12,
            family: "'Poppins', sans-serif",
          },
          padding: 10,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
          color: "#666",
          font: {
            size: 12,
            family: "'Poppins', sans-serif",
          },
          padding: 10,
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
          lineWidth: 1,
        },
      },
    },
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current?.destroy();
      }
    };
  }, []);

  return (
    <Bar
      ref={chartRef}
      className="min-h-80 flex justify-center md:min-h-[260px] lg:min-h-[480px] rounded-md overflow-hidden shadow-md"
      data={chartData}
      options={options}
    />
  );
};

export default BarChart;
