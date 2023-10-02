import React, {useEffect, useState} from "react"
import Axios from "../../api/Axios"

export default function Climbs(props) {
  const [climbData, setClimbData] = useState([])
  // const [viewingClimb, setViewingClimb] = useState(0)
  // const [editingClimb, setEditingClimb] = useState(0)
  // const [addingClimb, setAddingClimb] = useState(false)

  const sessionId = props.sessionId
  const viewingSession = props.viewingSession

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
        console.log(err)
        console.log(err.response.data.error)
      })
  }

  useEffect(() => {
    if (sessionId !== viewingSession) return
    getAllClimbs()
  }, [viewingSession])

  // function changeStates(viewingClimb, editingClimb, addingClimb) {
  //   setViewingClimb(viewingClimb)
  //   setEditingClimb(editingClimb)
  //   setAddingClimb(addingClimb)
  // }

  return (
    <ul className="dataList">
      {climbData.map((climb) => {
        if (viewingSession === sessionId) {
          return (
            <li key={climb.id}>
              <div>{climb.attempts}</div>
              <div>{climb.sends}</div>
              <div>{climb.climbStartTime}</div>
              <div>{climb.climbEndTime}</div>
            </li>
          )
        }
      })}
      {viewingSession === sessionId && (
        // <button onClick={() => changeStates(0, 0, true)}>Add a Climb</button>
        <button>Add a Climb</button>
      )}
    </ul>
  )
}
