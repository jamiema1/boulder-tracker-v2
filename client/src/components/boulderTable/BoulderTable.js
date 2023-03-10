import React, {forwardRef} from 'react'
import Boulder from './components/Boulder'
import TableHeader from './components/TableHeader'
import ColumnSelector from './components/ColumnSelector'
import LimitSelector from './components/LimitSelector'

import './BoulderTable.css'

/* eslint-disable react/prop-types */
function BoulderTable (props, ref) {
  return (
    <div className='boulderTable'>
      <div className='componentTitle'>Boulder Table</div>
      <div className='boulderTableSelectors'>
        <ColumnSelector 
          changeColumns={props.update}
          ref={ ref.current.columnRef } 
        />
        <LimitSelector
          changeLimit={props.update} 
          ref={ ref.current.limitSelectorRef } 
        />
      </div>
      <div className='boulderTableWrapper'>
        <table className="boulderList">
          <TableHeader columns={props.columns} 
            toggleSortColumn={props.toggleSortColumn}/>
          <tbody>
            {props.boulderList.map((boulder) => {
              return <Boulder key={boulder.id} boulder={boulder} 
                handleDeleteBoulder={props.handleDeleteBoulder} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default forwardRef(BoulderTable)
