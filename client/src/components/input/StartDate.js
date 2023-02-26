import React, { forwardRef } from 'react'

export default forwardRef(
  function StartDate(props, ref) {
    return (
      <div id="startDate">
        <label className='title'>Start Date: </label>
        <input type='text' ref={ref.current.startDateRef}></input>
      </div>
    )
  })
