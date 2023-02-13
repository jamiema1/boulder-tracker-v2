import React from 'react'

export default function SendStatus() {
  return (
    <>
        <label for="sendStatus">Send Status: </label>
        <select name="sendStatus" id="sendStatus">
            <option value="null">Did you send it?</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select>
    </>
  )
}
