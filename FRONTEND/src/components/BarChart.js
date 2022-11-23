import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ labels, labelName, dataa }) {
  const data = {
    labels,
    datasets: [
      {
        label: labelName,
        data: dataa,
        barThickness: 40,
        backgroundColor: "rgba(56, 3, 193, 0.2)",
      },
    ],
  };

  return <Bar data={data} />;
}
