import React, { forwardRef } from 'react'

export default forwardRef(
  function SendStatus (props, ref) {
    return (
      <span>
        <label>Send Status: </label>
        <span id ="sendStatus" ref={ref.current.sendStatusRef}>
          <input type="radio" id ="sendStatus" name="sendStatus" value="0" defaultChecked ></input><label>No</label>
          <input type="radio" id ="sendStatus" name="sendStatus" value="1"></input><label>Yes</label>
        </span>
      </span>
    )
  })
