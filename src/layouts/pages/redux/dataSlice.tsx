import { createSlice } from "@reduxjs/toolkit";

const dummyDataSlice = createSlice({
  name: "dummyData",
  initialState: {
    name: "",
    academicName: "",
    entitlementName: "",
    restrictionData: "",
    applicableData: "",
    leavegrantData: "",
    leavetypeData: "",
    rolesData: "",
    userprofileData: "",
    rbacData: "",
  },
  reducers: {
    updateName(state, action) {
      state.name = action.payload;
    },
    updateAcademicName(state, action) {
      state.academicName = action.payload;
    },

    updateEntitlementName(state, action) {
      state.entitlementName = action.payload;
    },
    updateRestrictionData(state, action) {
      state.restrictionData = action.payload;
    },
    updateApplicableData(state, action) {
      state.applicableData = action.payload;
    },
    updateLeaveGrantData(state, action) {
      state.leavegrantData = action.payload;
    },

    updateRolesData(state, action) {
      state.rolesData = action.payload;
    },
    updateLeavetypeData(state, action) {
      state.leavetypeData = action.payload;
    },
    updateUserProfileData(state, action) {
      state.userprofileData = action.payload;
    },
    updateRbacData(state, action) {
      state.rbacData = action.payload;
    },
  },
});

export const {
  updateName,
  updateAcademicName,
updateEntitlementName,
  updateRestrictionData,
  updateApplicableData,
  updateLeaveGrantData,
 updateRolesData,
  updateLeavetypeData,
  updateUserProfileData,
  updateRbacData,
} = dummyDataSlice.actions;

export default dummyDataSlice.reducer;
