import React from 'react'
import Boulder from './Boulder'
import TableHeader from './TableHeader'
import PropTypes from 'prop-types'
import './BoulderListTable.css'

BoulderList.propTypes = {
  boulderList: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  handleDeleteBoulder: PropTypes.func.isRequired
}

export default function BoulderList ({ boulderList, columns, handleDeleteBoulder }) {
  return (
    <div className='boulderListTableWrapper'>
      <table className="boulderList">
        <TableHeader columns={columns} />
        <tbody>
          {boulderList.map((boulder) => {
            return <Boulder key={boulder.id} boulder={boulder} handleDeleteBoulder={handleDeleteBoulder} />
          })}
        </tbody>
      </table>
    </div>
  )
}
