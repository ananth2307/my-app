import React from "react";
import TableActions from "../../../common/components/TableActions";
import Button from "../../../common/components/Button";
import DataTable from "../../../common/components/DataTable";

const tableHeaders = [
  {
    key: 1,
    text: "Tool Name",
  },
  {
    key: 1,
    text: "Type",
  },
  {
    key: 1,
    text: "URL",
  },
  {
    key: 1,
    text: "Configuration",
    className: "text-center"
  },
  {
    key: 1,
    text: "Entitlement Report",
    className: "text-center"
  },
  {
    key: 1,
    text: "Status",
    className: "text-center"
  },
  {
    key: 1,
    text: "Action",
    className: "text-center"
  },
]

const Groups = () => {
  return (
    <>
      <div class="btnwrap">
        <Button />
      </div>
      <TableActions />
      <div class="grid-table">
        <DataTable headers={tableHeaders} />
      </div>
    </>
  );
};
export default Groups;
