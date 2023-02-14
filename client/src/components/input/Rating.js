import React from 'react'

export default function Rating () {
  return (
    <span>
      <label htmlFor="rating">Rating: </label>
      <select name="rating" id="rating">
        <option value="null">-- Select --</option>
        <option value="1 hex">1 Hex</option>
        <option value="2 hex">2 Hex</option>
        <option value="3 hex">3 Hex</option>
        <option value="4 hex">4 Hex</option>
        <option value="5 hex">5 Hex</option>
        <option value="6 hex">6 Hex</option>
        <option value="unrated">Unrated</option>
      </select>
    </span>
  )
}
