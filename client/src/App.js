import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import BoulderList from './components/BoulderList'
import AddNewBoulder from './components/input/AddNewBoulder'

function App() {

  const [boulderList, setBoulderList] = useState([])

  useEffect(() => {

  }, [boulderList])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get')
      .then((response) => {
        setBoulderList(response.data)
      })
  }, [])

  function handleAddBoulder() {

    const fieldArray = Array.from(document.querySelectorAll('#addBoulderForm select'))
    const anyNullFields = fieldArray.reduce((acc, field) => (acc || field.value === "null"), false)
    
    if (anyNullFields) return
    

    const newBoulder = fieldArray.reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {})

    Axios.post('http://localhost:3001/api/insert', newBoulder)
      .then(() => {
        alert('Successful Insert')
      })
      .catch(() => {
        alert('Failed Insert')
      })
    
    newBoulder.id = uuidv4()
    setBoulderList([...boulderList, newBoulder])
    
    resetDropdownMenus()
  }

  function resetDropdownMenus() {
    var options = document.querySelectorAll('#addBoulderForm option');
    for (var i = 0, l = options.length; i < l; i++) {
        options[i].selected = options[i].defaultSelected;
    }
  }

  return (
    <>
      <div>Boulder Tracker</div>
      <AddNewBoulder />
      <button onClick={handleAddBoulder}>Add</button>
      {/* <button onClick={handleDeleteBoulder}>Delete</button> */}

      <BoulderList boulderList={boulderList} />
      
    </> 
  );
}

export default App;
