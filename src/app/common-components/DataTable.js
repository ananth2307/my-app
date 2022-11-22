import React, { useState } from "react";
import { settings, download, edit, deleteIcon } from "../../assets/images";
import Pagination from "./pagination";
import TableActions from "./TableActions";

const DataTable = ({
  headers,
  body,
  onPageChange,
  onGetLimit,
  count,
  hasAction,
  onEdit,
  onDelete
}) => {
  const [state, setState] = useState({
    limit: 10,
  });

  const handleOnChangeLimit = (limit) => {
    onGetLimit(limit);
    setState({ ...state, limit: limit });
  };

  return (
    <>
      {hasAction && (
        <TableActions
          onGetLimit={(limit) => handleOnChangeLimit(limit)}
          limit={state.limit}
        />
      )}
      <div className="table_wrapper">
        <table className="table-hover">
          <thead>
            <tr className="thead">
              {headers?.map((header) => (
                <th
                  key={`${header.text}${header.key}`}
                  className={
                    header?.className ? `${header.className}` : "thead"
                  }
                >
                  {header.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
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
                              <a onClick={() => onEdit(row)}>
                                <img src={edit} alt="Edit" />
                              </a>
                            </td>
                            <td>
                              <a onClick={() => onDelete(row)} className="delete_cmdb">
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
      </div>
      <Pagination
        rows={body}
        onPageChange={(page) => onPageChange(page)}
        totalPages={Math.ceil(count / state.limit)}
      />
    </>
  );
};
export default DataTable;
