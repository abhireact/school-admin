import { configureStore } from "@reduxjs/toolkit";
import dummyDataReducer from "./dataSlice";

const store = configureStore({
  reducer: {
    reduxData: dummyDataReducer,
  },
});

export default store;
