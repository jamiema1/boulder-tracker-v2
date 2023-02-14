import React from 'react'
import Boulder from './Boulder'
import Header from './Header'
import PropTypes from 'prop-types'
import './Input.css'

BoulderList.propTypes = {
  boulderList: PropTypes.array.isRequired
}

export default function BoulderList ({ boulderList }) {
  return (
    <span className="boulderList">
      <Header />
      {boulderList.map((boulder) => {
        return <Boulder key={boulder.id} boulder={boulder} />
      })}
    </span>
  )
}
