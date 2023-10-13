import React, {useEffect, useState} from "react"
import {convertToViewDateTime} from "../helpers.js"
import {getQuery, climbEndpoint} from "../../api/endpoints.js"

export default function Climbs(props) {
  const [climbData, setClimbData] = useState([])

  const boulderId = props.boulderId
  const viewingBoulder = props.viewingBoulder

  function getAllClimbs() {
    getQuery(
      climbEndpoint,
      {
        where: "boulderId = " + viewingBoulder,
      },
      setClimbData
    )
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
                  <div className="data">
                    <div className="text">
                      Completion Rate: {climb.sends} / {climb.attempts}
                    </div>
                    <div className="text">
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
