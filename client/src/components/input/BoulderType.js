import React, {forwardRef} from 'react'

export default forwardRef(
  function BoulderType(props, ref){
    return (
      <span>
        <label htmlFor="boulderType">Boulder Type: </label>
        <select name="boulderType" id="boulderType" ref={ref.current.boulderTypeRef}>
          <option value="null">-- Select --</option>
          <option value="aretes">Aretes</option>
          <option value="overhang">Overhang</option>
          <option value="slab">Slab</option>
          <option value="roof">Roof</option>
        </select>
      </span>
    )
  })
