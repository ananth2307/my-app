import { createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

const observabilitySlice = createSlice({
  name: "observability",
  initialState: {
    filterData: {
      selectedApplications: [],
      selectedProjects: [],
      selectedSprints: [],
      selectedDate:{}
    },
    panelState: {},
  },
  reducers: {
    setFilterData: {
      reducer(state, action) {
        state.filterData = action.payload;
      },
      prepare(filterData, changedData) {
        return { payload: { ...filterData, ...changedData } };
      },
    },
    setPanelVisibility: {
      reducer(state, action) {
        state.panelState[`is${action.payload}Open`] = !get(
          state,
          `panelState.is${action.payload}Open`,
          false
        );
      },
    },
  },
});

export const { setFilterData, setPanelVisibility } = observabilitySlice.actions;

export default observabilitySlice.reducer;
