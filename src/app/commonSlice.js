import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    offcanvasState: {
      isDrilldownOpen: false,
      title: "",
      dropDownMenuOptions: [],
      selectedValue: {},
      selectedData: [],
      handleDdMenuChange: () => {}
    },
    drillDownSelectionState: {
      selectedLevelOne: "features",
    },
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
    },
    setSelectedDdMenuValue: {
      reducer(state, action) {
        state.offcanvasState.selectedValue = action.payload;
      },
    },
    setSelectedData: {
      reducer(state, action) {
        state.offcanvasState.selectedData = action.payload;
      },
    },
  },
});

export const {
  setIsOffCanvasOpen,
  setSelectedLevelOne,
  hideOffCanvas,
  setSelectedDdMenuValue,
  setSelectedData,
} = commonSlice.actions;

export default commonSlice.reducer;
