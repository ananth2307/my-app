import React, { useEffect, useState } from "react";
import TableActions from "../../../../app/common-components/TableActions";
import Button from "../../../../app/common-components/Button";
import DataTable from "../../../../app/common-components/DataTable";
import { configurationApi } from "../../../../app/services/configurationApi";
import { Offcanvas } from "bootstrap";
import CustomOffCanvas from "../../../../app/common-components/CustomOffCanvas";
import {
  settings,
  download,
  edit,
  deleteIcon,
} from "../../../../assets/images";
import Pagination from "../../../../app/common-components/pagination";

const tableHeaders = [
  {
    key: 1,
    text: "Tool Name",
    value: "toolName",
  },
  {
    key: 2,
    text: "Type",
    value: "type",
  },
  {
    key: 3,
    text: "URL",
    value: "url",
  },
  {
    key: 4,
    text: "Configuration",
    className: "text-center",
    value: "configuration",
    component: (row) => (
      <a
        href="#"
        onClick={() => console.log("Row", row)}
        title="Role Configuration"
      >
        <img src={settings} alt="setting" />{" "}
      </a>
    ),
  },
  {
    key: 5,
    text: "Entitlement Report",
    className: "text-center",
    value: "entitlement_report",
    component: () => (
      <a href="/entitlement/report?toolName=Nexus" title="Download">
        <img src={download} alt="download" />
      </a>
    ),
  },
  {
    key: 6,
    text: "Status",
    className: "text-center",
    value: "status",
    component: (row) => (
      <label className="toggle-control">
        <input
          type="checkbox"
          className="switchInput"
          id="switchInput_0"
          onchange="changeToolStatus('24', '0');"
          href="javascript:void(0);"
        />
        <span className="control"></span>
      </label>
    ),
  },
  {
    key: 7,
    text: "Action",
    className: "text-center",
    value: "action",
  },
];

const Tools = () => {
  const [getToolCounts] = configurationApi.useLazyGetToolsListCountQuery();
  const [getTools] = configurationApi.useGetToolsListMutation();

  //State variable
  const [state, setState] = useState({
    limit: 10,
    page: 0,
    count: 0,
    toolList: [],
    totalPages: 1,
  });

  useEffect(() => {
    getToolCounts()
      .unwrap()
      .then((count) => {
        getTools({ page: state.page, limit: state.limit }).then(({ data }) => {
          const tools = data;
          setState({ ...state, toolList: tools, count });
        });
      });
    
  }, [state.page, state.limit]);

  return (
    <>
      <div className="btnwrap">
        <Button text="ADD NEW TOOL" />
      </div>
      <div className="grid-table">
        <DataTable
          headers={tableHeaders}
          body={state.toolList}
          limit={state.limit}
          count={state.count}
          onPageChange={(page) => setState({ ...state, page })}
          onGetLimit={(limit) => setState({ ...state, limit, page: 0 })}
        />
      </div>
    </>
  );
};
export default Tools;
