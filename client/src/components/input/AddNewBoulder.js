import React from 'react'
import Rating from './Rating'
import Colour from './Colour'

export default function AddNewBoulder() {
  return (
    <>
        <form id="addBoulderForm">
            <Rating />
            <Colour />
        </form>
    </>
  )
}
