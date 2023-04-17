/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Bar} from "react-chartjs-2";
import "./Chart.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function BarChart(props) {
  const [chartData, setChartData] = useState({labels: [], datasets: []});

  useEffect(() => {
    // TODO: clean this section up and move it to a seperate helper function
    const pairs = props.boulderData.map((boulder) => {
      if (boulder.sendDate === null)
        return {sendDate: "Unfinished", rating: boulder.rating};
      return {
        sendDate: boulder.sendDate.split("T")[0],
        rating: boulder.rating,
      };
    });

    const pairMap = new Map();

    pairs.forEach((pair) => {
      if (pairMap.has(pair.sendDate.split("T")[0])) {
        pairMap.set(
          pair.sendDate.split("T")[0],
          pairMap.get(pair.sendDate.split("T")[0]) + pair.rating
        );
      } else {
        pairMap.set(pair.sendDate.split("T")[0], pair.rating);
      }
    });

    pairMap.delete("Unfinished");

    const sorted = new Map([...pairMap.entries()].sort());

    const c1 = [];
    const c2 = [];
    sorted.forEach((value, key) => c1.push(key));
    sorted.forEach((value) => c2.push(value));

    setChartData({
      labels: c1,
      datasets: [
        {
          label: "rating",
          backgroundColor: ["red", "blue"],
          borderColor: ["red", "blue"],
          data: c2,
        },
      ],
    });
  }, [props.boulderData]);

  const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Total Rating per Day",
      },
    },
  };

  return (
    <>
      <div className="chart">
        <Bar data={chartData} options={options} />
      </div>
    </>
  );
}
