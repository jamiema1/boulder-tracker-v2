import React from 'react'
import PropTypes from 'prop-types'

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  toggleSortColumn: PropTypes.func.isRequired
}

export default function TableHeader ({columns, toggleSortColumn}) {
  function changeValue(e) {
    let [column, value] = e.target.value.split(' ')
    switch (value) {
    case 'NONE':
      value = 'ASC'
      break;
    case 'ASC':
      value = 'DESC'
      break;
    case 'DESC':
      value = 'NONE'
      break;
    default:
      break;
    }
    e.target.innerHTML = value
    e.target.value = column + ' ' + value
    toggleSortColumn(column, value)
  }

  return (
    <>
      <colgroup>
        <col span='1' className='buttonColumn'></col>
        {columns.findIndex(c => c === 'rating') !== -1 &&
         <col span='1' className='ratingColumn'></col>}
        {columns.findIndex(c => c === 'colour') !== -1 && 
        <col span='1' className='colourColumn'></col>}
        {columns.findIndex(c => c === 'holdType') !== -1 && 
        <col span='1' className='holdTypeColumn'></col>}
        {columns.findIndex(c => c === 'boulderType') !== -1 && 
        <col span='1' className='boulderTypeColumn'></col>}
        {columns.findIndex(c => c === 'sendAttempts') !== -1 &&
         <col span='1' className='sendAttemptsColumn'></col>}
        {columns.findIndex(c => c === 'sendStatus') !== -1 &&
         <col span='1' className='sendStatusColumn'></col>}
        {columns.findIndex(c => c === 'startDate') !== -1 && 
        <col span='1' className='startDateColumn'></col>}
        {columns.findIndex(c => c === 'sendDate') !== -1 && 
        <col span='1' className='sendDateColumn'></col>}
        {columns.findIndex(c => c === 'description') !== -1 &&
         <col span='1' className='descriptionColumn'></col>}
      </colgroup>
        
      <thead>
        <tr className='boulderListHead'>
          <th></th>
          {columns.findIndex(c => c === 'rating') !== -1 && 
          <th>Rating<button value="rating NONE"
            onClick={changeValue}>NONE</button></th> }
          {columns.findIndex(c => c === 'colour') !== -1 && 
          <th>Colour<button value="colour NONE"
            onClick={changeValue}>NONE</button></th>}
          {columns.findIndex(c => c === 'holdType') !== -1 &&
           <th>Hold Type<button value="holdType NONE"
             onClick={changeValue}>NONE</button></th>}
          {columns.findIndex(c => c === 'boulderType') !== -1 &&
           <th>Boulder Type<button value="boulderType NONE"
             onClick={changeValue}>NONE</button></th>}
          {columns.findIndex(c => c === 'sendAttempts') !== -1 && 
          <th>Send Attempts<button value="sendAttempts NONE" 
            onClick={changeValue}>NONE</button></th>}
          {columns.findIndex(c => c === 'sendStatus') !== -1 &&
           <th>Send Status<button value="sendStatus NONE" 
             onClick={changeValue}>NONE</button></th>}
          {columns.findIndex(c => c === 'startDate') !== -1 && 
          <th>Start Date<button value="startDate NONE" 
            onClick={changeValue}>NONE</button></th>}
          {columns.findIndex(c => c === 'sendDate') !== -1 && 
          <th>Send Date<button value="sendDate NONE" 
            onClick={changeValue}>NONE</button></th>}
          {columns.findIndex(c => c === 'description') !== -1 &&
           <th>Description<button value="description NONE" 
             onClick={changeValue}>NONE</button></th>}
        </tr>
      </thead>
    </>
  )
}
