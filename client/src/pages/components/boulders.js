import React, {useEffect, useState} from "react"
import Axios from "../../api/Axios"
import Climbs from "./climbs"

const LOCATION = "location"

export default function Boulders(props) {
  const [boulderData, setBoulderData] = useState([])

  const locationId = props.locationId

  const selectedLocation = Number(localStorage.getItem(LOCATION))

  function getAllBoulders() {
    let params = {
      where: "locationId = " + selectedLocation,
    }

    const uri = encodeURIComponent(JSON.stringify(params))

    Axios.get("/boulder/query/" + uri)
      .then((res) => {
        setBoulderData(res.data.data)
      })
      .catch((err) => {
        console.log(err)
        console.log(err.response.data.error)
      })
  }

  useEffect(() => {
    if (locationId !== selectedLocation) return
    getAllBoulders()
  }, [])

  return (
    <ul>
      {boulderData.map((boulder) => {
        if (selectedLocation === locationId) {
          return (
            <li key={boulder.id}>
              <div>{boulder.id}</div>
              <div>{boulder.rating}</div>
              <div>{boulder.colour}</div>
              <div>{boulder.boulderType}</div>
              <div>{boulder.description}</div>
              <Climbs boulderId={boulder.id}></Climbs>
            </li>
          )
        }
      })}
    </ul>
  )
}
