import React, {useEffect, useState} from "react"
import Axios from "../../api/Axios"

const BOULDER = "boulder"

export default function Climbs(props) {
  const [climbData, setClimbData] = useState([])

  // TODO: create API endpoint to specify which location a boulder is taken from
  const boulderId = props.boulderId

  const selectedBoulder = Number(localStorage.getItem(BOULDER))

  function getAllClimbs() {
    // TODO: change endpoint
    Axios.get("/climb")
      .then((res) => {
        setClimbData(res.data.data)
      })
      .catch((err) => {
        console.log(err)
        console.log(err.response.data.error)
      })
  }

  useEffect(() => {
    getAllClimbs()
  }, [])

  return (
    <ul>
      {climbData.map((climb) => {
        if (selectedBoulder === boulderId) {
          return (
            <li key={climb.id}>
              <div>{climb.attempts}</div>
              <div>{climb.sends}</div>
              <div>{climb.climbStartTime}</div>
              <div>{climb.climbEndTime}</div>
            </li>
          )
        }
      })}
    </ul>
  )
}
