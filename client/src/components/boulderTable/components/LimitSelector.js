/* eslint-disable react/prop-types */
import React, {forwardRef} from 'react'

export default forwardRef (
  function LimitSelector (props, ref){
    return (
      <span>
        <label>Number of Rows: </label>
        <select id="limitSelector" onChange={props.changeLimit} ref={ref} 
          defaultValue={15}>
          <option value="5">5</option>
          <option value="15" >15</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="NONE">All</option>
        </select>
      </span>
    )
  })
