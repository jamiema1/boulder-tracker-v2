import React, {useState, useImperativeHandle, forwardRef} from "react";
import Rating from "./components/Rating";
import Colour from "./components/Colour";
import HoldType from "./components/HoldType";
import BoulderType from "./components/BoulderType";
import SendAttempts from "./components/SendAttempts";
import Description from "./components/Description";
import "./AddBoulder.css";
import StartDate from "./components/StartDate";
import SendDate from "./components/SendDate";

function convertRatingToNumber(str) {
  if (str.includes("hex")) {
    return +str.substring(0, 1);
  }
  return -1;
}

let updateBoulderId;

export default forwardRef(function AddBoulder(props, ref) {
  const [rating, setRating] = useState("null");
  const [colour, setColour] = useState("null");
  const [holdType, setHoldType] = useState("null");
  const [holdTypeCheckedState, setHoldTypeCheckedState] = useState(
    new Map([
      ["crimp", false],
      ["edge", false],
      // ["horn", false],
      ["jug", false],
      // ["mini-jug", false],
      ["pinch", false],
      ["pocket", false],
      ["side-pull", false],
      ["sloper", false],
      // ["undercling", false],
      ["volume", false],
    ])
  );
  const [boulderType, setBoulderType] = useState("null");
  const [sendAttempts, setSendAttempts] = useState("null");
  const [startDate, setStartDate] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [description, setDescription] = useState("");

  const [boulderList, setBoulderList] = useState("[]");

  const addBoulderToDB = props.addBoulderToDB;
  const updateBoulderFromDB = props.updateBoulderFromDB;

  useImperativeHandle(ref, () => ({
    setOptions(options) {
      setOptions(options);
    },
  }));

  function resetInputFields() {
    setRating("null");
    setColour("null");
    setHoldType("");
    const newCheckedState = new Map(holdTypeCheckedState);
    newCheckedState.forEach((value, key) => newCheckedState.set(key, false));
    setHoldTypeCheckedState(newCheckedState);
    setBoulderType("null");
    setSendAttempts("null");
    setStartDate("");
    setSendDate("");
    setDescription("");
  }

  function getInputFields() {
    const anyNullFields = [
      rating,
      colour,
      holdType,
      boulderType,
      sendAttempts,
      startDate,
      description,
    ].reduce((acc, val) => acc || val === "null" || val === "", false);

    if (anyNullFields) {
      alert("Missing required information");
      return;
    }

    const boulder = {
      "rating": convertRatingToNumber(rating),
      "colour": colour,
      "holdType": holdType,
      "boulderType": boulderType,
      "sendAttempts": sendAttempts,
      "startDate": startDate,
      "sendDate": sendDate === "" ? null : sendDate,
      "description": description,
    }

    return boulder;
  }

  function addBoulder() {
    let newBoulder = getInputFields();
    if (newBoulder === undefined) return;
    addBoulderToDB(newBoulder);
    // TODO: uncomment when done testing
    // resetInputFields();
  }

  function addBoulders() {
    // TODO: finish this function
    let newBoulders = boulderList.replaceAll("\n", "  ").replaceAll("; ", "");
    // console.log(newBoulders)
    newBoulders = JSON.parse(newBoulders)
    if (newBoulders === undefined) return;
    newBoulders.forEach(cleanData);
    newBoulders.forEach(addBoulderToDB);
  }

  function cleanData(newBoulder) {
    newBoulder.startDate = convertToDateTime(newBoulder.startDate);
    newBoulder.sendDate = convertToDateTime(newBoulder.sendDate);
  }

  function convertToDateTime(dateTime) {
    if (dateTime == null) {
      return dateTime
    }
    const dateTimeParts = dateTime.split(", ");
    let timeParts = dateTimeParts[1].split(":");
    let minuteParts = timeParts[1].split(" ")
    if (minuteParts[1] == "PM") {
      timeParts[0] = String(Number(timeParts[0]) + 12)
    }
    return dateTimeParts[0] + " " + timeParts[0] + ":" + minuteParts[0];
  }


  const [updating, setUpdating] = useState(false);

  function setOptions([
    id,
    rating,
    colour,
    holdType,
    boulderType,
    sendAttempts,
    startDate,
    sendDate,
    description,
  ]) {
    setRating(rating);
    setColour(colour);
    setHoldType(holdType);

    const newCheckedState = new Map(holdTypeCheckedState);
    newCheckedState.forEach((value, key) => {
      if (holdType.includes(key)) {
        newCheckedState.set(key, true);
      } else {
        newCheckedState.set(key, false);
      }
    });
    setHoldTypeCheckedState(newCheckedState);

    setBoulderType(boulderType);
    setSendAttempts(sendAttempts);
    setStartDate(startDate);
    setSendDate(sendDate === null ? "" : sendDate);
    setDescription(description);

    // TODO: move to a separate function
    updateBoulderId = id;
    setUpdating(true);
  }

  function updateBoulder() {
    const updatedBoulder = getInputFields();
    if (updatedBoulder === undefined) return;
    updatedBoulder.id = updateBoulderId;
    updateBoulderFromDB(updatedBoulder);
    resetInputFields();
    setUpdating(false);
  }

  function cancelUpdate() {
    resetInputFields();
    setUpdating(false);
  }

  return (
    <div className="addBoulder">
      <div className="componentTitle">Add Boulder</div>
      <form id="addBoulderForm">
        <div className="dropDownOptionsWrapper">
          <div className="dropDownOptions">
            <Rating rating={rating} setRating={setRating} />
            <Colour colour={colour} setColour={setColour} />
            <BoulderType
              boulderType={boulderType}
              setBoulderType={setBoulderType}
            />
            <SendAttempts
              sendAttempts={sendAttempts}
              setSendAttempts={setSendAttempts}
            />
            <StartDate startDate={startDate} setStartDate={setStartDate} />
            <SendDate sendDate={sendDate} setSendDate={setSendDate} />
          </div>
        </div>
        <HoldType
          holdType={holdType}
          setHoldType={setHoldType}
          holdTypeCheckedState={holdTypeCheckedState}
          setHoldTypeCheckedState={setHoldTypeCheckedState}
        />
        <Description
          description={description}
          setDescription={setDescription}
        />
        <div className="addBoulderButtons">
          <div className="clearFieldsButton">
            <button type="button" onClick={resetInputFields}>
              Clear Fields
            </button>
          </div>
          <div className="cancelUpdateButton">
            <button type="button" onClick={cancelUpdate} disabled={!updating}>
              Cancel Update
            </button>
          </div>
          <div className="updateBoulderButton">
            <button type="button" onClick={updateBoulder} disabled={!updating}>
              Update Boulder
            </button>
          </div>
          <div className="addBoulderButton">
            <button onClick={addBoulder} type="button" disabled={updating}>
              Add Boulder
            </button>
          </div>
        </div>
      </form>
      <div>
        <textarea onChange={(e) => setBoulderList(e.target.value)}>
        </textarea>
        <button onClick={addBoulders} type="button" disabled={updating}>
          Add Boulders
        </button>
      </div>
    </div>
  );
});
