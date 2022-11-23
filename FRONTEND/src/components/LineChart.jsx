import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({ labels, labelName, dataa }) => {
  const data = {
    labels,
    datasets: [
      {
        label: labelName,
        data: dataa,
        borderColor: "#3803C1",
        backgroundColor: "#3803C1",
      },
    ],
  };

  return <Line data={data} />;
};
