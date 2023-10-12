/* eslint-disable max-lines */
import React, {useEffect, useRef, useState} from "react"
import Climbs from "./climbs"
import {
  // convertToViewDateTime,
  convertToEditDateTime,
  getOptions,
  getCurrentDateTime,
  getTimeDifferenceString,
  getInput,
} from "../helpers.js"
import images from "../../images/images.js"
import {
  getAll,
  // get,
  add,
  edit,
  remove,
  gymEndpoint,
  sessionEndpoint,
  climbEndpoint,
} from "../../api/endpoints.js"

export default function Sessions() {
  /*
   * React Hooks:
   *
   * States:
   *  - sessionData: array of sessions
   *  - viewingSession: id of the session being viewed, 0 if none
   *  - edingSession: id of the session being edited, 0 if none
   *  - addingSession: true if a session is being added, false if not
   *
   * Refs:
   *  - newGymId: reference to new gym ID
   *  - newSessionStartTime: reference to new start time
   *  - newSessionEndTime: reference to new end time
   */

  const [sessionData, setSessionData] = useState([])
  const [gymData, setGymData] = useState([])
  // TODO: does not update when a new climb is added
  const [climbData, setClimbData] = useState([])
  const [viewingSession, setViewingSession] = useState(0)
  const [editingSession, setEditingSession] = useState(0)
  const [addingSession, setAddingSession] = useState(false)

  // TODO: interim solution
  const [reload, setReload] = useState(false)

  const newGymId = useRef(0)
  const newUserId = useRef(0)
  const newSessionStartTime = useRef("")
  const newSessionEndTime = useRef("")

  useEffect(() => {
    getAllSessions()
    getAllGyms()
    getAllClimbs()
  }, [reload])

  /*
   * APIs
   */

  function getAllGyms() {
    getAll(gymEndpoint, setGymData)
  }

  function getAllClimbs() {
    getAll(climbEndpoint, setClimbData)
  }

  function getAllSessions() {
    getAll(sessionEndpoint, setSessionData)
  }

  function addSession() {
    add(
      sessionEndpoint,
      getNewSession(),
      sessionData,
      setSessionData,
      clearSessionRefs
    )
  }

  function editSession(sessionId) {
    edit(
      sessionEndpoint,
      sessionId,
      getNewSession(),
      sessionData,
      setSessionData,
      clearSessionRefs
    )
  }

  function deleteSession(sessionId) {
    remove(sessionEndpoint, sessionId, sessionData, setSessionData)
  }

  /*
   * Helper functions
   */

  function clearSessionRefs() {
    newGymId.current.value = 0
    newUserId.current.value = 0
    newSessionStartTime.current.value = ""
    newSessionEndTime.current.value = ""
    changeStates(0, 0, false)
  }

  function getNewSession() {
    return {
      gymId: parseInt(newGymId.current.value),
      userId: parseInt(newUserId.current.value),
      sessionStartTime: newSessionStartTime.current.value,
      sessionEndTime:
        newSessionEndTime.current.value === ""
          ? "0000-00-00 00:00:00"
          : newSessionEndTime.current.value,
    }
  }

  function changeStates(
    newViewingSession,
    newEditingSession,
    newAddingSession
  ) {
    if (viewingSession === newViewingSession) {
      newViewingSession = 0
    }
    setViewingSession(newViewingSession)
    setEditingSession(newEditingSession)
    setAddingSession(newAddingSession)
  }

  function climbText(session) {
    const filteredClimbData = climbData.filter((climb) => {
      return climb.sessionId === session.id
    })

    let climbs = 0
    let attempts = 0
    let sends = 0
    filteredClimbData.forEach((climb) => {
      climbs += 1
      attempts += climb.attempts
      sends += climb.sends
    })

    return ""
      .concat(climbs)
      .concat(" Climbs, ")
      .concat(sends)
      .concat(" Sends, ")
      .concat(attempts)
      .concat(" Attempts, ")
  }

  /*
   * Return value
   */

  return (
    <ul className="dataList outerList">
      <button onClick={() => setReload(!reload)}>Refresh</button>
      {sessionData.map((session) => {
        return (
          <div key={session.id}>
            {editingSession !== session.id && (
              <li className="item">
                <div className="components">
                  <div
                    className="data"
                    onClick={() => changeStates(session.id, 0, false)}
                  >
                    <div className="icons">
                      <div
                        className="colourBar"
                        style={{backgroundColor: "aqua"}}
                      >
                        {session.id}
                      </div>
                      <div
                        className="colourBar"
                        style={{backgroundColor: "grey"}}
                      >
                        {session.gymId}
                      </div>
                      <div
                        className="colourBar"
                        style={{backgroundColor: "purple"}}
                      >
                        {session.userId}
                      </div>
                      <div className="text">
                        {new Date(
                          session.sessionStartTime
                        ).toLocaleDateString()}
                        {" - "}
                        {
                          gymData.find((gym) => {
                            return gym.id === session.gymId
                          })?.city
                        }
                        {" - "}
                        {getTimeDifferenceString(
                          session.sessionStartTime,
                          session.sessionEndTime
                        )}
                        {" - "}
                        {climbText(session)}
                      </div>
                    </div>
                    {/* <div className="date">
                      {convertToViewDateTime(
                        session.sessionStartTime,
                        session.sessionEndTime
                      )}
                    </div> */}
                  </div>
                  <div className="buttons">
                    <button onClick={() => changeStates(0, session.id, false)}>
                      <img src={images.editIcon}></img>
                    </button>
                    <button onClick={() => deleteSession(session.id)}>
                      <img src={images.deleteIcon}></img>
                    </button>
                  </div>
                </div>
                <Climbs
                  sessionId={session.id}
                  viewingSession={viewingSession}
                  gymId={session.gymId}
                ></Climbs>
              </li>
            )}
            {editingSession == session.id && (
              <li className="item">
                <form className="components">
                  <div className="data">
                    <label>Gym ID:</label>
                    <select ref={newGymId} defaultValue={session.gymId}>
                      {gymData.map((gym) => {
                        return getOptions(gym.city, gym.id)
                      })}
                    </select>
                    {getInput(
                      "Start Time",
                      "datetime-local",
                      newSessionStartTime,
                      convertToEditDateTime(session.sessionStartTime)
                    )}
                    {getInput(
                      "End Time",
                      "datetime-local",
                      newSessionEndTime,
                      convertToEditDateTime(session.sessionEndTime)
                    )}
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={() => editSession(session.id)}
                    >
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
      {addingSession && (
        <li className="item">
          <form className="components">
            <div className="data">
              <label>Gym ID:</label>
              <select ref={newGymId}>
                {gymData.map((gym) => {
                  return getOptions(gym.city, gym.id)
                })}
              </select>
              {getInput(
                "Start Time",
                "datetime-local",
                newSessionStartTime,
                convertToEditDateTime(getCurrentDateTime())
              )}
              {getInput("End Time", "datetime-local", newSessionEndTime, null)}
            </div>
            <div className="buttons">
              <button type="button" onClick={() => addSession()}>
                <img src={images.addIcon}></img>
              </button>
              <button type="button" onClick={() => clearSessionRefs()}>
                <img src={images.cancelIcon}></img>
              </button>
            </div>
          </form>
        </li>
      )}
      <button onClick={() => changeStates(0, 0, true)}>Add a Session</button>
    </ul>
  )
}
