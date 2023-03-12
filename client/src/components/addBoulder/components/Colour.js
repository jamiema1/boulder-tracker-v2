import React, {forwardRef} from 'react'

export default forwardRef (
  function Colour (props, ref){
    return (
      <span>
        <label className='title'>Colour: </label>
        <select id="colour" ref={ref.current.colourRef}>
          <option value="null">-- Select --</option>
          <option value="black">Black</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="orange">Orange</option>
          <option value="pink">Pink</option>
          <option value="purple">Purple</option>
          <option value="red">Red</option>
          <option value="white">White</option>
          <option value="yellow">Yellow</option>
        </select>
      </span>
    )
  })
