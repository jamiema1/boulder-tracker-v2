/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import {Bar} from 'react-chartjs-2'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

export default function BarChart({data}) {

  return (
    <>
      <div>
        <Bar
          data = {data}
          height = {1}
          width = {4}
        //   options = {options}
        />
      </div>
    </>
  )
}
