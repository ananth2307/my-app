import { isEmpty } from "lodash";
import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { effciencyApi } from "../../../app/services/efficiencyApi";
import Filter from "./Filter";
import ProvideAccess from "./ProvideAccess";
import ToolsOnBoard from "./ToolsOnBoard";

export const AccessManagementContext = createContext();

const AccessManagement = () => {
  const [state, setState] = useState({
    initialLoad: true,
    fieldChange: false,
    userDetails: [],
    groupDetais: [],
    appDetails: {},
    appNameOptions: [],
    projectNameoptions: [],
    // appNameValue:"",
    appName: "",
    projectName: "",
    appNameId: 0,
    // appNameId:0,
  });
  const { efficiency } = useSelector((state) => state);

  // const { userDetails, groupDetails } = efficiency.accessManagement;

  return (
    <AccessManagementContext.Provider value={{ state, setState }}>
      <div class="main-content-wrap">
        <div class="config-wrap bg-white row">
          <Filter />
          <div class="configsts-wrap">
            <div class="configsts-col">
              <label>Application Details</label>
              <h4 id="de_appcode">{state.appDetails.appCode || "-----"}</h4>
              <h4 id="de_appname">{state.appDetails.appName || "-----"}</h4>
            </div>
            <div class="configsts-col">
              <label>Managers</label>
              <h5 class="on_detail">
                <span>P</span>
                <div id="p_manager" value="">
                  {state.appDetails.primaryManager || "-----"}
                </div>
              </h5>
              <h5 class="on_detail">
                <span>S</span>
                <div id="s_manager">
                  {state.appDetails.secondaryManager || "-----"}
                </div>
              </h5>
            </div>
            <div class="configsts-col">
              <label>Approval Gate</label>
              <h4 id="de_appgate">
                {state.appDetails.approvalGate
                  ? state.appDetails.approvalGate === 0
                    ? "No"
                    : "Yes"
                  : "-----"}{" "}
              </h4>
            </div>
            <div class="configsts-col">
              <label>Business Unit</label>
              <h4 id="de_Bunit">{state.appDetails.businessUnit || "-----"}</h4>
            </div>
          </div>
          <ToolsOnBoard/>
          <div class="toolboard">
            <h5 class="sechead">Provide Access</h5>
            <div class="group_tr">
              <ProvideAccess />
            </div>
          </div>
          <div class="btnsrow">
            <a href="/onboarding" class="backlink">
              Back
            </a>
            <div class="btnwrap">
              <button
                type="submit"
                onclick="accessRequest();"
                class="primary-btn"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </AccessManagementContext.Provider>
  );
};
export default AccessManagement;
