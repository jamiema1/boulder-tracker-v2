import React, {useEffect, useRef, useState} from "react"
import Axios from "../../api/Axios"
import Locations from "./locations"

import images from "../../images/images.js"
import {getInput} from "../helpers.js"

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
        // alert("Successfully added gym " + res.data.data[0].id)
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
        // alert("Successfully edited gym " + res.data.data[0].id)
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

  function changeStates(newViewingGym, newEditingGym, newAddingGym) {
    if (viewingGym === newViewingGym) {
      newViewingGym = 0
    }
    setViewingGym(newViewingGym)
    setEditingGym(newEditingGym)
    setAddingGym(newAddingGym)
  }

  /*
   * Return value
   */

  return (
    <ul className="dataList outerList">
      <div className="pageTitle">Gyms</div>
      {gymData.map((gym) => {
        return (
          <div key={gym.id}>
            {editingGym !== gym.id && (
              <li className="item">
                <div className="components">
                  <div
                    className="data"
                    onClick={() => changeStates(gym.id, 0, false)}
                  >
                    <div className="icons">
                      <div
                        className="colourBar"
                        style={{backgroundColor: "grey"}}
                      >
                        {gym.id}
                      </div>
                      <div className="text">
                        {gym.city} - {gym.name}
                      </div>
                    </div>
                    <div className="date">{gym.address}</div>
                  </div>
                  <div className="buttons">
                    <button onClick={() => changeStates(0, gym.id, false)}>
                      <img src={images.editIcon}></img>
                    </button>
                    <button onClick={() => deleteGym(gym.id)}>
                      <img src={images.deleteIcon}></img>
                    </button>
                  </div>
                </div>
                <Locations gymId={gym.id} viewingGym={viewingGym}></Locations>
              </li>
            )}
            {editingGym == gym.id && (
              <li className="item">
                <form className="components">
                  <div className="data">
                    {getInput("Name", "text", newGymName, gym.name)}
                    {getInput("Address", "text", newGymAddress, gym.address)}
                    {getInput("City", "text", newGymCity, gym.city)}
                  </div>
                  <div className="buttons">
                    <button type="button" onClick={() => editGym(gym.id)}>
                      <img src={images.confirmIcon}></img>
                    </button>
                    <button
                      type="button"
                      onClick={() => changeStates(0, 0, false)}
                    >
                      <img src={images.cancelIcon}></img>
                    </button>
                  </div>
                </form>
              </li>
            )}
          </div>
        )
      })}
      {addingGym && (
        <li className="item">
          <form className="components">
            <div className="data">
              {getInput("Name", "text", newGymName, null)}
              {getInput("Address", "text", newGymAddress, null)}
              {getInput("City", "text", newGymCity, null)}
            </div>
            <div className="buttons">
              <button type="button" onClick={() => addGym()}>
                <img src={images.addIcon}></img>
              </button>
              <button type="button" onClick={() => clearGymRefs()}>
                <img src={images.cancelIcon}></img>
              </button>
            </div>
          </form>
        </li>
      )}
      {!addingGym && (
        <button onClick={() => changeStates(0, 0, true)}>Add a Gym</button>
      )}
    </ul>
  )
}
