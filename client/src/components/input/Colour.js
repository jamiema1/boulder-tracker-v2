import React from 'react'

export default function Colour() {
  return (
    <span> 
        <label htmlFor="colour">Colour: </label>
        <select name="colour" id="colour">
            <option value="null">-- Select --</option>
            <option value="black">Black</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="orange">Orange</option>
            <option value="pink">Pink</option>
            <option value="red">Red</option>
            <option value="white">White</option>
            <option value="yellow">Yellow</option>
        </select>
    </span>
  )
}
