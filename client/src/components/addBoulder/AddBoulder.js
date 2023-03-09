/* eslint-disable react/prop-types */
import React, {forwardRef} from 'react'
import Rating from './components/Rating'
import Colour from './components/Colour'
import HoldType from './components/HoldType'
import BoulderType from './components/BoulderType'
import SendAttempts from './components/SendAttempts'
import Description from './components/Description'
import './AddBoulder.css'
import StartDate from './components/StartDate'
import SendDate from './components/SendDate'

function AddBoulder (props, ref) {
  return (
    <>
      <form id="addBoulderForm">
        <div className="dropDownOptions">
          <Rating ref={ ref }/>
          <Colour ref={ ref }/>
          <BoulderType ref={ ref }/>
          <SendAttempts ref={ ref }/>
          <StartDate ref={ ref }/>
          <SendDate ref={ ref }/>
        </div>
        <HoldType ref={ ref }/>
        <Description ref={ ref }/>
        <div>
          <button onClick={props.handleAddBoulder}
            type="button">Add Boulder</button>
        </div>
      </form>
    </>
  )
}

export default forwardRef(AddBoulder)