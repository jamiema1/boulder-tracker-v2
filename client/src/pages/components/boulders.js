import React, {useEffect, useState} from "react"
import Axios from "../../api/Axios"
import Climbs from "./climbs"

export default function Boulders(props) {
  const [boulderData, setBoulderData] = useState([])
  const [selectedBoulder, setSelectedBoulder] = useState(0)

  const locationId = props.locationId
  const selectedLocation = props.selectedLocation

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
    setSelectedBoulder(0)
    if (locationId !== selectedLocation) return
    getAllBoulders()
  }, [selectedLocation])

  return (
    <ul>
      {boulderData.map((boulder) => {
        if (selectedLocation === locationId) {
          return (
            <li key={boulder.id}>
              <button onClick={() => setSelectedBoulder(boulder.id)}>v</button>
              <div>{boulder.id}</div>
              <div>{boulder.rating}</div>
              <div>{boulder.colour}</div>
              <div>{boulder.boulderType}</div>
              <div>{boulder.description}</div>
              <Climbs
                boulderId={boulder.id}
                selectedBoulder={selectedBoulder}
              ></Climbs>
            </li>
          )
        }
      })}
    </ul>
  )
}
