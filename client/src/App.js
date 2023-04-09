import React, {useState, useRef} from 'react'
import Axios from './api/Axios'
import BoulderTable from './components/boulderTable/BoulderTable'
import AddBoulder from './components/addBoulder/AddBoulder'
import Introduction from './components/introduction/Introduction'
import Login from './components/login/Login'
import Register from './components/login/Register'
import BarChart from './components/charts/BarChart'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import 'chart.js'

const ADMIN_STATUS = 'adminStatus'

function App () {
  const [boulderList, setBoulderList] = useState([])

  const boulderTableRef = useRef()
  const addBoulderRef = useRef()
  
  function addBoulderToDB (newBoulder) {
    if (localStorage.getItem(ADMIN_STATUS) == 'true') {
      Axios.post('/boulder', newBoulder)
        .then((response) => {
          if (response.status != 200) {
            alert('Failed to insert data with ' + response.data)
            return
          }
          setBoulderList([newBoulder, ...boulderList])
          boulderTableRef.current.updateBoulderList()
        })
    } else {
      alert('You do not have access to adding')
    }
  }

  function deleteBoulderFromDB (id) {
    if (localStorage.getItem(ADMIN_STATUS) == 'true') {
      Axios.delete('/boulder/' + id)
        .then((response) => {
          if (response.status != 200) {
            alert('Failed to delete data with ' + response.data)
            return
          }
          boulderTableRef.current.updateBoulderList();
        })
    } else {
      alert('You do not have access to deleting')
    }
  }

  function getBoulderListFromDB (uri) {
    if (localStorage.getItem(ADMIN_STATUS) == 'true' || 
      localStorage.getItem(ADMIN_STATUS) == 'false') {
      Axios.get('/boulders?' + uri)
        .then((response) => {
          if (response.status != 200) {
            alert('Failed to get data with ' + response.data)
            return
          }
          setBoulderList(response.data)
        })
    } else {
      alert('You do not have access to getting')
    }
  }

  function updateBoulderFromDB (updatedBoulder) {
    if (localStorage.getItem(ADMIN_STATUS) == 'true') {
      Axios.put('/boulder', updatedBoulder)
        .then(() => {
          boulderTableRef.current.updateBoulderList();
        })
        .catch(() => {
          alert('Failed Update')
        })
    } else {
      alert('You do not have access to updating')
    }
  }

  function logout() {
    localStorage.setItem('adminStatus', 'false')
  }

  return (
    <Router>
      <ul>
        <li><Link to='/user/login'>Login</Link></li>
        <li><Link to='/user/register'>Register</Link></li>
        <li><Link to='/user/:username/data'>Boulder Data</Link></li>
        <li><Link to='/user/login' onClick={logout}>Log Out</Link></li>
      </ul>
      <Routes>
        <Route exact path='/user/login' element={<Login />}></Route>
        <Route exact path='/user/register' element={<Register />}></Route>
        <Route exact path='/user/:username/data' element={
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
            <BarChart boulderList={boulderList}/>
          </>
        }></Route>
      </Routes>
    </Router>
  )
}

export default App