import React from 'react'

export default function BoulderType () {
  return (
    <span>
      <label htmlFor="boulderType">Boulder Type: </label>
      <select name="boulderType" id="boulderType">
        <option value="null">-- Select --</option>
        <option value="aretes">Aretes</option>
        <option value="overhang">Overhang</option>
        <option value="slab">Slab</option>
        <option value="roof">Roof</option>
      </select>
    </span>
  )
}
