import React, {useEffect, useState} from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import {Scatter} from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ScatterChart(props) {
  const [chartData, setChartData] = useState({label: "label", datasets: []});

  useEffect(() => {
    // TODO: clean this section up and move it to a seperate helper function
    const pairs = props.boulderData.map((boulder) => {
      return {
        sendAttempts: boulder.sendAttempts,
        rating: boulder.rating,
      };
    });

    let data = [];
    pairs.forEach((pair) => {
      const rating = pair.rating;
      const sendAttempts = pair.sendAttempts;
      data.push({x: rating, y: sendAttempts});
    });

    setChartData({
      label: "label",
      datasets: [
        {
          pointRadius: 10,
          data: data,
        },
      ],
    });
  }, [props.boulderData]);

  const options = {
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //   },
    // },
  };

  return (
    <div className="chart">
      <Scatter data={chartData} options={options} />
    </div>
  );
}
