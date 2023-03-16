import React, {forwardRef} from 'react'

export default forwardRef(
  function BoulderType(props, ref){
    return (
      <span>
        <label className="title">Boulder Type: </label>
        <select id="boulderType" ref={ref}>
          <option value="null">-- Select --</option>
          <option value="aretes">Aretes</option>
          <option value="overhang">Overhang</option>
          <option value="slab">Slab</option>
          <option value="roof">Roof</option>
        </select>
      </span>
    )
  })
