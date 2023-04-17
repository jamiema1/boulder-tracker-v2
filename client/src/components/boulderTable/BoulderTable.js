import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import Boulder from "./components/Boulder";
import TableHeader from "./components/TableHeader";
import ColumnSelector from "./components/ColumnSelector";
import LimitSelector from "./components/LimitSelector";
import FilterSelector from "./components/FilterSelector";
import "./BoulderTable.css";

const sortColumns = new Map([["id", "DESC"]]);

export default forwardRef(function BoulderTable(props, ref) {
  const boulderTableData = props.boulderTableData;
  const getBoulderListFromDB = props.getBoulderListFromDB;

  const [columns, setColumns] = useState([]);
  const columnRef = useRef();
  const limitSelectorRef = useRef(15);
  const filterRef = useRef();

  useImperativeHandle(ref, () => ({
    updateBoulderList() {
      updateBoulderList();
    },
  }));

  useEffect(() => {
    const allFields = [
      "id",
      "rating",
      "colour",
      "holdType",
      "boulderType",
      "sendAttempts",
      "startDate",
      "sendDate",
      "description",
    ];
    updateColumns(allFields);
  }, []);

  function updateBoulderList() {
    const cols = Array.from(columnRef.current.children)
      .filter((e) => e.nodeName === "INPUT" && e.checked)
      .map((e) => e.value);
    updateColumns([...cols, "id"]);
  }

  function updateColumns(cols) {
    setColumns(cols);

    let orderColumns = [];
    for (const key of sortColumns.keys()) {
      orderColumns.push({[key]: sortColumns.get(key)});
    }

    let params = {
      select: cols,
      where: filterRef.current.value,
      orderby: orderColumns,
      limit: limitSelectorRef.current.value,
    };

    params = encodeURIComponent(JSON.stringify(params));

    getBoulderListFromDB(params);
  }

  function toggleSortColumn(column, value) {
    if (value === "NONE") {
      sortColumns.delete(column);
    } else {
      sortColumns.set(column, value);
    }
    sortColumns.delete("id");
    sortColumns.set("id", "DESC");
    updateBoulderList();
  }

  return (
    <div className="boulderTable">
      <div className="componentTitle">Boulder Table</div>
      <div className="boulderTableSelectors">
        <div>
          <FilterSelector
            updateBoulderList={updateBoulderList}
            ref={filterRef}
          />
        </div>
        <div className="columnLimitSelectors">
          <ColumnSelector
            updateBoulderList={updateBoulderList}
            ref={columnRef}
          />
          <LimitSelector
            updateBoulderList={updateBoulderList}
            ref={limitSelectorRef}
          />
        </div>
      </div>
      <div className="boulderTableWrapper">
        <table className="boulderTableData">
          <TableHeader columns={columns} toggleSortColumn={toggleSortColumn} />
          <tbody>
            {boulderTableData.map((boulder) => {
              return (
                <Boulder
                  key={boulder.id}
                  boulder={boulder}
                  deleteBoulderFromDB={props.deleteBoulderFromDB}
                  setOptions={props.setOptions}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});
