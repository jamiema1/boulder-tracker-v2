import React, {forwardRef } from 'react'
import './InputForm.css'

export default forwardRef(
  function HoldType(props, ref) {

    return (
      <div id="holdType">
        <label className='title'>Hold Type:</label>
        <div id ="holdTypeOptions" ref={ref.current.holdTypeRef}>
          <input type="checkbox" value="crimp"></input><label>Crimp</label>
          <input type="checkbox" value="edge"></input><label>Edge/Rail</label>
          <input type="checkbox" value="horn"></input><label>Horn</label>
          <input type="checkbox" value="jug"></input><label>Jug</label>
          <input type="checkbox" value="mini-jug"></input><label>Mini-Jug</label>
          <input type="checkbox" value="pinch"></input><label>Pinch</label>
          <input type="checkbox" value="pocket"></input><label>Pocket</label>
          <input type="checkbox" value="side-pull"></input><label>Side-Pull/Gaston</label>
          <input type="checkbox" value="sloper"></input><label>Sloper</label>
          <input type="checkbox" value="undercling"></input><label>Undercling</label>
          <input type="checkbox" value="volume"></input><label>Volume</label>
        </div>
      </div>
    )
  })
