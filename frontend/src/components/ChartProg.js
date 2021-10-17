import React from "react";
import { Line } from "react-chartjs-2";


const ChartProg = ({
  dataprog,
  crypto,
  color,
  legend = true,
  stepped = false,
  fill = true,
}) => {
  const data = {
    labels: dataprog?.price,
    datasets: [
      {
        label: JSON.stringify(crypto),
        data: dataprog?.price,
        fill: fill,
        stepped: stepped,
        backgroundColor:
          color === "red" ? "rgb(255,0,0,0.2)" : "rgb(0,128,0,0.2)",
        borderColor: color === "red" ? "rgb(255,0,0)" : "rgb(0,128,0)",
        radius: 0,
        borderWidth: 1,
      },
    ],
    options: {
      interaction: {
        intersect: false,
      },
      plugins: {
        legend: legend,
      },
      scales: {
        x: {
          display: false,
        },

        y: {
          display: legend,
        },
      },
    },
  };

  return (
    <div className="chart">
      <Line data={data} options={data.options} height="75" width="150" />
    </div>
  );
};

export default ChartProg;
