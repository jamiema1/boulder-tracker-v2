import React, {useState, useEffect, useRef} from 'react'
import Axios from 'axios'
import BoulderTable from './components/boulderTable/BoulderTable'
import AddBoulder from './components/addBoulder/AddBoulder'
import BarChart from './components/BarChart'
import 'chart.js'

const sortColumns = new Map([['id', 'DESC']])

const ID_KEY = 'id'
function nextId() {
  const id = JSON.parse(localStorage.getItem(ID_KEY))
  localStorage.setItem(ID_KEY, JSON.stringify(id + 1))
  return id
}

function App () {
  const [boulderList, setBoulderList] = useState([])
  const [columns, setColumns] = useState([])
  const [chartData, setChartData] = useState({labels: [], datasets: []})

  const columnRef = useRef()
  const limitSelectorRef = useRef(15)
  const filterRef = useRef()
  const boulderTableRef = useRef({filterRef, columnRef, limitSelectorRef})

  const ratingRef = useRef()
  const colourRef = useRef()
  const holdTypeRef = useRef()
  const boulderTypeRef = useRef()
  const sendAttemptsRef = useRef()
  const startDateRef = useRef()
  const sendDateRef = useRef()
  const descriptionRef = useRef() 

  const boulderRef = useRef({ratingRef, colourRef, holdTypeRef, boulderTypeRef,
    sendAttemptsRef, startDateRef, sendDateRef, descriptionRef})


  useEffect(() => {

    // TODO: clean this section up and move it to a seperate helper function
    
    const pairs = boulderList.map(boulder => {
      return {sendDate: boulder.sendDate, sendAttempts: boulder.sendAttempts}
    })

    const pairMap = new Map()

    pairs.forEach(pair => {
      if (pairMap.has(pair.sendDate)) {
        pairMap.set(pair.sendDate, 
          pairMap.get(pair.sendDate) + pair.sendAttempts)
      } else {
        pairMap.set(pair.sendDate, pair.sendAttempts)
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
          label: "send Attempts",
          data: c2
        }
      ]
    })
  }, [boulderList])
  
  useEffect(() => {
    const allFields =  ['id','rating', 'colour', 'holdType','boulderType',
      'sendAttempts','startDate','sendDate','description']
    updateColumns(allFields)
  }, [])

  function handleAddBoulder () {

    const fieldValues = [
      ratingRef.current.selectedOptions[0].value, 
      colourRef.current.selectedOptions[0].value,
      boulderTypeRef.current.selectedOptions[0].value,
      sendAttemptsRef.current.selectedOptions[0].value,
      startDateRef.current.value,
      descriptionRef.current.value,
      Array.from(holdTypeRef.current.children)
        .filter(e => e.nodeName === 'INPUT' && e.checked)
        .reduce((acc, field) => (acc.concat(field.value, ' ')), '').trimEnd()
    ]

    const anyNullFields = fieldValues
      .reduce((acc, field) => (acc || field === 'null' || field === ''), false)

    if (anyNullFields) {
      alert('Missing required information')
      return
    }

    const sendDate = sendDateRef.current.value === '' ? null :
      sendDateRef.current.value

    const newBoulder = { 
      id: nextId(),
      rating: convertRatingToNumber(fieldValues[0]),
      colour: fieldValues[1],
      holdType: fieldValues[6],
      boulderType: fieldValues[2],
      sendAttempts: +fieldValues[3],
      startDate: fieldValues[4],
      sendDate: sendDate,
      description: fieldValues[5]
    }

    Axios.post('http://localhost:3001/api/insert', newBoulder)
      .then(() => {
        // alert('Successful Insert')
        setBoulderList([newBoulder, ...boulderList])
        updateBoulderList();

        resetDropdownMenus()
      })
      .catch(() => {
        alert('Failed Insert')
      })

  }

  function convertRatingToNumber (str) {
    if (str.includes('hex')) {
      return +str.substring(0, 1)
    }
    return -1
  }

  function resetDropdownMenus () {
    
    function resetOption(option) {
      option.selected = option.defaultSelected
    }

    Array.from(ratingRef.current.options).forEach(resetOption)
    Array.from(colourRef.current.options).forEach(resetOption)
    Array.from(holdTypeRef.current.children)
      .filter(e => e.nodeName === 'INPUT').forEach(e => e.checked = false)
    Array.from(boulderTypeRef.current.options).forEach(resetOption)
    Array.from(sendAttemptsRef.current.options).forEach(resetOption)
    startDateRef.current.value = null
    sendDateRef.current.value = null
    descriptionRef.current.value = null
  }



  function handleDeleteBoulder (e) {
    
    const id = e.target.id

    Axios.delete('http://localhost:3001/api/delete', {data: {id: id}})
      .then(() => {
        // alert('Successful Delete')
        updateBoulderList();
      })
      .catch(() => {
        alert('Failed to Delete')
      })
  }

  function updateBoulderList() {
    const cols = Array.from(columnRef.current.children).filter(e =>
      e.nodeName === 'INPUT' && e.checked).map(e => (e.value))
    updateColumns([...cols, 'id'])
  }

  function updateColumns(cols) {
    setColumns(cols)

    let orderColumns = []
    for (const key of sortColumns.keys()) {
      orderColumns.push({[key]: sortColumns.get(key)})
    }

    let params = {
      select: cols,
      where: filterRef.current.value,
      orderby: orderColumns,
      limit: limitSelectorRef.current.value
    }
    params = encodeURIComponent(JSON.stringify(params))

    Axios.get('http://localhost:3001/api/get?' + params)
      .then((response) => {
        if (response.data.includes("Error")) {
          alert('Failed to retrieve data with ' + response.data)
        } else {
          setBoulderList(response.data)
        }
      })
  }

  function toggleSortColumn(column, value) {
    if (value === "NONE") {
      sortColumns.delete(column)
    } else {
      sortColumns.set(column, value)
    }
    sortColumns.delete("id")
    sortColumns.set("id", "DESC")
    updateBoulderList()
  }

  return (
    <>
      <AddBoulder 
        handleAddBoulder={handleAddBoulder}
        ref={ boulderRef }
      />
      {/* <button onClick={handleDeleteBoulder}>Delete All Selected</button> */}
      {/* <button>Update Selected</button> */}
      <BoulderTable
        boulderList={boulderList}
        columns={columns} 
        toggleSortColumn={toggleSortColumn}
        handleDeleteBoulder={handleDeleteBoulder}
        update = { updateBoulderList }
        ref = { boulderTableRef }
      />
      <BarChart data={chartData}/>
    </>
  )
}

export default App