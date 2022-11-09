import React, { useEffect, useState } from "react";
import { get } from "lodash";
import moment from "moment";
//Internal App imports
import Button from "../../app/common-components/Button";
import CustomSelect from "../../app/common-components/select";
import CustomDateRangePicker from "../../app/common-components/DateRangePicker/DateRangePicker";
import { setFilterData } from "../observability/observabilitySlice";
import { useDispatch, useSelector } from "react-redux";
import { observabilityApi } from "../../app/services/observabilityApi";
import { getSelectedOptionsValue } from "../../app/utilities/helpers";
import { DATE_FORMAT } from "../../app/utilities/constants";

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
  } = observabilityApi.useGetAppListQuery({ refetchOnMountOrArgChange: 10 });

  const [getProjectList] = observabilityApi.useGetProjectListMutation();

  const [getSprintList] = observabilityApi.useGetSprintListMutation();

  /**End Hooks**/

  //Set initial date in the date picker
  const initialStartDate = moment().subtract(14, "days").format(DATE_FORMAT);
  const initialEndDate = moment().format(DATE_FORMAT);
  //common function to handle initial date and date change events
  const setDateRange = (selectedDate) => {
    dispatch(
      setFilterData(get(observability, "filterData"), {
        selectedDate: {
          startDate: new Date(selectedDate.startDate).getTime(),
          endDate: new Date(selectedDate.endDate).getTime(),
        },
      })
    );
  };

  //set initial date in reducer when component mounts
  useEffect(() => {
    setDateRange({
      startDate: initialStartDate,
      endDate: initialEndDate,
    });
  }, []);

  //Get Project and Sprint List based on App selection
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
    let sprintList = []
    if (props.isShowSprintList) {
      const { data } = await getSprintList({
        appCodes: getSelectedOptionsValue(
          get(observability, "filterData.selectedApplications", [])
        ),
        projects: [],
        sprintName: [],
        startDt: get(observability, "filterData.selectedDate.startDate"),
        toDt: get(observability, "filterData.selectedDate.endDate"),
      });
      sprintList = data;
    }
    //maintaining projList in local state, dont see a reason to put this in redux
    setState((state) => ({
      ...state,
      projList: projList ? [...projList] : [],
      sprintList: sprintList ? [...sprintList] : [],
    }));
  };

  //Get Sprint List based on App and Project selection
  const handleSelectedProjChange = async (selectedProjects = []) => {
    dispatch(
      setFilterData(get(observability, "filterData"), { selectedProjects })
    );
    if (props.isShowSprintList) {
      const { data: sprintList } = await getSprintList({
        appCodes: getSelectedOptionsValue(
          get(observability, "filterData.selectedApplications", [])
        ),
        projects: getSelectedOptionsValue(selectedProjects),
        sprintName: [],
        startDt: get(observability, "filterData.selectedDate.startDate"),
        toDt: get(observability, "filterData.selectedDate.endDate"),
      });
      //maintaining sprintList in local state, dont see a reason to put this in redux
      setState((state) => ({
        ...state,
        sprintList: sprintList ? [...sprintList] : sprintList,
      }));
    }
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
            initialSettings={{
              startDate: initialStartDate,
              endDate: initialEndDate,
            }}
            selectedDate={(selectedDate) => {
              setDateRange(selectedDate);
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
            options={state?.projList ? state?.projList : []}
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
        {props.isShowSprintList && (
          <div className="frmgroup">
            <CustomSelect
              options={state?.sprintList ? state.sprintList : []}
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
        )}
      </div>
      <div className="dashfltr">
        <div className="filtrbtn">
          <Button
            className="outline-btn"
            text="Filter"
            onClick={(e) => {
              e.preventDefault();
              props.getFIlteredData();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
