import {   deletedIcon,
    editIcon,
    projects,
    successCheck,} from "../../assets/images";

export const appConfigtableHeaders = [
    {
      key: 1,
      text: "Application Name",
      className: "text-center",
      component: (row) => (
        <div class="appname">
          <span>{row.appCode}</span>
          {row.appName}
        </div>
      ),
    },
    {
      key: 2,
      text: "Managers",
      component: (row) => (
        <div class="managerslist">
          <h5>
            <span>P</span> {row.primaryManager}
          </h5>
          <h5>
            <span>S</span> {row.secondaryManager}
          </h5>
        </div>
      ),
      value: "managers",
    },
    { key: 3, text: "Approval Gate", value: "approvalGate" },
    {
      key: 4,
      text: "Business Unit",
      value: "businessUnit",
    },
    {
      key: 4,
      text: "Projects",
      component: (row) => (
        <div class="noprojects">
          <a
            onClick="callProject(221,0);"
            href="javascript:void(0);"
            title="Project"
          >
            <img src={projects} />
            <span class="noprojectcount">{row.projectCount}</span>
          </a>
        </div>
      ),
      value: "projectCount",
    },
    {
      key: 5,
      text: "Actions",
      component: (row) => (
        <div class="tdactions">
          {" "}
          <div class="actcol">
            <a href="">
              <span>Tools</span>
              <img src={successCheck} />
            </a>
          </div>
          <div class="actcol">
            <a href="">
              <span>Access</span>
              <img src={successCheck} />
            </a>
          </div>
          <div class="actcol">
            <a onclick="getCmdb('221')" title="Edit">
              <span>Edit</span>
              <img src={editIcon} />
            </a>
          </div>
          <div class="actcol">
            <a
              onclick="deleteCmdb('221')"
              title="Delete"
              class="delete_cmdb"
              data-bs-toggle="modal"
              data-bs-target="#deletepopup"
            >
              <span>Delete</span>
              <img src={deletedIcon} />
            </a>
          </div>
        </div>
      ),
    },
  ];