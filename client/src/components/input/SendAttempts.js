import React from 'react'

export default function SendAttempts() {
  return (
    <>
        <label for="sendAttempts">Send Attempts: </label>
        <select name="sendAttempts" id="sendAttempts">
            <option value="null">How many tries?</option>
            <option value="1">Flash</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10+</option>
        </select>
    </>
  )
}
