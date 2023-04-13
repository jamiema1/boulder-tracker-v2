/* eslint-disable max-len */
import React from "react";
import "./introduction.css";

export default function Introduction() {
  return (
    <div className="introduction">
      <div className="componentTitle">Boulder Tracker</div>
      <div>
        Welcome to the boulder tracker! On this page you will have access to a
        vast database of boulder problems, as well as many features that operate
        on them. Here's a quick rundown of all the supported features:
      </div>
      <div>
        Add Boulder: You can add a new boulder to the database by inputing
        values for every field, then pressing 'Add Boulder'. If a problem is
        unfinished, the 'Send Date' field should be left blank. When a boulder
        has been selected to be updated, the form will no longer be able to add
        new boulders until the boulder currently selected has been processed.
      </div>
      <div>
        Boulder Table: This table contains all information about every boulder
        and supports the following actions:
        <div>
          Filter: Inputing a valid SQL WHERE query will result in a table
          containing only the desired boulders.
        </div>
        <div>
          Column Visibility: Selecting or deselecting the checkboxes for each
          column will toggle their visibility.
        </div>
        <div>
          Sorting: Pressing the button below each column header toggles the
          order in which the boulders should be sorted. Selecting multiple
          columns determines the way in which tiebreakers are determined (first
          - last). The 'R' button to the far left resets how the boulders are
          sorted to being in the order in which they were added.
        </div>
        <div>
          Update: Pressing the pen icon copies the boulder's data into the Add
          Boulder form and allows necessary changes to be made.
        </div>
        <div>
          Delete: Pressing the trash can icon permanently deletes a boulder from
          the database.
        </div>
      </div>
    </div>
  );
}
