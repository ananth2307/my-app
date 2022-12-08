import { get } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Input from "../../../app/common-components/form/input";
import { effciencyApi } from "../../../app/services/efficiencyApi";
import { setAppConfig } from "../efficiencySlice";

const ProjectCustomDrillDown = ({ title, rowId }) => {
  const offcanvasState = useSelector((state) => state.common?.offcanvasState);

  const [getcmdbProjectCount] = effciencyApi.useGetcmdbProjectCountMutation();
  const [getcmdbProjectList] = effciencyApi.useGetcmdbProjectListMutation();

  const { efficiency } = useSelector((state) => state);
  const projectTableData = get(efficiency, "appConfig.projectTableData", []);
  const dispatch = useDispatch();
  const dropDownData = get(offcanvasState, "selectedData", {});

  const [state, setstate] = useState({
    name: get(dropDownData, "selected.projectName", ""),
    tool: dropDownData.selected
      ? get(dropDownData, "selected.selectedTool", "")
      : get(dropDownData, "tools[0].label", ""),
    type: dropDownData.selected
      ? get(dropDownData, "selected.selectedType", "")
      : get(dropDownData, "type[0].label", ""),
    error: false,
    errorMessage: "",
    rowId: rowId,
  });


  const [addManageProject] = effciencyApi.useAddManageProjectMutation();

  const handleOnChange = (name, value) => {
    name === "name" &&
      state.error &&
      setstate((state) => ({ ...state, error: false }));
    setstate((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const manageProject = () => {
    let validation =
      state.name === undefined || state.name === ""
        ? setstate((state) => ({
            ...state,
            error: true,
            errorMessage: "Field should not be empty",
          }))
        : true;

    if (validation) {
      const payload = {
        createdDt: new Date(),
        id: get(dropDownData, "selected.id", "") + "",
        name: state.name,
        tool: state.tool,
        type: state.type,
      };
      addManageProject({ payload, id: state.rowId })
        .then((data) => {
          getcmdbProjectCount({ id: state.rowId })
            .unwrap()
            .then((count) => {
              count > 0 &&
                getcmdbProjectList({
                  id: state.rowId,
                  page: 0,
                  limit: 10,
                }).then((data) => {
                  dispatch(
                    setAppConfig(projectTableData, {
                      projectTableData: data.data,
                    })
                  );
                });
            });
        })
        .catch((error) => {
          console.log("err", error);
        });
    }
  };

  return (
    <div class="flowblock toolwrap custom_scroll">
      <h3 class="flowhead" id="newhead">
        {title} <span>Please enter your Project data.</span>
      </h3>
      <div class="row">
        <div class="frmgroup default-input col-lg-6">
          <input type="hidden" value="" id="cmdbId" name="cmdbId" />
          <label>Type</label>
          <div class="dropdown bootstrap-select">
            <Select
              name={"type"}
              options={get(dropDownData, "type", [])}
              value={{ label: state.type }}
              onChange={(choice, action) => {
                handleOnChange(action.name, choice.value);
              }}
            />
          </div>
        </div>
        <div class="frmgroup default-input col-lg-6">
          <label>Tool Name</label>
          <Select
            name={"tool"}
            options={get(dropDownData, "tools", [])}
            value={{ label: state.tool }}
            onChange={(choice, action) => {
              handleOnChange(action.name, choice.value);
            }}
          />
        </div>
        <Input
          label={"Name"}
          error={state.error}
          errorMessage={state.errorMessage}
          name={"name"}
          type="text"
          containerClassName={"frmgroup validate default-input  col-lg-6"}
          onChange={handleOnChange}
          value={state.name}
          placeholder="Enter Project Name"
          autoComplete={"off"}
          maxLength={"50"}
        />
      </div>
      <div class="btnwrap save-btn">
        <button class="solid-btn graybtn">Cancel</button>
        <button class="solid-btn" onClick={manageProject}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ProjectCustomDrillDown;
