import React, {useEffect, useRef, useState} from "react"
import Axios from "../../api/Axios"
import Locations from "./locations"

export default function Gyms() {
  const [gymData, setGymData] = useState([])
  const [selectedGym, setSelectedGym] = useState(0)
  const [editingGym, setEditingGym] = useState(0)

  const [addingGym, setAddingGym] = useState(false)
  const newGymName = useRef("")
  const newGymAddress = useRef("")
  const newGymCity = useRef("")

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
      name: newGymName.current.value,
      address: newGymAddress.current.value,
      city: newGymCity.current.value,
    }

    Axios.post("/gym", newGym)
      .then((res) => {
        setGymData([...gymData, {id: res.data.data[0].id, ...newGym}])
        clearGymRefs()
        alert("Successfully added gym " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function clearGymRefs() {
    newGymName.current.value = ""
    newGymAddress.current.value = ""
    newGymCity.current.value = ""
    setAddingGym(false)
    setEditingGym(0)
  }

  function editGym(gymId) {
    const newGym = {
      name: newGymName.current.value,
      address: newGymAddress.current.value,
      city: newGymCity.current.value,
    }

    Axios.put("/gym/" + gymId, newGym)
      .then((res) => {
        if (res.status === 202) {
          clearGymRefs()
          alert(res.data.error)
          return
        }
        getAllGyms() // TODO: update the gym from gymData without GET API call
        clearGymRefs()
        alert("Successfully edited gym " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function deleteGym(gymId) {
    Axios.delete("/gym/" + gymId)
      .then((res) => {
        getAllGyms() // TODO: remove the gym from gymData without GET API call
        alert("Successfully removed gym " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  return (
    <div>
      <button
        onClick={() => {
          setSelectedGym(0)
          setEditingGym(0)
          setAddingGym(true)
        }}
      >
        Add a Gym
      </button>
      <ul>
        {gymData.map((gym) => {
          return (
            <div key={gym.id}>
              {editingGym !== gym.id && (
                <li>
                  <button
                    onClick={() => {
                      setSelectedGym(gym.id)
                      setEditingGym(0)
                      setAddingGym(false)
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGym(0)
                      setEditingGym(gym.id)
                      setAddingGym(false)
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteGym(gym.id)}>Delete</button>
                  <div>ID: {gym.id}</div>
                  <div>Name: {gym.name}</div>
                  <div>Address: {gym.address}</div>
                  <div>City: {gym.city}</div>
                  <Locations
                    gymId={gym.id}
                    selectedGym={selectedGym}
                  ></Locations>
                </li>
              )}
              {editingGym == gym.id && (
                <li>
                  <form>
                    <label>Name:</label>
                    <input
                      type="text"
                      ref={newGymName}
                      defaultValue={gym.name}
                    ></input>
                    <label>Address:</label>
                    <input
                      type="text"
                      ref={newGymAddress}
                      defaultValue={gym.address}
                    ></input>
                    <label>City:</label>
                    <input
                      type="text"
                      ref={newGymCity}
                      defaultValue={gym.city}
                    ></input>
                    <button type="button" onClick={() => editGym(gym.id)}>
                      Confirm
                    </button>
                    <button type="button" onClick={() => setEditingGym(0)}>
                      Cancel
                    </button>
                  </form>
                </li>
              )}
            </div>
          )
        })}
        {addingGym && (
          <li>
            <form>
              <label>Name:</label>
              <input type="text" ref={newGymName}></input>
              <label>Address:</label>
              <input type="text" ref={newGymAddress}></input>
              <label>City:</label>
              <input type="text" ref={newGymCity}></input>
              <button type="button" onClick={() => addGym()}>
                Add
              </button>
              <button type="button" onClick={() => clearGymRefs()}>
                Cancel
              </button>
            </form>
          </li>
        )}
      </ul>
    </div>
  )
}
