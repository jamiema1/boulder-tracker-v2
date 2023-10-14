/* eslint-disable max-lines */
import React, {useEffect, useState, useRef} from "react"
import Climbs from "./climbs"
import images from "../../images/images.js"
import {
  getCurrentDate,
  getCurrentDateTime,
  convertToViewDate,
  convertToEditDate,
  getOptions,
  getInput,
} from "../helpers.js"
import {
  getQuery,
  add,
  edit,
  remove,
  boulderEndpoint,
} from "../../api/endpoints.js"

export default function Boulders(props) {
  /*
   * React Hooks:
   *
   * States:
   *  - boulderData: array of boulders
   *  - viewingBoulder: id of the boulder being viewed, 0 if none
   *  - edingBoulder: id of the boulder being edited, 0 if none
   *  - addingBoulder: true if a boulder is being added, false if not
   *
   * Refs:
   *  - newBoulderName: reference to new name
   */

  const [boulderData, setBoulderData] = useState([])
  const [viewingBoulder, setViewingBoulder] = useState(0)
  const [editingBoulder, setEditingBoulder] = useState(0)
  const [addingBoulder, setAddingBoulder] = useState(false)

  const newBoulderRating = useRef(0)
  const newBoulderColour = useRef("")
  const newBoulderBoulderType = useRef("")
  const newBoulderDescription = useRef("")
  const newBoulderSetStartDate = useRef("")
  const newBoulderSetEndDate = useRef("")

  const locationId = props.locationId
  const viewingLocation = props.viewingLocation

  const ratings = new Map([
    ["Unrated", -1],
    ["1 Hex", 1],
    ["2 Hex", 2],
    ["3 Hex", 3],
    ["4 Hex", 4],
    ["5 Hex", 5],
    ["6 Hex", 6],
  ])

  const colours = new Map([
    ["Black", "Black"],
    ["Blue", "Blue"],
    ["Green", "Green"],
    ["Orange", "Orange"],
    ["Pink", "Pink"],
    ["Purple", "Purple"],
    ["Red", "Red"],
    ["Yellow", "Yellow"],
  ])

  const boulderType = new Map([
    ["Slab", "Slab"],
    ["Overhang", "Overhang"],
  ])

  useEffect(() => {
    setViewingBoulder(0)
    if (locationId !== viewingLocation) {
      setBoulderData([])
      changeStates(0, 0, false)
      return
    }
    getAllBoulders()
  }, [viewingLocation])

  /*
   * APIs
   */

  function getAllBoulders() {
    getQuery(
      boulderEndpoint,
      {
        where:
          "(locationId = " +
          viewingLocation +
          " AND setEndDate = '0000-00-00')",
        orderby: [{id: "DESC"}],
      },
      setBoulderData
    )
  }

  function addBoulder() {
    add(
      boulderEndpoint,
      getNewBoulder(),
      boulderData,
      setBoulderData,
      clearBoulderRefs
    )
  }

  function editBoulder(boulderId) {
    edit(
      boulderEndpoint,
      boulderId,
      getNewBoulder(),
      boulderData,
      setBoulderData,
      clearBoulderRefs
    )
  }

  function deleteBoulder(boulderId) {
    remove(boulderEndpoint, boulderId, boulderData, setBoulderData)
  }

  /*
   * Helper functions
   */

  function clearBoulderRefs() {
    newBoulderRating.current.value = 0
    newBoulderColour.current.value = ""
    newBoulderBoulderType.current.value = ""
    newBoulderDescription.current.value = ""
    newBoulderSetStartDate.current.value = ""
    newBoulderSetEndDate.current.value = ""
    changeStates(0, 0, false)
  }

  function getNewBoulder() {
    return {
      locationId: parseInt(locationId),
      rating: parseInt(newBoulderRating.current.value),
      colour: newBoulderColour.current.value,
      boulderType: newBoulderBoulderType.current.value,
      description: newBoulderDescription.current.value,
      setStartDate: newBoulderSetStartDate.current.value,
      setEndDate:
        newBoulderSetEndDate.current.value === ""
          ? "0000-00-00"
          : newBoulderSetEndDate.current.value,
    }
  }

  function changeStates(
    newViewingBoulder,
    newEditingBoulder,
    newAddingBoulder
  ) {
    if (viewingBoulder === newViewingBoulder) {
      newViewingBoulder = 0
    }
    setViewingBoulder(newViewingBoulder)
    setEditingBoulder(newEditingBoulder)
    setAddingBoulder(newAddingBoulder)
  }

  function closeBoulder(boulder) {
    const newBoulder = {
      locationId: locationId,
      rating: boulder.rating,
      colour: boulder.colour,
      boulderType: boulder.boulderType,
      description: boulder.description,
      setStartDate: boulder.setStartDate,
      setEndDate: getCurrentDateTime(),
    }

    // TODO: use existing EDIT function instead of creating new one
    edit(
      boulderEndpoint,
      boulder.id,
      newBoulder,
      boulderData,
      setBoulderData,
      clearBoulderRefs
    )
  }

  function getHexImage(rating) {
    switch (rating) {
    case -1:
      return images.sixHex
    case 0:
      return images.sixHex
    case 1:
      return images.oneHex
    case 2:
      return images.twoHex
    case 3:
      return images.threeHex
    case 4:
      return images.fourHex
    case 5:
      return images.fiveHex
    case 6:
      return images.sixHex
    }
  }

  /*
   * Return value
   */

  return (
    <ul className="dataList">
      {viewingLocation === locationId && (
        <div className="sectionTitle">Boulders</div>
      )}
      {viewingLocation === locationId && !addingBoulder && (
        <button onClick={() => changeStates(0, 0, true)}>Add a Boulder</button>
      )}
      {addingBoulder && (
        <li className="item">
          <form className="components">
            <div className="data">
              <div className="field">
                <label>Rating:</label>
                <select ref={newBoulderRating}>
                  {Array.from(ratings).map(([key, value]) => {
                    return getOptions(key, value)
                  })}
                </select>
              </div>
              <div className="field">
                <label>Colour:</label>
                <select ref={newBoulderColour}>
                  {Array.from(colours).map(([key, value]) => {
                    return getOptions(key, value)
                  })}
                </select>
              </div>
              <div className="field">
                <label>Boulder Type:</label>
                <select ref={newBoulderBoulderType}>
                  {Array.from(boulderType).map(([key, value]) => {
                    return getOptions(key, value)
                  })}
                </select>
              </div>
              {getInput("Description", "text", newBoulderDescription, null)}
              {getInput(
                "Set Start Date",
                "date",
                newBoulderSetStartDate,
                getCurrentDate()
              )}
              {getInput("Set End Date", "date", newBoulderSetEndDate, null)}
            </div>
            <div className="buttons">
              <button type="button" onClick={() => addBoulder()}>
                <img src={images.addIcon}></img>
              </button>
              <button type="button" onClick={() => clearBoulderRefs()}>
                <img src={images.cancelIcon}></img>
              </button>
            </div>
          </form>
        </li>
      )}
      {boulderData.map((boulder) => {
        return (
          <div key={boulder.id}>
            {editingBoulder !== boulder.id && (
              <li className="item">
                <div className="components">
                  <div
                    className="colourBar"
                    style={{backgroundColor: boulder.colour}}
                  >
                    {boulder.id}
                  </div>
                  <div className="hex">
                    <img
                      className="hexImage"
                      src={getHexImage(boulder.rating)}
                    ></img>
                  </div>
                  <div
                    className="data"
                    onClick={() => changeStates(boulder.id, 0, false)}
                  >
                    <div className="text">
                      {boulder.boulderType} - {boulder.description}
                    </div>
                    <div className="text">
                      {convertToViewDate(
                        boulder.setStartDate,
                        boulder.setEndDate
                      )}
                    </div>
                  </div>
                  {viewingBoulder == boulder.id && (
                    <div className="buttons">
                      <button
                        onClick={() => {
                          closeBoulder(boulder)
                        }}
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          changeStates(0, boulder.id, false)
                        }}
                      >
                        <img src={images.editIcon}></img>
                      </button>
                      <button onClick={() => deleteBoulder(boulder.id)}>
                        <img src={images.deleteIcon}></img>
                      </button>
                    </div>
                  )}
                </div>
                {viewingBoulder == boulder.id && (
                  <Climbs
                    boulderId={boulder.id}
                    viewingBoulder={viewingBoulder}
                  ></Climbs>
                )}
              </li>
            )}
            {editingBoulder == boulder.id && (
              <li className="item">
                <form className="components">
                  <div className="data">
                    <div className="field">
                      <label>Rating:</label>
                      <select
                        ref={newBoulderRating}
                        defaultValue={boulder.rating}
                      >
                        {Array.from(ratings).map(([key, value]) => {
                          return getOptions(key, value)
                        })}
                      </select>
                    </div>
                    <div className="field">
                      <label>Colour:</label>
                      <select
                        ref={newBoulderColour}
                        defaultValue={boulder.colour}
                      >
                        {Array.from(colours).map(([key, value]) => {
                          return getOptions(key, value)
                        })}
                      </select>
                    </div>
                    <div className="field">
                      <label>Boulder Type:</label>
                      <select
                        ref={newBoulderBoulderType}
                        defaultValue={boulder.boulderType}
                      >
                        {Array.from(boulderType).map(([key, value]) => {
                          return getOptions(key, value)
                        })}
                      </select>
                    </div>
                    {getInput(
                      "Description",
                      "text",
                      newBoulderDescription,
                      boulder.description
                    )}
                    {getInput(
                      "Set Start Date",
                      "date",
                      newBoulderSetStartDate,
                      convertToEditDate(boulder.setStartDate)
                    )}
                    {getInput(
                      "Set End Date",
                      "date",
                      newBoulderSetEndDate,
                      convertToEditDate(boulder.setEndDate)
                    )}
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={() => editBoulder(boulder.id)}
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
