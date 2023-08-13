import React, {useEffect, useState, useRef} from "react"
import Axios from "../../api/Axios"
import Climbs from "./climbs"

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
      where: "locationId = " + viewingLocation,
    }

    const uri = encodeURIComponent(JSON.stringify(params))

    Axios.get("/boulder/query/" + uri)
      .then((res) => {
        const data = res.data.data
        data.forEach((boulder, index, data) => {
          data[index] = {
            id: boulder.id,
            locationId: boulder.locationId,
            rating: boulder.rating,
            colour: boulder.colour,
            boulderType: boulder.boulderType,
            description: boulder.description,
            setStartDate: convertToDate(boulder.setStartDate),
            setEndDate: convertToDate(boulder.setEndDate),
          }
        })
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
        alert("Successfully added boulder " + res.data.data[0].id)
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  function editBoulder(boulderId) {
    const newBoulder = getNewBoulder()
    console.log(newBoulder)

    Axios.put("/boulder/" + boulderId, newBoulder)
      .then((res) => {
        clearBoulderRefs()
        if (res.status === 202) {
          alert(res.data.error)
          return
        }
        // TODO: update the boulder from boulderData without GET API call
        getAllBoulders()
        alert("Successfully edited boulder " + res.data.data[0].id)
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

  function changeStates(viewingBoulder, editingBoulder, addingBoulder) {
    setViewingBoulder(viewingBoulder)
    setEditingBoulder(editingBoulder)
    setAddingBoulder(addingBoulder)
  }

  function convertToDate(dateTime) {
    if (dateTime === null) {
      return "0000-00-00" // TODO: unsure about this return value
    }
    return dateTime.split("T")[0]
  }

  /*
   * Return value
   */

  return (
    <ul>
      {boulderData.map((boulder) => {
        return (
          <div key={boulder.id}>
            {editingBoulder !== boulder.id && (
              <li>
                <button onClick={() => changeStates(boulder.id, 0, false)}>
                  View
                </button>
                <button
                  onClick={() => {
                    changeStates(0, boulder.id, false)
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteBoulder(boulder.id)}>
                  Delete
                </button>
                <div>ID: {boulder.id}</div>
                <div>Rating: {boulder.rating}</div>
                <div>Colour: {boulder.colour}</div>
                <div>Boulder Type: {boulder.boulderType}</div>
                <div>Description: {boulder.description}</div>
                <div>Set Start Date: {boulder.setStartDate}</div>
                <div>Set End Date: {boulder.setEndDate}</div>
                <Climbs
                  boulderId={boulder.id}
                  viewingBoulder={viewingBoulder}
                ></Climbs>
              </li>
            )}
            {editingBoulder == boulder.id && (
              <li>
                <form>
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
                    defaultValue={boulder.setStartDate}
                  ></input>
                  <label>Set End Date:</label>
                  <input
                    type="date"
                    ref={newBoulderSetEndDate}
                    defaultValue={boulder.setEndDate}
                  ></input>
                  <button type="button" onClick={() => editBoulder(boulder.id)}>
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => changeStates(0, 0, false)}
                  >
                    Cancel
                  </button>
                </form>
              </li>
            )}
          </div>
        )
      })}
      {addingBoulder && (
        <li>
          <form>
            <label>Rating:</label>
            <input type="number" ref={newBoulderRating}></input>
            <label>Colour:</label>
            <input type="text" ref={newBoulderColour}></input>
            <label>Boulder Type:</label>
            <input type="text" ref={newBoulderBoulderType}></input>
            <label>Description:</label>
            <input type="text" ref={newBoulderDescription}></input>
            <label>Set Start Date:</label>
            <input type="date" ref={newBoulderSetStartDate}></input>
            <label>Set End Date:</label>
            <input type="date" ref={newBoulderSetEndDate}></input>
            <button type="button" onClick={() => addBoulder()}>
              Add
            </button>
            <button type="button" onClick={() => clearBoulderRefs()}>
              Cancel
            </button>
          </form>
        </li>
      )}
      {viewingLocation === locationId && (
        <button onClick={() => changeStates(0, 0, true)}>Add a Boulder</button>
      )}
    </ul>
  )
}
