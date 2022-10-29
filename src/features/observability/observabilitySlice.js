import { createSlice } from "@reduxjs/toolkit";

const observabilitySlice = createSlice({
  name: "observability",
  initialState: {
    filterData: {
      selectedApplications: [],
      selectedProjects: [],
      selectedSprints: []
    },
  },
  reducers: {
    setFilterData: {
      reducer(state, action) {
        state.filterData = action.payload;
      },
      prepare(filterData, changedData) {
        return { payload: { ...filterData, ...changedData } }
      }
    },
  },
});

export const { setFilterData } = observabilitySlice.actions;

export default observabilitySlice.reducer;
