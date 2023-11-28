import React from "react"

import {
  climbEndpoint,
  handleError,
  sessionEndpoint,
} from "modules/api/endpoints"
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

export default function SessionClimbsAttemptsSendsLineGraph() {
  const {isLoading: isLoadingSession, data: allSessionData} = useQuery(
    sessionEndpoint,
    () => axios.get(sessionEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  const {isLoading: isLoadingClimb, data: allClimbData} = useQuery(
    climbEndpoint,
    () => axios.get(climbEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  /*
   * Return value
   */

  if (isLoadingSession || isLoadingClimb) {
    return <div>Loading...</div>
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const sortedSessionData = [...allSessionData.data.data].sort(
    (session1, session2) =>
      new Date(session1.sessionStartTime) < new Date(session2.sessionStartTime)
        ? -1
        : 1
  )

  const labels = sortedSessionData.map((session) =>
    formatStringDate(new Date(session.sessionStartTime))
  )

  const climbsDatasetData = sortedSessionData.map((session) =>
    allClimbData.data.data.reduce((sum, climb) => {
      return climb.sessionId === session.id ? sum + 1 : sum
    }, 0)
  )

  const attemptsDatasetData = sortedSessionData.map((session) =>
    allClimbData.data.data.reduce((sum, climb) => {
      return climb.sessionId === session.id ? sum + climb.attempts : sum
    }, 0)
  )

  const sendsDatasetData = sortedSessionData.map((session) =>
    allClimbData.data.data.reduce((sum, climb) => {
      return climb.sessionId === session.id ? sum + climb.sends : sum
    }, 0)
  )

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Climbs",
        data: climbsDatasetData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Attempts",
        data: attemptsDatasetData,
        fill: false,
        borderColor: "#FF7474",
        tension: 0.1,
      },
      {
        label: "Sends",
        data: sendsDatasetData,
        fill: false,
        borderColor: "#66E000",
        tension: 0.1,
      },
    ],
  }

  return <Line options={options} data={data} />
}
