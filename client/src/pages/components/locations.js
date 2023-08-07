import React, {useEffect, useState} from "react"
import Axios from "../../api/Axios"
import Boulders from "./boulders"

const GYM = "gym"

export default function Locations(props) {
  const [locationData, setLocationData] = useState([])

  // TODO: create API endpoint to specify which gym a location is taken from
  const gymId = props.gymId

  const selectedGym = Number(localStorage.getItem(GYM))

  function getAllLocations() {
    // TODO: change endpoint
    Axios.get("/location")
      .then((res) => {
        setLocationData(res.data.data)
      })
      .catch((err) => {
        console.log(err)
        console.log(err.response.data.error)
      })
  }

  useEffect(() => {
    getAllLocations()
  }, [])

  return (
    <ul>
      {locationData.map((location) => {
        if (selectedGym === gymId) {
          return (
            <li key={location.id}>
              <div>{location.id}</div>
              <div>{location.name}</div>
              <Boulders locationId={location.id}></Boulders>
            </li>
          )
        }
      })}
    </ul>
  )
}
