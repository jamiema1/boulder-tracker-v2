import React, {forwardRef} from 'react'
import Boulder from './components/Boulder'
import TableHeader from './components/TableHeader'
import ColumnSelector from './components/ColumnSelector'
import LimitSelector from './components/LimitSelector'
import FilterSelector from './components/FilterSelector'
import './BoulderTable.css'

function BoulderTable (props, ref) {
  return (
    <div className='boulderTable'>
      <div className='componentTitle'>Boulder Table</div>
      <div className='boulderTableSelectors'>
        <div>
          <FilterSelector 
            applyFilter={props.update}
            ref={ref.current.filterRef}
          />
        </div>
        <div className='columnLimitSelectors'>
          <ColumnSelector 
            changeColumns={props.update}
            ref={ ref.current.columnRef } 
          />
          <LimitSelector
            changeLimit={props.update} 
            ref={ ref.current.limitSelectorRef } 
          />
        </div>
      </div>
      <div className='boulderTableWrapper'>
        <table className="boulderList">
          <TableHeader columns={props.columns} 
            toggleSortColumn={props.toggleSortColumn}/>
          <tbody>
            {props.boulderList.map((boulder) => {
              return <Boulder
                key={boulder.id}
                boulder={boulder} 
                handleDeleteBoulder={props.handleDeleteBoulder}
                handleUpdateBoulder={props.handleUpdateBoulder} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default forwardRef(BoulderTable)
