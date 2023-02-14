import React from 'react'

export default function Boulder({ boulder }) {

  function getDate(datetime) {
    if (datetime === null || datetime === undefined) {
      return "Unfinished"
    }
    return datetime.toString().split("T")[0]
  }

  return (
    <div >
        <span className="boulder">
          <input type="checkbox"></input>
          <span>{boulder.rating}</span>
          <span>{boulder.colour}</span>
          <span>{boulder.holdType}</span>
          <span>{boulder.boulderType}</span>
          <span>{boulder.sendAttempts}</span>
          <span>{boulder.sendStatus}</span>
          <span>{getDate(boulder.startDate)}</span>
          <span>{getDate(boulder.sendDate)}</span>
          <span>{boulder.description}</span>
        </span> 
    </div>
  )
}

// Rating | Colour:  | Hold Type:  |  Boulder Type:  | Send Attempts:  | 
// Send Status:| Description:  