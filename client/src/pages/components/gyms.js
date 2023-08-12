import React, {useEffect, useRef, useState} from "react"
import Axios from "../../api/Axios"
import Locations from "./locations"

export default function Gyms() {
  /*
   * React Hooks:
   *
   * States:
   *  - gymData: array of gyms
   *  - viewingGym: id of the gym being viewed, 0 if none
   *  - edingGym: id of the gym being edited, 0 if none
   *  - addingGym: true if a gym is being added, false if not
   *
   * Refs:
   *  - newGymName: reference to new name
   *  - newGymAddress: reference to new address
   *  - new GymCity: reference to new city
   */

  const [gymData, setGymData] = useState([])
  const [viewingGym, setViewingGym] = useState(0)
  const [editingGym, setEditingGym] = useState(0)
  const [addingGym, setAddingGym] = useState(false)

  const newGymName = useRef("")
  const newGymAddress = useRef("")
  const newGymCity = useRef("")

  useEffect(() => {
    getAllGyms()
  }, [])

  /*
   * APIs
   */

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
    const newGym = getNewGym()

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

  function editGym(gymId) {
    const newGym = getNewGym()

    Axios.put("/gym/" + gymId, newGym)
      .then((res) => {
        clearGymRefs()
        if (res.status === 202) {
          alert(res.data.error)
          return
        }
        getAllGyms() // TODO: update the gym from gymData without GET API call
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

  /*
   * Helper functions
   */

  function clearGymRefs() {
    newGymName.current.value = ""
    newGymAddress.current.value = ""
    newGymCity.current.value = ""
    changeStates(0, 0, false)
  }

  function getNewGym() {
    return {
      name: newGymName.current.value,
      address: newGymAddress.current.value,
      city: newGymCity.current.value,
    }
  }

  function changeStates(viewingGym, editingGym, addingGym) {
    setViewingGym(viewingGym)
    setEditingGym(editingGym)
    setAddingGym(addingGym)
  }

  /*
   * Return value
   */

  return (
    <ul>
      {gymData.map((gym) => {
        return (
          <div key={gym.id}>
            {editingGym !== gym.id && (
              <li>
                <button onClick={() => changeStates(gym.id, 0, false)}>
                  View
                </button>
                <button onClick={() => changeStates(0, gym.id, false)}>
                  Edit
                </button>
                <button onClick={() => deleteGym(gym.id)}>Delete</button>
                <div>ID: {gym.id}</div>
                <div>Name: {gym.name}</div>
                <div>Address: {gym.address}</div>
                <div>City: {gym.city}</div>
                <Locations gymId={gym.id} viewingGym={viewingGym}></Locations>
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
                  <button
                    type="button"
                    onClick={() => changeStates(0, 0, false)}
                  >
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
      <button onClick={() => changeStates(0, 0, true)}>Add a Gym</button>
    </ul>
  )
}
