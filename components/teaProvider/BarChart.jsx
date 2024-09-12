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

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Tea Leaves Collected",
        data: data.map((d) => d.quantity),
        backgroundColor: (context) => {
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
        barThickness: (context) => {
          const width = context.chart.width;

          return width < 600 ? 15 : 50;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
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
        chartRef.current.destroy();
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
