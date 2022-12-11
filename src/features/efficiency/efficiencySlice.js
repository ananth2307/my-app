import { createSlice } from "@reduxjs/toolkit";

const efficiencySlice = createSlice({
  name: "efficiency",
  initialState: {
    appConfig: {
      tableData: [],
      projectTableData: [],
      filterData: {},
    },
    accessManagement: {
      application: [],
      userDetails:[],
      groupDetails:[],
      onBoardData:[],
      groupMembersData:[]
    },
  },
  reducers: {
    setAppConfig: {
      reducer(state, action) {
        state.appConfig = action.payload;
      },
      prepare(filterData, changedData) {
        return { payload: { ...filterData, ...changedData } };
      },
    },
    setAccessManagement: {
      reducer(state, action) {
        state.accessManagement = action.payload;
      },
      prepare(filterData, changedData) {
        console.log({ filterData, changedData });
        return { payload: { ...filterData, ...changedData } };
      },
    },
  },
});

export const { setAppConfig, setAccessManagement } = efficiencySlice.actions;

export default efficiencySlice.reducer;
