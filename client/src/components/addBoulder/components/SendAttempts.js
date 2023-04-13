import React from "react";

export default function SendAttempts(props) {
  return (
    <span>
      <label className="title">Send Attempts: </label>
      <select
        id="sendAttempts"
        value={props.sendAttempts}
        onChange={(e) => props.setSendAttempts(e.target.value)}
      >
        <option value="null">-- Select --</option>
        <option value="1">Flash</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10+</option>
      </select>
    </span>
  );
}
