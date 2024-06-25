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

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Myrbacroutes from "myrbacroutes";
import StudentIDCard from "../student/studentID_card";
import StudentIDCard2 from "../student/studentID_card/index2";
import StudentIDCard3 from "../student/studentID_card/index3";
import MyDataTableComponent from "./test2";
import FeeCollectionListReport from "../fee/fee_report/daily_fee_collection_list";
import FeeCollectionReport from "../fee/fee_report/fee_collection_report";
// import Table from "./component/Table";

const MyDashboard = () => {
  const data = useSelector((state: any) => state);
  console.log("may redux data", data);
  // const token = useSelector((state: any) => state.data.token);
  // console.log(token,"rbac token");

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
  const renderedComponent = <Myrbacroutes />;
  // console.log("Rendered component data:", renderedComponent);
  return (
    // <DashboardLayout>
    //   <DashboardNavbar />
    <>
      <Grid container spacing={2} display={"flex"} justifyContent="center">
        <h1>My Dashboard </h1>
        {/* {renderedComponent} */}
        {/* <Grid item xs={12} sm={5}>
          <StudentIDCard />{" "}
        </Grid>
        <Grid item xs={12} sm={5}>
          <StudentIDCard2 />{" "}
        </Grid>
        <Grid item xs={12} sm={6}>
          <StudentIDCard3 />{" "}
        </Grid> */}
      </Grid>
      {/* <MyDataTableComponent />{" "} */}
      {/* <FeeCollectionListReport /> */}
      <FeeCollectionReport />
      {/* </DashboardLayout> */}
    </>
  );
};

export default MyDashboard;
