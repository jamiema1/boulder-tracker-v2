import React, {useEffect, useRef, useState} from "react"
import Axios from "../../api/Axios"
import {
  convertToViewDateTime,
  convertToEditDateTime,
  getCurrentDateTime,
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
  const [viewingClimb, setViewingClimb] = useState(0)
  const [editingClimb, setEditingClimb] = useState(0)
  const [addingClimb, setAddingClimb] = useState(false)

  const newBoulderId = useRef(0)
  const newAttempts = useRef(0)
  const newSends = useRef(0)
  const newClimbStartTime = useRef("")
  const newClimbEndTime = useRef("")

  const sessionId = props.sessionId
  let viewingSession = props.viewingSession

  useEffect(() => {
    setViewingClimb(0)
    if (sessionId !== viewingSession) {
      setClimbData([])
      changeStates(0, 0, false)
      return
    }
    getAllClimbs()
  }, [viewingSession])

  /*
   * APIs
   */

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
                    className="data viewData"
                    onClick={() => changeStates(climb.id, 0, false)}
                  >
                    {climb.id} - {climb.boulderId} | {climb.sessionId} |{" "}
                    {climb.attempts} | {climb.sends} |{" "}
                    {convertToViewDateTime(
                      climb.climbStartTime,
                      climb.climbEndTime
                    )}
                  </div>
                  <div className="buttons">
                    <button onClick={() => changeStates(0, climb.id, false)}>
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
                    <label>Boulder ID:</label>
                    <input
                      type="number"
                      ref={newBoulderId}
                      defaultValue={climb.boulderId}
                    ></input>
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
      {addingClimb && (
        <li className="item">
          <form className="components">
            <div className="data">
              <label>Boulder ID:</label>
              <input type="number" ref={newBoulderId}></input>
              <label>Attempts:</label>
              <input type="number" ref={newAttempts}></input>
              <label>Sends:</label>
              <input type="number" ref={newSends}></input>
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
        <button onClick={() => changeStates(0, 0, true)}>Add a Climb</button>
      )}
    </ul>
  )
}
