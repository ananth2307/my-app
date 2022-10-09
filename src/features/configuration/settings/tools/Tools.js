import React from "react";
import TableActions from "../../../common/components/TableActions";
import Button from "../../../common/components/Button";
import DataTable from "../../../common/components/DataTable";

const Tools = () => {
  return (
    <>
      <div class="btnwrap">
        <Button />
      </div>
      <TableActions />
      <div class="grid-table">
        <DataTable />
      </div>
    </>
  );
};
export default Tools;
