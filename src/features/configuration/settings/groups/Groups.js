import React from "react";
import TableActions from "../../../common/components/TableActions";
import Button from "../../../common/components/Button";
import DataTable from "../../../common/components/DataTable";
import { configurationApi } from "../../../../app/services/configurationApi";

const tableHeaders = [
  {
    key: 1,
    text: "Tool Name",
  },
  {
    key: 2,
    text: "Action",
    className: "text-center"
  },
]

const Groups = () => {
  const { data = [], isLoading, isFetching, isError } = configurationApi.useGetToolsListQuery()
  return (
    <>
      <div className="btnwrap">
        <Button text="ADD GROUP" />
      </div>
      <TableActions />
      <div className="grid-table">
        <DataTable headers={tableHeaders} data={data} />
      </div>
    </>
  );
};
export default Groups;
