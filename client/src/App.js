import React, {useState, useRef} from 'react'
import Axios from 'axios'
import BoulderTable from './components/boulderTable/BoulderTable'
import AddBoulder from './components/addBoulder/AddBoulder'
import BarChart from './components/BarChart'
import 'chart.js'


function App () {
  const [boulderList, setBoulderList] = useState([])

  const boulderTableRef = useRef()
  const addBoulderRef = useRef()
  

  function addBoulderToDB (newBoulder) {
    Axios.post('http://localhost:3001/api/insert', newBoulder)
      .then((response) => {
        if (response.status != 200) {
          alert('Failed to insert data with ' + response.data)
          return
        }
        setBoulderList([newBoulder, ...boulderList])
        boulderTableRef.current.updateBoulderList()
      })
  }

  function deleteBoulderFromDB (id) {
    Axios.delete('http://localhost:3001/api/delete', {data: {id: id}})
      .then((response) => {
        if (response.status != 200) {
          alert('Failed to delete data with ' + response.data)
          return
        }
        boulderTableRef.current.updateBoulderList();
      })
  }

  function getBoulderListFromDB (uri) {
    Axios.get('http://localhost:3001/api/get?' + uri)
      .then((response) => {
        if (response.status != 200) {
          alert('Failed to get data with ' + response.data)
          return
        }
        setBoulderList(response.data)
      })
  }

  function updateBoulderFromDB (updatedBoulder) {
    Axios.put('http://localhost:3001/api/update', updatedBoulder)
      .then(() => {
        boulderTableRef.current.updateBoulderList();
        // alert('Successful Update')
      })
      .catch(() => {
        alert('Failed Update')
      })
  }
  return (
    <>
      <AddBoulder 
        addBoulderToDB={addBoulderToDB}
        updateBoulderFromDB={updateBoulderFromDB}
        ref = {addBoulderRef}
      />
      <BoulderTable
        boulderList={boulderList}
        setOptions={options => addBoulderRef.current.setOptions(options)}
        deleteBoulderFromDB={deleteBoulderFromDB}
        getBoulderListFromDB = { getBoulderListFromDB }
        ref = {boulderTableRef}
      />
      <BarChart boulderList={boulderList}/>
    </>
  )
}

export default App