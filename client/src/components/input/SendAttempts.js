import React, { forwardRef } from 'react'

export default forwardRef(
  function SendAttempts(props, ref){
    return (
      <span>
        <label className='title'>Send Attempts: </label>
        <select id="sendAttempts" ref={ref.current.sendAttemptsRef}>
          <option value="null">-- Select --</option>
          <option value="1">Flash</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10+</option>
        </select>
      </span>
    )
  })
