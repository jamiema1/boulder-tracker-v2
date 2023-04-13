import React from "react";

export default function BoulderType(props) {
  return (
    <span>
      <label className="title">Boulder Type: </label>
      <select
        id="boulderType"
        value={props.boulderType}
        onChange={(e) => props.setBoulderType(e.target.value)}
      >
        <option value="null">-- Select --</option>
        <option value="aretes">Aretes</option>
        <option value="overhang">Overhang</option>
        <option value="slab">Slab</option>
        <option value="roof">Roof</option>
      </select>
    </span>
  );
}
