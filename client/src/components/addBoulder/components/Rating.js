import React from "react";

export default function Rating(props) {
  return (
    <div>
      <label className="title">Rating: </label>
      <select
        id="rating"
        value={props.rating}
        onChange={(e) => props.setRating(e.target.value)}
      >
        <option value="null">-- Select --</option>
        <option value="1 hex">1 Hex</option>
        <option value="2 hex">2 Hex</option>
        <option value="3 hex">3 Hex</option>
        <option value="4 hex">4 Hex</option>
        <option value="5 hex">5 Hex</option>
        <option value="6 hex">6 Hex</option>
        <option value="unrated">Unrated</option>
      </select>
    </div>
  );
}
