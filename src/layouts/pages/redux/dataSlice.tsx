import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
  name: "reduxData",
  initialState: {
    rbacData: null,
  },
  reducers: {
    storeRBAC(state, action) {
      state.rbacData = action.payload;
    },
  },
});

export const { storeRBAC } = DataSlice.actions;

export default DataSlice.reducer;
