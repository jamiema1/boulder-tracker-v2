import React from "react"

import {handleError, sessionEndpoint} from "modules/api/endpoints"
import axios from "modules/api/axios"
import {useQuery} from "react-query"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import {Line} from "react-chartjs-2"
import {formatStringDate} from "modules/common/helpers"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function SessionLengthLineGraph() {
  const {isLoading: isLoadingSession, data: allSessionData} = useQuery(
    sessionEndpoint,
    () => axios.get(sessionEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  /*
   * Return value
   */

  if (isLoadingSession) {
    return <div>Loading...</div>
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const sortedData = [...allSessionData.data.data].sort((session1, session2) =>
    new Date(session1.sessionStartTime) < new Date(session2.sessionStartTime)
      ? -1
      : 1
  )
  const labels = sortedData.map((session) =>
    formatStringDate(new Date(session.sessionStartTime))
  )
  const datasetData = sortedData.map(
    (session) =>
      (new Date(session.sessionEndTime) - new Date(session.sessionStartTime)) /
      (1000 * 60 * 60)
  )
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Session Length",
        data: datasetData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  return <Line options={options} data={data} />
}
