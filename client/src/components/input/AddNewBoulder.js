import React from 'react'
import Rating from './Rating'
import Colour from './Colour'
import HoldType from './HoldType'
import BoulderType from './BoulderType'
import SendAttempts from './SendAttempts'
import SendStatus from './SendStatus'

export default function AddNewBoulder() {
  return (
    <>
        <form id="addBoulderForm">
            <Rating /><br></br>
            <Colour /><br></br>
            <HoldType /><br></br>
            <BoulderType /><br></br>
            <SendAttempts /><br></br>
            <SendStatus /><br></br>
        </form>
    </>
  )
}
