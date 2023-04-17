import {Chart as ChartJS, ArcElement} from "chart.js";
import React, {useState, useEffect} from "react";
import {Doughnut, Pie} from "react-chartjs-2";

ChartJS.register(ArcElement);

export default function DoughnutChart(props) {
  const [chartData, setChartData] = useState({datasets: []});

  useEffect(() => {
    // TODO: clean this section up and move it to a seperate helper function
    const category = props.boulderData.map((boulder) => {
      return {
        boulderType: boulder.boulderType,
      };
    });

    const pairMap = new Map();

    category.forEach((cat) => {
      const val = cat.boulderType;
      if (pairMap.has(val)) {
        pairMap.set(val, pairMap.get(val) + 1);
      } else {
        pairMap.set(val, 1);
      }
    });

    let labels = [];
    let data = [];
    pairMap.forEach((value, key) => {
      labels.push(key);
      data.push(value);
    });

    setChartData({
      maintainAspectRatio: false,
      responsive: false,
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "rgba(255,0,0,0.5)",
            "rgba(0,255,0,0.5)",
            "rgba(0,0,255,0.5)",
          ],
          //   hoverBackgroundColor: chartColors,
        },
      ],
    });
  }, [props.boulderData]);

  const options = {
    legend: {
      display: false,
      position: "right",
    },
    // elements: {
    //   arc: {
    //     borderWidth: 0,
    //   },
    // },
  };

  return (
    <div className="pieChart">
      <div className="chart">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="chart">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
