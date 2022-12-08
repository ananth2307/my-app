import { get, isEmpty, useEffect } from "lodash";
import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../../app/common-components/CustomModal";
import CustomSelection from "../../../app/common-components/customSelect";
import { effciencyApi } from "../../../app/services/efficiencyApi";
import { setAppConfig } from "../efficiencySlice";
import { featherFilter } from "../../../assets/images";
const FilterModal = () => {
  const [state, setstate] = useState({
    limit: 10,
    page: 0,
    appCodeMenuOpen: false,
    applicationNameMenuOpen: false,
    primaryManagerMenuOpen: false,
    secondaryManagerMenuOpen: false,
    appCode: "",
    applicationName: "",
    primaryManager: "",
    secondaryManager: "",
    businessUnit: "",
    approvalGate: "",
    modalOpen: false,
  });
  const dispatch = useDispatch();


  const { efficiency } = useSelector((state) => state);

  const filterData = get(efficiency,'appConfig.filterData')

  const {appNameCode,managerList} = filterData

  
  const [getFilteredCmdbCount] = effciencyApi.useGetFilteredCmdbCountMutation();

  const [getFilteredCmdbList] = effciencyApi.useGetFilteredCmdbListMutation();

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
      name === "approvalGate" ? (state.approvalGate === 0 ? 1 : 0) : value;

    setstate((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      appCode: state.appCode,
      approvalGate: state.approvalGate,
      businessUnit: state.businessUnit,
      primaryManager: state.primaryManager,
      secondaryManager: state.secondaryManager,
    };

    const { data: count } = await getFilteredCmdbCount(payload);

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
      setAppConfig(get(efficiency, "appConfig"), {
        tableData,
      })
    );

    setstate((state) => ({
      ...state,
      modalOpen: false,
    }));
  };
  const modalBody = () => (
    <div class="modal-body">
      {/* <h4 class="sectitle">Filters</h4> */}
      <div class="fltrwrap" id="filterForm">
        <div class="fltrcol">
          <label class="selectlabel">Application Details</label>
          <CustomSelection
            name="appCode"
            options={appNameCode}
            onInputChange={{ dropDownState, selectedField: "appCode" }}
            onChange={handleOnChange}
            menuIsOpen={state.appCodeMenuOpen}
            placeholder={"Enter Application Code"}
          />
          <CustomSelection
            name="applicationName"
            options={appNameCode}
            onInputChange={{ dropDownState, selectedField: "applicationName" }}
            onChange={handleOnChange}
            menuIsOpen={state.applicationNameMenuOpen}
            placeholder={"Enter Application Name"}
          />
        </div>
        <div class="fltrcol">
          <label class="selectlabel">Manager Details</label>
          <CustomSelection
            name="primaryManager"
            options={managerList}
            onInputChange={{ dropDownState, selectedField: "primaryManager" }}
            onChange={handleOnChange}
            menuIsOpen={state.primaryManagerMenuOpen}
            placeholder={"Enter Primary Manager"}
          />
          <CustomSelection
            name="secondaryManager"
            options={managerList}
            onInputChange={{ dropDownState, selectedField: "secondaryManager" }}
            onChange={handleOnChange}
            menuIsOpen={state.secondaryManagerMenuOpen}
            placeholder={"Enter Secondary Manager"}
          />
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
            name="approvalGate"
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
      {/* <div class="btnwrap">
        <button class="default-btn">Clear</button>
        <button onClick={handleSubmit} class="primary-btn">
          Apply
        </button>
      </div> */}
    </div>
  );

  const handleClose = () => {
    setstate((state) => ({
      ...state,
      modalOpen: false,
    }));
  };

  const handleShow = () => {
    setstate((state) => ({
      ...state,
      modalOpen: true,
    }));
  };
  return (
    <>
      <CustomModal
        modalOpen={state.modalOpen}
        modalHide={handleClose}
        modalTitle={"Filters"}
        PrimaryButton={"Apply"}
        SecondaryButton={"Clear"}
        modalBody={modalBody}
        primaryBtnFunc={handleSubmit}
        secondaryBtnFunc={handleClose}
        modalCustomClass={"filter-modal"}
      />
      <div class="actleft">
        <div class="appfilternav">
          <a onClick={handleShow}>
            <span>
              <img src={featherFilter} alt="filter.png" />
            </span>{" "}
            Filter
          </a>
        </div>
      </div>
    </>
  );
};

export default memo(FilterModal);
