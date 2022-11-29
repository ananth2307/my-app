import React, { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import CustomDateRangePicker from "../../../app/common-components/DateRangePicker/DateRangePicker";
import { getDefaultSelectedDate } from "../../common/helpers";
import { homeFilter, appIcon, sprintIcon } from "../../../assets/images";
import moment from "moment";
import CustomSelect from "../../../app/common-components/select";
import { setFilterData } from "../observabilitySlice";
import { useDispatch, useSelector } from "react-redux";
import { observabilityApi } from "../../../app/services/observabilityApi";
import { getSelectedOptionsValue } from "../../../app/utilities/helpers";
import { get } from "lodash";

const Filter = (props) => {
  const [state, setState] = useState({
    projList: [],
    sprintList: [],
  });
  const dispatch = useDispatch();
  const { observability } = useSelector((state) => state);

  const [getProjectList] = observabilityApi.useGetProjectListMutation();

  const [getSprintList] = observabilityApi.useGetSprintListMutation();
  const { data: appList } = observabilityApi.useGetAppListQuery({});

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
    let sprintList = [];
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

  //Set initial date in the date picker
  const { initialStartDate, initialEndDate } = getDefaultSelectedDate();
  return (
    <div className="panel panel-filled home-Filter">
      <div className="panel-heading row">
        <div className="col-md-1">
          <img src={homeFilter} id="homefilter_icon" />
          <span className="home_filter_txt">Filter</span>
        </div>
        <div class="col-md-3 pl-5 date-pl">
          <span class="pull-left pt-10">
            <FaCalendar className="nav-item" />
          </span>
          <CustomDateRangePicker
            initialSettings={{
              startDate: initialStartDate,
              endDate: initialEndDate,
              alwaysShowCalendars: true,
              ranges: {
                Today: [moment(), moment()],
                Yesterday: [
                  moment().subtract(1, "days"),
                  moment().subtract(1, "days"),
                ],
                "Last 7 Days": [moment().subtract(6, "days"), moment()],
                "Last 15 Days": [moment().subtract(14, "days"), moment()],
                "Last 30 Days": [moment().subtract(29, "days"), moment()],
                "This Month": [
                  moment().startOf("month"),
                  moment().endOf("month"),
                ],
                "Last Month": [
                  moment().subtract(1, "month").startOf("month"),
                  moment().subtract(1, "month").endOf("month"),
                ],
              },
            }}
            selectedDate={(selectedDate) => {
              //   setDateRange(selectedDate);
              console.log("Redis", selectedDate);
            }}
          />
        </div>
        <div class="col-md-2 appcode_select">
          <img src={appIcon} class="dash_icon dash_img" />
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
        <div class="col-md-2 sprintName_select">
          <img src={sprintIcon} class="dash_icon dash_img" />
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
        <div class="col-md-2 project_select">
          <i class="pe pe-7s-notebook dash_icon"></i>
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
      </div>
    </div>
  );
};

export default Filter;
