import React, {useEffect, useRef, useState} from "react"
import Locations from "./locations"

import images from "../../images/images.js"
import {get, add, edit, remove, gymEndpoint} from "../../api/endpoints.js"

export default function Gyms(props) {
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
    getGyms()
  }, [props.gymDataCentral])

  /*
   * APIs
   */

  function getGyms() {
    get(gymEndpoint, props.gymDataCentral, props.setGymDataCentral, setGymData)
  }

  function addGym() {
    add(
      gymEndpoint,
      props.gymDataCentral,
      props.setGymDataCentral,
      getNewGym(),
      setGymData,
      clearGymRefs
    )
  }

  function editGym(gymId) {
    edit(
      gymEndpoint,
      gymId,
      props.gymDataCentral,
      props.setGymDataCentral,
      getNewGym(),
      setGymData,
      clearGymRefs
    )
  }

  function deleteGym(gymId) {
    remove(
      gymEndpoint,
      gymId,
      props.gymDataCentral,
      props.setGymDataCentral,
      setGymData
    )
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
      {!addingGym && (
        <button className="topButtons" onClick={() => changeStates(0, 0, true)}>
          Add a Gym
        </button>
      )}
      {addingGym && (
        <li className="item">
          <form className="components">
            <div className="leftColumn">
              <div className="fields">
                <label>Name:</label>
                <input type="text" ref={newGymName}></input>
                <label>Address:</label>
                <input type="text" ref={newGymAddress}></input>
                <label>City:</label>
                <input type="text" ref={newGymCity}></input>
              </div>
            </div>
            <div className="rightColumn "></div>
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
      {gymData.map((gym) => {
        return (
          <div key={gym.id}>
            {editingGym !== gym.id && (
              <li className="item">
                <div className="components">
                  <div
                    className="colourBar"
                    style={{backgroundColor: "grey"}}
                  >
                    {/* {gym.id} */}
                  </div>
                  <div
                    className="leftColumn"
                    onClick={() => changeStates(gym.id, 0, false)}
                  >
                    <div className="text">{gym.name}</div>
                    <div className="text">{gym.city}</div>
                  </div>
                  <div className="rightColumn gymAddress">
                    <div className="text">{gym.address}</div>
                  </div>
                  {viewingGym == gym.id && (
                    <div className="buttons">
                      <button onClick={() => changeStates(0, gym.id, false)}>
                        <img src={images.editIcon}></img>
                      </button>
                      <button onClick={() => deleteGym(gym.id)}>
                        <img src={images.deleteIcon}></img>
                      </button>
                    </div>
                  )}
                </div>
                {viewingGym == gym.id && (
                  <Locations
                    gymId={gym.id}
                    locationDataCentral={props.locationDataCentral}
                    setLocationDataCentral={props.setLocationDataCentral}
                    boulderDataCentral={props.boulderDataCentral}
                    setBoulderDataCentral={props.setBoulderDataCentral}
                    climbDataCentral={props.climbDataCentral}
                    setClimbDataCentral={props.setClimbDataCentral}
                  ></Locations>
                )}
              </li>
            )}
            {editingGym == gym.id && (
              <li className="item">
                <form className="components">
                  <div className="leftColumn">
                    <div className="fields">
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
                    </div>
                  </div>
                  <div className="rightColumn"></div>
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
    </ul>
  )
}
