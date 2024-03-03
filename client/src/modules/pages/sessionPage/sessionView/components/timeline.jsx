import React from "react"

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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import {Line} from "react-chartjs-2"
import {getTimeDifferenceString} from "modules/common/helpers"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function Timeline({session}) {

  const {isLoading: isLoadingBoulder, data: allBoulderData} = useQuery(
    boulderEndpoint,
    () => axios.get(boulderEndpoint),
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

  if (isLoadingBoulder || isLoadingClimb) {
    return <div>Loading...</div>
  }


  const dataMap = new Map()

  function getMinutesSinceStart(startTime, endTime) {
    const duration = endTime - startTime
    const minutes = Math.floor(duration / (1000 * 60))
    return minutes
  }
  
  const filteredClimbs = [...allClimbData.data.data].filter(
    (climb) => climb.sessionId === session.id
  )


  filteredClimbs.forEach((climb) => {
    const boulder = allBoulderData.data.data.find(
      (boulder) => boulder.id === climb.boulderId
    )
    
    const minutes = getMinutesSinceStart(
      new Date(session.sessionStartTime), 
      new Date(climb.climbStartTime)
    )
    dataMap.set(minutes, boulder.rating)
  })

  // const labels = times()

  
  const sortedDataMap = new Map([...dataMap.entries()].sort((a, b) => {
    // Compare keys (a[0] and b[0])
    if (a[0] < b[0]) {
      return -1
    }
    if (a[0] > b[0]) {
      return 1
    }
    return 0
  }))

  const labels = [...sortedDataMap.keys()]


  const climbData = [...sortedDataMap.values()]


  const data = {
    labels: labels,
    datasets: [
      {
        label: "Climbs",
        data: climbData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      }
    ],
  }


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: "Grade"
        },
        ticks: {
          stepSize: 1 // Set the step size for the X-axis
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Time Since Start"
        },
        type: 'linear',
        ticks: {
          stepSize: 10
        }
      },
    },
  }

  return (
    
    <div className='content flex-grow flex flex-col justify-between'>
      <div className="flex justify-between">
        <h1>Grade Distribution</h1>
        <h2>Duration: {getTimeDifferenceString(session.sessionStartTime, 
          session.sessionEndTime)}
        </h2>
      </div>
      <div className="w-full h-full">
        <Line options={options} data={data} />
      </div>
    </div>
  )
}
