import React from "react";

export default function StartDate(props) {
  return (
    <div id="startDate">
      <label className="title">Start Date: </label>
      <input
        type="date"
        value={props.startDate}
        onChange={(e) => props.setStartDate(e.target.value)}
      ></input>
    </div>
  );
}
