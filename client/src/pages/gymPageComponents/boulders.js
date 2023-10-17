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
} from "../helpers.js"
import {get, add, edit, remove, boulderEndpoint} from "../../api/endpoints.js"

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
  const [allBoulderData, setAllBoulderData] = useState([])
  const [viewingBoulder, setViewingBoulder] = useState(0)
  const [editingBoulder, setEditingBoulder] = useState(0)
  const [addingBoulder, setAddingBoulder] = useState(false)

  const newBoulderRating = useRef(0)
  const newBoulderColour = useRef("")
  const newBoulderBoulderType = useRef("")
  const newBoulderDescription = useRef("")
  const newBoulderSetStartDate = useRef("")
  const newBoulderSetEndDate = useRef("")

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
    ["White", "White"],
    ["Yellow", "Yellow"],
  ])

  const boulderType = new Map([
    ["Slab", "Slab"],
    ["Overhang", "Overhang"],
  ])

  useEffect(() => {
    getAllBoulders()
  }, [props.boulderDataCentral])

  useEffect(() => {
    setBoulderData(
      allBoulderData.filter(
        (boulder) => parseInt(boulder.locationId) === parseInt(props.locationId)
      )
    )
  }, [allBoulderData])

  /*
   * APIs
   */

  function getAllBoulders() {
    get(
      boulderEndpoint,
      props.boulderDataCentral,
      props.setBoulderDataCentral,
      setAllBoulderData
    )
  }

  function addBoulder() {
    add(
      boulderEndpoint,
      props.boulderDataCentral,
      props.setBoulderDataCentral,
      getNewBoulder(),
      setAllBoulderData,
      clearBoulderRefs
    )
  }

  function editBoulder(boulderId) {
    edit(
      boulderEndpoint,
      boulderId,
      props.boulderDataCentral,
      props.setBoulderDataCentral,
      getNewBoulder(),
      setAllBoulderData,
      clearBoulderRefs
    )
  }

  function deleteBoulder(boulderId) {
    remove(
      boulderEndpoint,
      boulderId,
      props.boulderDataCentral,
      props.setBoulderDataCentral,
      setAllBoulderData
    )
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
      locationId: parseInt(props.locationId),
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
      locationId: props.locationId,
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
      return images.unrated
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

  function getBoulderTypeImage(boulderType) {
    switch (boulderType) {
    case "Slab":
      return images.slab
    case "Overhang":
      return images.overhang
    }
  }

  /*
   * Return value
   */

  return (
    <ul className="dataList">
      <div className="sectionTitle">Boulders</div>
      {!addingBoulder && (
        <button onClick={() => changeStates(0, 0, true)}>Add a Boulder</button>
      )}
      {addingBoulder && (
        <li className="item">
          <form className="components">
            <div className="fields">
              <label>Rating:</label>
              <select ref={newBoulderRating}>
                {Array.from(ratings).map(([key, value]) => {
                  return getOptions(key, value)
                })}
              </select>
              <label>Colour:</label>
              <select ref={newBoulderColour}>
                {Array.from(colours).map(([key, value]) => {
                  return getOptions(key, value)
                })}
              </select>
              <label>Boulder Type:</label>
              <select ref={newBoulderBoulderType}>
                {Array.from(boulderType).map(([key, value]) => {
                  return getOptions(key, value)
                })}
              </select>
              <label>Description:</label>
              <textarea ref={newBoulderDescription}></textarea>
              <label>Set Start Date:</label>
              <input
                type="date"
                ref={newBoulderSetStartDate}
                defaultValue={getCurrentDate()}
              ></input>
              <label>Set End Date:</label>
              <input type="date" ref={newBoulderSetEndDate}></input>
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
      {[...boulderData].reverse().map((boulder) => {
        return (
          <div key={boulder.id}>
            {editingBoulder !== boulder.id && (
              <li className="item">
                <div className="components">
                  <div
                    className="colourBar"
                    style={{backgroundColor: boulder.colour}}
                  >
                    {/* {boulder.id} */}
                  </div>
                  <div className="hex">
                    <img
                      className="hexImage"
                      src={getHexImage(boulder.rating)}
                    ></img>
                  </div>
                  <div className="hex">
                    <img
                      className="hexImage"
                      src={getBoulderTypeImage(boulder.boulderType)}
                    ></img>
                  </div>
                  <div
                    className="leftColumn"
                    onClick={() => changeStates(boulder.id, 0, false)}
                  >
                    <div className="text">{boulder.description}</div>
                  </div>
                  <div className="rightColumn boulderDate">
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
                    climbDataCentral={props.climbDataCentral}
                    setClimbDataCentral={props.setClimbDataCentral}
                  ></Climbs>
                )}
              </li>
            )}
            {editingBoulder == boulder.id && (
              <li className="item">
                <form className="components">
                  <div className="fields">
                    <label>Rating:</label>
                    <select
                      ref={newBoulderRating}
                      defaultValue={boulder.rating}
                    >
                      {Array.from(ratings).map(([key, value]) => {
                        return getOptions(key, value)
                      })}
                    </select>
                    <label>Colour:</label>
                    <select
                      ref={newBoulderColour}
                      defaultValue={boulder.colour}
                    >
                      {Array.from(colours).map(([key, value]) => {
                        return getOptions(key, value)
                      })}
                    </select>
                    <label>Boulder Type:</label>
                    <select
                      ref={newBoulderBoulderType}
                      defaultValue={boulder.boulderType}
                    >
                      {Array.from(boulderType).map(([key, value]) => {
                        return getOptions(key, value)
                      })}
                    </select>
                    <label>Description:</label>
                    <textarea
                      ref={newBoulderDescription}
                      defaultValue={boulder.description}
                    ></textarea>
                    <label>Set Start Date:</label>
                    <input
                      type="date"
                      ref={newBoulderSetStartDate}
                      defaultValue={convertToEditDate(boulder.setStartDate)}
                    ></input>
                    <label>Set End Date:</label>
                    <input
                      type="date"
                      ref={newBoulderSetEndDate}
                      defaultValue={convertToEditDate(boulder.setEndDate)}
                    ></input>
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
