import React from "react";

export default function SendDate(props) {
  return (
    <div id="sendDate">
      <label className="title">Send Date: </label>
      <input
        type="date"
        value={props.sendDate}
        onChange={(e) => props.setSendDate(e.target.value)}
      ></input>
    </div>
  );
}
