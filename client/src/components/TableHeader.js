import React from 'react'
import PropTypes from 'prop-types'

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired
}

export default function TableHeader ({columns}) {
  return (
    <>
      <colgroup>
        <col span='1' className='buttonColumn'></col>
        {columns.findIndex(c => c === 'rating') !== -1 && <col span='1' className='ratingColumn'></col>}
        {columns.findIndex(c => c === 'colour') !== -1 && <col span='1' className='colourColumn'></col>}
        {columns.findIndex(c => c === 'holdType') !== -1 && <col span='1' className='holdTypeColumn'></col>}
        {columns.findIndex(c => c === 'boulderType') !== -1 && <col span='1' className='boulderTypeColumn'></col>}
        {columns.findIndex(c => c === 'sendAttempts') !== -1 && <col span='1' className='sendAttemptsColumn'></col>}
        {columns.findIndex(c => c === 'sendStatus') !== -1 && <col span='1' className='sendStatusColumn'></col>}
        {columns.findIndex(c => c === 'startDate') !== -1 && <col span='1' className='startDateColumn'></col>}
        {columns.findIndex(c => c === 'sendDate') !== -1 && <col span='1' className='sendDateColumn'></col>}
        {columns.findIndex(c => c === 'description') !== -1 && <col span='1' className='descriptionColumn'></col>}
      </colgroup>
        
      <thead>
        <tr className='boulderListHead'>
          <th></th>
          {columns.findIndex(c => c === 'rating') !== -1 && <th>Rating</th> }
          {columns.findIndex(c => c === 'colour') !== -1 && <th>Colour</th>}
          {columns.findIndex(c => c === 'holdType') !== -1 && <th>Hold Type</th>}
          {columns.findIndex(c => c === 'boulderType') !== -1 && <th>Boulder Type</th>}
          {columns.findIndex(c => c === 'sendAttempts') !== -1 && <th>Send Attempts</th>}
          {columns.findIndex(c => c === 'sendStatus') !== -1 && <th>Send Status</th>}
          {columns.findIndex(c => c === 'startDate') !== -1 && <th>Start Date</th>}
          {columns.findIndex(c => c === 'sendDate') !== -1 && <th>Send Date</th>}
          {columns.findIndex(c => c === 'description') !== -1 && <th>Description</th>}
        </tr>
      </thead>
    </>
  )
}
