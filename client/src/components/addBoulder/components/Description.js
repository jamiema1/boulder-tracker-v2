import React from "react";

export default function Description(props) {
  return (
    <div id="description">
      <label className="title">Description: </label>
      <textarea
        value={props.description}
        onChange={(e) => props.setDescription(e.target.value)}
        // TODO: figure out how to allow apostrophes
        //       .replace("'", "\\'")
      ></textarea>
    </div>
  );
}
