import React, {useState, useRef} from "react";
import Axios from "../../api/Axios";
import BoulderTable from "../boulderTable/BoulderTable";
import AddBoulder from "../addBoulder/AddBoulder";
import BarChart from "../charts/BarChart";
import "chart.js";

const USER = "user";
export default function BoulderData() {
  const [boulderList, setBoulderList] = useState([]);

  const boulderTableRef = useRef();
  const addBoulderRef = useRef();

  function addBoulderToDB(newBoulder) {
    if (localStorage.getItem(USER) == "jamiema1") {
      Axios.post("/boulder", newBoulder).then((response) => {
        if (response.status != 200) {
          alert("Failed to insert data with " + response.data);
          return;
        }
        setBoulderList([newBoulder, ...boulderList]);
        boulderTableRef.current.updateBoulderList();
      });
    } else {
      alert("You do not have access to adding");
    }
  }

  function deleteBoulderFromDB(id) {
    if (localStorage.getItem(USER) == "jamiema1") {
      Axios.delete("/boulder/" + id).then((response) => {
        if (response.status != 200) {
          alert("Failed to delete data with " + response.data);
          return;
        }
        boulderTableRef.current.updateBoulderList();
      });
    } else {
      alert("You do not have access to deleting");
    }
  }

  function getBoulderListFromDB(uri) {
    if (
      localStorage.getItem(USER) == "jamiema1" ||
      localStorage.getItem(USER) == "guest"
    ) {
      Axios.get("/boulders?" + uri).then((response) => {
        if (response.status != 200) {
          alert("Failed to get data with " + response.data);
          return;
        }
        setBoulderList(response.data);
      });
    } else {
      alert("You do not have access to getting");
    }
  }

  function updateBoulderFromDB(updatedBoulder) {
    if (localStorage.getItem(USER) == "jamiema1") {
      Axios.put("/boulder", updatedBoulder)
        .then(() => {
          boulderTableRef.current.updateBoulderList();
        })
        .catch(() => {
          alert("Failed Update");
        });
    } else {
      alert("You do not have access to updating");
    }
  }

  return (
    <>
      <AddBoulder
        addBoulderToDB={addBoulderToDB}
        updateBoulderFromDB={updateBoulderFromDB}
        ref={addBoulderRef}
      />
      <BoulderTable
        boulderList={boulderList}
        setOptions={(options) => addBoulderRef.current.setOptions(options)}
        deleteBoulderFromDB={deleteBoulderFromDB}
        getBoulderListFromDB={getBoulderListFromDB}
        ref={boulderTableRef}
      />
      <BarChart boulderList={boulderList} />
    </>
  );
}
