import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({ labels, labelName, dataa }) => {
  // const data = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       label: labelName,
  //       data: dataa,
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const data = {
    labels: labels,
    datasets: [
      {
        label: labelName,
        data: dataa,
        backgroundColor: ["#87E1F8", "#3803C1", "#ADBCF4"],
        borderColor: ["#87E1F8", "#3803C1", "#ADBCF4"],
        cutout: 60,
      },
    ],
  };

  return <Doughnut data={data} />;
};
