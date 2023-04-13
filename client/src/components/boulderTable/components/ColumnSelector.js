/* eslint-disable react/prop-types */
import React, {forwardRef} from "react";

export default forwardRef(function ColumnSelector(props, ref) {
  const change = props.updateBoulderList;

  return (
    <div className="columnSelector">
      <label className="title">Show Columns:</label>
      <div ref={ref}>
        <input
          type="checkbox"
          onClick={change}
          value="rating"
          defaultChecked
        ></input>
        <label className="option">Rating</label>
        <input
          type="checkbox"
          onClick={change}
          value="colour"
          defaultChecked
        ></input>
        <label className="option">Colour</label>
        <input
          type="checkbox"
          onClick={change}
          value="holdType"
          defaultChecked
        ></input>
        <label className="option">Hold Type</label>
        <input
          type="checkbox"
          onClick={change}
          value="boulderType"
          defaultChecked
        ></input>
        <label className="option">Boulder Type</label>
        <input
          type="checkbox"
          onClick={change}
          value="sendAttempts"
          defaultChecked
        ></input>
        <label className="option">Send Attempts</label>
        <input
          type="checkbox"
          onClick={change}
          value="startDate"
          defaultChecked
        ></input>
        <label className="option">Start Date</label>
        <input
          type="checkbox"
          onClick={change}
          value="sendDate"
          defaultChecked
        ></input>
        <label className="option">Send Date</label>
        <input
          type="checkbox"
          onClick={change}
          value="description"
          defaultChecked
        ></input>
        <label className="option">Description</label>
      </div>
    </div>
  );
});
