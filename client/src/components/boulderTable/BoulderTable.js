import React, {forwardRef} from 'react'
import Boulder from './components/Boulder'
import TableHeader from './components/TableHeader'
import ColumnSelector from './components/ColumnSelector'
import LimitSelector from './components/LimitSelector'

import './BoulderTable.css'

/* eslint-disable react/prop-types */
function BoulderTable (props, ref) {
  return (
    <>
      <LimitSelector
        changeLimit={props.update} 
        ref={ ref.current.limitSelectorRef } 
      />
      <ColumnSelector 
        changeColumns={props.update}
        ref={ ref.current.columnRef } 
      />
      <div className='boulderListTableWrapper'>
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
    </>
  )
}

export default forwardRef(BoulderTable)
