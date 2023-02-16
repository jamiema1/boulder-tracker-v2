import React from 'react'
import Rating from './Rating'
import Colour from './Colour'
import HoldType from './HoldType'
import BoulderType from './BoulderType'
import SendAttempts from './SendAttempts'
import SendStatus from './SendStatus'
import '../Input.css'
import Description from './Description'

export default function AddNewBoulder () {
  return (
    <>
      <form className="addBoulder" id="addBoulderForm">
        <Rating />
        <Colour />
        <HoldType />
        <BoulderType />
        <SendAttempts />
        <SendStatus />
        <Description />
      </form>
    </>
  )
}
