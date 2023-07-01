import React from "react";

export default function HoldType(props) {
  function handleOnChange(e) {
    const key = e.target.value;
    const updatedCheckedState = new Map(props.holdTypeCheckedState);
    updatedCheckedState.set(key, !props.holdTypeCheckedState.get(key));

    props.setHoldTypeCheckedState(updatedCheckedState);

    let newHoldType = "";
    updatedCheckedState.forEach((value, key) => {
      if (value) {
        newHoldType = newHoldType.concat(key, " ");
      }
    });

    props.setHoldType(newHoldType.trimEnd());
  }

  return (
    <div id="holdType">
      <label className="title">Hold Type:</label>
      <div id="holdTypeOptions">
        <input
          type="checkbox"
          value="crimp"
          checked={props.holdTypeCheckedState.get("crimp")}
          onChange={handleOnChange}
        ></input>
        <label>Crimp</label>
        <input
          type="checkbox"
          value="edge"
          checked={props.holdTypeCheckedState.get("edge")}
          onChange={handleOnChange}
        ></input>
        <label>Edge/Rail</label>
        <input
          type="checkbox"
          value="horn"
          checked={props.holdTypeCheckedState.get("horn")}
          onChange={handleOnChange}
        ></input>
        {/* <label>Horn</label>
        <input
          type="checkbox"
          value="jug"
          checked={props.holdTypeCheckedState.get("jug")}
          onChange={handleOnChange}
        ></input> */}
        <label>Jug</label>
        <input
          type="checkbox"
          value="mini-jug"
          checked={props.holdTypeCheckedState.get("mini-jug")}
          onChange={handleOnChange}
        ></input>
        {/* <label>Mini-Jug</label>
        <input
          type="checkbox"
          value="pinch"
          checked={props.holdTypeCheckedState.get("pinch")}
          onChange={handleOnChange}
        ></input> */}
        <label>Pinch</label>
        <input
          type="checkbox"
          value="pocket"
          checked={props.holdTypeCheckedState.get("pocket")}
          onChange={handleOnChange}
        ></input>
        <label>Pocket</label>
        <input
          type="checkbox"
          value="side-pull"
          checked={props.holdTypeCheckedState.get("side-pull")}
          onChange={handleOnChange}
        ></input>
        <label>Side-Pull</label>
        <input
          type="checkbox"
          value="sloper"
          checked={props.holdTypeCheckedState.get("sloper")}
          onChange={handleOnChange}
        ></input>
        <label>Sloper</label>
        <input
          type="checkbox"
          value="undercling"
          checked={props.holdTypeCheckedState.get("undercling")}
          onChange={handleOnChange}
        ></input>
        {/* <label>Undercling</label>
        <input
          type="checkbox"
          value="volume"
          checked={props.holdTypeCheckedState.get("volume")}
          onChange={handleOnChange}
        ></input> */}
        <label>Volume</label>
      </div>
    </div>
  );
}
