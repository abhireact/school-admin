import { Grid } from "@mui/material";
import { fetchWings, fetchRbac, fetchStudentCategory, fetchStudent } from "../redux/dataSlice";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyDashboard = () => {
  const data = useSelector((state: any) => state);

  console.log("may rbac data", data);
  // Redux Call
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWings());
    dispatch(fetchRbac());
    dispatch(fetchStudentCategory());
    dispatch(fetchStudent());
  }, [dispatch]);

  return (
    <Grid container spacing={2} display={"flex"} justifyContent="center">
      <h1>My Dashboard</h1>
    </Grid>
  );
};

export default MyDashboard;
