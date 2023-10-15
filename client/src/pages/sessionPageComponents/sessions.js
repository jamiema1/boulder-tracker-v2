/* eslint-disable max-lines */
import React, {useEffect, useRef, useState} from "react"
import Climbs from "./climbs"
import {
  // convertToViewDateTime,
  convertToEditDateTime,
  getOptions,
  getCurrentDateTime,
  getTimeDifferenceString,
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
  getQuery,
} from "../../api/endpoints.js"

const sessionCache = {}
const gymCache = {}
const climbCache = {}

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

  const newGymId = useRef(0)
  const newUserId = useRef(0)
  const newSessionStartTime = useRef("")
  const newSessionEndTime = useRef("")

  useEffect(() => {
    if (sessionCache[0]) {
      setSessionData(sessionCache[0])
    } else {
      getAllSessions()
    }

    if (gymCache[0]) {
      setGymData(gymCache[0])
    } else {
      getAllGyms()
    }

    if (climbCache[0]) {
      setClimbData(climbCache[0])
    } else {
      getAllClimbs()
    }
  }, [])

  /*
   * APIs
   */

  function getAllGyms() {
    getAll(gymEndpoint, gymCache, 0, setGymData)
  }

  function getAllClimbs() {
    getAll(climbEndpoint, climbCache, 0, setClimbData)
  }

  function getAllSessions() {
    getQuery(
      sessionEndpoint,
      sessionCache,
      0,
      {where: "", orderby: [{id: "DESC"}]},
      setSessionData
    )
  }

  function addSession() {
    add(
      sessionEndpoint,
      sessionCache,
      0,
      getNewSession(),
      sessionData,
      setSessionData,
      clearSessionRefs
    )
  }

  function editSession(sessionId) {
    edit(
      sessionEndpoint,
      sessionCache,
      0,
      sessionId,
      getNewSession(),
      sessionData,
      setSessionData,
      clearSessionRefs
    )
  }

  function deleteSession(sessionId) {
    remove(
      sessionEndpoint,
      sessionCache,
      0,
      sessionId,
      sessionData,
      setSessionData
    )
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

    return (
      <div className="rightColumn">
        <div className="text">{climbs} Climbs</div>
        <div className="text">{attempts} Attempts</div>
        <div className="text">{sends} Sends</div>
      </div>
    )
  }

  /*
   * Return value
   */

  return (
    <ul className="dataList outerList">
      {!addingSession && (
        <button className="topButtons" onClick={() => changeStates(0, 0, true)}>
          Add a Session
        </button>
      )}
      {addingSession && (
        <li className="item">
          <form className="components">
            <div className="fields">
              <label>Gym ID:</label>
              <select ref={newGymId}>
                {gymData.map((gym) => {
                  return getOptions(gym.city, gym.id)
                })}
              </select>
              <label>User ID:</label>
              <input type="number" ref={newUserId} defaultValue={1}></input>
              <label>Start Time:</label>
              <input
                type="datetime-local"
                ref={newSessionStartTime}
                defaultValue={convertToEditDateTime(getCurrentDateTime())}
              ></input>
              <label>End Time:</label>
              <input type="datetime-local" ref={newSessionEndTime}></input>
            </div>
            <div className="buttons">
              <button
                className="confirmButton"
                type="button"
                onClick={() => addSession()}
              >
                <img src={images.addIcon}></img>
              </button>
              <button
                className="cancelButton"
                type="button"
                onClick={() => clearSessionRefs()}
              >
                <img src={images.cancelIcon}></img>
              </button>
            </div>
          </form>
        </li>
      )}
      {sessionData.map((session) => {
        return (
          <div key={session.id}>
            {editingSession !== session.id && (
              <li className="item">
                <div className="components">
                  <div
                    className="leftColumn"
                    onClick={() => changeStates(session.id, 0, false)}
                  >
                    <div className="text">
                      {new Date(session.sessionStartTime).toLocaleDateString()}
                    </div>
                    <div className="text">
                      {
                        gymData.find((gym) => {
                          return gym.id === session.gymId
                        })?.city
                      }
                    </div>
                    <div className="text">
                      {getTimeDifferenceString(
                        session.sessionStartTime,
                        session.sessionEndTime
                      )}
                    </div>
                  </div>
                  {climbText(session)}
                  {viewingSession == session.id && (
                    <div className="buttons">
                      <button
                        type="button"
                        className="editButton"
                        onClick={() => changeStates(0, session.id, false)}
                      >
                        <img src={images.editIcon}></img>
                      </button>
                      <button
                        type="button"
                        className="deleteButton"
                        onClick={() => deleteSession(session.id)}
                      >
                        <img src={images.deleteIcon}></img>
                      </button>
                    </div>
                  )}
                </div>
                {viewingSession == session.id && (
                  <Climbs
                    sessionId={session.id}
                    gymId={session.gymId}
                    gymData={gymData}
                  ></Climbs>
                )}
              </li>
            )}
            {editingSession == session.id && (
              <li className="item">
                <form className="components">
                  <div className="fields">
                    <label>Gym ID:</label>
                    <select ref={newGymId} defaultValue={session.gymId}>
                      {gymData.map((gym) => {
                        return getOptions(gym.city, gym.id)
                      })}
                    </select>
                    <label>User ID:</label>
                    <input
                      type="number"
                      ref={newUserId}
                      defaultValue={session.userId}
                    ></input>
                    <label>Start Time:</label>
                    <input
                      type="datetime-local"
                      ref={newSessionStartTime}
                      defaultValue={convertToEditDateTime(
                        session.sessionStartTime
                      )}
                    ></input>
                    <label>End Time:</label>
                    <input
                      type="datetime-local"
                      ref={newSessionEndTime}
                      defaultValue={convertToEditDateTime(
                        session.sessionEndTime
                      )}
                    ></input>
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      className="confirmButton"
                      onClick={() => editSession(session.id)}
                    >
                      <img src={images.confirmIcon}></img>
                    </button>
                    <button
                      type="button"
                      className="cancelButton"
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
