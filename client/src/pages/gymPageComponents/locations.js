import React, {useEffect, useState, useRef} from "react"
import Boulders from "./boulders"

import images from "../../images/images.js"
import {
  get,
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
  const [allLocationData, setAllLocationData] = useState([])
  const [viewingLocation, setViewingLocation] = useState(0)
  const [editingLocation, setEditingLocation] = useState(0)
  const [addingLocation, setAddingLocation] = useState(false)

  const newLocationName = useRef("")

  useEffect(() => {
    getAllLocations()
  }, [props.locationDataCentral])

  useEffect(() => {
    setLocationData(
      allLocationData.filter(
        (location) => parseInt(location.gymId) === parseInt(props.gymId)
      )
    )
  }, [allLocationData])

  /*
   * APIs
   */

  function getAllLocations() {
    get(
      locationEndpoint,
      props.locationDataCentral,
      props.setLocationDataCentral,
      setAllLocationData
    )
  }

  function addLocation() {
    add(
      locationEndpoint,
      props.locationDataCentral,
      props.setLocationDataCentral,
      getNewLocation(),
      setAllLocationData,
      clearLocationRefs
    )
  }

  function editLocation(locationId) {
    edit(
      locationEndpoint,
      locationId,
      props.locationDataCentral,
      props.setLocationDataCentral,
      getNewLocation(),
      setAllLocationData,
      clearLocationRefs
    )
  }

  function deleteLocation(locationId) {
    remove(
      locationEndpoint,
      locationId,
      props.locationDataCentral,
      props.setLocationDataCentral,
      setAllLocationData
    )
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
      gymId: parseInt(props.gymId),
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
      {<div className="sectionTitle">Locations</div>}
      {!addingLocation && (
        <button onClick={() => changeStates(0, 0, true)}>Add a Location</button>
      )}
      {addingLocation && (
        <li className="item">
          <form className="components">
            <div className="fields">
              <label>Name:</label>
              <input type="text" ref={newLocationName}></input>
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
                    {/* {location.id} */}
                  </div>
                  <div
                    className="leftColumn"
                    onClick={() => changeStates(location.id, 0, false)}
                  >
                    <div className="text">{location.name}</div>
                  </div>
                  <div className="rightColumn"></div>
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
                {viewingLocation == location.id && (
                  <Boulders
                    locationId={location.id}
                    boulderDataCentral={props.boulderDataCentral}
                    setBoulderDataCentral={props.setBoulderDataCentral}
                    climbDataCentral={props.climbDataCentral}
                    setClimbDataCentral={props.setClimbDataCentral}
                  ></Boulders>
                )}
              </li>
            )}
            {editingLocation == location.id && (
              <li className="item">
                <form className="components">
                  <div className="fields">
                    <label>Name:</label>
                    <input
                      type="text"
                      ref={newLocationName}
                      defaultValue={location.name}
                    ></input>
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
    </ul>
  )
}
