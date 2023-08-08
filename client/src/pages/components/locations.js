import React, {useEffect, useState} from "react"
import Axios from "../../api/Axios"
import Boulders from "./boulders"

export default function Locations(props) {
  const [locationData, setLocationData] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(0)

  const gymId = props.gymId
  let selectedGym = props.selectedGym

  function getAllLocations() {
    let params = {
      where: "gymId = " + selectedGym,
    }

    const uri = encodeURIComponent(JSON.stringify(params))

    Axios.get("/location/query/" + uri)
      .then((res) => {
        setLocationData(res.data.data)
      })
      .catch((err) => {
        console.log(err)
        console.log(err.response.data.error)
      })
  }

  useEffect(() => {
    setSelectedLocation(0)
    if (gymId !== selectedGym) return
    getAllLocations()
  }, [selectedGym])

  return (
    <ul>
      {locationData.map((location) => {
        if (selectedGym === gymId) {
          return (
            <li key={location.id}>
              <button onClick={() => setSelectedLocation(location.id)}>
                v
              </button>
              <div>{location.id}</div>
              <div>{location.name}</div>
              <Boulders
                locationId={location.id}
                selectedLocation={selectedLocation}
              ></Boulders>
            </li>
          )
        }
      })}
    </ul>
  )
}
