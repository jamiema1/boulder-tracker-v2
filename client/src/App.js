import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import BoulderList from './components/BoulderList'
import ColumnSelector from './components/ColumnSelector'
import AddNewBoulder from './components/input/AddNewBoulder'

const ID_KEY = 'id'

const sortColumns = new Map([
  ['id', 'DESC'],
  ['rating', 'NONE'],
  ['colour', 'NONE'],
  ['holdType', 'NONE'],
  ['boulderType', 'NONE'],
  ['sendAttempts', 'NONE'],
  ['sendStatus', 'NONE'],
  ['startDate', 'NONE'],
  ['sendDate', 'NONE'],
  ['description', 'NONE']
])

function App () {
  const [boulderList, setBoulderList] = useState([])
  const [columns, setColumns] = useState([])

  const columnRef = useRef()

  const ratingRef = useRef()
  const colourRef = useRef()
  const holdTypeRef = useRef()
  const boulderTypeRef = useRef()
  const sendAttemptsRef = useRef()
  const sendStatusRef = useRef()
  const startDateRef = useRef()
  const sendDateRef = useRef()
  const descriptionRef = useRef() 

  const boulderRef = useRef({ratingRef, colourRef, holdTypeRef, boulderTypeRef, sendAttemptsRef, sendStatusRef, startDateRef, sendDateRef, descriptionRef})


  useEffect(() => {
    // placeholder if necessary
  }, [boulderList])


  
  useEffect(() => {
    
    const allFields =  ['id','rating', 'colour', 'holdType','boulderType','sendAttempts','sendStatus','startDate','sendDate','description']
    updateColumns(allFields)
  }, [])

  function handleAddBoulder () {

    const fieldValues = [
      ratingRef.current.selectedOptions[0].value, 
      colourRef.current.selectedOptions[0].value,
      boulderTypeRef.current.selectedOptions[0].value,
      sendAttemptsRef.current.selectedOptions[0].value,
      descriptionRef.current.value
    ]

    const anyNullFields = fieldValues.reduce((acc, field) => (acc || field === 'null'), false)

    if (anyNullFields) return

    const newBoulder = { 
      id: newId(),
      rating: convertRatingToNumber(fieldValues[0]),
      colour: fieldValues[1],
      holdType: Array.from(holdTypeRef.current.children).filter(e => e.nodeName === 'INPUT' && e.checked).reduce((acc, field) => (acc.concat(field.value, ' ')), '').trimEnd(),
      boulderType: fieldValues[2],
      sendStatus: +Array.from(sendStatusRef.current.children).filter(e => e.nodeName === 'INPUT' && e.checked)[0].value,
      sendAttempts: +fieldValues[3],
      startDate: startDateRef.current.value,
      sendDate: sendDateRef.current.value,
      description: descriptionRef.current.value
    }

    Axios.post('http://localhost:3001/api/insert', newBoulder)
      .then(() => {
        alert('Successful Insert')
      })
      .catch(() => {
        alert('Failed Insert')
      })

    setBoulderList([newBoulder, ...boulderList])

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
    startDateRef.current.value = null
    sendDateRef.current.value = null
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

  function changeColumns() {
    
    const cols = Array.from(columnRef.current.children).filter(e => e.nodeName === 'INPUT' && e.checked).map(e => (e.value))
    updateColumns([...cols, 'id'])
  }

  function makeColumnObject(column) {
    return sortColumns.get(column)
  }

  function updateColumns(queryParams) {

    const cols = queryParams.reduce((acc, f) => ({ ...acc, [f]: makeColumnObject(f)}), {})
    const params = new URLSearchParams(cols);
    setColumns([])
    Object.keys(cols).forEach(column => setColumns(columns => ([...columns, column])))

    Axios.get('http://localhost:3001/api/get?' + params)
      .then((response) => {
        setBoulderList(response.data)
      })
  }

  function toggleSortColumn(column, value) {
    sortColumns.set(column, value)
    changeColumns()
  }


  return (
    <>
      <AddNewBoulder ref={ boulderRef }/>
      <button onClick={handleAddBoulder}>Add Boulder</button>
      {/* <button onClick={handleDeleteBoulder}>Delete All Selected</button> */}
      {/* <button>Update Selected</button> */}
      <ColumnSelector changeColumns={changeColumns} ref={ columnRef } />
      <BoulderList boulderList={boulderList} columns={columns} toggleSortColumn={toggleSortColumn} handleDeleteBoulder={handleDeleteBoulder} />
    </>
  )
}

export default App
