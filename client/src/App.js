import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
// import { v4 as uuidv4 } from 'uuid'
import BoulderList from './components/BoulderList'
import AddNewBoulder from './components/input/AddNewBoulder'

const ID_KEY = 'id'

function App () {
  const [boulderList, setBoulderList] = useState([])

  const ratingRef = useRef()
  const colourRef = useRef()
  const holdTypeRef = useRef()
  const boulderTypeRef = useRef()
  const sendAttemptsRef = useRef()
  const sendStatusRef = useRef()
  const descriptionRef = useRef() 

  const boulderRef = useRef({ratingRef, colourRef, holdTypeRef, boulderTypeRef, sendAttemptsRef, sendStatusRef, descriptionRef})

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

    const fields = [
      ratingRef.current.selectedOptions[0].value, 
      colourRef.current.selectedOptions[0].value,
      boulderTypeRef.current.selectedOptions[0].value,
      sendAttemptsRef.current.selectedOptions[0].value, descriptionRef.current.value
    ]

    const anyNullFields = fields.reduce((acc, field) => (acc || field.value === 'null'), false)

    if (anyNullFields) return

    const newBoulder = { 
      id: newId(),
      rating: convertRatingToNumber(fields[0]),
      colour: fields[1],
      holdType: Array.from(holdTypeRef.current.children).filter(e => e.nodeName === 'INPUT' && e.checked).reduce((acc, field) => (acc.concat(field.value, ' ')), '').trimEnd(),
      boulderType: fields[2],
      sendStatus: +Array.from(sendStatusRef.current.children).filter(e => e.nodeName === 'INPUT' && e.checked)[0].value,
      sendAttempts: +fields[3],
      description: descriptionRef.current.value
    }

    Axios.post('http://localhost:3001/api/insert', newBoulder)
      .then(() => {
        alert('Successful Insert')
      })
      .catch(() => {
        alert('Failed Insert')
      })

    setBoulderList([...boulderList, newBoulder])

    resetDropdownMenus()
  }

  function newId() {
    const id = JSON.parse(localStorage.getItem(ID_KEY))
    localStorage.setItem(ID_KEY, JSON.stringify(id+1))
    return id
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
    
    Array.from(ratingRef.current.options).forEach(resetOption)
    Array.from(colourRef.current.options).forEach(resetOption)
    Array.from(holdTypeRef.current.children).filter(e => e.nodeName === 'INPUT').forEach(e => e.checked = false)
    Array.from(boulderTypeRef.current.options).forEach(resetOption)
    Array.from(sendAttemptsRef.current.options).forEach(resetOption)
    Array.from(sendStatusRef.current.children).filter(e => e.nodeName === 'INPUT')[0].checked = true
    Array.from(sendStatusRef.current.children).filter(e => e.nodeName === 'INPUT')[1].checked = false
    descriptionRef.current.value = null
  }

  function resetOption(option) {
    option.selected = option.defaultSelected
  }

  function handleDeleteBoulder (e) {
    
    const id = e.target.id

    Axios.delete('http://localhost:3001/api/delete', { data: { id: id } })
      .then(() => {
        alert('Successful Delete')
      })
      .catch(() => {
        alert('Failed Delete')
      })
    
    const copyOfBoulderList = [...boulderList]
    copyOfBoulderList.splice(boulderList.findIndex(boulder => (boulder.id === +id)), 1)
    setBoulderList(copyOfBoulderList)
  }


  return (
    <>
      <div>Boulder Tracker</div>
      <AddNewBoulder ref={ boulderRef }/>
      <button onClick={handleAddBoulder}>Add Boulder</button>
      {/* <button onClick={handleDeleteBoulder}>Delete All Selected</button> */}
      {/* <button>Update Selected</button> */}

      <BoulderList boulderList={boulderList} handleDeleteBoulder={handleDeleteBoulder} />
    </>
  )
}

export default App
