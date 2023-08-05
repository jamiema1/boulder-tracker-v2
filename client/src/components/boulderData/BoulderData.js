import React, {useState, useEffect, useRef} from "react";
import Axios from "../../api/Axios";
import BoulderTable from "../boulderTable/BoulderTable";
import AddBoulder from "../addBoulder/AddBoulder";
import BarChart from "../charts/BarChart";
// import ScatterChart from "../charts/ScatterChart";
import "chart.js";
import BubbleChart from "../charts/BubbleChart";
import DoughnutChart from "../charts/DoughnutChart";

const USER = "user";
export default function BoulderData() {
  const [boulderTableData, setBoulderTableData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let params = {
      select: [
        "id",
        "rating",
        "colour",
        "holdType",
        "boulderType",
        "sendAttempts",
        "startDate",
        "sendDate",
        "description",
      ],
      where: "",
      orderby: [{id: "DESC"}],
      limit: "NONE",
    };

    const uri = encodeURIComponent(JSON.stringify(params));

    Axios.get("/boulder?" + uri).then((response) => {
      if (response.status != 200) {
        alert("Failed to get data with " + response.data);
        return;
      }
      setChartData(response.data);
    });
  }, []);

  const boulderTableRef = useRef();
  const addBoulderRef = useRef();

  function addBoulderToDB(newBoulder) {
    if (localStorage.getItem(USER) == "jamiema1") {
      Axios.post("/boulder_old", newBoulder).then((response) => {
        if (response.status != 200) {
          alert("Failed to insert data with " + response.data);
          return;
        }
        // TODO: make a GET call instead so that the boulder has an id to avoid
        //       the warning messages
        setBoulderTableData([newBoulder, ...boulderTableData]);
        boulderTableRef.current.updateBoulderList();
      });
    } else {
      alert("Please log in to add boulders");
    }
  }

  function deleteBoulderFromDB(id) {
    if (localStorage.getItem(USER) == "jamiema1") {
      Axios.delete("/boulder_old/" + id).then((response) => {
        if (response.status != 200) {
          alert("Failed to delete data with " + response.data);
          return;
        }
        boulderTableRef.current.updateBoulderList();
      });
    } else {
      alert("Please log in to delete boulders");
    }
  }

  function getBoulderListFromDB(uri) {
    if (
      localStorage.getItem(USER) == "jamiema1" ||
      localStorage.getItem(USER) == "guest"
    ) {
      Axios.get("/boulder_old?" + uri).then((response) => {
        if (response.status != 200) {
          alert("Failed to get data with " + response.data);
          return;
        }
        setBoulderTableData(response.data);
      });
    } else {
      alert("Please log in to see boulders");
    }
  }

  function updateBoulderFromDB(updatedBoulder) {
    if (localStorage.getItem(USER) == "jamiema1") {
      Axios.put("/boulder_old", updatedBoulder)
        .then(() => {
          boulderTableRef.current.updateBoulderList();
        })
        .catch(() => {
          alert("Failed Update");
        });
    } else {
      alert("Please log in to update boulders");
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
        boulderTableData={boulderTableData}
        setOptions={(options) => addBoulderRef.current.setOptions(options)}
        deleteBoulderFromDB={deleteBoulderFromDB}
        getBoulderListFromDB={getBoulderListFromDB}
        ref={boulderTableRef}
      />
      <BarChart boulderData={chartData} />
      {/* <ScatterChart boulderData={chartData} /> */}
      <BubbleChart boulderData={chartData} />
      <DoughnutChart boulderData={chartData} />
    </>
  );
}
