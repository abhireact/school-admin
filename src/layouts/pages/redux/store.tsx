import { configureStore } from "@reduxjs/toolkit";
import dummyDataReducer from "./dataSlice";

const store = configureStore({
  reducer: {
    dummyData: dummyDataReducer,
  },
});

export default store;
