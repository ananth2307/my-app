import React, { useEffect, useState, createContext } from "react";
import DataTable from "../../../app/common-components/DataTable";
import { effciencyApi } from "../../../app/services/efficiencyApi";
import FilterModal from "./FilterModal";
import "../efficiency.scss";
import {
  fileExport,
  fileImport,
  iconElipsis,
  plusico,
  editIcon,
  projects,
  successCheck,
  deletedIcon,
} from "../../../assets/images";
import ApplicationConfig from "./ApplicationConfig";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAppConfig } from "../efficiencySlice";
import { get, isEmpty } from "lodash";



export const AppConfigContext = createContext();
const AppConfig = () => {
  const dispatch = useDispatch();

  const { efficiency } = useSelector((state) => state);

  const tableData = get(efficiency, "appConfig.tableData", []);

  

  const [getcmdbCount] = effciencyApi.useLazyGetcmdbCountQuery();
  const [getcmdbList] = effciencyApi.useLazyGetcmdbListQuery();

  const [getcmdb] = effciencyApi.useLazyGetcmdbQuery();
  const [getOperationRoleDetails] =
    effciencyApi.useLazyGetOperationRoleDetailsQuery();

  const navigate = useNavigate();
  const [state, setState] = useState({
    limit: 10,
    page: 0,
    count: 0,
    totalPages: 1,
    applicationConfig: false,
    appConfigTitle: "",
    isLoading: true,
  });

  const appConfigtableHeaders = [
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
    { key: 3, text: "Approval Gate", value: "isApprovalGate" },
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
            href=""
            onClick={() => navigate("/project", { state: { id: row.id } })}
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

  const getCmdbList = async () => {
    const promiseData = await Promise.all([
      getcmdb(),
      getOperationRoleDetails(),
      getcmdbList({
        page: state.page,
        limit: state.limit,
      }),
    ]);

    const managerList =
      !isEmpty(promiseData[1].data) &&
      promiseData[1].data.map((list) => ({
        label: list.fullName + `[${list.userId}]`,
        value: list.fullName,
        id: list.userId,
      }));
    const appNameCode =
      !isEmpty(promiseData[0].data) &&
      promiseData[0].data.map((app) => ({
        label: app.appName + `[${app.appCode}]`,
        value: app.appCode,
      }));

    const tableData = promiseData[2].data.map((list) => {
      let gate = list.approvalGate > 0 ? "Yes" : "No";
      return {
        ...list,
        isApprovalGate: gate,
      };
    });

    dispatch(
      setAppConfig(get(efficiency, "appConfig"), {
        tableData,
        filterData: { appNameCode, managerList },
      })
    );
  };

  useEffect(() => {
    getcmdbCount({})
      .unwrap()
      .then((count) => {
        setState({ ...state, count });
        getCmdbList({ page: state.page, limit: state.limit });
      });
  }, [state.page, state.limit]);

  const onEditData = (data) => {
    //api call
  };

  const onDeleteData = (data) => {
    //api call
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <img src={iconElipsis} />
    </a>
  ));

  return (
    <>
      {!state.applicationConfig ? (
        <>
          <div class="fltractnav">
            <FilterModal />
            <div class="actright">
              <a
                onClick={() =>
                  setState((state) => ({
                    ...state,
                    applicationConfig: true,
                    appConfigTitle: "New Application Configuration",
                  }))
                }
                class="border-btn"
              >
                <span>
                  <img src={plusico} />
                </span>{" "}
                New Application Configuration
              </a>
              <div class="dropdown secdrop">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} />
                  <Dropdown.Menu size="sm" title="">
                    <Dropdown.Item>
                      <a
                        onclick="importCmdbModel();"
                        data-bs-toggle="modal"
                        data-bs-target="#importpopup"
                      >
                        <span>
                          <img src={fileImport} />
                        </span>{" "}
                        Import Configuration Item
                      </a>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <a onclick="exportCmdb();">
                        <span>
                          <img src={fileExport} />
                        </span>{" "}
                        Export Configuration Item
                      </a>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <div class="main-content-wrap appwrap">
            <div className="grid-table">
              <DataTable
                headers={appConfigtableHeaders}
                body={tableData}
                count={state.count}
                onPageChange={(page) => setState({ ...state, page })}
                onGetLimit={(limit) => setState({ ...state, limit, page: 0 })}
                onEdit={onEditData}
                onDelete={onDeleteData}
                currentPage={state.page}
                isPagination={true}
              />
            </div>
          </div>
          </>
      ) : (
        <AppConfigContext.Provider value={{state,setState}}>
          <ApplicationConfig title={state.appConfigTitle} />{" "}
        </AppConfigContext.Provider>
      )}
    </>
  );
};
export default AppConfig;
