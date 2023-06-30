import React, {useEffect, useState} from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import {Bubble} from "react-chartjs-2";
import "./Chart.css";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function BubbleChart(props) {
  const [chartData, setChartData] = useState({datasets: []});

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

    const pairMap = new Map();

    data.forEach((pair) => {
      const str = JSON.stringify(pair);
      if (pairMap.has(str)) {
        pairMap.set(str, pairMap.get(str) + 1);
      } else {
        pairMap.set(str, 1);
      }
    });

    data = [];
    pairMap.forEach((value, keyStr) => {
      const key = JSON.parse(keyStr);
      data.push({x: key.x, y: key.y, r: value});
    });

    setChartData({
      datasets: [
        {
          label: "Send Attempts vs Rating",
          backgroundColor: "rgba(255,0,0,0.5)",
          data: data,
        },
      ],
    });
  }, [props.boulderData]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {display: true, text: "Send Attempts"},
      },
      x: {
        title: {display: true, text: "Rating"},
      },
    },
  };

  return (
    <div className="chart">
      <Bubble data={chartData} options={options} />
    </div>
  );
}
