import React, {useEffect, useState} from "react"
import Axios from "../../api/Axios"
import {convertToViewDateTime} from "../helpers.js"

export default function Climbs(props) {
  const [climbData, setClimbData] = useState([])

  const boulderId = props.boulderId
  const viewingBoulder = props.viewingBoulder

  function getAllClimbs() {
    let params = {
      where: "boulderId = " + viewingBoulder,
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

  useEffect(() => {
    if (boulderId !== viewingBoulder) return
    getAllClimbs()
  }, [viewingBoulder])

  return (
    <ul className="dataList">
      {viewingBoulder === boulderId && (
        <div className="sectionTitle">Climbs</div>
      )}
      {climbData.map((climb) => {
        return (
          <div key={climb.id}>
            {viewingBoulder === boulderId && (
              <li className="item">
                <div className="components">
                  <div className="data">
                    <div className="icons">
                      <div
                        className="colourBar"
                        style={{backgroundColor: "magenta"}}
                      >
                        {climb.id}
                      </div>
                      <div
                        className="colourBar"
                        style={{backgroundColor: "aqua"}}
                      >
                        {climb.sessionId}
                      </div>
                      <div className="text">
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
                </div>
              </li>
            )}
          </div>
        )
      })}
    </ul>
  )
}
