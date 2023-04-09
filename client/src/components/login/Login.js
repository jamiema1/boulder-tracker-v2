import React, {useState} from 'react'

export default function login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
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
      <button>Login</button>
      <button>Create Account</button>
    </form>
  )
}
