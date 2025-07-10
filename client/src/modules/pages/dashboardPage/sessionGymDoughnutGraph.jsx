import React from "react"

import {
  gymEndpoint,
  handleError,
  sessionEndpoint,
} from "modules/api/endpoints"
import axios from "modules/api/axios"
import {useQuery} from "react-query"

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import {Doughnut} from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function SessionGymDoughnutGraph() {
  const {isLoading: isLoadingSession, data: allSessionData} = useQuery(
    sessionEndpoint,
    () => axios.get(sessionEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  const {isLoading: isLoadingGym, data: allGymData} = useQuery(
    gymEndpoint,
    () => axios.get(gymEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  /*
   * Return value
   */

  if (isLoadingSession || isLoadingGym) {
    return <div>Loading...</div>
  }

  const sortedGymData = [...allGymData.data.data]

  const labels = sortedGymData.map((gym) => gym.city)

  const backgroundColor = sortedGymData.map(
    () => "#" + Math.floor(Math.random() * 16777215).toString(16)
  )

  const datasetData = sortedGymData.map((gym) =>
    allSessionData.data.data.reduce(
      (sum, session) => (session.gymId === gym.id ? sum + 1 : sum),
      0
    )
  )

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Gym",
        data: datasetData,
        fill: false,
        borderColor: backgroundColor,
        backgroundColor: backgroundColor,
        tension: 0.1,
      },
    ],
  }

  return <Doughnut data={data} />
}
