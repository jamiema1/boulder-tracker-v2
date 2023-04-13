import React from "react";
import PropTypes from "prop-types";

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  toggleSortColumn: PropTypes.func.isRequired,
};

export default function TableHeader({columns, toggleSortColumn}) {
  function changeValue(e) {
    const button = e.target;
    let [column, value] = button.value.split(" ");
    switch (value) {
    case "NONE":
      value = "ASC";
      break;
    case "ASC":
      value = "DESC";
      break;
    case "DESC":
      value = "NONE";
      break;
    default:
      break;
    }

    button.innerHTML = value;
    button.value = column + " " + value;
    toggleSortColumn(column, value);
  }

  function resetValues(e) {
    const buttons = Array.from(
      e.target.parentElement.parentElement.getElementsByTagName("button")
    );

    buttons.forEach((button) => {
      if (button.id !== "reset") {
        let [column, value] = button.value.split(" ");
        value = "NONE";
        button.innerHTML = value;
        button.value = column + " " + value;
        toggleSortColumn(column, value);
      }
    });
  }

  function showColumn(columnName) {
    return columns.findIndex((c) => c === columnName) !== -1;
  }

  return (
    <>
      <colgroup>
        <col className="buttonColumn"></col>
        {showColumn("rating") && <col className="ratingColumn"></col>}
        {showColumn("colour") && <col className="colourColumn"></col>}
        {showColumn("holdType") && <col className="holdTypeColumn"></col>}
        {showColumn("boulderType") && <col className="boulderTypeColumn"></col>}
        {showColumn("sendAttempts") && (
          <col className="sendAttemptsColumn"></col>
        )}
        {showColumn("sendStatus") && <col className="sendStatusColumn"></col>}
        {showColumn("startDate") && <col className="startDateColumn"></col>}
        {showColumn("sendDate") && <col className="sendDateColumn"></col>}
        {showColumn("description") && <col className="descriptionColumn"></col>}
        <col className="buttonColumn"></col>
      </colgroup>

      <thead>
        <tr className="boulderListHead boulderListHeadTitle">
          <th></th>
          {showColumn("rating") && <th>Rating</th>}
          {showColumn("colour") && <th>Colour</th>}
          {showColumn("holdType") && <th>Hold Type</th>}
          {showColumn("boulderType") && <th>Boulder Type</th>}
          {showColumn("sendAttempts") && <th>Send Attempts</th>}
          {showColumn("sendStatus") && <th>Send Status</th>}
          {showColumn("startDate") && <th>Start Date</th>}
          {showColumn("sendDate") && <th>Send Date</th>}
          {showColumn("description") && <th>Description</th>}
          <th></th>
        </tr>
        <tr className="boulderListHead boulderListHeadSelector">
          <th>
            <button onClick={resetValues} id="reset">
              R
            </button>
          </th>
          {showColumn("rating") && (
            <th>
              <button value="rating NONE" onClick={changeValue}>
                NONE
              </button>
            </th>
          )}
          {showColumn("colour") && (
            <th>
              <button value="colour NONE" onClick={changeValue}>
                NONE
              </button>
            </th>
          )}
          {showColumn("holdType") && (
            <th>
              <button value="holdType NONE" onClick={changeValue}>
                NONE
              </button>
            </th>
          )}
          {showColumn("boulderType") && (
            <th>
              <button value="boulderType NONE" onClick={changeValue}>
                NONE
              </button>
            </th>
          )}
          {showColumn("sendAttempts") && (
            <th>
              <button value="sendAttempts NONE" onClick={changeValue}>
                NONE
              </button>
            </th>
          )}
          {showColumn("sendStatus") && (
            <th>
              <button value="sendStatus NONE" onClick={changeValue}>
                NONE
              </button>
            </th>
          )}
          {showColumn("startDate") && (
            <th>
              <button value="startDate NONE" onClick={changeValue}>
                NONE
              </button>
            </th>
          )}
          {showColumn("sendDate") && (
            <th>
              <button value="sendDate NONE" onClick={changeValue}>
                NONE
              </button>
            </th>
          )}
          {showColumn("description") && (
            <th>
              <button value="description NONE" onClick={changeValue}>
                NONE
              </button>
            </th>
          )}
          <th></th>
        </tr>
      </thead>
    </>
  );
}
