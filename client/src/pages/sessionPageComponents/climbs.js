/* eslint-disable max-lines */
import React, {useEffect, useRef, useState} from "react"
import {
  convertToEditDateTime,
  getCurrentDateTime,
  getOptions,
} from "../helpers.js"
import images from "../../images/images.js"
import {
  get,
  add,
  edit,
  remove,
  boulderEndpoint,
  climbEndpoint,
  locationEndpoint,
} from "../../api/endpoints.js"

export default function Climbs(props) {
  /*
   * React Hooks:
   *
   * States:
   *  - climbData: array of climbs
   *  - viewingClimb: id of the climb being viewed, 0 if none
   *  - edingClimb: id of the climb being edited, 0 if none
   *  - addingClimb: true if a climb is being added, false if not
   *
   * Refs:
   *  - newBoulderId: reference to new boulder ID
   *  - newClimbStartTime: reference to new start time
   *  - newClimbEndTime: reference to new end time
   */

  const [allClimbData, setAllClimbData] = useState([])
  const [climbData, setClimbData] = useState([])
  const [locationData, setLocationData] = useState([])
  const [allLocationData, setAllLocationData] = useState([])
  const [boulderData, setBoulderData] = useState([])
  const [allBoulderData, setAllBoulderData] = useState([])
  const [viewingClimb, setViewingClimb] = useState(0)
  const [editingClimb, setEditingClimb] = useState(0)
  const [addingClimb, setAddingClimb] = useState(false)

  const newLocationId = useRef(0)
  const newBoulderId = useRef(0)
  const newAttempts = useRef(0)
  const newSends = useRef(0)
  const newClimbStartTime = useRef("")
  const newClimbEndTime = useRef("")

  useEffect(() => {
    getAllClimbs()
    getAllLocations()
    getAllBoulders()
  }, [
    props.locationDataCentral,
    props.boulderDataCentral,
    props.climbDataCentral,
  ])

  useEffect(() => {
    setClimbData(
      allClimbData.filter(
        (climb) => parseInt(climb.sessionId) === parseInt(props.sessionId)
      )
    )
  }, [allClimbData])

  useEffect(() => {
    setLocationData(
      allLocationData.filter(
        (location) => parseInt(location.gymId) === parseInt(props.gymId)
      )
    )
  }, [allLocationData])

  /*
   * APIs
   */

  function getAllLocations() {
    get(
      locationEndpoint,
      props.locationDataCentral,
      props.setLocationDataCentral,
      setAllLocationData
    )
  }

  function getBoulders(locationId) {
    setBoulderData(
      allBoulderData.filter(
        (boulder) => parseInt(boulder.locationId) === parseInt(locationId)
      )
    )
  }

  function getAllBoulders() {
    get(
      boulderEndpoint,
      props.boulderDataCentral,
      props.setBoulderDataCentral,
      setAllBoulderData
    )
  }

  function getAllClimbs() {
    get(
      climbEndpoint,
      props.climbDataCentral,
      props.setClimbDataCentral,
      setAllClimbData
    )
  }

  function addClimb() {
    add(
      climbEndpoint,
      props.climbDataCentral,
      props.setClimbDataCentral,
      getNewClimb(),
      setAllClimbData,
      clearClimbRefs
    )
  }

  function editClimb(climbId) {
    edit(
      climbEndpoint,
      climbId,
      props.climbDataCentral,
      props.setClimbDataCentral,
      getNewClimb(),
      setAllClimbData,
      clearClimbRefs
    )
  }

  function deleteClimb(climbId) {
    remove(
      climbEndpoint,
      climbId,
      props.climbDataCentral,
      props.setClimbDataCentral,
      setAllClimbData
    )
  }

  /*
   * Helper functions
   */

  function clearClimbRefs() {
    newBoulderId.current.value = 0
    newAttempts.current.value = 0
    newSends.current.value = 0
    newClimbStartTime.current.value = ""
    newClimbEndTime.current.value = ""
    changeStates(0, 0, false)
  }

  function getNewClimb() {
    return {
      boulderId: parseInt(newBoulderId.current.value),
      sessionId: parseInt(props.sessionId),
      attempts: parseInt(newAttempts.current.value),
      sends: parseInt(newSends.current.value),
      climbStartTime: newClimbStartTime.current.value,
      climbEndTime: newClimbEndTime.current.value,
    }
  }

  function changeStates(newViewingClimb, newEditingClimb, newAddingClimb) {
    if (viewingClimb === newViewingClimb) {
      newViewingClimb = 0
    }

    setViewingClimb(newViewingClimb)
    setEditingClimb(newEditingClimb)
    setAddingClimb(newAddingClimb)
  }

  function loadInitialBoulders() {
    locationData.some((location) => {
      getBoulders(location.id)
      return true
    })
  }

  function boulderText(climb) {
    const boulder = allBoulderData.find((boulder) => {
      return parseInt(boulder.id) === parseInt(climb.boulderId)
    })

    if (boulder === undefined) {
      return
    }

    return boulder.description
  }

  function getBoulderColour(climb) {
    const boulder = allBoulderData.find((boulder) => {
      return parseInt(boulder.id) === parseInt(climb.boulderId)
    })

    if (boulder === undefined) {
      return
    }

    return boulder.colour
  }

  function getBoulderRating(climb) {
    const boulder = allBoulderData.find((boulder) => {
      return parseInt(boulder.id) === parseInt(climb.boulderId)
    })

    if (boulder === undefined) {
      return
    }

    return boulder.rating
  }

  function getHexImage(rating) {
    switch (rating) {
    case -1:
      return images.unrated
    case 0:
      return images.sixHex
    case 1:
      return images.oneHex
    case 2:
      return images.twoHex
    case 3:
      return images.threeHex
    case 4:
      return images.fourHex
    case 5:
      return images.fiveHex
    case 6:
      return images.sixHex
    }
  }

  function getBoulderType(climb) {
    const boulder = allBoulderData.find((boulder) => {
      return parseInt(boulder.id) === parseInt(climb.boulderId)
    })

    if (boulder === undefined) {
      return
    }

    return boulder.boulderType
  }

  function getBoulderTypeImage(boulderType) {
    switch (boulderType) {
    case "Slab":
      return images.slab
    case "Overhang":
      return images.overhang
    }
  }

  /*
   * Return value
   */

  return (
    <ul className="dataList">
      {!addingClimb && (
        <button
          className="topButtons"
          onClick={() => {
            changeStates(0, 0, true)
            loadInitialBoulders()
          }}
        >
          Add a Climb
        </button>
      )}
      {addingClimb && (
        <li className="item">
          <form className="components">
            <div className="fields">
              <label>Location:</label>
              <select
                ref={newLocationId}
                onChange={(e) => getBoulders(e.target.value)}
              >
                {locationData.map((location) => {
                  return getOptions(location.name, location.id)
                })}
              </select>
              <label>Boulder:</label>
              <select ref={newBoulderId}>
                {boulderData.map((boulder) => {
                  return getOptions(
                    boulder.rating +
                      " | " +
                      boulder.colour +
                      " | " +
                      boulder.boulderType +
                      " | " +
                      boulder.description.substring(0, 25),
                    boulder.id
                  )
                })}
              </select>
              <label>Attempts:</label>
              <input type="number" ref={newAttempts} defaultValue={1}></input>
              <label>Sends:</label>
              <input type="number" ref={newSends} defaultValue={0}></input>
              <label>Start Time:</label>
              <input
                type="datetime-local"
                ref={newClimbStartTime}
                defaultValue={getCurrentDateTime()}
              ></input>
              <label>End Time:</label>
              <input
                type="datetime-local"
                ref={newClimbEndTime}
                defaultValue={getCurrentDateTime()}
              ></input>
            </div>
            <div className="buttons">
              <button
                type="button"
                className="addButton"
                onClick={() => addClimb()}
              >
                <img src={images.addIcon}></img>
              </button>
              <button
                type="button"
                className="cancelButton"
                onClick={() => clearClimbRefs()}
              >
                <img src={images.cancelIcon}></img>
              </button>
            </div>
          </form>
        </li>
      )}
      {[...climbData].reverse().map((climb) => {
        return (
          <div key={climb.id}>
            {editingClimb !== climb.id && (
              <li className="item">
                <div className="components">
                  {/* <div
                    className="colourBar"
                    style={{backgroundColor: "magenta"}}
                  >
                    {climb.id}
                  </div>
                  <div
                    className="colourBar"
                    style={{backgroundColor: "teal"}}
                  >
                    {climb.boulderId}
                  </div> */}
                  <div
                    className="colourBar"
                    style={{backgroundColor: getBoulderColour(climb)}}
                  ></div>
                  <div className="hex">
                    <img
                      className="hexImage"
                      src={getHexImage(getBoulderRating(climb))}
                    ></img>
                  </div>
                  <div className="hex">
                    <img
                      className="hexImage"
                      src={getBoulderTypeImage(getBoulderType(climb))}
                    ></img>
                  </div>
                  <div
                    className="data climbData"
                    onClick={() => changeStates(climb.id, 0, false)}
                  >
                    <div className="text">
                      {climb.sends} / {climb.attempts}
                    </div>
                    <div className="text">{boulderText(climb)}</div>
                    {/* <div className="text">
                      {convertToViewDateTime(
                        climb.climbStartTime,
                        climb.climbEndTime
                      )}
                    </div> */}
                  </div>
                  {viewingClimb == climb.id && (
                    <div className="buttons">
                      <button
                        type="button"
                        className="editButton"
                        onClick={() => {
                          changeStates(0, climb.id, false)
                          loadInitialBoulders()
                        }}
                      >
                        <img src={images.editIcon}></img>
                      </button>
                      <button
                        type="button"
                        className="deleteButton"
                        onClick={() => deleteClimb(climb.id)}
                      >
                        <img src={images.deleteIcon}></img>
                      </button>
                    </div>
                  )}
                </div>{" "}
              </li>
            )}
            {editingClimb == climb.id && (
              <li className="item">
                <form className="components">
                  <div className="fields">
                    <label>Location:</label>
                    <select
                      ref={newLocationId}
                      onChange={(e) => getBoulders(e.target.value)}
                    >
                      {locationData.map((location) => {
                        return getOptions(location.name, location.id)
                      })}
                    </select>
                    <label>Boulder:</label>
                    <select ref={newBoulderId} defaultValue={climb.boulderId}>
                      {boulderData.map((boulder) => {
                        return getOptions(
                          boulder.rating +
                            " | " +
                            boulder.colour +
                            " | " +
                            boulder.boulderType +
                            " | " +
                            boulder.description.substring(0, 50),
                          boulder.id
                        )
                      })}
                    </select>
                    <label>Attempts:</label>
                    <input
                      type="number"
                      ref={newAttempts}
                      defaultValue={climb.attempts}
                    ></input>
                    <label>Sends:</label>
                    <input
                      type="number"
                      ref={newSends}
                      defaultValue={climb.sends}
                    ></input>
                    <label>Start Time:</label>
                    <input
                      type="datetime-local"
                      ref={newClimbStartTime}
                      defaultValue={convertToEditDateTime(climb.climbStartTime)}
                    ></input>
                    <label>End Time:</label>
                    <input
                      type="datetime-local"
                      ref={newClimbEndTime}
                      defaultValue={convertToEditDateTime(climb.climbEndTime)}
                    ></input>
                  </div>
                  <div className="buttons">
                    <button type="button" onClick={() => editClimb(climb.id)}>
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
