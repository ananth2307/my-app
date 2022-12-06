import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DataTable from "../../../app/common-components/DataTable";
import { setIsOffCanvasOpen } from "../../../app/commonSlice";
import { effciencyApi } from "../../../app/services/efficiencyApi";
import { DrillDownOffCanvas } from "../../common";
import ProjectCustomDrillDown from "./ProjectCustomDrillDown";

const Projects = (props) => {

  const dispatch = useDispatch()

  const [projectState, setState] = useState({
    limit: 10,
    page: 0,
    count: 0,
    projectList: [],
    totalPages: 1,
    modalOpen: false,
    newApplication: false,
  });
  
  const {state} = useLocation()
  const navigate = useNavigate()
  const [getcmdbProjectCount] = effciencyApi.useGetcmdbProjectCountMutation()
  const [getcmdbProjectList] = effciencyApi.useGetcmdbProjectListMutation()
  const Headers = [
    {
      key: 1,
      text: "Type",
      value:'type'
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
    getcmdbProjectCount({id:state.id})
      .unwrap()
      .then((count) => {
      getcmdbProjectList({id:state.id,page:projectState.page,limit:projectState.limit}).then(data=> {
        setState({ ...projectState, projectList:data.data,count });
      });
     
      });
  }, [projectState.page, projectState.limit]);

  const openDrillDown = ({title}) => {
    dispatch(
      setIsOffCanvasOpen({
        isDrilldownOpen: true,
        selectedData: {
          customDrillDownCanvas(){
           return <ProjectCustomDrillDown
            title={title}
           />
          }
        }
      })
    )
  }
  const onEditData = (data) => {
    openDrillDown({title:"Update Project"})
  };

  const onDeleteData = (data) => {
    //api call
  };
  return (
    <>
    <DrillDownOffCanvas/>
      <div class="btnwrap">
        <a
          class="solid-btn"
          data-bs-toggle="offcanvas"
          role="button"
          aria-controls="addnewproject-popup"
          onClick={() => openDrillDown({title:'New Project'})}
        >
          New Project
        </a>
        <a
          class="solid-btn"
          data-bs-toggle="modal"
          data-bs-target="#importpopup"
          onclick="importProjectModel();"
        >
          Import Project
        </a>
        <a class="solid-btn" onclick="exportProjects();">
          Export Project
        </a>
      </div>
      <div class="filternav">
        <div class="filtrbtn m-0 full_width">
          <a class="solid-btn" onClick={(e)=> (navigate(-1))}>
            Back
          </a>
        </div>
      </div>
      <div class="grid-table">
          <DataTable
            headers={Headers}
            body={projectState.projectList}
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
