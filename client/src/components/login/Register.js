/* eslint-disable max-len */
import React, {useState} from 'react'
import Axios from '../../api/Axios'

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,23}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

export default function Register() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  function createAccount(e) {
    e.preventDefault()

    console.log(username)
    console.log(password)
    console.log(confirmPassword)

    if (!USERNAME_REGEX.test(username)) {
      alert('Invalid Username: username must start with a letter and contain between 4 and 24 alphanumeric characters.')
      return
    }
    if (!PASSWORD_REGEX.test(password)) {
      alert('Invalid Password: password must be between 8 and 24 characters long and contain at least 1 digit, lowercase letter, uppercase letter, and symbol (!@#$%).')
      return
    } 
    if (password != confirmPassword) {
      alert('Passwords do not match')
      return
    }
    

    Axios.post('/user/' + username + '/' + password)
      .then((response) => {
        alert('Successfully registered ' + response.data.username)
        setUsername('')
        setPassword('')
        setConfirmPassword('')
      })
      .catch((error) => {
        alert(error.response.data)
      })
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={createAccount}>
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
        <label>Confirm Password:</label>
        <input 
          type="password"
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value)}}
        >
        </input>
        <button>Create Account</button>
      </form>
    </div>
    
  )
}
