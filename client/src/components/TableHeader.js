import React from 'react'
import PropTypes from 'prop-types'

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired
}

export default function TableHeader ({columns}) {
  return (
    <thead>
      <tr>
        <th className='boulderListHeader'></th>
        {columns.findIndex(c => c === 'rating') !== -1 && <th className='boulderListHeader'>Rating</th> }
        {columns.findIndex(c => c === 'colour') !== -1 && <th className='boulderListHeader'>Colour</th>}
        {columns.findIndex(c => c === 'holdType') !== -1 && <th className='boulderListHeader'>Hold Type</th>}
        {columns.findIndex(c => c === 'boulderType') !== -1 && <th className='boulderListHeader'>Boulder Type</th>}
        {columns.findIndex(c => c === 'sendAttempts') !== -1 && <th className='boulderListHeader'>Send Attempts</th>}
        {columns.findIndex(c => c === 'sendStatus') !== -1 && <th className='boulderListHeader'>Send Status</th>}
        {columns.findIndex(c => c === 'startDate') !== -1 && <th className='boulderListHeader'>Start Date</th>}
        {columns.findIndex(c => c === 'sendDate') !== -1 && <th className='boulderListHeader'>Send Date</th>}
        {columns.findIndex(c => c === 'description') !== -1 && <th className='boulderListHeader'>Description</th>}
      </tr>
    </thead>
  )
}
