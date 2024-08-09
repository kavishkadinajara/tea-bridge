// Import necessary modules from 'chart.js' and 'react-chartjs-2'
import { useEffect, useRef } from "react";
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

  // Create chartData from props
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Tea Leaves Collected",
        data: data.map((d) => d.quantity),
        backgroundColor: "rgba(224, 99, 255, 0.666)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // This allows the chart to resize based on its container's aspect ratio
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 10, // Smaller font size for smaller screens
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 45, // Rotate labels on smaller screens to fit better
          autoSkip: true,
          maxTicksLimit: 5, // Limit number of ticks to prevent crowding
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  // Clean-up chart on component unmount
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
      className="min-h-80 md:min-h-[260px] lg:min-h-[480px] overflow-hidden"
      data={chartData}
      options={options}
    />
  );
};

export default BarChart;
