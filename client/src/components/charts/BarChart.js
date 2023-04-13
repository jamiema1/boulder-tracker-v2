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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({boulderList}) {
  const [chartData, setChartData] = useState({labels: [], datasets: []});

  useEffect(() => {
    // TODO: clean this section up and move it to a seperate helper function
    const pairs = boulderList.map((boulder) => {
      if (boulder.sendDate === null)
        return {sendDate: "Unfinished", rating: boulder.rating};
      return {
        sendDate: boulder.sendDate.split("T")[0],
        rating: boulder.rating,
      };
    });

    // console.log(pairs)
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
    // console.log(pairMap)
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
  }, [boulderList]);

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
      <div
        style={{
          height: "60vh",
          position: "relative",
          marginBottom: "1%",
          padding: "1%",
        }}
      >
        <Bar data={chartData} options={options} />
      </div>
    </>
  );
}
