import React, { useEffect } from "react";
import TableActions from "../../../../app/common-components/TableActions";
import Button from "../../../../app/common-components/Button";
import DataTable from "../../../../app/common-components/DataTable";
import { configurationApi } from "../../../../app/services/configurationApi";

const tableHeaders = [
  {
    key: 1,
    text: "Tool Name",
  },
  {
    key: 2,
    text: "Type",
  },
  {
    key: 3,
    text: "URL",
  },
  {
    key: 4,
    text: "Configuration",
    className: "text-center",
  },
  {
    key: 5,
    text: "Entitlement Report",
    className: "text-center",
  },
  {
    key: 6,
    text: "Status",
    className: "text-center",
  },
  {
    key: 7,
    text: "Action",
    className: "text-center",
  },
];

const Tools = () => {
  const { data = [], isLoading, isFetching, isError } = configurationApi.useGetToolsListQuery()
  return (
    <>
      <div className="btnwrap">
        <Button text="ADD NEW TOOL" />
      </div>
      <TableActions />
      <div className="grid-table">
        <DataTable headers={tableHeaders} rows={data} />
      </div>
    </>
  );
};
export default Tools;
