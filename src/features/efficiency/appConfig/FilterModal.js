import { dispatch } from "d3";
import { get, isEmpty } from "lodash";
import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { effciencyApi } from "../../../app/services/efficiencyApi";
import { formCustomStyle } from "../constants";
import { setFilterData, setAppConfig } from "./efficiencySlice";

const FilterModal = () => {
  const [state, setstate] = useState({
    limit: 10,
    page: 0,
    appCodeMenuOpen: false,
    applicationNameMenuOpen: false,
    primaryManagerMenuOpen: false,
    secondaryManagerMenuOpen: false,
    businessUnitMenu: false,
    appCode: "",
    applicationName: "",
    primaryManager: "",
    secondaryManager: "",
    businessUnit: "",
    authorization: 0,
  });

  const { data: appList } = effciencyApi.useGetcmdbQuery({});
  const { data: operationList } = effciencyApi.useGetOperationRoleDetailsQuery(
    {}
  );

  const { efficiency } = useSelector((state) => state);
  const [getFilteredCmddCount] = effciencyApi.useGetFilteredCmdbCountMutation();

  const [getFilteredCmdbList] = effciencyApi.useGetFilteredCmdbListMutation();

  const managerList =
    !isEmpty(operationList) &&
    operationList.map((list) => ({
      label: list.fullName + `[${list.userId}]`,
      value: list.fullName,
    }));
  const appNameCode =
    !isEmpty(appList) &&
    appList.map((app) => ({
      label: app.appName + `[${app.appCode}]`,
      value: app.appCode,
    }));

  const dropDownState = (input, type) => {
    input && type
      ? setstate((state) => ({
          ...state,
          [`${type}MenuOpen`]: true,
        }))
      : setstate((state) => ({
          ...state,
          [`${type}MenuOpen`]: false,
        }));
  };

  const handleOnChange = (name, value) => {
    value =
      name === "authorization" ? (state.authorization === 0 ? 1 : 0) : value;

    setstate((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const colourStyles = {
    control: (styles) => ({ ...styles, ...formCustomStyle }),
  };

  const handleSubmit = async () => {
    const payload = {
      appCode: state.appCode,
      approvalGate: state.approvalGate,
      businessUnit: state.businessUnit,
      primaryManager: state.primaryManager,
      secondaryManager: state.secondaryManager,
    };

    const { data: count } = await getFilteredCmddCount(payload);

    const filteredList =
      count > 0
        ? await getFilteredCmdbList(payload, state.page, state.limit)
        : [];

    const tableData = filteredList.data.map((list) => {
      let gate = list.approvalGate > 0 ? "Yes" : "No";
      return {
        ...list,
        isApprovalGate: gate,
      };
    });
    dispatch(
      setAppConfig(get(efficiency, "appConfig"), {tableData})
    );
  };
  return (
    <div class="modal-body">
      <h4 class="sectitle">Filters</h4>
      <div class="fltrwrap" id="filterForm">
        <div class="fltrcol">
          <label class="selectlabel">Application Details</label>
          <div class="frmgroup">
            <Select
              name="appCode"
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              styles={colourStyles}
              options={appNameCode}
              onInputChange={(input) => dropDownState(input, "appCode")}
              onChange={(choice, action) => {
                handleOnChange(action.name, choice.value);
              }}
              menuIsOpen={state.appCodeMenuOpen}
              placeholder={"Enter Application Code"}
            />
          </div>
          <div class="frmgroup">
            <Select
              name="applicationName"
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              styles={colourStyles}
              options={appNameCode}
              onInputChange={(input) => dropDownState(input, "applicationName")}
              onChange={(choice, action) => {
                handleOnChange(action.name, choice.value);
              }}
              menuIsOpen={state.applicationNameMenuOpen}
              placeholder={"Enter Application Name"}
            />
          </div>
        </div>
        <div class="fltrcol">
          <label class="selectlabel">Manager Details</label>
          <div class="frmgroup">
            <Select
              name="primaryManager"
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              styles={colourStyles}
              options={managerList}
              onInputChange={(input) => dropDownState(input, "primaryManager")}
              onChange={(choice, action) => {
                handleOnChange(action.name, choice.value);
              }}
              menuIsOpen={state.primaryManagerMenuOpen}
              placeholder={"Enter Primary Manager"}
            />
          </div>
          <div class="frmgroup">
            <Select
              name="secondaryManager"
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              styles={colourStyles}
              options={managerList}
              onInputChange={(input) =>
                dropDownState(input, "secondaryManager")
              }
              onChange={(choice, action) => {
                handleOnChange(action.name, choice.value);
              }}
              menuIsOpen={state.secondaryManagerMenuOpen}
              placeholder={"Enter Secondary Manager"}
            />
          </div>
        </div>
        <div class="fltrcol">
          <label class="selectlabel">Group Details</label>
          <div class="frmgroup">
            <input
              name="businessUnit"
              type="text"
              id="businessunitFil"
              placeholder="Enter Business Unit"
              onChange={(e) => {
                handleOnChange(e.target.name, e.target.value);
              }}
            />
          </div>
        </div>
        <div class="form-check">
          <input
            name="authorization"
            class="form-check-input"
            type="checkbox"
            id="checkbox2"
            onChange={(e) => {
              handleOnChange(e.target.name);
            }}
          />
          <label class="form-check-label" for="auth_required">
            Is authorization required for all requests?
          </label>
        </div>
      </div>
      <div class="btnwrap">
        <button
          data-bs-dismiss="modal"
          aria-label="Close"
          onclick="filterReset();"
          class="default-btn"
        >
          Clear
        </button>
        <button
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleSubmit}
          class="primary-btn"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default memo(FilterModal);
