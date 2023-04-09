import React, {useState} from 'react'
import Axios from '../../api/Axios'
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function login(e) {
    e.preventDefault()

    if (username === '') {
      alert('Please enter a username')
      return
    }
    if (password === '') {
      alert('Please enter a password')
      return
    }

    Axios.post('/user/' + username + '/' + password + '/signin')
      .then((response) => {
        alert('Successfully logged in ' + response.data)
        setUsername('')
        setPassword('')
        navigate('/user/'+ username +'/data')
        localStorage.setItem('adminStatus', 'true')
      })
      .catch((error) => {
        alert(error.response.data)
      })
  }

  function register(e) {
    e.preventDefault()
    navigate('/user/register')
  }

  function guest(e) {
    e.preventDefault()
    navigate('/user/guest/data')
    localStorage.setItem('adminStatus', 'false')
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Username:</label>
        <input 
          type="text"
          value={username}
          onChange={(e) => { setUsername(e.target.value)}}
        >
        </input>
        <label>Password:</label>
        <input 
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value)}}
        >
        </input>
        <button onClick={login}>Login</button>
        <button onClick={register}>Create Account</button>
        <button onClick={guest}>Continue as Guest</button>
      </form>
    </div>
    
  )
}
