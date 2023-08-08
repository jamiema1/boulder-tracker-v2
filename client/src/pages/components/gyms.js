import React, {useEffect, useRef, useState} from "react"
import Axios from "../../api/Axios"
import Locations from "./locations"

export default function Gyms() {
  const [gymData, setGymData] = useState([])
  const [selectedGym, setSelectedGym] = useState(0)

  const [addingGym, setAddingGym] = useState(false)
  const addGymName = useRef("")
  const addGymAddress = useRef("")
  const addGymCity = useRef("")

  useEffect(() => {
    getAllGyms()
  }, [])

  function getAllGyms() {
    Axios.get("/gym")
      .then((res) => {
        setGymData(res.data.data)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function addGym() {
    const newGym = {
      name: addGymName.current.value,
      address: addGymAddress.current.value,
      city: addGymCity.current.value,
    }

    Axios.post("/gym", newGym)
      .then((res) => {
        setGymData([...gymData, {id: res.data.data[0].id, ...newGym}])
        clearAddGym()
        alert("Successfully added gym " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function clearAddGym() {
    addGymName.current.value = ""
    addGymAddress.current.value = ""
    addGymCity.current.value = ""
    setAddingGym(false)
  }

  function deleteGym(gymId) {
    Axios.delete("/gym/" + gymId)
      .then((res) => {
        getAllGyms()
        alert("Successfully removed gym " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  return (
    <div>
      <button onClick={() => setAddingGym(true)}>Add a Gym</button>
      <ul>
        {gymData.map((gym) => {
          return (
            <li key={gym.id}>
              <button onClick={() => setSelectedGym(gym.id)}>View</button>
              <button>Edit</button> {/* TODO: implement editing */}
              <button onClick={() => deleteGym(gym.id)}>Delete</button>
              <div>{gym.id}</div>
              <div>{gym.name}</div>
              <div>{gym.address}</div>
              <div>{gym.city}</div>
              <Locations gymId={gym.id} selectedGym={selectedGym}></Locations>
            </li>
          )
        })}
        {addingGym && (
          <li>
            <form>
              <label>Name:</label>
              <input type="text" ref={addGymName}></input>
              <label>Address:</label>
              <input type="text" ref={addGymAddress}></input>
              <label>City:</label>
              <input type="text" ref={addGymCity}></input>
              <button type="button" onClick={() => addGym()}>
                Add
              </button>
              <button type="button" onClick={() => clearAddGym()}>
                Cancel
              </button>
            </form>
          </li>
        )}
      </ul>
    </div>
  )
}
