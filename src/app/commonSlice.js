import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    offcanvasState: {
      isDrilldownOpen: false,
      title: "",
      dropDownMenuOptions: [],
    },
  },
  reducers: {
    setIsOffCanvasOpen: {
      reducer(state, action) {
        state.offcanvasState = action.payload;
      },
    },
  },
});

export const { setIsOffCanvasOpen } = commonSlice.actions;

export default commonSlice.reducer;
