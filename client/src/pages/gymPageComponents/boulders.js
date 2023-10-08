/* eslint-disable max-lines */
import React, {useEffect, useState, useRef} from "react"
import Axios from "../../api/Axios"
import Climbs from "./climbs"
import images from "../../images/images.js"
import {
  getCurrentDate,
  getCurrentDateTime,
  convertToViewDate,
  convertToEditDate,
} from "../helpers.js"

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
    let params = {
      where:
        "(locationId = " + viewingLocation + " AND setEndDate = '0000-00-00')",
    }

    const uri = encodeURIComponent(JSON.stringify(params))

    Axios.get("/boulder/query/" + uri)
      .then((res) => {
        const data = res.data.data
        setBoulderData(data)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function addBoulder() {
    const newBoulder = getNewBoulder()

    Axios.post("/boulder", newBoulder)
      .then((res) => {
        setBoulderData([
          ...boulderData,
          {id: res.data.data[0].id, ...newBoulder},
        ])
        clearBoulderRefs()
        // alert("Successfully added boulder " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function editBoulder(boulderId) {
    const newBoulder = getNewBoulder()

    Axios.put("/boulder/" + boulderId, newBoulder)
      .then((res) => {
        clearBoulderRefs()
        if (res.status === 202) {
          alert(res.data.error)
          return
        }
        // TODO: update the boulder from boulderData without GET API call
        getAllBoulders()
        // alert("Successfully edited boulder " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function deleteBoulder(boulderId) {
    Axios.delete("/boulder/" + boulderId)
      .then((res) => {
        // TODO: remove the boulder from boulderData without GET API call
        getAllBoulders()
        alert("Successfully removed boulder " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
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
      locationId: locationId,
      rating: parseInt(newBoulderRating.current.value),
      colour: newBoulderColour.current.value,
      boulderType: newBoulderBoulderType.current.value,
      description: newBoulderDescription.current.value,
      setStartDate: newBoulderSetStartDate.current.value,
      setEndDate: newBoulderSetEndDate.current.value,
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
    Axios.put("/boulder/" + boulder.id, newBoulder)
      .then((res) => {
        if (res.status === 202) {
          alert(res.data.error)
          return
        }
        getAllBoulders()
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
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
      {boulderData.map((boulder) => {
        return (
          <div key={boulder.id}>
            {editingBoulder !== boulder.id && (
              <li className="item">
                <div className="components">
                  <div
                    className="data"
                    onClick={() => changeStates(boulder.id, 0, false)}
                  >
                    <div className="icons">
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
                      <div className="text">
                        {boulder.boulderType} - {boulder.description}
                      </div>
                    </div>
                    <div className="date">
                      {convertToViewDate(
                        boulder.setStartDate,
                        boulder.setEndDate
                      )}
                    </div>
                  </div>
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
                </div>
                <Climbs
                  boulderId={boulder.id}
                  viewingBoulder={viewingBoulder}
                ></Climbs>
              </li>
            )}
            {editingBoulder == boulder.id && (
              <li className="item">
                <form className="components">
                  <div className="data">
                    <label>Rating:</label>
                    <input
                      type="number"
                      ref={newBoulderRating}
                      defaultValue={boulder.rating}
                    ></input>
                    <label>Colour:</label>
                    <input
                      type="text"
                      ref={newBoulderColour}
                      defaultValue={boulder.colour}
                    ></input>
                    <label>Boulder Type:</label>
                    <input
                      type="text"
                      ref={newBoulderBoulderType}
                      defaultValue={boulder.boulderType}
                    ></input>
                    <label>Description:</label>
                    <input
                      type="text"
                      ref={newBoulderDescription}
                      defaultValue={boulder.description}
                    ></input>
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
      {addingBoulder && (
        <li className="item">
          <form className="components">
            <div className="data">
              <label>Rating:</label>
              <input type="number" ref={newBoulderRating}></input>
              <label>Colour:</label>
              <input type="text" ref={newBoulderColour}></input>
              <label>Boulder Type:</label>
              <input type="text" ref={newBoulderBoulderType}></input>
              <label>Description:</label>
              <input type="text" ref={newBoulderDescription}></input>
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
      {viewingLocation === locationId && !addingBoulder && (
        <button onClick={() => changeStates(0, 0, true)}>Add a Boulder</button>
      )}
    </ul>
  )
}
