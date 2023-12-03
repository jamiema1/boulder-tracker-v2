import React from "react"

import {
  boulderEndpoint,
  climbEndpoint,
  handleError,
  sessionEndpoint,
} from "modules/api/endpoints"
import axios from "modules/api/axios"
import {useQuery} from "react-query"

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js"
import {Bubble} from "react-chartjs-2"

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

export default function SessionClimbsGradeBubbleGraph() {
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

  const {isLoading: isLoadingBoulder, data: allBoulderData} = useQuery(
    boulderEndpoint,
    () => axios.get(boulderEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  /*
   * Return value
   */

  if (isLoadingSession || isLoadingClimb || isLoadingBoulder) {
    return <div>Loading...</div>
  }

  console.log(allBoulderData)

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

  const climbsDatasetData = []
  const size = 3

  sortedSessionData.map((session, index) => {
    const boulderRatingMap = new Map([])
    const filteredClimbs = allClimbData.data.data.filter(
      (climb) => climb.sessionId === session.id
    )
    filteredClimbs.map((climb) => {
      const boulder = allBoulderData.data.data.find(
        (boulder) => boulder.id === climb.boulderId
      )
      const rating = boulder.rating
      const newValue = 1
      if (boulderRatingMap.has(rating)) {
        boulderRatingMap.set(rating, boulderRatingMap.get(rating) + newValue)
      } else {
        boulderRatingMap.set(rating, newValue)
      }
    })
    boulderRatingMap.forEach((value, key) => {
      climbsDatasetData.push({
        x: index + 1,
        y: key,
        r: value * size,
      })
    })
  })

  const data = {
    datasets: [
      {
        label: "Climbs",
        data: climbsDatasetData,
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  }

  return <Bubble options={options} data={data} />
}
