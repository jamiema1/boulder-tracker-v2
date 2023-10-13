import React, {useEffect, useState, useRef} from "react"
import Boulders from "./boulders"

import images from "../../images/images.js"
import {getInput} from "../helpers.js"
import {
  getQuery,
  add,
  edit,
  remove,
  locationEndpoint,
} from "../../api/endpoints.js"

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
    getQuery(
      locationEndpoint,
      {
        where: "gymId = " + viewingGym,
      },
      setLocationData
    )
  }

  function addLocation() {
    add(
      locationEndpoint,
      getNewLocation(),
      locationData,
      setLocationData,
      clearLocationRefs
    )
  }

  function editLocation(locationId) {
    edit(
      locationEndpoint,
      locationId,
      getNewLocation(),
      locationData,
      setLocationData,
      clearLocationRefs
    )
  }

  function deleteLocation(locationId) {
    remove(locationEndpoint, locationId, locationData, setLocationData)
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
                    className="colourBar"
                    style={{backgroundColor: "teal"}}
                  >
                    {location.id}
                  </div>
                  <div
                    className="data"
                    onClick={() => changeStates(location.id, 0, false)}
                  >
                    <div className="text">{location.name}</div>
                  </div>
                  {viewingLocation == location.id && (
                    <div className="buttons">
                      <button
                        onClick={() => changeStates(0, location.id, false)}
                      >
                        <img src={images.editIcon}></img>
                      </button>
                      <button onClick={() => deleteLocation(location.id)}>
                        <img src={images.deleteIcon}></img>
                      </button>
                    </div>
                  )}
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
