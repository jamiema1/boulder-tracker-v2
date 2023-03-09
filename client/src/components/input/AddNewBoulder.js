/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react'
import Rating from './Rating'
import Colour from './Colour'
import HoldType from './HoldType'
import BoulderType from './BoulderType'
import SendAttempts from './SendAttempts'
import Description from './Description'
import './InputForm.css'
import StartDate from './StartDate'
import SendDate from './SendDate'


export default forwardRef(
  function AddNewBoulder (props, ref) {
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
  })