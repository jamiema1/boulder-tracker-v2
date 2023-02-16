import React, { forwardRef } from 'react'
import Rating from './Rating'
import Colour from './Colour'
import HoldType from './HoldType'
import BoulderType from './BoulderType'
import SendAttempts from './SendAttempts'
import SendStatus from './SendStatus'
import Description from './Description'
// import PropTypes from 'prop-types'
import '../Input.css'

// AddNewBoulder.propTypes = {
//   changeDescription: PropTypes.func.isRequired,
//   descriptionRef: PropTypes.object.isRequired
// }

export default forwardRef(
  function AddNewBoulder (props, ref) {
    return (
      <>
        <form className="addBoulder" id="addBoulderForm">
          <Rating ref={ ref }/>
          <Colour ref={ ref }/>
          <HoldType ref={ ref }/>
          <BoulderType ref={ ref }/>
          <SendAttempts ref={ ref }/>
          <SendStatus ref={ ref }/>
          <Description ref={ ref }/>
        </form>
      </>
    )
  })