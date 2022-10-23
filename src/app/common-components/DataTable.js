import React from "react";
import { settings, download, edit, deleteIcon } from "../../assets/images";

const DataTable = ({ headers, rows }) => {
  return (
    <table className="table-hover">
      <thead>
        <tr className="thead">
          {headers?.map((header) => (
            <th
              key={`${header.text}${header.key}`}
              className={`${header.className && header.className}`}
            >
              {header.text}
            </th>
          ))}
        </tr>
      </thead>
      <tbody id="toolLists">
        {rows?.map((row, index) => (
          <tr key={`tr${index}`}>
            <td>{row.toolName}</td>
            <td>{row.type}</td>
            <td>{row.url}</td>
            <td className="text-center tdico">
              <a
                href="#"
                onclick="callRoleConfig('24');"
                title="Role Configuration"
              >
                <img src={settings} alt="setting" />{" "}
              </a>
            </td>
            <td className="text-center tdico">
              <a href="/entitlement/report?toolName=Nexus" title="Download">
                <img src={download} alt="download" />
              </a>
            </td>
            <td className="text-center">
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
            </td>
            <td className="table_icon">
              <table className="action">
                <tbody>
                  <tr>
                    <td>
                      <a
                        data-bs-toggle="offcanvas"
                        href="#addnewtool-popup"
                        role="button"
                        aria-controls="addnewtool-popup"
                        onclick="getToolData('24')"
                        title="Edit"
                      >
                        <img src={edit} alt="Edit" />
                      </a>
                    </td>
                    <td>
                      <a
                        onclick="beforedelete('24')"
                        title="Delete"
                        className="delete_cmdb"
                        data-bs-toggle="modal"
                        data-bs-target="#deletepopup"
                      >
                        <img src={deleteIcon} alt="Delete" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default DataTable;
