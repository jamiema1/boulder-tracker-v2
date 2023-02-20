import React from 'react'
import PropTypes from 'prop-types'

Boulder.propTypes = {
  boulder: PropTypes.object.isRequired,
  handleDeleteBoulder: PropTypes.func.isRequired
}

export default function Boulder ({ boulder, handleDeleteBoulder }) {
  function getDate (datetime) {
    if (datetime === null || datetime === undefined) {
      return 'Unfinished'
    }
    return datetime.toString().split('T')[0]
  }

  return (
    <>
      <button onClick={ handleDeleteBoulder } id={boulder.id}>D</button>
      <span>{boulder.rating}</span>
      <span>{boulder.colour}</span>
      <span>{boulder.holdType}</span>
      <span>{boulder.boulderType}</span>
      <span>{boulder.sendAttempts}</span>
      <span>{boulder.sendStatus}</span>
      <span>{getDate(boulder.startDate)}</span>
      <span>{getDate(boulder.sendDate)}</span>
      <span>{boulder.description}</span>
    </>
  )
}
