import React, {useEffect, useState, useRef} from "react"
import Axios from "../../api/Axios"
import Boulders from "./boulders"

import images from "../../images/images.js"
import {getInput} from "../helpers.js"

export default function Locations(props) {
  /*
   * React Hooks:
   *
   * States:
   *  - locationData: array of locations
   *  - viewingLocation: id of the location being viewed, 0 if none
   *  - edingLocation: id of the location being edited, 0 if none
   *  - addingLocation: true if a location is being added, false if not
   *
   * Refs:
   *  - newLocationName: reference to new name
   */

  const [locationData, setLocationData] = useState([])
  const [viewingLocation, setViewingLocation] = useState(0)
  const [editingLocation, setEditingLocation] = useState(0)
  const [addingLocation, setAddingLocation] = useState(false)

  const newLocationName = useRef("")

  const gymId = props.gymId
  let viewingGym = props.viewingGym

  useEffect(() => {
    setViewingLocation(0)
    if (gymId !== viewingGym) {
      setLocationData([])
      changeStates(0, 0, false)
      return
    }
    getAllLocations()
  }, [viewingGym])

  /*
   * APIs
   */

  function getAllLocations() {
    let params = {
      where: "gymId = " + viewingGym,
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

  function addLocation() {
    const newLocation = getNewLocation()

    Axios.post("/location", newLocation)
      .then((res) => {
        setLocationData([
          ...locationData,
          {id: res.data.data[0].id, ...newLocation},
        ])
        clearLocationRefs()
        alert("Successfully added location " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function editLocation(locationId) {
    const newLocation = getNewLocation()

    Axios.put("/location/" + locationId, newLocation)
      .then((res) => {
        clearLocationRefs()
        if (res.status === 202) {
          alert(res.data.error)
          return
        }
        // TODO: update the location from locationData without GET API call
        getAllLocations()
        alert("Successfully edited location " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function deleteLocation(locationId) {
    Axios.delete("/location/" + locationId)
      .then((res) => {
        // TODO: remove the location from locationData without GET API call
        getAllLocations()
        alert("Successfully removed location " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  /*
   * Helper functions
   */

  function clearLocationRefs() {
    newLocationName.current.value = ""
    changeStates(0, 0, false)
  }

  function getNewLocation() {
    return {
      gymId: gymId,
      name: newLocationName.current.value,
    }
  }

  function changeStates(
    newViewingLocation,
    newEditingLocation,
    newAddingLocation
  ) {
    if (viewingLocation === newViewingLocation) {
      newViewingLocation = 0
    }

    setViewingLocation(newViewingLocation)
    setEditingLocation(newEditingLocation)
    setAddingLocation(newAddingLocation)
  }

  /*
   * Return value
   */

  return (
    <ul className="dataList">
      {viewingGym === gymId && <div className="sectionTitle">Locations</div>}
      {locationData.map((location) => {
        return (
          <div key={location.id}>
            {editingLocation !== location.id && (
              <li className="item">
                <div className="components">
                  <div
                    className="data"
                    onClick={() => changeStates(location.id, 0, false)}
                  >
                    <div className="icons">
                      <div
                        className="colourBar"
                        style={{backgroundColor: "teal"}}
                      >
                        {location.id}
                      </div>
                      <div className="text">{location.name}</div>
                    </div>
                  </div>
                  <div className="buttons">
                    <button onClick={() => changeStates(0, location.id, false)}>
                      <img src={images.editIcon}></img>
                    </button>
                    <button onClick={() => deleteLocation(location.id)}>
                      <img src={images.deleteIcon}></img>
                    </button>
                  </div>
                </div>
                <Boulders
                  locationId={location.id}
                  viewingLocation={viewingLocation}
                ></Boulders>
              </li>
            )}
            {editingLocation == location.id && (
              <li className="item">
                <form className="components">
                  <div className="data">
                    {getInput("Name", "text", newLocationName, location.name)}
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={() => editLocation(location.id)}
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
      {addingLocation && (
        <li className="item">
          <form className="components">
            <div className="data">
              {getInput("Name", "text", newLocationName, null)}
            </div>
            <div className="buttons">
              <button type="button" onClick={() => addLocation()}>
                <img src={images.addIcon}></img>
              </button>
              <button type="button" onClick={() => clearLocationRefs()}>
                <img src={images.cancelIcon}></img>
              </button>
            </div>
          </form>
        </li>
      )}
      {viewingGym === gymId && !addingLocation && (
        <button onClick={() => changeStates(0, 0, true)}>Add a Location</button>
      )}
    </ul>
  )
}
