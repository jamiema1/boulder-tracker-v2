import React, {useEffect, useState} from "react"
import Axios from "../../api/Axios"

const BOULDER = "boulder"

export default function Climbs(props) {
  const [climbData, setClimbData] = useState([])

  const boulderId = props.boulderId

  const selectedBoulder = Number(localStorage.getItem(BOULDER))

  function getAllClimbs() {
    let params = {
      where: "boulderId = " + selectedBoulder,
    }

    const uri = encodeURIComponent(JSON.stringify(params))

    Axios.get("/climb/query/" + uri)
      .then((res) => {
        setClimbData(res.data.data)
      })
      .catch((err) => {
        console.log(err)
        console.log(err.response.data.error)
      })
  }

  useEffect(() => {
    if (boulderId !== selectedBoulder) return
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
