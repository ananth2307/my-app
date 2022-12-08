import { get, isEmpty } from "lodash";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CustomModal from "../../../app/common-components/CustomModal";
import DataTable from "../../../app/common-components/DataTable";
import { setIsOffCanvasOpen } from "../../../app/commonSlice";
import { effciencyApi } from "../../../app/services/efficiencyApi";
import { DrillDownOffCanvas } from "../../common";
import { setAppConfig } from "../efficiencySlice";
import ProjectCustomDrillDown from "./ProjectCustomDrillDown";

const Projects = (props) => {
  const dispatch = useDispatch();

  const { efficiency } = useSelector((state) => state);

  const projectTableData = get(efficiency, "appConfig.projectTableData", []);

  const [projectState, setState] = useState({
    limit: 10,
    page: 0,
    count: 0,
    totalPages: 1,
    modalOpen: false,
    newApplication: false,
  });

  const { state } = useLocation();
  const navigate = useNavigate();

  const [getcmdbProjectCount] = effciencyApi.useLazyGetcmdbProjectCountQuery();
  const [getcmdbProjectList] = effciencyApi.useLazyGetcmdbProjectListQuery();

  const [getNewProjectType] = effciencyApi.useLazyGetNewProjectTypeQuery({});
  const [getNewProjectTool] = effciencyApi.useLazyGetNewProjectToolQuery({});

  const Headers = [
    {
      key: 1,
      text: "Type",
      value: "type",
    },
    {
      key: 2,
      text: "Tools",
      value: "tool",
    },
    { key: 3, text: "Name", value: "name" },
    {
      key: 4,
      text: "Action",
      value: "action",
    },
  ];

  useEffect(() => {
    getcmdbProjectCount({ id: state.id })
      .unwrap()
      .then((count) => {
        getcmdbProjectList({
          id: state.id,
          page: projectState.page,
          limit: projectState.limit,
        }).then((data) => {
          dispatch(
            setAppConfig(projectTableData, { projectTableData: data.data })
          );
          setState({ ...projectState, count });
        });
      });
  }, [projectState.page, projectState.limit]);

  const getDropDowndata = async () => {
    let { data: type } = await getNewProjectType();
    let { data: tools } = await getNewProjectTool();
    type =
      !isEmpty(type) &&
      type.map((item) => ({
        label: item,
        value: item,
      }));
    tools =
      !isEmpty(tools) &&
      tools.map((tool) => ({
        label: tool,
        value: tool,
      }));
    return { type, tools };
  };

  const openDrillDown = async ({ title }, selectedLabels) => {
    const { type, tools } = await getDropDowndata();
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        selectedData: {
          customDrillDownCanvas() {
            return <ProjectCustomDrillDown title={title} rowId={state.id} />;
          },
          type,
          tools,
          selected: selectedLabels ? selectedLabels : "",
        },
      })
    );
  };
  const onEditData = async (data) => {
    const {
      tool: selectedTool,
      type: selectedType,
      name: projectName,
      id,
    } = data;
    openDrillDown(
      { title: "Update Project" },
      { selectedTool, selectedType, projectName, id }
    );
  };
  const onDeleteData = (data) => {
    //api call
  };

  const handleShow = () => {
    setState((state) => ({
      ...state,
      modalOpen: true,
    }));
  };

  const handleClose = () =>
    setState((state) => ({
      ...state,
      modalOpen: false,
    }));

  const modalBody = () => (
    <div class="modal-body">
      <p></p>
      <form id="upload-file-form" class="hide-ele">
        <div class="col-lg-12 upload-file-model">
          <label
            class="btn btn-submit chaos-btn ml-0 upload_btn"
            for="upload-file-input"
          >
            <input
              id="upload-file-input"
              type="file"
              name="file"
              class="hide-ele"
            />
          </label>
          <span class="label label-default hide" id="upload-file-info"></span>
          <div class="col-md-12 upload_example">
            <a href="/template/project">Project_Template.csv</a>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <DrillDownOffCanvas />
      <div class="btnwrap">
        <button
          class="solid-btn"
          onClick={() => openDrillDown({ title: "New Project" })}
        >
          New Project
        </button>
        <button class="solid-btn" onClick={handleShow}>
          Import Project
        </button>
        <CustomModal
          modalOpen={projectState.modalOpen}
          modalHide={handleClose}
          modalTitle={"Import Project"}
          PrimaryButton={"Submit"}
          SecondaryButton={"Close"}
          modalBody={modalBody}
          primaryBtnFunc={handleClose}
          secondaryBtnFunc={handleClose}
        />
        <button class="solid-btn" onclick="exportProjects();">
          Export Project
        </button>
      </div>
      <div class="filternav">
        <div class="filtrbtn m-0 full_width">
          <button class="solid-btn" onClick={(e) => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
      <div class="grid-table">
        <DataTable
          headers={Headers}
          body={projectTableData}
          count={projectState.count}
          onPageChange={(page) => setState({ ...projectState, page })}
          onGetLimit={(limit) => setState({ ...projectState, limit, page: 0 })}
          onEdit={onEditData}
          hasAction
          onDelete={onDeleteData}
          currentPage={projectState.page}
          isPagination={true}
        />
      </div>
    </>
  );
};

export default Projects;
