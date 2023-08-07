import React, {useEffect, useState} from "react"
import Axios from "../../api/Axios"
import Locations from "./locations"

export default function Gyms() {
  const [gymData, setGymData] = useState([])

  function getAllGyms() {
    Axios.get("/gym")
      .then((res) => {
        setGymData(res.data.data)
      })
      .catch((err) => {
        console.log(err)
        console.log(err.response.data.error)
      })
  }
  useEffect(() => {
    getAllGyms()
  }, [])

  return (
    <ul>
      {gymData.map((gym) => {
        return (
          <li key={gym.id}>
            <div>{gym.id}</div>
            {/* <div>{gym.name}</div> */}
            {/* <div>{gym.address}</div> */}
            <div>{gym.city}</div>
            <Locations gymId={gym.id}></Locations>
          </li>
        )
      })}
    </ul>
  )
}
