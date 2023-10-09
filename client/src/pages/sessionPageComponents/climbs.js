/* eslint-disable max-lines */
import React, {useEffect, useRef, useState} from "react"
import Axios from "../../api/axios.js"
import {
  convertToViewDateTime,
  convertToEditDateTime,
  getCurrentDateTime,
  getOptions,
  getInput,
} from "../helpers.js"
import images from "../../images/images.js"

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

  const [climbData, setClimbData] = useState([])
  const [locationData, setLocationData] = useState([])
  const [selectedBoulderData, setSelectedBoulderData] = useState([])
  const [boulderData, setBoulderData] = useState([])
  const [viewingClimb, setViewingClimb] = useState(0)
  const [editingClimb, setEditingClimb] = useState(0)
  const [addingClimb, setAddingClimb] = useState(false)

  const newLocationId = useRef(0)
  const newBoulderId = useRef(0)
  const newAttempts = useRef(0)
  const newSends = useRef(0)
  const newClimbStartTime = useRef("")
  const newClimbEndTime = useRef("")

  const sessionId = props.sessionId
  let viewingSession = props.viewingSession
  const gymId = props.gymId

  useEffect(() => {
    setViewingClimb(0)
    if (sessionId !== viewingSession) {
      setClimbData([])
      setSelectedBoulderData([])
      setBoulderData([])
      setLocationData([])
      changeStates(0, 0, false)
      return
    }
    getAllClimbs()
    getAllBoulders()
    getLocations()
  }, [viewingSession])

  /*
   * APIs
   */

  function getLocations() {
    let params = {
      where: "gymId = " + gymId,
    }

    const uri = encodeURIComponent(JSON.stringify(params))

    Axios.get("/location/query/" + uri)
      .then((res) => {
        setLocationData(res.data.data)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function getBoulders(locationId) {
    setSelectedBoulderData([])
    let params = {
      where: "(locationId = " + locationId + " AND setEndDate = '0000-00-00')",
    }

    const uri = encodeURIComponent(JSON.stringify(params))

    Axios.get("/boulder/query/" + uri)
      .then((res) => {
        setSelectedBoulderData(res.data.data)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function getAllBoulders() {
    let params = {
      where: "setEndDate = '0000-00-00'",
    }

    const uri = encodeURIComponent(JSON.stringify(params))

    Axios.get("/boulder/query/" + uri)
      .then((res) => {
        setBoulderData(res.data.data)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function getAllClimbs() {
    let params = {
      where: "sessionId = " + viewingSession,
    }

    const uri = encodeURIComponent(JSON.stringify(params))

    Axios.get("/climb/query/" + uri)
      .then((res) => {
        setClimbData(res.data.data)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function addClimb() {
    const newClimb = getNewClimb()

    Axios.post("/climb", newClimb)
      .then((res) => {
        setClimbData([...climbData, {id: res.data.data[0].id, ...newClimb}])
        clearClimbRefs()
        // alert("Successfully added climb " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function editClimb(climbId) {
    const newClimb = getNewClimb()

    console.log(newClimb)

    Axios.put("/climb/" + climbId, newClimb)
      .then((res) => {
        clearClimbRefs()
        if (res.status === 202) {
          alert(res.data.error)
          return
        }
        getAllClimbs()
        // TODO: update the climb from climbData without GET API call
        // alert("Successfully edited climb " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function deleteClimb(climbId) {
    Axios.delete("/climb/" + climbId)
      .then((res) => {
        getAllClimbs()
        // TODO: remove the climb from climbData without GET API call
        alert("Successfully removed climb " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
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
      sessionId: sessionId,
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
    const boulder = boulderData.find((boulder) => {
      return boulder.id === climb.boulderId
    })

    if (boulder === undefined) {
      return
    }

    return ""
      .concat(boulder.rating)
      .concat(" - ")
      .concat(boulder.colour)
      .concat(" - ")
      .concat(boulder.boulderType)
      .concat(" - ")
      .concat(boulder.description)
      .concat(" | ")
  }
  /*
   * Return value
   */

  return (
    <ul className="dataList">
      {climbData.map((climb) => {
        return (
          <div key={climb.id}>
            {editingClimb !== climb.id && (
              <li className="item">
                <div className="components">
                  <div
                    className="data"
                    onClick={() => changeStates(climb.id, 0, false)}
                  >
                    <div className="icons">
                      <div
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
                      </div>
                      <div className="text">
                        {boulderText(climb)}
                        Completion Rate: {climb.sends} / {climb.attempts}
                      </div>
                    </div>
                    <div className="date">
                      {convertToViewDateTime(
                        climb.climbStartTime,
                        climb.climbEndTime
                      )}
                    </div>
                  </div>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        changeStates(0, climb.id, false)
                        loadInitialBoulders()
                      }}
                    >
                      <img src={images.editIcon}></img>
                    </button>
                    <button onClick={() => deleteClimb(climb.id)}>
                      <img src={images.deleteIcon}></img>
                    </button>
                  </div>
                </div>{" "}
              </li>
            )}
            {editingClimb == climb.id && (
              <li className="item">
                <form className="components">
                  <div className="data">
                    <div className="field">
                      <label>Location:</label>
                      <select
                        ref={newLocationId}
                        onChange={(e) => getBoulders(e.target.value)}
                      >
                        {locationData.map((location) => {
                          return getOptions(location.name, location.id)
                        })}
                      </select>
                    </div>
                    <div className="field">
                      <label>Boulder:</label>
                      <select ref={newBoulderId} defaultValue={climb.boulderId}>
                        {selectedBoulderData.map((boulder) => {
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
                    </div>
                    {getInput(
                      "Attempts",
                      "number",
                      newAttempts,
                      climb.attempts
                    )}
                    {getInput("Sends", "number", newSends, climb.sends)}
                    {getInput(
                      "Start Time",
                      "datetime-local",
                      newClimbStartTime,
                      convertToEditDateTime(climb.climbStartTime)
                    )}
                    {getInput(
                      "End Time",
                      "datetime-local",
                      newClimbEndTime,
                      convertToEditDateTime(climb.climbEndTime)
                    )}
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
      {addingClimb && (
        <li className="item">
          <form className="components">
            <div className="data">
              <div className="field">
                <label>Location:</label>
                <select
                  ref={newLocationId}
                  onChange={(e) => getBoulders(e.target.value)}
                >
                  {locationData.map((location) => {
                    return getOptions(location.name, location.id)
                  })}
                </select>
              </div>
              <div className="field">
                <label>Boulder:</label>
                <select ref={newBoulderId}>
                  {selectedBoulderData.map((boulder) => {
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
              </div>
              {getInput("Attempts", "number", newAttempts, null)}
              {getInput("Sends", "number", newSends, null)}
              {getInput(
                "Start Time",
                "datetime-local",
                newClimbStartTime,
                getCurrentDateTime()
              )}
              {getInput(
                "End Time",
                "datetime-local",
                newClimbEndTime,
                getCurrentDateTime()
              )}
            </div>
            <div className="buttons">
              <button type="button" onClick={() => addClimb()}>
                <img src={images.addIcon}></img>
              </button>
              <button type="button" onClick={() => clearClimbRefs()}>
                <img src={images.cancelIcon}></img>
              </button>
            </div>
          </form>
        </li>
      )}
      {viewingSession === sessionId && !addingClimb && (
        <button
          onClick={() => {
            changeStates(0, 0, true)
            loadInitialBoulders()
          }}
        >
          Add a Climb
        </button>
      )}
    </ul>
  )
}
