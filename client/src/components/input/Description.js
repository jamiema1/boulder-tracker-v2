import React, { forwardRef } from 'react'
// import PropTypes from 'prop-types'

// Description.propTypes = {
//   changeDescription: PropTypes.func.isRequired,
//   descriptionRef: PropTypes.object.isRequired
// }

export default forwardRef(
  function Description(props, ref) {

    return (
      <span id="description">
        <label>Description: </label>
        <input type="text" ref={ref.current.descriptionRef}></input>
      </span>
    )
  })
