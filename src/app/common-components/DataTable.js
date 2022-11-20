import React from "react";
import { settings, download, edit, deleteIcon } from "../../assets/images";
import Pagination from "./pagination";
import TableActions from "./TableActions";

const DataTable = ({
  headers,
  body,
  onPageChange,
  onGetLimit,
  limit,
  count,
}) => {
  return (
    <>
      <TableActions onGetLimit={(limit) => onGetLimit(limit)} limit={limit} />
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
          {body?.map((row, index) => (
            <tr key={`tr${index}`}>
              {headers.map((header, index) =>
                header?.component ? (
                  <td className="text-center tdico">
                    {header?.component(row)}
                  </td>
                ) : header.value === "action" ? (
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
                ) : (
                  <td>{row[header.value]}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        rows={body}
        onPageChange={(page) => onPageChange(page)}
        totalPages={Math.ceil(count / limit)}
      />
    </>
  );
};
export default DataTable;
