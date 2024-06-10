import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

interface AcademicYearState {
  selectedAcademicYear: string | null;
}

const initialState: AcademicYearState = {
  selectedAcademicYear: null,
};

const academicYearSlice: Slice<AcademicYearState> = createSlice({
  name: "academicYear",
  initialState,
  reducers: {
    setSelectedAcademicYear: (state, action: PayloadAction<string | null>) => {
      state.selectedAcademicYear = action.payload;
    },
  },
});

export const { setSelectedAcademicYear } = academicYearSlice.actions;
export default academicYearSlice.reducer;
