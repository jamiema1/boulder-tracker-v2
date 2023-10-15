import React, {useEffect, useState} from "react"
import {convertToViewDateTime} from "../helpers.js"
import {getQuery, climbEndpoint} from "../../api/endpoints.js"

const climbCache = {}

export default function Climbs(props) {
  const [climbData, setClimbData] = useState([])

  const boulderId = props.boulderId

  useEffect(() => {
    if (climbCache[boulderId]) {
      setClimbData(climbCache[boulderId])
    } else {
      getAllClimbs()
    }
  }, [])

  function getAllClimbs() {
    getQuery(
      climbEndpoint,
      climbCache,
      boulderId,
      {
        where: "boulderId = " + boulderId,
        orderby: [{id: "DESC"}],
      },
      setClimbData
    )
  }

  return (
    <ul className="dataList">
      <div className="sectionTitle">Climbs</div>

      {climbData.map((climb) => {
        return (
          <div key={climb.id}>
            <li className="item">
              <div className="components">
                <div
                  className="colourBar"
                  style={{backgroundColor: "magenta"}}
                >
                  {climb.id}
                </div>
                <div className="colourBar" style={{backgroundColor: "aqua"}}>
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
          </div>
        )
      })}
    </ul>
  )
}
