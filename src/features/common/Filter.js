import React, { useEffect, useState } from "react";
import { get } from "lodash";
//Internal App imports
import Button from "../../app/common-components/Button";
import CustomSelect from "../../app/common-components/select";
import CustomDateRangePicker from "../../app/common-components/DateRangePicker/DateRangePicker";
import { setFilterData } from "../observability/observabilitySlice";
import { useDispatch, useSelector } from "react-redux";
import { observabilityApi } from "../../app/services/observabilityApi";
import { getSelectedOptionsValue } from "../../app/utilities/helpers";

const Filter = (props) => {
  const [state, setState] = useState({
    projList: [],
    sprintList: [],
  });
  const dispatch = useDispatch();
  const { observability } = useSelector((state) => state);
  const {
    data: appList = [],
    isLoading: isAppListLoading,
    isSuccess: isAppListSuccess,
    isError: isAppListError,
    error: getAppListError,
  } = observabilityApi.useGetAppListQuery({ refetchOnMountOrArgChange: true });

  const [getProjectList] = observabilityApi.useGetProjectListMutation();

  const [getSprintList] = observabilityApi.useGetSprintListMutation();

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const getSprintListOnChange = () => {

  }

  const handleSelectedAppChange = async (selectedApplications = []) => {
    dispatch(
      setFilterData(get(observability, "filterData"), { selectedApplications })
    );
    const { data: projList } = await getProjectList({
      appCodes: getSelectedOptionsValue(selectedApplications),
      projects: [],
      sprintName: [],
      startDt: get(observability, "filterData.selectedDate.startDate"),
      toDt: get(observability, "filterData.selectedDate.endDate"),
    });
    const { data: sprintList } = await getSprintList({
      appCodes: getSelectedOptionsValue(
        get(observability, "filterData.selectedApplications", [])
      ),
      projects: [],
      sprintName: [],
      startDt: get(observability, "filterData.selectedDate.startDate"),
      toDt: get(observability, "filterData.selectedDate.endDate"),
    });
    setState((state) => ({ ...state, projList: [...projList] }));
  };

  const handleSelectedProjChange = async (selectedProjects = []) => {
    dispatch(
      setFilterData(get(observability, "filterData"), { selectedProjects })
    );
    const { data: sprintList } = await getSprintList({
      appCodes: getSelectedOptionsValue(
        get(observability, "filterData.selectedApplications", [])
      ),
      projects: getSelectedOptionsValue(selectedProjects),
      sprintName: [],
      startDt: get(observability, "filterData.selectedDate.startDate"),
      toDt: get(observability, "filterData.selectedDate.endDate"),
    });
    setState((state) => ({ ...state, sprintList: [...sprintList] }));
  };

  const handleSelectedSprintChange = async (selectedSprints = []) => {
    dispatch(
      setFilterData(get(observability, "filterData"), { selectedSprints })
    );
  };

  return (
    <div className="actnav dashactnav">
      <div className="actright">
        <div className="frmgroup dateinput">
          <CustomDateRangePicker
            selectedDate={(selectedDate) => {
              dispatch(
                setFilterData(get(observability, "filterData"), {
                  selecteDate: {
                    startDate: new Date(selectedDate.startDate).getTime(),
                    endDate: new Date(selectedDate.endDate).getTime(),
                  },
                })
              );
            }}
          />
        </div>
        <div className="frmgroup">
          <CustomSelect
            options={appList ? appList : []}
            isMulti={true}
            hideSelectedOptions={false}
            isCheckboxSelect={true}
            placeholder="Select Application"
            isSearchable={true}
            closeMenuOnSelect={false}
            onChange={(selectedApplications) =>
              handleSelectedAppChange(selectedApplications)
            }
          />
        </div>
        <div className="frmgroup">
          <CustomSelect
            options={state.projList}
            isMulti={true}
            hideSelectedOptions={false}
            isCheckboxSelect={true}
            placeholder="Select Project"
            isSearchable={true}
            closeMenuOnSelect={false}
            onChange={(selectedProjects) =>
              handleSelectedProjChange(selectedProjects)
            }
          />
        </div>
        <div className="frmgroup">
          <CustomSelect
            options={state.sprintList}
            isMulti={true}
            hideSelectedOptions={false}
            isCheckboxSelect={true}
            placeholder="Select Sprint"
            isSearchable={true}
            closeMenuOnSelect={false}
            onChange={(selectedSprints) =>
              handleSelectedSprintChange(selectedSprints)
            }
          />
        </div>
      </div>
      <div className="dashfltr">
        <div className="filtrbtn">
          <Button className="outline-btn" text="Filter" />
        </div>
      </div>
    </div>
  );
};

export default Filter;
