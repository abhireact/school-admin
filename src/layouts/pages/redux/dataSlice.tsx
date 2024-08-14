import { createSlice, createAsyncThunk, PayloadAction, AsyncThunk } from "@reduxjs/toolkit";
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
  token: string | null;
  myrbac: string[];
}

const createAsyncThunkWithUrl = (name: string, url: string) => {
  return createAsyncThunk(name, async () => {
    try {
      const response = await axios.get(`${baseURL}/${url}`, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch ${url}`);
    }
  });
};

const asyncThunks: { [key: string]: AsyncThunk<any, void, {}> } = {
  fetchWings: createAsyncThunkWithUrl("data/fetchWings", "mg_wing"),
  fetchEmployee: createAsyncThunkWithUrl("data/employee", "mg_employees"),
  fetchRbac: createAsyncThunkWithUrl("data/fetchRbac", "mg_rbac_current_user"),
  fetchStudentCategory: createAsyncThunkWithUrl("data/StudentCategory", "mg_studcategory"),
  fetchAcademicYear: createAsyncThunkWithUrl("data/AcademicYear", "mg_accademic_year"),
  fetchClasses: createAsyncThunkWithUrl("data/Classes", "mg_class"),
  fetchAccount: createAsyncThunkWithUrl("data/account", "mg_accounts"),
  fetchStudent: createAsyncThunkWithUrl("data/student", "mg_student"),
  fetchProfile: createAsyncThunkWithUrl("data/profile", "profile"),
  fetchDepartment: createAsyncThunkWithUrl("data/department", "employee_department"),
};

const initialState: DataState = {
  status: "loading",
  error: null,
  token: token || null,
  myrbac: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setMyRbac: (state, action: PayloadAction<string[]>) => {
      state.myrbac = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(REHYDRATE, (state, action) => {
        const rehydrateAction = action as PayloadAction<any>;
        if (
          rehydrateAction.payload &&
          typeof rehydrateAction.payload === "object" &&
          "data" in rehydrateAction.payload
        ) {
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

export const { setMyRbac } = dataSlice.actions;

export const {
  fetchWings,
  fetchRbac,
  fetchStudentCategory,
  fetchClasses,
  fetchAcademicYear,
  fetchAccount,
  fetchStudent,
  fetchProfile,
  fetchEmployee,
  fetchDepartment,
} = asyncThunks;

export default dataSlice.reducer;
