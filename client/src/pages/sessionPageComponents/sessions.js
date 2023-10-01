import React, {useEffect, useRef, useState} from "react"
import Axios from "../../api/Axios"
import Climbs from "./climbs"
import editIcon from "../../images/editIcon.png"
import deleteIcon from "../../images/deleteIcon.png"
import cancelIcon from "../../images/cancelIcon.png"
import confirmIcon from "../../images/confirmIcon.png"
import addIcon from "../../images/addIcon.png"

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
  const [viewingSession, setViewingSession] = useState(0)
  const [editingSession, setEditingSession] = useState(0)
  const [addingSession, setAddingSession] = useState(false)

  const newGymId = useRef(0)
  const newSessionStartTime = useRef("")
  const newSessionEndTime = useRef("")

  useEffect(() => {
    getAllSessions()
  }, [])

  /*
   * APIs
   */

  function getAllSessions() {
    Axios.get("/session")
      .then((res) => {
        setSessionData(res.data.data)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function addSession() {
    const newSession = getNewSession()

    Axios.post("/session", newSession)
      .then((res) => {
        setSessionData([
          ...sessionData,
          {id: res.data.data[0].id, ...newSession},
        ])
        clearSessionRefs()
        alert("Successfully added session " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function editSession(sessionId) {
    const newSession = getNewSession()

    Axios.put("/session/" + sessionId, newSession)
      .then((res) => {
        clearSessionRefs()
        if (res.status === 202) {
          alert(res.data.error)
          return
        }
        getAllSessions()
        // TODO: update the session from sessionData without GET API call
        alert("Successfully edited session " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function deleteSession(sessionId) {
    Axios.delete("/session/" + sessionId)
      .then((res) => {
        getAllSessions()
        // TODO: remove the session from sessionData without GET API call
        alert("Successfully removed session " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  /*
   * Helper functions
   */

  function clearSessionRefs() {
    newGymId.current.value = 0
    newSessionStartTime.current.value = ""
    newSessionEndTime.current.value = ""
    changeStates(0, 0, false)
  }

  function getNewSession() {
    return {
      gymId: parseInt(newGymId.current.value),
      sessionStartTime: newSessionStartTime.current.value,
      sessionEndTime: newSessionEndTime.current.value,
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

  function convertToDate(dateTime) {
    if (dateTime === null) {
      return "0000-00-00" // TODO: unsure about this return value
    }
    return dateTime.split("T")[0]
  }

  /*
   * Return value
   */

  return (
    <ul>
      {sessionData.map((session) => {
        return (
          <div key={session.id}>
            {editingSession !== session.id && (
              <li className="session">
                <div className="components">
                  <div
                    className="data"
                    onClick={() => changeStates(session.id, 0, false)}
                  >
                    {session.id} - {session.gymId} |{" "}
                    {convertToDate(session.sessionStartTime)}
                  </div>
                  <div className="buttons">
                    <button onClick={() => changeStates(0, session.id, false)}>
                      <img src={editIcon}></img>
                    </button>
                    <button onClick={() => deleteSession(session.id)}>
                      <img src={deleteIcon}></img>
                    </button>
                  </div>
                </div>{" "}
                <Climbs
                  sessionId={session.id}
                  viewingSession={viewingSession}
                ></Climbs>
              </li>
            )}
            {editingSession == session.id && (
              <li className="session">
                <form className="components">
                  <div className="data">
                    <label>Gym ID:</label>
                    <input
                      type="number"
                      ref={newGymId}
                      defaultValue={session.gymId}
                    ></input>
                    <label>Start Time:</label>
                    <input
                      type="datetime-local"
                      ref={newSessionStartTime}
                      defaultValue={session.sessionStartTime.split("Z")[0]}
                    ></input>
                    <label>End Time:</label>
                    <input
                      type="datetime-local"
                      ref={newSessionEndTime}
                      defaultValue={session.sessionEndTime.split("Z")[0]}
                    ></input>
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={() => editSession(session.id)}
                    >
                      <img src={confirmIcon}></img>
                    </button>
                    <button
                      type="button"
                      onClick={() => changeStates(0, 0, false)}
                    >
                      <img src={cancelIcon}></img>
                    </button>
                  </div>
                </form>
              </li>
            )}
          </div>
        )
      })}
      {addingSession && (
        <li className="session">
          <form className="components">
            <div className="data">
              <label>Gym ID:</label>
              <input type="number" ref={newGymId}></input>
              <label>Start Time:</label>
              <input type="datetime-local" ref={newSessionStartTime}></input>
              <label>End Time:</label>
              <input type="datetime-local" ref={newSessionEndTime}></input>
            </div>
            <div className="buttons">
              <button type="button" onClick={() => addSession()}>
                <img src={addIcon}></img>
              </button>
              <button type="button" onClick={() => clearSessionRefs()}>
                <img src={cancelIcon}></img>
              </button>
            </div>
          </form>
        </li>
      )}
      <button onClick={() => changeStates(0, 0, true)}>Add a Session</button>
    </ul>
  )
}
