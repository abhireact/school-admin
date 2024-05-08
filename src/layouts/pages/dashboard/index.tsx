import { Grid } from "@mui/material";
import {
  fetchWings,
  fetchRbac,
  fetchStudentCategory,
  fetchStudent,
  fetchAcademic,
  fetchClass,
} from "../redux/dataSlice";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyDashboard = () => {
  const data = useSelector((state: any) => state);

  console.log("may rbac data", data);
  // Redux Call
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWings() as any); // Replace `any` with the correct type if available
    dispatch(fetchRbac() as any);
    dispatch(fetchStudentCategory() as any);
    dispatch(fetchStudent() as any);
    dispatch(fetchAcademic() as any);
    dispatch(fetchClass() as any);
  }, [dispatch]);

  return (
    <Grid container spacing={2} display={"flex"} justifyContent="center">
      <h1>My Dashboard</h1>
    </Grid>
  );
};

export default MyDashboard;
