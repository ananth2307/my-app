import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    isOffCanvasOpen: false,
  },
  reducers: {
    setIsOffCanvasOpen: {
      reducer(state, action) {
        state.isOffCanvasOpen = action.payload;
      },
    },
  },
});

export const { setIsOffCanvasOpen } = commonSlice.actions;

export default commonSlice.reducer;
