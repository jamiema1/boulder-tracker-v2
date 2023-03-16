import React, {useState, useEffect, useRef} from 'react'
import Axios from 'axios'
import BoulderTable from './components/boulderTable/BoulderTable'
import AddBoulder from './components/addBoulder/AddBoulder'
import BarChart from './components/BarChart'
import 'chart.js'


function App () {
  const [boulderList, setBoulderList] = useState([])
  const [chartData, setChartData] = useState({labels: [], datasets: []})

  const tableRef = useRef()
  const addBoulderRef = useRef()


  useEffect(() => {

    // TODO: clean this section up and move it to a seperate helper function
    
    const pairs = boulderList.map(boulder => {
      return {sendDate: boulder.sendDate, rating: boulder.rating}
    })

    const pairMap = new Map()

    pairs.forEach(pair => {
      if (pairMap.has(pair.sendDate)) {
        pairMap.set(pair.sendDate, 
          pairMap.get(pair.sendDate) + pair.rating)
      } else {
        pairMap.set(pair.sendDate, pair.rating)
      }
    })

    const c1 = []
    const c2 = []
    pairMap.forEach((value, key) => c1.push(key))
    pairMap.forEach((value) => c2.push(value))

    setChartData({
      labels: c1,
      datasets: [
        {
          label: "rating",
          data: c2
        }
      ]
    })
  }, [boulderList])


  function addBoulderToDB (newBoulder) {

    Axios.post('http://localhost:3001/api/insert', newBoulder)
      .then(() => {
        // alert('Successful Insert')
        setBoulderList([newBoulder, ...boulderList])
        tableRef.current.updateBoulderList()
      })
      .catch(() => {
        alert('Failed Insert')
      })

  }

  function deleteBoulderFromDB (id) {
    Axios.delete('http://localhost:3001/api/delete', {data: {id: id}})
      .then(() => {
        // alert('Successful Delete')
        tableRef.current.updateBoulderList();
      })
      .catch(() => {
        alert('Failed to Delete')
      })
  }

  function getBoulderListFromDB (uri) {

    Axios.get('http://localhost:3001/api/get?' + uri)
      .then((response) => {
        if (response.data.includes("Error")) {
          alert('Failed to retrieve data with ' + response.data)
        } else {
          setBoulderList(response.data)
        }
      })
  }

  function setOptions(options) {
    addBoulderRef.current.setOptions(options)
  }

  return (
    <>
      <AddBoulder 
        addBoulderToDB={addBoulderToDB}
        ref = {addBoulderRef}

      />
      {/* <button onClick={handleDeleteBoulder}>Delete All Selected</button> */}
      <BoulderTable
        boulderList={boulderList}
        setOptions={setOptions}
        deleteBoulderFromDB={deleteBoulderFromDB}
        getBoulderListFromDB = { getBoulderListFromDB }
        // handleUpdateBoulder={handleUpdateBoulder}
        ref = {tableRef}
      />
      <BarChart data={chartData}/>
    </>
  )
}

export default App