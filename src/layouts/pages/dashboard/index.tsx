import { Grid } from "@mui/material";
import {
  fetchWings,
  fetchRbac,
  fetchStudentCategory,
  fetchAcademicYear,
  fetchClasses,
  fetchAccount,
  fetchStudent,
} from "../redux/dataSlice";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import CollTable from "./test";
import ExpandableTable from "./test2";
// import Table from "./component/Table";

const MyDashboard = () => {
  const data = useSelector((state: any) => state);

  console.log("may rbac data", data);
  // Redux Call
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWings() as any);
    dispatch(fetchRbac() as any);
    dispatch(fetchStudentCategory() as any);
    dispatch(fetchClasses() as any);
    dispatch(fetchAcademicYear() as any);
    dispatch(fetchAccount() as any);
    dispatch(fetchStudent() as any);
  }, [dispatch]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={2} display={"flex"} justifyContent="center">
        <h1>My Dashboard</h1>
        <CollTable />
      </Grid>
    </DashboardLayout>
  );
};

export default MyDashboard;
