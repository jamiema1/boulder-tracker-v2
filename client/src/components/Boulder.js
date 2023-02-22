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
    <tbody>
      <tr>
        <td><button onClick={ handleDeleteBoulder } id={boulder.id}>D</button></td>
        {boulder.rating !== undefined && <td>{boulder.rating}</td>}
        {boulder.colour !== undefined && <td>{boulder.colour}</td>}
        {boulder.holdType !== undefined && <td>{boulder.holdType}</td>}
        {boulder.boulderType !== undefined && <td>{boulder.boulderType}</td>}
        {boulder.sendAttempts !== undefined && <td>{boulder.sendAttempts}</td>}
        {boulder.sendStatus !== undefined && <td>{boulder.sendStatus}</td>}
        {boulder.startDate !== undefined && <td>{getDate(boulder.startDate)}</td>}
        {boulder.sendDate !== undefined && <td>{getDate(boulder.sendDate)}</td>}
        {boulder.description !== undefined && <td>{boulder.description}</td>}
      </tr>
    </tbody>
  )
}
