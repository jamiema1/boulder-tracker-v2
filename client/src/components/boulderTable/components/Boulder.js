import React from 'react'

export default function Boulder ({boulder, handleDeleteBoulder,
  handleUpdateBoulder}) {
  function getDate (datetime) {
    if (datetime === null || datetime === undefined) {
      return 'Unfinished'
    }
    return datetime.toString().split('T')[0]
  }
  
  return (
    <tr>
      <td>
        <button onClick={ handleDeleteBoulder } type="button" id={boulder.id}>
          <img 
            id={boulder.id}
            src="./images/delete.png">
          </img>
        </button>
      </td>
      {boulder.rating !== undefined && <td>{boulder.rating}</td>}
      {boulder.colour !== undefined && <td>{boulder.colour}</td>}
      {boulder.holdType !== undefined && <td>{boulder.holdType}</td>}
      {boulder.boulderType !== undefined && <td>{boulder.boulderType}</td>}
      {boulder.sendAttempts !== undefined && <td>{boulder.sendAttempts}</td>}
      {boulder.sendStatus !== undefined && <td>{boulder.sendStatus}</td>}
      {boulder.startDate !== undefined && <td>{getDate(boulder.startDate)}</td>}
      {boulder.sendDate !== undefined && <td>{getDate(boulder.sendDate)}</td>}
      {boulder.description !== undefined && <td>{boulder.description}</td>}
      <td>
        <button onClick={ handleUpdateBoulder } type="button" id={boulder.id}>
          <img id={boulder.id}
            src="./images/edit.png">
          </img>
        </button>
      </td>
    </tr>
  )
}
