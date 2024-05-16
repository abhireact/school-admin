import { createSlice, createAsyncThunk, PayloadAction, AsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import Cookies from "js-cookie";
import { REHYDRATE } from "redux-persist";

const token = Cookies.get("token");
const baseURL = `${process.env.REACT_APP_BASE_URL}`;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
interface DataState {
  status: "loading" | "succeeded" | "failed";
  error: string | null;
}
const createAsyncThunkWithUrl = (name: any, url: any) => {
  return createAsyncThunk(name, async () => {
    try {
      const response = await axios.get(`${baseURL}/${url}`, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch ${url}`);
    }
  });
};

const asyncThunks: { [key: string]: AsyncThunk<any, void, AsyncThunkConfig> } = {
  fetchWings: createAsyncThunkWithUrl("data/fetchWings", "mg_wing"),
  fetchRbac: createAsyncThunkWithUrl("data/fetchRbac", "mg_rbac_current_user"),
  fetchStudentCategory: createAsyncThunkWithUrl("data/StudentCategory", "mg_studcategory"),
  fetchAcademicYear: createAsyncThunkWithUrl("data/AcademicYear", "mg_accademic_year"),
};

const initialState: DataState = {
  status: "loading",
  error: null,
};
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(REHYDRATE, (state, action) => {
        // Type assertion to let TypeScript know about the payload
        const rehydrateAction = action as PayloadAction<any>;
        // Check if persisted state exists
        if (
          rehydrateAction.payload &&
          typeof rehydrateAction.payload === "object" &&
          "data" in rehydrateAction.payload
        ) {
          // Merge persisted state with current state
          return { ...state, ...rehydrateAction.payload.data };
        } else {
          return state;
        }
      })
      .addMatcher(
        (action) => {
          return Object.values(asyncThunks).some((thunk) =>
            action.type.startsWith(thunk.typePrefix)
          );
        },
        (state, action: PayloadAction<any>) => {
          const key = Object.keys(asyncThunks).find((thunkKey) =>
            action.type.startsWith(asyncThunks[thunkKey].typePrefix)
          );
          if (key) {
            const dataKey = key.replace("fetch", "").toLowerCase();
            state.status = "succeeded";
            state[dataKey as keyof DataState] = action.payload;
          }
        }
      );
  },
});

export const {
  fetchGroupNames,
  fetchProducts,
  fetchWings,
  fetchRbac,
  fetchStudentCategory,

  fetchAcademicYear,
} = asyncThunks;

export default dataSlice.reducer;
