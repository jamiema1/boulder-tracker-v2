import React from "react";
import {useNavigate} from "react-router-dom";
import "./homepage.css";

export default function Homepage() {
  const navigate = useNavigate();

  function login() {
    navigate("/user/login");
  }

  function guest() {
    navigate("/user/guest/data");
    localStorage.setItem("user", "guest");
  }

  return (
    <div>
      <div className="homepage">
        <div className="componentTitle">Boulder Tracker</div>
        <div>
          Welcome to the boulder tracker! On this page you will have access to a
          vast database of boulder problems, as well as many features that
          operate on them. Here's a quick rundown of all the supported features:
        </div>
        <ul>
          <li>
            Add Boulder: You can add a new boulder to the database by inputing
            values for every field, then pressing 'Add Boulder'. If a problem is
            unfinished, the 'Send Date' field should be left blank. When a
            boulder has been selected to be updated, the form will no longer be
            able to add new boulders until the boulder currently selected has
            been processed.
          </li>
          <li>
            Boulder Table: This table contains all information about every
            boulder and supports the following actions:
            <ul>
              <li>
                Filter: Inputing a valid SQL WHERE query will result in a table
                containing only the desired boulders.
              </li>
              <li>
                Column Visibility: Selecting or deselecting the checkboxes for
                each column will toggle their visibility.
              </li>
              <li>
                Sorting: Pressing the button below each column header toggles
                the order in which the boulders should be sorted. Selecting
                multiple columns determines the way in which tiebreakers are
                determined (first - last). The 'R' button to the far left resets
                how the boulders are sorted to being in the order in which they
                were added.
              </li>
              <li>
                Update: Pressing the pen icon copies the boulder's data into the
                Add Boulder form and allows necessary changes to be made.
              </li>
              <li>
                Delete: Pressing the trash can icon permanently deletes a
                boulder from the database.
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <button onClick={login}>Log In</button>
      <button onClick={guest}>Continue as Guest</button>
    </div>
  );
}
