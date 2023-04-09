import React, {useState} from 'react'
import Axios from '../../api/Axios'

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function login(e) {
    e.preventDefault()

    Axios.post('/user/' + username + '/' + password + '/signin')
      .then((response) => {
        alert('Successfully logged in ' + response.data)
        setUsername('')
        setPassword('')
      })
      .catch((error) => {
        alert(error.response.data)
      })
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
        <button>Create Account</button>
        <button>Continue as Guest</button>
      </form>
    </div>
    
  )
}
