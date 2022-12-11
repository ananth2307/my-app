import { cloneDeep } from "lodash";
import React, { memo, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomSelection from "../../../app/common-components/customSelect";
import FormCheck from "../../../app/common-components/form/checkbox";
import Input from "../../../app/common-components/form/input";
import { effciencyApi } from "../../../app/services/efficiencyApi";
import { AppConfigContext } from "./AppConfig";

const ApplicationConfig = (props) => {
  const { filterData } = useSelector((state) => state?.efficiency?.appConfig);
  const { managerList } = filterData;

  const { title } = props;

  const [checkAppCode] = effciencyApi.useLazyCheckAppCodeQuery();

  const context = useContext(AppConfigContext);

  const navigate = useNavigate()

  const [postApplicationDetails] =
    effciencyApi.usePostApplicationDetailsMutation();
  const [state, setState] = useState({
    formFields: {
      appCode: "",
      appName: "",
      primaryManager: "",
      primaryManagerId: "",
      secondaryManager: "",
      secondaryManagerId: "",
      businessUnit: "",
      businessHead: "",
      businessHeadId: "",
      approvalGate: 0,
    },
    appCodeError: false,
    appNameError: false,
    primaryManagerError: false,
    secondaryManagerError: false,
    businessUnitError: false,
    businessHeadError: false,
    appCodeErrorMessage: "",
    appNameErrorMessage: "",
    primaryManagerErrorMessage: "",
    secondaryManagerErrorMessage: "",
    businessUnitErrorMessage: "",
    businessHeadErrorMessage: "",
    primaryManagerMenuOpen: false,
    secondaryManagerMenuOpen: false,
    businessHeadMenuOpen: false,
    modalOpen: false,
  });

  const dropDownState = (input, type) => {
    input && type
      ? setState((state) => ({
          ...state,
          [`${type}MenuOpen`]: true,
        }))
      : setState((state) => ({
          ...state,
          [`${type}MenuOpen`]: false,
        }));
  };

  const handleOnChange = (name, { value, id }) => {
  
    state[`${name}Error`] && setState({ ...state, [`${name}Error`]: false });

    value =
      name === "approvalGate" ? (state.approvalGate === 0 ? 1 : 0) : value;

    id &&
      setState((state) => ({
        ...state,
        formFields: {
          ...state.formFields,
          [`${name}Id`]: id,
        },
      }));

    setState((state) => ({
      ...state,
      formFields: {
        ...state.formFields,
        [name]: value,
      },
    }));
  };

  const validateForm = () => {
    let tmpFormFields = cloneDeep(state.formFields);
    let formValidation = true;
    Object.keys(tmpFormFields).map((key) => {
      if (tmpFormFields[key] === "" && key != "approvalGate") {
        setState((state) => ({
          ...state,
          [`${key}Error`]: true,
          [`${key}ErrorMessage`]: `${key} shouldn't be empty`,
        }));
        formValidation = false;
      }
    });
    if (
      tmpFormFields.primaryManager !== "" &&
      tmpFormFields.secondaryManager !== "" &&
      tmpFormFields.businessHead !== ""
    ) {
      if (tmpFormFields.primaryManager === tmpFormFields.secondaryManager) {
        setState({
          ...state,
          secondaryManagerError: true,
          secondaryManagerErrorMessage:
            "Primary Manager and Secondary Manager should not be same",
        });
        formValidation = false;
      }
      if (
        tmpFormFields.businessHead === tmpFormFields.secondaryManager ||
        tmpFormFields.businessHead === tmpFormFields.primaryManager
      ) {
        setState({
          ...state,
          businessHeadError: true,
          businessHeadErrorMessage:
            "Business Head should be unique from Primary Manager and Secondary Manager",
        });
        formValidation = false;
      }
    }

    return formValidation;
  };
  const handleSubmit = async () => {
    const validation = validateForm();
    if (validation) {
      const {
        appCode,
        appName,
        primaryManager,
        secondaryManager,
        primaryManagerId,
        secondaryManagerId,
        businessUnit,
        businessHead,
        businessHeadId,
        approvalGate,
      } = state.formFields;
      const cacheTimeStamp = new Date().getTime();
      checkAppCode({ appCode, cacheTimeStamp })
        .then((data) => {
          if (data?.error?.data === "Already Exists") return "";
          const payload = {
            id: "",
            appCode,
            appName,
            primaryManager,
            secondaryManager,
            primaryManagerId,
            businessUnit,
            businessHead,
            businessHeadId,
            secondaryManagerId,
            approvalGate,
          };
          postApplicationDetails(payload)
            .then((data) => {
              console.log("data", data);
            })
            .catch((error) => {
              console.log("err", error);
            });
        })
        .catch((error) => {
          console.log("err", error.data);
        });
    }
  };
  return (
    <div class="config-wrap bg-white">
      <h4 class="sectitle updatehead" style={{ display: "none" }}>
        Application
      </h4>
      <h4 class="sectitle newhead">{title}</h4>
      <div class="confingform" id="appFrom">
        <div class="confingform-wrap">
          <div class="confingformcol">
            <label>Application Details</label>
            <Input
              containerClassName="frmgroup"
              error={state.appCodeError}
              type={"text"}
              name={"appCode"}
              placeholder={"Enter Application Code"}
              autoComplete={"off"}
              errorMessage={state.appCodeErrorMessage}
              onChange={handleOnChange}
            />
            <Input
              containerClassName="frmgroup"
              error={state.appNameError}
              type={"text"}
              name={"appName"}
              placeholder={"Enter Application Name"}
              autoComplete={"off"}
              errorMessage={state.appNameErrorMessage}
              onChange={handleOnChange}
            />
          </div>
          <div class="confingformcol">
            <label>Manager Details</label>
            <CustomSelection
              name="primaryManager"
              options={managerList}
              onInputChange={{ dropDownState, selectedField: "primaryManager" }}
              onChange={handleOnChange}
              menuIsOpen={state.primaryManagerMenuOpen}
              error={state.primaryManagerError}
              errorMessage={state.primaryManagerErrorMessage}
              placeholder={"Enter Primary Manager"}
            />
            <CustomSelection
              name="secondaryManager"
              options={managerList}
              onInputChange={{
                dropDownState,
                selectedField: "secondaryManager",
              }}
              onChange={handleOnChange}
              menuIsOpen={state.secondaryManagerMenuOpen}
              error={state.secondaryManagerError}
              errorMessage={state.secondaryManagerErrorMessage}
              placeholder={"Enter Secondary Manager"}
            />
          </div>
          <div class="confingformcol">
            <label>Group Details</label>
            <Input
              containerClassName="frmgroup"
              error={state.businessUnitError}
              type={"text"}
              name={"businessUnit"}
              placeholder={"Enter Business Unit"}
              autoComplete={"off"}
              errorMessage={state.businessUnitErrorMessage}
              onChange={handleOnChange}
            />
            <CustomSelection
              name="businessHead"
              options={managerList}
              onInputChange={{ dropDownState, selectedField: "businessHead" }}
              onChange={handleOnChange}
              menuIsOpen={state.businessHeadMenuOpen}
              error={state.businessHeadError}
              errorMessage={state.businessHeadErrorMessage}
              placeholder={"Enter Business Head"}
            />
          </div>
          <FormCheck
            name={"approvalGate"}
            checked={state.approvalGate}
            onChange={handleOnChange}
            bottomTitle={" Is authorization required for all requests?"}
          />
          <div class="btnwrap">
            <button
              type=""
              class="default-btn"
              onClick={() => {
                context.setState((state) => ({
                  ...state,
                  applicationConfig: false,
                }));
              }}
            >
              Cancel
            </button>
            <button type="button" class="default-btn" onClick={handleSubmit}>
              Save
            </button>
            <div
              class="dropdown navigatebtn updatehead"
              style={{ display: "none" }}
            >
              <a
                class="dropdown-toggle"
                href="#"
                role="button"
                id="navigateto"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Navigate to
              </a>
              <ul class="dropdown-menu" aria-labelledby="navigateto">
                <li>
                  <a onclick="callOnboarding_code();">Onboarding Tools</a>
                </li>
                <li>
                  <a href="/accessManagement">Access Management</a>
                </li>
              </ul>
            </div>
            <button
              type="submit"
              onClick={() => {
               navigate('/onboarding')
              }}
              class="primary-btn newhead"
            >
              Proceed to Onboard Tools
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ApplicationConfig);
