import { get, isEmpty } from "lodash";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../../app/common-components/select";
import { effciencyApi } from "../../../app/services/efficiencyApi";
import { setAccessManagement } from "../efficiencySlice";
import { AccessManagementContext } from "./AccessManagement";

const Filter = () => {
  const { state, setState } = useContext(AccessManagementContext);

  const { efficiency } = useSelector((state) => state);

  const { application } = efficiency.accessManagement;

  const [getcmdb] = effciencyApi.useLazyGetcmdbQuery();

  const [getGroups] = effciencyApi.useLazyGetGroupsQuery();

  const [getUserDetails] = effciencyApi.useLazyGetUserDetailsQuery();

  const [getProjects] = effciencyApi.useLazyGetProjectsQuery();

  const [getOnBoardTools] = effciencyApi.useLazyGetOnBoardToolsQuery();

  const [getGroupMemebers] = effciencyApi.useLazyGetGroupMembersQuery();
  const dispatch = useDispatch();

  const getFilterData = async (cmdbData, projectData) => {
    if (state.initialLoad) {
      const  {id} = cmdbData[1];
      const accessManagePromiseData = await Promise.all([
        getGroups(),
        getUserDetails(),
        getOnBoardTools({id}),
        getGroupMemebers({id})
      ]);
      const groupData = get(accessManagePromiseData,'[0].data',[])
      const userDetails = get(accessManagePromiseData,'[1].data',[])
      const onBoardData = get(accessManagePromiseData,'[2].data',[])
      const groupMembersData = get(accessManagePromiseData,'[3].data',[])
      const groupDetails = !isEmpty(groupData) && groupData.map((item) => ({
        ...item,
        className: "",
      }));
      dispatch(
        setAccessManagement(get(efficiency, "accessManagement"), {
          application: cmdbData,
          userDetails,
          groupDetails,
          onBoardData,
          groupMembersData
        })
      );
    }

    const appNames =
      !isEmpty(cmdbData) &&
      state.initialLoad &&
      cmdbData.map((app) => ({
        label: app.appName + `[${app.appCode}]`,
        value: app.appCode,
        id: app.id,
      }));

    const projectLabels = !isEmpty(projectData)
      ? projectData.map((data) => ({
          label: data,
          value: data,
        }))
      : [];

    projectLabels.unshift({ label: "None", value: "None" });

    state.initialLoad
      ? setState({
          ...state,
          appNameOptions: appNames,
          appName: appNames[1].label,
          appNameId: appNames[1].id,
          appDetails: cmdbData[1],
          projectNameoptions: projectLabels,
          projectName: projectLabels[0].label,
          initialLoad: false,
        })
      : setState({
          ...state,
          projectNameoptions: projectLabels,
          projectName: projectLabels[0].label,
        });
  };
  const handleOnChange = ({ name }, { label, id }) => {

    if (name === "appName" && !isEmpty(state.appDetails)) {
      const index = application.findIndex((items) => items.id === id);
      setState({
        ...state,
        [`${name}Id`]: id,
        [name]: label,
        appDetails: application[index],
        fieldChange: true,
      });
      return "";
    }
    id
      ? setState({
          ...state,
          [`${name}Id`]: id,
          [name]: label,
          fieldChange: true,
        })
      : setState({
          ...state,
          [name]: label,
          filedChange: true,
        });
  };

  useEffect(() => {
    if (state.initialLoad) {
      getcmdb()
        .unwrap()
        .then((cmdbData) => {
          const [initialData, second] = cmdbData;
          getProjects(second.id).then(({ data: projectData }) => {
            getFilterData(cmdbData, projectData);
          });
        });
    }
  }, []);

  useEffect(() => {
    if (!state.initialLoad && state.fieldChange) {
      getOnBoardTools({ id: state.appNameId, projectId: state.projectName });
      getGroupMemebers({ id: state.appNameId, projectId: state.projectName });
    }
  }, [state.projectName]);

  useEffect(() => {
    if (!state.initialLoad && state.fieldChange) {
      getProjects(state.appNameId).then(({ data: projectData }) => {
        getFilterData(application, projectData);
      });
      getOnBoardTools({ id: state.appNameId, projectId: state.projectName });
      getGroupMemebers({ id: state.appNameId, projectId: state.projectName });
    }
  }, [state.appNameId]);

  return (
    <div class="access_appinputs row">
      <div class="frmgroup col-md-6">
        <label>Select Application</label>
        <CustomSelect
          name="appName"
          options={state.appNameOptions}
          isCheckboxSelect={true}
          placeholder={""}
          value={{ label: state.appName }}
          onChange={(choice, action) => {
            handleOnChange(action, choice);
          }}
        />
      </div>
      <div class="frmgroup col-md-6">
        <label>Select Project</label>
        <CustomSelect
          name="projectName"
          options={state.projectNameoptions}
          isCheckboxSelect={true}
          onChange={(choice, action) => {
            handleOnChange(action, choice);
          }}
          value={{ label: state.projectName }}
          placeholder={""}
        />
      </div>
    </div>
  );
};

export default Filter;
