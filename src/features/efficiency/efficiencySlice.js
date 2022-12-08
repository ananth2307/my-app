import { createSlice } from "@reduxjs/toolkit";

const efficiencySlice = createSlice({
  name: "efficiency",
  initialState: {
    appConfig:{
    tableData:[],
    projectTableData:[],
    filterData:{}
    }
  },
  reducers: {
   
    setAppConfig:{
      reducer(state,action){
        state.appConfig = action.payload
      },
      prepare(filterData, changedData) {
        console.log("redux",{filterData,changedData})
        return { payload:{...filterData, ...changedData}};
      },
    }
  },
});

export const {  setAppConfig } = efficiencySlice.actions;

export default efficiencySlice.reducer;
