import React from 'react'
import Boulder from './Boulder'
import Header from './Header'
import PropTypes from 'prop-types'
import './Input.css'

BoulderList.propTypes = {
  boulderList: PropTypes.array.isRequired,
  handleDeleteBoulder: PropTypes.func.isRequired
}

export default function BoulderList ({ boulderList, handleDeleteBoulder }) {
  return (
    <span className="boulderList">
      <Header />
      {boulderList.map((boulder) => {
        return <Boulder key={boulder.id} boulder={boulder} handleDeleteBoulder={handleDeleteBoulder} />
      })}
    </span>
  )
}
