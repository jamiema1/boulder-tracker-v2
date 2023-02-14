import React from 'react'

export default function SendStatus() {
  return (
    <span>
        <label>Send Status: </label>
        <span id ="sendStatus">
          <input type="radio" id ="sendStatus" name="sendStatus" value="0" defaultChecked></input><label>No</label>
          <input type="radio" id ="sendStatus" name="sendStatus" value="1"></input><label>Yes</label>
        </span>
    </span>
  )
}
