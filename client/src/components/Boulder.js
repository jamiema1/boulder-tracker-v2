import React from 'react'

export default function Boulder({ boulder }) {
  return (
    <div>
        <input type="checkbox"></input>
        <button>Update</button>
        <span>Rating: {boulder.rating} | Colour: {boulder.colour} | Type: {boulder.type} | 
            Description: {boulder.description} </span> 
    </div>
  )
}
