import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import BoulderList from './components/BoulderList'
import AddNewBoulder from './components/input/AddNewBoulder'

function App () {
  const [boulderList, setBoulderList] = useState([])

  useEffect(() => {
    // TODO: not sure what to do here or if I still need it
  }, [boulderList])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get')
      .then((response) => {
        setBoulderList(response.data)
      })
  }, [])

  function handleAddBoulder () {
    const selectOptionArray = Array.from(document.querySelectorAll('#addBoulderForm select'))
    const anyNullFields = selectOptionArray.reduce((acc, field) => (acc || field.value === 'null'), false)

    if (anyNullFields) return

    const holdType = Array.from(document.querySelectorAll('#addBoulderForm #holdType input'))
      .filter((value) => (value.checked))
      .reduce((acc, field) => (acc.concat(field.value, ' ')), '')
      .trimEnd()

    const sendStatus = Array.from(document.querySelectorAll('#addBoulderForm #sendStatus input'))
      .filter((value) => (value.checked))[0]

    const allFieldsArray = selectOptionArray.concat([sendStatus])

    const newBoulder = allFieldsArray.reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {})
    newBoulder.holdType = holdType
    newBoulder.id = uuidv4()
    newBoulder.rating = convertRatingToNumber(newBoulder.rating)
    newBoulder.sendStatus = +newBoulder.sendStatus
    newBoulder.sendAttempts = +newBoulder.sendAttempts

    Axios.post('http://localhost:3001/api/insert', newBoulder)
      .then(() => {
        // alert('Successful Insert')
      })
      .catch(() => {
        alert('Failed Insert')
      })

    setBoulderList([...boulderList, newBoulder])

    resetDropdownMenus()
  }

  function convertRatingToNumber (str) {
    if (str.includes('hex')) {
      return +str.substring(0, 1)
    }
    // if (str.includes("V")) {
    //     return str.substring(1)
    // }
    return -1
  }

  function resetDropdownMenus () {
    const selectOptions = document.querySelectorAll('#addBoulderForm option')
    for (let i = 0, l = selectOptions.length; i < l; i++) {
      selectOptions[i].selected = selectOptions[i].defaultSelected
    }

    const holdType = document.querySelectorAll('#addBoulderForm #holdType input')
    for (let i = 0, l = holdType.length; i < l; i++) {
      holdType[i].checked = false
    }

    const sendStatus = document.querySelectorAll('#addBoulderForm #sendStatus input')
    sendStatus[0].checked = true
    sendStatus[1].checked = false
  }

  function handleDeleteBoulder () {

  }

  return (
    <>
      <div>Boulder Tracker</div>
      <AddNewBoulder />
      <button onClick={handleAddBoulder}>Add Boulder</button>
      <button onClick={handleDeleteBoulder}>Delete All Selected</button>
      <button>Update Selected</button>

      <BoulderList boulderList={boulderList} />
    </>
  )
}

export default App
