import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    offcanvasState: {
      isDrilldownOpen: false,
      title: "",
      dropDownMenuOptions: [],
      selectedValue: {},
      selectedData: []
    },
    drillDownSelectionState: {
      selectedLevelOne: "features"
    }
  },
  reducers: {
    setIsOffCanvasOpen: {
      reducer(state, action) {
        state.offcanvasState = action.payload;
      },
    },
    setSelectedLevelOne: {
      reducer(state, action) {
        state.drillDownSelectionState.selectedLevelOne = action.payload;
      },
    },
    hideOffCanvas: {
      reducer(state, action) {
        state.offcanvasState.isDrilldownOpen = action.payload;
      },
    }
  },
});

export const { setIsOffCanvasOpen, setSelectedLevelOne, hideOffCanvas } = commonSlice.actions;

export default commonSlice.reducer;
