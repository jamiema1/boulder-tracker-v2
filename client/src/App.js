import React, {useState, useRef} from 'react'
import Axios from 'axios'
import BoulderTable from './components/boulderTable/BoulderTable'
import AddBoulder from './components/addBoulder/AddBoulder'
import Introduction from './components/introduction/Introduction'
// import BarChart from './components/BarChart'
import 'chart.js'

const serverhost = 'http://35.163.119.158:3001'
const localhost = 'http://localhost:3001'

let hostname = localhost

const local = true

function App () {
  const [boulderList, setBoulderList] = useState([])

  const boulderTableRef = useRef()
  const addBoulderRef = useRef()
  
  if (!local) {
    hostname = serverhost
  }

  function addBoulderToDB (newBoulder) {
    Axios.post(hostname + '/api/insert', newBoulder)
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
    Axios.delete(hostname + '/api/delete', {data: {id: id}})
      .then((response) => {
        if (response.status != 200) {
          alert('Failed to delete data with ' + response.data)
          return
        }
        boulderTableRef.current.updateBoulderList();
      })
  }

  function getBoulderListFromDB (uri) {
    Axios.get(hostname + '/api/get?' + uri)
      .then((response) => {
        if (response.status != 200) {
          alert('Failed to get data with ' + response.data)
          return
        }
        setBoulderList(response.data)
      })
  }

  function updateBoulderFromDB (updatedBoulder) {
    Axios.put(hostname + '/api/update', updatedBoulder)
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
      <Introduction />
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
      {/* <BarChart boulderList={boulderList}/> */}
    </>
  )
}

export default App