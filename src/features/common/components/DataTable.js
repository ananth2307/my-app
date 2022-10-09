import React from "react";
import images from "../../../assets/images";

const DataTable = ({ headers , data }) => {
    return (
        <table class="table-hover">
          <thead>
            <tr class="thead">
              {headers?.map(header => <th className={`${header.className && header.className}`}>{header.text}</th>)}
            </tr>
          </thead>
          <tbody id="toolLists">
            <tr>
              <td>Nexus</td>
              <td>Package</td>
              <td>http://103.114.208.38:9005/nexus</td>
              <td class="text-center tdico">
                <a
                  href="#"
                  onclick="callRoleConfig('24');"
                  title="Role Configuration"
                >
                  <img src={images.settings} alt="setting" />{" "}
                </a>
              </td>
              <td class="text-center tdico">
                <a href="/entitlement/report?toolName=Nexus" title="Download">
                  <img
                    src={images.download}
                    alt="download"
                  />
                </a>
              </td>
              <td class="text-center">
                <label class="toggle-control">
                  <input
                    type="checkbox"
                    class="switchInput"
                    id="switchInput_0"
                    onchange="changeToolStatus('24', '0');"
                    href="javascript:void(0);"
                  />
                  <span class="control"></span>
                </label>
              </td>
              <td class="table_icon">
                <table class="action">
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
                          <img
                            src={images.edit}
                            alt="Edit"
                          />
                        </a>
                      </td>
                      <td>
                        <a
                          onclick="beforedelete('24')"
                          title="Delete"
                          class="delete_cmdb"
                          data-bs-toggle="modal"
                          data-bs-target="#deletepopup"
                        >
                          <img
                            src={images.deleteIcon}
                            alt="Delete"
                          />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
    )
}
 export default DataTable;