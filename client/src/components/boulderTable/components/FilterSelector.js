import React, {forwardRef} from "react";

export default forwardRef(function FilterSelector(props, ref) {
  return (
    <span className="filterSelector">
      <label className="title">Filter: </label>
      <textarea ref={ref}></textarea>
      <button onClick={props.updateBoulderList}>Apply</button>
    </span>
  );
});
