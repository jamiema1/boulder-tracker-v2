import React from 'react'

export default function BoulderType() {
  return (
    <>
        <label for="boulderType">Boulder Type: </label>
        <select name="boulderType" id="boulderType">
            <option value="null">-- Choose Boulder Type --</option>
            <option value="aretes">Aretes</option>
            <option value="overhang">Overhang</option>
            <option value="slab">Slab</option>
            <option value="roof">Roof</option>
        </select>
    </>
  )
}
