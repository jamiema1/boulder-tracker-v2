import React, { forwardRef } from 'react'
// import PropTypes from 'prop-types'

// Description.propTypes = {
//   changeDescription: PropTypes.func.isRequired,
//   descriptionRef: PropTypes.object.isRequired
// }

export default forwardRef(
  function Description(props, ref) {

    return (
      <div id="description">
        <label>Description: </label>
        <textarea ref={ref.current.descriptionRef}></textarea>
      </div>
    )
  })
