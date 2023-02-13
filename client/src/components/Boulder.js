import React from 'react'

export default function Boulder({ boulder }) {
  return (
    <div>
        <input type="checkbox"></input>
        <button>Update</button>
        <span>Rating: {boulder.rating} | Colour: {boulder.colour} | Hold Type: {boulder.hold_type} | 
            Boulder Type: {boulder.boulder_type} | Send Attempts: {boulder.send_attempts} | 
            Send Status: {boulder.send_status} | Description: {boulder.description} </span> 
    </div>
  )
}
