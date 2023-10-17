import React, {useEffect, useState} from "react"
import {convertToViewDateTime} from "../helpers.js"
import {get, climbEndpoint} from "../../api/endpoints.js"

export default function Climbs(props) {
  const [climbData, setClimbData] = useState([])
  const [allClimbData, setAllClimbData] = useState([])

  useEffect(() => {
    getAllClimbs()
  }, [])

  useEffect(() => {
    setClimbData(
      allClimbData.filter(
        (climb) => parseInt(climb.boulderId) === parseInt(props.boulderId)
      )
    )
  }, [allClimbData])

  function getAllClimbs() {
    get(
      climbEndpoint,
      props.climbDataCentral,
      props.setClimbDataCentral,
      setAllClimbData
    )
  }

  return (
    <ul className="dataList">
      <div className="sectionTitle">Climbs</div>
      {[...climbData].reverse().map((climb) => {
        return (
          <div key={climb.id}>
            <li className="item">
              <div className="components">
                <div
                  className="colourBar"
                  style={{backgroundColor: "magenta"}}
                >
                  {/* {climb.id} */}
                </div>
                {/* <div className="colourBar" style={{backgroundColor:"aqua"}}>
                  {climb.sessionId}
                </div> */}
                <div className="leftColumn">
                  <div className="text">
                    {climb.sends} / {climb.attempts}
                  </div>
                </div>
                <div className="rightColumn">
                  <div className="text">
                    {
                      convertToViewDateTime(
                        climb.climbStartTime,
                        climb.climbEndTime
                      ).split(",")[0]
                    }
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
