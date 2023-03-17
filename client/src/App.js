import React, {useState, useEffect, useRef} from 'react'
import Axios from 'axios'
import BoulderTable from './components/boulderTable/BoulderTable'
import AddBoulder from './components/addBoulder/AddBoulder'
import BarChart from './components/BarChart'
import 'chart.js'


function App () {
  const [boulderList, setBoulderList] = useState([])
  const [chartData, setChartData] = useState({labels: [], datasets: []})

  const boulderTableRef = useRef()
  const addBoulderRef = useRef()


  useEffect(() => {

    // TODO: clean this section up and move it to a seperate helper function
    const pairs = boulderList.map(boulder => {
      if (boulder.sendDate === null) 
        return {sendDate: 'Unfinished', rating: boulder.rating} 
      return {sendDate: boulder.sendDate.split('T')[0], rating: boulder.rating}
    })

    console.log(pairs)
    const pairMap = new Map()

    pairs.forEach(pair => {
      if (pairMap.has(pair.sendDate.split('T')[0])) {
        pairMap.set(pair.sendDate.split('T')[0], 
          pairMap.get(pair.sendDate.split('T')[0]) + pair.rating)
      } else {
        pairMap.set(pair.sendDate.split('T')[0], pair.rating)
      }
    })
    console.log(pairMap)
    pairMap.delete('Unfinished')

    const sorted = new Map([...pairMap.entries()].sort())

    const c1 = []
    const c2 = []
    sorted.forEach((value, key) => c1.push(key))
    sorted.forEach((value) => c2.push(value))

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
      {/* <button onClick={handleDeleteBoulder}>Delete All Selected</button> */}
      <BoulderTable
        boulderList={boulderList}
        setOptions={options => addBoulderRef.current.setOptions(options)}
        deleteBoulderFromDB={deleteBoulderFromDB}
        getBoulderListFromDB = { getBoulderListFromDB }
        ref = {boulderTableRef}
      />
      <BarChart data={chartData}/>
    </>
  )
}

export default App