import React from "react";

export default function Boulder({boulder, deleteBoulderFromDB, setOptions}) {
  const id = boulder.id;
  const rating = boulder.rating;
  const colour = boulder.colour;
  const holdType = boulder.holdType;
  const boulderType = boulder.boulderType;
  const sendAttempts = boulder.sendAttempts;
  const startDate = boulder.startDate;
  const sendDate = boulder.sendDate;
  const description = boulder.description;

  function getDate(datetime) {
    if (datetime === null || datetime === undefined) {
      return "Unfinished";
    }
    return datetime.split("T")[0];
  }

  function handleDeleteBoulder(e) {
    deleteBoulderFromDB(e.target.id);
  }

  function handleUpdateBoulder(e) {
    const row =
      e.target.parentElement.parentElement.parentElement.getElementsByTagName(
        "td"
      );

    if (row.length < 10) {
      alert("All columns must be shown before editing a boulder");
      return;
    }

    let r = rating === -1 ? "unrated" : rating + " hex";
    let start = getDate(startDate);
    let send = getDate(sendDate) === "Unfinished" ? null : getDate(sendDate);

    setOptions([
      id,
      r,
      colour,
      holdType,
      boulderType,
      sendAttempts + "",
      start,
      send,
      description,
    ]);
  }

  return (
    <tr>
      <td>
        <button onClick={handleUpdateBoulder} type="button" id={id}>
          {/* <img id={id} src="/images/edit.png"></img> */}E
        </button>
      </td>
      {rating !== undefined && <td>{rating}</td>}
      {colour !== undefined && <td>{colour}</td>}
      {holdType !== undefined && <td>{holdType}</td>}
      {boulderType !== undefined && <td>{boulderType}</td>}
      {sendAttempts !== undefined && <td>{sendAttempts}</td>}
      {startDate !== undefined && <td>{getDate(startDate)}</td>}
      {sendDate !== undefined && <td>{getDate(sendDate)}</td>}
      {description !== undefined && <td>{description}</td>}
      <td>
        <button onClick={handleDeleteBoulder} type="button" id={id}>
          {/* <img id={id} src="/images/delete.png"></img> */}D
        </button>
      </td>
    </tr>
  );
}
