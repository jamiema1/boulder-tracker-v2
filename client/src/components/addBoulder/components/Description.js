import React, {forwardRef} from 'react'

export default forwardRef(
  function Description(props, ref) {
    return (
      <div id="description">
        <label className='title'>Description: </label>
        <textarea ref={ref}></textarea>
      </div>
    )
  })
