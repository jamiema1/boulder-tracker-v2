import React from "react";

export default function Colour(props) {
  return (
    <span>
      <label className="title">Colour: </label>
      <select
        id="colour"
        value={props.colour}
        onChange={(e) => props.setColour(e.target.value)}
      >
        <option value="null">-- Select --</option>
        <option value="black">Black</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="orange">Orange</option>
        <option value="pink">Pink</option>
        <option value="purple">Purple</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
      </select>
    </span>
  );
}
