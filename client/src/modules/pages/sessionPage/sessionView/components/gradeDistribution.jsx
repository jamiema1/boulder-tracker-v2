import React, {} from 'react'

import {
  boulderEndpoint,
  climbEndpoint,
  handleError,
} from "modules/api/endpoints"
import axios from "modules/api/axios"
import {useQuery} from "react-query"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {Bar} from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function GradeDistribution({session}) {

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

  if (isLoadingClimb || isLoadingBoulder) {
    return <div>Loading...</div>
  }

  const dataMap = new Map([])

  const filteredClimbs = allClimbData.data.data.filter(
    (climb) => climb.sessionId === session.id
  )

  filteredClimbs.map((climb) => {
    const boulder = allBoulderData.data.data.find(
      (boulder) => boulder.id === climb.boulderId
    )
    const rating = boulder.rating
    const sends = climb.sends
    const failedClimbs = sends > 0 ? 0 : 1
    const failedAttempts = climb.attempts - sends - failedClimbs

    if (dataMap.has(rating)) {
      const oldData = dataMap.get(rating)

      dataMap.set(rating, {
        failedClimbs: oldData.failedClimbs + failedClimbs,
        sends: oldData.sends + sends,
        failedAttempts: oldData.failedAttempts + failedAttempts
      })
    } else {
      dataMap.set(rating, {failedClimbs, sends, failedAttempts})
    }
  })

  const sortedDataMap = new Map([...dataMap.entries()].sort())

  const labels = [...sortedDataMap.keys()].sort()

  const sendsData = [...sortedDataMap.values()].map((data) => data.sends)
  const failedClimbs = [...sortedDataMap.values()]
    .map((data) => data.failedClimbs)
  const failedAttempts = [...sortedDataMap.values()]
    .map((data) => data.failedAttempts)


  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Sends',
        data: sendsData,
        backgroundColour: 'rgba(2, 192, 55, 0.2)',
        borderColour: 'rgba(2, 192, 55, 1)'
      },
      {
        label: 'Fails',
        data: failedClimbs,
        backgroundColour: 'rgba(255, 84, 84, 0.2)',
        borderColour: 'rgba(255, 84, 84, 1)'
      },
      {
        label: 'Extra Attempts',
        data: failedAttempts,
        backgroundColour: 'rgba(0, 0, 0, 0)',
        borderColour: 'rgba(0, 0, 0, 1)'
      }
    ]
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    },
  }

  return (
    <div className='content flex flex-col justify-between'>
      <h1>Grade Distribution</h1>
      <Bar
        data={{
          labels: data.labels,
          datasets: data.datasets.map((dataset) => ({
            label: dataset.label,
            data: dataset.data,
            backgroundColor: dataset.backgroundColour,
            borderColor: dataset.borderColour,
            borderWidth: 1,

          }))
        }}
        options={options}
      />
    </div>
  )
}
