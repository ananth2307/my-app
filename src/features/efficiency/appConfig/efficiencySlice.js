import { createSlice } from "@reduxjs/toolkit";

const efficiencySlice = createSlice({
  name: "efficiency",
  initialState: {
    appConfig:{
    filterData: {},
    tableData:[]
    }
  },
  reducers: {
    setFilterData: {
      reducer(state, action) {
        state.appConfig.filterData = action.payload;
      },
      prepare(filterData, changedData) {
        return { payload: [ ...filterData, ...changedData ] };
      },
    },
    setAppConfig:{
      reducer(state,action){
        console.log({state,action})
        state.appConfig = action.payload
      },
      prepare(filterData, changedData) {
        console.log({filterData,changedData})
        return { payload:{...filterData, ...changedData}};
      },
    }
  },
});

export const { setFilterData, setAppConfig } = efficiencySlice.actions;

export default efficiencySlice.reducer;
