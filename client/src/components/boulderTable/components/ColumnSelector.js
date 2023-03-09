/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react'


export default forwardRef(
  function ColumnSelector(props, ref) {
    return (
      <div id="holdType">
        <label className='title'>Show Columns:</label>
        <div id ="columnSelector" ref={ref}>
          <input type="checkbox" onClick={props.changeColumns} 
            value="rating" defaultChecked></input><label>Rating</label>
          <input type="checkbox" onClick={props.changeColumns} 
            value="colour" defaultChecked></input><label>Colour</label>
          <input type="checkbox" onClick={props.changeColumns} 
            value="holdType" defaultChecked></input><label>Hold Type</label>
          <input type="checkbox" onClick={props.changeColumns} 
            value="boulderType" defaultChecked></input>
          <label>Boulder Type</label>
          <input type="checkbox" onClick={props.changeColumns} 
            value="sendAttempts" defaultChecked></input>
          <label>Send Attempts</label>
          <input type="checkbox" onClick={props.changeColumns} 
            value="startDate" defaultChecked></input><label>Start Date</label>
          <input type="checkbox" onClick={props.changeColumns} 
            value="sendDate" defaultChecked></input><label>Send Date</label>
          <input type="checkbox" onClick={props.changeColumns} 
            value="description" defaultChecked></input>
          <label>Description</label>
        </div>
      </div>
    )
  })